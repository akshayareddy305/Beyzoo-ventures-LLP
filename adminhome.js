const O=ls.get('adm_orders',[{id:'NC10021',customer:'Aisha K.',total:7499,status:'Pending'},{id:'NC10022',customer:'Ravi M.',total:3498,status:'Shipped'},{id:'NC10023',customer:'Sara L.',total:1999,status:'Delivered'},{id:'NC10024',customer:'Omar H.',total:5999,status:'Pending'}]);
const P=ls.get('adm_products',PRODUCTS);const k=(l,v)=>`<div><small>${l}</small><b>${v}</b></div>`;
$('#kpi').innerHTML=k('Orders',O.length)+k('Sales',inr(O.reduce((a,o)=>a+o.total,0)))+k('Pending',O.filter(o=>o.status==='Pending').length)+k('Low stock',P.filter(p=>p.stock<5).length);
$('#bars').innerHTML=[40,55,48,70,62,90].map(h=>`<i style="height:${h}%"></i>`).join('');
$('#recent').innerHTML='<table><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr>'+O.map(o=>`<tr><td>${o.id}</td><td>${o.customer}</td><td>${inr(o.total)}</td><td>${o.status}</td></tr>`).join('')+'</table>';
