# 🧢 **Crescer_API – Testes Automatizados da Hat Store API**

> Projeto educacional do programa **Crescer**, voltado para **automação de testes backend e integração com APIs REST** utilizando **Playwright** e **Node.js**.

---

## 🚀 1. Visão Geral

O projeto **Crescer_API** contém uma suíte de **testes automatizados de API** que valida o comportamento do backend da aplicação **Hat Store**, um e-commerce de chapéus desenvolvido em Go.

A automação cobre fluxos reais do sistema:
- Cadastro e login de usuários  
- Criação de pedidos e aplicação de cupons  
- Listagem e verificação de estoque  

💡 **Objetivo:** Ensinar QAs a criar, estruturar e manter testes de API de forma profissional e escalável.

---

## 🧰 2. Tecnologias Utilizadas

| Tecnologia | Função |
|-------------|--------|
| **Playwright (API Testing)** | Framework para automação e validação de requisições REST |
| **Node.js** | Ambiente de execução JavaScript |
| **Faker.js** | Geração de dados dinâmicos (usuários, emails, senhas) |
| **Dotenv** | Leitura de variáveis de ambiente |
| **Cross-env** | Controle de múltiplos ambientes (.env.dev, .env.qa, .env.prod) |
| **GitHub Actions** | Integração contínua dos testes (CI/CD) |

---

## ⚙️ 3. Configuração do Projeto

### 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/joprestes/Crescer_API.git
cd Crescer_API

# Instale as dependências
npm install
```

---

### ⚙️ Variáveis de Ambiente

O projeto usa o arquivo `.env.dev` por padrão, mas também suporta `.env.qa` e `.env.prod`.

Exemplo de configuração:

```bash
BASE_URL=https://hatstore-prd.fly.dev
EMAILUSER=<seu_email_de_teste>
PASSWORDUSER=<sua_senha_de_teste>
```

Essas variáveis são lidas automaticamente pelo `playwright.config.js`:

```js
const envFile = process.env.ENV_FILE || '.env.dev';
dotenv.config({ path: path.resolve(__dirname, envFile) });
```

> 💡 *Nunca use credenciais reais em ambientes de automação pública.  
Crie usuários de teste específicos para cada ambiente.*

---

### ▶️ Execução dos Testes

| Comando | Descrição |
|----------|------------|
| `npm test` | Executa todos os testes com ambiente padrão |
| `npm run test:dev` | Executa os testes no ambiente de desenvolvimento |
| `npm run test:qa` | Executa no ambiente de QA |
| `npm run test:prod` | Executa no ambiente de produção |

Exemplo:
```bash
npm run test:qa
```

Os resultados ficam disponíveis em um **relatório HTML** gerado automaticamente pelo Playwright.

---

## 🗂️ 4. Estrutura do Projeto

```bash
Crescer_API/
├── api/
│   ├── jsonFiles/                 # Arquivos JSON de payloads (ex: body de requests)
│   │   ├── BodyPostHatPedido.json
│   │   └── BodyPostRegisterUer.json
│   ├── fixtures/                  # Fixtures e dados pré-configurados
│   │   └── authFixture.js
│   ├── utils/                     # Funções auxiliares (faker, token, helpers)
│   │   └── helpers.js
│   ├── tests/                     # Testes automatizados da API
│   │   ├── getHatsEstoque.spec.js
│   │   ├── postAuthUsuario.spec.js
│   │   └── postHatsPedidos.spec.js
│   └── hatStoreApi.js             # Classe central com métodos GET e POST
│
├── playwright.config.js           # Configuração do Playwright (baseURL, envs, reporter)
├── package.json                   # Scripts e dependências
├── .env.dev / .env.qa             # Ambientes de execução
└── .github/workflows/playwright.yml # Pipeline CI/CD
```

---

## 📘 5. Endpoints Validados

| Método | Endpoint | Descrição | Status Esperado |
|--------|-----------|------------|-----------------|
| `POST` | `/auth/register` | Cadastra novo usuário | 201 / 409 / 400 |
| `POST` | `/api/pedido` | Registra pedido com itens e cupom | 200 / 400 |
| `GET` | `/api/estoque` | Lista chapéus disponíveis | 200 |

---

## 🧪 6. Estrutura dos Testes Automatizados

Os testes seguem a metodologia **AAA (Arrange – Act – Assert)**:

```js
// ARRANGE - Configuração
const hatApi = new HatStoreApi(request);

// ACT - Ação
const response = await hatApi.get('/api/estoque');

