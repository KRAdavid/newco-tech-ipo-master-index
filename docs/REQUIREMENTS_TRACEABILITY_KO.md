# Master Web Index 요구사항 증거 추적표

작성일: 2026-08-10  
기준: `pasted-text-1.txt` 제22절 완료 판정 기준

| 완료 기준 | 현재 판정 | 증거 |
|---|---|---|
| 공개 GitHub Pages 정상 오픈 | 검증 완료 | `https://kradavid.github.io/newco-tech-ipo-master-index/`, Pages run 31363083872 |
| 모바일·데스크톱 정상 동작 | 검증 완료 | Chromium desktop/mobile smoke test, console error 0, horizontal overflow 0 |
| Drive 변경내용 자동 반영 | 미검증 | Apps Script Web App과 `DRIVE_INDEX_ENDPOINT` 미설정 |
| PUBLIC + Y 외 자료 비노출 | 검증 완료 | `validate-public-index.mjs`, `validate-no-private-data.mjs`, 통합 경계 테스트 |
| 81 g/L 검증 필요 표시 | 검증 완료 | `CLM-001`, `verification_required`, limitation 필드 |
| 국제기탁을 효능 인증으로 표현하지 않음 | 검증 완료 | Claim-Evidence 정책과 공개 문구·금지 문구 |
| 등록특허·특허출원 구분 | 검증 완료 | `technology.registeredPatents`, `technology.patentApplications` |
| 네 제품의 현재·개발 단계 구분 | 검증 완료 | 제품별 `stage`·`status`, 관련 단위 테스트 |
| Gate 가중치 합계 100 | 검증 완료 | 공개 데이터 검증 및 Apps Script 검증 |
| 내부 준비도를 공식 평가등급으로 오인하지 않음 | 검증 완료 | `readiness.note`, `CONDITIONAL_GO` 표시 |
| RESTRICTED 원문 링크 비노출 | 검증 완료 | 공개 JSON URL scan 및 link check |
| 조건별 협업문의 자동 구성 | 코드 준비 완료 | 13개 category, 조건 질문, category payload |
| Gate·자료·제품 문맥 자동 반영 | 코드 준비 완료 | `context`, `gateId`, `documentId`, `product` payload |
| 상담정보 Google Sheets 기록 | 미검증 | Web App 배포 후 실제 `doPost` 필요 |
| 담당자 라우팅 이메일 전송 | 미검증 | 실제 recipient email과 Web App 실행 권한 필요 |
| 사용자 접수확인 메일 전송 | 미검증 | `INQUIRY_REPLY_TO_EMAIL`과 Mail 권한 필요 |
| 실패 시 입력 보존 | 코드·통합 테스트 완료 | form state 유지, retry 가능한 오류 상태, sync snapshot 보존 테스트 |
| GitHub Actions 정상 작동 | 검증 완료 | Pages runs 31363083872, scheduled health run 31361965331 |
| TypeScript 오류 없음 | 검증 완료 | `pnpm run typecheck` |
| 콘솔 오류 없음 | 검증 완료 | 배포 URL Chromium smoke test |
| 핵심 E2E 시나리오 | 부분 검증 | 탐색·Gate·검색·상담 단계 UI 검증; 실제 제출은 endpoint 설정 대기 |
| 운영문서 작성 | 검증 완료 | deployment checklist, runbook, security review, data dictionary, final report |

## 외부 설정 후 최종 검증 순서

1. Google Apps Script에 `apps-script/Code.gs`를 배포하고 `setupProject()`를 실행합니다.
2. `/exec` URL을 GitHub Repository Variable `DRIVE_INDEX_ENDPOINT`에 등록합니다.
3. 실제 운영 주소를 `ADMIN_NOTIFICATION_EMAIL`, `INQUIRY_REPLY_TO_EMAIL`에 등록합니다.
4. `VITE_CONSULTATION_ENDPOINT`를 Pages 빌드 환경에 연결합니다.
5. `pnpm run check:deployment`, Drive sync workflow, 문의 제출 E2E를 순서대로 실행합니다.

endpoint가 설정되기 전에는 공개 사이트가 승인된 fallback snapshot만 표시하며, 자동 동기화 완료로 표시하지 않습니다.
