# Apps Script 배포

`appsscript.json`과 `Code.gs`를 Apps Script 프로젝트에 복사합니다. Script Properties에 `MASTER_SHEET_ID`, `ROOT_FOLDER_ID`, `TRIGGER_MINUTES`를 등록한 뒤 `setupProject()`를 한 번 실행합니다. 웹 앱 배포 후 `doGet` URL을 GitHub Repository Variable `DRIVE_INDEX_ENDPOINT`에 등록합니다.

문의 메일을 사용하려면 `ADMIN_NOTIFICATION_EMAIL`, `INQUIRY_REPLY_TO_EMAIL`을 등록하고 `문의라우팅` 시트에 목적별 담당자 주소를 입력합니다. 최초 실행 시 Drive·Sheets·Mail 권한 승인과 웹 앱 배포가 필요합니다.
