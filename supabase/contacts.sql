-- =====================================================================
--  Table « contacts » — les demandes envoyées via le formulaire du site.
--
--  À EXÉCUTER UNE SEULE FOIS, dans Supabase :
--    1. Ouvrez votre projet sur https://supabase.com
--    2. Menu de gauche : « SQL Editor » puis « New query »
--    3. Copiez-collez TOUT ce fichier dans la fenêtre
--    4. Cliquez sur « Run »
--
--  Sans cette table, le formulaire de contact affiche « L'envoi a échoué »
--  et la page /admin ne peut pas lister les demandes.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. La table
-- ---------------------------------------------------------------------
create table if not exists public.contacts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Les champs remplis par le visiteur
  name          text not null,
  email         text not null,
  phone         text,
  company       text,
  project_type  text,
  budget        text,
  message       text not null
);

-- Affichage des demandes les plus récentes en premier.
create index if not exists contacts_created_at_idx
  on public.contacts (created_at desc);


-- ---------------------------------------------------------------------
-- 2. La sécurité (RLS)
--
--    Deux besoins opposés à concilier :
--      - un visiteur NON connecté doit pouvoir ENVOYER une demande ;
--      - personne, à part l'administrateur, ne doit pouvoir LIRE ces
--        demandes (elles contiennent nom, e-mail et téléphone).
--
--    D'où : écriture ouverte, lecture réservée à l'admin.
-- ---------------------------------------------------------------------
alter table public.contacts enable row level security;

-- Le visiteur du site peut déposer une demande, sans être connecté.
drop policy if exists "Un visiteur peut envoyer une demande" on public.contacts;
create policy "Un visiteur peut envoyer une demande"
  on public.contacts
  for insert
  to anon, authenticated
  with check (true);

-- Seul l'administrateur peut relire les demandes reçues.
-- NB : la fonction public.est_admin() est créée par le fichier projets.sql.
--      Exécutez donc projets.sql AVANT ce fichier.
drop policy if exists "L'administrateur lit les demandes" on public.contacts;
create policy "L'administrateur lit les demandes"
  on public.contacts
  for select
  to authenticated
  using (public.est_admin());

drop policy if exists "L'administrateur gere les demandes" on public.contacts;
create policy "L'administrateur gere les demandes"
  on public.contacts
  for all
  to authenticated
  using (public.est_admin())
  with check (public.est_admin());
