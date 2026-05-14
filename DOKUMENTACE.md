# Dokumentace webu DJ MATTY

## Obsah
1. [Struktura projektu](#1-struktura-projektu)
2. [Přehled sekcí stránky](#2-přehled-sekcí-stránky)
3. [Editace textů](#3-editace-textů)
4. [Správa fotografií](#4-správa-fotografií)
5. [Správa recenzí](#5-správa-recenzí)
6. [Správa karet služeb](#6-správa-karet-služeb)
7. [Správa Kde mě najdete](#7-správa-kde-mě-najdete)
8. [Kontaktní formulář](#8-kontaktní-formulář)
9. [SEO a sdílení](#9-seo-a-sdílení)
10. [Přechod na vlastní doménu](#10-přechod-na-vlastní-doménu)
11. [Lokální spuštění webu](#11-lokální-spuštění-webu)

---

## 1. Struktura projektu

```
djmatty/
├── index.html          ← celý web (HTML + vložené CSS + JS)
├── css/
│   ├── style.css       ← veškeré styly
│   └── fonts.css       ← @font-face deklarace pro self-hosted fonty
├── js/
│   └── main.js         ← veškerý JavaScript
├── fonts/              ← woff2 soubory fontů (Anton, Barlow Condensed, Outfit)
├── images/             ← fotografie, loga, favicony, OG obrázek
├── robots.txt          ← instrukce pro roboty vyhledávačů
├── sitemap.xml         ← mapa stránek pro Google
├── DOKUMENTACE.md      ← tento soubor
└── CLAUDE.md           ← instrukce pro AI asistenta
```

Web je **čistý statický HTML soubor** — žádný build, žádné závislosti. Stačí nahrát soubory na hosting a je hotovo.

---

## 2. Přehled sekcí stránky

| ID sekce    | Název             | Popis                                      |
|-------------|-------------------|--------------------------------------------|
| `#hero`     | Úvodní hero       | Velký titulek, foto v pozadí, CTA tlačítko |
| `#about`    | O mně             | Foto + text + statistiky (16+, 3300+, ★★★★★) |
| `#services` | Služby            | 4 karty: Svatby, Firemní večírky, Narozeniny, Kluby |
| `#reviews`  | Recenze           | Automaticky rolující karusel s 6 recenzemi  |
| `#gallery`  | Galerie           | Mřížka 6 fotek, klik otevře lightbox        |
| `#venues`   | Kde mě najdete    | 6 dlaždic s místy vystoupení                |
| `#contact`  | Kontakt           | Kontaktní info + formulář (Web3Forms)       |

Každá sekce začíná HTML komentářem `<!-- ─── NÁZEV ─── -->` — snadno ji najdete v `index.html`.

---

## 3. Editace textů

Všechny texty jsou přímo v souboru **`index.html`**. Otevřete ho v textovém editoru a hledejte příslušnou sekci.

### Název a základní info (hero sekce)

```html
<!-- hledejte sekci: ─── HERO ─── -->

<p class="hero-eyebrow">Profesionální DJ · Praha &amp; celá ČR</p>
<h1 class="hero-title"><span>ROZTANČÍM</span><br>KAŽDOU<br><span>VAŠI AKCI</span></h1>
<p class="hero-sub">16 LET ZKUŠENOSTÍ · PŘIZPŮSOBÍM SE KAŽDÉ AKCI</p>
```

- Slova ve `<span>` jsou zobrazena červeně.
- `&amp;` je HTML kód pro `&`.

### Text „O mně"

```html
<!-- hledejte sekci: ─── O MNĚ ─── -->

<h2 class="section-title">16 LET ZA<br>MIXPULTEM</h2>
<p>
  Jsem multižánrový DJ s více než 16 lety zkušeností...
</p>
```

### Statistiky (16+, 3300+, hvězdičky)

```html
<span class="counter" data-target="16">0</span>
<span class="counter" data-target="3300">0</span>
```

Číslo v `data-target` určuje konečnou hodnotu animace. Počáteční hodnota `0` je přepsána animací při rolování.

### Kontaktní údaje

```html
<!-- hledejte sekci: ─── KONTAKT ─── -->

<a href="mailto:info@djmatty.cz">info@djmatty.cz</a>
<a href="tel:+420775118192">+420 775 118 192</a>
```

Změňte e-mail a telefon na obou místech — v atributu `href` i v textu.

### Copyright ve footeru

```html
<p class="footer-copy">© 2025 DJ MATTY · Všechna práva vyhrazena</p>
```

---

## 4. Správa fotografií

### Kde jsou fotky uloženy

Všechny fotky jsou ve složce **`images/`**.

| Soubor                     | Použití                         |
|----------------------------|---------------------------------|
| `Matty_01-2-2.jpg`         | Pozadí hero sekce               |
| `matty_02.jpg`             | Foto v sekci O mně + galerie     |
| `IMG_5459.jpg` – `IMG_7425.jpg` | Fotky v galerii             |
| `djMATTY-logo_cervena-radka-1.png` | Logo (nav + loader + footer) |
| `og-image.jpg`             | Náhledový obrázek pro sdílení  |
| `logo_cafe80th.png`        | Logo Cafe 80's (Kde mě najdete) |
| `logo_harlys.png`          | Logo Harlys Prague              |
| `logo_pm.png`              | Logo PM Club                    |
| `favicon-*.png`, `apple-touch-icon.png` | Favicony          |

### Jak přidat fotku do galerie

1. Zkopírujte fotku do složky `images/` (doporučený formát: JPEG, max 300 KB, alespoň 800×600 px).
2. V `index.html` najděte sekci `─── GALERIE ───`.
3. Zkopírujte celý blok `<div class="g-item ...">` a vložte ho za poslední fotku:

```html
<div class="g-item reveal" style="transition-delay:0.35s" onclick="openLightbox('images/NOVA_FOTKA.jpg')">
  <img src="images/NOVA_FOTKA.jpg" alt="Popis fotky" loading="lazy" />
  <div class="g-overlay">
    <svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
  </div>
</div>
```

- `transition-delay` zvyšujte o `0.05s` pro každou další fotku (plynulý nástup animace).
- `alt` popis je důležitý pro SEO — popište co je na fotce.

**Poznámka k mřížce:** Galerie je 3 sloupce na desktopu, 2 sloupce na mobilu. Fotky fungují nejlépe po 3 nebo 6.

### Jak odebrat fotku z galerie

Smažte celý blok `<div class="g-item ...">...</div>` příslušné fotky. Soubor z `images/` můžete smazat také.

### Jak změnit hero pozadí

```html
<!-- css/style.css, sekce HERO -->
.hero-bg {
  background-image: url('../images/Matty_01-2-2.jpg');  ← změňte název souboru
}
```

Nebo přímo v `index.html` — pokud chcete mít `style` inline, přidejte jej na `.hero-bg` element.

### Jak změnit fotku v sekci O mně

```html
<img class="about-photo" src="images/matty_02.jpg" alt="DJ MATTY" loading="lazy" />
```

Změňte `src` na jiný soubor.

---

## 5. Správa recenzí

Recenze jsou v sekci `─── RECENZE ───` v souboru `index.html`.

**Důležité:** každá recenze je v souboru **dvakrát** — originál a kopie. Karusel funguje tak, že roluje přes dvojnásobnou sadu a pak skočí na začátek. Proto musíte přidat/odebrat recenzi vždy na **obou místech**.

Komentář v HTML odděluje obě sady:
```html
<!-- Duplicate set for seamless loop -->
```

### Struktura jedné recenzní karty

```html
<div class="review-card">
  <div class="review-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
  <div class="review-quote">"</div>
  <p class="review-text">Text recenze...</p>
  <div class="review-author">
    <div class="review-name">Jméno Příjmení</div>
    <div class="review-event">Typ akce</div>
  </div>
</div>
```

### Jak přidat novou recenzi

1. Zkopírujte jeden blok `<div class="review-card">...</div>`.
2. Vložte ho **za poslední kartu** první sady (před komentář `<!-- Duplicate set for seamless loop -->`).
3. Stejný blok vložte také **za poslední kartu** druhé sady (na konec `<div class="reviews-track">`).
4. Vyplňte text recenze, jméno a typ akce.

### Jak odebrat recenzi

Smažte příslušný blok `<div class="review-card">...</div>` **na obou místech** (v první i druhé sadě).

### Rychlost karuselu

V `css/style.css` najděte:
```css
animation: scrollReviews 52s linear infinite;
```
Číslo `52s` je délka cyklu. Čím větší číslo, tím pomalejší rolování.

---

## 6. Správa karet služeb

Karty jsou v sekci `─── SLUŽBY ───`.

### Struktura karty

```html
<div class="service-card reveal" style="transition-delay:0.1s">
  <span class="service-icon">💍</span>
  <div class="service-name">Název služby</div>
  <p class="service-desc">Popis služby...</p>
</div>
```

### Jak přidat kartu

Zkopírujte celý blok `<div class="service-card ...">...</div>` a vložte do `.services-grid`. Zvyšte `transition-delay` o `0.1s`.

**Poznámka:** Mřížka je nastavena na 2 sloupce. Lichý počet karet bude vypadat divně na desktopu — držte se násobků 2.

### Jak odebrat kartu

Smažte příslušný blok `<div class="service-card ...">...</div>`.

---

## 7. Správa Kde mě najdete

Dlaždice jsou v sekci `─── KDE HRAJI ───`.

### Dlaždice s logem (klub s odkazem)

```html
<a class="venue-item reveal" href="https://adresa-klubu.cz/" target="_blank" rel="noopener"
   style="transition-delay:0.05s; text-decoration:none;">
  <div class="venue-logo-wrap">
    <img src="images/logo_nazev.png" alt="Název klubu" class="venue-logo" />
  </div>
  <div>
    <div class="venue-name">Název klubu</div>
    <div class="venue-role">Role (Resident DJ apod.)</div>
  </div>
</a>
```

- Pro logo na světlém podkladu: `class="venue-logo-wrap"` (bílé pozadí)
- Pro logo na tmavém podkladu: `class="venue-logo-wrap venue-logo-wrap--dark"` (tmavé pozadí)

### Dlaždice bez loga (červená tečka)

```html
<div class="venue-item reveal" style="transition-delay:0.2s">
  <div class="venue-dot"></div>
  <div>
    <div class="venue-name">Název</div>
    <div class="venue-role">Role</div>
  </div>
</div>
```

### Jak přidat nové místo

Zkopírujte příslušný typ dlaždice a vložte do `.venues-grid`. Zvyšte `transition-delay` o `0.05s`.

### Jak odebrat místo

Smažte celý blok `<div class="venue-item ...">...</div>` (nebo `<a class="venue-item ...">...</a>`).

---

## 8. Kontaktní formulář

Formulář odesílá zprávy přes službu **[Web3Forms](https://web3forms.com/)** — bez vlastního serveru, zdarma pro statické weby.

### Jak to funguje

1. Návštěvník vyplní formulář a klikne na "Odeslat poptávku".
2. JS (main.js) pošle data na `https://api.web3forms.com/submit` jako HTTP POST.
3. Web3Forms zprávu přepošle na e-mail přiřazený k vašemu API klíči.
4. Stránka zobrazí zelené potvrzení nebo červenou chybovou zprávu.

Formulář nepotřebuje backend ani server — funguje čistě z prohlížeče.

### API klíč (kam zprávy chodí)

Klíč je uložen v skrytém poli formuláře v `index.html`:
```html
<input type="hidden" name="access_key" value="ffcf9aa4-97c7-4f0f-bae8-62b28dacb083" />
```

Tento klíč je svázán s e-mailovou adresou, na kterou byl zaregistrován na web3forms.com.

### Jak získat nový klíč (pro jiný e-mail)

1. Jděte na [web3forms.com](https://web3forms.com/)
2. Zadejte cílovou e-mailovou adresu a klikněte na **"Create your Access Key"**
3. Na e-mail vám přijde potvrzení — klikněte na odkaz pro aktivaci klíče
4. Zkopírujte vygenerovaný klíč a nahraďte hodnotu `value="..."` v HTML

Bezplatný tier: **250 zpráv měsíčně** — pro DJ web zcela dostačující.

### Jak otestovat formulář

Nejjednodušší způsob — vyplňte formulář přímo na webu. Zpráva by měla dorazit do ~1 minuty.

Pro rychlý test z příkazové řádky (curl):
```bash
curl -X POST https://api.web3forms.com/submit \
  -d "access_key=ffcf9aa4-97c7-4f0f-bae8-62b28dacb083" \
  -d "name=Test" \
  -d "email=test@test.cz" \
  -d "message=Testovaci zprava"
```
Odpověď `{"success":true}` znamená, že zpráva byla odeslána.

### Zpráva nepřišla — co zkontrolovat

1. **Spam/Junk složka** — první zprávy z nové domény tam mohou skončit
2. **Aktivace klíče** — klíč musí být potvrzen kliknutím na e-mail z Web3Forms
3. **Botcheck pole** — v HTML je `<input type="checkbox" name="botcheck" style="display:none">`. Pokud by ho bot zaškrtl, Web3Forms zprávu odmítne. Toto pole nesmí být odstraněno.
4. **Limit** — bezplatný tier má 250 zpráv/měsíc; při překročení zprávy neprojdou

### Jak změnit předmět e-mailu

V HTML formuláři:
```html
<input type="hidden" name="subject" value="Nová poptávka z djmatty.cz" />
```

### Jak přidat novou možnost do dropdownu

```html
<select id="ftype" name="type_akce">
  <option value="" disabled selected>Vyberte typ akce</option>
  <option>Svatba</option>
  <option>Firemní večírek</option>
  <option>Narozeninová oslava</option>
  <option>Klub / Bar</option>
  <option>Jiné</option>           ← přidejte sem novou řádku
</select>
```

### Pole Datum akce (Flatpickr)

Formulář obsahuje pole pro výběr data akce, které používá knihovnu **[Flatpickr](https://flatpickr.js.org/)** — nahrazuje nativní prohlížečový picker vlastním, větším kalendářem přizpůsobeným tmavému tématu.

**Jak funguje:**
- Kliknutím na pole se otevře kalendář
- Minulé termíny jsou zašedlé a nelze je vybrat (`minDate: 'today'`)
- Dnešní datum je podtrženo červenou linkou
- Na mobilech se otevře nativní dotykový picker (`disableMobile: false`)
- Do e-mailu přijde datum ve formátu `dd.mm.rrrr` (např. `15.07.2026`)

**Závislosti** (načítány z CDN, nepotřebují lokální soubory):
```html
<!-- v <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />

<!-- před </body> -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/cs.js"></script>
```

**Nastavení** (v `js/main.js`):
```js
flatpickr('#fdate', {
  locale: 'cs',        // české názvy měsíců a dnů
  dateFormat: 'd.m.Y', // formát hodnoty odeslané v emailu
  minDate: 'today',    // zákaz minulých termínů
  disableMobile: false // mobil používá nativní picker
});
```

**Jak změnit formát data v e-mailu:**
Upravte `dateFormat` v inicializaci Flatpickr v `main.js`. Příklady: `'d.m.Y'` → `15.07.2026`, `'d/m/Y'` → `15/07/2026`, `'Y-m-d'` → `2026-07-15`.

**Jak zakázat konkrétní dny** (např. pondělí):
```js
flatpickr('#fdate', {
  locale: 'cs',
  dateFormat: 'd.m.Y',
  minDate: 'today',
  disable: [
    function(date) { return date.getDay() === 1; } // 0=Ne, 1=Po, ...
  ]
});
```

---

## 9. SEO a sdílení

### Kde editovat title, description a OG tagy

Vše je v `<head>` souboru `index.html`:

```html
<title>DJ MATTY — Profesionální DJ | Svatby, Večírky, Praha</title>
<meta name="description" content="..." />

<!-- Pro sdílení na Facebooku, WhatsApp, iMessage -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="...images/og-image.jpg" />
```

### OG obrázek (náhled při sdílení)

Soubor: `images/og-image.jpg` — rozměr 1200×630 px.

Při změně obrázku musíte aktualizovat i cesty v `<head>`:
```html
<meta property="og:image" content="https://www.djmatty.cz/images/NOVY_OBRAZEK.jpg" />
<meta name="twitter:image" content="https://www.djmatty.cz/images/NOVY_OBRAZEK.jpg" />
```

### Sitemap a robots.txt

- `sitemap.xml` — seznam URL pro Google. Aktualizujte `<lastmod>` při větší změně obsahu.
- `robots.txt` — aktuálně povoluje indexaci všeho.

---

## 10. Vlastní doména djmatty.cz

Web je připraven na doménu `https://www.djmatty.cz/`. Všechny SEO prvky (canonical, og:url, og:image, twitter:image, JSON-LD, robots.txt, sitemap.xml) již odkazují na tuto doménu.

**Zbývá nastavit na straně GitHubu:**
1. V repozitáři → Settings → Pages → Custom domain: zadejte `www.djmatty.cz`
2. U DNS registrátora přidejte CNAME záznam: `www` → `nocode23.github.io`
3. GitHub automaticky vygeneruje SSL certifikát (může trvat až 24 h)

---

## 11. Lokální spuštění webu

```bash
# Varianta 1 – Node.js
npx serve .

# Varianta 2 – Python
python3 -m http.server 8080
```

Pak otevřete `http://localhost:8080` v prohlížeči.

> Soubor `index.html` lze také otevřít přímo jako soubor (`file://...`), ale loader animation a formulář budou fungovat správně jen přes HTTP server.
