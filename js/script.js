const $=s=>document.querySelector(s);
const S={n:30,e:30,q:30,i:0,ok:0};
const SIT=[
{t:"💨 Poluição do ar",d:"Os sensores da cidade detectaram um aumento na poluição.",o:["Aumentar o número de carros.","Usar IA para analisar o trânsito e reduzir congestionamentos.","Ignorar os sensores."],c:1,g:{q:22,e:6,n:6},x:"A IA analisa dados de trânsito em tempo real e ajusta semáforos e rotas, reduzindo filas e emissões."},
{t:"💧 Desperdício de água",d:"A cidade está desperdiçando milhares de litros de água.",o:["Aumentar o consumo.","Desligar os sensores.","Usar sensores e IA para detectar vazamentos."],c:2,g:{q:20,n:8,e:4},x:"Sensores e IA identificam padrões de vazamento antes que virem grandes perdas."},
{t:"🌳 Desmatamento",d:"Uma área de floresta está sendo destruída rapidamente.",o:["Utilizar IA para analisar imagens de satélite e identificar áreas de desmatamento.","Remover ainda mais árvores.","Não monitorar a região."],c:0,g:{n:24,q:8,e:4},x:"Modelos de visão computacional comparam imagens de satélite e apontam desmatamento quase em tempo real."},
{t:"⚡ Energia",d:"O consumo de energia da cidade aumentou muito.",o:["Deixar todas as luzes ligadas.","Aumentar o desperdício.","Utilizar IA para otimizar o consumo energético."],c:2,g:{e:26,q:8,n:6},x:"A IA prevê a demanda e distribui energia melhor, integrando fontes renováveis como a solar."}
];
// ---- cidade
const NS="http://www.w3.org/2000/svg";
function mk(p,tag,a){const e=document.createElementNS(NS,tag);for(const k in a)e.setAttribute(k,a[k]);$(p).appendChild(e);return e}
const trees=[[30,30],[70,90],[120,40],[240,30],[300,80],[350,30],[30,150],[100,100],[260,100],[330,100],[150,70],[370,150],[60,60],[280,50]];
const panels=[[40,176],[62,176],[84,176],[270,172],[292,172],[314,172]];
const tEl=trees.map(([x,y])=>{const g=mk("#trees","g",{style:"transition:opacity .6s;opacity:0"});mk("#trees","circle",{});$("#trees").removeChild($("#trees").lastChild);
 const c=document.createElementNS(NS,"circle");c.setAttribute("cx",x);c.setAttribute("cy",y);c.setAttribute("r",9);c.setAttribute("fill","#2fb36a");c.setAttribute("stroke","#1d7a49");g.appendChild(c);return g});
