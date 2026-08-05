import './style.css';

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const invitation = {
  groom: '김도영',
  bride: '김현일',
  date: '2026.DEC.19 16:20',
  dateISO: '2026-12-19T16:20:00+09:00',
  venue: '스타시티아트홀 5층',
  venueShort: '스타시티아트홀',
  address: '서울 광진구 능동로 110 스타시티영존 5층',
  telephone: '02-430-8000',
  message: [
    '두 사람이 만나 미래를 함께하고자 합니다',
    '두 사람을 진심으로 아끼고 돌봐주신 분들을 모시고',
    '서약을 맺고자 하오니 가까이에서 축복해 주시면',
    '감사하겠습니다'
  ],
  families: {
    groom: '김남식의 아들  도영',
    bride: '김래건의 딸  현일'
  },
  mapLinks: {
    naver: 'https://map.naver.com/p/search/스타시티아트홀',
    kakao: 'https://map.kakao.com/?q=스타시티아트홀',
    tmap: 'https://tmap.life/716a3682'
  },
  accounts: {
    groom: [
      { label: '신랑', bank: '하나', number: '831-910196-73607', owner: '김도영' },
      { label: '신랑 아버지', bank: '농협', number: '11111111111111', owner: '김남식' }
    ],
    bride: [
      { label: '신부', bank: '토스뱅크', number: '1000-0685-8415', owner: '김현일' },
      { label: '신부 어머니', bank: '신한', number: '110-106-487192', owner: '김래건' }
    ]
  }
};

const photos = Array.from({ length: 18 }, (_, index) => asset(`assets/photos/gallery-${String(index + 1).padStart(2, '0')}.jpg`));

const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);

const formatAccountNumber = (number) => {
  if (number.includes('-')) return number;
  const digits = number.replace(/\D/g, '');
  return [digits.slice(0, 3), digits.slice(3, 7), digits.slice(7, 11), digits.slice(11)].filter(Boolean).join('-');
};

const accountRows = (rows) => rows.map((row) => `
  <li class="account-row">
    <div class="account-row__info"><p class="account-row__person">${row.label} ${row.owner}</p><p class="account-row__number">${row.bank} ${formatAccountNumber(row.number)}</p></div>
    <button class="copy-button" data-copy="${row.number.replace(/\D/g, '')}" type="button">복사</button>
  </li>`).join('');

