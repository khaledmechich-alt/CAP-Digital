# Les e-mails envoyés par l'espace client

Ces fichiers ne sont **pas** utilisés par le site : ce sont les modèles à
copier-coller dans le tableau de bord Supabase. Ils sont rangés ici pour que
vous les retrouviez et puissiez les modifier facilement.

## Comment mettre à jour un modèle

1. Ouvrez <https://supabase.com/dashboard> et sélectionnez votre projet.
2. Menu de gauche : **Authentication** → **Emails** (onglet « Templates »).
3. Choisissez le modèle concerné (voir le tableau ci-dessous).
4. Ouvrez le fichier `.html` correspondant, copiez **tout** son contenu et
   collez-le dans le champ « Message body », en remplaçant ce qui s'y trouve.
5. Renseignez aussi le champ « Subject » (l'objet du mail) indiqué ci-dessous.
6. Cliquez sur **Save**.

| Modèle Supabase  | Fichier                        | Objet à mettre                                              |
| ---------------- | ------------------------------ | ----------------------------------------------------------- |
| Confirm signup   | `confirmation-inscription.html` | Bienvenue chez CAP DIGITAL — confirmez votre adresse e-mail |

## Attention aux `{{ .ConfirmationURL }}`

Le texte `{{ .ConfirmationURL }}` est remplacé automatiquement par Supabase avec
le vrai lien de confirmation, unique pour chaque personne. **Ne le modifiez pas
et ne le supprimez pas** : sans lui, le client ne peut pas valider son compte.

## Le nom de l'expéditeur

Le modèle ci-dessus change le **contenu** du mail, pas son **expéditeur**. Tant
qu'aucun serveur d'envoi personnalisé (SMTP) n'est configuré dans Supabase, les
mails partent de « Supabase Auth <noreply@mail.app.supabase.io> ».

Pour afficher « CAP DIGITAL » à la place, il faut renseigner un SMTP dans
**Authentication → Emails → SMTP Settings**. À noter : sans SMTP personnalisé,
Supabase limite aussi le nombre d'e-mails envoyés par heure (quelques-uns
seulement) — c'est bloquant dès que plusieurs clients s'inscrivent le même jour.
