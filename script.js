(() => {
  'use strict';

  const defaults = {
    company: '프리미엄 브랜드', companyEnglish: 'PREMIUM BUSINESS CARD', brandMark: 'sparkle',
    name: '김고객', title: '대표', representative: '김고객 대표', businessNumber: '000-00-00000',
    phone: '010-1234-5678', email: 'hello@example.com', profileImage: 'images/profile.webp',
    headline: '신뢰를 만드는<br><em>전문가의 한마디</em>', intro: '고객의 고민을 정확히 듣고 가장 알맞은 해답을 안내합니다.',
    experience: '15년', experienceLabel: '전문 상담<br>실무 경험', ratingText: '상담 만족도 4.9 / 5',
    aboutTitle: '고객의 상황을 먼저<br>깊이 이해합니다.', aboutText1: '충분히 듣고 꼭 필요한 선택지를 명확하게 설명합니다.', aboutText2: '처음 상담부터 이후 관리까지 한결같이 함께합니다.',
    servicesTitle: '전문성이 필요한 순간,<br>든든하게 곁에 있습니다.', reviewsTitle: '먼저 경험한 고객의<br>이야기를 확인하세요.', locationTitle: '편안한 상담을 위해<br>예약 후 방문해 주세요.', ctaTitle: '고민하지 말고,<br>지금 편하게 문의하세요.',
    address: '서울특별시 강남구 테헤란로 123<br>프리미엄타워 8층', addressPlain: '서울특별시 강남구 테헤란로 123, 프리미엄타워 8층', hours: '평일 09:30 – 18:00<br>주말·공휴일 휴무', parking: '건물 지하 주차장 1시간 지원',
    links: { kakao: 'https://pf.kakao.com/', booking: 'https://booking.naver.com/', map: 'https://map.naver.com/', instagram: 'https://instagram.com/', website: 'https://example.com/' },
    theme: { bg:'#f7f6f2', surface:'#ffffff', primary:'#17324d', primaryDark:'#102438', accent:'#c6a15b', text:'#1e2430', muted:'#6b7280', border:'#e5e2da', soft:'#eef4f1' },
    strengths: ['쉽고 명확한 설명', '상담 전 범위와 비용 안내', '빠르고 세심한 사후 관리'],
    services: [{icon:'◆',title:'핵심 서비스',description:'고객에게 꼭 필요한 핵심 서비스를 소개합니다.'},{icon:'◇',title:'맞춤 상담',description:'상황을 충분히 듣고 가장 알맞은 방법을 제안합니다.'},{icon:'□',title:'지속 관리',description:'상담 이후에도 필요한 과정을 세심하게 돕습니다.'}],
    reviews: [{text:'설명이 이해하기 쉽고 진행 과정도 명확해서 안심할 수 있었습니다.',author:'고객 A',meta:'가상 후기'},{text:'제 상황에 맞는 선택지를 차분하게 비교해 주셔서 좋았습니다.',author:'고객 B',meta:'가상 후기'},{text:'처음 문의부터 마무리까지 빠르고 친절하게 응대해 주셨습니다.',author:'고객 C',meta:'가상 후기'}],
    faq: [{question:'첫 상담은 어떻게 진행되나요?',answer:'문의 내용을 간단히 확인한 뒤 방문, 전화 또는 온라인 상담 일정을 안내합니다.'},{question:'준비해야 할 자료가 있나요?',answer:'상담 주제에 맞는 자료 목록을 미리 안내해 드립니다.'},{question:'상담 비용은 어떻게 정해지나요?',answer:'업무 범위와 난이도를 확인한 뒤 시작 전에 투명하게 안내합니다.'}]
  };

  const merge = (base, extra) => ({...base, ...extra, links:{...base.links,...(extra.links||{})}, theme:{...base.theme,...(extra.theme||{})}});
  const safeHtml = (value='') => String(value).replace(/<(?!\/?(?:br|em)\b)[^>]*>/gi,'');
  const ICONS = {
    calculator:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h4"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M8 7h8M8 11h6"/>',
    percent:'<path d="m19 5-14 14"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>',
    building:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21v-4h6v4M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01"/>',
    home:'<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/>',
    storefront:'<path d="M4 10v10h16V10M3 10l2-6h14l2 6"/><path d="M8 20v-6h5v6M3 10c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0"/>',
    shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
    sparkle:'<path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8zM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8z"/>',
    eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12"/><circle cx="12" cy="12" r="2.5"/>',
    droplet:'<path d="M12 2s6 6.2 6 12a6 6 0 0 1-12 0c0-5.8 6-12 6-12"/>',
    brush:'<path d="m14 4 6 6-8 8-6-6z"/><path d="M6 12c-3 1-4 3-4 6 2 2 5 2 7-1"/>',
    medical:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
    stethoscope:'<path d="M6 3v5a4 4 0 0 0 8 0V3M4 3h4M12 3h4M10 16a4 4 0 1 0 8 0v-2"/><circle cx="18" cy="12" r="2"/>',
    clipboard:'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M9 11h6M9 15h6"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
    scales:'<path d="M12 3v18M6 6h12M4 6 1 12h6zM20 6l-3 6h6zM7 21h10"/>',
    document:'<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 13h6M9 17h6"/>',
    briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/>',
    family:'<circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 21v-2a6 6 0 0 1 12 0v2M15 15a4 4 0 0 1 6 3.5V21"/>'
  };
  const iconSvg = name => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.sparkle}</svg>`;
  const telHref = value => `tel:${String(value).replace(/[^\d+]/g,'')}`;

  async function loadConfig(){
    try { const response = await fetch('config.json',{cache:'no-store'}); if(!response.ok) throw new Error(); return merge(defaults, await response.json()); }
    catch { document.getElementById('config-notice').hidden = location.protocol !== 'file:'; return defaults; }
  }

  function applyConfig(c){
    document.documentElement.lang = c.language || 'ko';
    document.title = `${c.name} | ${c.company}`;
    document.querySelector('meta[name="description"]').content = c.intro;
    document.querySelector('meta[name="theme-color"]').content = c.theme.primary;
    const vars={bg:'--bg',surface:'--surface',primary:'--primary',primaryDark:'--primary-dark',accent:'--accent',text:'--text',muted:'--muted',border:'--border',soft:'--soft'};
    Object.entries(vars).forEach(([key,name])=>c.theme[key]&&document.documentElement.style.setProperty(name,c.theme[key]));
    document.querySelectorAll('[data-bind]').forEach(el=>{const key=el.dataset.bind;if(c[key]!==undefined)el.textContent=c[key]});
    document.querySelector('.brand-mark').innerHTML=iconSvg(c.brandMark);
    document.querySelectorAll('[data-bind-html]').forEach(el=>{const key=el.dataset.bindHtml;if(c[key]!==undefined)el.innerHTML=safeHtml(c[key])});
    const image=document.getElementById('profile-image'); image.src=c.profileImage; image.alt=`${c.name} ${c.title} 프로필 사진`; image.onerror=()=>{image.src='images/profile-placeholder.svg'};
    const hrefs={phone:telHref(c.phone),email:`mailto:${c.email}`,...c.links};
    document.querySelectorAll('[data-link]').forEach(el=>{const href=hrefs[el.dataset.link]; if(href){el.href=href}else{el.hidden=true}});
    const list=document.getElementById('strength-list'); list.replaceChildren(...c.strengths.map(text=>Object.assign(document.createElement('li'),{textContent:text})));
    const serviceGrid=document.getElementById('service-grid');
    serviceGrid.replaceChildren(...c.services.map((service,index)=>{const item=document.createElement('article');item.className='service-card reveal';item.innerHTML=`<span class="card-number">${String(index+1).padStart(2,'0')}</span><div class="service-icon" aria-hidden="true">${safeHtml(service.icon||'◇')}</div><h3></h3><p></p><a href="mailto:${c.email}?subject=${encodeURIComponent(service.title+' 문의')}">이메일 문의 →</a>`;item.querySelector('h3').textContent=service.title;item.querySelector('p').textContent=service.description;return item}));
    serviceGrid.querySelectorAll('.service-icon').forEach((el,index)=>{el.innerHTML=iconSvg(c.services[index]?.icon)});
    const reviews=document.getElementById('review-track');
    reviews.replaceChildren(...c.reviews.map(review=>{const item=document.createElement('article');item.className='review-card reveal';item.innerHTML='<div class="stars" aria-label="별점 5점">★★★★★</div><blockquote></blockquote><div><span></span><small></small></div>';item.querySelector('blockquote').textContent=`“${review.text}”`;item.querySelector('span').textContent=review.author;item.querySelector('small').textContent=review.meta;return item}));
    const faq=document.getElementById('faq-list');
    faq.replaceChildren(...c.faq.map(entry=>{const item=document.createElement('details');const summary=document.createElement('summary');const answer=document.createElement('p');summary.textContent=entry.question;answer.textContent=entry.answer;item.append(summary,answer);return item}));
    faq.querySelectorAll('details').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)faq.querySelectorAll('details').forEach(other=>{if(other!==item)other.open=false})}));
    document.getElementById('save-contact').addEventListener('click',event=>{event.preventDefault();downloadVcard(c)});
    document.getElementById('year').textContent=new Date().getFullYear();
    reveal();
  }

  function downloadVcard(c){
    const clean=value=>String(value||'').replace(/\n/g,' ').replace(/[;,]/g,'\\$&');
    const vcard=['BEGIN:VCARD','VERSION:3.0',`FN:${clean(c.name)}`,`N:${clean(c.name)};;;;`,`ORG:${clean(c.company)}`,`TITLE:${clean(c.title)}`,`TEL;TYPE=CELL:${clean(c.phone)}`,`EMAIL:${clean(c.email)}`,`ADR;TYPE=WORK:;;${clean(c.addressPlain)};;;;`,`URL:${clean(c.links.website)}`,`NOTE:${clean(c.intro)}`,'END:VCARD'].join('\r\n');
    const url=URL.createObjectURL(new Blob(['\ufeff'+vcard],{type:'text/vcard;charset=utf-8'})); const a=document.createElement('a'); a.href=url;a.download=`${c.name}-연락처.vcf`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  function reveal(){
    const elements=document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target)}}),{threshold:.08});elements.forEach(el=>observer.observe(el))}else{elements.forEach(el=>el.classList.add('is-visible'))}
  }

  loadConfig().then(applyConfig);
})();
