# Templates

Struktur komponen undangan per kategori.

```
template/
├── wedding/
│   ├── WeddingLuxury/
│   ├── WeddingFloral/
│   └── WeddingMinimal/
├── birthday/
│   ├── BirthdayCute/
│   ├── BirthdayDark/
│   ├── BirthdayElegant/
│   └── SweetSeventeen/
└── general/
    ├── KoreanStyle/
    └── SimpleClean/
```

## ID template (`templateMap`)

| ID | Folder | Kategori |
|----|--------|----------|
| `wedding-luxury` | `wedding/WeddingLuxury` | wedding |
| `wedding-floral` | `wedding/WeddingFloral` | wedding |
| `wedding-minimal` | `wedding/WeddingMinimal` | wedding |
| `birthday-cute` | `birthday/BirthdayCute` | birthday |
| `birthday-dark` | `birthday/BirthdayDark` | birthday |
| `birthday-elegant` | `birthday/BirthdayElegant` | birthday |
| `sweet-seventeen` | `birthday/SweetSeventeen` | birthday |
| `korean-style` | `general/KoreanStyle` | general |
| `simple-clean` | `general/SimpleClean` | general |

## Pakai di data undangan

```ts
const fazriAisah: Invitation = {
  slug: "fazri-aisah",
  template: "wedding-floral", // ganti ID di sini
  // ...
}
```

Daftar lengkap: `src/data/templateMap.ts`

## Props setiap template

```tsx
{ data: Invitation, guest: string }
```

- **Wedding** → `data.couple.groom` & `data.couple.bride`
- **Birthday** → `groom` = nama, `bride` = tagline (opsional, mis. "Sweet 17")
- **General** → fleksibel, bisa pasangan atau satu nama
