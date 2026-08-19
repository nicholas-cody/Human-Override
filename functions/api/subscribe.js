export async function onRequestPost(context){
 try{
  const body=await context.request.json();
  const email=String(body?.email||"").trim().toLowerCase();
  if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email))return json({error:"Enter a valid email."},400);
  if(!context.env.DB)return json({error:"Database not configured."},503);
  await context.env.DB.prepare("INSERT INTO subscribers(email,created_at,status) VALUES(?,datetime('now'),'active') ON CONFLICT(email) DO UPDATE SET status='active'").bind(email).run();
  return json({message:"You're on the list. Thank you for adding your voice."},200);
 }catch{return json({error:"Unable to subscribe."},500)}
}
function json(data,status){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json"}})}