const pEl=panels.map(([x,y])=>mk("#panels","rect",{x,y,width:18,height:10,rx:2,fill:"#38bdf8",stroke:"#e8f3ee","stroke-width":.8,style:"transition:opacity .6s;opacity:0"}));
[[20,16,28,34],[60,20,24,28],[100,12,30,40],[220,16,26,34],[255,10,30,42],[300,18,26,30],[340,12,34,40],[20,142,30,26],[110,140,26,28],[225,140,32,24]].forEach(([x,y,w,h],i)=>mk("#blds","rect",{x,y,width:w,height:h,rx:3,fill:i%2?"#3a4a45":"#46585a"}));
[[150,20],[160,140]].forEach(([x,y])=>{mk("#fact","rect",{x,y,width:36,height:26,fill:"#5a4a40"});mk("#fact","rect",{x:x+6,y:y-9,width:6,height:10,fill:"#7a655a"});const c=mk("#fact","circle",{cx:x+9,cy:y-12,r:6,fill:"#9a9a8c",class:"puff",style:"transition:opacity .8s"})});
[[180,150],[40,200]].forEach(([x,y])=>mk("#bins","rect",{x,y:y,width:7,height:9,fill:"#3ddc84",opacity:.7}));
const cars=[0,1,2].map(i=>mk("#cars","circle",{cy:121+(i%2)*8,r:4,fill:i%2?"#facc15":"#e8f3ee"}));
let ct=0;setInterval(()=>{ct+=2;cars.forEach((c,i)=>c.setAttribute("cx",(ct*(1+i*.3)+i*130)%420-10))},30);
function city(){
 $("#ground").setAttribute("fill",`hsl(${70+S.n*.6} ${18+S.n*.35}% ${12+S.n*.1}%)`);
 $("#river").setAttribute("stroke",`hsl(${35+S.q*1.6} ${35+S.q*.3}% ${25+S.q*.18}%)`);
 $("#smog").style.opacity=Math.max(0,(100-S.q)/130);
 document.querySelectorAll(".puff").forEach(p=>p.style.opacity=Math.max(.1,(100-S.q)/100));
 tEl.forEach((t,i)=>t.style.opacity=S.n>18+i*5.5?1:0);
 pEl.forEach((p,i)=>p.style.opacity=S.e>28+i*11?1:0);
}
function meters(){["n","e","q"].forEach(k=>{S[k]=Math.max(0,Math.min(100,S[k]));$("#b"+k).style.width=S[k]+"%";$("#v"+k).textContent=Math.round(S[k])});city()}
function prog(p){$("#prog i").style.width=p+"%"}
// ---- jogo
function show(){
 const s=SIT[S.i];prog(S.i/SIT.length*100);
 const idx=s.o.map((_,i)=>i);
 $("#qbox").innerHTML=`<div class="fade"><div class="tag">Situação ${S.i+1}/${SIT.length}</div><h2 style="font-size:1.3rem">${s.t}</h2><p class="muted">“${s.d}”</p><div id="opts"></div><div id="res"></div></div>`;
 idx.forEach(i=>{const b=document.createElement("button");b.className="opt";b.textContent=s.o[i];b.onclick=()=>pick(i,b);$("#opts").appendChild(b)});
}
function pop(txt,col){const p=document.createElement("div");p.className="pop";p.textContent=txt;p.style.color=col;$("#cityBox").appendChild(p);setTimeout(()=>p.remove(),1200)}
function pick(i,btn){
 const s=SIT[S.i],ok=i===s.c;
 const bs=[...document.querySelectorAll(".opt")];bs.forEach((b,j)=>{b.disabled=true;if(j===s.c)b.classList.add("ok")});
 if(!ok)btn.classList.add("no");
 if(ok){S.ok++;for(const k in s.g)S[k]+=s.g[k];pop("+"+Math.max(...Object.values(s.g)),"#3ddc84");$("#cityBox").classList.add("glow")}
 else{S.n-=10;S.e-=8;S.q-=14;pop("−","#ff5d5d");$("#cityBox").classList.add("shake")}
 setTimeout(()=>$("#cityBox").classList.remove("glow","shake"),900);
 meters();
 $("#res").innerHTML=`<div class="fb fade">${ok?"✅ Decisão certeira! ":"⚠️ Essa escolha piorou a cidade. "}${s.x}</div><button class="btn" id="nx">${S.i<SIT.length-1?"PRÓXIMA ▶":"VER RESULTADO ▶"}</button>`;
 $("#nx").onclick=()=>{S.i++;S.i<SIT.length?show():finish()};
}
function finish(){
 prog(100);$("#game").style.display="none";$("#end").style.display="block";
 const sc=S.ok*25,r=S.ok===4?"🏆 Guardião do Planeta":S.ok===3?"🌎 Especialista em Sustentabilidade":S.ok===2?"🌱 Aliado da Natureza":"⚠️ Ainda precisa melhorar";
 $("#rank").textContent=r;$("#score").textContent=sc;
 $("#fm").innerHTML=[["🌱 Natureza",S.n,"var(--g)"],["⚡ Energia",S.e,"#facc15"],["💧 Qualidade",S.q,"var(--b)"]].map(([l,v,c])=>`<div class="meter"><small><span>${l}</span><b>${Math.round(v)}</b></small><div class="bar"><i style="width:${v}%;background:${c}"></i></div></div>`).join("");
 $("#end").scrollIntoView({behavior:"smooth"});
}
function start(){Object.assign(S,{n:30,e:30,q:30,i:0,ok:0});$("#end").style.display="none";$("#game").style.display="block";meters();show();prog(0);$("#game").scrollIntoView({behavior:"smooth"})}
$("#start").onclick=start;$("#again").onclick=start;
$("#learn").onclick=()=>$("#learnSec").scrollIntoView({behavior:"smooth"});
// ---- cards
[["🌳","Monitoramento de florestas","Satélites e IA detectam desmatamento e queimadas, ajudando a agir rápido."],["💧","Detecção de vazamentos","Sensores e algoritmos encontram perdas na rede de água antes de virarem desperdício."],["🌡️","Previsão climática","Modelos aprendem com décadas de dados para prever chuvas, secas e ondas de calor."],["🐾","Proteção de animais","Câmeras com IA identificam espécies e alertam sobre caça ilegal."],["⚡","Otimização de energia","A IA prevê a demanda e equilibra redes com fontes solar e eólica."],["🚗","Menos congestionamentos","Semáforos inteligentes reduzem filas e, com elas, as emissões."],["♻️","Gestão de resíduos","Câmeras e IA separam materiais recicláveis com mais precisão."]]
.forEach(([i,t,d])=>{const b=document.createElement("button");b.className="card";b.innerHTML=`<span class="ic">${i}</span><b>${t}</b><p>${d}</p>`;b.onclick=()=>b.classList.toggle("open");$("#cards").appendChild(b)});
// ---- balança
const SC=[[0,"Uso sem cuidado: modelos enormes, energia de fontes poluentes e servidores sem eficiência. Os impactos pesam mais."],[35,"Há benefícios, mas o consumo de energia e água dos data centers ainda é um peso importante."],[65,"Modelos eficientes, uso consciente e energia limpa aproximam a balança do equilíbrio."],[90,"Uso responsável: IA eficiente, data centers renováveis e foco em problemas ambientais reais. Os benefícios superam os custos."]];
function bal(){const v=+$("#sl").value;const a=(50-v)*.2*-1;$("#beam").style.transform=`rotate(${a}deg)`;
 // painéis acompanham para ficarem pendurados
 $("#panL").style.transform=$("#panR").style.transform="";
 let t=SC[0][1];SC.forEach(([m,x])=>{if(v>=m)t=x});$("#scTxt").textContent=t}
