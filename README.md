## **1. Project Overview**
A Playwright and TypeScript-based QA automation project using the QA Shop application as the system under test. The project covers UI, API, database, and end-to-end testing, with Docker providing the application and PostgreSQL environment. The framework will progressively introduce CI/CD and AI-assisted QA capabilities.

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
