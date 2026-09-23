export type DemoLead = {
  name: string;
  email: string;
  company: string;
  segment: string;
  approximateUsers: string;
  mainProblem?: string;
};

export type DemoLeadField = keyof DemoLead;
export type DemoLeadErrors = Partial<Record<DemoLeadField, string>>;

export interface LeadTransport {
  submit(lead: DemoLead): Promise<{ ok: true }>;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateDemoLead(lead: DemoLead): DemoLeadErrors {
  const errors: DemoLeadErrors = {};

  if (!lead.name.trim()) errors.name = "Informe seu nome.";
  if (!emailPattern.test(lead.email.trim())) errors.email = "Informe um e-mail válido.";
  if (!lead.company.trim()) errors.company = "Informe a empresa.";
  if (!lead.segment.trim()) errors.segment = "Selecione o segmento.";
  if (!lead.approximateUsers.trim()) errors.approximateUsers = "Selecione a faixa de usuários.";

  if ((lead.mainProblem ?? "").trim().length > 1000) {
    errors.mainProblem = "Resuma o principal desafio em até 1000 caracteres.";
  }

  return errors;
}

export function isDemoLeadSubmissionConfigured(endpoint?: string): boolean {
  return Boolean(endpoint?.trim());
}

export function createHttpLeadTransport(
  endpoint: string,
  fetchImpl: typeof fetch = fetch,
): LeadTransport {
  const normalizedEndpoint = endpoint.trim();

  if (!normalizedEndpoint) {
    throw new Error("Lead endpoint not configured");
  }

  return {
    async submit(lead) {
      const response = await fetchImpl(normalizedEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        throw new Error(`Lead submission failed with status ${response.status}`);
      }

      return { ok: true };
    },
  };
}