$("#sl").oninput=bal;bal();
// ---- quiz
const QZ=[["Uma floresta está sendo desmatada. Qual tecnologia seria mais útil?",["Reconhecimento de imagens por satélite","Editor de texto","Tradutor"],0,"A IA compara imagens de satélite ao longo do tempo e aponta onde a floresta está sumindo."],["Vazamentos de água em uma cidade grande. O que ajuda mais?",["Rede social","Sensores com análise por IA","Jogo de vídeo"],1,"Sensores geram dados e a IA reconhece padrões que indicam vazamentos."],["Como reduzir o gasto de energia em prédios?",["Previsão de demanda com IA","Aumentar o brilho das telas","Deixar tudo ligado"],0,"A IA prevê quando e onde a energia será usada e ajusta o consumo automaticamente."]];
QZ.forEach(([q,o,c,x])=>{const d=document.createElement("div");d.className="hud q";d.innerHTML=`<h3>${q}</h3>`;const fb=document.createElement("div");
 o.forEach((t,i)=>{const b=document.createElement("button");b.className="opt";b.textContent="ABC"[i]+") "+t;b.onclick=()=>{d.querySelectorAll(".opt").forEach((z,j)=>{z.disabled=true;if(j===c)z.classList.add("ok")});if(i!==c)b.classList.add("no");fb.className="fb fade";fb.textContent=(i===c?"✅ Correto! ":"❌ Quase! ")+x};d.appendChild(b)});d.appendChild(fb);$("#quiz").appendChild(d)});
meters();