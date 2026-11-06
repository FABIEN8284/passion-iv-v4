import {db,handle,body,config} from '../../../lib/server';
import {participate,rateLimit} from '../../../lib/core.mjs';
export async function POST(req:Request){return handle(async()=>{const b=await body(req);const ip=req.headers.get('cf-connecting-ip')||'unknown';const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ip+(config().RATE_SALT||config().ADMIN_SETUP_TOKEN||'')));const key=Array.from(new Uint8Array(bytes)).map(v=>v.toString(16).padStart(2,'0')).join('');await rateLimit(db(),key);return participate(db(),b);});}
