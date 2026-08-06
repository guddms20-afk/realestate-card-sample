(() => {
  'use strict';

  const defaults = {
    company: '프리미엄 브랜드', companyEnglish: 'PREMIUM BUSINESS CARD', brandMark: '信',
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
    document.querySelectorAll('[data-bind-html]').forEach(el=>{const key=el.dataset.bindHtml;if(c[key]!==undefined)el.innerHTML=safeHtml(c[key])});
    const image=document.getElementById('profile-image'); image.src=c.profileImage; image.alt=`${c.name} ${c.title} 프로필 사진`; image.onerror=()=>{image.src='images/profile-placeholder.svg'};
    const hrefs={phone:telHref(c.phone),email:`mailto:${c.email}`,...c.links};
    document.querySelectorAll('[data-link]').forEach(el=>{const href=hrefs[el.dataset.link]; if(href){el.href=href}else{el.hidden=true}});
    const list=document.getElementById('strength-list'); list.replaceChildren(...c.strengths.map(text=>Object.assign(document.createElement('li'),{textContent:text})));
    const serviceGrid=document.getElementById('service-grid');
    serviceGrid.replaceChildren(...c.services.map((service,index)=>{const item=document.createElement('article');item.className='service-card reveal';item.innerHTML=`<span class="card-number">${String(index+1).padStart(2,'0')}</span><div class="service-icon" aria-hidden="true">${safeHtml(service.icon||'◇')}</div><h3></h3><p></p><a href="mailto:${c.email}?subject=${encodeURIComponent(service.title+' 문의')}">이메일 문의 →</a>`;item.querySelector('h3').textContent=service.title;item.querySelector('p').textContent=service.description;return item}));
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
