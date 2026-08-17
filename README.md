# padrosum.uk

Next.js + Tailwind CSS ile yapılmış statik blog. `posts/` klasörüne atılan her `.md` dosyası,
main'e push'landığında GitHub Actions tarafından otomatik build edilip [padrosum.uk](https://padrosum.uk)
üzerinde yayınlanır.

## Yeni yazı ekleme

`posts/` altına bir `.md` dosyası oluştur:

````markdown
---
title: "Yazının Başlığı"
date: 2026-06-10
description: "Ana sayfada görünecek kısa özet (opsiyonel)"
type: "şiir"   # opsiyonel; şiirler özel biçimle gösterilir
---

Yazı içeriği buraya. Kod blokları otomatik renklendirilir:

```python
print("merhaba")
```
````

Notlar:

- Frontmatter tamamen opsiyoneldir: `title` yoksa ilk `# başlık` satırı ya da dosya adı,
  `date` yoksa dosyanın değiştirilme tarihi kullanılır.
- URL, dosya adından üretilir: `Devlet ve Adalet Üzerine.md` → `/posts/devlet-ve-adalet-uzerine/`
- Dipnot için GFM sözdizimi: metinde `[^1]`, dosya sonunda `[^1]: açıklama`
- Şiirlerde satır sonuna `\` koyarak satır kırması yapılır; boş satır yeni kıta demektir.

Sonra:

```sh
git add posts/yeni-yazi.md
git commit -m "Yeni yazı"
git push
```

1-2 dakika içinde site güncellenir.

## Lokal çalıştırma

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # statik çıktı: out/
```

## PPOD

The Pages workflow also checks out `Padrosum/ppod`, builds it, and adds its static output under `out/ppod/`. The personal site stays at the root while the podcast is served at `https://padrosum.uk/ppod/`.

To rebuild this site automatically after a PPOD push, add a fine-grained token with repository dispatch permission as `PERSONAL_SITE_DISPATCH_TOKEN` in `Padrosum/ppod` repository secrets. The PPOD workflow then sends the `ppod-updated` event consumed here.
