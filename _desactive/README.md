# Code désactivé — à conserver

Ce dossier contient du code **fonctionnel mais mis en sommeil**, parce que le
projet Supabase « ka-digital » est en pause. Rien n'a été supprimé.

Ce dossier n'est pas lu par Next.js : il est hors de `app/`, donc aucune de ces
pages n'est servie.

## Ce qui dort ici

| Dossier / fichier | Adresse d'origine |
|---|---|
| `admin/` | `/admin`, `/admin/login`, `/admin/projets…` |
| `espace-client/` | `/espace-client`, `/espace-client/connexion` |
| `auth/callback-route.ts` | `/auth/callback` (gestionnaire de route) |
| `middleware-supabase.ts` | `middleware.ts` à la racine |

Pendant ce temps, `/admin`, `/espace-client` et `/auth/callback` affichent une
page « Espace temporairement indisponible »
(`components/layout/espace-indisponible.tsx`), en `noindex`.

## Pour réactiver, une fois Supabase relancé

1. `git mv _desactive/admin app/admin`
2. `git mv _desactive/espace-client app/espace-client`
3. `git mv _desactive/auth/callback-route.ts app/auth/callback/route.ts`
   (et supprimer le `page.tsx` qui l'a remplacé)
4. `git mv _desactive/middleware-supabase.ts middleware.ts`
5. Supprimer les dossiers `app/admin/[[...segments]]` et
   `app/espace-client/[[...segments]]`
6. Remettre le bouton « Espace client » dans `components/layout/header.tsx` et
   le lien « Administration » dans `components/layout/footer.tsx`
7. Vérifier que les variables `NEXT_PUBLIC_SUPABASE_URL` et
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` pointent bien sur le projet relancé

À vérifier aussi au redémarrage : dans Supabase, Authentication > URL
Configuration, la **Site URL** doit pointer sur `https://www.capdigitalagency.fr`
et non sur `localhost`, sinon les liens de confirmation envoyés aux clients
sont inutilisables.
