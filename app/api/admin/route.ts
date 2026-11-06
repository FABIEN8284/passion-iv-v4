import {db,handle,body,admin,config} from '../../../lib/server';
import {getChatGPTUser} from '../../chatgpt-auth';
import {bootstrap,listPublic,saveNavigation,editParticipation,isAdmin,Problem} from '../../../lib/core.mjs';
export const dynamic='force-dynamic';
export async function GET(){return handle(async()=>{await admin();return {navigations:await listPublic(db()),participants:(await db().prepare('SELECT * FROM participations ORDER BY createdAt DESC').all()).results};});}
export async function POST(req:Request){return handle(async()=>{const b=await body(req);if(b.action==='activate')return bootstrap(db(),await getChatGPTUser(),b.token,config().ADMIN_SETUP_TOKEN);await admin();if(b.action==='navigation')return saveNavigation(db(),b.data);if(b.action==='participation')return editParticipation(db(),b.data);if(b.action==='delete'){if(typeof b.id!=='string')throw new Problem('Identifiant invalide.');await db().prepare('DELETE FROM participations WHERE id=?').bind(b.id).run();return {ok:true};}throw new Problem('Action inconnue.');});}
