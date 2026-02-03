function fy
    # 1. dnf'i standart dilde ve sessizce çalıştır
    # Hiçbir filtreleme (string match) yapmıyoruz, dnf ne verirse o.
    set -l raw_output (LC_ALL=C dnf search -q $argv)

    # 2. Eğer dnf gerçekten boş döndüyse uyar
    if test -z "$raw_output"
        echo "❌ dnf arama sonucu tamamen boş döndü. 'sudo dnf makecache' gerekebilir."
        return 1
    end

    # 3. fzf ile seçim ekranı (Ham çıktıyı gösteriyoruz)
    # Preview kısmında sadece seçili satırın ilk kelimesine (paket adı) odaklanıyoruz
    set -l selection (printf "%s\n" $raw_output | fzf --header "Paketi seç ve Enter'a bas" --preview "LC_ALL=C dnf info -q (string split ' ' {1})[1]")

    # 4. Seçilen satırdan paket ismini cımbızla çekelim
    if test -n "$selection"
        # Satırı boşluklardan böl ve ilk kelimeyi al, sonra olası ':' işaretini temizle
        set -l pkg (string split -m 1 " " -- $selection)[1]
        set -l clean_pkg (string replace -r ":\$" "" $pkg)
        
        echo "📦 Kuruluyor: $clean_pkg"
        sudo dnf install $clean_pkg
    else
        echo "🚫 Seçim yapılmadı."
    end
end
