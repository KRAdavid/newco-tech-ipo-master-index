# 운영 설정 순서

1. Google Sheet에 `MASTER_SHEET_ID`, Drive Root에 `ROOT_FOLDER_ID`를 설정합니다.
2. Apps Script에서 `setupProject()`를 1회 실행해 시트와 트리거를 생성합니다.
3. 웹 앱으로 배포하고 `doGet` 공개 JSON, `doPost` 문의 endpoint를 실제 브라우저에서 확인합니다.
4. GitHub Repository Variable `DRIVE_INDEX_ENDPOINT`에 `doGet` URL을 입력합니다.
5. Actions의 workflow_dispatch로 동기화를 실행하고 `npm run validate:data` 결과를 확인합니다.
