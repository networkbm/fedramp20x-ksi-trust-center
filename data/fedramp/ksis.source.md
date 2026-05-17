# FedRAMP 20x Key Security Indicators – Source

This project uses the official FedRAMP 20x Key Security Indicators (KSIs)
as its source of truth for compliance objectives and descriptions.

## Source
- Repository: FedRAMP official documentation
- File: FRMR.documentation.json
- URL:
  https://github.com/FedRAMP/docs/blob/main/FRMR.documentation.json
- Version reviewed: 0.9.43-beta
- Source last updated: 2026-04-08

## Usage in this Project
- KSI definitions and descriptions are sourced from FedRAMP's machine-readable documentation.
- PASS / FAIL / PENDING status values are **demonstration-only** and are
  not an official FedRAMP assessment or authorization.
- This project is intended for educational and portfolio demonstration
  purposes only.

## Notes
- Status evaluations are stored separately in:
  `data/status/ksi-status.json`
- This separation mirrors real-world GRC tooling by distinguishing
  authoritative framework content from implementation-specific evaluations.
