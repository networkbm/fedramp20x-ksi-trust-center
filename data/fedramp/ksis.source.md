# FedRAMP 20x Key Security Indicators – Source

This project uses the official FedRAMP 20x Key Security Indicators (KSIs)
as its source of truth for compliance objectives and descriptions.

## Source
- Repository: FedRAMP official documentation
- File: FRMR.KSI.key-security-indicators.json
- URL:
  https://github.com/FedRAMP/docs/blob/main/data/FRMR.KSI.key-security-indicators.json

## Usage in this Project
- KSI definitions and descriptions are used verbatim.
- PASS / FAIL / PENDING status values are **demonstration-only** and are
  not an official FedRAMP assessment or authorization.
- This project is intended for educational and portfolio demonstration
  purposes only.

## Notes
- Status evaluations are stored separately in:
  `data/status/ksi-status.json`
- This separation mirrors real-world GRC tooling by distinguishing
  authoritative framework content from implementation-specific evaluations.
