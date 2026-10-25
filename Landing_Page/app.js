(()=>{
const root=document.documentElement;
try{const t=localStorage.getItem('fxTheme');if(t)root.dataset.theme=t}catch(e){}
addEventListener('DOMContentLoaded',()=>{
  const b=document.getElementById('theme');if(!b)return;
  const sync=()=>{const d=root.dataset.theme==='dark';b.textContent=d?'☀':'☾';b.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode')};
  sync();
  b.onclick=()=>{const n=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('fxTheme',n)}catch(e){}sync()};
});
// ---- Logo: FX + signature "Traders Club" (animated intro or static) ----
const GAP=40,BASE=72,F=36,SKEW=12,H=42,S=2700,SWD=520;
const DUR=[650,170,190,260,170,150,200,260,600,220,190,280]; // T r a d e r s _ C l u b (T and C slow)
const STAR='M0 -1C.08 -.2 .2 -.08 1 0C.2 .08 .08 .2 0 1C-.08 .2 -.2 .08 -1 0C-.2 -.08 -.08 -.2 0 -1Z';
const SVG='<svg viewBox="0 0 10 10" role="img" aria-label="FX Traders Club"><defs><linearGradient id="lg-fe"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="lg-m" maskUnits="userSpaceOnUse" x="-500" y="-400" width="3000" height="900"><g class="mg"><rect class="r1" y="-400" height="900" fill="#fff"/><rect class="r2" y="-400" width="'+F+'" height="900" fill="url(#lg-fe)"/></g></mask><clipPath id="lg-c"><rect class="swr" width="0"/></clipPath></defs><g class="fxg"><g class="fx"><text class="lg-fx" text-anchor="middle" dominant-baseline="central">FX</text></g></g><text class="lg-sig" text-anchor="start"><tspan>T</tspan>raders <tspan>C</tspan>lub</text><path class="sw" d=""/><g class="sp"></g></svg>';
async function mount(host,animate){
  host.innerHTML=SVG;
  const $=s=>host.querySelector(s),svg=$('svg'),fx=$('.fx'),fxt=$('.lg-fx'),sig=$('.lg-sig'),sw=$('.sw'),r1=$('.r1'),r2=$('.r2'),mg=$('.mg'),swr=$('.swr');
  await Promise.race([Promise.all([document.fonts.load('800 210px Montserrat'),document.fonts.load('140px "Great Vibes"')]).catch(()=>{}),new Promise(r=>setTimeout(r,2500))]);
  const wf=fxt.getBBox().width;sig.setAttribute('x',0);sig.setAttribute('y',BASE);
  const ws=sig.getBBox().width,sx=wf+GAP,VW=wf+GAP+ws+70,VH=235;
  $('.fxg').setAttribute('transform','translate('+wf/2+' 0)');sig.setAttribute('x',sx);
  svg.setAttribute('viewBox','-20 -105 '+VW+' '+VH);
  const x1=sx+6,x2=sx+ws+30,w=x2-x1,y1=BASE+34,y2=y1-16,t=5.5,c=(a,b)=>(x1+a*w).toFixed(1)+' '+b.toFixed(1);
  sw.setAttribute('d','M'+c(0,y1)+' C'+c(.3,y1+16-t)+' '+c(.7,y1+10-t)+' '+c(1,y2)+' C'+c(.7,y1+10+t)+' '+c(.3,y1+16+t)+' '+c(0,y1)+'Z');
  const out={vbW:VW,vbH:VH,svg};
  if(!animate)return out;
  const ex=[...Array(12)].map((_,i)=>sig.getExtentOfChar(i)),B=ex.map(e=>e.x);B[0]-=40;B.push(ex[11].x+ex[11].width+90);
  const cum=[0];DUR.forEach((d,i)=>cum.push(cum[i]+d));const TOT=cum[12],RX=B[0]-300;
  r1.setAttribute('x',RX);
  mg.setAttribute('transform','translate('+Math.tan(SKEW*Math.PI/180)*BASE+' 0) skewX(-'+SKEW+')');
  sig.setAttribute('mask','url(#lg-m)');sw.setAttribute('clip-path','url(#lg-c)');
  swr.setAttribute('x',x1-10);swr.setAttribute('y',y2-20);swr.setAttribute('height',90);
  const ease=u=>.5*u+.5*u*u*(3-2*u);
  const pos=t=>{if(t<=0)return B[0];if(t>=TOT)return B[12];let i=0;while(t>cum[i+1])i++;const u=(t-cum[i])/DUR[i];return B[i]+(B[i+1]-B[i])*ease(u)};
  const edge=e=>{r1.setAttribute('width',Math.max(0,e-F-RX));r2.setAttribute('x',e-F)};
  const bz=f=>{const m=1-f,P=[[x1,y1],[x1+.3*w,y1+16],[x1+.7*w,y1+10],[x2,y2]];return[0,1].map(k=>m*m*m*P[0][k]+3*m*m*f*P[1][k]+3*m*f*f*P[2][k]+f*f*f*P[3][k])};
  const NS='http://www.w3.org/2000/svg',SP=[[.28,-14,9],[.62,-18,13],[1,-6,22]].map(([f,dy,s])=>{
    const p=bz(f),g=document.createElementNS(NS,'g'),st=document.createElementNS(NS,'path');
    g.setAttribute('transform','translate('+p[0].toFixed(1)+' '+(p[1]+dy).toFixed(1)+')');st.setAttribute('d',STAR);st.setAttribute('class','st');g.appendChild(st);$('.sp').appendChild(g);return{el:st,f,s}});
  const tx=-20+VW/2-wf/2,kf=(s,off,easing,blur,op,x)=>({transform:'translate('+x+'px,0px) scale('+s+')',filter:'blur('+blur+'px)',opacity:op,offset:off,easing});
  fx.style.opacity=0;sig.style.visibility='hidden';edge(B[0]);
  out.play=()=>new Promise(res=>{
    fx.animate([kf(3.4,0,'cubic-bezier(.12,.9,.25,1)',18,0,tx),kf(.95,.38,'ease-in-out',0,1,tx),kf(1.015,.5,'ease-in-out',0,1,tx),kf(1,.58,'linear',0,1,tx),kf(1,.68,'cubic-bezier(.65,0,.35,1)',0,1,tx),kf(1,1,'linear',0,1,0)],{duration:3000,fill:'forwards'});
    fxt.animate([{filter:'blur(0px)'},{filter:'blur(3.5px)',offset:.5},{filter:'blur(0px)'}],{duration:960,delay:2040,easing:'ease-in-out'});
    sig.animate([{filter:'blur(4px)'},{filter:'blur(0px)'}],{duration:900,delay:S,easing:'ease-out',fill:'both'});
    sw.animate([{filter:'blur(3px)'},{filter:'blur(0px)'}],{duration:SWD,delay:S+TOT-80,easing:'ease-out',fill:'both'});
    SP.forEach(o=>o.el.animate([{transform:'scale(0) rotate(0deg)',opacity:0},{transform:'scale('+o.s+') rotate(60deg)',opacity:1,offset:.45},{transform:'scale(0) rotate(120deg)',opacity:0}],{duration:800,delay:S+TOT-80+SWD*o.f*.75,easing:'ease-in-out',fill:'both'}));
    const T0=performance.now();sig.style.visibility='visible';
    (function f(now){const t=now-T0-S;edge(pos(t));const u=Math.min(1,Math.max(0,(t-(TOT-80))/SWD));swr.setAttribute('width',(ws+70)*(1-Math.pow(1-u,3)));if(t<TOT+SWD)requestAnimationFrame(f);else setTimeout(res,700)})(T0);
  });
  return out;
}
window.FXLogo={mount,H,async nav(slot){const o=await mount(slot,false);slot.style.width=H*o.vbW/o.vbH+'px';return o}};
})();
