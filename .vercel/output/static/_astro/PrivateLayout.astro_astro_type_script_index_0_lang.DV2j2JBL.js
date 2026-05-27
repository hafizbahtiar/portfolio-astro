import{a as e}from"./auth.p1snjZX_.js";const r=async()=>{if(e.isAuthenticated())return;await e.tryRefresh()||window.location.replace("/login")};r();window.addEventListener("pageshow",()=>{r()});
