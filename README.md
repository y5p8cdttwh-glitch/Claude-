# Simões Higienizações | Site institucional

Site de página única para a **Simões Higienizações** (Itaobim-MG), com foco em gerar pedidos de orçamento pelo WhatsApp.

- **Tecnologias:** React 18, TypeScript, Tailwind CSS 3, Framer Motion, ícones Lucide, Vite.
- **Hospedagem:** site 100% estático, sem servidor, banco de dados nem custo de backend. Pronto para Vercel ou Netlify.
- **WhatsApp configurado:** (33) 99702-1704.

---

## 1. Arquitetura e seções

```
├── index.html              Página principal (título, descrição, Open Graph)
├── 404.html                Página "não encontrada"
├── public/                 Arquivos servidos como estão (imagens, ícones)
│   ├── og-image.png        Imagem exibida ao compartilhar o link (1200×630)
│   ├── favicon-96.png      Ícone da aba do navegador
│   ├── apple-touch-icon.png Ícone ao salvar o site na tela do iPhone
│   └── images/             Fotos otimizadas (hero, servicos, resultados, sobre)
├── scripts/otimizar-imagens.mjs  Converte suas fotos para WebP leve
└── src/
    ├── config/site.ts      ⭐ CONTATO, REDES, LOGO, FOTO/VÍDEO DO TOPO
    ├── data/
    │   ├── services.ts     ⭐ Textos e fotos dos 6 serviços
    │   ├── results.ts      ⭐ Fotos de antes e depois
    │   ├── testimonials.ts ⭐ Depoimentos reais
    │   └── faq.ts          ⭐ Perguntas frequentes
    ├── components/         Seções e componentes reutilizáveis
    └── lib/                WhatsApp, validação do formulário, menu
```

Ordem das seções:

| # | Seção | Arquivo |
|---|-------|---------|
| 1 | Cabeçalho fixo + menu mobile | `components/Header.tsx` |
| 2 | Topo (hero) | `components/Hero.tsx` |
| 3 | Benefícios | `components/Benefits.tsx` |
| 4 | Serviços (cards com orçamento direto) | `components/Services.tsx` |
| 5 | Antes e depois (comparador deslizante) | `components/Results.tsx` + `BeforeAfter.tsx` |
| 6 | Como funciona (4 etapas) | `components/HowItWorks.tsx` |
| 7 | Sobre a empresa | `components/About.tsx` |
| 8 | Depoimentos | `components/Testimonials.tsx` |
| 9 | Perguntas frequentes | `components/Faq.tsx` |
| 10 | Formulário de orçamento → WhatsApp | `components/QuoteForm.tsx` |
| 11 | Rodapé | `components/Footer.tsx` |
| – | Botão flutuante de WhatsApp | `components/FloatingWhatsApp.tsx` |

**Conteúdo honesto:** enquanto não houver fotos de antes e depois ou depoimentos cadastrados, o site mostra um aviso elegante ("galeria em preparação" ou "espaço para avaliações reais"), com link para o Instagram ou WhatsApp. Ele nunca exibe imagens ou avaliações fictícias. Sem fotos, os cards de serviço e o topo usam uma arte da marca (ícone/monograma), que não se passa por foto de atendimento.

---

## 2. Rodar no computador

