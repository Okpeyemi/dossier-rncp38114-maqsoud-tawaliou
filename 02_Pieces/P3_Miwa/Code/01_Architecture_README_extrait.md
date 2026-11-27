# Miwa Platform : architecture (extrait du README)
Source : https://github.com/MiwaHQ/miwa-platform/blob/main/README.md · relu le 26/11/2026

La plateforme s'articule autour de quatre blocs :
1. Dashboard Web : administration de l'établissement (statistiques, présences, étudiants, rapports).
2. Terminal Tablette : application de badgeage installée à l'entrée (QR Code / matricule).
3. Backend, plateforme centrale : API REST temps réel, multi-tenant, sécurisée.
4. Organisations (multi-tenant) : chaque client possède ses propres données, strictement isolées.

```
Super Admin Plateforme (création organisations, templates, accès)
        |
        v
Backend API (Auth · multi-tenant · rôles · présences · logs)
   |                                   |
   v                                   v
Dashboard Web (admin établissement)    Terminal Tablette (scan QR / matricule)
   |                                   |
   +---------------+-------------------+
                   v
       PostgreSQL (données par organisation)
```

Structure : apps/api (NestJS, REST + Socket.IO) · apps/dashboard (Next.js) · apps/terminal (PWA) · packages/shared, types, ui · infra (Docker, Nginx).
Technologies : NestJS, PostgreSQL, Prisma, JWT + Refresh Token, Socket.IO, Next.js, React, Tailwind CSS, TypeScript, Docker. Cible matérielle : Samsung Galaxy Tab A9 / A9+.
Modules MVP : organisations, rôles, étudiants (import CSV/Excel), QR codes, pointage par matricule, activation des terminaux, présence temps réel, historique, retards et absences, rapports et exports, audit logs.
Principe multi-organisation : chaque table métier importante contient un organizationId, et chaque requête backend applique ce filtre. Une organisation ne voit jamais les données d'une autre.
Feuille de route : v0.3 prévoit un « mode hors-ligne robuste ».
