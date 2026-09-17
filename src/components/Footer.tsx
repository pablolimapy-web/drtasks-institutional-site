import Link from "next/link";
import { Logo } from "./Logo";

type FooterGroup = { title: string; links: { label: string; href: string }[] };

const groups: FooterGroup[] = [
  { title: "Produto", links: [{label:"FluxOS",href:"/#fluxos"},{label:"Funcionalidades",href:"/#funcionalidades"},{label:"Planos",href:"/#planos"},{label:"Teste grátis",href:"/teste-gratis"}] },
  { title: "Soluções", links: [{label:"Segmentos",href:"/#segmentos"},{label:"Projetos",href:"/#funcionalidades"},{label:"Equipes",href:"/#funcionalidades"},{label:"Operações",href:"/#segmentos"}] },
  { title: "Empresa", links: [{label:"Sobre",href:"/sobre"},{label:"Contato",href:"/contato"},{label:"Dúvidas",href:"/#duvidas"}] },
  { title: "Acesso", links: [{label:"Entrar",href:"/login"},{label:"Criar conta",href:"/cadastro"},{label:"Área do cliente",href:"/app"}] },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Logo/><p>Clareza para organizar, acompanhar e fazer o trabalho avançar.</p></div>
        {groups.map((group) => (
          <div className="footer-col" key={group.title}>
            <strong>{group.title}</strong>
            {group.links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Dr. Tasks. Todos os direitos reservados.</span>
        <div><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos</Link><Link href="/cookies">Cookies</Link></div>
      </div>
    </footer>
  );
}
