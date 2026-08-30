# Güvenlik politikası

## Güvenlik açığı bildirme

Güvenlik açıklarını **public issue olarak açmayın.**

GitHub'ın özel bildirim kanalını kullanın: [Security > Report a vulnerability](https://github.com/ubaranzorlu/fonzip-mcp/security/advisories/new)

Bildiriminizde şunlar yardımcı olur: etkilenen sürüm, açığın tetiklenme adımları ve etkisi. 72 saat içinde dönüş yapılır.

Fonzip API'sinin kendisiyle ilgili bir açık bulduysanız doğrudan Fonzip'e bildirin: help@fonzip.com

## Desteklenen sürümler

Proje 1.0.0'a ulaşana kadar yalnızca en son yayınlanan minor sürüm desteklenir.

| Sürüm | Destek |
|---|---|
| 0.1.x | ✅ |

## Bu sunucunun güvenlik modeli

Katkı verirken ve kullanırken bilinmesi gerekenler.

**Kimlik bilgileri ortam değişkenlerinden okunur.** `FONZIP_CLIENT_ID` ve `FONZIP_CLIENT_SECRET` hiçbir zaman diske yazılmaz ve log'a düşmez. Bunları kaynak koda veya versiyon kontrolüne koymayın; MCP istemcinizin yapılandırma dosyası da genelde versiyon kontrolündedir, dikkat edin.

**Token önbelleği diske yazılır.** Fonzip aynı anda tek token verdiği için erişim token'ı `~/.cache/fonzip-mcp/tokens.json` dosyasına `0600` izniyle kaydedilir. Dosyada yalnızca token ve son kullanma zamanı bulunur; client id ondan türetilen SHA-256 özetinin bir parçası olarak saklanır, açık metin olarak yazılmaz. Önbelleği `FONZIP_TOKEN_CACHE=off` ile kapatabilirsiniz — bunun sonuçları için README'deki tek-token notuna bakın.

**Sunucu yazma yetkisini kısıtlamaz.** Fonzip API v2'nin tüm CRUD operasyonları sunulur; silme işlemleri geri alınamaz. Yetki sınırı API anahtarının kendisiyle çizilir. Salt okunur kullanım istiyorsanız Fonzip'te salt okunur yetkili bir anahtar oluşturun — sunucu tarafında bir bayrakla kısıtlamak, anahtarın yetkisini gerçekten daraltmaz.

**Model çıktısı doğrudan API'ye gitmez.** Her tool çağrısı, spec'ten üretilmiş şemaya karşı doğrulanır; bilinmeyen alanlar reddedilir, path parametreleri URL-encode edilir. Yine de bir AI ajanına verdiğiniz Fonzip anahtarı, o ajanın o anahtarın yapabildiği her şeyi yapabileceği anlamına gelir.

**Yanıtlar modele aktarılır.** Fonzip'ten dönen kişisel veriler (ad, e-posta, telefon, TC kimlik no, IBAN) MCP istemcinize ve dolayısıyla kullandığınız modele gider. Hangi verinin nereye gittiğini KVKK yükümlülükleriniz açısından değerlendirin.
