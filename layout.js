function renderLayout(active){
  ERP.requireAuth();
  const storeName = ERP.cfg.store.name;

  document.body.insertAdjacentHTML('afterbegin', `
<header>
  <div class="wrap topbar">
    <div class="brand">
      <div class="logo"></div>
      <div>
        <h1>ERP Hortifruti/Mercearia <span class="tag">Local</span></h1>
        <small>UF: ${ERP.cfg.store.uf} • Produtos • Estoque • PDV • Fiscal • Relatórios • IA</small>
      </div>
    </div>
    <div class="pill">
      <span>Loja:</span> <strong>${storeName}</strong>
      <span class="muted">|</span>
      <span id="clock"></span>
      <span class="muted">|</span>
      <a href="#" onclick="ERP.logout();return false;" class="muted">Sair</a>
    </div>
  </div>
</header>

<div class="wrap grid">
  <nav>
    <div class="navtitle">Menu</div>
    <a class="${active==='dash'?'active':''}" href="index.html">Dashboard <span class="muted">⌁</span></a>
    <a class="${active==='prod'?'active':''}" href="produtos.html">Produtos <span class="muted">⌁</span></a>
    <a class="${active==='stock'?'active':''}" href="estoque.html">Estoque <span class="muted">⌁</span></a>
    <a class="${active==='pos'?'active':''}" href="pdv.html">PDV <span class="muted">⌁</span></a>
    <a class="${active==='fiscal'?'active':''}" href="fiscal.html">Fiscal (MG) <span class="muted">⌁</span></a>
    <a class="${active==='reports'?'active':''}" href="relatorios.html">Relatórios <span class="muted">⌁</span></a>
    <a class="${active==='ai'?'active':''}" href="ia.html">Assistente IA <span class="muted">⌁</span></a>
    <hr style="border:0;border-top:1px solid rgba(255,255,255,.08); margin:12px 0;">
    <div class="muted" style="font-size:12px; padding: 0 6px;">
      <p><strong>Nota:</strong> este front roda 100% local via LocalStorage. Depois conecte ao Node.js.</p>
    </div>
  </nav>

  <main id="main"></main>
</div>

<div class="toast" id="toast"></div>
  `);

  setInterval(()=> {
    const el = document.getElementById('clock');
    if(el) el.textContent = new Date().toLocaleString('pt-BR');
  }, 500);
}