import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { z as maybeRenderHead, Q as renderTemplate, a3 as addAttribute } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { $ as $$Image } from './_astro_assets_BHKqNLH9.mjs';
import { $ as $$PublicLayout } from './PublicLayout_C3C4g7py.mjs';
import 'clsx';
import { r as renderScript } from './Background_CT-Pdz5l.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
/* empty css                       */
import { $ as $$ProjectCard, j as jomDapur, a as jdManagement, i as invois } from './invois_D-XRm9Oh.mjs';
import { g as getProjects } from './projects_CfuewUuE.mjs';
import { e as experiencesService } from './experiences_C1h3Pi1D.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="hero" class="relative py-20 md:py-32 overflow-hidden"> <!-- Grid Background --> <div class="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div> <!-- Background Glows --> <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10"> <div class="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] animate-pulse"></div> <div class="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] animate-pulse" style="animation-delay: 1s;"></div> </div> <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12"> <!-- Left Content --> <div class="w-full md:w-1/2 text-center md:text-left z-10"> <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 rounded-full"> <span class="relative flex h-2 w-2"> <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span> <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span> </span> <span>Open to Opportunities</span> </div> <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"> <span class="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
Build. Ship.
</span> <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
Scale.
</span> </h1> <p class="text-gray-400 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
Full-stack engineer crafting high-performance digital experiences.
        Specialized in <span class="text-cyan-400 font-mono">Flutter</span> and <span class="text-purple-400 font-mono">Scalable Architecture</span>.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"> <a href="#projects" class="group relative px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg overflow-hidden transition-all hover:scale-105"> <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div> <span class="relative flex items-center gap-2">
