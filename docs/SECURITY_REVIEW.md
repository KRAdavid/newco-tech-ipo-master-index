# 보안 검토

- 공개 JSON은 PUBLIC + Y 화이트리스트 기반이며 fail-closed입니다.
- 개인정보·원가 상세·분석 원시데이터·비공개 계약·Secret·Token은 저장소와 공개 JSON에 넣지 않습니다.
- Apps Script 입력은 허용 필드만 받고 HTML·수식 시작문자를 제거합니다.
- PII는 URL query string이나 GET으로 전송하지 않습니다.
- GitHub Actions Secret은 로그에 출력하지 않습니다.
- 실제 CORS·메일·권한 동작은 Apps Script 웹 앱 배포 후 브라우저에서 추가 검증해야 합니다.
