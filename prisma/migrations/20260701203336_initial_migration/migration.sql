-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil" TEXT NOT NULL DEFAULT 'agente',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Comercio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT,
    "bairro" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "porte" TEXT,
    "compraDeProdutoresLocais" BOOLEAN NOT NULL DEFAULT false,
    "interesseEmComprarLocal" BOOLEAN NOT NULL DEFAULT false,
    "observacoes" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Produtor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "nomePropriedade" TEXT,
    "telefone" TEXT NOT NULL,
    "documento" TEXT,
    "localidade" TEXT NOT NULL,
    "tamanhoPropriedade" REAL,
    "tipoPropriedade" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "possuiTransporte" BOOLEAN NOT NULL DEFAULT false,
    "possuiIrrigacao" BOOLEAN NOT NULL DEFAULT false,
    "possuiAgua" BOOLEAN NOT NULL DEFAULT true,
    "possuiMaoDeObra" BOOLEAN NOT NULL DEFAULT false,
    "possuiDocumentacaoVenda" BOOLEAN NOT NULL DEFAULT false,
    "interesseVenderLocal" BOOLEAN NOT NULL DEFAULT false,
    "observacoes" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CategoriaProduto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "unidadeMedida" TEXT NOT NULL,
    "perecivel" BOOLEAN NOT NULL DEFAULT false,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "observacoes" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaProduto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DemandaComercial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comercioId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" REAL NOT NULL,
    "unidadeMedida" TEXT NOT NULL,
    "frequencia" TEXT NOT NULL,
    "quantidadeMensalEstimada" REAL,
    "precoMedioPago" REAL,
    "origemAtual" TEXT,
    "dificuldadeAbastecimento" TEXT NOT NULL DEFAULT 'baixa',
    "aceitaFornecedorLocal" BOOLEAN NOT NULL DEFAULT true,
    "precisaDeEntrega" BOOLEAN NOT NULL DEFAULT false,
    "precisaDeNotaFiscal" BOOLEAN NOT NULL DEFAULT false,
    "requisitos" TEXT,
    "observacoes" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "DemandaComercial_comercioId_fkey" FOREIGN KEY ("comercioId") REFERENCES "Comercio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DemandaComercial_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CapacidadeProdutiva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produtorId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "produzAtualmente" BOOLEAN NOT NULL DEFAULT true,
    "poderiaProdzir" BOOLEAN NOT NULL DEFAULT false,
    "quantidade" REAL NOT NULL,
    "unidadeMedida" TEXT NOT NULL,
    "frequencia" TEXT NOT NULL,
    "quantidadeMensalEstimada" REAL,
    "sazonalidade" TEXT,
    "limitacoes" TEXT,
    "necessidadeApoio" TEXT,
    "observacoes" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "CapacidadeProdutiva_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "Produtor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CapacidadeProdutiva_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VisitaCampo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoVisitado" TEXT NOT NULL,
    "comercioId" INTEGER,
    "produtorId" INTEGER,
    "dataVisita" DATETIME NOT NULL,
    "agenteResponsavel" TEXT NOT NULL,
    "observacoes" TEXT,
    "pendencias" TEXT,
    "precisaRetorno" BOOLEAN NOT NULL DEFAULT false,
    "dataRetornoSugerida" DATETIME,
    "usuarioId" INTEGER,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "VisitaCampo_comercioId_fkey" FOREIGN KEY ("comercioId") REFERENCES "Comercio" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "VisitaCampo_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "Produtor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "VisitaCampo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnexoFoto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "visitaId" INTEGER NOT NULL,
    "nomeArquivo" TEXT NOT NULL,
    "caminhoArquivo" TEXT NOT NULL,
    "descricao" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AnexoFoto_visitaId_fkey" FOREIGN KEY ("visitaId") REFERENCES "VisitaCampo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaProduto_nome_key" ON "CategoriaProduto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_nome_unidadeMedida_key" ON "Produto"("nome", "unidadeMedida");
