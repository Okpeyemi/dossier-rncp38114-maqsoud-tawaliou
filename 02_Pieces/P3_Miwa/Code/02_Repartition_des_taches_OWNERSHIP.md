# Répartition des tâches (docs/OWNERSHIP.md)
Source : https://github.com/MiwaHQ/miwa-platform/blob/main/docs/OWNERSHIP.md · relu le 26/11/2026

Deux développeurs travaillent sur le monorepo. Chacun est responsable de ses zones ; les zones partagées exigent une review croisée.

| Zone | Propriétaire |
|---|---|
| apps/dashboard/ | Frontend (@Okpeyemi) |
| apps/terminal/ | Frontend (@Okpeyemi) |
| packages/ui/ | Frontend (@Okpeyemi) |
| apps/api/ | Backend (@VynoDePal) |
| apps/api/prisma/ | Backend (@VynoDePal) |
| docs/api/openapi.yaml | Backend (owner) ; toute modification passe par une PR validée par le frontend |
| packages/shared/, docs/, racine, .github/ | Partagé, review croisée |

Règle du contrat API : docs/api/openapi.yaml est la frontière entre frontend et backend. Après merge, les types sont régénérés (pnpm gen:types).
