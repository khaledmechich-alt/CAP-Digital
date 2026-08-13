-- =====================================================================
--  DONNÉES DE TEST — deux projets fictifs pour capdigital4118@gmail.com
--
--  Objectif : voir à quoi ressemble l'espace client quand il est rempli,
--  avec un projet en cours et un projet déjà livré.
--
--  À EXÉCUTER dans Supabase :
--    1. https://supabase.com/dashboard → projet ka-digital
--    2. Menu de gauche : « SQL Editor » puis « New query »
--    3. Copiez-collez ce fichier et cliquez sur « Run »
--    4. Connectez-vous sur le site avec capdigital4118@gmail.com
--
--  ⚠️  CE SONT DE FAUSSES DONNÉES, dans votre vraie base de production.
--      Elles ne sont visibles que par ce compte, mais pensez à les
--      supprimer avant d'ouvrir l'espace à de vrais clients : le bloc
--      de nettoyage est tout en bas du fichier.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. Le projet EN COURS — un cabinet dentaire, en phase de développement
--    (étape 3 sur 5, soit 60 % d'avancement affiché)
-- ---------------------------------------------------------------------
insert into public.projets (
  client_email,
  client_name,
  titre,
  etape,
  date_prevue,
  note
) values (
  'capdigital4118@gmail.com',
  'Khaled',
  'Cabinet dentaire Rivière — Site vitrine',
  3,
  '2026-09-12',
  'Bonne nouvelle : la maquette est validée, on attaque le développement des pages. Il nous manque encore les photos du cabinet et les horaires définitifs pour finaliser la page Contact.'
);


-- ---------------------------------------------------------------------
-- 2. Le projet LIVRÉ — une boutique de foot, site en ligne
--    (étape 5 sur 5 : la carte affiche « Site en ligne » et les infos
--     techniques au lieu de la barre d'avancement)
-- ---------------------------------------------------------------------
insert into public.projets (
  client_email,
  client_name,
  titre,
  etape,
  date_prevue,
  note,
  site_url,
  nom_domaine,
  renouvellement_domaine,
  url_backoffice,
  maintenance
) values (
  'capdigital4118@gmail.com',
  'Khaled',
  'FootZone — Boutique en ligne',
  5,
  '2026-06-18',
  'Votre boutique est en ligne depuis juin. Nous avons ajouté le suivi des ventes et la page Nouveautés en octobre. N''hésitez pas si vous voulez faire évoluer le catalogue.',
  'https://www.footzone-demo.fr',
  'footzone-demo.fr',
  '2027-06-18',
  'https://www.footzone-demo.fr/admin',
  'Maintenance active — sauvegardes hebdomadaires et mises à jour de sécurité'
);


-- =====================================================================
--  POUR TOUT EFFACER PLUS TARD
--
--  Sélectionnez la ligne ci-dessous (sans les tirets de commentaire),
--  puis cliquez sur « Run ». Elle supprime UNIQUEMENT ces deux projets
--  de test, rien d'autre.
--
--  delete from public.projets
--   where client_email = 'capdigital4118@gmail.com'
--     and titre in (
--       'Cabinet dentaire Rivière — Site vitrine',
--       'FootZone — Boutique en ligne'
--     );
-- =====================================================================
