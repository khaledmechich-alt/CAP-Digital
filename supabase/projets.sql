-- =====================================================================
--  Table « projets » — le suivi des sites réalisés pour vos clients.
--
--  À EXÉCUTER UNE SEULE FOIS, dans Supabase :
--    1. Ouvrez votre projet sur https://supabase.com
--    2. Menu de gauche : « SQL Editor » puis « New query »
--    3. Copiez-collez TOUT ce fichier dans la fenêtre
--    4. Cliquez sur « Run »
--
--  Sans cette table, l'espace client et la page /admin/projets affichent
--  un message d'erreur : ils cherchent des données qui n'existent pas.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. La table
-- ---------------------------------------------------------------------
create table if not exists public.projets (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),

  -- Le client : c'est l'e-mail qui relie le projet au compte du client.
  client_email            text not null,
  client_name             text,

  -- Le suivi
  titre                   text not null default 'Projet sans titre',
  etape                   smallint not null default 1 check (etape between 1 and 5),
  date_prevue             date,
  note                    text,

  -- Les infos du site livré
  site_url                text,
  nom_domaine             text,
  renouvellement_domaine  date,
  url_backoffice          text,
  maintenance             text
);

-- Recherche rapide des projets d'un client.
create index if not exists projets_client_email_idx
  on public.projets (lower(client_email));


-- ---------------------------------------------------------------------
-- 2. Qui est administrateur ?
--
--    ATTENTION : cette adresse doit être IDENTIQUE à la variable
--    ADMIN_EMAIL de votre fichier .env.local et de Vercel.
--    Si vous changez d'adresse admin un jour, rejouez ce bloc.
-- ---------------------------------------------------------------------
create or replace function public.est_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = 'khaled.mechich@gmail.com';
$$;


-- ---------------------------------------------------------------------
-- 3. La sécurité (RLS)
--
--    Sans ces règles, n'importe quel client connecté pourrait lire les
--    projets des autres. Avec elles :
--      - un client ne voit QUE les projets portant son adresse e-mail ;
--      - l'administrateur voit et modifie tout.
-- ---------------------------------------------------------------------
alter table public.projets enable row level security;

drop policy if exists "Le client lit ses propres projets" on public.projets;
create policy "Le client lit ses propres projets"
  on public.projets
  for select
  to authenticated
  using (lower(client_email) = lower(coalesce(auth.jwt() ->> 'email', '')));

drop policy if exists "L'administrateur gere tous les projets" on public.projets;
create policy "L'administrateur gere tous les projets"
  on public.projets
  for all
  to authenticated
  using (public.est_admin())
  with check (public.est_admin());
