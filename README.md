## **1. Project Overview**
A Playwright and TypeScript-based QA automation project using the QA Shop application as the system under test. The project covers UI, API, database, and end-to-end testing, with Docker providing the environment for repeatable execution across different stages.

## **2. Project Objective**
- Automate critical UI workflows using Playwright + TypeScript
- Automate and validate REST API functionality
- Validate application data against PostgreSQL
- Implement end-to-end UI → API → Database testing
- Generate test reports and integrate tests into CI/CD
- Build reusable and maintainable automation components
- Introduce AI-assisted QA capabilities
  - Test generation
  - Test data generation
  - Failure analysis
  - Root-cause assistance
  - Intelligent test recommendations

## **3. Architecture**
```text
                    QA SHOP TEST AUTOMATION
                              │
                              ▼
                    Playwright + TypeScript
                              │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
      UI Tests             API Tests             DB Tests
         │                     │                     │
         ▼                     ▼                     ▼
    ┌──────────┐          ┌──────────┐        ┌────────────┐
    │ QA Shop  │─────────▶│ QA Shop  │───────▶│ PostgreSQL │
    │  Web UI  │          │ REST API │        │  Database  │
    └──────────┘          └──────────┘        └────────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               ▼
                      Integration Tests
                      UI → API → Database
                               │
                               ▼
                     ┌──────────────────┐
                     │    AI QA Layer   │
                     │                  │
                     │ Test Generation  │
                     │ Failure Analysis │
                     │ Test Suggestions │
                     │ Test Data        │
                     │ Root Cause Help  │
                     └────────┬─────────┘
                              │
                              ▼
                       Test Reporting
                              │
                              ▼
                     GitHub Actions CI/CD
```

## **4. Technology Stack**

| Category | Technology |
| --- | --- |
| Test Automation | Playwright |
| Programming Language | TypeScript |
| Runtime | Node.js |
| Application Under Test | QA Shop |
| API Testing | Playwright APIRequestContext / REST API |
| Database | PostgreSQL |
| Test Environment | Docker / Docker Compose |
| CI/CD | GitHub Actions |
| Test Reporting | Playwright HTML Reporter |
| Version Control | Git / GitHub |
| AI / QE | AI-assisted test generation, test data generation, failure analysis and QA recommendations |

## 4. Test Cases

### UI Automation — Product Browsing

The Product Browsing suite covers eight key storefront scenarios:

| Test ID | Scenario |
|---|---|
| PB-UI-001 | Product catalogue loads successfully |
| PB-UI-002 | Search for an existing product |
| PB-UI-003 | Filter products by Shirts category |
| PB-UI-004 | View product details |
| PB-UI-005 | Display a message when no products match the search |
| PB-UI-006 | Update and clear product search |
| PB-UI-007 | Sort products by price from low to high |
| PB-UI-008 | Sort products by price from high to low |

**Execution:** `npx playwright test tests/ui/product-browsing.spec.ts --project=chromium`

**Reporting:** Playwright HTML Reporter