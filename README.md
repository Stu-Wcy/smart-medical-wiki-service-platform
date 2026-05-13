# 智慧医疗百科服务软件平台

Smart Medical Wiki Service Platform — 医疗信息百科、在线预约挂号、AI 智能问诊一体化平台。

## 功能概览

- **医疗百科** — 疾病、药品、科室、医院信息查询
- **预约挂号** — 在线选择医院、科室、医生，按时间段预约
- **AI 问诊** — 基于通义千问的智能问诊对话
- **多角色管理** — 用户端 / 医生端 / 管理后台三套独立界面
- **订单与购物车** — 药品购买、订单管理
- **反馈系统** — 用户反馈提交与管理

## 技术栈

| 层 | 技术 |
|---|------|
| 前端 | React 18、TypeScript、Vite、Ant Design 5、Redux Toolkit、React Router 7 |
| 后端 | Spring Boot 3.0、Java 17、Spring Security + JWT、Spring Data JPA |
| 数据库 | MySQL 8、Redis |
| 对象存储 | 阿里云 OSS |
| AI 能力 | 通义千问（DashScope SDK） |
| API 文档 | Knife4j（OpenAPI 3） |

## 项目结构

```
├── backend/                # 后端 Spring Boot 服务
│   └── src/main/java/com/example/backend/
│       ├── common/         # 公共模块（配置、安全、工具类、基础实体）
│       └── modules/        # 业务模块（ai, appointment, department, disease, doctor, ...）
├── vite-project/           # 前端 React 应用
│   └── src/
│       ├── api/            # API 请求层
│       ├── components/     # 公共组件
│       ├── layouts/        # 布局（Base / Admin / Doctor / Auth）
│       ├── pages/          # 页面（admin, ai, auth, disease, doctor, medicine, ...）
│       ├── router/         # 路由配置与权限守卫
│       ├── store/          # Redux 状态管理
│       ├── types/          # TypeScript 类型定义
│       └── utils/          # 工具函数
├── sql/                    # 数据库表结构（仅 schema，不含数据）
└── medical_wiki.sql        # 数据库完整初始化脚本（含种子数据）
```

## 快速开始

### 环境要求

- JDK 17+
- Maven 3.6+
- Node.js 18+
- MySQL 8.0+
- Redis

### 数据库初始化

```bash
# 方式一：完整初始化（含种子数据）
mysql -u root -p < medical_wiki.sql

# 方式二：仅建表（无数据）
mysql -u root -p medical_wiki < sql/full_schema.sql
```

### 后端启动

```bash
cd backend

# 配置环境变量（或创建 application-local.yml）
export JWT_SECRET=your-jwt-secret
export DB_PASSWORD=your-db-password
export REDIS_PASSWORD=your-redis-password
export ALIYUN_OSS_ACCESS_KEY_ID=your-key-id
export ALIYUN_OSS_ACCESS_KEY_SECRET=your-key-secret
export ALIYUN_OSS_BUCKET_NAME=your-bucket
export TONGYI_API_KEY=your-tongyi-key

mvn spring-boot:run
```

服务启动在 `http://localhost:9090`，API 文档：`http://localhost:9090/doc.html`

### 前端启动

```bash
cd vite-project
npm install
npm run dev
```

前端运行在 `http://localhost:3001`，自动代理 `/api` 请求到后端。

### 生产构建

```bash
# 前端
cd vite-project && npm run build

# 后端
cd backend && mvn clean package
```

## API 概览

| 模块 | 路径前缀 | 说明 |
|------|----------|------|
| 认证 | `/api/auth` | 登录、注册 |
| 疾病 | `/api/disease`, `/api/admin/disease` | 疾病百科 |
| 药品 | `/api/medicine`, `/api/admin/medicine` | 药品信息 |
| 医院 | `/api/hospitals`, `/api/admin/hospitals` | 医院信息 |
| 科室 | `/api/departments`, `/api/admin/departments` | 科室分类 |
| 医生 | `/api/doctors`, `/api/admin/doctors` | 医生信息 |
| 预约 | `/api/appointments` | 预约挂号 |
| AI 问诊 | `/api/ai/consultations` | 智能问诊 |
| 订单 | `/api/orders` | 订单管理 |
| 公开接口 | `/api/public/**` | 无需认证 |

## 角色与权限

| 角色 | 路由前缀 | 说明 |
|------|----------|------|
| 游客 | `/` | 浏览公开信息（疾病、药品、医院等） |
| 用户 | `/user` | 预约挂号、AI 问诊、订单管理 |
| 医生 | `/doctor` | 查看预约、在线问诊 |
| 管理员 | `/admin` | 全平台数据管理 |
