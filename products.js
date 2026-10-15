/* Sample catalogue. Edit here. All data is DEMO. Wholesale price kept separate from retail. */
const CATEGORIES=[
{slug:'abayas',name:'Abayas & Arabic Maxis',tone:'#1c1a17',image:'assets/images/abaya.png'},
{slug:'nightwear',name:'Nightwear & Maxis',tone:'#6d5a4a',image:'assets/images/nightwear-maxi-model.webp'}, {slug:'footwear',name:'Footwear',tone:'#8a6b3f',image:'assets/images/footwear.svg'},
{slug:'cosmetics',name:'Cosmetics',tone:'#9a6a5a',image:'assets/images/cosmetics.svg'},
{slug:'fabrics',name:'Fabrics',tone:'#4b4a44',image:'assets/images/fabrics.svg'},
{slug:'baby',name:'Baby Products',tone:'#b9a98f',image:'assets/images/baby.svg'},
{slug:'newborn',name:'Newborn Gift Sets',tone:'#c9b8a0',image:'assets/images/newborn.svg'}];
const S=['S','M','L','XL'],AB=['52','54','56','58'],ONE=['One size'],SH=['37','38','39','40'],COL=['Black','Ivory','Champagne'];
// [name, category, price, compare price, sizes, badges]
const RAW=[
['Gold Embroidered Open Abaya','abayas',7499,8999,AB,['Bestseller']],['Burgundy Embroidered Open Abaya','abayas',5999,0,AB,['New']],['Burgundy Satin Slip Maxi','abayas',3499,0,AB,['New']],['Burgundy Floral-Embroidered Abaya','abayas',4299,4999,S,['Bestseller']],
['Satin Maxi Nightgown','nightwear',2299,0,S,['New']],['Cotton Modest Night Set','nightwear',1999,2499,S,['Bestseller']],['Lace-Trim Night Maxi','nightwear',2599,0,S,[]],['Velvet Robe and Gown Set','nightwear',3299,0,S,['New']],
['Nude Leather Stiletto Pump','footwear',3999,0,SH,['New']],['Pointed Toe Court Heel','footwear',2499,2999,SH,['Bestseller']],['Satin Nude Evening Heel','footwear',1799,0,SH,[]],['Classic Nude Pump','footwear',3299,0,SH,['New']],
['Oud Royal Eau de Parfum 50ml','cosmetics',2999,0,ONE,['Bestseller']],['Nude Pressed Powder Compact','cosmetics',1299,1599,ONE,[]],['Rose Silk Lip Set','cosmetics',1499,0,ONE,['New']],['Brush and Glow Essentials','cosmetics',899,0,ONE,[]],
['Printed Floral Jacquard 3m','fabrics',1899,0,ONE,['Bestseller']],['Floral Jacquard Remnant 2.5m','fabrics',2499,2899,ONE,['New']],['Floral Jacquard Roll 5m','fabrics',2199,0,ONE,[]],['Gold-Trim Floral Fabric 5m','fabrics',1599,0,ONE,[]],
['Organic Cotton Romper','baby',899,0,['0-3M','3-6M','6-12M'],['New']],['Muslin Swaddle Pair','baby',1199,1399,ONE,['Bestseller']],['Knit Bonnet and Booties','newborn',999,0,ONE,[]],['Newborn Welcome Gift Box','newborn',3499,3999,ONE,['Bestseller']]];
const PRODUCTS=RAW.map(([name,cat,price,compare,sizes,badges],i)=>({id:'product-'+String(i+1).padStart(3,'0'),slug:name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,''),name,cat,price,compare:compare||0,
wholesale:Math.round(price*.62),moq:cat==='fabrics'?20:12,sku:'NC-'+cat.slice(0,3).toUpperCase()+'-'+String(i+1).padStart(3,'0'),stock:[24,3,40,12,0,18,30,7][i%8],
desc:name+': sample copy for the demo. Replace with final description, fabric and care details.',colors:(cat==='cosmetics'||cat==='fabrics')?['Default']:COL,sizes,badges,
image:i===0?'assets/images/abaya.png':(i>=4&&i<=7)?'assets/images/nightwear-maxi-model.webp':i===12?'assets/images/cosmetics.svg':(i>=8&&i<=11)?'assets/images/footwear.svg':(i>=16&&i<=19)?'assets/images/fabrics.svg':(i>=20&&i<=21)?'assets/images/baby.svg':(i>=22)?'assets/images/newborn.svg':'assets/images/products/product-'+String(i+1).padStart(3,'0')+'.svg',order:i}));
const COUPONS={NOOR10:.10,WELCOME15:.15},FREE_SHIP_OVER=5000,SHIP_FLAT=250; // demo rules, not real rates

/* Real photography (overrides category/product image paths set above). Edit paths here. */
const CAT_PHOTOS={footwear:'assets/images/cat-footwear.webp',cosmetics:'assets/images/cat-cosmetics.webp',fabrics:'assets/images/cat-fabrics.webp',baby:'assets/images/cat-baby.webp',newborn:'assets/images/cat-newborn.webp'};
CATEGORIES.forEach(c=>{if(CAT_PHOTOS[c.slug])c.image=CAT_PHOTOS[c.slug]});
["002","003","004","009","010","011","012","013","014","015","016","017","018","019","020","021","022","023","024"].forEach(n=>{const p=PRODUCTS.find(x=>x.id==='product-'+n);if(p)p.image='assets/images/products/photo-product-'+n+'.webp'});
