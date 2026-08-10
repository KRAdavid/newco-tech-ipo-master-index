# 배포 활성화 체크리스트

## 현재 확인된 완료 항목

- Google Drive Master Root와 Master Control Sheet 연결
- 16개 운영 탭 및 문의 라우팅 13개 유형 구성
- PUBLIC + 공개승인 Y + 개인정보점검 완료 기준의 공개 경계
- 최신 Apps Script 원본을 Drive `Master_Web_Index_Code.gs`에 동기화
- React/Vite 공개 Master Web Index와 GitHub Pages 배포
- GitHub Actions의 데이터 검증·비공개 데이터 검사·빌드·링크 검사
- 모바일·데스크톱 실사이트 smoke test 및 협업문의 카테고리 QA

## 사용자 Google 계정에서 필요한 1회 작업

1. `기술특례상장_Master_Control` Google Sheet를 엽니다.
2. 확장 프로그램 → Apps Script를 선택합니다.
3. Drive의 `Master_Web_Index_Code.gs` 또는 저장소의 `apps-script/Code.gs` 전체를 붙여넣습니다.
4. Script Properties를 등록합니다.
   - `MASTER_SHEET_ID` = `1yN_TuLZrAM2mHMEJVHhBTCNs_PJ5M8mS9TwXMK0wNdg`
   - `ROOT_FOLDER_ID` = `1Qrmef1g3TEXWHcrI-6NNwfzaAK324K_m`
   - `TRIGGER_MINUTES` = `30`
   - 알림 수신 이메일은 실제 운영 주소를 확인한 뒤 `ADMIN_NOTIFICATION_EMAIL`, `INQUIRY_REPLY_TO_EMAIL`에 등록합니다.
5. `setupProject()`를 한 번 실행하고 Drive·Sheet 권한을 승인합니다.
6. Apps Script를 웹 앱으로 배포하고 `doGet`/`doPost` URL을 확인합니다.

## GitHub 설정

- Repository Variable `DRIVE_INDEX_ENDPOINT` = Apps Script Web App URL
- 선택 Secret `DRIVE_SHARED_KEY` = Apps Script 측 검증 키

URL과 키는 추정하거나 저장소에 하드코딩하지 않습니다. 설정 전에는 승인된 fallback snapshot이 유지됩니다.

## 운영 확인

- `pnpm run validate:data`
- `pnpm run validate:data` (공개 스키마 + 비공개 데이터 검사)
- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm test`
- `pnpm run build`
- `pnpm run check:links`
- `node scripts/check-deployment-health.mjs` (endpoint 미설정 시 경고, 설정 후 응답·스키마·신선도·문의 endpoint 확인)
- Drive sync workflow 실행 후 `syncHealth.mode=apps-script` 확인
- 공개 JSON에 RESTRICTED·CONFIDENTIAL 원본 URL, 개인정보, Secret·Token이 없는지 확인
- 상담 제출 후 `협업문의` 행 생성, 라우팅, 담당자 알림, 신청자 확인 메일, requestId를 end-to-end 확인
