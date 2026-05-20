import{a as g}from"./auth.ClBkQnlK.js";const r=document.getElementById("login-form"),t=document.getElementById("status-display"),n=document.getElementById("status-text"),e=document.getElementById("status-panel"),a=document.getElementById("status-icon"),c=r?.querySelector("button"),L=c?.innerHTML||"";let d=0,u=0;const v=document.getElementById("toggle-password"),w=document.getElementById("password");v?.addEventListener("click",()=>{if(w){const i=w.getAttribute("type")==="password"?"text":"password";w.setAttribute("type",i);const o=v.querySelector("svg");o&&(i==="text"?o.innerHTML=`
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          `:o.innerHTML=`
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          `)}});g.isAuthenticated()&&(window.location.href="/admin");const h=()=>{r&&r.reset(),c&&(c.innerHTML=L,c.disabled=!1),t&&(t.classList.add("hidden"),t.classList.remove("status-show")),e&&(e.classList.remove("status-success"),e.classList.add("status-error")),a&&(a.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
      `),n&&(n.textContent="ACCESS_DENIED: Invalid credentials provided.")};h();window.addEventListener("pageshow",()=>{h()});r?.addEventListener("submit",async i=>{i.preventDefault();const o=new FormData(i.target),m=o.get("username"),p=o.get("password");if(!m||!p)return;if(Date.now()<u){const l=Math.ceil((u-Date.now())/1e3);n&&(n.textContent=`ACCESS_LOCKED: Too many attempts. Try again in ${l}s.`),e&&(e.classList.remove("status-success"),e.classList.add("status-error")),t&&(t.classList.remove("hidden"),t.offsetWidth,t.classList.add("status-show"));return}const s=r.querySelector("button");let f="";s&&(f=s.innerHTML,s.innerHTML=`
        <div class="relative bg-gray-900 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2">
          <svg class="animate-spin h-5 w-5 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="font-mono">VERIFYING...</span>
        </div>
      `,s.disabled=!0),t&&(t.classList.add("hidden"),t.classList.remove("status-show"));try{if(await g.login(m,p))d=0,s&&(s.innerHTML=`
                    <div class="relative bg-green-900/20 text-green-400 px-4 py-3 rounded-lg flex items-center justify-center space-x-2 border border-green-500/30">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="font-mono">ACCESS GRANTED</span>
                    </div>
                 `),t&&n&&e&&a&&(n.textContent="ACCESS_GRANTED: Redirecting to dashboard...",e.classList.remove("status-error"),e.classList.add("status-success"),a.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          `,t.classList.remove("hidden"),t.offsetWidth,t.classList.add("status-show")),setTimeout(()=>{window.location.href="/admin"},1e3);else throw new Error("Authentication failed")}catch(l){d++,d>=5&&(u=Date.now()+6e4,d=0),s&&(s.innerHTML=f,s.disabled=!1),t&&n&&e&&a&&(n.textContent=`ACCESS_DENIED: ${l.message||"Invalid credentials provided."}`,e.classList.remove("status-success"),e.classList.add("status-error"),a.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
        `,t.classList.remove("hidden"),t.offsetWidth,t.classList.add("status-show"))}});
