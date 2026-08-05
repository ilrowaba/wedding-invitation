# 모바일 청첩장

`design.fig`의 세로형 레이아웃과 내장 사진을 바탕으로 만든 반응형 모바일 청첩장입니다.

## 실행

```bash
npm install
npm run dev
```

## 내용 수정

이름, 날짜, 장소, 계좌번호, 지도 링크는 `src.js` 상단의 `invitation` 객체에서 한 번에 수정할 수 있습니다.

## 사진 교체

`public/assets/photos` 안의 아래 파일을 같은 이름으로 덮어쓰면 됩니다.

- `hero.jpg`: 첫 화면 세로 사진
- `couple.jpg`: 초대글 아래 메인 사진
- `detail.jpg`: Invitation 섹션 하단 사진
- `gallery-01.jpg` ~ `gallery-18.jpg`: 갤러리 사진

가로·세로 비율이 달라도 `object-fit: cover`로 배치됩니다. 웹 성능을 위해 긴 변 기준 1,600~2,000px, JPEG 품질 80% 전후를 권장합니다.

## 폰트

### Mina Regular

전달받은 Adobe Fonts 링크를 `index.html`에 연결했고, Hero의 `WE'RE GETTING MARRIED` 문구에만 아래처럼 적용했습니다.

```css
font-family: 'mina', serif;
font-weight: 400;
```

Adobe Fonts 프로젝트의 허용 도메인에 실제 배포 도메인을 추가해야 운영 사이트에서도 표시됩니다.

### Zen Serif

영문 제목은 `Zen Old Mincho`를 Google Fonts로 연결해 사용합니다. 보유한 별도 Zen Serif 웹폰트 파일을 쓰려면:

1. WOFF2 파일을 `public/assets/fonts/zen-serif.woff2`로 넣습니다.
2. `style.css` 상단의 `@font-face`가 자동으로 해당 파일을 우선 사용합니다.
3. 실제 폰트 패밀리명이 다르더라도 CSS 내부 별칭은 `Zen Serif Local`이므로 다른 수정은 필요 없습니다.

폰트 파일은 웹 사용 라이선스가 있는 파일만 사용해 주세요.

### 마루부리

네이버 한글한글아름답게 CDN을 `index.html`에 연결했고, 청첩장의 한글 본문·이름·안내 문구에 `MaruBuri`를 적용했습니다.
