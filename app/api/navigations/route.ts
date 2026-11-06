import {db,handle} from '../../../lib/server';
import {listPublic} from '../../../lib/core.mjs';
export const dynamic='force-dynamic';
export async function GET(){return handle(()=>listPublic(db()));}
