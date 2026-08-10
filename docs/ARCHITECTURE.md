# Architecture

`Google Drive → Master Control Sheet → Apps Script → PUBLIC JSON endpoint → GitHub Actions → public/data/master-index.json → React/Vite → GitHub Pages` 구조입니다. Endpoint가 없으면 snapshot을 유지하고 동기화 시각을 허위 갱신하지 않습니다. 모든 자동화는 idempotent를 목표로 하며, 수동으로 입력한 공개등급·요약·Gate 연결은 Drive 스캔이 덮어쓰지 않습니다.
