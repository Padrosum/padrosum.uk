function fy
    # 1. dnf'i sessizce çalıştır ve ham sonucu bir değişkene ata
    set -l raw_results (dnf search -q $argv)

    # 2. Eğer değişken boşsa dnf gerçekten bir şey bulamamıştır
    if test -z "$raw_results"
        echo "❌ dnf arama sonucu boş döndü. 'sudo dnf makecache' gerekebilir."
        return 1
    end

    # 3. Sonuçları fzf'e gönder (Hiçbir filtreleme yapmadan!)
    # İlk kelimeyi (paket adını) otomatik ayıklayacak.
    set -l selection (printf "%s\n" $raw_results | fzf --header "Paketi seç ve Enter'a bas" --preview "dnf info -q (string split ' ' {})[1]")

    # 4. Seçim yapıldıysa paketi kur
    if test -n "$selection"
        set -l pkg (string split " " $selection)[1]
        echo "📦 Kuruluyor: $pkg"
        sudo dnf install $pkg
    else
        echo "🚫 Seçim yapılmadı."
    end
end
