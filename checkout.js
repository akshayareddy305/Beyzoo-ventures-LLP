/* Checkout: summary comes from real cart data. Simulated order only; no payment is taken. */
const form=$('#co'),meth=()=>($('input[name=ship]:checked')||{}).value||'std';
function summary(){const T=totals(meth());$('#items').innerHTML=T.L.map(({l,p})=>`<div class="srow"><div class="thumb s">${media(p.image,p.name,catOf(p.cat).tone,'')}<b class="cnt">${l.qty}</b></div><div><b>${p.name}</b><br><small>${l.color} · ${l.size} · ${inr(p.price)} each</small></div><span>${inr(p.price*l.qty)}</span></div>`).join('');
 $('#tots').innerHTML=`<p><span>Subtotal</span>${inr(T.sub)}</p>${T.disc?`<p><span>Discount (${T.code})</span>−${inr(T.disc)}</p>`:''}<p><span>Shipping</span>${T.ship?inr(T.ship):'Free'}</p><p class="note"><span>Includes GST (18%, demo)</span>${inr(T.gst)}</p><p class="tot"><span>Total</span>${inr(T.total)}</p>`;return T}
if(!cartLines().length){$('#wrap').innerHTML='<div class="empty-state"><h2>Your bag is empty</h2><p>Add something beautiful before checking out.</p><a class="btn" href="shop.html">Continue Shopping</a></div>'}else{
 summary();$$('input[name=ship]').forEach(r=>r.addEventListener('change',summary));
 $('#bill').addEventListener('change',e=>$('#billbox').hidden=e.target.checked);
 $('#capply').addEventListener('click',()=>{const k=$('#ccode').value.trim().toUpperCase();ls.set('nc_coupon',COUPONS[k]?k:'');summary();$('#cm').textContent=COUPONS[k]?'Coupon applied.':'Invalid demo coupon.'});
 form.addEventListener('submit',e=>{e.preventDefault();if(!validateForm(form))return;const T=summary(),d=Object.fromEntries(new FormData(form));
  const o={id:'NC'+Date.now().toString().slice(-8),date:new Date().toISOString(),name:d.name,email:d.email,city:d.city,state:d.state,pin:d.pin,ship:meth(),pay:d.pay,status:'Demo order placed',total:T.total,sub:T.sub,disc:T.disc,shipc:T.ship,gst:T.gst,items:T.L.map(({l,p})=>({id:p.id,name:p.name,sku:p.sku,image:p.image,color:l.color,size:l.size,qty:l.qty,price:p.price}))};
  ls.set('nc_last_order',o);ls.set('nc_orders',[o,...ls.get('nc_orders',[])]);ls.set('nc_cart',[]);ls.set('nc_coupon','');location.href='order-confirmation.html'})}
