import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../app/chatgpt-auth';
import {Problem,isAdmin} from './core.mjs';
export const db=()=>{if(!env.DB)throw new Problem('Le service est temporairement indisponible.',503);return env.DB;};
export const config=()=>env as unknown as Record<string,string>;
export const json=(value:unknown,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin'}});
export async function body(req:Request){if(req.headers.get('origin')!==new URL(req.url).origin)throw new Problem('Origine refusée.',403);if(!req.headers.get('content-type')?.includes('application/json'))throw new Problem('Format refusé.',415);const raw=await req.text();if(raw.length>10000)throw new Problem('Formulaire trop long.',413);try{const parsed=JSON.parse(raw);if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw new Error();return parsed;}catch{throw new Problem('Formulaire invalide.');}}
export async function admin(){const u=await getChatGPTUser();if(!await isAdmin(db(),u))throw new Problem('Accès réservé à l’administration.',403);return u;}
export const handle=async(fn:()=>Promise<unknown>)=>{try{return json(await fn());}catch(e){return json({error:e instanceof Problem?e.message:'Service momentanément indisponible. Réessaie un peu plus tard.'},e instanceof Problem?e.status:500);}};