// ASSERT - Validação
expect(await response.ok()).toBeTruthy();
```

### 🧩 Arquivos de Teste

| Arquivo | Descrição | Endpoint |
|----------|------------|-----------|
| `postAuthUsuario.spec.js` | Testa o cadastro de usuário | `/auth/register` |
| `getHatsEstoque.spec.js` | Testa a listagem de estoque | `/api/estoque` |
| `postHatsPedidos.spec.js` | Testa o registro de pedidos válidos e inválidos | `/api/pedido` |

---

### 🧠 Exemplos Didáticos

#### ✅ Cadastro de Usuário (POST /auth/register)
```js
const response = await hatApi.post('/auth/register', user);
expect(response.status()).toBe(201);
```

#### 🧢 Estoque (GET /api/estoque)
```js
const response = await hatApi.get('/api/estoque');
const hats = await response.json();
expect(hats.length).toBeGreaterThan(0);
expect(hats[0]).toHaveProperty('nome');
```

#### 💰 Pedido (POST /api/pedido)
```js
const response = await hatApi.post('/api/pedido', pedido);
expect(response.status()).toBe(200);
expect(await response.text()).toContain("Pedido registrado com sucesso");
```

---

## 🧠 7. Conceitos Importantes

### 🔐 Fixture de Autenticação (`authFixture.js`)
Cria automaticamente um usuário e gera um **token JWT** válido antes de cada teste, permitindo que os casos executem requisições autenticadas.

---

### ⚙️ Helpers (`helpers.js`)
Contém funções que auxiliam nos testes:
- Criação dinâmica de usuários (`faker`)  
- Geração de token JWT via login real  
- Manipulação de payloads JSON  

---

### 🧩 Classe `HatStoreApi`
Centraliza as requisições HTTP, simplificando a escrita dos testes.

---

## 💡 8. Boas Práticas de QA

- **Isolar dados de teste** → use JSONs e helpers.  
- **Usar variáveis de ambiente** → facilite mudanças entre ambientes.  
- **Evitar duplicação** → crie funções genéricas.  
- **Sempre validar erros e respostas** (status code e mensagem).  
- **Manter os testes pequenos e legíveis**.  
- **Rodar os testes em pipeline CI/CD** (como já configurado em `.github/workflows`).

---

## 🧩 9. Conexão com o Frontend

O frontend **Hat Store Front** consome diretamente esta API:  
🔗 [https://github.com/joprestes/Crescer_Front](https://github.com/joprestes/Crescer_Front)

| Fluxo Frontend | Endpoint da API |
|----------------|----------------|
| Cadastro/Login | `/auth/register`, `/auth/login` |
| Listagem de Chapéus | `/api/estoque` |
| Pedido/Checkout | `/api/pedido` |

Os testes de API garantem que esses endpoints estejam sempre funcionando — antes mesmo de o frontend rodar.

---

## 👥 10. Autores

| Nome | Função | LinkedIn |
|------|--------|-----------|
| **Marcelo Feiteiro** | Backend e automação QA | [linkedin.com/in/marcelo-feiteiro](https://www.linkedin.com/in/marcelo-feiteiro-96a7a4142/) |
| **Joelma Prestes Ferreira** | Documentação, QA e integração front/back | [linkedin.com/in/joprestes](https://www.linkedin.com/in/joprestes) |

---

## 🧾 11. Licença

Projeto distribuído sob a **MIT License**.  
> 🎓 *Este repositório faz parte do programa educacional Crescer – Automação de Testes Backend.*

---

## ✨ 12. Conclusão

Este projeto foi criado com o propósito de **ensinar automação de APIs REST** de maneira prática, integrada e realista.  
Cada teste aqui representa um passo no aprendizado de um QA profissional: da autenticação ao fluxo completo de pedido.

---

## 📚 Documentação e Materiais de Apoio

> Este projeto faz parte do programa **Crescer**, que ensina automação de testes backend e integração com APIs REST.

Abaixo você encontra materiais complementares para estudo e prática:

- 🎓 [Guia de Treinamento QA – Hat Store API](./docs/Guia_Treinamento_QA_HatStore_API.md)
- 🌐 [Swagger Oficial da API](https://hatstore-prd.fly.dev/swagger/index.html)
- 💻 [Frontend Hat Store (Crescer Front)](https://github.com/joprestes/Crescer_Front)

---

💬 *“Automatizar é garantir que o aprendizado se transforme em qualidade.”*

