
const BRAND = { name: "StarterKart", wa: "https://wa.me/9818082449" };

// Demo: load portfolio and pricing from localStorage
function loadDemoData(){
  if(!localStorage.getItem('starterkart_data')){
    const data = {
      pricing:[
        {id:1,name:"Basic Shopify Customisation",price:"$79",features:["Small tweaks","1 revision","Delivery: 2 days"]},
        {id:2,name:"Standard Shopify Customisation",price:"$199",features:["Homepage & product fixes","3 revisions","Delivery: 4 days"]},
        {id:3,name:"Premium Shopify Customisation",price:"$399",features:["Full store customisation","Unlimited revisions","Delivery: 7 days"]}
      ],
      portfolio:[
        {id:1,title:"Fashion Store - Custom PDP",img:"assets/images/port1.svg"},
        {id:2,title:"Electronics Brand - Speed Optimisation",img:"assets/images/port2.svg"},
        {id:3,title:"Home Decor - Homepage Redesign",img:"assets/images/port3.svg"}
      ]
    };
    localStorage.setItem('starterkart_data', JSON.stringify(data));
  }
}

function getData(){ return JSON.parse(localStorage.getItem('starterkart_data')||'{}'); }

function renderPricing(containerId='pricing-list'){
  const container = document.getElementById(containerId);
  if(!container) return;
  const data = getData();
  container.innerHTML = '';
  (data.pricing||[]).forEach(p=>{
    const div = document.createElement('div'); div.className='price fade-up';
    div.innerHTML = `<h3>${p.name}</h3><p class="small">${p.features.join(' • ')}</p><h2 style="margin:12px 0">${p.price}</h2>
    <a class="cta" href="${BRAND.wa}" target="_blank">Start on WhatsApp</a>`;
    container.appendChild(div);
  });
}

function renderPortfolio(containerId='port-list'){
  const container = document.getElementById(containerId);
  if(!container) return;
  const data = getData();
  container.innerHTML = '';
  (data.portfolio||[]).forEach(p=>{
    const div = document.createElement('div'); div.className='port-item fade-up';
    div.innerHTML = `<img src="${p.img}" alt="${p.title}"><div style="padding:12px"><strong>${p.title}</strong><p class="small">Shopify theme customisation case study</p></div>`;
    container.appendChild(div);
  });
}

/* Admin demo: simple auth, edit pricing & portfolio (localStorage) */
function adminLogin(e){
  e.preventDefault();
  const pass = document.getElementById('admin-pass').value;
  // demo password: starter123 (not secure)
  if(pass==='starter123'){ localStorage.setItem('starterkart_admin','1'); window.location.href='dashboard.html'; }
  else alert('Invalid password — demo uses starter123');
}

function adminLogout(){
  localStorage.removeItem('starterkart_admin'); window.location.href='../index.html';
}

function adminLoad(){
  const data = getData();
  // populate pricing editor
  const tpl = document.getElementById('pricing-editor');
  if(!tpl) return;
  tpl.innerHTML = '';
  (data.pricing||[]).forEach(p=>{
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<h4>${p.name}</h4>
      <div class="small">Price: <input value="${p.price}" data-id="${p.id}" class="price-input"></div>
      <div class="small">Features (comma separated): <input value="${p.features.join(', ')}" data-id="${p.id}" class="feat-input"></div>
      <button onclick="savePrice(${p.id})">Save</button>`;
    tpl.appendChild(div);
  });
}

function savePrice(id){
  const data = getData();
  const priceInput = document.querySelector('.price-input[data-id="'+id+'"]');
  const featInput = document.querySelector('.feat-input[data-id="'+id+'"]');
  data.pricing = data.pricing.map(p=> p.id===id ? {...p, price: priceInput.value, features: featInput.value.split(',').map(s=>s.trim())} : p );
  localStorage.setItem('starterkart_data', JSON.stringify(data));
  alert('Saved (local demo). Refreshing data on public pages.');
  renderPricing(); renderPortfolio();
}

/* init on pages */
document.addEventListener('DOMContentLoaded',()=>{
  loadDemoData();
  renderPricing();
  renderPortfolio();
  const loginForm = document.getElementById('admin-login-form');
  if(loginForm) loginForm.addEventListener('submit', adminLogin);
  const aLogout = document.getElementById('admin-logout');
  if(aLogout) aLogout.addEventListener('click', adminLogout);
  const adminPage = document.getElementById('admin-dashboard');
  if(adminPage) adminLoad();
});