document.querySelector('#app').innerHTML = `
  <article class="invitation">
    <audio id="backgroundMusic" src="${asset('assets/audio/krasnoshchok-wedding-romantic-love-music-409293.mp3')}" autoplay preload="metadata"></audio>
    <button class="music-control" id="musicControl" type="button" aria-label="배경음악 재생" aria-pressed="false"><span aria-hidden="true">♪</span></button>
    <section class="hero">
      <img class="hero__image" src="${asset('assets/photos/hero.jpg')}" alt="신랑 신부 웨딩 사진" />
      <div class="hero__shade"></div>
      <p class="hero__message hero__message--getting reveal">We're getting</p>
      <p class="hero__message hero__message--married reveal">Married</p>
      <div class="hero__content reveal">
        <h1><span>${invitation.groom}</span><i aria-hidden="true"></i><span>${invitation.bride}</span></h1>
        <p class="hero__date">${invitation.date}</p>
        <p class="hero__venue">${invitation.venueShort}</p>
      </div>
      <span class="hero__scroll">SCROLL <i></i></span>
    </section>

    <section class="fig-section greeting reveal">
      <img class="greeting__image" src="${asset('assets/photos/detail.jpg')}" alt="웨딩 소품" loading="lazy" />
      <div class="greeting__content">
      <p class="fig-title">Invitation</p>
      <p class="greeting__copy">${invitation.message.join('<br />')}</p>
      <div class="families">
        <p><strong>김남식</strong><span>의 아들</span><strong>도영</strong></p>
        <p><strong>김래건</strong><span>의 딸</span><strong>현일</strong></p>
      </div>
      </div>
    </section>

    <section class="fig-section date-section reveal">
      <p class="fig-title">The Wedding Day</p>
      <div class="date-section__info"><strong>2026년 12월 19일 토요일 | 오후 4시 20분</strong><span>${invitation.venue}</span></div>
      <a class="calendar-add" href="${asset('wedding.ics')}">일정 등록</a>
      <div class="calendar" aria-label="2026년 12월 달력">
        <div class="calendar__week"><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span></div>
        <div class="calendar__days">
          ${'<span></span>'.repeat(1)}
          ${calendarDays.map(day => `<span class="${day === 19 ? 'is-wedding' : ''}">${day}</span>`).join('')}
        </div>
      </div>
      <div class="countdown" id="countdown"></div>
    </section>

    <section class="fig-section location reveal">
      <p class="fig-title">Location</p>
      <div class="location__card">
        <strong>${invitation.venue}</strong><p><span class="address-line">${invitation.address}<button class="address-copy" data-copy="${invitation.address}" data-copy-message="주소를 복사했습니다" type="button" aria-label="주소 복사"></button></span><span>Tel. ${invitation.telephone}</span></p>
        <div class="map-links">
          <a href="${invitation.mapLinks.naver}" target="_blank" rel="noreferrer"><img src="${asset('assets/icons/naver-map.png')}" alt="" />네이버지도</a>
          <a href="${invitation.mapLinks.kakao}" target="_blank" rel="noreferrer"><img src="${asset('assets/icons/kakao-map.png')}" alt="" />카카오맵</a>
          <a href="${invitation.mapLinks.tmap}" target="_blank" rel="noreferrer"><img src="${asset('assets/icons/tmap.png')}" alt="" />티맵</a>
        </div>
        <div class="naver-map" id="naverMap" aria-label="스타시티아트홀 네이버 지도"><p>지도를 불러오는 중입니다</p></div>
      </div>
      <div class="transport">
        <h3>자차</h3><p class="transport__details transport__details--roomy">‘스타시티아트홀’ 검색<br />5층 주차 확인 데스크에서 주차권을 받아주세요<br />• 스타시티아트홀 B1~B5 | 2시간 무료<br />• 건국대학교병원 지상·지하 | 1시간 30분 무료</p>
        <h3>지하철</h3><p class="subway-info"><span><b class="subway-badge subway-badge--2" aria-label="2호선">2</b>건대입구역 2번 출구 | 도보 3분</span><br /><span><b class="subway-badge subway-badge--7" aria-label="7호선">7</b>건대입구역 3번 출구 | 도보 1분</span></p>
        <h3>버스</h3><p class="transport__details transport__details--roomy">건대입구역, 건대입구역 사거리 하차<br />• 간선 240번, 721번, N61번, N62번<br />• 지선 2016번, 2222번, 3217번, 3220번, 4212번<br />• 직행 102번, 3500번 · 공항 6013번</p>
      </div>
    </section>

    <section class="fig-section gallery-section reveal">
      <p class="fig-title">Gallery</p>
      <div class="gallery-main">
        <img src="${photos[0]}" alt="웨딩 갤러리 사진 1" draggable="false" />
        <button type="button" class="gallery-main__nav gallery-main__nav--prev" aria-label="이전 사진"><i aria-hidden="true"></i></button>
        <button type="button" class="gallery-main__nav gallery-main__nav--next" aria-label="다음 사진"><i aria-hidden="true"></i></button>
      </div>
      <div class="gallery-strip">
        ${photos.map((photo, index) => `<button type="button" class="gallery__item ${index === 0 ? 'is-active' : ''}" data-select-photo="${index}" aria-label="사진 ${index + 1} 선택"><img src="${photo}" alt="웨딩 사진 ${index + 1}" loading="lazy" /></button>`).join('')}
      </div>
    </section>

    <section class="fig-section accounts reveal">
      <h2>마음 전하실 곳</h2>
      <div class="account-groups">
        <details><summary>신랑 측 <span class="summary-chevron" aria-hidden="true"></span></summary><ul>${accountRows(invitation.accounts.groom)}</ul></details>
        <details><summary>신부 측 <span class="summary-chevron" aria-hidden="true"></span></summary><ul>${accountRows(invitation.accounts.bride)}</ul></details>
      </div>
      <button class="invitation-copy" id="invitationCopy" type="button">청첩장 주소 복사하기</button>
    </section>
    <footer class="footer">© 2026 Hyunil Kim. All rights reserved.</footer>
  </article>`;

function initNaverMap() {
  const mapElement = document.querySelector('#naverMap');
  if (!window.naver?.maps) {
    mapElement.classList.add('is-error');
    mapElement.innerHTML = '<p>지도를 불러오지 못했습니다</p>';
    return;
  }

  const venuePosition = new window.naver.maps.LatLng(37.5406638, 127.0713352);
  const map = new window.naver.maps.Map(mapElement, {
    center: venuePosition,
    zoom: 17,
    minZoom: 15,
    maxZoom: 20,
    zoomControl: false,
    mapDataControl: false,
    scaleControl: false,
    logoControlOptions: { position: window.naver.maps.Position.BOTTOM_LEFT }
  });
  const marker = new window.naver.maps.Marker({ position: venuePosition, map });
  const label = new window.naver.maps.InfoWindow({
    content: '<div class="map-label"><strong>스타시티아트홀</strong><span>5층</span></div>',
    borderWidth: 0,
    backgroundColor: 'transparent',
    disableAnchor: true,
    pixelOffset: new window.naver.maps.Point(0, -8)
  });
  label.open(map, marker);
}

