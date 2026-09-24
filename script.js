// ============================================================
// IMAGE PATHS
// ============================================================
// Put your own images inside: assets/images/
// You can replace the image files and keep these same filenames.
const IMG = {
  pellikuthuru: 'assets/images/pellikuthuru.jpg',
  mehendi: 'assets/images/mehendi.jpg',
  haldi: 'assets/images/haldi.png',
  // snanam: 'assets/images/snanam.jpg',
  muhurtam: 'assets/images/marriage.png',
  sangeeth: 'assets/images/sangeeth.png',
  reception: 'assets/images/reception.jpg'
};

// ============================================================
// BASIC SETTINGS + SMALL HELPER FUNCTIONS
// ============================================================

// Browser storage key used by the admin panel.
const STORAGE_KEY = 'telugu-invite-v1';

// Short helper for document.getElementById(...)
const $ = (id) => document.getElementById(id);

// Protect text before placing it inside HTML.
const e = (text) => String(text == null ? '' : text).replace(
  /[&<>"]/g,
  (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  })[character]
);

// If an image starts with @, get it from the IMG object above.
// Example: '@haldi' becomes 'assets/images/haldi.jpg'.
const src = (image) => image && image[0] === '@' ? IMG[image.slice(1)] : image;

// Default Google Maps location.
const MAP = 'https://www.google.com/maps/search/?api=1&query=Venkateswara+Convention+Hall+Vijayawada';

// Helper used to create one wedding event object.
const ev = (name, te, date, time, venue, addr, desc, img, ic, main) => ({
  name,
  te,
  date,
  time,
  venue,
  addr,
  map: MAP,
  desc,
  img,
  ic,
  main
});

