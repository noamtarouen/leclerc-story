# 🏎️ CHARLES LECLERC — Expérience 3D immersive

> Site biographique avec effet **zoom 3D dans le casque** au scroll. Réalisé en HTML/CSS/JS vanilla par **[StudWeb](https://github.com/noamtarouen)**.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SVG](https://img.shields.io/badge/SVG-Custom-FFC60A?style=for-the-badge)
![Ferrari](https://img.shields.io/badge/Theme-Ferrari%20Red-dc0000?style=for-the-badge)

---

## 🌐 Voir en ligne

👉 **[Lancer l'expérience 3D](https://noamtarouen.github.io/leclerc-story/)**

> Conseil : utilise un grand écran et **scrolle lentement** dans la première section pour profiter pleinement de l'effet de zoom à travers le casque.

⚠️ *Site non-officiel, sans affiliation avec Charles Leclerc, Scuderia Ferrari ou la Principauté de Monaco.*

## 🎬 L'effet 3D — explication technique

Quand on scrolle dans le hero (section de 250vh), on "rentre" dans une scène composée de **6 couches superposées en perspective CSS**. Chaque couche se transforme à sa propre vitesse :

| Couche | Profondeur Z | Animation au scroll |
|--------|--------------|---------------------|
| ⭐ Étoiles | -1200px | Léger zoom, opacité ↓ |
| 🌅 Glow rouge | -800px | Grossit modérément |
| ⭕ Cercles concentriques | -500px | Explosent vers l'extérieur |
| ✨ Rayons radiaux | -200px | Grossissent + rotation |
| 🪖 **Casque Leclerc (SVG)** | 0px | **Zoom ×6** exponentiel + tilt 3D |
| ✍️ Titre overlay | +180px | Fade out rapide |

L'illusion : on **traverse le casque** comme dans un wormhole F1.

### Bonus interactif
- **Mouse tilt** : les cercles s'inclinent selon la position de la souris
- **Compteurs animés** : statistiques qui s'incrémentent avec easing cubique
- **Timeline carrière** : reveal au scroll

## 🪖 Le casque (SVG vectoriel custom)

Dessiné à la main en SVG avec :
- **Coque rouge Ferrari** en dégradé
- **Visière sombre** avec reflets dynamiques
- **Numéro 16** + texte "LECLERC"
- **Accents jaunes** (or Monaco)
- Filtre `drop-shadow` rouge profond
- Détails : boulons, vis, ombrage

## 📚 Sections

1. **Hero 3D** — Scène immersive avec casque
2. **Bio** — Origines, famille Bianchi/Leclerc
3. **Carrière** — Timeline 2016 → 2024
4. **Stats** — 6 chiffres animés
5. **Monaco 2024** — Section dédiée au moment historique (premier Monégasque vainqueur depuis 1931)

## 🛠️ Stack

- **HTML5** sémantique + SVG custom
- **CSS3** : `perspective`, `transform-style: preserve-3d`, gradients, animations keyframes
- **JavaScript** vanilla : boucle `requestAnimationFrame`, lerp pour le tilt, IntersectionObserver
- **Typographies** : Anton (display), Inter (corps), JetBrains Mono (stats)
- **Zero dépendance** — pas de framework, pas de build

## 📦 Structure

```
leclerc-story/
├── index.html      # Structure + SVG casque
├── styles.css      # Système 3D + design Ferrari/Monaco
├── script.js       # Scroll-driven transforms + mouse tilt
└── README.md
```

## 🚀 Lancer en local

```bash
git clone https://github.com/noamtarouen/leclerc-story.git
cd leclerc-story
open index.html
```

---

## 💼 À propos de StudWeb

**StudWeb** crée des sites web professionnels et immersifs, livrés en 48h, sans abonnement.

| Formule | Tarif | Idéal pour |
|---------|------|------------|
| 🟢 **Essentiel** | **89 €** | Page vitrine simple |
| 🔵 **Pro** | **199 €** | Site multi-pages |
| 🟣 **Premium** | **349 €** | Site immersif 3D (comme celui-ci) |

✅ Sans abonnement &nbsp;•&nbsp; ✅ Code propre &nbsp;•&nbsp; ✅ Livraison 48h &nbsp;•&nbsp; ✅ Hébergement GitHub Pages offert

**📂 Autres démos du portfolio :**
- [Démo SFR](https://github.com/noamtarouen/demo-sfr) — corporate télécom
- [Démo Max Verstappen](https://github.com/noamtarouen/verstappen-story) — storytelling F1

---

<sub>© 2026 StudWeb — Built with ❤️ & AI · Stats Leclerc mises à jour fin saison 2024</sub>
