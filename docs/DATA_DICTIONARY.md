# 데이터 사전

## 공개 최상위 객체

`schemaVersion`, `generatedAt`, `source`, `project`, `readiness`, `gates`, `technology`, `claims`, `documents`, `experiments`, `risks`, `roadmap`, `products`, `esg`, `consultationCategories`, `publicationPolicy`, `syncHealth`를 사용합니다.

## 공개 경계

- 문서: `publicationLevel=PUBLIC` 및 `publicationApproved=Y`인 경우만 발행
- Gate: `complete`, `in_progress`, `not_started`, `blocked`
- Claim 검증: `verified`, `partially_verified`, `verification_required`, `planned`, `rejected`
- 문서 원문 URL: PUBLIC 승인 자료에만 선택적으로 허용

## 준비도 계산

준비도는 공식 기술평가 등급이 아닌 내부 관리지표입니다. 상태 환산은 `complete=1.0`, `in_progress=0.5`, `not_started=0`, `blocked=0`이며 Gate 가중치 합계는 100이어야 합니다.
