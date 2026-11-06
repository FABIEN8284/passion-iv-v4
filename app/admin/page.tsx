import {requireChatGPTUser} from '../chatgpt-auth';
import Admin from './ui';
export const dynamic='force-dynamic';
export default async function AdminPage(){await requireChatGPTUser('/admin');return <Admin/>;}
