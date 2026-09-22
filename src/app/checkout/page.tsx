import type { Metadata } from "next";
import { InstitutionalPlaceholder } from "@/components/InstitutionalPlaceholder";

export const metadata: Metadata = {
  title: "Checkout — Dr. Tasks",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <InstitutionalPlaceholder
      eyebrow="Checkout"
      title="Pagamento online preparado para uma etapa futura."
      text="Esta rota permanece reservada para uma futura integração de cobrança e não faz parte do fluxo comercial público atual."
      primaryLabel="Agendar demonstração"
      primaryHref="/demo"
    />
  );
}
