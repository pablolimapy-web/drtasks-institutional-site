import { createPageMetadata } from "@/lib/seo";
import { InstitutionalPlaceholder } from "@/components/InstitutionalPlaceholder";
export const metadata = createPageMetadata(
  'Termos de Uso',
  'Termos de uso do site e dos serviços do Dr. Tasks.',
  '/termos',
);

export default function Page(){ return <InstitutionalPlaceholder eyebrow="Legal" title="Termos de Uso" text="Conteúdo jurídico deve ser revisado antes da publicação."/> }
