# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Smart Medical Wiki Service Platform (智慧医疗百科服务软件平台) — a full-stack medical information system with appointment booking, AI-powered consultations, medicine/disease encyclopedia, and role-based admin dashboards.

## Monorepo Structure

```
D:/code/
├── backend/          # Spring Boot 3.0 (Java 17) API server
├── vite-project/     # React 18 + TypeScript frontend (Vite)
└── medical_wiki.sql  # Database schema/seed (MySQL)
```

## Commands

### Backend (Maven, Java 17)

```bash
cd backend
mvn spring-boot:run          # Start dev server on port 9090
mvn clean package            # Build JAR
mvn test                     # Run tests
mvn test -Dtest=ClassName    # Run a single test class
```

### Frontend (Vite, Node)

```bash
cd vite-project
npm run dev        # Dev server on port 3001 (proxies /api → localhost:9090)
npm run build      # Type-check (tsc -b) + Vite production build
npm run lint       # ESLint
```

## Architecture

### Backend (`backend/src/main/java/com/example/backend/`)

**Layered module structure** under `modules/`, each module contains: `controller/`, `service/` (+ `impl/`), `repository/`, `dto/`, `entity/`, `enums/`.

Modules: `ai`, `appointment`, `consult`, `department`, `disease`, `doctor`, `feedback`, `hospital`, `medicine`, `order`, `patient`, `schedule`, `user`

**Cross-cutting concerns** in `common/`:
- `base/` — `BaseEntity` (JPA auditing with `createdTime`, `updatedTime`, `deleted` soft-delete flag), `Result<T>` response envelope, `PageResult<T>` pagination wrapper
- `config/` — `SecurityConfig` (stateless JWT + Spring Security), `RedisConfig`, `OssConfig` (Aliyun OSS), `WebSocketConfig`
- `security/` — `JwtAuthenticationFilter`, custom entry point and access denied handlers
- `utils/` — `JwtUtils`, `SecurityUtils`, `OssUtils`, `RedisKeyUtils`

**Key patterns:**
- All API responses wrapped in `Result<T>` with `{code, message, data}` format (200 = success, 500 = error)
- Soft-delete via `deleted` boolean field on all entities (filter in JPA config)
- JWT auth with stateless sessions; public endpoints under `/api/auth/**` and `/api/public/**`
- Lombok `@Data` + `@Accessors(chain = true)` on entities and DTOs
- Knife4j (OpenAPI 3) for API docs at `/doc.html`
- DashScope SDK (通义千问) for AI consultation features

### Frontend (`vite-project/src/`)

**Path aliases** (defined in `vite.config.ts` and `tsconfig.json`):
- `@/` → `src/`, `@components`, `@pages`, `@hooks`, `@utils`, `@assets`, `@styles`, `@api`, `@store`, `@types`

**Three role-based layouts** with route guards:
- `/` — Public + authenticated user pages (`BaseLayout`, `AuthGuard`)
- `/admin` — Admin dashboard (`AdminLayout`, `AdminGuard`)
- `/doctor` — Doctor portal (`DoctorLayout`, `DoctorGuard`)

**State management:** Redux Toolkit (`@store/slices/`) for auth, cart, admin entities (medicines, diseases, users). All API calls go through a centralized Axios instance (`@utils/request.ts`) with JWT token injection from Redux store and `/api` base URL (proxied to backend).

**Styling:** Less CSS with CSS Modules (`*.module.less`) for component-scoped styles.

## Dev Environment

- Backend: `http://localhost:9090`
- Frontend: `http://localhost:3001` (proxies `/api/*` → backend)
- API docs: `http://localhost:9090/doc.html` (Knife4j)
- MySQL database initialized from `medical_wiki.sql`
- Config: `backend/src/main/resources/application.yml` — secrets use `${ENV_VAR:default}` pattern