// ============================================================
// WEDDING DETAILS
// Edit names, dates, venue, story and events here.
// ============================================================
function defs(){const V='Venkateswara Convention Hall',A='Vijayawada, Andhra Pradesh';return{
bride:'Sriya',groom:'Arjun',date:'2026-12-20',time:'10:35',muh:'10:35 AM',venue:V,addr:A,map:MAP,hero:'@haldi',
story:'Two beautiful souls, brought together by destiny, are beginning a new chapter filled with love, laughter and togetherness.',
brideFam:'Sri. [Father\'s name] & Smt. [Mother\'s name]\nand family',groomFam:'Sri. [Father\'s name] & Smt. [Mother\'s name]\nand family',
music:'',musicOn:true,pass:'admin123',rsvps:[],gallery:[
  {src:'assets/images/marriage-1.png',cat:'జీలకర్ర బెల్లం'},
  {src:'assets/images/marriage-4.png',cat:'తలంబ్రాలు '},
  {src:'assets/images/marriage-2.png',cat:'కన్యాదానం '},
  {src:'assets/images/marriage-5.png',cat:'దండలు మార్చుకోవడం'},
  {src:'assets/images/marriage-3.png',cat:'మాంగళ్య ధారణ'},
  {src:'assets/images/marriage-6.png',cat:'సప్తపది '}
],
events:[
ev('Haldi','నలుగు / పసుపు కార్యక్రమం','2026-12-15','10:00',V,A,'Turmeric is applied with songs and laughter, in the presence of family.','@haldi'),
ev('Mehendi','మెహందీ వేడుక','2026-12-16','17:00',V,A,'Fresh henna, marigold garlands and an evening with the women of the family.','@mehendi'),
ev('Sangeeth','సంగీత్ వేడుక','2026-12-17','19:00',V,A,'An evening of music, dance and joyful family celebration.','@sangeeth'),
// ev('Mangala Snanam','మంగళస్నానం','2026-12-20','06:00',V,A,'The auspicious bath before the wedding, with flowers and blessings.','@snanam'),
ev('Pellikuthuru','పెళ్లికూతురు','2026-12-14','17:00',V,A,'The bride is adorned with turmeric, flowers and blessings from the elders.','@pellikuthuru'),
ev('Wedding Ceremony','శుభ వివాహం','2026-12-20','10:35',V,A,'Muhurtham at 10:35 AM. Join us as we take the sacred vows before the sacred fire.','@muhurtam'),
ev('Reception','విందు మరియు ఆశీర్వాద కార్యక్రమం','2026-12-20','19:00',V,A,'An evening feast and blessings for the newly married couple.','@reception')
].map((x,i)=>(x.id=i,x))}}
// Load saved admin changes. If nothing is saved, use the defaults above.
let D;try{D=Object.assign(defs(),JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'))}catch(x){D=defs()}
const save=()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(D))}catch(x){alert('Browser storage is full. Use smaller images or music.')}};
const t12=t=>{const[h,m]=t.split(':');return((h%12)||12)+':'+m+' '+(h<12?'AM':'PM')};
const dt=(d,o)=>new Date(d+'T00:00').toLocaleDateString('en-GB',o);
const LOT='<svg class="lot" viewBox="0 0 46 30"><g fill="none" stroke="#a8842f" stroke-width="1.2"><path d="M23 28C14 24 12 12 23 3c11 9 9 21 0 25z"/><path d="M23 28C10 27 4 18 3 12c9 0 17 5 20 16zM23 28c13-1 19-10 20-16-9 0-17 5-20 16z"/></g></svg>';
const ICON={lamp:'<svg viewBox="0 0 100 100" fill="none" stroke="#a8842f" stroke-width="2"><path d="M20 60q30 25 60 0z" fill="#c9962b"/><path d="M50 60v20M35 84h30M80 60q10-4 12-12"/><path d="M50 22q10 12 0 22q-10-10 0-22z" fill="#b3372a" stroke="#b3372a"/></svg>',
note:'<svg viewBox="0 0 100 100" fill="none" stroke="#a8842f" stroke-width="2.5"><circle cx="50" cy="26" r="9" fill="#c9962b"/><ellipse cx="50" cy="64" rx="24" ry="26" fill="#efe2c4"/><path d="M50 35v-14M36 44h28M38 56h24"/><path d="M50 90v8"/></svg>',
temple:'<svg viewBox="0 0 100 100" fill="none" stroke="#f3d58c" stroke-width="2"><path d="M50 8v8M40 30h20l4 10H36zM32 40h36l4 12H28zM24 52h52l4 14H20zM16 66h68v22H16zM44 88V74h12v14"/><path d="M8 88h84"/></svg>'};
const tor=()=>{let s='<svg viewBox="0 0 800 86"><path d="M0 4Q400 44 800 4" fill="none" stroke="#a8842f" stroke-width="2"/>';for(let i=0;i<=20;i++){const t=i/20,x=800*t,y=4*(1-t)**2+80*(1-t)*t+4*t*t;s+=i%3==1?`<circle cx="${x}" cy="${y+8}" r="6" fill="#c9962b"/><circle cx="${x}" cy="${y+8}" r="2.5" fill="#b3372a"/>`:`<path transform="translate(${x} ${y})" d="M0 0Q8 16 0 40Q-8 16 0 0" fill="#4a6b3a"/>`}return s+'</svg>'};
// Create a Google Calendar link for an event.
function calUrl(v){const a=new Date(v.date+'T'+v.time),b=new Date(+a+(/wedding/i.test(v.name)?3:2)*36e5),p=d=>d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0')+'T'+String(d.getHours()).padStart(2,'0')+String(d.getMinutes()).padStart(2,'0')+'00';
return'https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(v.name+' · '+D.bride+' & '+D.groom)+'&dates='+p(a)+'/'+p(b)+'&location='+encodeURIComponent(v.venue+', '+v.addr)+'&details='+encodeURIComponent(v.desc)}
const hd=(te,en)=>`<div class="hd"><p class="te">${te}</p><h2>${en}</h2>${LOT}</div>`;
// const CATS=['Couple','Family','Engagement','Pre-Wedding','Wedding','Celebrations'];let cat='All';
// ============================================================
// BUILD THE PUBLIC WEDDING WEBSITE
// This function creates the visible sections of the page.
// ============================================================
function pub(){
const evs=D.events.map((v,i)=>`<article class="ev ${v.main?'main':''} ${i%2?'r':''}"><div class="art">${v.img?`<img src="${e(src(v.img))}" alt="${e(v.name)}">`:ICON[v.ic||'lamp']}</div><div class="tx"><p class="te">${e(v.te)}</p><h3>${e(v.name)}</h3>${v.main?'<p class="mant">మాంగల్య తంతునానేన...</p>':''}<p class="meta">${dt(v.date,{weekday:'long'})}, ${dt(v.date,{day:'numeric',month:'long',year:'numeric'})} at ${t12(v.time)}</p><p class="ven"><b>${e(v.venue)}</b><br>${e(v.addr)}</p><p>${e(v.desc)}</p><div class="btns"><a class="btn" href="${e(v.map)}" target="_blank" rel="noopener">View Location</a><a class="btn o" href="${e(calUrl(v))}" target="_blank" rel="noopener">Add to Calendar</a></div></div></article>`).join('');
const pics=D.gallery;
$('app').innerHTML=`
<section id="home"><div class="card"><div class="tor">${tor()}</div>
<p class="te inv">శ్రీరస్తు<br>శుభమస్తు<br>అవిఘ్నమస్తు</p><p>With the blessings of our elders</p><p style="letter-spacing:.2em;color:var(--gold)">Wedding Invitation</p>
<h1 class="names">${e(D.bride)}<i>&amp;</i>${e(D.groom)}</h1><p class="date">${dt(D.date,{day:'numeric',month:'long',year:'numeric'})}</p>
<div class="frame"><img src="${e(src(D.hero))}" alt="Couple illustration"></div>
<a class="btn" href="#events">View Invitation</a></div></section>
<section id="story"><div class="wrap">${hd('రెండు మనసులు...<br>ఒక అందమైన ప్రయాణం','Two Hearts, One Beautiful Beginning')}<p class="s">${e(D.story)}</p><p class="te">సకల శుభములు కలుగుగాక</p></div></section>
<section id="events"><div class="wrap">${hd('వివాహ వేడుకలు','Wedding Celebrations')}<div class="tl">${evs}</div></div></section>
<section id="count"><div class="wrap">${hd('శుభ ఘడియ కోసం ఎదురుచూస్తూ...','Counting the moments...')}<div class="cd"><div><b id="c0">0</b><span>DAYS</span></div><div><b id="c1">0</b><span>HOURS</span></div><div><b id="c2">0</b><span>MINUTES</span></div><div><b id="c3">0</b><span>SECONDS</span></div></div></div></section>
<section id="venue"><div class="wrap"><div class="venue-image"><img src="assets/images/venue.jpg" alt="Wedding Venue"></div><div>${hd('వేదిక','Wedding Venue')}<h3>${e(D.venue)}</h3><p>${e(D.addr)}</p><p class="meta">${dt(D.date,{day:'numeric',month:'long',year:'numeric'})}<br>ముహూర్తం: ${e(D.muh)}</p><a class="btn" href="${e(D.map)}" target="_blank" rel="noopener">Open in Google Maps</a></div></div></section>
<section id="bless"><div class="wrap">${LOT.replace(/#a8842f/g,'#f3d58c')}<p class="q">With the blessings of our elders,<br>we warmly invite you to celebrate<br>the wedding of Sriya & Arjun.</p><p class="te">మీ రాకతో మా వివాహ వేడుకకు<br>మరింత శోభ చేకూరాలని కోరుకుంటూ.<br>సాదరంగా ఆహ్వానిస్తున్నాము...</p></div></section>
<section id="gallery"><div class="wrap">${hd('చిత్రమాలిక','Gallery')}${pics.length?`<div class="gal">${pics.map(g=>`<figure><img src="${e(g.src)}" alt="${e(g.cat)}"><figcaption>${e(g.cat)}</figcaption></figure>`).join('')}</div>`:'<p class="empty">Photos will appear here soon.</p>'}</div></section><section id="rsvp"><div class="wrap">${hd('మీ రాకే మా ఆశీర్వాదం','Your presence is our blessing')}<form class="rs" onsubmit="return rsvp(this)"><label>Name<input name="n" required></label><label>Number of Guests<input name="g" type="number" min="1" max="20" value="1" required></label><label>Will you attend?<select name="a"><option>Yes</option><option>No</option><option>Maybe</option></select></label><label>Message<textarea name="m"></textarea></label><button class="btn">Send RSVP</button></form></div></section>
<footer><p class="te" style="color:#f3d58c">శుభమస్తు</p><p>${e(D.bride)} &amp; ${e(D.groom)}</p><a href="#admin" onclick="admin()">.</a></footer>`;
tick();mus()}
// Save an RSVP response in this browser.
function rsvp(f){D.rsvps.push({n:f.n.value,g:+f.g.value,a:f.a.value,m:f.m.value,t:Date.now()});save();f.outerHTML='<p class="ok">Thank you! We look forward to celebrating with you.</p>';return false}
// Update the wedding countdown every second.
let ct;function tick(){clearInterval(ct);const f=()=>{let s=Math.max(0,Math.floor((new Date(D.date+'T'+D.time)-Date.now())/1e3));[Math.floor(s/86400),Math.floor(s/3600)%24,Math.floor(s/60)%60,s%60].forEach((v,i)=>{const n=$('c'+i);if(n)n.textContent=v})};f();ct=setInterval(f,1000)}
// Background music button.
function mus(){const b=$('mus'),a=$('au');b.hidden=!(D.music&&D.musicOn);if(a.getAttribute('src')!=D.music){a.src=D.music}b.onclick=()=>{a.paused?a.play().catch(()=>{}):a.pause();b.textContent=a.paused?'♪ Wedding Music':'❚❚ Pause Music'}}
/* ============================================================
   DECORATIVE FALLING PETALS
   ============================================================ */
(()=>{const h=$('app');const c=['#b3372a','#d99a1e','#e8a25e'];setTimeout(()=>{const s=document.getElementById('home');if(!s)return;for(let i=0;i<14;i++){const p=document.createElement('span');p.className='petal';p.style.cssText=`left:${Math.random()*100}%;background:${c[i%3]};animation-duration:${12+Math.random()*10}s;animation-delay:${-Math.random()*15}s;width:${8+Math.random()*6}px;height:${8+Math.random()*6}px`;s.appendChild(p)}},50)})();
/* ============================================================
   ADMIN PANEL
   Lets you edit the invitation from the browser.
   ============================================================ */
const fl=(l,k,t='text')=>`<label>${l}<input data-k="${k}" type="${t}" value="${e(D[k])}"></label>`;
function admin(){if(!sessionStorage.a){const p=prompt('Admin passcode');if(p!==D.pass){location.hash='';return}try{sessionStorage.a=1}catch(x){}}
const A=$('adm');A.style.display='block';const E=D.events;
A.innerHTML=`<div class="in"><div class="row"><h1 style="flex:1">Admin</h1><button class="btn o sm" onclick="closeAdm()">Close</button></div>
<p>Edits save in this browser only. Guests on other devices will not see them until the site is hosted with a shared database.</p>
<h2>Couple &amp; wedding</h2><div class="g">${fl('Bride name','bride')}${fl('Groom name','groom')}${fl('Wedding date','date','date')}${fl('Wedding time','time','time')}${fl('Muhurtham (text)','muh')}${fl('Venue','venue')}${fl('Address','addr')}${fl('Google Maps link','map')}</div>
<label>Story<textarea data-k="story">${e(D.story)}</textarea></label>
<label>Couple illustration<input type="file" accept="image/*" data-f="hero"></label>
<h2>Families</h2><div class="g"><label>Bride's family<textarea data-k="brideFam">${e(D.brideFam)}</textarea></label><label>Groom's family<textarea data-k="groomFam">${e(D.groomFam)}</textarea></label></div>
<h2>Events</h2>${E.map((v,i)=>`<fieldset><div class="row"><b style="flex:1">${e(v.name)}</b><button class="btn o sm" onclick="mv(${i},-1)">↑</button><button class="btn o sm" onclick="mv(${i},1)">↓</button><button class="btn o sm" onclick="delEv(${i})">Delete</button></div><div class="g">${['name:Event name','te:Telugu name','date:Date','time:Time','venue:Venue','addr:Address','map:Google Maps URL'].map(s=>{const[k,l]=s.split(':');return`<label>${l}<input data-i="${i}" data-k="${k}" type="${k=='date'?'date':k=='time'?'time':'text'}" value="${e(v[k])}"></label>`}).join('')}</div><label>Description<textarea data-i="${i}" data-k="desc">${e(v.desc)}</textarea></label><div class="row"><label style="display:flex;gap:.4rem;align-items:center"><input type="checkbox" style="width:auto" data-i="${i}" data-k="main" ${v.main?'checked':''}>Highlight</label><label>Illustration<input type="file" accept="image/*" data-f="ev${i}"></label></div></fieldset>`).join('')}<button class="btn" onclick="addEv()">Add event</button>
<h2>Gallery</h2><label>Upload images<input type="file" accept="image/*" multiple data-f="gal"></label><label style="max-width:220px">Category<select id="gc">${CATS.map(c=>`<option>${c}</option>`).join('')}</select></label><div class="row">${D.gallery.map((g,i)=>`<div><img class="th" src="${e(g.src)}"><br><small>${e(g.cat)}</small><br><button class="btn o sm" onclick="gm(${i},-1)">←</button><button class="btn o sm" onclick="gm(${i},1)">→</button><button class="btn o sm" onclick="gd(${i})">✕</button></div>`).join('')}</div>
<h2>Music</h2><label>Background music<input type="file" accept="audio/*" data-f="music"></label><label style="display:flex;gap:.4rem;align-items:center"><input type="checkbox" style="width:auto" data-k="musicOn" ${D.musicOn?'checked':''}>Enable music player</label>${fl('Admin passcode','pass')}
<h2>RSVPs</h2>${(()=>{const R=D.rsvps,c=s=>R.filter(r=>r.a==s).length,g=R.filter(r=>r.a=='Yes').reduce((t,r)=>t+r.g,0);return`<p>${R.length} responses. Yes: ${c('Yes')} (${g} guests), No: ${c('No')}, Maybe: ${c('Maybe')}.</p><div style="overflow-x:auto"><table><tr><th>Name</th><th>Guests</th><th>Status</th><th>Message</th></tr>${R.map(r=>`<tr><td>${e(r.n)}</td><td>${r.g}</td><td>${r.a}</td><td>${e(r.m)}</td></tr>`).join('')}</table></div>`})()}</div>`}
function closeAdm(){$('adm').style.display='none';location.hash='';pub()}
const rr=()=>{save();pub();admin()};
const mv=(i,d)=>{const E=D.events,j=i+d;if(j<0||j>=E.length)return;[E[i],E[j]]=[E[j],E[i]];rr()};
const delEv=i=>{if(confirm('Delete this event?')){D.events.splice(i,1);rr()}};
const addEv=()=>{D.events.push(ev('New Event','కొత్త వేడుక',D.date,'10:00',D.venue,D.addr,'','','lamp'));D.events.at(-1).map=D.map;rr()};
const gm=(i,d)=>{const G=D.gallery,j=i+d;if(j<0||j>=G.length)return;[G[i],G[j]]=[G[j],G[i]];rr()};
const gd=i=>{D.gallery.splice(i,1);rr()};
$('adm').addEventListener('input',x=>{const t=x.target,k=t.dataset.k;if(!k)return;const v=t.type=='checkbox'?t.checked:t.value;t.dataset.i!==undefined?D.events[+t.dataset.i][k]=v:D[k]=v;save();pub()});
$('adm').addEventListener('change',x=>{const t=x.target,f=t.dataset.f;if(!f)return;[...t.files].forEach(file=>{const r=new FileReader();r.onload=()=>{const u=r.result;if(f=='gal')D.gallery.push({src:u,cat:$('gc').value});else if(f=='music')D.music=u;else if(f=='hero')D.hero=u;else D.events[+f.slice(2)].img=u;rr()};r.readAsDataURL(file)})});
// Start the website.
pub();if(location.hash=='#admin')admin();addEventListener('hashchange',()=>{if(location.hash=='#admin')admin()});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