View Projects
<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg> </span> </a> <a href="#contact" class="px-6 py-3 border border-gray-700 text-gray-300 font-medium rounded-lg hover:border-gray-500 hover:text-white transition-colors">
Contact Me
</a> </div> </div> <!-- Right Content: Code Terminal --> <div class="w-full md:w-1/2 flex justify-center md:justify-end relative perspective-1000"> <div class="relative w-full max-w-md transform transition-transform hover:scale-[1.02] duration-500"> <!-- Glow Effect --> <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-20"></div> <!-- Terminal Window --> <div class="relative rounded-xl bg-[#0d1117] border border-gray-800 shadow-2xl overflow-hidden"> <!-- Window Controls --> <div class="flex items-center justify-between px-4 py-3 bg-gray-900/50 border-b border-gray-800"> <div class="flex items-center gap-2"> <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div> <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div> <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div> </div> <div class="flex items-center gap-2 text-xs font-mono text-gray-500"> <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3"></path></svg>
stack.config.ts
</div> <div class="w-12"></div> <!-- Spacer for centering --> </div> <!-- Code Content --> <div class="p-6 font-mono text-sm overflow-hidden"> <div class="space-y-1"> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">1</span> <span class="text-purple-400">import</span> <span class="text-white ml-2">${ void 0}</span> <span class="text-red-400 ml-2">Passion</span> <span class="text-white">,</span> <span class="text-red-400 ml-2">Skill</span> <span class="text-purple-400 ml-2">from</span> <span class="text-green-400 ml-2">'@hafiz/core'</span> <span class="text-white">;</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">2</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">3</span> <span class="text-purple-400">export</span> <span class="text-blue-400 ml-2">const</span> <span class="text-yellow-400 ml-2">Developer</span> <span class="text-white ml-2">=</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">4</span> <span class="text-cyan-400 ml-4">stack</span> <span class="text-white">:</span> <span class="text-white ml-2">${ void 0}</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">5</span> <span class="text-cyan-400 ml-8">backend</span> <span class="text-white">:</span> <span class="text-white ml-2">[</span> <span class="text-green-400">'Node.js'</span> <span class="text-white">,</span> <span class="text-green-400 ml-2">'Bun'</span> <span class="text-white">,</span> <span class="text-green-400 ml-2">'Express'</span> <span class="text-white">,</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">6</span> <span class="text-green-400 ml-8">'Hono'</span> <span class="text-white">],</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">7</span> <span class="text-cyan-400 ml-8">db</span> <span class="text-white">:</span> <span class="text-white ml-2">[</span> <span class="text-green-400">'PostgreSQL'</span> <span class="text-white">,</span> <span class="text-green-400 ml-2">'MongoDB'</span> <span class="text-white">],</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">8</span> <span class="text-cyan-400 ml-8">mobile</span> <span class="text-white">:</span> <span class="text-white ml-2">[</span> <span class="text-green-400">'Flutter'</span> <span class="text-white">,</span> <span class="text-green-400 ml-2">'React Native'</span> <span class="text-white">,</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">9</span> <span class="text-green-400 ml-8">'Kotlin'</span> <span class="text-white">],</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">10</span> <span class="text-cyan-400 ml-8">framework</span> <span class="text-white">:</span> <span class="text-white ml-2">[</span> <span class="text-green-400">'CodeIgniter'</span> <span class="text-white">,</span> <span class="text-green-400 ml-2">'Laravel'</span> <span class="text-white">],</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">11</span> <span class="text-white ml-4"></span>,
</div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">12</span> <span class="text-cyan-400 ml-4">focus</span> <span class="text-white">:</span> <span class="text-green-400 ml-2">'High Performance'</span> <span class="text-white">,</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">13</span> <span class="text-cyan-400 ml-4">status</span> <span class="text-white">:</span> <span class="text-blue-400 ml-2">async</span> <span class="text-white ml-2">()</span> <span class="text-blue-400 ml-2">=></span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">14</span> <span class="text-purple-400 ml-8">return</span> <span class="text-green-400 ml-2">"Ready to Ship 🚀"</span> <span class="text-white">;</span> </div> <div class="flex"> <span class="text-gray-500 w-6 text-right mr-4 select-none">15</span> <span class="text-white"></span>;
</div> </div> <!-- Terminal Output --> <div class="mt-6 pt-4 border-t border-gray-800"> <div class="flex items-center gap-2 text-gray-400 text-xs font-mono"> <span class="text-green-500">➜</span> <span class="text-cyan-400">~/portfolio</span> <span class="text-gray-500">git commit -m "Initial launch"</span> </div> <div class="flex items-center gap-2 text-gray-400 text-xs font-mono mt-1"> <span class="text-green-500">➜</span> <span class="text-cyan-400">~/portfolio</span> <span class="animate-pulse">_</span> </div> </div> </div> </div> </div> </div> </div> </section>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/home/Hero.astro", void 0);

const PhoneNumberInput = ({
  name = "phone",
  label = "Comms Line (Phone)",
  placeholder = "Optional phone number",
  defaultCountry,
  className = ""
}) => {
  const [value, setValue] = useState();
  return /* @__PURE__ */ jsxs("div", { className: `form-item ${className}`.trim(), children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: name,
        className: "block text-xs font-mono text-cyan-500 mb-1 uppercase tracking-wider",
        children: label
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsx(
        PhoneInput,
        {
          id: name,
          value,
          onChange: setValue,
          defaultCountry,
          className: "phone-input flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2.5 text-white transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/50 hover:border-cyan-500/50 shadow-[inset_0_0_12px_rgba(15,23,42,0.8)]",
          numberInputProps: {
            name,
            placeholder,
            autoComplete: "tel",
            className: "flex-1 bg-transparent border-none px-0 py-0 text-white placeholder-gray-600 outline-none focus:outline-none font-mono tracking-wide"
          },
          countrySelectProps: {
            className: "bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none transition-all focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 hover:border-cyan-500/50 shadow-[0_0_15px_rgba(0,0,0,0.4)] font-mono text-sm"
          },
          style: {
            ["--PhoneInput-color--focus"]: "rgb(34 211 238)",
            ["--PhoneInputCountrySelectArrow-opacity"]: "0.9",
            ["--PhoneInputCountryFlag-borderColor"]: "rgba(8, 145, 178, 0.6)",
            ["--PhoneInputCountrySelectArrow-color"]: "rgba(34, 211, 238, 0.8)"
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-lg bg-cyan-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" })
    ] })
  ] });
};

