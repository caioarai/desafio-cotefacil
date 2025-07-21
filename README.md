# Desafio Cotefácil

Este repositório contém três projetos feitos com **React** e **Vite**:

- **To-Do List**
- **Galeria de Fotos**
- **Dashboard de Tarefas**

## 🚀 Funcionalidades

- 📝 **To-Do List**: 
  - Adicionar, editar, excluir e checar tarefas.
  - Salvar automaticamente as tarefas usando **localStorage** (não perde ao atualizar a página).
- 🖼️ **Galeria de Fotos**: Filtro de imagens, adicionar novas imagens e exibir imagens com persistência de dados.
- 📊 **Dashboard de Tarefas**: Visualização e gerenciamento de tarefas com estado global usando **React Context API**.

## 🛠️ Tecnologias utilizadas

- React
- Vite (para bundling e desenvolvimento rápido)
- React Router DOM
- React Context API
- localStorage
- API externa Unsplash
- HTML5
- CSS3
- JavaScript

## 📦 Instalação e uso

Siga os passos abaixo para rodar o projeto localmente:

```bash
# Clone este repositório
git clone https://github.com/caioarai/desafio-cotefacil.git

# Acesse a pasta do projeto
cd desafio-cotefacil

# Instale as dependências
npm install

# Crie um arquivo .env e adicione sua chave de acesso da API Unsplash:
VITE_ACCESS_KEY=sua_access_key_aqui

# Inicie o servidor de desenvolvimento
npm run dev
