import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Page affichée à la place de l'espace admin et de l'espace client, dont la
 * base de données est en pause. Le code d'origine n'a pas été supprimé : il
 * attend dans le dossier `_desactive/` à la racine du projet.
 *
 * Sans cette page, ces adresses renvoyaient une erreur serveur brute.
 */
export function EspaceIndisponible() {
  return (
    <section className="flex flex-1 items-center py-40">
      <Container className="flex flex-col items-start gap-8">
        <p className="label-mono">Accès suspendu</p>
        <h1 className="font-display max-w-[16ch] text-4xl leading-[1.04] tracking-[-0.025em] md:text-6xl">
          Espace temporairement <span className="em-serif">indisponible</span>
        </h1>
        <p className="max-w-md leading-relaxed text-muted text-pretty">
          Cet espace est momentanément fermé le temps d&apos;une mise à jour
          technique. Vos informations sont conservées et rien n&apos;est perdu.
          Pour toute question ou toute demande en cours, écrivez-nous : nous
          répondons vite.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/" size="lg">
            Retour à l&apos;accueil
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Nous contacter
          </Button>
        </div>
      </Container>
    </section>
  );
}
