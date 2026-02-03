function fy
    # 1. Paketleri ara ve "Metadata" gibi gereksiz satırları ele
    set -l results (dnf search $argv | string match -r '.* : .*')

    if not set -q results[1]
        echo "Paket bulunamadı: $argv"
        return 1
    end

    # 2. fzf ile seçim yap (Önizleme kısmında dnf info gösterir)
    set -l selections (printf "%s\n" $results | fzf --multi \
        --preview 'dnf info (string split -m 1 " : " {})[1]' \
        --header "Seçim: TAB | Onay: ENTER | Çıkış: ESC")

    # 3. Eğer seçim yapıldıysa paket adlarını ayıkla ve kur
    if test -n "$selections"
        set -l pkgs
        for line in $selections
            # Sadece kolonun solundaki paket adını al
            set -a pkgs (string split -m 1 " : " $line)[1]
        end

        echo "Kurulacak paketler: $pkgs"
        sudo dnf install $pkgs
    else
        echo "İşlem iptal edildi."
    end
end
