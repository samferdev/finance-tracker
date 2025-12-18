# Finance Tracker - Backend 💰

API RESTful desenvolvida como parte de um projeto Fullstack MERN (MongoDB, Express, React, Node). O objetivo é criar um sistema de controle financeiro pessoal, focado em boas práticas de arquitetura e manipulação de dados.

## 🛠 Tecnologias e Bibliotecas

Até o momento, o backend foi estruturado utilizando **Node.js** e as seguintes bibliotecas principais:

### Dependências Principais
* **[Express](https://expressjs.com/):** Framework web rápido e minimalista utilizado para criar as rotas e gerenciar o servidor.
* **[Mongoose](https://mongoosejs.com/):** Biblioteca ODM (Object Data Modeling) para modelar os dados e gerenciar a conexão com o MongoDB.
* **[Dotenv](https://www.npmjs.com/package/dotenv):** Gerenciamento de variáveis de ambiente (segurança e configuração).
* **[Cors](https://www.npmjs.com/package/cors):** Middleware para habilitar requisições de outras origens (CORS), essencial para a comunicação com o Frontend.
* **[Bcryptjs](https://www.npmjs.com/package/bcryptjs):** *[Instalado]* Biblioteca para criptografia (hash) de senhas.
* **[Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken):** *[Instalado]* Implementação de tokens JWT para autenticação segura.

### Dependências de Desenvolvimento
* **[Nodemon](https://nodemon.io/):** Utilitário que monitora alterações nos arquivos e reinicia o servidor automaticamente durante o desenvolvimento.

## 🚀 Como rodar localmente

1.  **Instale as dependências:**
    Acesse a pasta do backend e execute:
    ```bash
    cd backend
    npm install
    ```

2.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na pasta `backend` baseado no arquivo `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Preencha o `MONGO_URI` com sua string de conexão do MongoDB Atlas.

3.  **Inicie o Servidor:**
    ```bash
    npm run dev
    ```

---
*Desenvolvido como projeto de portfólio acadêmico - Ciência da Computação.*