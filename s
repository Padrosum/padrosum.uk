function fy
    # 1. --color=never: TÜM SORUNU ÇÖZEN ANAHTAR. Renk kodlarını kapatır.
    # grep ' : ': Sadece paket satırlarını alır, başlıkları atar.
    set -l target (dnf search -q --color=never $argv | grep ' : ' | fzf --query "$argv" --header "Seç ve Enter'a bas" | awk '{print $1}')

    if test -n "$target"
        echo "📦 Saf Hedef: $target"
        # Hedeflenen paketi kur (Mimari uzantısı olsa bile dnf bunu anlar)
        sudo dnf install $target
    else
        echo "🚫 Seçim yapmadın."
    end
end