const $$ContactSection = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="contact" class="scroll-offset mb-16 md:mb-20 perspective-1000" data-astro-cid-wmqlos3b> <div class="bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden transition-all duration-500 ease-out will-change-transform group will-change-[max-width] mx-auto" id="contact-container" style="min-height: 400px;" data-astro-cid-wmqlos3b> <!-- Background Tech Effects --> <div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 pointer-events-none" data-astro-cid-wmqlos3b></div> <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-20 pointer-events-none" data-astro-cid-wmqlos3b></div> <!-- Grid Pattern Overlay (Tech Feel) --> <div class="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" data-astro-cid-wmqlos3b></div> <!-- Scanner Beam (Hidden by default) --> <div id="scanner-beam" class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] opacity-0 z-20 pointer-events-none" data-astro-cid-wmqlos3b></div> <div class="relative z-10 max-w-2xl mx-auto h-full flex flex-col justify-center" data-astro-cid-wmqlos3b> <!-- Initial View --> <div id="contact-initial" class="transition-all duration-500 ease-out transform origin-center" data-astro-cid-wmqlos3b> <h2 class="text-3xl md:text-4xl font-bold mb-6 tracking-tight" data-astro-cid-wmqlos3b>
Let's <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500" data-astro-cid-wmqlos3b>Collaborate</span> </h2> <p class="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed" data-astro-cid-wmqlos3b>
Ready to build something extraordinary? Initialize the protocol and
          let's establish a connection.
