# SisMCPL — Sistema de Mapeamento Comercial e Produtivo Local

> **"O sistema não deve apenas cadastrar dados. Ele deve transformar informação dispersa em decisão produtiva local."**

## 🌱 Sobre o Sistema

O **SisMCPL** é uma aplicação web para mapear comércios locais, produtores rurais, produtos, demandas comerciais e capacidades produtivas. Seu diferencial é cruzar automaticamente oferta e demanda para identificar **oportunidades produtivas locais**.

## 🚀 Stack Tecnológica

- **Frontend:** Next.js 16 (App Router) + TypeScript
- **Backend:** API Routes do Next.js
- **Banco de Dados:** SQLite (desenvolvimento local)
- **ORM:** Prisma
- **Estilização:** Tailwind CSS v4
- **Ícones:** Lucide React
- **Gerenciador de pacotes:** pnpm

---

## ⚙️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- pnpm (`npm install -g pnpm`)

### 1. Instalar Dependências

```bash
pnpm install
```

### 2. Configurar o Banco de Dados

O arquivo `.env` já está configurado com:
```env
DATABASE_URL="file:./dev.db"
```

### 3. Rodar as Migrations (criar o banco)

```bash
pnpm db:migrate
```

Quando solicitado, informe o nome da migration, por exemplo: `init`

### 4. Executar o Seed (dados iniciais)

```bash
pnpm db:seed
```

Isso criará:
- 13 categorias de produtos
- 12 produtos de exemplo
- 3 comércios fictícios
- 3 produtores fictícios
- 6 demandas comerciais
- 5 capacidades produtivas
- 4 visitas de campo

### 5. Iniciar o Servidor Local

```bash
pnpm dev
```

Acesse: **http://localhost:3000**

---

## 📋 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Inicia servidor de produção |
| `pnpm db:migrate` | Roda as migrations Prisma |
| `pnpm db:seed` | Executa o seed com dados iniciais |
| `pnpm db:studio` | Abre o Prisma Studio (interface visual do banco) |

---

## 📄 Funcionalidades Implementadas

### ✅ Páginas Disponíveis

| Página | Rota | Descrição |
|--------|------|-----------|
| Landing Page | `/` | Página institucional do sistema |
| Dashboard | `/dashboard` | Indicadores gerais e destaques |
| Comércios | `/comercios` | Listagem, cadastro e edição |
| Produtores | `/produtores` | Listagem, cadastro e edição |
| Produtos | `/produtos` | Catálogo com categorias |
| Demandas Comerciais | `/demandas` | O que os comércios precisam |
| Capacidades Produtivas | `/capacidades` | O que os produtores produzem |
| Visitas de Campo | `/visitas` | Histórico de visitas |
| Oportunidades | `/oportunidades` | Relatório cruzado de oportunidades |

### ✅ API Routes

Todas as entidades têm endpoints REST completos (GET, POST, PUT, DELETE):
- `/api/comercios`
- `/api/produtores`
- `/api/produtos`
- `/api/categorias`
- `/api/demandas`
- `/api/capacidades`
- `/api/visitas`
- `/api/dashboard` — Dados consolidados
- `/api/oportunidades` — Relatório cruzado

### ✅ Modelo de Dados

Entidades no banco:
- `Usuario` — preparado para autenticação futura
- `Comercio` — estabelecimentos comerciais
- `Produtor` — produtores rurais
- `CategoriaProduto` — categorias de produtos
- `Produto` — catálogo de produtos
- `DemandaComercial` — demandas de comércios
- `CapacidadeProdutiva` — capacidades de produtores
- `VisitaCampo` — visitas de campo
- `AnexoFoto` — preparado para fotos futuras

---

## 🎬 Arquivos de Mídia

Coloque os arquivos na pasta `public/media/`:
- `Impacto_do_SisMCPL.mp4` — Vídeo para a landing page
- `Tecnologia_para_unir_produtores_e_mercados_locais.m4a` — Áudio para a landing page

Veja as instruções completas em `public/media/LEIA-ME.md`.

---

## 🔮 Próximos Passos (Fase 2)

- [ ] Sistema de autenticação com login/senha
- [ ] Mapa interativo com Leaflet (comércios e produtores georreferenciados)
- [ ] Upload e gestão de fotos nas visitas
- [ ] Exportação de relatórios em CSV, Excel e PDF
- [ ] Painel de gestão de categorias de produtos
- [ ] Filtros avançados e paginação nas listagens
- [ ] Notificações de retorno de visita pendente
- [ ] Deploy em servidor (Railway, Render ou VPS)
- [ ] Banco PostgreSQL para produção
- [ ] Testes automatizados

---

## 📂 Estrutura de Arquivos

```
sismcpl/
├── prisma/
│   ├── schema.prisma      # Modelo de dados
│   ├── seed.ts            # Dados iniciais
│   └── dev.db             # Banco SQLite (gerado após migrate)
├── public/
│   └── media/             # Vídeos e áudios
├── src/
│   ├── app/
│   │   ├── (admin)/       # Layout administrativo
│   │   │   ├── dashboard/
│   │   │   ├── comercios/
│   │   │   ├── produtores/
│   │   │   ├── produtos/
│   │   │   ├── demandas/
│   │   │   ├── capacidades/
│   │   │   ├── visitas/
│   │   │   └── oportunidades/
│   │   ├── api/           # API Routes
│   │   ├── layout.tsx
│   │   ├── page.tsx       # Landing page
│   │   └── globals.css
│   ├── components/        # Componentes reutilizáveis
│   ├── lib/prisma.ts      # Singleton do cliente Prisma
│   ├── types/index.ts     # Tipos TypeScript
│   └── utils/index.ts     # Funções utilitárias
└── README.md
```

---

*SisMCPL — Transformando informação dispersa em decisão produtiva local.*
