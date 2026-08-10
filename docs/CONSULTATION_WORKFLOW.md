# 협업문의 흐름

상담 목적 선택 → 목적별 추가 질문 → 현재 Gate·문서·제품 문맥 연결 → 템플릿 요약 미리보기 → 개인정보 동의 → Apps Script `doPost` → 협업문의 Sheet 기록 → 문의라우팅에 따른 내부 알림 → 사용자 접수확인 메일 순서입니다.

초기 버전은 파일 업로드와 OpenAI API를 사용하지 않습니다. 실패 시 입력값을 화면에 유지하고 재시도할 수 있어야 하며, 서버는 honeypot·최소 작성시간·화이트리스트·길이 제한·수식주입 방지를 적용합니다.
# 운영 endpoint 활성화 메모

상담 제출은 `VITE_CONSULTATION_ENDPOINT`가 설정된 빌드에서만 Apps Script `doPost`로 전송된다. GitHub Pages 빌드에서는 Repository Variable `DRIVE_INDEX_ENDPOINT`를 이 값으로 주입하므로, 공개 피드 GET endpoint와 상담 POST endpoint를 동일한 Web App URL로 사용할 수 있다.

endpoint가 비어 있으면 화면은 성공을 표시하지 않고 운영자 안내 오류를 표시한다. 따라서 로컬·fallback snapshot 환경에서 문의가 실제 접수된 것처럼 보이는 mock 성공 처리는 사용하지 않는다.
