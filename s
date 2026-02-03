function fy
    # 1. Girdi kontrolü
    if test -z "$argv"
        echo "❌ Lütfen bir arama terimi girin."
        return 1
    end

    # 2. Arama yap ve sonuçları bir listeye (array) al
    # 'dnf search' çıktısındaki başlıkları ve boşlukları temizler
    set -l results (dnf search -q $argv | string match -r '.+ : .+')

    if test -z "$results"
        echo "❌ '$argv' için paket bulunamadı."
        return 1
    end

    # 3. fzf ile seçim yap
    set -l selection (string join \n $results | fzf --header "ENTER: Kur | ESC: Çık" --preview "dnf info -q (string split -m 1 ' ' {1})")

    # 4. Seçilen satırdan paket ismini temiz bir şekilde ayıkla
    if test -n "$selection"
        # Sadece ilk kelimeyi al ve olası ":" işaretlerini temizle
        set -l pkg (string split -m 1 " " -- $selection)[1]
        
        # Eğer dnf bazen "paket.mimarisi" şeklinde veriyorsa sadece "paket" kısmını alalım
        # Ama dnf genelde tam ismi kabul eder.
        echo "📦 Paket kuruluyor: $pkg"
        sudo dnf install $pkg
    else
        echo "🚫 Seçim yapılmadı."
    end
end
