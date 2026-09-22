import { createPageMetadata } from "@/lib/seo";
import { InstitutionalPlaceholder } from "@/components/InstitutionalPlaceholder";
export const metadata = createPageMetadata(
  'Política de Privacidade',
  'Informações sobre privacidade e tratamento de dados no Dr. Tasks.',
  '/privacidade',
);

export default function Page(){ return <InstitutionalPlaceholder eyebrow="Legal" title="Política de Privacidade" text="Conteúdo jurídico deve ser revisado antes da publicação."/> }
