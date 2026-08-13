// app.js - "backend" local em LocalStorage (MVP). Depois você liga no Node.js via fetch.

const ERP = {
  cfg: {
    store: { id: "mg-01", name: "Loja MG (Local)", uf: "MG" },
    apiBase: "http://localhost:3000" // quando tiver Node.js
  },
  load() {
    const raw = localStorage.getItem("erp_mvp_db");
    if (raw) return JSON.parse(raw);
    const db = { products: [], sales: [], cart: [] };
    localStorage.setItem("erp_mvp_db", JSON.stringify(db));
    return db;
  },
  save(db) {
    localStorage.setItem("erp_mvp_db", JSON.stringify(db));
  },
  fmtBRL(n){ return (Number(n||0)).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); },
  uid(prefix='id'){ return prefix+'-'+Math.random().toString(16).slice(2)+'-'+Date.now().toString(16); },
  toast(msg){
    const t = document.getElementById('toast');
    if(!t) return alert(msg);
    t.textContent = msg;
    t.style.display = 'block';
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(()=> t.style.display='none', 2400);
  },
  requireAuth(){
    const token = localStorage.getItem("erp_token");
    if(!token) window.location.href = "login.html";
  },
  logout(){
    localStorage.removeItem("erp_token");
    window.location.href = "login.html";
  },
  seedIfEmpty(){
    const db = ERP.load();
    if(db.products.length) return;

    db.products = [
      {id:ERP.uid('prod'), sku:"BAN001", barcode:"789000000001", desc:"Banana prata (kg)", cat:"Hortifruti > Frutas", unit:"KG", cost:3.20, price:5.99, stock:42.5, min:10, exp:null},
      {id:ERP.uid('prod'), sku:"TOM001", barcode:"789000000002", desc:"Tomate (kg)", cat:"Hortifruti > Legumes/Verde", unit:"KG", cost:4.10, price:7.49, stock:8.2, min:12, exp:null},
      {id:ERP.uid('prod'), sku:"ARR001", barcode:"789000000003", desc:"Arroz 5kg", cat:"Mercearia", unit:"UN", cost:18.00, price:24.90, stock:25, min:6, exp:"2026-12-01"},
      {id:ERP.uid('prod'), sku:"LEI001", barcode:"789000000004", desc:"Leite integral 1L", cat:"Frios/Laticínios", unit:"UN", cost:4.20, price:5.49, stock:4, min:12, exp:"2026-08-01"},
    ];
    ERP.save(db);
  },
  expirySoon(p, days=7){
    if(!p.exp) return false;
    const d = new Date(p.exp+"T00:00:00");
    const diff = (d - new Date()) / (1000*60*60*24);
    return diff <= days;
  },
  lowCount(db){ return db.products.filter(p=>p.stock < p.min).length; }
};