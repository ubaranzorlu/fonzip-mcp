# Degisiklik gunlugu

Bu proje [Semantic Versioning](https://semver.org/lang/tr/) kullanir.

## [Yayinlanmamis]

### Eklendi
- `NOTICE` dosyasi: MIT lisansi yalnizca bu depodaki kodu kapsiyor.
  `openapi/fonzip-v2.yaml` Fonzip Yazilim A.S.'ye ait olup depoda sadece tool
  tanimlarinin uretilmesi icin referans olarak bulunuyor; spec'ten tureyen
  `src/generated/operations.ts` ve yayinlanan `dist/` icerigi de ayni kapsam
  disinda. Marka kullanimi ve bagimsizlik ibaresi de NOTICE'ta. Dosya npm
  paketine dahil ediliyor (`files`).

## [0.1.2] - 2026-08-30

### Duzeltildi
- MCP Registry yayini HTTP 422 ile reddediliyordu: `server.json` icindeki
  `description` 128 karakterdi, registry semasi en fazla 100 karaktere izin
  veriyor. Aciklama kisaltildi ve sinir `test/version.test.ts` ile dogrulaniyor.
- Release akisindaki registry adimi `|| echo` ile butun hatalari yutuyor,
  yayin dusse bile is yesil gorunuyordu. Artik yalnizca "surum zaten kayitli"
  durumu tolere ediliyor, diger hatalar akisi kirmizi yapiyor.

## [0.1.1] - 2026-08-30

### Degisti
- npm yayini artik Trusted Publishing (OIDC) ile yapiliyor; `NPM_TOKEN` sirri
  kaldirildi. Provenance imzasi otomatik uretiliyor.
- Desteklenen en dusuk Node surumu 20. Node 18, 2025-04'te EOL oldu ve gelistirme
  zinciri (vitest 4) artik uzerinde calismiyor. CI matrisi: 20, 22, 24.
- `zod` 3.25 -> 4.4 (SDK her ikisini de destekliyor; kaynak kodda dogrudan
  kullanilmiyor, MCP SDK'nin peer bagimliligi olarak tutuluyor)
- `actions/checkout` ve `actions/setup-node` v4 -> v7
- Gelistirme bagimliliklari: vitest 2 -> 4, @types/node 22 -> 26, typescript 5.7 -> 5.9

### Duzeltildi
- Release akisi npm isinde basarisiz oluyordu: Node `22.14` olarak tam surum
  pinlenmisti ve `npm@latest` (npm 12, Node >= 22.22.2 istiyor) kurulamiyordu.
  Node artik `22` (en son 22.x) ve npm yalnizca 11.5.1'in altindaysa npm@11'e
  yukseltiliyor.
- Yayin isinde bagimlilik onbellegi kapatildi (npm'in yayin derlemeleri icin
  onerisi).

## [0.1.0] - 2026-08-30

Ilk surum.

### Eklendi
- Fonzip API v2.40.0'in 113 operasyonunu kapsayan 13 MCP tool'u
- Tool tanimlarini `openapi/fonzip-v2.yaml` dosyasindan ureten `npm run generate`
- OAuth2 `client_credentials` akisi; token bellek ve dosya onbellegi
- Fonzip'in tek-token davranisi (HTTP 409 "Token already created") icin
  surecler arasi token saklama ve yol gosteren hata mesaji
- 429 icin `Retry-After` uyumlu, 5xx icin ustel geri cekilmeli yeniden deneme
- `full` ve `compact` sema modlari
- Turkce hata mesajlari; gecersiz cagrida beklenen semanin geri dondurulmesi
- Gercek API'ye karsi salt okunur duman testi (`npm run smoke`)
- MCP Registry kaydi (`server.json`, `io.github.ubaranzorlu/fonzip`)
- Etiket ile tetiklenen yayin akisi: npm (provenance imzali) ve MCP Registry

[Yayinlanmamis]: https://github.com/ubaranzorlu/fonzip-mcp/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/ubaranzorlu/fonzip-mcp/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/ubaranzorlu/fonzip-mcp/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/ubaranzorlu/fonzip-mcp/releases/tag/v0.1.0