Requisito: [Node.js](https://nodejs.org) **20.19 ou superior** (recomendado: 22).

```bash
npm install        # instala as dependências (só na primeira vez)
npm run dev        # abre em http://localhost:5173 com atualização automática
npm run build      # gera a versão final na pasta dist/
npm run preview    # testa a versão final localmente
```

---

## 3. Como inserir sua logo

1. Exporte a logo em **SVG** (ideal) ou **PNG com fundo transparente**, com cerca de 80 px de altura.
2. Salve em `public/`, por exemplo `public/logo.svg`. Para o rodapé (fundo azul-marinho), salve também uma versão clara, como `public/logo-branca.svg`.
3. Em `src/config/site.ts`:
   ```ts
   logoSrc: '/logo.svg',
   logoLightSrc: '/logo-branca.svg',
   ```
4. Opcional: substitua os ícones mantendo nome e tamanho.
   - `public/favicon-96.png`: 96×96 px
   - `public/apple-touch-icon.png`: 180×180 px, sem transparência
   - `public/og-image.png`: 1200×630 px. É a imagem que aparece quando o link é enviado no WhatsApp, no Instagram ou no Facebook.

Enquanto `logoSrc` estiver vazio, o site usa o logotipo tipográfico "S · Simões Higienizações".

---

## 4. Como inserir fotos

### Passo a passo
1. Crie a pasta `public/images/originais/` e, dentro dela, subpastas conforme o uso:
   `hero/`, `servicos/`, `resultados/`, `sobre/`.
2. Coloque as fotos originais (JPG, PNG ou HEIC do celular) nessas subpastas.
   Use **nomes sem espaços nem acentos**, por exemplo `sofa-cinza-antes.jpg`.
3. Rode:
   ```bash
   npm run otimizar-imagens
   ```
   As versões leves em WebP aparecem em `public/images/<pasta>/`, como `public/images/resultados/sofa-cinza-antes.webp`.
   A pasta `originais/` não vai para o site nem para o GitHub.
4. Cadastre o caminho do arquivo `.webp` conforme a tabela abaixo.

| Onde aparece | Proporção ideal | Onde cadastrar |
|---|---|---|
| Topo (hero) | vertical 4:5 | `src/config/site.ts` → `heroImage: '/images/hero/atendimento.webp'` |
| Cards de serviço | horizontal 4:3 | `src/data/services.ts` → campo `image` de cada serviço |
| Antes e depois | horizontal 4:3 | `src/data/results.ts` (veja a seção 6) |
| Sobre | vertical 5:6 | `src/config/site.ts` → `aboutImage` |

Sempre preencha os textos alternativos (`heroAlt`, `imageAlt`, `aboutAlt`) descrevendo a foto. Isso ajuda pessoas com deficiência visual e o Google.

**Dicas de foto:** use luz natural, sem filtros, e enquadre o estofado inteiro. Num antes e depois, fotografe **do mesmo ângulo, distância e iluminação**.

---

## 5. Vídeo no topo (opcional)

- Formato **MP4 (H.264)**, de 8 a 15 segundos, **sem áudio**, com até ~4 MB e cerca de 1080 px de largura.
- Salve em `public/images/hero/atendimento.mp4` e, em `site.ts`:
  ```ts
  heroVideo: '/images/hero/atendimento.mp4',
  heroImage: '/images/hero/atendimento.webp', // usada como capa enquanto o vídeo carrega
  ```
- O vídeo toca automaticamente, sem som e em loop. Se houver vídeo e foto, o vídeo tem prioridade.

---

## 6. Antes e depois (comparador)

Em `src/data/results.ts`, adicione um item por atendimento:

```ts
export const results: Result[] = [
  {
    id: 'sofa-retratil-cinza',              // identificador único, sem espaços
    title: 'Sofá retrátil',
    city: 'Itaobim',                         // opcional
    before: '/images/resultados/sofa-cinza-antes.webp',
    after: '/images/resultados/sofa-cinza-depois.webp',
    description: 'Sofá de 3 lugares com manchas de uso no assento.', // opcional
  },
];
```

A galeria aparece automaticamente quando há pelo menos um item. Com dois ou mais, surgem as miniaturas para alternar entre eles. O comparador funciona com mouse, toque e teclado (setas).

> Use somente fotos de atendimentos realizados pela Simões Higienizações.

---

## 7. Depoimentos

Em `src/data/testimonials.ts`:

```ts
export const testimonials: Testimonial[] = [
  {
    name: 'Maria S.',               // de preferência, nome e inicial
    city: 'Itaobim',
    service: 'Higienização de sofá',
    text: 'Texto exatamente como o cliente escreveu.',
    source: 'WhatsApp',             // ou 'Instagram', 'Google'
  },
];
```

Publique apenas avaliações verdadeiras e **com autorização do cliente**. Guarde o print da mensagem original.

---

## 8. WhatsApp, Instagram e textos

- **Número do WhatsApp:** `src/config/site.ts`
  - `whatsappNumber`: só números, no formato `55` + DDD + número (atual: `5533997021704`)
  - `whatsappDisplay`: como o número aparece escrito (atual: `(33) 99702-1704`)

  Todos os botões, o formulário, o rodapé e os dados para o Google usam esse único lugar.
- **Instagram:** `instagramUser` e `instagramUrl` no mesmo arquivo.
- **Perguntas frequentes:** `src/data/faq.ts`.
- **Mensagens pré-prontas do WhatsApp:** `src/lib/whatsapp.ts` e `src/lib/quote.ts`.

---

## 9. Publicar o site

O site precisa estar num repositório do GitHub. Este projeto já está no branch `claude/simoes-higienizacoes-site-7q5o9w`. Para produção, recomenda-se juntá-lo ao branch principal (`main`) ou escolher esse branch como "Production Branch" na hospedagem.

### Opção A: Vercel
1. Acesse [vercel.com](https://vercel.com) e entre com sua conta do GitHub.
2. Clique em **Add New → Project** e importe o repositório.
3. O Vercel detecta o Vite sozinho. Confira: Build Command `npm run build`, Output Directory `dist`.
4. Clique em **Deploy**. Em cerca de 1 minuto você recebe um endereço `*.vercel.app`.
5. **Domínio próprio:** no projeto, vá em **Settings → Domains → Add** e digite o domínio. O Vercel mostra exatamente quais registros DNS criar: normalmente um registro **A** para o domínio raiz e um **CNAME** para o `www`.

### Opção B: Netlify
1. Acesse [app.netlify.com](https://app.netlify.com) e entre com o GitHub.
2. Clique em **Add new site → Import an existing project → GitHub** e escolha o repositório e o branch.
3. As configurações já vêm do arquivo `netlify.toml`. Clique em **Deploy**.
4. **Domínio próprio:** vá em **Domain management → Add a domain** e siga os registros DNS indicados, ou use o Netlify DNS.

> **Sem GitHub?** Rode `npm run build` e arraste a pasta `dist/` para [app.netlify.com/drop](https://app.netlify.com/drop).

### Domínio .com.br (Registro.br)
1. Registre o domínio em [registro.br](https://registro.br).
2. No painel do domínio, abra **DNS → Configurar zona DNS** e crie os registros que o Vercel ou o Netlify mostrarem.
3. A propagação costuma levar de minutos a algumas horas. O HTTPS (cadeado) é ativado automaticamente pela hospedagem.

### Endereço do site para o SEO
No Netlify e no Vercel, o endereço definitivo é detectado automaticamente durante o build. Isso gera `canonical`, imagem de compartilhamento com endereço completo, `sitemap.xml` e `robots.txt`. Para forçar uma versão específica (ex.: com `www`), crie a variável de ambiente `VITE_SITE_URL=https://www.seudominio.com.br` no painel da hospedagem e publique novamente.

### Página 404
O arquivo `404.html` é usado automaticamente pelo Vercel e pelo Netlify para qualquer endereço inexistente.

---

## 10. Depois de publicar (SEO local)

1. **Google Search Console:** adicione o domínio em [search.google.com/search-console](https://search.google.com/search-console) e envie `https://seudominio/sitemap.xml`.
2. **Perfil da Empresa no Google (Google Meu Negócio):** crie ou reivindique o perfil com Itaobim e região como área de atendimento, use o mesmo telefone do site e coloque o link do site. É o fator mais importante para aparecer em "higienização de sofá em Itaobim".
3. **Instagram:** coloque o link do site na bio.
4. **Avaliações:** peça aos clientes satisfeitos uma avaliação no Google e, com autorização, cadastre no site.
5. **Teste o compartilhamento:** envie o link para você mesmo no WhatsApp e confira a imagem de prévia.

### Checklist antes de divulgar
- [ ] Logo inserida
- [ ] Foto ou vídeo real no topo
- [ ] Fotos reais nos cards de serviço
- [ ] Pelo menos um antes e depois real
- [ ] Botões de WhatsApp testados no celular
- [ ] Domínio conectado e com HTTPS
- [ ] Prévia do link conferida no WhatsApp

---

## 11. Recursos já incluídos

- Layout mobile-first, testado de 320 px a 1920 px de largura.
- Menu mobile com tela cheia, tecla Esc, foco preso no menu e rolagem suave.
- Formulário com validação: campos obrigatórios, quantidade entre 1 e 50, data a partir de hoje e até 500 caracteres nas observações. Os erros aparecem junto a cada campo, com um resumo acessível.
- Ao enviar, o formulário monta a mensagem e abre o WhatsApp. Se o navegador bloquear a nova aba, o WhatsApp abre na mesma aba, e há um link alternativo na tela de confirmação. Nenhum dado é armazenado no site.
- Acessibilidade: contraste AA, navegação por teclado, link "Pular para o conteúdo", textos alternativos e respeito à preferência "reduzir movimento".
- SEO local: título e descrição com Itaobim-MG, dados estruturados `LocalBusiness`, Open Graph, metatags geográficas, sitemap e robots.
- Desempenho: fontes hospedadas no próprio site, animações leves, imagens com carregamento sob demanda e cache longo dos arquivos.
