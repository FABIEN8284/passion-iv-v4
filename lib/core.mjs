export const DEMOS=[
{id:'demo-lerins',title:'Îles de Lérins',date:'2026-10-24',time:null,category:'Journée',description:'Cap sur les îles, au départ de Port Canto. Pique-nique partagé et participation aux frais : modalités à préciser.',image:'drone',capacity:null,status:'OUVERT',demo:1,createdAt:'2026-10-13T00:00:00Z'},
{id:'demo-sunset',title:'Le dernier soleil',date:'2026-10-25',time:null,category:'Sunset',description:'Une navigation en fin de journée dans la baie de Cannes. Horaire à préciser.',image:'sailing',capacity:null,status:'OUVERT',demo:1,createdAt:'2026-10-13T00:00:00Z'},
{id:'demo-voiles',title:'Les Voiles de Saint-Tropez',date:null,time:null,category:'Événement',description:'Un projet à partager. Date et modalités de participation à définir avec Chantal.',image:'sea',capacity:null,status:'OUVERT',demo:1,createdAt:'2026-10-13T00:00:00Z'}];
export class Problem extends Error {constructor(message,status=400){super(message);this.status=status;}}
export const CATEGORIES=['Journée','Sunset','Régate','Événement','Autre'];
export const IMAGES=['sailing','drone','sea','lerins','interior'];
const str=(v,max,required=true)=>{if(typeof v!=='string'||v.trim().length>max||(required&&!v.trim()))throw new Problem('Vérifie les champs du formulaire.');return v.trim();};
const integer=(v)=>{if(!Number.isInteger(v)||v<1||v>100)throw new Problem('Le nombre de personnes doit être un entier entre 1 et 100.');return v;};
export function validateParticipation(b){
 if(b.website)throw new Problem('Envoi refusé.');
 const phone=str(b.phone,30).replace(/[\s().-]/g,'');if(!/^\+?[0-9]{7,15}$/.test(phone))throw new Problem('Vérifie le numéro de téléphone.');
 return {firstName:str(b.firstName,60),lastName:str(b.lastName,80),phone,partySize:integer(b.partySize),message:str(b.message??'',600,false)};
}
export function validateNavigation(b){
 const date=b.date||null; if(date&&(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date))throw new Problem('Date invalide.');
 const time=b.time||null;if(time&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))throw new Problem('Heure invalide.');
 if(!CATEGORIES.includes(b.category)||!['OUVERT','COMPLET','ANNULÉ'].includes(b.status))throw new Problem('Catégorie ou statut invalide.');
 if(b.image&&!IMAGES.includes(b.image))throw new Problem('Choisis une photo du bateau.');
 return {title:str(b.title,100),date,time,category:b.category,description:str(b.description??'',700,false),image:b.image||null,capacity:b.capacity==null||b.capacity===''?null:integer(b.capacity),status:b.status,demo:b.demo?1:0};
}
export const PUBLIC_SQL=`SELECT n.id,n.title,n.date,n.time,n.category,n.description,n.image,n.capacity,n.status,n.demo,n.createdAt,COALESCE(SUM(p.partySize),0) AS positioned FROM navigations n LEFT JOIN participations p ON p.navigationId=n.id GROUP BY n.id ORDER BY n.date IS NULL,n.date,n.createdAt`;
export const publicNav=n=>({...n,status:n.status==='OUVERT'&&n.capacity!==null&&n.positioned>=n.capacity?'COMPLET':n.status});
export async function listPublic(db){const r=await db.prepare(PUBLIC_SQL).all();return (r.results.length?r.results:DEMOS.map(n=>({...n,positioned:0}))).map(publicNav);}
export async function seed(db){for(const n of DEMOS)await db.prepare('INSERT OR IGNORE INTO navigations (id,title,date,time,category,description,image,capacity,status,demo,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(n.id,n.title,n.date,n.time,n.category,n.description,n.image,n.capacity,n.status,n.demo,n.createdAt).run();}
export async function participate(db,b){
 const p=validateParticipation(b);const id=str(b.id,80);if(!/^[a-zA-Z0-9-]{10,80}$/.test(id))throw new Problem('Identifiant invalide.');const nav=str(b.navigationId,80);
 const prior=await db.prepare('SELECT id,navigationId,phone FROM participations WHERE id=?').bind(id).first();if(prior){if(prior.navigationId===nav&&prior.phone===p.phone)return {ok:true};throw new Problem('Envoi déjà traité.',409);}
 if(DEMOS.some(n=>n.id===nav)){const exists=await db.prepare('SELECT id FROM navigations WHERE id=?').bind(nav).first();if(!exists)await seed(db);}
 const n=await db.prepare('SELECT id,status FROM navigations WHERE id=?').bind(nav).first();if(!n)throw new Problem('Navigation introuvable.',404);
 try {const r=await db.prepare(`INSERT INTO participations (id,navigationId,firstName,lastName,phone,partySize,message,createdAt) SELECT ?,?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM navigations n WHERE n.id=? AND n.status='OUVERT' AND (n.capacity IS NULL OR n.capacity >= ? + (SELECT COALESCE(SUM(p.partySize),0) FROM participations p WHERE p.navigationId=n.id)))`).bind(id,nav,p.firstName,p.lastName,p.phone,p.partySize,p.message,new Date().toISOString(),nav,p.partySize).run();if(!r.meta.changes)throw new Problem('Cette navigation ne peut plus accueillir ce nombre de personnes. Actualise la page.',409);}catch(e){if(String(e).includes('UNIQUE'))throw new Problem('Une inscription existe déjà avec ce téléphone pour cette navigation. Contacte Chantal pour la modifier.',409);throw e;}
 return {ok:true};
}
export async function saveNavigation(db,b){const n=validateNavigation(b);const id=b.id?str(b.id,80):crypto.randomUUID();const existing=await db.prepare('SELECT id FROM navigations WHERE id=?').bind(id).first();
 if(b.id&&!existing)throw new Problem('Navigation introuvable.',404);
 if(existing){const r=await db.prepare(`UPDATE navigations SET title=?,date=?,time=?,category=?,description=?,image=?,capacity=?,status=?,demo=? WHERE id=? AND (? IS NULL OR ?>=(SELECT COALESCE(SUM(partySize),0) FROM participations WHERE navigationId=?))`).bind(n.title,n.date,n.time,n.category,n.description,n.image,n.capacity,n.status,n.demo,id,n.capacity,n.capacity,id).run();if(!r.meta.changes)throw new Problem('La capacité ne peut pas être inférieure aux personnes déjà positionnées.',409);}
 else await db.prepare('INSERT INTO navigations (id,title,date,time,category,description,image,capacity,status,demo,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(id,n.title,n.date,n.time,n.category,n.description,n.image,n.capacity,n.status,n.demo,new Date().toISOString()).run();return {ok:true,id};}
export async function editParticipation(db,b){const p=validateParticipation(b);const id=str(b.id,80);const existing=await db.prepare('SELECT navigationId FROM participations WHERE id=?').bind(id).first();if(!existing)throw new Problem('Inscription introuvable.',404);
 try{const r=await db.prepare(`UPDATE participations SET firstName=?,lastName=?,phone=?,partySize=?,message=? WHERE id=? AND EXISTS (SELECT 1 FROM navigations n WHERE n.id=participations.navigationId AND (n.capacity IS NULL OR n.capacity>=?+(SELECT COALESCE(SUM(p.partySize),0) FROM participations p WHERE p.navigationId=n.id AND p.id<>?)))`).bind(p.firstName,p.lastName,p.phone,p.partySize,p.message,id,p.partySize,id).run();if(!r.meta.changes)throw new Problem('La capacité serait dépassée.',409);}catch(e){if(String(e).includes('UNIQUE'))throw new Problem('Ce téléphone est déjà utilisé pour cette navigation.',409);throw e;}return {ok:true};}
export async function isAdmin(db,user){if(!user)return false;return !!await db.prepare('SELECT slot FROM admins WHERE userId=?').bind(user.userId).first();}
export async function bootstrap(db,user,token,expected){if(!user)throw new Problem('Connecte-toi pour activer l’administration.',401);if(!expected||typeof token!=='string'||token.length<20||token!==expected)throw new Problem('Code incorrect.',403);const r=await db.prepare('INSERT OR IGNORE INTO admins (slot,userId,createdAt) VALUES (1,?,?)').bind(user.userId,new Date().toISOString()).run();if(!r.meta.changes)throw new Problem('L’administration est déjà activée.',409);await seed(db);return {ok:true};}
export async function rateLimit(db,key){const now=Date.now();await db.prepare('DELETE FROM limits WHERE expires<?').bind(now).run();const r=await db.prepare(`INSERT INTO limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 WHERE count<20 RETURNING count`).bind(key,now+3600000).first();if(!r)throw new Problem('Trop de tentatives. Réessaie dans une heure.',429);}
