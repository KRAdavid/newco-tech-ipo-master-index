# 신규 제조법인 기술특례상장 Master Web Index

Google Drive와 Master Control Sheet를 원본으로 삼아, 공개 승인된 요약·메타데이터만 반응형 웹 대시보드에 발행하는 운영 플랫폼입니다. 현재 저장소는 `Conditional GO` 상태의 승인 폴백 스냅샷으로 동작하며, 정식 기술평가 등급이나 상업생산 실적을 표시하지 않습니다.

## 로컬 실행

```bash
pnpm install
pnpm dev
pnpm run validate:data
pnpm run typecheck
pnpm run build
```

GitHub Pages base path는 `/newco-tech-ipo-master-index/`입니다.

## 구조

- `src/`: React + TypeScript 운영 화면과 공개 데이터 타입
- `public/data/`: GitHub Pages에 배포되는 공개 JSON
- `apps-script/`: Drive 스캔, 공개 화이트리스트, 문의 수신 Apps Script
- `scripts/`: 동기화·스키마·개인정보 경계 검증
- `.github/workflows/`: Pages 배포, Drive polling, PR 검증, health check

## 연결 설정

Apps Script Script Properties에 `MASTER_SHEET_ID`, `ROOT_FOLDER_ID`, `TRIGGER_MINUTES`를 우선 설정합니다. 즉시 GitHub dispatch를 사용하려면 `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_FINE_GRAINED_PAT`를 추가합니다. GitHub Repository Variable에는 `DRIVE_INDEX_ENDPOINT`, 필요 시 Secret에 `DRIVE_SHARED_KEY`를 등록합니다.

## 공개정책

공개 JSON은 `publicationLevel = PUBLIC`이고 `publicationApproved = Y`인 항목만 허용합니다. `RESTRICTED`·`CONFIDENTIAL` 원문 URL, 개인정보, 토큰, 비공개 원자료는 fail-closed 검증으로 배포를 중단합니다. 81 g/L는 특허출원 실시예 제시값이며 질량수지·독립 반복·외부 교차분석이 필요한 상태입니다.

## 현재 미연결 상태

2026-08-10 기준 GitHub 원격 `KRAdavid/newco-tech-ipo-master-index`는 공개 조회되지 않았고, Drive endpoint도 설정되지 않았습니다. 따라서 로컬 구현과 승인 폴백 스냅샷까지 검증했으며 실제 GitHub push, Apps Script 배포 승인, Pages 공개 URL은 계정 권한과 운영값 입력 후 확인해야 합니다.
