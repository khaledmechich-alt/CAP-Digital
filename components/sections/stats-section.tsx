import { stats } from "@/lib/stats";
import { Container } from "@/components/ui/container";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal } from "@/components/ui/reveal";

export function StatsSection() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.1}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="font-display text-5xl font-bold tracking-tight text-gradient-accent md:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm text-muted">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
