# OMGProject (Offline Meeting Gathering Project)

## :date:개발 기간
**2022.01.20 - 2022.02.25**

## :tv:홈페이지
**AWS 프리티어 만료로 인한 서버 종료..**

## :family:제작 동기

- 개발 서비스의 흐름을 프론트엔드부터 백엔드까지 직접 다루어보고 싶었고, 그 과정에서 이전에 해보았던 내용(서버 구축, API 설계, OPEN API 활용, AWS 기능 등)들을 정리하고 싶었다.
- 나아가 이전에 구현해 보지 않았던 API(비밀번호 찾기, 자동 로그인, 사용해보지 않았던 OPEN API 등)를 넣어 기본적인 기능을 하는 서비스를 구현하고자 하였다.
- 그 과정에서 다양한 사람들을 만나기를 좋아해, 간단한 소재로도 소꼽친구를 만들 기회를 제공해줄 수 있는 서비스를 기획해보았다.

## :wrench:기술 스택

- **Backend**: Node.js(Express)
- **Frontend**: Html/CSS/JS(EJS), Jquery
- **AWS Cloud**: S3, RDS, EC2, Route53
- **Naver Cloud**: SENS(SMS)

## :book:주요 기능

- **Filter** 및 **Search** 기능을 통해 자신이 찾고자 하는 정보만을 검색 할 수 있도록 해주었다. (Backend)
- **SSL Outh를 통해 Https로 통신**할 수 있도록 해주었다. (Backend)
- **최근 2주의 데이터만 노출**시켜, 자신이 원하는 날짜에 올라와있는 만남들을 확인 할 수 있도록 해주었다. (Frontend + Backend)
- 만나는 장소의 **위치를 지도**에 띄워주어 시각적으로 한눈에 알 수 있도록 해주었다. (Frontend + Backend)
- 자신이 작성한 만남들을 **스케줄러**에 띄워 한눈에 파악 가능하도록 해주었다. (Frontend + Backend)
- 자신이 작성한 만남들을 간략하게 요약해 리스트로 제공해주었다. (Frontend + Backend)
- 핸드폰 **번호를 인증**한 사용자만 글을 작성 할 수 있도록 해주엇다. (Backend)
- 자신을 조금이라도 드러낼 수 있도록 **프로필 사진** 기능을 넣어주었다. (Backend)
- **Paging** 기능을 통해 사용자가 조금 더 보기 편할 수 있도록 해주었다. (Backend)
- **광고 배너**를 통해 다양한 대회 혹은 컨텐츠도 노출 시킬 수 있도록 해주었다. (Frontend)

## :bangbang:피드백

- **JWT Access Token, Refresh Token**을 통해 쿠키를 사용하는 방식으로 구현해보기
- Test를 명확히 하여 오류 발생 빈도 최소화하기
- **Docker**를 통한 배포 진행하기
- **Promise와 ES6 문법** 완벽하게 숙지하기
- **SocketIO**를 사용하여 채팅 기능 구현하기
- 불필요한 **Code Refactoring** 하기
- Vue.js와 같은 프레임워크를 통해 프론트엔드 개발 시간 단축 > **백엔드 개발에 포커스**
- 몇몇 Data를 DB에 넣을지, API로 만들지에 대해 **성능과 관련하여 고민**해보기

## :tv:주요 화면

> **`로그인`**
![Login](https://user-images.githubusercontent.com/75744297/155801314-4610b09b-8c40-4131-ae87-9a1f65de6939.PNG)

> **`회원가입`**
![Join](https://user-images.githubusercontent.com/75744297/155802239-44b83cf0-904e-4999-bb98-543e2c57835d.PNG)

> **`메인화면`**
![MainPage](https://user-images.githubusercontent.com/75744297/155799465-2f1cfe97-f0d3-4cc8-9a12-32158920f0f9.PNG)

> **`카테고리별 화면`**
![MeetingCategory](https://user-images.githubusercontent.com/75744297/155800851-1becac55-1005-47e9-b6f3-88affffc5494.PNG)

> **`작성 글 상세정보 -1`**
![MeetingDetail](https://user-images.githubusercontent.com/75744297/155799735-cbbe4863-ff62-465c-8d96-5883b82ea82c.PNG)

> **`작성 글 상세정보 -2`**
![MeetingDetail2](https://user-images.githubusercontent.com/75744297/155801145-9e66c6ca-4ba2-4f4f-9f73-dd1969466522.PNG)

> **`만남 스케줄 관리`**
![MeetSchedule](https://user-images.githubusercontent.com/75744297/155799977-2c718ddb-f36f-49c6-ba70-600aa4e9f147.PNG)

> **`작성 글 관리`**
![MeetManagement](https://user-images.githubusercontent.com/75744297/155800125-e711e04d-7844-49fe-91e6-76418f26df9c.PNG)

> **`프로필 관리`**
![MyProfile](https://user-images.githubusercontent.com/75744297/155800622-f048cb9f-fb39-4c8a-9bbf-ca414fe4938f.PNG)

> **`공지사항 및 자주하는 질문`**
![NoticeQuestion](https://user-images.githubusercontent.com/75744297/155800999-e60fdff4-28f1-47fe-9dc0-1782cc429747.PNG)
