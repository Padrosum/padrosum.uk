function fy
    # 1. dnf'i sessiz modda çalıştır ve sadece içinde ":" olan satırları al
    # Bu sayede başlıklar ve uyarılar elenmiş olur.
    set -l results (dnf search -q $argv | string match -r ".+ : .+")

    # 2. Eğer hala sonuç yoksa, metadata önbelleği boş olabilir
    if not set -q results[1]
        echo "⚠️  Paket bulunamadı. Önbelleği güncellemeyi deneyebilirsin: 'sudo dnf makecache'"
        return 1
    end

    # 3. fzf ile seçim ekranı
    set -l selections (printf "%s\n" $results | fzf --multi \
        --preview "dnf info -q (string split -m 1 ' : ' {})[1]" \
        --header "TAB: Çoklu Seçim | Enter: Kur | ESC: Çık")

    # 4. Seçim yapıldıysa paketleri ayıkla ve kur
    if test -n "$selections"
        set -l pkgs
        for line in $selections
            set -a pkgs (string split -m 1 " : " $line)[1]
        end
        
        echo "📦 Kuruluyor: $pkgs"
        sudo dnf install $pkgs
    else
        echo "❌ İşlem iptal edildi."
    end
end
