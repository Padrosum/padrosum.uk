function fy
    # 1. dnf search'ü standart dilde ve sessizce çalıştır
    set -l query (string join " " $argv)
    if test -z "$query"
        echo "❌ Bir paket adı girin (Örn: fy htop)"
        return 1
    end

    # 2. Arama sonuçlarını al ve sadece paket isimlerinin olduğu satırları temizle
    set -l results (LC_ALL=C dnf search -q $query | string match -r ".+ : .+")

    if test -z "$results"
        echo "❌ '$query' için paket bulunamadı."
        return 1
    end

    # 3. FZF Ekranı
    # --with-nth 1.. : Sadece paket ismi ve açıklamayı gösterir
    # --delimiter " : " : Ayırıcıyı belirler
    set -l selection (printf "%s\n" $results | fzf --header "Seç ve Enter'a bas" --preview "dnf info -q (string split -m 1 ' ' {1})")

    if test -n "$selection"
        # --- KRİTİK AYIKLAMA KISMI ---
        # Sadece " : " işaretinden öncesini al
        set -l full_pkg (string split -m 1 " : " -- $selection)[1]
        
        # Paket ismindeki .aarch64, .noarch gibi ekleri ve olası boşlukları temizle
        set -l clean_pkg (string replace -r '\.(aarch64|noarch|x86_64)$' '' $full_pkg | string trim)

        echo "📦 Yükleniyor: $clean_pkg"
        sudo dnf install $clean_pkg
    else
        echo "🚫 İşlem iptal edildi."
    end
end
