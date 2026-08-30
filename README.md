<div align="center">

# fonzip-mcp

**[Fonzip](https://fonzip.com) API v2 için Model Context Protocol sunucusu**

Dernek ve vakıfların bağış, üye, aidat, etkinlik ve kampanya verilerine AI ajanlarından erişim.

[![npm](https://img.shields.io/npm/v/@ubaranzorlu/fonzip-mcp?color=cb3837&logo=npm)](https://www.npmjs.com/package/@ubaranzorlu/fonzip-mcp)
[![CI](https://github.com/ubaranzorlu/fonzip-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/ubaranzorlu/fonzip-mcp/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![MCP Registry](https://img.shields.io/badge/MCP%20Registry-io.github.ubaranzorlu%2Ffonzip-6E56CF)](https://registry.modelcontextprotocol.io)

</div>

---

Claude Code, Claude Desktop, Cursor, VS Code, Codex ve MCP destekleyen diğer istemcilerin Fonzip verilerinize doğrudan erişmesini sağlar.

```
Sen:    Bu ay kaç düzenli bağışçı kaydolmuş, toplam ne kadar?
Ajan:   [fonzip_donations / list çağrılır]
        Ağustos'ta 34 yeni düzenli bağışçı, aylık toplam 41.250 TL.
```

- **13 tool**, Fonzip API v2'nin **113 operasyonunu** kapsar
- Tool tanımları OpenAPI spec'inden **otomatik üretilir** — elle senkron tutulmaz
- OAuth2 `client_credentials`, token'ı süreçler arası saklama dahil
- Türkçe hata mesajları; hatalı çağrıda beklenen şema modele geri döner

## Kurulum

Node.js 20 veya üstü gerekir. Önce Fonzip'te **Ayarlar > Gelişmiş > Fonzip API** menüsünden **API anahtarı oluşturun**; size bir `client_id` ve `client_secret` verilir.

> [!IMPORTANT]
> Fonzip anahtarları `$2b$12$...` ile başlar. Kabukta **tek tırnak** kullanın — çift tırnak veya tırnaksız yazarsanız kabuk `$2b` ve `$12` kısımlarını değişken sanıp siler ve `HTTP 403` alırsınız. JSON dosyalarında bu sorun yoktur.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add fonzip \
  -e FONZIP_CLIENT_ID='...' \
  -e FONZIP_CLIENT_SECRET='...' \
  -- npx -y @ubaranzorlu/fonzip-mcp
```

Sadece bulunduğunuz projeye ekler. Tüm projelerde kullanmak için `-s user`, ekiple paylaşmak için `-s project` ekleyin.

</details>

<details>
<summary><b>Claude Desktop</b></summary>

**Ayarlar > Developer > Edit Config** ile `claude_desktop_config.json` dosyasını açın:

```json
{
  "mcpServers": {
    "fonzip": {
      "command": "npx",
      "args": ["-y", "@ubaranzorlu/fonzip-mcp"],
      "env": {
        "FONZIP_CLIENT_ID": "...",
        "FONZIP_CLIENT_SECRET": "..."
      }
    }
  }
}
```

Claude Desktop'ı yeniden başlatın.

</details>

<details>
<summary><b>Cursor</b></summary>

`~/.cursor/mcp.json` (global) veya proje kökünde `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "fonzip": {
      "command": "npx",
      "args": ["-y", "@ubaranzorlu/fonzip-mcp"],
      "env": {
        "FONZIP_CLIENT_ID": "...",
        "FONZIP_CLIENT_SECRET": "..."
      }
    }
  }
}
```

</details>

<details>
<summary><b>VS Code / GitHub Copilot</b></summary>

```bash
code --add-mcp '{"name":"fonzip","command":"npx","args":["-y","@ubaranzorlu/fonzip-mcp"],"env":{"FONZIP_CLIENT_ID":"...","FONZIP_CLIENT_SECRET":"..."}}'
```

Ya da `.vscode/mcp.json` dosyasına yazıp anahtarları girdi olarak sorun:

```json
{
  "inputs": [
    { "type": "promptString", "id": "fonzip-id", "description": "Fonzip client id", "password": true },
    { "type": "promptString", "id": "fonzip-secret", "description": "Fonzip client secret", "password": true }
  ],
  "servers": {
    "fonzip": {
      "command": "npx",
      "args": ["-y", "@ubaranzorlu/fonzip-mcp"],
      "env": {
        "FONZIP_CLIENT_ID": "${input:fonzip-id}",
        "FONZIP_CLIENT_SECRET": "${input:fonzip-secret}"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Codex CLI</b></summary>

`~/.codex/config.toml`:

```toml
[mcp_servers.fonzip]
command = "npx"
args = ["-y", "@ubaranzorlu/fonzip-mcp"]
env = { FONZIP_CLIENT_ID = "...", FONZIP_CLIENT_SECRET = "..." }
```

</details>

<details>
<summary><b>Zed, Windsurf, Continue ve diğerleri</b></summary>

Standart stdio MCP sunucusudur. İstemcinizin yapılandırmasına şunu tanıtın:

```
komut:    npx
argüman:  -y @ubaranzorlu/fonzip-mcp
ortam:    FONZIP_CLIENT_ID, FONZIP_CLIENT_SECRET
```

Sunucu [MCP Registry](https://registry.modelcontextprotocol.io)'de `io.github.ubaranzorlu/fonzip` adıyla kayıtlıdır; registry'den kurulum destekleyen istemciler doğrudan bulabilir.

</details>

### Doğrulama

İstemcinize sorun: *"Fonzip hesabımın bilgilerini göster"* — sunucu `fonzip_system` / `me` çağrısıyla kurum adınızı döndürmeli.

## Ortam değişkenleri

| Değişken | Zorunlu | Varsayılan | Açıklama |
|---|---|---|---|
| `FONZIP_CLIENT_ID` | evet¹ | — | Fonzip API client id |
| `FONZIP_CLIENT_SECRET` | evet¹ | — | Fonzip API client secret |
| `FONZIP_ACCESS_TOKEN` | hayır | — | Hazır token. Verilirse `client_credentials` akışı atlanır |
| `FONZIP_BASE_URL` | hayır | `https://fonzip.com/api/v2` | API adresi |
| `FONZIP_SCHEMA_MODE` | hayır | `full` | `full` veya `compact` — [şema modu](#şema-modu) |
| `FONZIP_TOKEN_CACHE` | hayır | `~/.cache/fonzip-mcp/tokens.json` | Token önbelleği yolu. `off` ile kapatılır |
| `FONZIP_TIMEOUT_MS` | hayır | `30000` | İstek zaman aşımı |
| `FONZIP_MAX_RETRIES` | hayır | `3` | 429 ve 5xx için yeniden deneme sayısı |
| `FONZIP_USER_AGENT` | hayır | `fonzip-mcp/<sürüm>` | **Boş bırakmayın** — [neden](#bilinmesi-gerekenler) |

¹ `FONZIP_ACCESS_TOKEN` verilmediyse zorunlu.

## Tool'lar

Fonzip API v2'de 115 operasyon var. Her biri ayrı bir tool olsaydı istemcinin tool listesi şişerdi; bunun yerine operasyonlar konu başlığına göre 13 tool'da gruplandı. Her tool zorunlu bir `action` parametresi alır.

| Tool | Action | Kapsam |
|---|:--:|---|
| `fonzip_system` | 5 | Kurum bilgisi (`me`), ödeme sistemleri, banka hesapları, pazarlama kanalları |
| `fonzip_users` | 18 | Üye/bağışçı kayıtları, zaman tüneli, etiketler, kişiye bağlı listeler |
| `fonzip_donations` | 14 | Bağışlar, bağış kategorileri, mikro bağışlar, bağış sayfaları ve formları |
| `fonzip_monthly_donations` | 5 | Düzenli bağış tutar/kart değişikliği ve iptal |
| `fonzip_membership_dues` | 9 | Aidat abonelikleri ve borçlar |
| `fonzip_events` | 12 | Etkinlikler, biletler, bilet satışları |
| `fonzip_fundraising` | 19 | Bağış kampanyaları, kampanya etkinlikleri, takımlar |
| `fonzip_forms` | 4 | Formlar ve form cevapları |
| `fonzip_ecards` | 9 | E-kartlar, kategoriler, satış işlemleri |
| `fonzip_tags` | 4 | Etiket yönetimi |
| `fonzip_templates` | 5 | Mesaj şablonları |
| `fonzip_webhooks` | 6 | Webhook yönetimi ve test bildirimi |
| `fonzip_communication_permissions` | 3 | E-posta/SMS/telefon izinleri |

`/token` ve `/authorize` uçları tool olarak sunulmaz; kimlik doğrulama sunucunun kendi işidir.

Örnek çağrı:

```json
{
  "name": "fonzip_donations",
  "arguments": {
    "action": "list",
    "status": "paid",
    "start_date": "2026-01-01T00:00:00+03:00",
    "end_date": "2026-01-31T23:59:59+03:00"
  }
}
```

### Şema modu

`full` (varsayılan) modda her tool'un tüm parametreleri JSON Schema olarak istemciye gönderilir. 13 tool'un toplam şeması yaklaşık 70 KB (~19 bin token) tutar; model tek turda doğru çağrıyı kurabilir.

Bağlam bütçesi darsa `FONZIP_SCHEMA_MODE=compact` kullanın: şemalar yalnızca `action` ve serbest bir `params` objesine iner, alan adları ise tool açıklamasında özetlenir. Toplam yaklaşık 22 KB (~6 bin token), yani `full` modun üçte biri. Eksik alan gönderildiğinde hata mesajı o action'ın tam şemasını geri döndürür, böylece model kendini düzeltir.

Her iki modda da hem düz (`{"action": "get", "user_id": 1}`) hem sarmalanmış (`{"action": "get", "params": {"user_id": 1}}`) biçim kabul edilir.

## Bilinmesi gerekenler

**Fonzip aynı anda tek token verir.** Geçerli bir token varken `/token` çağrısı `HTTP 409 "Token already created"` döner. MCP sunucuları sık yeniden başlatıldığından, token varsayılan olarak `~/.cache/fonzip-mcp/tokens.json` dosyasına (`0600` izniyle, client id yazılmadan) kaydedilir ve yeniden başlatmada tekrar kullanılır. Bu önbelleği kapatırsanız sunucu yeniden başladığında bir saate kadar token alamayabilir.

**User-Agent zorunludur.** Fonzip'in önündeki Cloudflare, `User-Agent` başlığı olmayan istekleri `HTTP 403 (error code 1010)` ile reddeder. `FONZIP_USER_AGENT` değerini boş bırakmayın.

**Hız sınırı dakikada 240 istektir.** `HTTP 429` alındığında `Retry-After` başlığına uyularak yeniden denenir.

**İşlem listeleri tarih aralığı ister.** `start_date` ve `end_date` şu action'larda zorunludur; eksikse istek Fonzip'e gitmeden reddedilir:

`fonzip_donations` → `list`, `list_micro`, `report` · `fonzip_membership_dues` → `list` · `fonzip_events` → `list_ticket_sales` · `fonzip_forms` → `list_answers` · `fonzip_ecards` → `list_transactions`

Sayfalama (`start_page`, varsayılan 1) ve sayfa boyutu (`how_many`, varsayılan 10, en fazla 100) göndermezseniz varsayılanları otomatik eklenir. Aynı şekilde `fonzip_donations` / `list` için `status` varsayılan olarak `paid` gider.

**Yazma işlemleri açıktır.** Sunucu tüm CRUD operasyonlarını sunar; silme işlemleri geri alınamaz. Silme içeren tool'lar MCP `destructiveHint` ile işaretlenir, istemciniz bunlar için onay isteyebilir. Yalnızca okuma istiyorsanız Fonzip'te salt okunur yetkili bir API anahtarı oluşturun.

**Kişisel veri modele gider.** Fonzip yanıtları ad, e-posta, telefon, TC kimlik no ve IBAN içerebilir; bunlar MCP istemcinize ve kullandığınız modele aktarılır. KVKK yükümlülükleriniz açısından değerlendirin. Ayrıntı için [SECURITY.md](SECURITY.md).

**Büyük yanıtlar kırpılır.** 100.000 karakteri aşan yanıtlar kesilir ve sayfalama önerilir.

## Geliştirme

```bash
git clone https://github.com/ubaranzorlu/fonzip-mcp.git
cd fonzip-mcp
npm install
npm test        # 97 test
npm run build
```

Depoda `.mcp.json` var; `npm run build` sonrası Claude Code bu projede sunucuyu yerel `dist/` üzerinden çalıştırır. Kabuğunuzda `FONZIP_CLIENT_ID` ve `FONZIP_CLIENT_SECRET` tanımlı olmalıdır.

Tool tanımları elle yazılmaz — `scripts/generate.ts`, `openapi/fonzip-v2.yaml` dosyasından `src/generated/operations.ts` üretir. Ayrıntılar ve sürüm çıkarma adımları için [CONTRIBUTING.md](CONTRIBUTING.md).

## Katkı

Katkılar memnuniyetle karşılanır. Başlamadan önce [CONTRIBUTING.md](CONTRIBUTING.md) ve [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) dosyalarına göz atın. Güvenlik açıkları için [SECURITY.md](SECURITY.md).

## Lisans

[MIT](LICENSE) © Umut Baran Zorlu

Bu proje bağımsız bir açık kaynak çalışmasıdır; Fonzip tarafından geliştirilmemiştir ve desteklenmemektedir. API ile ilgili sorular için: help@fonzip.com
