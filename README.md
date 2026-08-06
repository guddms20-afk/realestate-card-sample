# 프리미엄 모바일 명함 템플릿

이 폴더는 그대로 GitHub 저장소에 올리면 작동하는 완성형 모바일 명함입니다. 고객 정보는 `config.json` 한 파일에서 바꿉니다.

## 가장 빠른 사용 순서

1. `config.json`을 메모장이나 코드 편집기로 엽니다.
2. 이름, 연락처, 소개, 링크, 주소, 서비스와 색상을 고객 정보로 바꿉니다.
3. 고객 사진을 WebP 형식으로 준비해 `images/profile.webp`를 교체합니다.
4. 폴더 안의 파일과 `images` 폴더를 GitHub 저장소의 최상위에 모두 올립니다.
5. GitHub의 **Settings → Pages → Deploy from a branch → main / root**를 선택합니다.
6. 공개 주소에서 모든 버튼과 연락처 저장 기능을 확인합니다.

> `index.html`을 컴퓨터에서 바로 열면 브라우저 보안 정책 때문에 `config.json`이 적용되지 않고 기본 예시가 보일 수 있습니다. GitHub Pages에 올리면 정상 적용됩니다.

## 절대 바꾸지 않을 것

- 파일 이름: `index.html`, `style.css`, `script.js`, `config.json`
- 이미지 폴더 이름: `images`
- 프로필 사진 기본 경로: `images/profile.webp`

대소문자까지 같아야 GitHub Pages에서 사진이 정상적으로 표시됩니다.

## config.json 수정 포인트

- 기본 정보: `company`, `name`, `title`, `phone`, `email`
- 소개 문구: `headline`, `intro`, `aboutTitle`, `aboutText1`, `aboutText2`
- 버튼 링크: `links` 안의 `kakao`, `booking`, `map`, `instagram`, `website`
- 색상: `theme` 안의 색상값
- 콘텐츠: `strengths`, `services`, `reviews`, `faq`
- 위치 정보: `address`, `addressPlain`, `hours`, `parking`

줄바꿈은 문구 안에 `<br>`을 넣어 표현할 수 있습니다. 강조하고 싶은 문구는 제목에서 `<em>강조 문구</em>`로 감쌀 수 있습니다.

## 이미지 교체

- 권장 비율: 세로 4:5
- 권장 크기: 1200 × 1500px 이상
- 권장 형식: WebP
- 파일명: `profile.webp`

사진이 없거나 경로가 틀리면 `images/profile-placeholder.svg`가 자동 표시됩니다.

## 연락처 저장

페이지 위쪽의 **연락처 저장** 버튼은 `config.json`에 입력한 이름, 회사, 직책, 전화, 이메일, 주소와 홈페이지를 사용해 VCF 파일을 자동으로 만듭니다. 포함된 `contact.vcf`는 GitHub 및 일부 기기 호환을 위한 예시 파일입니다.

## 납품 전 필수 확인

- 모든 예시 전화번호와 링크를 실제 정보로 교체했는가
- 후기와 수치를 실제 정보로 교체했거나 예시임을 명시했는가
- 프로필 사진이 모바일에서 자연스럽게 잘리는가
- 전화, 카카오, 예약, 지도, 홈페이지 버튼이 올바른 페이지로 연결되는가
- 연락처 저장 후 이름과 전화번호가 정확한가
- 병원·법률·부동산 등 업종별 광고 규정을 확인했는가

문제가 생겼을 때는 먼저 `config.json`의 쉼표 누락, 따옴표 누락, 파일명 대소문자를 확인하세요.
