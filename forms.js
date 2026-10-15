/* Demo forms: validation + success message. Nothing is sent anywhere. */
function validateForm(f){let ok=true;$$('.f',f).forEach(w=>{const i=$('input,select,textarea',w),e=$('.err',w);if(!i)return;let m='';const v=i.value.trim();
 if(i.dataset.req&&!v)m='This field is required.';else if(v&&i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))m='Enter a valid email address.';
 else if(v&&i.dataset.t==='pin'&&!/^[1-9][0-9]{5}$/.test(v))m='Enter a valid 6-digit PIN code.';else if(v&&i.dataset.t==='tel'&&!/^[+0-9 ()-]{7,16}$/.test(v))m='Enter a valid phone number.';
 e.textContent=m;i.setAttribute('aria-invalid',!!m);if(m)ok=false});const bad=$('[aria-invalid="true"]',f);if(bad)bad.focus();return ok}
$$('form[data-demo]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();if(!validateForm(f))return;f.innerHTML=`<div class="success"><h3>${f.dataset.ok||'Thank you'}</h3><p>This is a demo form: your details were not sent or stored. A real backend or email service is needed to receive enquiries.</p><a class="btn" href="index.html">Back to home</a></div>`}));