initNaverMap();

const toast = document.querySelector('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(button.dataset.copy); showToast(button.dataset.copyMessage || '계좌번호를 복사했습니다'); }
  catch { showToast('복사하지 못했습니다.'); }
}));

const backgroundMusic = document.querySelector('#backgroundMusic');
const musicControl = document.querySelector('#musicControl');
const musicStartAt = 0;
backgroundMusic.volume = 0.35;

function moveMusicToStart() {
  if (backgroundMusic.duration && musicStartAt < backgroundMusic.duration) backgroundMusic.currentTime = musicStartAt;
}

backgroundMusic.addEventListener('loadedmetadata', moveMusicToStart, { once: true });
backgroundMusic.addEventListener('ended', async () => {
  moveMusicToStart();
  try { await backgroundMusic.play(); setMusicState(true); } catch { setMusicState(false); }
});

function setMusicState(isPlaying) {
  musicControl.classList.toggle('is-playing', isPlaying);
  musicControl.setAttribute('aria-label', isPlaying ? '배경음악 일시정지' : '배경음악 재생');
  musicControl.setAttribute('aria-pressed', String(isPlaying));
}

backgroundMusic.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
document.addEventListener('pointerdown', async (event) => {
  if (!backgroundMusic.paused || event.target.closest('#musicControl')) return;
  try { await backgroundMusic.play(); setMusicState(true); } catch {}
}, { once: true });

musicControl.addEventListener('click', async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      setMusicState(true);
    } catch {
      showToast('음악을 재생하지 못했습니다');
    }
  } else {
    backgroundMusic.pause();
    setMusicState(false);
  }
});

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCount = document.querySelector('#lightboxCount');
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  lightboxImage.src = photos[currentPhoto];
  lightboxCount.textContent = `${currentPhoto + 1} / ${photos.length}`;
}
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  showPhoto(Number(button.dataset.photo)); lightbox.showModal();
}));
const galleryMain = document.querySelector('.gallery-main');
const galleryMainImage = galleryMain.querySelector('img');
const galleryItems = [...document.querySelectorAll('[data-select-photo]')];
let currentGalleryPhoto = 0;

function selectGalleryPhoto(index, scrollThumbnail = true) {
  currentGalleryPhoto = (index + photos.length) % photos.length;
  galleryMainImage.src = photos[currentGalleryPhoto];
  galleryMainImage.alt = `웨딩 갤러리 사진 ${currentGalleryPhoto + 1}`;
  galleryItems.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === currentGalleryPhoto));
  if (scrollThumbnail) galleryItems[currentGalleryPhoto].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

galleryItems.forEach(button => button.addEventListener('click', () => selectGalleryPhoto(Number(button.dataset.selectPhoto), false)));
galleryMain.querySelector('.gallery-main__nav--prev').addEventListener('click', () => selectGalleryPhoto(currentGalleryPhoto - 1));
galleryMain.querySelector('.gallery-main__nav--next').addEventListener('click', () => selectGalleryPhoto(currentGalleryPhoto + 1));

let swipeStartX = 0;
let swipeStartY = 0;
galleryMain.addEventListener('pointerdown', event => {
  swipeStartX = event.clientX;
  swipeStartY = event.clientY;
});
galleryMain.addEventListener('pointerup', event => {
  const distanceX = event.clientX - swipeStartX;
  const distanceY = event.clientY - swipeStartY;
  if (Math.abs(distanceX) < 40 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
  selectGalleryPhoto(currentGalleryPhoto + (distanceX < 0 ? 1 : -1));
});
document.querySelector('.lightbox__close').addEventListener('click', () => lightbox.close());
document.querySelector('.lightbox__nav--prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.querySelector('.lightbox__nav--next').addEventListener('click', () => showPhoto(currentPhoto + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

document.querySelector('#invitationCopy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(location.href); showToast('청첩장 주소를 복사했습니다'); }
  catch { showToast('복사하지 못했습니다'); }
});

function updateCountdown() {
  const diff = new Date(invitation.dateISO) - new Date();
  const remaining = Math.max(0, diff);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  const twoDigits = (value) => String(value).padStart(2, '0');
  document.querySelector('#countdown').innerHTML = `<div><strong>${days}</strong><small>DAYS</small></div><b>:</b><div><strong>${twoDigits(hours)}</strong><small>HOURS</small></div><b>:</b><div><strong>${twoDigits(minutes)}</strong><small>MINUTES</small></div><b>:</b><div><strong>${twoDigits(seconds)}</strong><small>SECONDS</small></div>`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
