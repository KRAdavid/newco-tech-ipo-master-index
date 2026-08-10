# 구현현황

## 완료

- React/Vite 반응형 Master Web Index shell
- 종합현황, 핵심기술, Gate, 증빙, 제품, 로드맵, 리스크 및 확장영역 화면
- 10개 Gate와 가중치 100 검증
- Claim-Evidence Matrix 및 검증 한계 표시
- PUBLIC + Y 필터, RESTRICTED 원문 URL 비노출
- 조건형 협업문의 UI와 현재 Gate 문맥 연결
- Apps Script scaffold 및 GitHub Actions workflow
- 공개 데이터·개인정보 경계 검증
- 조건형 문의 honeypot·최소작성시간·화이트리스트·라우팅·내부/사용자 메일 코드
- 해시 기반 Gate URL 문맥과 공개 데이터 단위 테스트

## 미검증/차단

- GitHub 원격 접근·push·Pages URL: 원격 저장소 조회 불가
- Google Drive endpoint와 Apps Script 웹 앱: 운영값·최초 권한 승인 필요
- 실제 이메일 라우팅: 수신 주소와 Apps Script 배포 후 브라우저 검증 필요
- Chromium screenshot 기반 시각 QA: 현재 연결된 브라우저 자동화 도구 부재
- 실제 GitHub Actions 실행: 원격 저장소가 404라 workflow dispatch 불가
