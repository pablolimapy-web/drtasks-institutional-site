import { createPageMetadata } from "@/lib/seo";
import { InstitutionalPlaceholder } from "@/components/InstitutionalPlaceholder";
export const metadata = createPageMetadata(
  'Entrar',
  'Acesse o Dr. Tasks para entrar no ambiente da sua operação.',
  '/login',
);

export default function Page(){ return <InstitutionalPlaceholder eyebrow="Acesso" title="Entrar no Dr. Tasks" text="Esta rota já está separada do institucional e pronta para receber a integração com autenticação do sistema." primaryLabel="Ir para o app" primaryHref="/app"/> }
