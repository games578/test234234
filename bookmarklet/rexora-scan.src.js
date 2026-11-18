(()=>{
const ID='rexora-pro-host',old=document.getElementById(ID);
if(old){old._stop();return}
const host=document.createElement('div');host.id=ID;
host.style.cssText='all:initial;position:fixed;top:16px;right:16px;z-index:2147483647';
const root=host.attachShadow({mode:'open'});
root.innerHTML=`<style>
*{box-sizing:border-box;font-family:Inter,system-ui,Segoe UI,sans-serif}
.p{width:400px;color:#e7f3ea;background:linear-gradient(160deg,#101a14,#080c0a);border:1px solid #24352b;border-radius:20px;box-shadow:0 20px 60px #000c;overflow:hidden}
.h{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #1d2b23}
.lg{width:40px;height:40px;border-radius:10px}.t{flex:1;line-height:1.2}.t b{display:block;font-size:15px}.t i{font:600 10px monospace;letter-spacing:.12em;color:#5dff2e;font-style:normal}
button{cursor:pointer;color:#e7f3ea;background:#0d1511;border:1px solid #24352b;border-radius:10px;padding:8px 12px;font-weight:600;font-size:13px}
button:hover:not(:disabled){border-color:#5dff2e}button:disabled{opacity:.55;cursor:not-allowed}
.ic{width:32px;height:32px;border-radius:50%;padding:0}
.b{padding:14px}.card{border:1px solid #24352b;border-radius:16px;background:#0c130f;overflow:hidden}
.top{display:flex;gap:12px;align-items:center;padding:14px}.top img{width:48px;height:48px;border-radius:12px;background:#16221b;object-fit:cover}
.top>div{flex:1;min-width:0}h2{margin:0;font-size:20px}.ca{font:12px monospace;color:#7a9184;margin-top:4px}.ca button{padding:0 4px;border:0;background:none;color:#7a9184}
.risk{font:700 10px monospace;letter-spacing:.08em;padding:4px 8px;border-radius:99px;border:1px solid}
.LOW{color:#5dff2e}.MEDIUM{color:#fbbf24}.HIGH{color:#fb7185}
.mc{text-align:center;padding:22px 0}small{font:600 10px monospace;letter-spacing:.14em;color:#7a9184}.mc strong{display:block;font-size:26px;margin-top:8px}
.z{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid #24352b}.z div{padding:12px 14px}.z div+div{border-left:1px solid #24352b}.z b{display:block;margin-top:6px;font-size:16px}
.g{color:#5dff2e}.r{color:#fb7185}
.s{margin:12px 2px 0;display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;font-size:12px}.s span{color:#7a9184}.s b{float:right;font-weight:600}
.f{margin:10px 2px 0;font-size:12px;color:#b4c9ba;line-height:1.6}.f div:before{content:"• ";color:#fbbf24}.f .ok:before{color:#5dff2e}
.bt{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.bt button{padding:14px}.buy{background:#5dff2e;color:#052e16}.sell{background:#2a1215;color:#fb7185;border-color:#5a2128}
.n{margin-top:10px;font-size:10px;color:#5b6e63;text-align:center}
.p{position:relative;transform-origin:top right}
.tw{position:relative}#tool{display:flex;gap:8px;align-items:center;background:#0f1d15}
.menu{position:absolute;left:14px;right:14px;top:68px;z-index:5;background:#0b120e;border:1px solid #24352b;border-radius:18px;padding:10px;box-shadow:0 20px 50px #000}
.menu[hidden],[hidden]{display:none!important}
.mi{display:flex;gap:12px;align-items:center;width:100%;text-align:left;border:0;background:none;padding:9px;border-radius:12px}
.mi.on{background:#143020}.mi i{width:36px;height:36px;border-radius:10px;border:1px solid #24352b;display:grid;place-items:center;font-style:normal;flex:none}
.mi div{flex:1}.mi b{display:block;font-size:14px}.mi span{font-size:12px;color:#7a9184}
.pnl{text-align:center;padding:18px 0 8px}.pnl strong{display:block;font-size:44px;font-weight:800;margin:6px 0}
.up{color:#5dff2e;text-shadow:0 0 18px #5dff2e66}.dn{color:#fb7185}
.in{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 12px}.in label{display:block;text-align:center;font:700 10px monospace;letter-spacing:.14em;color:#b4c9ba}
.in input{width:100%;margin-top:8px;padding:12px;text-align:center;background:#070b09;border:1px solid #24352b;border-radius:12px;color:#fff;font-weight:700;font-size:15px}
.rk{padding:14px 14px 16px}.rk div{display:flex;justify-content:space-between;font:700 10px monospace;letter-spacing:.14em;color:#7a9184;margin-bottom:6px}.rk b{font-size:15px}
input[type=range]{width:100%;accent-color:#5dff2e}
.seg{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:6px}.seg button.on{background:#5dff2e;color:#052e16;border-color:#5dff2e}
.tape{margin-top:12px;border:1px solid #24352b;border-radius:16px;background:#0c130f;height:170px;overflow:auto}
.tape .e{display:flex;justify-content:center;align-items:center;height:100%;color:#7a9184;font-weight:600}
.fl{display:grid;grid-template-columns:44px 1fr auto;gap:8px;padding:9px 12px;border-bottom:1px solid #16221b;font-size:12px}.compact .fl{padding:3px 12px;font-size:11px}
.go{width:100%;margin-top:12px;padding:16px;background:#5dff2e;color:#052e16;font-size:14px}.go.stop{background:#2a1215;color:#fb7185;border-color:#5a2128}
.row{display:flex;justify-content:space-between;align-items:center;padding:16px;border:1px solid #24352b;border-radius:14px;background:#0c130f;margin-bottom:10px;font-size:14px;font-weight:600}
.row.col{display:block}.rt{display:flex;justify-content:space-between;margin-bottom:12px}.rv{font:600 12px monospace;color:#5dff2e}
.sw{width:46px;height:26px;border-radius:99px;padding:0;position:relative;background:#2a3a31}.sw.on{background:#5dff2e}.sw:after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#cfd8d2;transition:.15s}.sw.on:after{left:23px;background:#052e16}
.vs{max-height:min(680px,calc(100vh - 110px));overflow:auto}.warn{font-size:11px;color:#fbbf24;margin-top:8px;text-align:center;min-height:14px}
.noav .top img{display:none}
.soon{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:400px;text-align:center}.soon img{width:48px;height:48px;border-radius:12px;padding:6px;background:#0c130f;box-shadow:0 0 30px #5dff2e33}.soon h2{margin:18px 0 8px;font-size:22px}.soon p{margin:0;color:#7a9184;font-size:13px}.pill{margin-top:20px;padding:6px 12px;border:1px solid #1f5a33;background:#0e2a1a;color:#5dff2e;border-radius:99px;font:700 10px monospace;letter-spacing:.12em}
.lk{color:#5dff2e;text-decoration:none;font-size:14px}.lk:hover{text-decoration:underline}
.xb{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.xb .w{grid-column:1/-1;padding:14px}
.tw2{padding:9px 12px;border-bottom:1px solid #16221b;font-size:12px;line-height:1.45;word-break:break-word}.tw2 small{display:block;margin-bottom:3px}
.txt{width:100%;padding:10px 12px;background:#070b09;border:1px solid #24352b;border-radius:10px;color:#fff;font-size:13px}
</style>
<div class=p><div class=h><img class=lg src="__LOGO__"><div class=t><b>Rexora Pro</b><i>SMART TOOLS</i></div>
<div class=tw><button id=tool><span id=ti>⌖</span><span id=tn>Scan</span><span>▾</span></button></div><button class=ic id=min>–</button><button class=ic id=x>✕</button></div>
<div id=menu class=menu hidden></div><div class="b vs" id=body><div id=v-scan><div class=card><div class=top><img id=ico alt=""><div><h2 id=sym>—</h2><div class=ca>CA: <span id=ca>—</span><button id=cp title=Copy>⧉</button></div></div><span id=risk class=risk></span></div>
<div class=mc><small>MARKET CAP</small><strong id=mc>—</strong></div>
<div class=z><div><small class=g>● BUY ZONE</small><b id=bz>N/A</b></div><div><small class=r>● SELL ZONE</small><b id=sz>N/A</b></div></div></div>
<div class=s id=st></div><div class=f id=fl></div>
<div class=bt><button class=buy disabled>AI Buy</button><button class=sell disabled>AI Sell</button><button disabled>Start Scalping</button><button disabled>Start Sniper</button></div>
<div class=n>Zones are estimates from recent price swings. Not financial advice.</div></div><div id=v-ai hidden><div class=card><div class=pnl><small>SESSION PNL</small><strong id=pnl class=up>$0.00</strong><small id=tk></small></div>
<div class=in><div><label>MIN $</label><input id=mn type=number min=1></div><div><label>MAX $</label><input id=mx type=number min=1></div></div>
<div class=rk><div><span>RISK</span><b id=rv></b></div><input id=rs type=range min=0 max=100></div></div>
<div class=seg style="margin-top:12px"><button id=mp>Paper</button><button id=mr>Real money</button></div>
<div class=tape id=tape></div><button class=go id=go>Start AI Trader</button><div class=warn id=aw></div></div>
<div id=v-set hidden><small class=g style="display:block;margin:0 2px 10px">WORKSPACE</small>
<div class="row col"><div class=rt><span>Opacity</span><span class=rv id=ov></span></div><input type=range id=op min=40 max=100></div>
<div class="row col"><div class=rt><span>Window size</span><span class=rv id=wv></span></div><input type=range id=ws min=70 max=130></div>
<div class=row><span>Sound alerts</span><button class=sw data-k=sound></button></div>
<div class="row col"><div class=rt><span>Refresh period</span><span class=rv id=rf></span></div><div class=seg id=rp><button data-v=100>100 ms</button><button data-v=500>500 ms</button><button data-v=1000>1 sec</button></div></div>
<div class=row><span>Confirm trades</span><button class=sw data-k=confirm></button></div>
<div class=row><span>Token avatars</span><button class=sw data-k=avatars></button></div>
<div class=row><span>Compact tape</span><button class=sw data-k=compact></button></div>
<div class=row><span>Session autosave</span><button class=sw data-k=autosave></button></div>
<div class="row col"><div class=rt><span>X proxy URL</span></div><input class=txt id=xp placeholder="http://localhost:8787" spellcheck=false></div>
<div class=n>Settings are saved in this browser.</div></div>
<div id=v-x hidden><div class=card><div class=top><div><h2 id=xs>—</h2><div class=ca id=xa></div></div></div>
<div class=z><div><small>X ACCOUNT</small><b id=xacc>—</b></div><div><small>WEBSITE</small><b id=xweb>—</b></div></div></div>
<div class=xb><button id=xca>Search CA on X</button><button id=xsy>Search ticker on X</button><button id=xr class="buy w">Load recent mentions</button></div>
<div class=s id=xm></div><div class=f id=xf></div><div class=tape id=xt hidden></div><div class=warn id=xw></div>
<div class=n>Mentions use your X API credits, so they only load when you press the button.</div></div>
<div id=v-soon hidden><div class=soon><img id=sl alt=""><h2 id=sn></h2><p>This module is not live yet.</p><span class=pill>SOON</span></div></div></div></div>`;
document.documentElement.appendChild(host);
const $=s=>root.querySelector(s);
const fm=n=>n==null||!isFinite(n)?'—':n>=1e9?'$'+(n/1e9).toFixed(2)+'B':n>=1e6?'$'+(n/1e6).toFixed(2)+'M':n>=1e3?'$'+(n/1e3).toFixed(1)+'K':'$'+n.toFixed(2);
const pc=n=>n==null?'—':(n>0?'+':'')+n.toFixed(1)+'%';
const age=t=>{if(!t)return'—';const m=(Date.now()-t)/6e4;return m<60?Math.round(m)+'m':m<1440?(m/60).toFixed(1)+'h':Math.round(m/1440)+'d'};
const CH={solana:'solana',sol:'solana',eth:'ethereum',ethereum:'ethereum',bsc:'bsc',base:'base'};
function parse(){const s=location.pathname.split('/').filter(Boolean),i=s.indexOf('trade'),g=i>=0?s.slice(i+1):s;
 return{chain:CH[(g[0]||'').toLowerCase()],addr:g.find(x=>x.length>=32&&/^[A-Za-z0-9]+$/.test(x))||g[g.length-1]}}
async function j(u){const c=new AbortController,t=setTimeout(()=>c.abort(),8000);try{const r=await fetch(u,{signal:c.signal});if(!r.ok)throw Error('HTTP '+r.status);return await r.json()}finally{clearTimeout(t)}}
async function find({chain,addr}){const A='https://api.dexscreener.com/';let p=[];
 if(chain){p=await j(`${A}tokens/v1/${chain}/${addr}`).catch(()=>[]);if(!p.length)p=(await j(`${A}latest/dex/pairs/${chain}/${addr}`).catch(()=>({}))).pairs||[]}
 if(!p.length)p=(await j(`${A}latest/dex/search?q=${encodeURIComponent(addr)}`)).pairs||[];
 return p.sort((a,b)=>(b.liquidity?.usd||0)-(a.liquidity?.usd||0))[0]}
function zones(p){const c=p.priceChange||{},pr=+p.priceUsd,mc=p.marketCap||p.fdv;if(!pr||!mc)return null;
 const v=[pr];for(const k of['m5','h1','h6','h24'])if(isFinite(c[k])&&c[k]>-99)v.push(pr/(1+c[k]/100));
 const lo=Math.min(...v),hi=Math.max(...v),R=hi-lo;if(R/pr<.02)return null;const k=mc/pr;
 return{buy:[lo*k,(lo+.382*R)*k],sell:[(lo+.786*R)*k,(hi+.272*R)*k]}}
function risk(p){const f=[],c=p.priceChange||{},l=p.liquidity?.usd||0,mc=p.marketCap||p.fdv||0,t=p.txns?.h1||{};let r=0;
 const add=(n,s)=>{r+=n;f.push(s)};
 if(l<5e3)add(3,'Very low liquidity');else if(l<25e3)add(2,'Low liquidity');
 if(mc&&l/mc<.02)add(2,'Thin liquidity vs market cap');
 if(p.pairCreatedAt&&Date.now()-p.pairCreatedAt<36e5)add(1,'Brand new pair (<1h old)');
 if(c.h24<-60)add(2,'Down over 60% in 24h');if(c.h1<-30)add(1,'Dumping: down over 30% in 1h');
 if(t.sells>t.buys*1.5&&t.buys+t.sells>20)add(1,'Heavy sell pressure (1h)');
 if(c.h24>1000)add(1,'Parabolic 24h move');
 return{lvl:r>=5?'HIGH':r>=2?'MEDIUM':'LOW',f}}
const set=(id,t)=>$(id).textContent=t;
const rng=z=>z?fm(z[0])+' – '+fm(z[1]):'N/A';
function msg(t){const d=document.createElement('div');d.textContent=t;$('#fl').replaceChildren(d)}
let cur='',busy=0;
async function scan(){if(busy)return;busy=1;cur=location.pathname;const q=parse();
 try{if(!q.addr){msg('Open a token chart on the terminal, then press Scan.');return}
  set('#sym','Scanning…');$('#fl').replaceChildren();
  const p=await find(q);if(!p){set('#sym','Not found');msg('No market data found for this token yet.');return}
  const b=p.baseToken||{};set('#sym','$'+(b.symbol||'?'));set('#ca',b.address?b.address.slice(0,6)+'……'+b.address.slice(-4):'—');$('#cp').onclick=()=>navigator.clipboard?.writeText(b.address||'');
  const u=p.info?.imageUrl,L=((b.symbol||'?')[0]||'?').toUpperCase().replace(/[^A-Z0-9]/,'?'),fb=()=>{$('#ico').src='data:image/svg+xml,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect width='48' height='48' rx='12' fill='#16221b'/><text x='24' y='32' font-size='22' font-family='sans-serif' font-weight='700' text-anchor='middle' fill='#5dff2e'>${L}</text></svg>`)};$('#ico').onerror=fb;/^https:\/\//.test(u||'')?$('#ico').src=u:fb();
  set('#mc',fm(p.marketCap||p.fdv));const z=zones(p);set('#bz',rng(z?.buy));set('#sz',rng(z?.sell));
  const r=risk(p),e=$('#risk');e.className='risk '+r.lvl;e.textContent=r.lvl+' RISK';
  const t=p.txns?.h1||{},c=p.priceChange||{};
  $('#st').replaceChildren(...[['Liquidity',fm(p.liquidity?.usd)],['Vol 24h',fm(p.volume?.h24)],['1h',pc(c.h1)],['24h',pc(c.h24)],['Buys / Sells 1h',(t.buys??'—')+' / '+(t.sells??'—')],['Age',age(p.pairCreatedAt)]].map(([a,v])=>{const d=document.createElement('div'),s=document.createElement('span'),x=document.createElement('b');s.textContent=a;x.textContent=v;d.append(s,x);return d}));
  $('#fl').replaceChildren(...(r.f.length?r.f:['No major red flags in market data']).map(s=>{const d=document.createElement('div');d.textContent=s;if(!r.f.length)d.className='ok';return d}));
 }catch(e){set('#sym','Scan failed');msg(String(e.message||e)+' (the site may be blocking requests to the data API)')}finally{busy=0}}
$('#x').onclick=()=>host._stop();$('#min').onclick=()=>{const b=$('#body');b.style.display=b.style.display==='none'?'':'none'};
const iv=setInterval(()=>{if(view==='scan'&&location.pathname!==cur)scan()},1500);
host._stop=()=>{clearInterval(iv);host.remove()};
const D={opacity:100,size:100,sound:false,refresh:500,confirm:true,avatars:true,compact:false,autosave:true,min:20,max:120,risk:32,mode:'paper',xproxy:'http://localhost:8787'};
const LS={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const S=Object.assign({},D,LS.get('rexora:settings')||{}),save=()=>LS.set('rexora:settings',S),P=$('.p');
const all=s=>[...root.querySelectorAll(s)];
function applyS(){host.style.opacity=S.opacity/100;P.style.transform=`scale(${S.size/100})`;P.classList.toggle('noav',!S.avatars);P.classList.toggle('compact',S.compact);
 set('#ov',S.opacity+'%');set('#wv',S.size+'%');set('#rf',S.refresh>=1000?'1 sec':S.refresh+' ms');
 all('.sw').forEach(b=>b.classList.toggle('on',!!S[b.dataset.k]));all('#rp button').forEach(b=>b.classList.toggle('on',+b.dataset.v===S.refresh));
 $('#op').value=S.opacity;$('#ws').value=S.size;$('#mn').value=S.min;$('#mx').value=S.max;$('#rs').value=S.risk;
 set('#rv',S.risk);$('#rv').style.color=`hsl(${Math.max(0,120-S.risk*1.2)},80%,55%)`;
 $('#mp').className=S.mode==='paper'?'on':'';$('#mr').className=S.mode==='real'?'on':''}
function beep(){if(!S.sound)return;try{const a=new AudioContext,o=a.createOscillator();o.connect(a.destination);o.frequency.value=880;o.start();o.stop(a.currentTime+.12)}catch(e){}}
$('#op').oninput=e=>{S.opacity=+e.target.value;applyS();save()};$('#ws').oninput=e=>{S.size=+e.target.value;applyS();save()};
all('.sw').forEach(b=>b.onclick=()=>{S[b.dataset.k]=!S[b.dataset.k];applyS();save();beep()});
all('#rp button').forEach(b=>b.onclick=()=>{S.refresh=+b.dataset.v;applyS();save();if(T.on)timer()});
$('#mn').oninput=e=>{S.min=+e.target.value;save()};$('#mx').oninput=e=>{S.max=+e.target.value;save()};$('#rs').oninput=e=>{S.risk=+e.target.value;applyS();save()};
const TOOLS=[['scan','⌖','Scan','AI Token Analysis'],['ai','↗','AI Trader','Trade Tokens Automatically With Rexora AI'],['alerts','🔔','Alerts','Live market signals'],['x','✕','X Tracker','Social flow from X'],['fomo','🔥','Fomo Tracker','Crowd heat & rushes'],['radar','◎','Rexora Radar','Live token radar'],['set','⚙','Settings','Workspace preferences']];
const VIEW={scan:'#v-scan',ai:'#v-ai',set:'#v-set',x:'#v-x',soon:'#v-soon'};let view='scan';
function menu(){const m=$('#menu');m.innerHTML=TOOLS.map(([id,ic,n,d])=>`<button class="mi${id===view?' on':''}" data-id=${id}><i>${ic}</i><div><b>${n}</b><span>${d}</span></div>${id===view?'<span>✓</span>':''}</button>`).join('');
 all('.mi').forEach(b=>b.onclick=()=>show(b.dataset.id))}
function show(id){view=id;const t=TOOLS.find(x=>x[0]===id),k=VIEW[id]?id:'soon';set('#ti',t[1]);set('#tn',t[2]);
 for(const[n,v]of Object.entries(VIEW))$(v).hidden=n!==k;if(k==='soon')set('#sn',t[2]);$('#sl').src=$('.lg').src;$('#menu').hidden=true;menu();if(id==='scan')scan();if(id==='x')xrun()}
$('#tool').onclick=()=>{menu();$('#menu').hidden=!$('#menu').hidden};
// ---- AI Trader (paper engine; real execution intentionally not connected)
const sess=S.autosave?LS.get('rexora:session'):null;
const T={on:false,pos:null,realized:sess?.realized||0,fills:sess?.fills||[],pair:null,tm:null,px:0,mc:0,sym:'',cool:0,busy:0};
const usd=n=>(n<0?'-':'')+'$'+Math.abs(n).toFixed(2),el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const aw=t=>set('#aw',t),saveSess=()=>{if(S.autosave)LS.set('rexora:session',{fills:T.fills.slice(0,100),realized:T.realized})};
function renderAI(){const u=T.pos&&T.px?T.pos.qty*T.px*.99-T.pos.usd:0,tot=T.realized+u,e=$('#pnl');
 e.textContent=(tot>0?'+':'')+usd(tot);e.className=tot>=0?'up':'dn';
 $('#tape').replaceChildren(...(T.fills.length?T.fills.map(f=>{const r=el('div','fl'),b=el('b',f.side==='BUY'?'g':'r',f.side);
  r.append(b,el('span','',`${usd(f.usd)} · $${f.sym} · ${fm(f.mc)}${f.why?' · '+f.why:''}`),el('span',f.pnl>=0?'g':'r',f.pnl==null?new Date(f.t).toLocaleTimeString():(f.pnl>0?'+':'')+usd(f.pnl)));return r}):[el('div','e','No fills yet')]))}
function fill(side,u,mc,pnl,why){T.fills.unshift({t:Date.now(),side,usd:u,mc,sym:T.sym,pnl,why});T.fills=T.fills.slice(0,100);saveSess();beep()}
function openPos(px,mc){const u=S.min+(S.max-S.min)*S.risk/100,e=px*1.01;T.pos={usd:u,qty:u/e};fill('BUY',u,mc,null)}
function closePos(px,mc,why){const v=T.pos.qty*px*.99,pnl=v-T.pos.usd;T.realized+=pnl;fill('SELL',v,mc,pnl,why);T.pos=null;T.cool=Date.now()+2e4}
async function tick(){if(!T.on||T.busy)return;T.busy=1;try{
 const p=T.pair?(await j(`https://api.dexscreener.com/latest/dex/pairs/${T.pair.c}/${T.pair.a}`)).pairs?.[0]:await find(T.q);
 if(!p)throw Error('No price data');T.pair={c:p.chainId,a:p.pairAddress};T.sym=p.baseToken?.symbol||'?';set('#tk','PAPER · $'+T.sym);
 const px=+p.priceUsd,mc=p.marketCap||p.fdv,z=zones(p),r=risk(p);T.px=px;T.mc=mc;
 if(T.pos){const g=T.pos.qty*px*.99/T.pos.usd-1,tp=.08+S.risk/100*.32,sl=.06+S.risk/100*.14;
  if(g>=tp)closePos(px,mc,'TP');else if(g<=-sl)closePos(px,mc,'SL');else if(z&&mc>=z.sell[0])closePos(px,mc,'ZONE')}
 else if(Date.now()>T.cool&&z&&mc<=z.buy[1]&&mc>=z.buy[0]*.9&&r.lvl!=='HIGH')openPos(px,mc);
 renderAI();aw('')}catch(e){aw(String(e.message||e))}finally{T.busy=0}}
function timer(){clearInterval(T.tm);T.tm=setInterval(tick,Math.max(S.refresh,1000))}
function stopT(){clearInterval(T.tm);if(T.pos&&T.px)closePos(T.px,T.mc,'STOP');T.on=false;$('#go').textContent='Start AI Trader';$('#go').classList.remove('stop');renderAI()}
$('#go').onclick=()=>{if(T.on)return stopT();
 // REAL EXECUTION would plug in here. Until an executor exists, real mode never trades.
 if(S.mode==='real'){aw('Real-money execution is not connected yet, so nothing was traded. Switch to Paper.');return}
 const q=parse();if(!q.addr){aw('Open a token chart first.');return}
 if(!(S.min>0&&S.max>=S.min)){aw('Set MIN $ and MAX $ (max must be at least min).');return}
 T.q=q;T.pair=null;T.pos=null;T.on=true;$('#go').textContent='Stop AI Trader';$('#go').classList.add('stop');timer();tick()};
$('#mp').onclick=()=>{if(!T.on){S.mode='paper';applyS();save();aw('')}};
$('#mr').onclick=()=>{if(!T.on){S.mode='real';applyS();save();aw('Real money mode: execution is not connected yet, so Start will not trade.')}};
const _st=host._stop;host._stop=()=>{if(T.on)stopT();_st()};host._t={T,tick};
// ---- X Tracker
const XN=20;let xq=null,xbusy=0,xcur='';
const xw=t=>set('#xw',t),opn=u=>window.open(u,'_blank','noopener,noreferrer');
const ago=t=>{const m=(Date.now()-new Date(t))/6e4;return m<1?'just now':m<60?Math.round(m)+'m ago':m<1440?Math.round(m/60)+'h ago':Math.round(m/1440)+'d ago'};
function lnk(t,u){const a=el('a','lk',t);if(/^https:\/\//i.test(u||'')){a.href=u;a.target='_blank';a.rel='noopener noreferrer'}return a}
function handle(u){try{const g=new URL(u).pathname.split('/').filter(Boolean);return g[0]==='i'?'X community':'@'+g[0]}catch(e){return 'X'}}
async function xrun(){if(xbusy)return;xbusy=1;xcur=location.pathname;const q=parse();
 try{xw('');['#xm','#xf'].forEach(i=>$(i).replaceChildren());$('#xt').hidden=true;
  if(!q.addr){set('#xs','—');xw('Open a token chart first.');return}
  set('#xs','Loading…');const p=await find(q);if(!p){set('#xs','Not found');xq=null;return}
  const b=p.baseToken||{},sym=b.symbol||'?',tw=(p.info?.socials||[]).find(x=>x.type==='twitter'&&/^https:\/\/(x|twitter)\.com\//i.test(x.url)),web=(p.info?.websites||[])[0];
  xq={ca:b.address,sym};set('#xs','$'+sym);set('#xa',b.address?b.address.slice(0,6)+'……'+b.address.slice(-4):'');set('#xsy','Search $'+sym+' on X');
  $('#xacc').replaceChildren(tw?lnk(handle(tw.url),tw.url):document.createTextNode('None listed'));
  $('#xweb').replaceChildren(web?lnk(web.url.replace(/^https?:\/\/(www\.)?/,'').split('/')[0],web.url):document.createTextNode('None listed'));
 }catch(e){set('#xs','Error');xw(String(e.message||e))}finally{xbusy=0}}
async function xmentions(){if(!xq){xw('Open a token chart first.');return}
 const base=(S.xproxy||'').replace(/\/$/,'');if(!base){xw('Set your X proxy URL in Settings first.');return}
 xw('Loading mentions…');let d;
 try{const r=await fetch(base+'/search?n='+XN+'&q='+encodeURIComponent(`"${xq.ca}" OR "$${xq.sym}"`));d=await r.json();if(!r.ok){const er=Error(d.error||'HTTP '+r.status);er.srv=1;throw er}}
 catch(e){xw('X proxy: '+(e.message||e)+(e.srv?'':'. Is x-proxy/server.py running at '+base+'?'));return}
 xw('');const T=d.tweets||[],now=Date.now(),au=new Set(T.map(t=>t.author)).size,f=[];
 let rate='—';if(T.length>=2){const sp=(new Date(T[0].created_at)-new Date(T[T.length-1].created_at))/6e4;if(sp>.05)rate=((T.length-1)/sp).toFixed(1)+' / min'}
 const rows=[['Posts checked',T.length],['Posting rate',rate],['Newest',T.length?ago(T[0].created_at):'—'],['Oldest of '+T.length,T.length?ago(T[T.length-1].created_at):'—'],['Unique authors',au+' / '+T.length]];
 $('#xm').replaceChildren(...rows.map(([a,v])=>{const e=el('div'),x=el('b','',v);e.append(el('span','',a),x);return e}));
 if(!T.length)f.push('No recent mentions found');else{
  if(now-new Date(T[0].created_at)>36e5)f.push('Quiet: nothing posted in the last hour');
  if(T.length>=2&&parseFloat(rate)>=1)f.push('Active chatter right now');
  if(T.length>=10&&au<T.length/3)f.push('Many posts from few accounts (possible shilling)')}
 $('#xf').replaceChildren(...f.map(t=>el('div','',t)));
 const tp=$('#xt');tp.hidden=!T.length;tp.replaceChildren(...T.slice(0,10).map(t=>{const e=el('div','tw2'),h=el('small','',`@${t.author} · ${ago(t.created_at)} · ♥ ${t.likes}`);e.append(h,el('span','',String(t.text).slice(0,180)));return e}))}
$('#xca').onclick=()=>xq&&opn('https://x.com/search?q='+encodeURIComponent(xq.ca)+'&f=live');
$('#xsy').onclick=()=>xq&&opn('https://x.com/search?q='+encodeURIComponent('$'+xq.sym)+'&f=live');
$('#xr').onclick=xmentions;$('#xp').value=S.xproxy||'';$('#xp').oninput=e=>{S.xproxy=e.target.value.trim();save()};
const xiv=setInterval(()=>{if(view==='x'&&location.pathname!==xcur)xrun()},1500);
const _s2=host._stop;host._stop=()=>{clearInterval(xiv);_s2()};
applyS();renderAI();menu();
scan();
})();