# Katkıda bulunma

Katkılar memnuniyetle karşılanır. Büyük bir değişikliğe başlamadan önce bir issue açıp yaklaşımı konuşmak zaman kazandırır.

## Geliştirme ortamı

Node.js 18.17 veya üstü gerekir.

```bash
npm install
npm test
npm run typecheck
npm run build
```

## Proje yapısı

```
openapi/fonzip-v2.yaml      Fonzip API v2 spec'i (kaynak doğruluk)
server.json                 MCP Registry kaydı
.mcp.json                   Bu depoda çalışan ajanlar için sunucu tanımı
scripts/tool-map.ts         Tag → tool eşlemesi ve action adı istisnaları
scripts/generate.ts         Spec'ten src/generated/operations.ts üretir
scripts/sync-version.ts     Sürümü üç dosyada eşitler (npm version hook'u)
scripts/smoke.ts            Gerçek API'ye karşı salt okunur duman testi
src/config.ts               Ortam değişkenleri
src/token-store.ts          Süreçler arası token saklama
src/auth.ts                 OAuth2 client_credentials akışı
src/http.ts                 Yeniden deneme, zaman aşımı, hata çevirisi
src/client.ts               Operasyon + argüman → HTTP isteği
src/schema.ts               Tool şeması üretimi ve argüman doğrulama
src/server.ts               MCP sunucusu
src/generated/operations.ts Üretilen dosya — elle düzenlemeyin
```

## Tool tanımlarını değiştirme

`src/generated/operations.ts` elle düzenlenmez. Değişiklik iki yerden birine yapılır:

**Spec güncellemesi.** Fonzip yeni bir API sürümü yayınladığında `openapi/fonzip-v2.yaml` dosyasını değiştirip `npm run generate` çalıştırın.

**Gruplama veya adlandırma.** Bir tag'in hangi tool'a düşeceği, tool açıklamaları ve action adları `scripts/tool-map.ts` içindedir. Generator iki durumda hata verip durur:

- Spec'te hiçbir tool'a bağlanmamış bir tag varsa
- İki operasyon aynı tool içinde aynı action adını üretiyorsa

İkincisi için `ACTION_OVERRIDES` tablosuna bir giriş ekleyin.

Üretilen dosya depoya dahil edilir, böylece paketi kurmak için generator çalıştırmak gerekmez. Spec'e dokunan her PR'da `npm run generate` çıktısını da commit edin.

## Testler

Testler `test/` altındadır ve ağ erişimi gerektirmez; `fetch` enjekte edilir.

Yeni bir davranış eklerken testini de yazın. Özellikle:

- Spec'ten gelen bir varsayımı kodluyorsanız (`test/generated.test.ts` içindeki gibi) testi spec değiştiğinde kırılacak şekilde yazın
- Hata yollarını da test edin; bu sunucunun hata mesajları modelin kendini düzeltmesi için kullanılıyor

`scripts/smoke.ts` gerçek kimlik bilgisi ve ağ ister, bu yüzden otomatik pakete dahil değildir. Sadece okuma yapan action'ları çağırır; buraya kayıt değiştiren bir çağrı eklemeyin.

## Kod tarzı

- Yorumlar ve kullanıcıya dönen mesajlar Türkçe; kod tanımlayıcıları İngilizce
- `strict` TypeScript; `any` kullanmadan önce iki kez düşünün
- Yorum, kodun ne yaptığını değil neden öyle yaptığını anlatmalı

## Sürüm çıkarma

Yayınlama otomatiktir: `v*.*.*` biçiminde bir etiket push edildiğinde `.github/workflows/release.yml` paketi npm'e (provenance imzasıyla) ve ardından MCP Registry'ye gönderir, GitHub release'ini oluşturur.

Sürüm numarası **üç** dosyada geçer ve üçü de eşit olmalıdır; `test/version.test.ts` bunu doğrular:

| Dosya | Alan |
|---|---|
| `package.json` | `version` |
| `src/version.ts` | `VERSION` |
| `server.json` | `version` ve `packages[0].version` |

Adımlar:

Üçünü elle güncellemeniz gerekmez — `npm version` bunu yapar:

```bash
# 1. CHANGELOG.md'ye girdi ekleyin ve commit'leyin

# 2. Sürümü yükseltin: package.json bumplanır, sync-version.ts diğer ikisini
#    eşitler, npm commit'leyip etiketler
npm version minor

# 3. Doğrulayın
npm test && npm run build

# 4. Push edin; etiket release workflow'unu tetikler
git push --follow-tags
```

`npm version`, package.json'ı bumpladıktan sonra `version` script'ini çalıştırır; o da `scripts/sync-version.ts` ile `src/version.ts` ve `server.json` dosyalarını aynı sürüme çekip commit'e ekler.

Release workflow etiket ile üç dosyadaki sürümün eşleştiğini ayrıca kontrol eder; uyuşmazsa yayınlamadan durur.

### Kimlik doğrulama

Depoda **hiçbir yayın sırrı tutulmaz**. İki hedefe de OIDC ile kimlik doğrulanır:

| Hedef | Yöntem | Ön koşul |
|---|---|---|
| npm | Trusted Publishing (OIDC) | npmjs.com > paket > Settings > Trusted Publisher altında bu depo ve `release.yml` tanımlı |
| MCP Registry | GitHub OIDC | `server.json` içindeki ad `io.github.ubaranzorlu/` ile başlamalı |

İkisi de workflow'daki `id-token: write` iznine dayanır. Trusted publishing npm CLI ≥ 11.5.1 ve Node ≥ 22.14 ister; workflow npm'i açıkça yükseltir.

Provenance imzası trusted publishing ile otomatik üretilir — `--provenance` bayrağı veya `publishConfig.provenance` gerekmez. (Bu alan bilerek boş: dolu olsaydı yerelden `npm publish` provenance üretemediği için hata verirdi.)

Workflow aynı sürümü ikinci kez yayınlamaya çalışmaz; npm'de zaten varsa adımı atlar. Böylece bir release'i yeniden çalıştırmak güvenlidir.
