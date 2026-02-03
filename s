function fy
    # 1. Giriş kontrolü
    if test -z "$argv"
        echo "❌ Lütfen aranacak paketi yaz."
        return 1
    end

    # 2. Arama: Sadece içinde " : " olan satırları al (Gereksiz başlıkları eler)
    # grep kullanarak dnf çıktısını temizliyoruz, Fish karışmıyor.
    set -l results (dnf search -q $argv | grep ' : ')

    if test -z "$results"
        echo "❌ Sonuç bulunamadı."
        return 1
    end

    # 3. FZF Seçimi
    # awk '{print $1}' ile sadece paket ismini (ve mimarisini) alıp dnf info'ya gönderiyoruz
    set -l selection (printf "%s\n" $results | fzf --reverse --header "Seç ve Enter'a bas" --preview "dnf info -q (echo {} | awk '{print \$1}')")

    if test -n "$selection"
        # 4. TEMİZLİK (Flag hatasını çözen kısım)
        # awk ile satırın ilk kelimesini al (paket.mimari)
        set -l raw_pkg (echo "$selection" | awk '{print $1}')
        
        # sed ile sondaki nokta ve sonrasını (.aarch64, .noarch, .x86_64) sil
        set -l final_pkg (echo "$raw_pkg" | sed 's/\.[^.]*$//')

        echo "📦 Kuruluyor: $final_pkg"
        sudo dnf install $final_pkg
    else
        echo "🚫 İptal."
    end
end
