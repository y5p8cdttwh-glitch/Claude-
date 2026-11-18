import { useCallback, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { CircleAlert, CheckCircle2, MapPin, Clock, Send } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';
import { WhatsAppIcon, InstagramIcon } from './ui/icons';
import { services } from '../data/services';
import { site } from '../config/site';
import { openWhatsApp } from '../lib/whatsapp';
import { buildQuoteMessage, OBS_MAX, todayISO, validateQuote, type QuoteData, type QuoteErrors } from '../lib/quote';

const empty: QuoteData = { nome: '', cidade: '', tipo: '', quantidade: '1', data: '', periodo: '', observacoes: '' };
const order: (keyof QuoteData)[] = ['nome', 'cidade', 'tipo', 'quantidade', 'data', 'periodo', 'observacoes'];

const inputBase =
  'mt-2 block min-h-[3.25rem] w-full rounded-2xl border bg-white px-4 py-3 text-[0.95rem] text-navy placeholder:text-navy/65 transition focus:outline-none focus:ring-4';
const ok = 'border-navy/15 hover:border-navy/30 focus:border-navy focus:ring-mist';
const bad = 'border-red-500 focus:border-red-600 focus:ring-red-100';
const selectCls = 'select-chevron';

function Field({ id, label, optional, error, hint, children }: { id: string; label: string; optional?: boolean; error?: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-semibold text-navy">
        <span>
          {label} {!optional && <span aria-hidden="true" className="text-gold-dark">*</span>}
        </span>
        {optional && <span className="text-xs font-normal text-navy/65">opcional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-erro`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-600">
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" /> {error}
        </p>
      ) : (
        hint
      )}
    </div>
  );
}

export function QuoteForm() {
  const [values, setValues] = useState<QuoteData>(empty);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Ao exibir a confirmação, o foco vai para ela (anunciada por leitores de tela)
  const successRef = useCallback((el: HTMLDivElement | null) => el?.focus({ preventScroll: true }), []);

  const update = (key: keyof QuoteData) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (submitted) setErrors(validateQuote(next));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateQuote(values);
    setErrors(errs);
    const first = order.find((k) => errs[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const url = openWhatsApp(buildQuoteMessage(values));
    setSentUrl(url);
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setSubmitted(false);
    setSentUrl(null);
  };

  const errorCount = Object.keys(errors).length;
  const a = (k: keyof QuoteData) => ({
    id: `f-${k}`,
    name: k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `f-${k}-erro` : undefined,
    className: `${inputBase} ${errors[k] ? bad : ok}`,
  });

  return (
    <section id="contato" aria-labelledby="contato-title" className="scroll-mt-20 bg-mist-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-container gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contato-title"
            eyebrow="Orçamento"
            title="Solicite seu orçamento."
            description="Preencha os dados abaixo. Ao enviar, abrimos o WhatsApp com a sua mensagem pronta: é só confirmar o envio e, se puder, mandar fotos do estofado."
          />
          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-5 text-navy/80">
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#1FA855] shadow-soft">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy/65">WhatsApp</p>
                  <a className="font-semibold text-navy underline-offset-4 hover:underline" href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                    {site.whatsappDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-navy shadow-soft">
                  <InstagramIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy/65">Instagram</p>
                  <a className="font-semibold text-navy underline-offset-4 hover:underline" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                    @{site.instagramUser}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-navy shadow-soft">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy/65">Área de atendimento</p>
                  <p className="font-medium text-navy">{site.serviceArea}.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-navy shadow-soft">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy/65">Atendimento</p>
                  <p className="font-medium text-navy">No seu endereço, com dia e horário combinados.</p>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative rounded-[2rem] bg-white p-5 shadow-lift ring-1 ring-navy/5 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {sentUrl ? (
                <m.div
                  key="ok"
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center focus:outline-none"
                >
                  <CheckCircle2 className="mx-auto h-14 w-14 text-[#1FA855]" strokeWidth={1.4} aria-hidden="true" />
                  <h3 className="mt-5 font-display text-3xl font-semibold text-navy">Mensagem pronta!</h3>
                  <p className="mx-auto mt-3 max-w-sm leading-relaxed text-navy/70">
                    Abrimos o WhatsApp com o seu pedido. Confirme o envio por lá e, se puder, anexe fotos do estofado.
                  </p>
                  <div className="mt-8 flex flex-col items-center gap-3">
                    <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-navy underline underline-offset-4 hover:text-navy-600">
                      O WhatsApp não abriu? Clique aqui
                    </a>
                    <button type="button" onClick={reset} className="text-sm font-medium text-navy/65 hover:text-navy">
                      Fazer outro pedido
                    </button>
                  </div>
                </m.div>
              ) : (
                <m.form key="form" ref={formRef} onSubmit={onSubmit} noValidate initial={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Formulário de orçamento">
                  {submitted && errorCount > 0 && (
                    <div role="alert" className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {errorCount === 1 ? 'Confira o campo destacado para continuar.' : `Confira os ${errorCount} campos destacados para continuar.`}
                    </div>
                  )}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="f-nome" label="Nome" error={errors.nome}>
                      <input {...a('nome')} type="text" autoComplete="name" value={values.nome} onChange={update('nome')} placeholder="Seu nome" />
                    </Field>
                    <Field id="f-cidade" label="Cidade" error={errors.cidade}>
                      <input {...a('cidade')} type="text" autoComplete="address-level2" value={values.cidade} onChange={update('cidade')} placeholder="Ex.: Itaobim" />
                    </Field>
                    <Field id="f-tipo" label="Tipo de estofado" error={errors.tipo}>
                      <select {...a('tipo')} className={`${a('tipo').className} ${selectCls}`} value={values.tipo} onChange={update('tipo')}>
                        <option value="" disabled>
                          Selecione
                        </option>
                        {services.map((s) => (
                          <option key={s.id} value={s.formLabel}>
                            {s.formLabel}
                          </option>
                        ))}
                        <option value="Outro (descrito nas observações)">Outro</option>
                      </select>
                    </Field>
                    <Field id="f-quantidade" label="Quantidade" error={errors.quantidade}>
                      <input {...a('quantidade')} type="number" inputMode="numeric" min={1} max={50} step={1} value={values.quantidade} onChange={update('quantidade')} />
                    </Field>
                    <Field id="f-data" label="Preferência de data" optional error={errors.data}>
                      <input {...a('data')} type="date" min={todayISO()} value={values.data} onChange={update('data')} />
                    </Field>
                    <Field id="f-periodo" label="Período" optional error={errors.periodo}>
                      <select {...a('periodo')} className={`${a('periodo').className} ${selectCls}`} value={values.periodo} onChange={update('periodo')}>
                        <option value="">Sem preferência</option>
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                      </select>
                    </Field>
                    <div className="sm:col-span-2">
                      <Field
                        id="f-observacoes"
                        label="Observações"
                        optional
                        error={errors.observacoes}
                        hint={
                          <p className={`mt-2 text-right text-xs ${values.observacoes.length > OBS_MAX ? 'text-red-600' : 'text-navy/65'}`}>
                            {values.observacoes.length}/{OBS_MAX}
                          </p>
                        }
                      >
                        <textarea
                          {...a('observacoes')}
                          rows={4}
                          value={values.observacoes}
                          onChange={update('observacoes')}
                          placeholder="Ex.: sofá retrátil de 3 lugares, com manchas no assento."
                          className={`${a('observacoes').className} resize-y`}
                        />
                      </Field>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="mt-8 w-full" data-cta="form-enviar">
                    <WhatsAppIcon className="h-5 w-5" />
                    Enviar pedido pelo WhatsApp
                    <Send className="hidden h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 sm:block" aria-hidden="true" />
                  </Button>
                  <p className="mt-4 text-center text-xs leading-relaxed text-navy/65">
                    Seus dados são usados apenas para montar a mensagem no WhatsApp. Nada é armazenado neste site.
                  </p>
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