</p> <div class="flex flex-col items-center gap-8" data-astro-cid-wmqlos3b> <button id="get-in-touch-btn" class="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-gray-800 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 overflow-hidden" data-astro-cid-wmqlos3b> <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700" data-astro-cid-wmqlos3b></span> <span class="relative z-10 flex items-center gap-3" data-astro-cid-wmqlos3b> <span data-astro-cid-wmqlos3b>INITIALIZE UPLINK</span> <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-wmqlos3b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-wmqlos3b></path></svg> </span> <div class="absolute inset-0 rounded-full ring-2 ring-white/10 group-hover:ring-cyan-400/50 transition-all duration-300" data-astro-cid-wmqlos3b></div> <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-wmqlos3b></div> </button> <!-- Social Links --> <div class="flex gap-6 items-center justify-center" id="social-links" data-astro-cid-wmqlos3b> <a href="https://github.com/hafizbahtiar" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-all transform hover:scale-110 hover:text-cyan-400" aria-label="GitHub" data-astro-cid-wmqlos3b> <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-wmqlos3b><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" data-astro-cid-wmqlos3b></path></svg> </a> <a href="https://www.linkedin.com/in/hafizbahtiar/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-all transform hover:scale-110 hover:text-cyan-400" aria-label="LinkedIn" data-astro-cid-wmqlos3b> <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-wmqlos3b><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" data-astro-cid-wmqlos3b></path></svg> </a> </div> </div> </div> <!-- Contact Form (Hidden by default) --> <div id="contact-form" class="hidden absolute inset-0 w-full h-full flex flex-col justify-center px-4 md:px-0 py-6 md:py-10" data-astro-cid-wmqlos3b> <div class="w-full max-w-lg mx-auto" data-astro-cid-wmqlos3b> <div id="contact-header" class="flex justify-between items-center mb-8 form-item opacity-0 translate-y-4" data-astro-cid-wmqlos3b> <h2 class="text-2xl md:text-3xl font-bold flex items-center gap-2" data-astro-cid-wmqlos3b> <span class="w-2 h-8 bg-cyan-500 rounded-full block" data-astro-cid-wmqlos3b></span>
Secure Channel
</h2> <button id="back-to-initial" class="text-gray-500 hover:text-cyan-400 transition-colors p-2 hover:bg-gray-800 rounded-full" data-astro-cid-wmqlos3b> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-wmqlos3b> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-wmqlos3b></path> </svg> </button> </div> <div id="form-status" class="hidden text-sm font-mono text-center p-3 rounded-lg border mb-4" data-astro-cid-wmqlos3b></div> <!-- Success View (Initially Hidden) --> <div id="success-view" class="hidden flex flex-col items-center justify-center text-center space-y-6 animate-fade-in" data-astro-cid-wmqlos3b> <div class="relative w-20 h-20" data-astro-cid-wmqlos3b> <div class="absolute inset-0 bg-green-500/20 rounded-full animate-ping" data-astro-cid-wmqlos3b></div> <div class="relative z-10 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]" data-astro-cid-wmqlos3b> <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-wmqlos3b> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-astro-cid-wmqlos3b></path> </svg> </div> </div> <div data-astro-cid-wmqlos3b> <h3 class="text-2xl font-bold text-white mb-2" data-astro-cid-wmqlos3b>
TRANSMISSION COMPLETE
</h3> <p class="text-gray-300" id="success-message" data-astro-cid-wmqlos3b>
Message successfully relayed to HQ.
</p> </div> <button id="send-another-btn" class="mt-4 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-cyan-400 border border-cyan-500/30 rounded-lg transition-all text-sm font-mono tracking-wider hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]" data-astro-cid-wmqlos3b>
ESTABLISH NEW UPLINK
</button> </div> <!-- Actual Form --> <form class="space-y-6 text-left" id="main-contact-form" data-astro-cid-wmqlos3b> <div class="form-item opacity-0 translate-x-10 transition-all duration-500 delay-100" data-astro-cid-wmqlos3b> <label for="name" class="block text-xs font-mono text-cyan-500 mb-1 uppercase tracking-wider" data-astro-cid-wmqlos3b>Identity</label> <div class="relative group" data-astro-cid-wmqlos3b> <input type="text" id="name" name="name" class="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder-gray-600" placeholder="Enter your name" maxlength="256" data-astro-cid-wmqlos3b> <div class="absolute inset-0 rounded-lg bg-cyan-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" data-astro-cid-wmqlos3b></div> </div> </div> <div class="form-item opacity-0 -translate-x-10 transition-all duration-500 delay-200" data-astro-cid-wmqlos3b> <label for="email" class="block text-xs font-mono text-cyan-500 mb-1 uppercase tracking-wider" data-astro-cid-wmqlos3b>Coordinates (Email)</label> <input type="email" id="email" name="email" class="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder-gray-600" placeholder="email@example.com" data-astro-cid-wmqlos3b> </div> ${renderComponent($$result, "PhoneNumberInput", PhoneNumberInput, { "className": "opacity-0 translate-x-10 transition-all duration-500 delay-300", "data-astro-cid-wmqlos3b": true })} <div class="form-item opacity-0 -translate-x-10 transition-all duration-500 delay-400" data-astro-cid-wmqlos3b> <label for="message" class="block text-xs font-mono text-cyan-500 mb-1 uppercase tracking-wider" data-astro-cid-wmqlos3b>Transmission Data</label> <div class="relative" data-astro-cid-wmqlos3b> <textarea id="message" name="message" rows="4" class="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all resize-none placeholder-gray-600" placeholder="Your message..." maxlength="2500" data-astro-cid-wmqlos3b></textarea> <span class="absolute right-3 bottom-3 text-xs font-mono text-gray-600" data-astro-cid-wmqlos3b>0 / 2500</span> </div> </div> <button type="submit" id="submit-btn" class="form-item opacity-0 translate-y-4 w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(6,182,212,0.3)] relative overflow-hidden group delay-500" data-astro-cid-wmqlos3b> <span class="relative z-10 flex items-center justify-center gap-2" data-astro-cid-wmqlos3b>
SEND TRANSMISSION
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-wmqlos3b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-astro-cid-wmqlos3b></path></svg> </span> <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" data-astro-cid-wmqlos3b></div> </button> </form> </div> </div> </div> </div> </section>  ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/home/ContactSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/home/ContactSection.astro", void 0);

