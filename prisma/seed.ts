import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do SisMCPL...')

  // Categorias de Produtos
  const categorias = await Promise.all([
    prisma.categoriaProduto.upsert({ where: { nome: 'Hortaliças' }, update: {}, create: { nome: 'Hortaliças', descricao: 'Verduras, legumes e folhosos' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Frutas' }, update: {}, create: { nome: 'Frutas', descricao: 'Frutas frescas e tropicais' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Tubérculos' }, update: {}, create: { nome: 'Tubérculos', descricao: 'Mandioca, batata-doce, inhame e similares' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Grãos' }, update: {}, create: { nome: 'Grãos', descricao: 'Feijão, milho, arroz e cereais' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Carnes' }, update: {}, create: { nome: 'Carnes', descricao: 'Carnes bovinas, suínas, aves e caça' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Ovos' }, update: {}, create: { nome: 'Ovos', descricao: 'Ovos de galinha, pato e similares' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Leite e Derivados' }, update: {}, create: { nome: 'Leite e Derivados', descricao: 'Leite, queijo, iogurte, manteiga' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Mel' }, update: {}, create: { nome: 'Mel', descricao: 'Mel, própolis e derivados da apicultura' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Temperos' }, update: {}, create: { nome: 'Temperos', descricao: 'Ervas, especiarias e condimentos frescos' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Polpas' }, update: {}, create: { nome: 'Polpas', descricao: 'Polpas de frutas congeladas ou frescas' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Produtos Processados' }, update: {}, create: { nome: 'Produtos Processados', descricao: 'Doces, compotas, conservas e afins' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Produtos Artesanais' }, update: {}, create: { nome: 'Produtos Artesanais', descricao: 'Itens artesanais com origem local' } }),
    prisma.categoriaProduto.upsert({ where: { nome: 'Insumos Locais' }, update: {}, create: { nome: 'Insumos Locais', descricao: 'Insumos agrícolas produzidos localmente' } }),
  ])

  console.log(`✅ ${categorias.length} categorias criadas`)

  const catHortalicas = categorias[0]
  const catFrutas = categorias[1]
  const catTuberculos = categorias[2]
  const catGraos = categorias[3]
  const catCarnes = categorias[4]
  const catOvos = categorias[5]
  const catLeite = categorias[6]
  const catMel = categorias[7]
  const catTemperos = categorias[8]

  // Produtos
  const produtos = await Promise.all([
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Alface', unidadeMedida: 'unidade' } }, update: {}, create: { nome: 'Alface', categoriaId: catHortalicas.id, unidadeMedida: 'unidade', perecivel: true } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Tomate', unidadeMedida: 'kg' } }, update: {}, create: { nome: 'Tomate', categoriaId: catHortalicas.id, unidadeMedida: 'kg', perecivel: true } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Coentro', unidadeMedida: 'maço' } }, update: {}, create: { nome: 'Coentro', categoriaId: catTemperos.id, unidadeMedida: 'maço', perecivel: true } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Mandioca', unidadeMedida: 'kg' } }, update: {}, create: { nome: 'Mandioca', categoriaId: catTuberculos.id, unidadeMedida: 'kg', perecivel: false } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Feijão Carioca', unidadeMedida: 'kg' } }, update: {}, create: { nome: 'Feijão Carioca', categoriaId: catGraos.id, unidadeMedida: 'kg', perecivel: false } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Frango Caipira', unidadeMedida: 'kg' } }, update: {}, create: { nome: 'Frango Caipira', categoriaId: catCarnes.id, unidadeMedida: 'kg', perecivel: true } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Ovos Caipira', unidadeMedida: 'dúzia' } }, update: {}, create: { nome: 'Ovos Caipira', categoriaId: catOvos.id, unidadeMedida: 'dúzia', perecivel: true } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Queijo Artesanal', unidadeMedida: 'kg' } }, update: {}, create: { nome: 'Queijo Artesanal', categoriaId: catLeite.id, unidadeMedida: 'kg', perecivel: true } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Mel Silvestre', unidadeMedida: 'kg' } }, update: {}, create: { nome: 'Mel Silvestre', categoriaId: catMel.id, unidadeMedida: 'kg', perecivel: false } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Banana', unidadeMedida: 'kg' } }, update: {}, create: { nome: 'Banana', categoriaId: catFrutas.id, unidadeMedida: 'kg', perecivel: true } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Macaxeira', unidadeMedida: 'kg' } }, update: {}, create: { nome: 'Macaxeira', categoriaId: catTuberculos.id, unidadeMedida: 'kg', perecivel: true } }),
    prisma.produto.upsert({ where: { nome_unidadeMedida: { nome: 'Milho Verde', unidadeMedida: 'unidade' } }, update: {}, create: { nome: 'Milho Verde', categoriaId: catGraos.id, unidadeMedida: 'unidade', perecivel: true } }),
  ])

  console.log(`✅ ${produtos.length} produtos criados`)

  // Comércios
  const comercios = await Promise.all([
    prisma.comercio.create({
      data: {
        nome: 'Mercearia São João',
        responsavel: 'João Batista Silva',
        tipo: 'Mercearia',
        telefone: '(87) 99901-1234',
        endereco: 'Rua Principal, 45',
        bairro: 'Centro',
        porte: 'micro',
        compraDeProdutoresLocais: false,
        interesseEmComprarLocal: true,
        observacoes: 'Aberto todos os dias da semana. Interesse em ovos e hortaliças.',
      },
    }),
    prisma.comercio.create({
      data: {
        nome: 'Restaurante Sabor da Terra',
        responsavel: 'Maria Aparecida Costa',
        tipo: 'Restaurante',
        telefone: '(87) 99902-5678',
        endereco: 'Av. Central, 210',
        bairro: 'Bairro Novo',
        porte: 'pequeno',
        compraDeProdutoresLocais: true,
        interesseEmComprarLocal: true,
        observacoes: 'Já compra feijão de produtor local. Quer ampliar para hortaliças e carnes.',
      },
    }),
    prisma.comercio.create({
      data: {
        nome: 'Supermercado Progresso',
        responsavel: 'Carlos Eduardo Mendes',
        tipo: 'Supermercado',
        telefone: '(87) 99903-9012',
        endereco: 'Praça da Feira, 78',
        bairro: 'Feira',
        porte: 'medio',
        compraDeProdutoresLocais: false,
        interesseEmComprarLocal: false,
        observacoes: 'Compra de distribuidoras regionais. Pouco interesse em fornecedor local no momento.',
      },
    }),
  ])

  console.log(`✅ ${comercios.length} comércios criados`)

  // Produtores
  const produtores = await Promise.all([
    prisma.produtor.create({
      data: {
        nome: 'Antônio Ferreira Lima',
        nomePropriedade: 'Sítio Boa Esperança',
        telefone: '(87) 99911-3344',
        localidade: 'Zona Rural - Sertão de Cima',
        tamanhoPropriedade: 12.5,
        tipoPropriedade: 'familiar',
        possuiTransporte: false,
        possuiIrrigacao: true,
        possuiAgua: true,
        possuiMaoDeObra: true,
        possuiDocumentacaoVenda: false,
        interesseVenderLocal: true,
        observacoes: 'Produz hortaliças há 8 anos. Tem cisterna de placa. Precisa de apoio em logística.',
      },
    }),
    prisma.produtor.create({
      data: {
        nome: 'Francisca Alves Rodrigues',
        nomePropriedade: 'Fazenda Três Marias',
        telefone: '(87) 99922-7788',
        localidade: 'Assentamento Nova Vida',
        tamanhoPropriedade: 22.0,
        tipoPropriedade: 'assentamento',
        possuiTransporte: true,
        possuiIrrigacao: false,
        possuiAgua: true,
        possuiMaoDeObra: true,
        possuiDocumentacaoVenda: true,
        interesseVenderLocal: true,
        observacoes: 'Cria galinhas caipiras e produz ovos. Tem DAP ativa. Já vendeu para programa escolar.',
      },
    }),
    prisma.produtor.create({
      data: {
        nome: 'José Raimundo Sousa',
        nomePropriedade: 'Apiário do Vale',
        telefone: '(87) 99933-1122',
        localidade: 'Comunidade Serra Verde',
        tamanhoPropriedade: 5.0,
        tipoPropriedade: 'familiar',
        possuiTransporte: false,
        possuiIrrigacao: false,
        possuiAgua: false,
        possuiMaoDeObra: false,
        possuiDocumentacaoVenda: true,
        interesseVenderLocal: true,
        observacoes: 'Apicultor com 30 colmeias. Produz mel silvestre e própolis. Certificado orgânico.',
      },
    }),
  ])

  console.log(`✅ ${produtores.length} produtores criados`)

  // Demandas Comerciais
  const demandas = await Promise.all([
    // Mercearia São João
    prisma.demandaComercial.create({
      data: {
        comercioId: comercios[0].id,
        produtoId: produtos[6].id, // Ovos Caipira
        quantidade: 10,
        unidadeMedida: 'dúzia',
        frequencia: 'semanal',
        quantidadeMensalEstimada: 40,
        precoMedioPago: 15.0,
        origemAtual: 'regional',
        dificuldadeAbastecimento: 'media',
        aceitaFornecedorLocal: true,
        precisaDeEntrega: false,
        precisaDeNotaFiscal: false,
        observacoes: 'Prefere ovos maiores. Disposto a pagar até R$18/dúzia de produtor local.',
      },
    }),
    prisma.demandaComercial.create({
      data: {
        comercioId: comercios[0].id,
        produtoId: produtos[0].id, // Alface
        quantidade: 20,
        unidadeMedida: 'unidade',
        frequencia: 'semanal',
        quantidadeMensalEstimada: 80,
        precoMedioPago: 2.5,
        origemAtual: 'regional',
        dificuldadeAbastecimento: 'alta',
        aceitaFornecedorLocal: true,
        precisaDeEntrega: true,
        precisaDeNotaFiscal: false,
        observacoes: 'Dificuldade em manter estoque. Compraria diário se tivesse fornecedor fixo.',
      },
    }),
    // Restaurante Sabor da Terra
    prisma.demandaComercial.create({
      data: {
        comercioId: comercios[1].id,
        produtoId: produtos[5].id, // Frango Caipira
        quantidade: 15,
        unidadeMedida: 'kg',
        frequencia: 'semanal',
        quantidadeMensalEstimada: 60,
        precoMedioPago: 20.0,
        origemAtual: 'estadual',
        dificuldadeAbastecimento: 'alta',
        aceitaFornecedorLocal: true,
        precisaDeEntrega: true,
        precisaDeNotaFiscal: true,
        observacoes: 'Prato principal do restaurante. Compra de frigorífico distante. Alta custo de frete.',
      },
    }),
    prisma.demandaComercial.create({
      data: {
        comercioId: comercios[1].id,
        produtoId: produtos[7].id, // Queijo Artesanal
        quantidade: 5,
        unidadeMedida: 'kg',
        frequencia: 'quinzenal',
        quantidadeMensalEstimada: 10,
        precoMedioPago: 35.0,
        origemAtual: 'regional',
        dificuldadeAbastecimento: 'media',
        aceitaFornecedorLocal: true,
        precisaDeEntrega: false,
        precisaDeNotaFiscal: false,
        observacoes: 'Para tábua de frios. Valoriza produto artesanal local.',
      },
    }),
    prisma.demandaComercial.create({
      data: {
        comercioId: comercios[1].id,
        produtoId: produtos[3].id, // Mandioca
        quantidade: 20,
        unidadeMedida: 'kg',
        frequencia: 'semanal',
        quantidadeMensalEstimada: 80,
        precoMedioPago: 4.5,
        origemAtual: 'local',
        dificuldadeAbastecimento: 'baixa',
        aceitaFornecedorLocal: true,
        precisaDeEntrega: false,
        precisaDeNotaFiscal: false,
        observacoes: 'Já tem fornecedor local, mas quer mais um para garantir abastecimento.',
      },
    }),
    // Supermercado Progresso
    prisma.demandaComercial.create({
      data: {
        comercioId: comercios[2].id,
        produtoId: produtos[8].id, // Mel Silvestre
        quantidade: 20,
        unidadeMedida: 'kg',
        frequencia: 'mensal',
        quantidadeMensalEstimada: 20,
        precoMedioPago: 40.0,
        origemAtual: 'estadual',
        dificuldadeAbastecimento: 'media',
        aceitaFornecedorLocal: true,
        precisaDeEntrega: false,
        precisaDeNotaFiscal: true,
        observacoes: 'Compra mel envasado. Aberto a produto local se tiver embalagem adequada e nota.',
      },
    }),
  ])

  console.log(`✅ ${demandas.length} demandas comerciais criadas`)

  // Capacidades Produtivas
  const capacidades = await Promise.all([
    // Antônio - Hortaliças
    prisma.capacidadeProdutiva.create({
      data: {
        produtorId: produtores[0].id,
        produtoId: produtos[0].id, // Alface
        produzAtualmente: true,
        poderiaProdzir: true,
        quantidade: 50,
        unidadeMedida: 'unidade',
        frequencia: 'semanal',
        quantidadeMensalEstimada: 200,
        sazonalidade: 'O ano todo com irrigação',
        limitacoes: 'Precisa de transporte para entrega',
        observacoes: 'Produção estável. Pode aumentar se tiver garantia de compra.',
      },
    }),
    prisma.capacidadeProdutiva.create({
      data: {
        produtorId: produtores[0].id,
        produtoId: produtos[1].id, // Tomate
        produzAtualmente: false,
        poderiaProdzir: true,
        quantidade: 30,
        unidadeMedida: 'kg',
        frequencia: 'semanal',
        quantidadeMensalEstimada: 120,
        sazonalidade: 'Melhor na seca (jun-nov)',
        limitacoes: 'Precisa de apoio técnico e insumos iniciais',
        necessidadeApoio: 'Assistência técnica agrícola e financiamento',
        observacoes: 'Tem área disponível e irrigação. Interesse alto em produzir.',
      },
    }),
    // Francisca - Ovos e Frango
    prisma.capacidadeProdutiva.create({
      data: {
        produtorId: produtores[1].id,
        produtoId: produtos[6].id, // Ovos Caipira
        produzAtualmente: true,
        poderiaProdzir: true,
        quantidade: 30,
        unidadeMedida: 'dúzia',
        frequencia: 'semanal',
        quantidadeMensalEstimada: 120,
        sazonalidade: 'O ano todo',
        limitacoes: 'Produção limitada pelo tamanho do galinheiro atual',
        necessidadeApoio: 'Ampliação do galinheiro',
        observacoes: 'Tem 80 galinhas poedeiras. Poderia dobrar a produção com investimento.',
      },
    }),
    prisma.capacidadeProdutiva.create({
      data: {
        produtorId: produtores[1].id,
        produtoId: produtos[5].id, // Frango Caipira
        produzAtualmente: true,
        poderiaProdzir: true,
        quantidade: 8,
        unidadeMedida: 'kg',
        frequencia: 'quinzenal',
        quantidadeMensalEstimada: 16,
        sazonalidade: 'O ano todo',
        limitacoes: 'Ciclo de 90 dias por lote',
        observacoes: 'Abate sob encomenda. Precisa de compradores fixos para planejar produção.',
      },
    }),
    // José - Mel
    prisma.capacidadeProdutiva.create({
      data: {
        produtorId: produtores[2].id,
        produtoId: produtos[8].id, // Mel Silvestre
        produzAtualmente: true,
        poderiaProdzir: true,
        quantidade: 60,
        unidadeMedida: 'kg',
        frequencia: 'mensal',
        quantidadeMensalEstimada: 60,
        sazonalidade: 'Maior produção no período das chuvas (fev-mai)',
        limitacoes: 'Produção dependente do florescimento local',
        necessidadeApoio: 'Equipamento de envase e rotulagem',
        observacoes: 'Mel de alta qualidade. Certificado orgânico. Precisa de embalagem para vender no supermercado.',
      },
    }),
  ])

  console.log(`✅ ${capacidades.length} capacidades produtivas criadas`)

  // Visitas de Campo
  const visitas = await Promise.all([
    prisma.visitaCampo.create({
      data: {
        tipoVisitado: 'produtor',
        produtorId: produtores[0].id,
        dataVisita: new Date('2026-06-05'),
        agenteResponsavel: 'Ana Paula Ferreira',
        observacoes: 'Visita inicial de diagnóstico. Produtor muito receptivo. Área bem cuidada com irrigação por gotejamento.',
        pendencias: 'Encaminhar solicitação de ATER. Verificar possibilidade de microcrédito.',
        precisaRetorno: true,
        dataRetornoSugerida: new Date('2026-07-05'),
      },
    }),
    prisma.visitaCampo.create({
      data: {
        tipoVisitado: 'produtor',
        produtorId: produtores[1].id,
        dataVisita: new Date('2026-06-10'),
        agenteResponsavel: 'Pedro Henrique Souza',
        observacoes: 'Francisca já participa do PNAE. Quer ampliar para venda direta a comércios.',
        pendencias: 'Ajudar a formatação de proposta comercial.',
        precisaRetorno: true,
        dataRetornoSugerida: new Date('2026-07-10'),
      },
    }),
    prisma.visitaCampo.create({
      data: {
        tipoVisitado: 'comercio',
        comercioId: comercios[0].id,
        dataVisita: new Date('2026-06-15'),
        agenteResponsavel: 'Ana Paula Ferreira',
        observacoes: 'João tem interesse real em comprar ovos e alface local. Principal barreira é regularidade de entrega.',
        pendencias: 'Apresentar catálogo de produtores aptos.',
        precisaRetorno: false,
      },
    }),
    prisma.visitaCampo.create({
      data: {
        tipoVisitado: 'comercio',
        comercioId: comercios[1].id,
        dataVisita: new Date('2026-06-20'),
        agenteResponsavel: 'Pedro Henrique Souza',
        observacoes: 'Restaurante disposto a pagar mais por produto local de qualidade. Frango caipira é prioridade.',
        pendencias: 'Conectar com Francisca para proposta de fornecimento.',
        precisaRetorno: true,
        dataRetornoSugerida: new Date('2026-07-20'),
      },
    }),
  ])

  console.log(`✅ ${visitas.length} visitas criadas`)
  console.log('\n🎉 Seed concluído com sucesso!')
  console.log('\n📊 Resumo:')
  console.log(`   - ${categorias.length} categorias de produtos`)
  console.log(`   - ${produtos.length} produtos`)
  console.log(`   - ${comercios.length} comércios`)
  console.log(`   - ${produtores.length} produtores`)
  console.log(`   - ${demandas.length} demandas comerciais`)
  console.log(`   - ${capacidades.length} capacidades produtivas`)
  console.log(`   - ${visitas.length} visitas de campo`)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
