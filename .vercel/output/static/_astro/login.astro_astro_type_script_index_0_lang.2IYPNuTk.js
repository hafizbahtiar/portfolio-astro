import{a as f}from"./auth.p1snjZX_.js";const h=document.getElementById("login-form"),n=document.getElementById("status-display"),w=document.getElementById("status-text"),a=document.getElementById("status-panel"),m=document.getElementById("status-icon"),t=document.getElementById("submit-btn");let r=0,l=0;const g=document.getElementById("toggle-password"),d=document.getElementById("password");g?.addEventListener("click",()=>{if(d){const s=d.getAttribute("type")==="password"?"text":"password";d.setAttribute("type",s);const e=g.querySelector("svg");e&&(s==="text"?e.innerHTML=`
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          `:e.innerHTML=`
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          `)}});f.isAuthenticated()&&(window.location.href="/admin");const c=(s,e,o)=>{!n||!w||!a||!m||(w.textContent=s,e==="success"?a.classList.add("status-success"):a.classList.remove("status-success"),m.innerHTML=o,n.classList.remove("hidden"),n.offsetWidth)},p=`
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
    </svg>`,y=`
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>`,v=()=>{h?.reset(),t&&(t.textContent="Sign in",t.disabled=!1),n&&n.classList.add("hidden")};v();window.addEventListener("pageshow",v);h?.addEventListener("submit",async s=>{s.preventDefault();const e=new FormData(s.target),o=e.get("username"),u=e.get("password");if(!(!o||!u)){if(Date.now()<l){const i=Math.ceil((l-Date.now())/1e3);c(`Too many attempts. Try again in ${i}s.`,"error",p);return}t&&(t.innerHTML=`
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Signing in...
      `,t.disabled=!0),n&&n.classList.add("hidden");try{if(await f.login(o,u))r=0,t&&(t.innerHTML=`
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Signed in
          `),c("Redirecting to dashboard...","success",y),setTimeout(()=>{window.location.href="/admin"},1e3);else throw new Error("Invalid email or password.")}catch(i){r++,r>=5&&(l=Date.now()+6e4,r=0),t&&(t.textContent="Sign in",t.disabled=!1),c(i.message||"Invalid email or password.","error",p)}}});
