# DJ MATTY — Seznam úkolů pro web djmatty.cz

> Hodnocení a doporučení k webu [djmatty.cz](https://www.djmatty.cz).
> Úkoly jsou seřazené dle priority — od největšího dopadu na konverzi po dlouhodobé vylepšení.

**Legenda priorit:**
- 🔴 **P0** — Kritické, řešit hned
- 🟠 **P1** — Vysoká priorita
- 🟡 **P2** — Střední priorita
- 🟢 **P3** — Nízká priorita / dlouhodobé

**Legenda kategorií:** `obsah` · `vývoj` · `SEO` · `UX` · `právní`

---

## 🔴 P0 — Kritické (největší dopad na konverzi)

- [ ] **1. Přidat audio ukázky (mixy)** `obsah`
  DJ web bez možnosti poslechnout si, jak hraje, je největší slabina. Embed SoundCloud / Mixcloud nebo Spotify playlistu je nutnost. Ideálně 2–3 různé sety (svatba, klub, oldies).

- [ ] **2. Přidat video ukázku (showreel)** `obsah`
  30sekundový sestřih z akce prodá službu lépe než deset fotek. YouTube nebo Vimeo embed v hero sekci nebo galerii.

- [ ] **3. Cenový rámec / orientační cena** `obsah` `konverze`
  Aspoň „od XX XXX Kč / večer". Filtruje nevážné poptávky, zvyšuje kvalitu příchozích leadů a šetří čas oběma stranám.

- [ ] **4. Vyřešit duplikované reference** `obsah` `UX`
  Reference se v sekci opakují 2× — působí to jako pokus o nafouknutí. Buď nechat unikátní (a udělat z toho slider / carousel), nebo doplnit víc reálných referencí.

- [ ] **5. Napojit Google recenze / Mapy.cz** `obsah` `SEO`
  Externí ověřitelný zdroj váží mnohem víc než reference na vlastním webu. Embed widget nebo odkaz na Google Business Profile.

---

## 🟠 P1 — Vysoká priorita

- [ ] **6. Vylepšit hero sekci** `obsah` `UX`
  „Roztančím každou vaši akci" je hezké, ale neřekne klientovi to podstatné v prvních 3 vteřinách.
  - Přidat lokalitu do hlavního nadpisu („DJ pro svatby a večírky v Praze a okolí")
  - Sekundární CTA tlačítko („Poslechnout ukázku")
  - Zvážit změnu hlavního CTA na akčnější („Zjistit dostupnost termínu")

- [ ] **7. Opravit Instagram odkaz v patičce** `vývoj` `UX`
  Zobrazuje se jako dlouhá URL `https://www.instagram.com/djmattycz?igsh=...` místo ikony. Vypadá to jako chyba.

- [ ] **8. Zjednodušit kontaktní formulář** `UX` `konverze`
  6 polí je moc — víc polí = víc lidí, co formulář nedokončí. Redukovat na 3 povinná (jméno, kontakt, datum/typ akce), ostatní jako nepovinné. Přidat WhatsApp / Messenger jako alternativu.

- [ ] **9. Click-to-call tlačítko na mobilu** `UX` `konverze`
  Telefonní číslo je obyčejný text, není to klikatelné tlačítko. Na mobilu by mělo být velké CTA „Zavolat" s `tel:` odkazem.

- [ ] **10. GDPR + cookie lišta** `právní`
  Kontaktní formulář sbírá osobní údaje — chybí cookie banner i odkaz na zásady zpracování osobních údajů (privacy policy). V ČR povinnost.

- [ ] **11. Vyjasnit sekci „Působiště"** `obsah` `UX`
  Mix klubů (s odkazy) a sportovních klubů (bez kontextu) je matoucí. HC Slavia a Rytíři Kladno → moderace zápasů patří do Služeb, ne sem. Sjednotit formát, ideálně přidat loga.

---

## 🟡 P2 — Střední priorita

- [ ] **12. Strukturovaná data (Schema.org / JSON-LD)** `SEO` `vývoj`
  Implementovat `LocalBusiness` + `Person` + `Review` schema → Google pak může zobrazit hvězdičky přímo ve výsledcích vyhledávání, pomáhá lokálnímu SEO.

- [ ] **13. Galerie — popisky a lightbox** `obsah` `UX`
  Každá fotka by měla mít popisek s kontextem („Svatba pro 80 hostů, Zámek Loučeň, 2024"). Lightbox (např. PhotoSwipe, GLightbox) pro zvětšení po kliknutí.

- [ ] **14. FAQ sekce** `obsah` `SEO`
  Snižuje počet příchozích e-mailů a řeší časté pochybnosti:
  - Co je v ceně?
  - Vlastní aparatura?
  - Jezdíš mimo Prahu?
  - Záloha / platební podmínky?
  - Co když onemocníš (záloha / náhradník)?
  - Žánry / playlist na míru?

  Bonus: FAQ schema markup pro lepší zobrazení v Google.

- [ ] **15. Sticky header s CTA tlačítkem** `UX` `konverze`
  Hlavička je teď statická. Udělat z ní sticky (zafixovanou nahoře při scrollování) s tlačítkem „Poptávka" / „Zavolat" stále viditelným.

- [ ] **16. Logo wall klientů (B2B)** `obsah`
  Hornbach se zmiňuje v textu — udělat z toho vizuální „Hráli mi pro:" pod hero sekcí. Standardní prvek pro firemní klientelu.

- [ ] **17. Zmínka o vybavení (aparatura)** `obsah`
  Pro náročnější klienty (firmy, větší svatby) je značka aparatury (Pioneer, Allen & Heath, RCF atd.) a světel signál profesionality. Krátká sekce „Technika" nebo bullet pointy ve Službách.

---

## 🟢 P3 — Nízká priorita / dlouhodobé

- [ ] **18. Samostatné landing pages pro služby** `SEO` `vývoj`
  Současný single-page (vše na jedné stránce) limituje SEO. Vytvořit samostatné stránky pro hlavní klíčová slova („DJ na svatbu Praha", „DJ firemní večírek Praha", „DJ oslava narozenin Praha").

- [ ] **19. Blog / článková sekce** `SEO` `obsah`
  Články typu „Jak vybrat DJ na svatbu" nebo „Kolik stojí DJ na firemní večírek" budují SEO autoritu a přinášejí organický traffic dlouhodobě.

- [ ] **20. Kalendář dostupnosti** `UX` `vývoj`
  Měsíční pohled s blokovanými termíny (Calendly nebo vlastní řešení). Šetří čas oběma stranám.

- [ ] **21. Anglická verze** `obsah` `SEO`
  Pokud jsou zahraniční svatby v Praze v cílovce, EN verze (s `hreflang` tagy) se vyplatí. Praha je oblíbená destinace pro destination weddings.

---

## ✅ Co nechat (funguje dobře)

- Tmavý design s červeným akcentem
- Čistá typografie a vizuální hierarchie
- Logická struktura sekcí
- Lidsky napsané texty (ne korporátní)
- Mobilní menu (hamburger)
- SEO základ — meta tagy, canonical, Open Graph, Twitter Card
- Alt texty u obrázků

---

## 🎯 Doporučený postup

Pokud máš víkend, jdi po **P0 + P1** (11 bodů). Většina jsou úpravy obsahu, ne kódu, a dopad na konverzi bude nejvyšší.

**Quick wins (1–2 hodiny každý):**
1. SoundCloud / Mixcloud embed (audio ukázka)
2. Orientační cena na stránce
3. Opravené reference + odkaz na Google recenze
4. Oprava Instagram odkazu v patičce
5. Click-to-call tlačítko na mobilu

Těchto pět věcí má největší poměr přínosu k vynaloženému času — posunou web z „hezké vizitky" na „nástroj na získávání klientů".

---

*Vytvořeno: 15. května 2026*
