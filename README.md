# Documentação do Projeto: Sistema de Gestão de Tarefas

Este projeto consiste em um sistema de Gestão de Tarefas desenvolvido com Angular 16.2.0, Firebase e Firebase Authentication. Ele permite que usuários gerenciem tarefas com funcionalidades como criação, edição, exclusão e acompanhamento do status.

---

## Funcionalidades Desenvolvidas

### **Autenticação**

- **Login e Cadastro de Usuários:**  
  Implementado com Firebase Authentication, utilizando o método de e-mail/senha.
- **Proteção de Rotas:**  
  Apenas usuários autenticados podem acessar a interface de gestão de tarefas.

### **Gestão de Tarefas**

- **Cadastro e Gerenciamento de Tarefas:**  
  Usuários autenticados podem criar, editar e excluir tarefas.
- **Detalhes da Tarefa:**  
  Cada tarefa contém:
  - Título
  - Descrição
  - Data de vencimento
  - CPF, e-mail e nome do responsável
  - Status da tarefa: pendente, em andamento ou concluída
- **Listagem de Tarefas:**  
  As tarefas são exibidas em uma lista responsiva, filtrável e de fácil navegação.

### **Armazenamento**

- Todas as informações são armazenadas no Firestore, garantindo escalabilidade e sincronização em tempo real.

### **Interface Responsiva**

- Desenvolvida para oferecer uma experiência fluida em dispositivos móveis e desktops.

---

## Requisitos para Rodar o Projeto Localmente

### **Pré-requisitos**

Certifique-se de ter os seguintes itens instalados:

- **Node.js** (v14 ou superior)
- **Angular CLI** (v13 ou superior)
- **Conta no Firebase** (para configurar o Firestore e Authentication)
- Um editor de código, como **VS Code**

### **Passos para Instalação**

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configuração do Firebase:**

   - Acesse [Firebase Console](https://console.firebase.google.com/).
   - Crie um novo projeto no Firebase.
   - Ative o Firestore e configure Firebase Authentication (e-mail/senha).
   - Copie as credenciais de configuração do Firebase (disponíveis em **Configurações do Projeto > Configuração do App**).
   - Substitua as variáveis no arquivo `src/environments/environment.ts` pelo seu `firebaseConfig`:
     ```typescript
     export const environment = {
       production: false,
       firebaseConfig: {
         apiKey: "SUA_API_KEY",
         authDomain: "SEU_AUTH_DOMAIN",
         projectId: "SEU_PROJECT_ID",
         storageBucket: "SEU_STORAGE_BUCKET",
         messagingSenderId: "SEU_MESSAGING_SENDER_ID",
         appId: "SEU_APP_ID",
       },
     };
     ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   ng serve
   ```

5. **Acesse a aplicação no navegador:**
   Abra [http://localhost:4200](http://localhost:4200).

---

## Tecnologias Utilizadas

- **Angular 16.2.0**: Framework para desenvolvimento da interface do usuário.
- **Firebase**: Plataforma para autenticação, banco de dados Firestore e hospedagem.
