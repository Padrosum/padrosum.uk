function fy
    # 1. dnf search çıktısını al ve sadece paket satırlarını süz
    set -l results (dnf search -q $argv | string match -r '.+ : .+')

    if test -z "$results"
        echo "❌ '$argv' için paket bulunamadı."
        return 1
    end

    # 2. fzf ile seçim yap
    set -l selection (printf "%s\n" $results | fzf --header "ENTER: Kur | ESC: Çık" --preview "dnf info -q (string split -m 1 ' ' {1})")

    if test -n "$selection"
        # --- CERRAHİ İŞLEM BAŞLIYOR ---
        
        # A. Satırın en başındaki ilk kelimeyi al (Örn: "neofetch.noarch")
        set -l full_name (string split -m 1 " " -- $selection)[1]
        
        # B. Sonundaki iki nokta (:) varsa temizle
        set -l pkg_name (string replace -r ":\$" "" $full_name)
        
        # C. MİMARİ TEMİZLİĞİ (Uyuşmazlığı çözen kısım)
        # .aarch64, .noarch veya .x86_64 eklerini ismin sonundan atar
        set -l clean_pkg (string replace -r '\.(aarch64|noarch|x86_64|riscv64)$' '' $pkg_name)
        
        echo "📦 Tespit edilen paket: $clean_pkg (Ham veri: $full_name)"
        sudo dnf install $clean_pkg
    else
        echo "🚫 Seçim yapılmadı."
    end
end
