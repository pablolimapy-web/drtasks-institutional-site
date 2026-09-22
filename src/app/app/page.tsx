import type { Metadata } from "next";
import { InstitutionalPlaceholder } from "@/components/InstitutionalPlaceholder";

export const metadata: Metadata = {
  title: "Aplicação — Dr. Tasks",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <InstitutionalPlaceholder
      eyebrow="Aplicação"
      title="O produto autenticado fica separado do site institucional."
      text="Esta rota permanece reservada e não faz parte da navegação pública do site."
      primaryLabel="Entrar"
      primaryHref="/login"
    />
  );
}
