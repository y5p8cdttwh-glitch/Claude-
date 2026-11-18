import { Droplets, ShieldCheck, Sparkles, Hourglass } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

const benefits = [
  {
    icon: Droplets,
    title: 'Remoção de sujeiras',
    text: 'Retira poeira, resíduos e sujeiras que se acumulam no tecido com o uso, indo além da limpeza do dia a dia.',
  },
  {
    icon: ShieldCheck,
    title: 'Cuidado com o tecido',
    text: 'Avaliamos o material antes de começar e usamos o método adequado para cada tipo de tecido e acabamento.',
  },
  {
    icon: Sparkles,
    title: 'Aparência renovada',
    text: 'Ajuda a recuperar a boa aparência do tecido, deixando o estofado com aspecto de bem cuidado e valorizando o ambiente.',
  },
  {
    icon: Hourglass,
    title: 'Conservação por mais tempo',
    text: 'A higienização periódica ajuda a conservar o estofado e a prolongar a vida útil do seu investimento.',
  },
];

export function Benefits() {
  return (
    <section aria-labelledby="beneficios-title" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            id="beneficios-title"
            eyebrow="Por que higienizar"
            title="Mais conforto e cuidado para o que você usa todos os dias."
            description="Sofás, colchões e poltronas acumulam sujeira com o tempo. Uma higienização profissional devolve a boa aparência e ajuda a manter seus estofados em bom estado."
          />
          <ul className="grid gap-px overflow-hidden rounded-3xl bg-navy/[0.07] ring-1 ring-navy/[0.07] sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.06} className="group bg-white p-7 transition-colors duration-500 hover:bg-mist-50 sm:p-8">
                <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-mist-100 text-navy transition-all duration-500 group-hover:bg-navy group-hover:text-gold-light">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-navy">{title}</h3>
                <p className="mt-2.5 text-[0.94rem] leading-relaxed text-navy/65">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
