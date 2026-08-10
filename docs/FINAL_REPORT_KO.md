# 신규 제조법인 기술특례상장 Master Web Index
## 구현·검증 현황 보고서

작성 기준일: 2026-08-10

## 1. 현재 산출물

- 저장소: https://github.com/KRAdavid/newco-tech-ipo-master-index
- 공개 사이트: https://kradavid.github.io/newco-tech-ipo-master-index/
- 공개 JSON: https://kradavid.github.io/newco-tech-ipo-master-index/data/master-index.json
- Master Control Sheet: https://docs.google.com/spreadsheets/d/1yN_TuLZrAM2mHMEJVHhBTCNs_PJ5M8mS9TwXMK0wNdg/edit
- Drive Master Root: `1Qrmef1g3TEXWHcrI-6NNwfzaAK324K_m`

## 2. 구현 완료

- Google Drive 원본·Master Control Sheet·공개 JSON 구조
- 10개 Gate와 가중치 합계 100 검증
- Claim-Evidence, 기술·실험·리스크·로드맵·제품·ESG 공개 데이터 영역
- PUBLIC + 공개승인 Y + 개인정보점검 완료 기준의 fail-closed 공개 경계
- 통합 검색 및 Gate·자료·Claim·제품·실험 결과 연결
- 13개 조건형 협업문의 카테고리와 categoryId payload 연결
- Gate·제품·자료 문맥 연결, 조건 질문, 미리보기, 동의, 오류 표시
- Apps Script `doGet`/`doPost`, Drive scan/upsert, routing, rate limit, audit log 코드
- GitHub Pages·Drive sync·scheduled health check workflow

## 3. 실제 검증 결과

- `pnpm run validate:data`: 통과
- `pnpm run lint`: 통과
- `pnpm run typecheck`: 통과
- `pnpm test`: 5 tests 통과
- `pnpm run build`: 통과
- Apps Script syntax check: 통과
- Pages 배포: 성공, latest health run `31361965331`
- 실사이트 Chromium desktop/mobile smoke test: 콘솔 오류 0, 가로 overflow 0
- 공개 JSON: 10개 Gate, 가중치 100, 상담 유형 13개

## 4. Drive 등록 원본

- `CELLPINDA Investor Deck (2026)` PDF를 `10_투자_IR_데이터룸`에 등록
- 문서 ID: `DOC-0010`
- Drive file ID: `1eEyJbHw5rqyz3pp7JxGyAoVFtzDRKcXt`
- 공개 JSON에는 원본 PDF URL을 노출하지 않음
- 최신 Apps Script 원본: `Master_Web_Index_Code.gs`

## 5. 아직 필요한 사용자 계정 작업

Apps Script Web App 배포는 Google 계정 권한과 Apps Script 실행 승인 없이는 검증할 수 없습니다.

1. Master Control Sheet에서 Apps Script를 엽니다.
2. Drive의 최신 `Master_Web_Index_Code.gs`를 붙여넣습니다.
3. `MASTER_SHEET_ID`, `ROOT_FOLDER_ID`, `TRIGGER_MINUTES`를 등록합니다.
4. `setupProject()`를 실행하고 권한을 승인합니다.
5. Web App으로 배포합니다.
6. GitHub Repository Variable `DRIVE_INDEX_ENDPOINT`에 배포 URL을 등록합니다.
7. 실제 수신 이메일을 확인한 뒤 `ADMIN_NOTIFICATION_EMAIL`, `INQUIRY_REPLY_TO_EMAIL`을 설정합니다.

endpoint가 등록되기 전에는 사이트가 승인된 fallback snapshot을 유지합니다. URL·토큰·수신 이메일은 추정하거나 코드에 하드코딩하지 않습니다.

## 6. 운영 판정

현재 판정: `CONDITIONAL_GO`

공개 웹·정적 검증·공개 경계·협업 UX는 운영 가능한 상태입니다. Drive 실시간 동기화와 문의 메일 end-to-end는 Apps Script Web App 배포 및 실제 운영 이메일 설정 이후 최종 승인 대상으로 남아 있습니다.
## 7. 추가 보강 (2026-08-10)

- 공개 기술 모델에서 `registeredPatents`와 `patentApplications`를 분리했습니다. 등록 특허 공개 자료가 없을 때는 빈 배열로 유지하고, 기존 화면 호환 필드에도 “등록 특허: 공개 자료 없음”을 표시합니다.
- Apps Script 공개 인덱스 검증 단계에서도 구형 `patents` 열을 출원 목록으로 정규화하도록 보강했습니다.
- Apps Script 계약 테스트와 공개 인덱스 통합 테스트를 추가해 총 4개 테스트 파일, 11개 테스트가 통과했습니다.
