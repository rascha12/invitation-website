# Halaman Undangan — `/invite/[slug]`

Dokumentasi untuk `page.tsx` di route ini.

## URL

```
/invite/{slug}?to={namaTamu}
```

| Bagian | Sumber | Contoh |
|--------|--------|--------|
| `slug` | Dynamic segment `[slug]` | `fazri-aisah` |
| `to` | Query `searchParams` (opsional) | `Rhisad.Family` |

**Contoh lengkap:**

```
http://localhost:3000/invite/fazri-aisah?to=Rhisad.Family
```

- `fazri-aisah` → lookup di `invitations["fazri-aisah"]`
- `to=Rhisad.Family` → nama tamu; titik (`.`) diganti spasi → `Rhisad Family`

Tanpa `?to=`, tamu default: **Tamu Undangan**.

---

## Alur di `page.tsx`

```
1. await params        → slug dari URL
2. await searchParams  → to (nama tamu)
3. format guest        → to dengan "." → " "
4. invitations[slug]   → data undangan
5. templateMap[...]    → komponen template
6. <Template data guest />
```

### Next.js 16 — params & searchParams adalah Promise

Harus `async` + `await`. Jangan akses `params.slug` langsung tanpa await.

```tsx
export default async function InvitationPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { to } = await searchParams
  // ...
}
```

---

## File terkait

| File | Peran |
|------|--------|
| `src/data/invitations/index.ts` | Registry: slug URL → object `Invitation` |
| `src/data/invitations/wedding/informationModule/*.ts` | Data per pasangan (fazri, rama, dll.) |
| `src/data/invitations/wedding/index.ts` | Re-export dari `informationModule` |
| `src/data/templateMap.ts` | Registry: `template` string → komponen React |
| `src/components/template/` | Semua template (wedding, birthday, general) |
| `src/components/template/README.md` | Daftar ID template |
| `src/types/index.ts` | Type `Invitation`, `TemplateProps` |
| `src/lib/generateGuestLink.ts` | Helper bikin link tamu |

---

## Menambah undangan baru

### 1. Buat data

`src/data/invitations/wedding/informationModule/namaPasangan.ts`:

```ts
import type { Invitation } from "@/types"

const namaPasangan: Invitation = {
  slug: "slug-url",           // harus sama dengan key di registry
  template: "wedding-luxury",   // harus ada di templateMap
  couple: { groom: "...", bride: "..." },
  date: "...",
  time: "...",                // opsional
  venue: { name: "...", address: "..." },
}

export default namaPasangan
```

### 2. Export di wedding

`src/data/invitations/wedding/index.ts`:

```ts
import namaPasangan from "./informationModule/namaPasangan"
export { fazriAisah, ramaNisa, namaPasangan }
```

### 3. Daftarkan slug di registry

`src/data/invitations/index.ts`:

```ts
export const invitations = {
  "fazri-aisah": fazriAisah,
  "slug-url": namaPasangan,   // key = slug di URL
}
```

### 4. (Opsional) Template baru

Jika pakai template selain `wedding-luxury`:

1. Buat komponen di `src/components/template/...`
2. Daftarkan di `src/data/templateMap.ts`
3. Set `template: "id-baru"` di data undangan

---

## Generate link tamu

```ts
import { generateGuestLink } from "@/lib/generateGuestLink"

generateGuestLink("fazri-aisah", "Rhisad Family")
// → http://localhost:3000/invite/fazri-aisah?to=Rhisad+Family
```

---

## Troubleshooting

| Gejala | Penyebab umum |
|--------|----------------|
| **Invitation Not Found** | Slug belum ada di `invitations/index.ts`, atau typo slug |
| Slug kosong / salah | `params` tidak di-`await` (Next.js 16) |
| Template blank / error | `data.template` tidak ada di `templateMap` |
| Nama tamu aneh | Query `to` pakai titik; diubah ke spasi di `page.tsx` |

---

## Props ke template

```tsx
<Template data={data} guest={guest} />
```

- `data` — object `Invitation` (mempelai, tanggal, venue, dll.)
- `guest` — string nama tamu (dari `?to=` atau default)

Template baca field lewat `data.couple`, `data.date`, `data.venue`, dll. Lihat `WeddingLuxury` sebagai contoh.
