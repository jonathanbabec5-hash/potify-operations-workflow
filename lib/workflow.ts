import type { Item, Stage } from './types';
export class WorkflowError extends Error {}
export const safeLink = (value: string) => {try {const u=new URL(value);return u.protocol==='https:';}catch{return false;}};
export function transition(item: Item, action: string, note: string, now: string, evidence: {bufferId?:string; scheduledAt?:string; publicationUrl?:string} = {}): Item {
  const next = {...item};
  if(action==='submit') {
    if(item.stage!=='Draft'||!item.content.trim()) throw new WorkflowError('Add the final content to a draft before requesting approval.');
    if(/\[[^\]]+\]/.test(item.content))throw new WorkflowError('Replace all bracketed template prompts before requesting approval.');
    if(item.media&&!item.alt.trim())throw new WorkflowError('Add accurate image alt text before requesting approval.');
    next.stage='Needs approval';
  } else if(action==='approve') {
    if(item.stage!=='Needs approval') throw new WorkflowError('Only items awaiting approval can be approved.');
    next.stage='Approved'; next.approvedAt=now; next.approvalNote=note.trim()||'Exact content and media approved in the hub.';
  } else if(action==='request_changes') {
    if(!['Needs approval','Approved'].includes(item.stage)) throw new WorkflowError('This item is not in review.');
    if(!note.trim()) throw new WorkflowError('Add a short note explaining the requested changes.');
    next.stage='Draft';next.approvedAt='';next.approvalNote='';
    next.notes=[item.notes,`Changes requested: ${note.trim()}`].filter(Boolean).join('\n\n');
  } else if(action==='schedule') {
    if(!['Post','Story','Brief','Video'].includes(item.kind))throw new WorkflowError('Schedules are recorded for content items. Complete internal decisions after approval.');
    if(item.stage!=='Approved') throw new WorkflowError('Approve the exact content before recording a schedule.');
    if(!evidence.bufferId?.trim()||!evidence.scheduledAt||!Number.isFinite(Date.parse(evidence.scheduledAt))) throw new WorkflowError('A real Buffer post ID and a provider-confirmed time with time zone are required.');
    if(!/(Z|[+-]\d\d:\d\d)$/.test(evidence.scheduledAt))throw new WorkflowError('Include Z or a UTC offset in the provider-confirmed time.');
    next.stage='Scheduled';next.bufferId=evidence.bufferId.trim();next.scheduledAt=new Date(evidence.scheduledAt).toISOString();
  } else if(action==='publish') {
    if(!['Post','Story','Brief','Video'].includes(item.kind))throw new WorkflowError('Publication receipts belong to content items.');
    if(!['Approved','Scheduled'].includes(item.stage)) throw new WorkflowError('Approve this item before recording publication.');
    if(!evidence.publicationUrl||!safeLink(evidence.publicationUrl)) throw new WorkflowError('Add the actual HTTPS publication URL.');
    const hostname=new URL(evidence.publicationUrl).hostname;
    if(item.channel==='X'&&(!/^(www\.)?(x\.com|twitter\.com)$/.test(hostname)||!/^\/[^/]+\/status\/\d+\/?$/.test(new URL(evidence.publicationUrl).pathname))) throw new WorkflowError('Add the actual X post URL, including its status ID.');
    next.stage='Published';next.publicationUrl=evidence.publicationUrl;next.workState='Completed';
  } else if(action==='complete') {
    if(['Post','Story','Brief','Video'].includes(item.kind)&&item.stage!=='Published') throw new WorkflowError('Content needs a publication receipt before moving to completed. Use a Task for internal deliverables.');
    if(item.kind==='Decision'&&item.stage!=='Approved')throw new WorkflowError('Approve this decision before marking it complete.');
    next.workState='Completed';
  } else if(action==='reopen') {
    if(item.stage==='Published')throw new WorkflowError('Published records stay in the archive. Create a revision for new work.');
    next.workState='Active';
  } else if(action==='activate') {next.workState='Active';next.priority='Next';}
  else throw new WorkflowError('Unknown workflow action.');
  return {...next,updatedAt:now,revision:item.revision+1};
}
export function revise(item:Item, patch:Partial<Item>, now:string):Item {
  const changedScope=['title','content','media','alt','channel'].some(k=>patch[k as keyof Item]!==undefined&&patch[k as keyof Item]!==item[k as keyof Item]);
  if(changedScope&&['Scheduled','Published'].includes(item.stage))throw new WorkflowError('Create a new draft revision to change scheduled or published content.');
  const next={...item,...patch, id:item.id, revision:item.revision+1,updatedAt:now};
  if(changedScope&&['Approved','Needs approval'].includes(item.stage)){next.stage='Draft';next.approvedAt='';next.approvalNote='';}
  return next;
}
export const stageTone:Record<Stage,string> = {'Draft':'neutral','Needs approval':'amber','Approved':'green','Scheduled':'blue','Published':'green'};
