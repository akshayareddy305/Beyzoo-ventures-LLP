/* Shared: config, storage, header/footer rendering, product card, global handlers */
const CFG={wa:'910000000000',brand:'Beyzoo Ventures LLP'}; // WhatsApp number = DEMO PLACEHOLDER
const ROOT=document.body.dataset.root||'';
const inr=n=>'₹'+n.toLocaleString('en-IN');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const Store={cart:()=>ls.get('nc_cart',[]),wish:()=>ls.get('nc_wish',[]),
 add(l){const c=Store.cart(),f=c.find(x=>x.id===l.id&&x.color===l.color&&x.size===l.size);f?f.qty+=l.qty:c.push(l);ls.set('nc_cart',c);Store.badges()},
 toggleWish(id){let w=Store.wish();w=w.includes(id)?w.filter(x=>x!==id):[...w,id];ls.set('nc_wish',w);Store.badges()},
 badges(){const n=Store.cart().reduce((a,b)=>a+b.qty,0);$$('[data-cart-count]').forEach(e=>e.textContent=n);$$('[data-wish-count]').forEach(e=>e.textContent=Store.wish().length);
  $$('.heart').forEach(h=>h.classList.toggle('on',Store.wish().includes(h.dataset.wish)))}};
const catOf=slug=>CATEGORIES.find(c=>c.slug===slug);
const wa=msg=>`https://wa.me/${CFG.wa}?text=${encodeURIComponent(msg)}`;
function media(src,alt,tone,label){return src?`<img src="${ROOT}${src}" alt="${alt}" loading="lazy" data-tone="${tone}" data-label="${label}">`:`<div class="ph" role="img" aria-label="${alt}" style="background:linear-gradient(160deg,${tone},#101010)">${label}</div>`}
function card(p){const c=catOf(p.cat);return `<article class="card reveal"><a href="${ROOT}product.html?id=${p.id}"><div class="m">${media(p.image,p.name,c.tone,c.name)}</div><h3>${p.name}</h3></a>
${p.badges[0]?`<span class="badge">${p.badges[0]}</span>`:''}<button class="heart" data-wish="${p.id}" aria-label="Toggle wishlist">♥</button>
<p class="price">${inr(p.price)}${p.compare?`<s>${inr(p.compare)}</s>`:''}</p>${p.stock?`<button class="qa" data-quick="${p.id}">Quick add</button>`:''}</article>`}
function renderChrome(){
 const dd=CATEGORIES.map(c=>`<a href="${ROOT}shop.html?cat=${c.slug}">${c.name}</a>`).join('');
 $('#site-header').innerHTML=`<div class="announce">Discover Our New Collection | Wholesale &amp; International Enquiries Welcome</div><header class="site"><div class="wrap bar">
 <button class="burger" aria-label="Menu" aria-expanded="false">Menu</button><a class="logo" href="${ROOT}index.html">Beyzoo Ventures LLP</a>
 <nav class="main" aria-label="Main"><div class="dd"><a href="${ROOT}shop.html">Shop</a><div class="dd-menu">${dd}</div></div><a href="${ROOT}shop.html?new=1">New Arrivals</a><a href="${ROOT}shop.html?best=1">Bestsellers</a><a href="${ROOT}wholesale.html">Wholesale</a><a href="${ROOT}export-enquiry.html">Export</a><a href="${ROOT}about.html">About</a><a href="${ROOT}contact.html">Contact</a></nav>
 <div class="tools"><button class="ib" id="sbtn" aria-label="Search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg></button><a class="ib" href="${ROOT}account.html" aria-label="Account"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg></a><a class="ib" href="${ROOT}wishlist.html" aria-label="Wishlist"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/></svg><b class="cnt" data-wish-count>0</b></a><a class="ib" href="${ROOT}cart.html" aria-label="Shopping bag"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l1 14H5z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg><b class="cnt" data-cart-count>0</b></a></div></div><div class="sbar" id="sbar" hidden><div class="wrap"><form action="${ROOT}search.html"><input name="q" id="sq" autocomplete="off" placeholder="Search products" aria-label="Search products"></form><div id="sugg"></div></div></div></header>`;
 const L=(a)=>a.map(([n,u])=>`<a href="${ROOT}${u}">${n}</a>`).join('');
 $('#site-footer').innerHTML=`<footer class="site"><div class="wrap cols"><div><div class="logo" style="color:#fff">Beyzoo Ventures LLP</div><p>Demo storefront. Products, prices and business details are sample data.</p></div>
 <div><h4>Shop</h4>${dd}</div><div><h4>Business</h4>${L([['Wholesale','wholesale.html'],['Export Enquiries','export-enquiry.html'],['RFQ','rfq.html'],['Private Label','private-label.html']])}</div>
 <div><h4>Help</h4>${L([['FAQ','faq.html'],['Shipping','shipping-policy.html'],['Returns','return-policy.html'],['Admin demo','admin/index.html']])}</div></div><div class="copy">Demo build. Payments, shipping and accounts are simulated.</div></footer>
 <a class="wa" href="${wa('Hello, I have an enquiry (demo number).')}" target="_blank" rel="noopener">WhatsApp</a>`;
 const b=$('.burger');b.addEventListener('click',()=>{const o=$('nav.main').classList.toggle('open');b.setAttribute('aria-expanded',o)});
}
document.addEventListener('click',e=>{const w=e.target.closest('[data-wish]');if(w)Store.toggleWish(w.dataset.wish);
 const q=e.target.closest('[data-quick]');if(q){const p=PRODUCTS.find(x=>x.id===q.dataset.quick);if(p.sizes.length>1)location.href=ROOT+'product.html?id='+p.id;else{Store.add({id:p.id,color:p.colors[0],size:p.sizes[0],qty:1});q.textContent='Added'}}});
document.addEventListener('error',e=>{const i=e.target;if(i.tagName==='IMG'&&i.dataset.tone){const d=document.createElement('div');d.className='ph';d.style.background=`linear-gradient(160deg,${i.dataset.tone},#101010)`;d.textContent=i.dataset.label;i.replaceWith(d)}},true); // graceful image fallback
function observe(){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}));$$('.reveal:not(.in)').forEach(el=>io.observe(el))}
function paintGrid(sel,list){const g=$(sel);if(g){g.innerHTML=list.map(card).join('');Store.badges();observe()}}
renderChrome();Store.badges();observe();

/* Search interface + suggestions */
$('#sbtn').addEventListener('click',()=>{const b=$('#sbar');b.hidden=!b.hidden;if(!b.hidden)$('#sq').focus()});
$('#sq').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();$('#sugg').innerHTML=q?PRODUCTS.filter(p=>p.name.toLowerCase().includes(q)).slice(0,5).map(p=>`<a href="${ROOT}product.html?id=${p.id}">${p.name} <small>${inr(p.price)}</small></a>`).join('')||'<span>No matches</span>':''});
/* Shared cart maths: used by cart, checkout, confirmation so they always agree */
function cartLines(){return Store.cart().map(l=>({l,p:PRODUCTS.find(p=>p.id===l.id)})).filter(x=>x.p)}
function totals(method){const L=cartLines(),sub=L.reduce((a,x)=>a+x.p.price*x.l.qty,0),code=ls.get('nc_coupon',''),disc=Math.round(sub*(COUPONS[code]||0));
 const ship=!L.length?0:method==='express'?450:(sub-disc>=FREE_SHIP_OVER?0:SHIP_FLAT),gst=Math.round((sub-disc)-(sub-disc)/1.18);return{L,sub,code,disc,ship,gst,total:sub-disc+ship}}
