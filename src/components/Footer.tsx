import Link from "next/link";
import { Logo } from "./Logo";

const groups = [
  { title: "Produto", links: [{label:"Módulos",href:"/#modulos"},{label:"FluxOS",href:"/#modulo-fluxos"},{label:"Financeiro",href:"/#modulo-financeiro"}] },
  { title: "Operação", links: [{label:"Projetos e Tarefas",href:"/#modulo-projetos"},{label:"Equipe e Tempo",href:"/#modulo-equipe-tempo"},{label:"Recursos",href:"/#modulo-recursos"}] },
  { title: "Empresa", links: [{label:"Sobre",href:"/sobre"},{label:"Contato",href:"/contato"},{label:"Agendar demonstração",href:"/demo"}] },
  { title: "Acesso", links: [{label:"Entrar",href:"/login"},{label:"Privacidade",href:"/privacidade"},{label:"Termos",href:"/termos"}] },
];

export function Footer(){return <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><Logo/><p>Gestão operacional conectada para transformar trabalho disperso em contexto, decisão e próxima ação.</p></div>{groups.map(group=><div className="footer-col" key={group.title}><strong>{group.title}</strong>{group.links.map(link=><Link href={link.href} key={link.label}>{link.label}</Link>)}</div>)}</div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Dr. Tasks. Todos os direitos reservados.</span><div><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos</Link><Link href="/cookies">Cookies</Link></div></div></footer>}
