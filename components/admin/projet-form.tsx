import { ETAPES, type Projet } from "@/lib/projets";

const inputClasses =
  "w-full rounded-xl border border-border-subtle bg-background px-4 py-3 text-sm placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";

function Champ({
  id,
  label,
  aide,
  children,
}: {
  id: string;
  label: string;
  aide?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {aide && <p className="text-xs text-muted">{aide}</p>}
    </div>
  );
}

export function ProjetForm({
  action,
  projet,
  libelleBouton,
}: {
  action: (donnees: FormData) => void | Promise<void>;
  projet?: Projet;
  libelleBouton: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-8">
      {projet && <input type="hidden" name="id" value={projet.id} />}

      {/* Le client et son projet */}
      <fieldset className="flex flex-col gap-5">
        <legend className="mb-1 text-sm font-semibold uppercase tracking-widest text-muted">
          Le client et son projet
        </legend>

        <Champ
          id="client_email"
          label="E-mail du client *"
          aide="C'est la clé de tout : le client ne verra ce projet que s'il crée son compte avec exactement cette adresse."
        >
          <input
            id="client_email"
            name="client_email"
            type="email"
            required
            defaultValue={projet?.client_email ?? ""}
            placeholder="client@exemple.fr"
            className={inputClasses}
          />
        </Champ>

        <Champ id="client_name" label="Nom du client">
          <input
            id="client_name"
            name="client_name"
            type="text"
            defaultValue={projet?.client_name ?? ""}
            placeholder="Boulangerie Martin"
            className={inputClasses}
          />
        </Champ>

        <Champ id="titre" label="Nom du projet *">
          <input
            id="titre"
            name="titre"
            type="text"
            required
            defaultValue={projet?.titre ?? ""}
            placeholder="Site vitrine — Boulangerie Martin"
            className={inputClasses}
          />
        </Champ>
      </fieldset>

      {/* L'avancement */}
      <fieldset className="flex flex-col gap-5">
        <legend className="mb-1 text-sm font-semibold uppercase tracking-widest text-muted">
          L&apos;avancement
        </legend>

        <Champ
          id="etape"
          label="Étape en cours"
          aide="C'est ce que votre client voit en premier dans son espace."
        >
          <select
            id="etape"
            name="etape"
            defaultValue={String(projet?.etape ?? 1)}
            className={inputClasses}
          >
            {ETAPES.map((etape) => (
              <option key={etape.numero} value={etape.numero}>
                {etape.numero}. {etape.titre}
              </option>
            ))}
          </select>
        </Champ>

        <Champ id="date_prevue" label="Date de livraison prévue">
          <input
            id="date_prevue"
            name="date_prevue"
            type="date"
            defaultValue={projet?.date_prevue ?? ""}
            className={inputClasses}
          />
        </Champ>

        <Champ
          id="note"
          label="Message pour le client"
          aide="Affiché tel quel dans son espace. Laissez vide si vous n'avez rien à dire."
        >
          <textarea
            id="note"
            name="note"
            rows={4}
            defaultValue={projet?.note ?? ""}
            placeholder="La maquette vous a été envoyée par e-mail, j'attends votre retour pour lancer le développement."
            className={inputClasses}
          />
        </Champ>
      </fieldset>

      {/* Les infos du site */}
      <fieldset className="flex flex-col gap-5">
        <legend className="mb-1 text-sm font-semibold uppercase tracking-widest text-muted">
          Les infos de son site
        </legend>
        <p className="-mt-3 text-xs text-muted">
          Tout ce bloc est facultatif — il se remplit plutôt en fin de projet.
          Les champs vides n&apos;apparaissent pas chez le client.
        </p>

        <Champ id="site_url" label="Adresse du site">
          <input
            id="site_url"
            name="site_url"
            type="url"
            defaultValue={projet?.site_url ?? ""}
            placeholder="https://boulangerie-martin.fr"
            className={inputClasses}
          />
        </Champ>

        <Champ id="nom_domaine" label="Nom de domaine">
          <input
            id="nom_domaine"
            name="nom_domaine"
            type="text"
            defaultValue={projet?.nom_domaine ?? ""}
            placeholder="boulangerie-martin.fr"
            className={inputClasses}
          />
        </Champ>

        <Champ id="renouvellement_domaine" label="Renouvellement du domaine">
          <input
            id="renouvellement_domaine"
            name="renouvellement_domaine"
            type="date"
            defaultValue={projet?.renouvellement_domaine ?? ""}
            className={inputClasses}
          />
        </Champ>

        <Champ
          id="url_backoffice"
          label="Adresse de son back-office"
          aide="L'adresse où il se connecte pour modifier son contenu, s'il en a un."
        >
          <input
            id="url_backoffice"
            name="url_backoffice"
            type="url"
            defaultValue={projet?.url_backoffice ?? ""}
            placeholder="https://boulangerie-martin.fr/admin"
            className={inputClasses}
          />
        </Champ>

        <Champ id="maintenance" label="Contrat de maintenance">
          <input
            id="maintenance"
            name="maintenance"
            type="text"
            defaultValue={projet?.maintenance ?? ""}
            placeholder="Formule Sérénité — jusqu'au 31/12/2026"
            className={inputClasses}
          />
        </Champ>
      </fieldset>

      <button
        type="submit"
        className="self-start rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
      >
        {libelleBouton}
      </button>
    </form>
  );
}
