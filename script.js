/* Human Override. Payment links intentionally remain unconfigured until supplied.
   The existing /api/subscribe Cloudflare Pages function remains the join backend. */
const CONFIG = {
  // Paste verified, hosted payment URLs here; one per amount or a single fallback.
  contributionLinks: { "10":"", "25":"", "50":"", "100":"", "other":"" },
  contributionFallbackUrl: ""
};

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if(menuBtn && navLinks){
  const closeMenu = () => {navLinks.classList.remove("open"); menuBtn.setAttribute("aria-expanded","false");menuBtn.setAttribute("aria-label","Open navigation")};
  menuBtn.addEventListener("click",()=>{
    const open=navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded",String(open));
    menuBtn.setAttribute("aria-label",open?"Close navigation":"Open navigation");
  });
  navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
}

const progress = document.getElementById("progress");
const updateProgress = () => {
  if (!progress) return;
  const d=document.documentElement;
  const max=d.scrollHeight-d.clientHeight;
  progress.style.width=(max>0?100*d.scrollTop/max:0)+"%";
};
window.addEventListener("scroll",updateProgress,{passive:true});
window.addEventListener("resize",updateProgress,{passive:true});
updateProgress();

const signupForm=document.getElementById("signupForm");
if (signupForm){
 signupForm.addEventListener("submit",async event=>{
   event.preventDefault();
   const status=document.getElementById("formStatus");
   const submit=signupForm.querySelector('button[type="submit"]');
   const email=signupForm.elements.namedItem("email").value.trim();
   if(!signupForm.reportValidity()) return;
   status.textContent="Submitting your signup…";
   status.dataset.error="false";status.dataset.success="false";
   submit.disabled=true;
   try{
     const response=await fetch("/api/subscribe",{
       method:"POST",headers:{"Content-Type":"application/json"},
       body:JSON.stringify({email})
     });
     let result={};
     try{result=await response.json()}catch{}
     if(!response.ok)throw new Error(result.error || "We couldn't complete your signup. Please try again.");
     status.textContent=result.message || "Thanks for joining Human Override.";
     status.dataset.success="true";
     signupForm.reset();
   }catch(error){
     status.textContent=error.message || "Unable to subscribe right now.";
     status.dataset.error="true";
   }finally{submit.disabled=false}
 });
}

const amountButtons=[...document.querySelectorAll(".amounts button[data-amount]")];
const supportButton=document.getElementById("donationButton");
const supportStatus=document.getElementById("supportStatus");
let selectedAmount="25";
function updateContribution(){
  const url=CONFIG.contributionLinks[selectedAmount] || CONFIG.contributionFallbackUrl;
  const active=Boolean(url && /^https:\/\//i.test(url));
  amountButtons.forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.amount===selectedAmount)));
  if(!supportButton) return;
  supportButton.classList.toggle("is-inactive",!active);
  supportButton.setAttribute("aria-disabled",String(!active));
  supportButton.href=active?url:"#donate";
  if(active){
    supportButton.target="_blank";supportButton.rel="noopener noreferrer";
    supportStatus.textContent="You'll be taken to secure third-party checkout.";
  }else{
    supportButton.removeAttribute("target");supportButton.removeAttribute("rel");
    supportStatus.textContent="Secure contribution checkout isn't connected yet.";
  }
}
amountButtons.forEach(btn=>btn.addEventListener("click",()=>{selectedAmount=btn.dataset.amount;updateContribution()}));
if(supportButton)supportButton.addEventListener("click",event=>{
  if(supportButton.getAttribute("aria-disabled")==="true"){
    event.preventDefault();
    supportStatus.textContent="Online contributions aren't available yet. Please check back soon.";
  }
});
updateContribution();
