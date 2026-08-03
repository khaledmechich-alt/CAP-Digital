"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  question: string;
  answer: string;
};

/**
 * Questions/réponses en lignes séparées par des filets — pas de cartes.
 * Le « + » pivote en croix et la réponse se déplie en hauteur.
 */
export function Accordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("flex flex-col border-t border-border-subtle", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-border-subtle">
            <button
              type="button"
              className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
              id={`accordion-trigger-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span
                className={cn(
                  "font-display text-lg tracking-[-0.015em] text-balance transition-colors md:text-xl",
                  isOpen ? "text-foreground" : "text-muted group-hover:text-foreground"
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "mt-1 shrink-0 text-xl leading-none text-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isOpen && "rotate-135"
                )}
                aria-hidden
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`accordion-panel-${index}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${index}`}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="max-w-2xl pb-7 leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
