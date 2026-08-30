# Degisiklik gunlugu

Bu proje [Semantic Versioning](https://semver.org/lang/tr/) kullanir.

## [Yayinlanmamis]

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

[Yayinlanmamis]: https://github.com/ubaranzorlu/fonzip-mcp/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ubaranzorlu/fonzip-mcp/releases/tag/v0.1.0
