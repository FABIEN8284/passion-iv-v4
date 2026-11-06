import type {Metadata} from 'next';
import './globals.css';
import './editorial.css';
export const metadata:Metadata={metadataBase:new URL('https://passion-iv-cannes.g20-fabien.chatgpt.site'),title:'PASSION IV — Cannes · Îles de Lérins',description:'Naviguer, apprendre et partager avec Chantal et Passion IV. Cannes, Port Canto et les îles de Lérins. Découvrez les prochaines navigations.',openGraph:{title:'PASSION IV',description:'Naviguer, apprendre & partager. Cannes · Îles de Lérins.',type:'website',locale:'fr_FR',images:[{url:'/photos/share.jpg',width:1200,height:630,alt:'Passion IV sous voile dans la baie de Cannes'}]},robots:{index:false,follow:false},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>;}
