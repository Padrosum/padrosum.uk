function fy
    # dnf çıktısını al, fzf ile seç
    set -l selection (dnf search $argv | grep ' : ' | fzf --multi --preview 'dnf info {1}' --header "TAB ile seç, Enter ile onayla")

    if test -n "$selection"
        for line in $selection
            # Satırı boşluktan böl ve ilk elemanı (paket adını) al
            set -l pkg (string split -m 1 " " $line)[1]
            echo "Yükleniyor: $pkg"
            sudo dnf install $pkg
        end
    end
end
