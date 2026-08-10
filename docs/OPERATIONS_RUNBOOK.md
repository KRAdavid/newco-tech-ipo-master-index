# 운영·복구 런북

## 정상 동기화

1. Master Control Sheet에서 공개정책과 공개승인을 검토합니다.
2. Apps Script `scanDriveAndUpsertDocuments()`를 실행합니다.
3. `buildPublicIndex()`와 `validatePublicIndex()` 결과를 확인합니다.
4. GitHub Actions `Drive index sync`를 `workflow_dispatch`로 실행합니다.
5. 공개 URL에서 마지막 승인 동기화 시각과 변경 내용을 확인합니다.

## endpoint 장애

`DRIVE_INDEX_ENDPOINT` 호출이 실패하면 기존 승인 snapshot을 유지합니다. 마지막 동기화 시각을 임의로 갱신하지 않으며, workflow 로그에 경고를 남깁니다.

## 복구

`git log`에서 마지막 정상 `public/data/master-index.json` 커밋을 확인한 뒤 해당 파일만 복원하고, 공개경계 검증 후 Pages를 재배포합니다. 원본 Drive 자료는 삭제하지 않습니다.
