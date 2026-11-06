import {test} from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.PASSION_QA_BASE_URL;
test('V2 : parcours HTTP public/admin sur données fictives locales', {skip:!base},async t=>{
 const url=new URL(base);
 assert.ok(['127.0.0.1','localhost','::1'].includes(url.hostname),'Ce test ne doit jamais écrire en production.');
 const sign=await fetch(base+'/signin-with-chatgpt?return_to=/admin',{redirect:'manual'});
 const cookie=sign.headers.get('set-cookie')?.split(';')[0]; assert.ok(cookie?.startsWith('__sites_local_auth='));
 const request=async(path,body,authenticated=false)=>{
  const response=await fetch(base+path,{headers:{...(authenticated?{Cookie:cookie}:{}),...(body?{'Content-Type':'application/json',Origin:base}:{})},...(body?{method:'POST',body:JSON.stringify(body)}:{})});
  return {status:response.status,body:await response.json()};
 };
 await t.test('connexion locale et refus anonyme',async()=>{assert.equal(sign.status,302);assert.equal((await request('/api/admin')).status,403);assert.equal((await request('/api/admin',null,true)).status,200);});
 const data={title:'QA V2 — sortie fictive locale',date:'2026-11-15',time:'10:00',category:'Autre',description:'Test local uniquement',image:null,capacity:1,status:'OUVERT',demo:true};
 let id,participantId;
 await t.test('création et modification navigation',async()=>{const created=await request('/api/admin',{action:'navigation',data},true);assert.equal(created.status,200);id=created.body.id;const changed=await request('/api/admin',{action:'navigation',data:{...data,id,title:data.title+' modifiée'}},true);assert.equal(changed.status,200);const navs=await request('/api/navigations');assert.equal(navs.body.find(n=>n.id===id).title,data.title+' modifiée');});
 const participation=()=>({id:crypto.randomUUID(),navigationId:id,firstName:'QA',lastName:'Fictif',phone:'+33000000000',partySize:1,message:'Test local V2',website:''});
 await t.test('validation formulaire et origine',async()=>{assert.equal((await request('/api/participations',{...participation(),phone:'abc'})).status,400);const origin=await fetch(base+'/api/participations',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://example.invalid'},body:JSON.stringify(participation())});assert.equal(origin.status,403);});
 await t.test('inscription, confirmation, capacité et confidentialité',async()=>{const entry=participation();participantId=entry.id;assert.equal((await request('/api/participations',entry)).status,200);assert.equal((await request('/api/participations',entry)).status,200);assert.equal((await request('/api/participations',{...participation(),phone:'+33000000001'})).status,409);const navs=await request('/api/navigations'),n=navs.body.find(n=>n.id===id);assert.equal(n.positioned,1);assert.equal(n.status,'COMPLET');const text=JSON.stringify(navs.body);for(const key of ['firstName','lastName','phone','message','+33000000000'])assert.ok(!text.includes(key));});
 await t.test('participants et correction',async()=>{const list=await request('/api/admin',null,true),p=list.body.participants.find(p=>p.id===participantId);assert.equal(p.firstName,'QA');const changed=await request('/api/admin',{action:'participation',data:{...p,firstName:'QA corrigé'}},true);assert.equal(changed.status,200);assert.equal((await request('/api/admin',null,true)).body.participants.find(p=>p.id===participantId).firstName,'QA corrigé');});
 await t.test('suppression de l’inscription fictive et places libérées',async()=>{assert.equal((await request('/api/admin',{action:'delete',id:participantId},true)).status,200);const nav=(await request('/api/navigations')).body.find(n=>n.id===id);assert.equal(nav.positioned,0);assert.equal(nav.status,'OUVERT');});
 await t.test('annulation et refus d’inscription',async()=>{assert.equal((await request('/api/admin',{action:'navigation',data:{...data,id,status:'ANNULÉ'}},true)).status,200);assert.equal((await request('/api/participations',participation())).status,409);assert.equal((await request('/api/navigations')).body.find(n=>n.id===id).status,'ANNULÉ');});
});
