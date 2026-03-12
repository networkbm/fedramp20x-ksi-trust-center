# FedRAMP KSI Trust Center (Demo)

It includes PASS / FAIL / PENDING status tracking, evidence linking, dashboard charts, and an Ollama-backed AI assistant, built as a portfolio GRC platform demo.

## Features

- Loads all FedRAMP 20x KSIs from JSON (67 items)
- Status mapping (PASS / FAIL / PENDING) driven by repo JSON
- Trust Center pages:
  - Overview
  - Compliance (KSIs) with filter + search
  - KSI detail page per indicator
  - Policies
  - Vulnerability Disclosure
- Console dashboard (internal demo view)
- Charts:
  - Donut breakdown (PASS/FAIL/PENDING)
  - Trend line over time (demo history)
- AI assistant with Ollama:
  - Matching KSI results based on the prompt
  - Prompt driven graphs
  - Validation aware responses using browser stored assessor records
- 3PAO KSI validation

## Getting Started

Install dependencies:

```bash
npm install
npm run dev
```

## Screenshots

![Screenshot 1](screenshots/CleanShot 2026-03-12 at 14.56.42@2x.png)

![Screenshot 2](screenshots/CleanShot 2026-03-12 at 14.57.16@2x.png)

![Screenshot 3](screenshots/CleanShot 2026-03-12 at 14.57.35@2x.png)

![Screenshot 4](screenshots/CleanShot 2026-03-12 at 14.58.32@2x.png)
