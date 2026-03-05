# THE NEURONOMICON — neuronomicon.world

Source repo for **[neuronomicon.world](https://neuronomicon.world)** — a one-person cinematic universe set in a far-future humanity that built artificial gods to conquer the stars.

> *"Humanity built artificial gods to conquer the stars. They never explained why."*

---

## The Setting

The **Neuronomicon** is a shared sci-fi universe centered on the **Troy System** — a star system undergoing one of the most ambitious construction projects in human history: the **Ilion Ring**, a Dyson swarm assembled from thousands of mining platforms, habitation spires, and scaffolded lattice nodes orbiting the star Troy.

Stories take place across the ring's class divides — from Central Ilion's gleaming promenades to Umbra-3's rusted corridors — and follow the factions, clans, and individuals shaped by a civilization that never finished building itself.

---

## Stories

| ID | Title | Status |
|---|---|---|
| NMC-001 | **Star Wyrms** — Top Gun × Attack on Titan × Space Dragons | [Live on Royal Road](https://www.royalroad.com/fiction/146773/star-wyrms-top-gun-attack-on-titan-space-dragons) |
| NMC-002 | **Grind Fighter** — Hunger Games × Gladiator × Ghost in the Shell | [Live on Royal Road](https://www.royalroad.com/fiction/138724/grind-fighter-hunger-games-gladiator-ghost-in) |

---

## Site Routes

| Route | Description |
|---|---|
| `/` | Landing page — HUD interface with story carousel + project cards |
| `/wiki` | Lore archive — characters, factions, technology, locations |
| `/grind-fighter/arena` | Interactive AI tournament story generator |
| `/ilion-ring.html` | Ilion Ring visualizer — GitHub repos mapped to a Dyson swarm |
| `/history` | Tournament match history |

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **3D / Interactive:** [Three.js](https://threejs.org)
- **Database:** [Drizzle ORM](https://orm.drizzle.team) + Vercel Postgres
- **AI (Arena):** Anthropic Claude via AI SDK
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Fonts:** Orbitron, Share Tech Mono (Google Fonts)
- **Deployment:** [Vercel](https://vercel.com) → neuronomicon.world

---

## Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local   # fill in DB + Anthropic keys

# Run dev server
npm run dev
# → http://localhost:3000

# Sync wiki content from Obsidian vault
npm run sync:wiki
```

---

## Social

- **X/Twitter:** [@Erik_Knobl](https://x.com/Erik_Knobl)
- **YouTube:** [@NeuronomiconTV](https://www.youtube.com/@NeuronomiconTV)
