# Dr. Tasks — Site Institucional

Build inicial do site institucional do Dr. Tasks, baseado no protótipo aprovado e nos princípios visuais discutidos ao longo do projeto.

## Direção de design

O projeto combina princípios, sem copiar identidades:

- **Linear:** disciplina tipográfica, refinamento e interface do produto como prova visual.
- **Notion:** calma, respiro e organização.
- **Asana:** narrativa comercial e clareza de benefícios.
- **Trello:** proximidade e leitura fácil do fluxo de trabalho.
- **monday.com / ClickUp:** referências secundárias para ritmo, estados e conversão.

A identidade do Dr. Tasks continua própria: fundo claro neutro, azul como primária, tipografia compacta, FluxOS como assinatura visual e movimento controlado.

## O que já existe

- Home completa e responsiva.
- Hero com mockup de produto em CSS/HTML, sem imagem pesada.
- FluxOS com animação de progressão executada uma vez ao entrar na viewport.
- Microinterações e hover.
- Funcionalidades.
- Segmentos.
- Planos e toggle mensal/anual.
- Bloco de teste gratuito.
- FAQ animado.
- CTA final e footer institucional.
- Navbar sticky responsiva.
- `robots.txt` e `sitemap.xml` via Next.js.
- Metadata, Open Graph e JSON-LD de SoftwareApplication.
- Rotas preparadas para login, cadastro, trial, checkout, app e páginas legais.
- `prefers-reduced-motion` respeitado.

## Stack

- Next.js 15
- React 19
- TypeScript
- CSS nativo
- Sem biblioteca de animação no build inicial, reduzindo peso e dependências.

## Rodar

```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000`

## Build de produção

```bash
npm run build
npm start
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste os domínios:

```env
NEXT_PUBLIC_SITE_URL=https://drtasks.com.br
NEXT_PUBLIC_APP_URL=https://app.drtasks.com.br
NEXT_PUBLIC_API_URL=https://api.drtasks.com.br
```

## Rotas preparadas

- `/`
- `/login`
- `/cadastro`
- `/teste-gratis`
- `/planos`
- `/checkout`
- `/app`
- `/contato`
- `/sobre`
- `/privacidade`
- `/termos`
- `/cookies`

## Pontos comerciais ainda provisórios

- **14 dias de teste gratuito** foi adotado como proposta de layout, não como regra comercial definitiva.
- Os preços permanecem `R$ —` / `Fale conosco` até definição oficial.
- O texto "sem cartão" deve ser confirmado antes da publicação.
- Depoimentos e logos devem ser reais; o build não inventa prova social.

## Próxima fase recomendada

1. Definir preços e regras do trial.
2. Substituir placeholders de login/cadastro por integração real.
3. Conectar checkout/pagamento.
4. Adicionar analytics e consentimento.
5. Adicionar screenshots reais do Dr. Tasks onde fizer sentido.
6. Fazer auditoria Lighthouse e ajustes finais de Core Web Vitals.
