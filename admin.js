/* Admin DEMO: data lives in this browser's localStorage. NOT secure; real auth + database needed for production. */
const SEED={products:PRODUCTS.map(p=>({name:p.name,sku:p.sku,price:p.price,wholesale:p.wholesale,stock:p.stock})),
 categories:CATEGORIES.map(c=>({name:c.name,slug:c.slug})),orders:[['NC10021','Aisha K.',7499,'Pending'],['NC10022','Ravi M.',3498,'Shipped'],['NC10023','Sara L.',1999,'Delivered'],['NC10024','Omar H.',5999,'Pending']].map(r=>({id:r[0],customer:r[1],total:r[2],status:r[3]})),
 customers:[['Aisha K.','aisha@example.com','Dubai'],['Ravi M.','ravi@example.com','Hyderabad'],['Sara L.','sara@example.com','Mumbai']].map(r=>({name:r[0],email:r[1],city:r[2]})),
 enquiries:[['Wholesale','Al Noor Trading','Dubai','500 pcs'],['Export','Gulf Retail LLC','UAE','1200 pcs'],['RFQ','Boutique Hub','India','300 pcs']].map(r=>({type:r[0],company:r[1],country:r[2],qty:r[3]})),
 coupons:[{code:'NOOR10',percent:10},{code:'WELCOME15',percent:15}],content:[{section:'Announcement',text:'Discover Our New Collection'},{section:'Hero headline',text:'Elegance Designed for Every Market.'}]};
const OPTS={status:['Pending','Shipped','Delivered','Cancelled']};
const key=document.body.dataset.admin,K='adm_'+key;let rows=ls.get(K,SEED[key]);const cols=Object.keys(SEED[key][0]);
const save=()=>{ls.set(K,rows);draw()};
function cell(v,c,i){return OPTS[c]?`<select data-i="${i}" data-c="${c}">${OPTS[c].map(o=>`<option ${o===v?'selected':''}>${o}</option>`).join('')}</select>`:`<input data-i="${i}" data-c="${c}" value="${String(v).replace(/"/g,'&quot;')}" ${typeof SEED[key][0][c]==='number'?'type="number"':''}>`}
function draw(){$('#adm').innerHTML=`<form id="addf" class="addf">${cols.map(c=>`<input name="${c}" placeholder="${c}" required>`).join('')}<button class="btn">Add</button></form><div class="tblwrap"><table><tr>${cols.map(c=>`<th>${c}</th>`).join('')}<th></th></tr>${rows.map((r,i)=>`<tr>${cols.map(c=>`<td>${cell(r[c],c,i)}</td>`).join('')}<td><button class="opt" data-del="${i}">Delete</button></td></tr>`).join('')}</table></div>`;
 if($('#kpi')&&key==='orders')$('#kpi').innerHTML=''}
$('#adm').addEventListener('change',e=>{const t=e.target;if(t.dataset.c){const v=typeof SEED[key][0][t.dataset.c]==='number'?+t.value:t.value;rows[t.dataset.i][t.dataset.c]=v;ls.set(K,rows)}});
$('#adm').addEventListener('click',e=>{if(e.target.dataset.del){rows.splice(+e.target.dataset.del,1);save()}});
$('#adm').addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));cols.forEach(c=>{if(typeof SEED[key][0][c]==='number')d[c]=+d[c]});rows.unshift(d);save()});draw();