const $$FeaturedProjects = createComponent(async ($$result, $$props, $$slots) => {
  const localImageMap = /* @__PURE__ */ new Map([
    ["/images/projects/jom-dapur.jpg", jomDapur],
    ["/images/projects/jd-management.png", jdManagement],
    ["/images/projects/invois/invois.png", invois]
  ]);
  const resolveImage = (imageUrl) => {
    if (!imageUrl) return void 0;
    return localImageMap.get(imageUrl) ?? imageUrl;
  };
  let projects = [];
  let hasError = false;
  try {
    projects = await getProjects();
  } catch {
    hasError = true;
  }
  const visibleProjects = projects.slice(0, 6).map((project) => ({
    ...project,
    imageUrl: resolveImage(project.imageUrl)
  }));
  return renderTemplate`${hasError ? renderTemplate`${maybeRenderHead()}<div class="text-center py-12 bg-red-900/10 rounded-xl border border-red-900/20 font-mono"><p class="text-red-400 mb-2 font-medium">Error: Failed to fetch projects</p><p class="text-sm text-gray-500 mb-4">
> Check network connection or try again later.
</p><a href="/" class="inline-flex px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm border border-gray-700">
./retry.sh
</a></div>` : visibleProjects.length === 0 ? renderTemplate`<div class="text-center py-16 bg-gray-900/30 rounded-3xl border border-gray-800 border-dashed"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4 text-gray-500"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg></div><h3 class="text-xl font-bold text-white mb-2 font-mono">Directory Empty</h3><p class="text-gray-400 max-w-md mx-auto text-sm">
> No projects found in current directory. Check back later.
</p></div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">${visibleProjects.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "title": project.title, "description": project.description, "imageUrl": project.imageUrl, "imageVariant": project.imageVariant, "tags": project.tags || [], "link": `/projects/${project.slug}`, "imageLoading": "lazy", "imageFetchPriority": "low" })}`)}</div>`}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/home/FeaturedProjects.astro", void 0);

const $$MapSection = createComponent(async ($$result, $$props, $$slots) => {
  const fallbackExperiences = [
    {
      id: 1,
      companyName: "Laureate System Solution Sdn Bhd",
      role: "Mobile Developer",
      startDate: "2024-08-01",
      endDate: null,
      isCurrent: true,
      location: "Kuala Lumpur, Malaysia",
      latitude: 3.162812,
      longitude: 101.649956,
      projectIds: [4],
      description: "Government procurement platform development",
      displayOrder: 1,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: 2,
      companyName: "Securiforce Sdn Bhd",
      role: "Programmer",
      startDate: "2022-12-01",
      endDate: "2024-07-31",
      isCurrent: false,
      location: "Kuala Lumpur, Malaysia",
      latitude: 3.169587829506779,
      longitude: 101.69440540132585,
      projectIds: [5, 9],
      description: "Cash-in-transit receipt book system",
      displayOrder: 2,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: 3,
      companyName: "Jom Dapur Sdn Bhd",
      role: "Software Engineer",
      startDate: "2020-09-01",
      endDate: "2022-11-30",
      isCurrent: false,
      location: "Kuala Lumpur, Malaysia",
      latitude: 3.2045919219587615,
      longitude: 101.72203100800152,
      projectIds: [6, 7, 8],
      description: "Food delivery platform development",
      displayOrder: 3,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: 4,
      companyName: "Associated Testing Laboratory Sdn Bhd",
      role: "Site & Lab Technician",
      startDate: "2019-05-01",
      endDate: "2020-08-31",
      isCurrent: false,
      location: "Kuala Lumpur, Malaysia",
      latitude: 3.196580727512005,
      longitude: 101.67055660869626,
      projectIds: [],
      description: "Laboratory testing and site inspections",
      displayOrder: 4,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ];
  const experiences = await (async () => {
    try {
      const data = await experiencesService.getPublicExperiences();
      if (data && data.length > 0) {
        return data;
      }
    } catch (error) {
      return fallbackExperiences;
    }
    return fallbackExperiences;
  })();
  const formatMonthYear = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat("en-MY", {
      month: "short",
      year: "numeric"
    }).format(date);
  };
  const formatDateRange = (experience) => {
    const start = formatMonthYear(experience.startDate);
    const endLabel = experience.isCurrent ? `Current (${(/* @__PURE__ */ new Date()).toLocaleDateString("en-MY")})` : experience.endDate ? formatMonthYear(experience.endDate) : "Present";
    return `${start} - ${endLabel}`;
  };
  const timelineEntries = experiences.slice().sort((a, b) => {
    if (a.isCurrent !== b.isCurrent) {
      return a.isCurrent ? -1 : 1;
    }
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  }).map((experience) => ({
    id: experience.id,
    company: experience.companyName,
    role: experience.role,
    date: formatDateRange(experience)
  }));
  const mapMarkers = experiences.filter(
    (experience) => experience.latitude !== null && experience.longitude !== null
  ).map((experience) => ({
    id: experience.id,
    company: experience.companyName,
    role: experience.role,
    date: formatDateRange(experience),
    latitude: experience.latitude,
    longitude: experience.longitude
  }));
  const mapCenter = mapMarkers.length ? [
    mapMarkers.reduce((sum, marker) => sum + marker.longitude, 0) / mapMarkers.length,
    mapMarkers.reduce((sum, marker) => sum + marker.latitude, 0) / mapMarkers.length
  ] : [101.68879746977579, 3.1789972504885133];
  return renderTemplate`${maybeRenderHead()}<section id="map" class="scroll-offset relative"> <div class="text-center mb-12"> <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 rounded-full"> <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> <span>WHERE I BUILD</span> </div> <h2 class="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
Based in
<span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Kuala Lumpur</span> </h2> <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
Shipping products across time zones, with roots in
<span class="text-cyan-400 font-mono">Malaysia</span>.
</p> </div> <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 lg:gap-8"> <div class="rounded-2xl border border-gray-800 bg-gray-900/60 p-4 md:p-6"> <div class="h-[320px] sm:h-[360px] md:h-[420px] w-full overflow-hidden rounded-xl border border-gray-800"> ${renderComponent($$result, "MapCanvas", null, { "client:only": "react", "markers": mapMarkers, "center": mapCenter, "client:component-hydration": "only", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/home/MapCanvas", "client:component-export": "default" })} </div> </div> <div class="rounded-2xl border border-gray-800 bg-gray-900/60 p-4 md:p-6"> <div class="flex items-center justify-between mb-6"> <h3 class="text-lg font-bold text-white tracking-tight">
Experience Timeline
</h3> <span class="text-xs font-mono text-cyan-400">[PATH]</span> </div> <div class="relative"> <div class="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-cyan-500/60 via-purple-500/30 to-transparent"></div> <div class="space-y-5"> ${timelineEntries.map((entry) => renderTemplate`<button type="button" class="map-timeline-item group relative w-full pl-10 text-left"${addAttribute(entry.id, "data-marker-id")}> <div class="map-timeline-dot absolute left-1.5 top-2 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-transform duration-300 group-hover:scale-110"></div> <div class="map-timeline-card rounded-xl border border-gray-800 bg-gray-950/60 px-4 py-3 transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.2)] group-hover:-translate-y-0.5"> <div class="flex items-center justify-between gap-3"> <div> <div class="text-sm font-semibold text-white"> ${entry.company} </div> <div class="text-xs font-mono text-cyan-300"> ${entry.role} </div> </div> <div class="text-xs font-mono text-gray-400 whitespace-nowrap"> ${entry.date} </div> </div> </div> </button>`)} </div> </div> </div> </div> </section> ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/home/MapSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/home/MapSection.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  let allProjects = [];
  try {
    allProjects = await getProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }
  const skills = [
    {
      category: "Backend & Architecture",
      items: [
        "Bun",
        "Hono",
        "PostgreSQL",
        "Java Spring Boot",
        "MongoDB",
        "Node.js",
        "Express.js",
        "Caddy",
        "Postman"
      ]
    },
    {
      category: "Mobile Engineering",
      items: ["Flutter", "React Native", "Kotlin", "Dart"]
    },
    {
      category: "Frontend Ecosystem",
      items: ["React", "Astro", "TypeScript", "Next.js"]
    },
    {
      category: "PHP Framework",
      items: ["CodeIgniter", "Laravel"]
    },
    {
      category: "DevOps & Tools",
      items: ["Docker", "Git", "Linux"]
    }
  ];
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${maybeRenderHead()}<div class="container-main space-y-16 md:space-y-24 pb-16 md:pb-24"> <!-- About Section --> <section id="about" class="scroll-offset relative py-12 md:py-20"> <!-- Background Gradients --> <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"> <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[100px]"></div> <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]"></div> </div> <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"> <!-- Profile Column (Left - 5 cols) --> <div class="lg:col-span-5 flex flex-col gap-6"> <!-- Terminal Profile Card --> <div class="group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/80 backdrop-blur-xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]"> <!-- Terminal Header --> <div class="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-800"> <div class="flex gap-2"> <div class="w-3 h-3 rounded-full bg-red-500/80"></div> <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div> <div class="w-3 h-3 rounded-full bg-green-500/80"></div> </div> <div class="text-xs font-mono text-gray-500">
profile.json
</div> </div> <!-- Profile Content --> <div class="p-8 relative"> <!-- Tech Rings Background --> <div class="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"> <div class="w-64 h-64 border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div> <div class="absolute w-48 h-48 border border-purple-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div> </div> <div class="relative z-10 flex flex-col items-center text-center"> <div class="w-32 h-32 mb-6 rounded-full p-1 bg-gradient-to-br from-cyan-500 to-purple-600"> <div class="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden"> ${renderComponent($$result2, "Image", $$Image, { "src": "/favicons/icon1.png", "alt": "Hafiz Bahtiar", "width": "128", "height": "128", "class": "w-full h-full object-cover" })} </div> </div> <h3 class="text-2xl font-bold text-white mb-2">
Hafiz Bahtiar
</h3> <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700"> <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> <span class="text-xs font-mono text-gray-300">Available for hire</span> </div> </div> </div> <!-- Code Snippet --> <div class="bg-gray-950 p-6 border-t border-gray-800 font-mono text-xs overflow-x-auto"> <div class="flex gap-4 text-gray-500 mb-2"> <span>1</span> <span class="text-purple-400">const</span> <span class="text-blue-400">developer</span> = ${"{"} </div> <div class="flex gap-4 text-gray-500 mb-1"> <span>2</span> <span class="pl-4 text-gray-300">role:</span> <span class="text-green-400">'Full Stack Engineer'</span>,
</div> <div class="flex gap-4 text-gray-500 mb-1"> <span>3</span> <span class="pl-4 text-gray-300">level:</span> <span class="text-orange-400">'Mid-Senior'</span>,
</div> <div class="flex gap-4 text-gray-500 mb-1"> <span>4</span> <span class="pl-4 text-gray-300">coffee:</span> <span class="text-blue-400">true</span> </div> <div class="flex gap-4 text-gray-500"> <span>5</span> ${"}"};
</div> </div> </div> </div> <!-- Content Column (Right - 7 cols) --> <div class="lg:col-span-7 flex flex-col justify-center gap-8"> <div class="space-y-6"> <div class="flex items-center gap-3"> <span class="text-cyan-400 font-mono text-sm">~/about-me</span> <div class="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent"></div> </div> <h2 class="text-3xl md:text-5xl font-bold leading-tight text-white"> <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Architecting</span> the future of digital experiences.
</h2> <p class="text-gray-400 text-lg leading-relaxed">
I'm a software engineer focused on <span class="text-cyan-400 font-mono">backend first</span> and
<span class="text-purple-400 font-mono">mobile second</span>. I build reliable services and practical mobile
							experiences that ship fast and stay maintainable.
</p> <p class="text-gray-400 text-lg leading-relaxed">
Main stack: <span class="text-cyan-400 font-mono text-sm bg-cyan-400/10 px-1 rounded">Bun</span> + <span class="text-cyan-400 font-mono text-sm bg-cyan-400/10 px-1 rounded">Hono</span> + <span class="text-cyan-400 font-mono text-sm bg-cyan-400/10 px-1 rounded">PostgreSQL</span>, <span class="text-purple-400 font-mono text-sm bg-purple-400/10 px-1 rounded">Spring Boot</span> + <span class="text-purple-400 font-mono text-sm bg-purple-400/10 px-1 rounded">PostgreSQL</span> + <span class="text-purple-400 font-mono text-sm bg-purple-400/10 px-1 rounded">MongoDB</span>, plus <span class="text-cyan-400 font-mono text-sm bg-cyan-400/10 px-1 rounded">Flutter</span>, <span class="text-cyan-400 font-mono text-sm bg-cyan-400/10 px-1 rounded">React Native</span>, and <span class="text-cyan-400 font-mono text-sm bg-cyan-400/10 px-1 rounded">Kotlin</span>.
</p> </div> <!-- Stats Grid --> <div class="grid grid-cols-2 md:grid-cols-3 gap-4"> <!-- Stat 1 --> <div class="p-4 rounded-xl bg-gray-800/30 border border-gray-800 hover:border-cyan-500/50 transition-all hover:bg-gray-800/50 group"> <div class="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
5+
</div> <div class="text-sm text-gray-500 font-mono">
Years Exp
</div> </div> <!-- Stat 2 --> <div class="p-4 rounded-xl bg-gray-800/30 border border-gray-800 hover:border-purple-500/50 transition-all hover:bg-gray-800/50 group"> <div class="text-3xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors"> ${allProjects.length}+
</div> <div class="text-sm text-gray-500 font-mono">
Projects
</div> </div> <!-- Stat 3 --> </div> <div class="pt-4"> <a href="#contact" class="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"> <span>Initialize_Collab()</span> <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> </a> </div> </div> </div> </section> <section id="github-activity" class="scroll-offset relative py-6 md:py-10"> <div class="rounded-2xl border border-gray-800 bg-gray-900/40 p-5 md:p-6"> <div class="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"> <div> <p class="text-cyan-400 font-mono text-sm">
~/github-activity
</p> <h2 class="mt-1 text-2xl md:text-3xl font-bold text-white">
GitHub Contributions
</h2> <p class="mt-2 max-w-2xl text-sm md:text-base text-gray-400">
A quick snapshot of my public GitHub activity and
							coding consistency.
</p> </div> <a href="https://github.com/hafizbahtiar" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-300">
View Profile
</a> </div> <div class="overflow-hidden rounded-xl border border-gray-800 bg-[#0d1117] p-3 md:p-4"> <img src="https://ghchart.rshah.org/hafizbahtiar" alt="GitHub contribution chart for hafizbahtiar" class="block w-full rounded-md" style="filter: brightness(0.9) contrast(1.02);" referrerpolicy="no-referrer" class="block w-full rounded-md"> </div> </div> </section> <!-- Skills Section --> <section id="skills" class="scroll-offset"> <div class="text-center mb-16"> <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 rounded-full"> <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> <span>TECH ARSENAL</span> </div> <h2 class="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
Engineering <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Stack</span> </h2> <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
Tooling I use to ship <span class="text-cyan-400 font-mono">clean, scalable</span>, and
<span class="text-purple-400 font-mono">performance-focused</span> experiences.
</p> </div> <div class="grid grid-cols-1 gap-4"> ${skills.map((skillGroup, index) => renderTemplate`<div class="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/40 p-6 md:p-8 transition-all duration-300 hover:border-cyan-500/50 hover:bg-gray-900/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"> <div class="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/5 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/10"></div> <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10"> <div class="md:w-1/3"> <div class="flex items-center gap-3 mb-2"> <span class="text-xs font-mono text-cyan-500/70">
0${index + 1} </span> <div class="h-px w-8 bg-gray-800 group-hover:bg-cyan-500/50 transition-colors"></div> </div> <h3 class="text-xl font-bold text-white tracking-wide uppercase group-hover:text-cyan-400 transition-colors"> ${skillGroup.category} </h3> </div> <div class="md:w-2/3 flex flex-wrap gap-3"> ${skillGroup.items.map((item) => renderTemplate`<div class="relative overflow-hidden rounded-md border border-gray-700/50 bg-gray-800/50 px-3 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:border-cyan-500/30 hover:text-white hover:bg-cyan-500/10"> ${item} </div>`)} </div> </div> </div>`)} </div> </section> <!-- Projects Section --> <section id="projects" class="scroll-offset relative"> <div class="text-center mb-16"> <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-mono text-purple-400 bg-purple-950/30 border border-purple-500/30 rounded-full"> <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> <span>FEATURED WORK</span> </div> <h2 class="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
Selected <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Projects</span> </h2> <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
A selection of my recent work demonstrating my expertise in
<span class="text-cyan-400 font-mono">mobile</span> and <span class="text-purple-400 font-mono">web development</span>.
</p> </div> ${renderComponent($$result2, "FeaturedProjects", $$FeaturedProjects, {})} <div class="text-center mt-12"> <a href="/projects" class="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-700 hover:border-cyan-500/50 text-white font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"> <span>View All Projects</span> <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg> </a> </div> </section> ${renderComponent($$result2, "MapSection", $$MapSection, {})} ${renderComponent($$result2, "ContactSection", $$ContactSection, {})} </div> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/index.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
