<h1>(Projeto Full Stack) Interface Atlas Burger</h1>

<h5>Atlas Burger é uma hamburgueria digital desenvolvida com React, TypeScript e Tailwind CSS. Utiliza React Router DOM para navegação, Axios para chamadas HTTP, React Hook Form com Zod para formulários e validação, e Stripe para pagamentos online. A interface combina Material UI e ShadCN UI, com componentes como React Select, React Toastify e React Multi Carousel. O projeto também utiliza Clsx para manipulação de classes e BiomeJS para formatação e linting do código.</h5>

<h4>Tecnologias usadas:</h4>

[![My Skills](https://skillicons.dev/icons?i=html,css,yarn,ts,vite,react,tailwind,zod)](https://skillicons.dev)

<hr>

<h3>Link da API do projeto <a href="https://github.com/lucasfgaldinos/atlas-burger-api">aqui</a></h3>

<div>
  <p>Prints ⬇️</p>
  <h2>Páginas do usuário comum</h2>
  <img width="100%" src="./src/assets/prints/cadastro.png" alt="Print da página Cadastro da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/login.png" alt="Print da página Login da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/home.png" alt="Print da página Home da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/cardapio.png" alt="Print da página Cardapio da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/cardapio-hamburgueres.png" alt="Print da página Cardapio com o filtro de hamburgueres da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/cardapio-sobremesas.png" alt="Print da página Cardapio com o filtro de sobremesas da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/carrinho.png" alt="Print da página Pedidos da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/pagamento.png" alt="Print da página Checkout da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/pagamento-realizado.png" alt="Print da página Pagamento confirmado da aplicação em Desktop" />
  <hr>
  <h2>Páginas do administrador</h2>
  <img width="100%" src="./src/assets/prints/pedidos.png" alt="Print da página Admin - Pedidos da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/pedidos-prontos.png" alt="Print da página Admin - Pedidos Prontos da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/adicionar-produto.png" alt="Print da página Admin - Adicionar Produto da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/lista-de-produtos.png" alt="Print da página Admin - Lista de Produtos da aplicação em Desktop" />
  <hr>
  <img width="100%" src="./src/assets/prints/editar-produto.png" alt="Print da página Admin - Modal de Editar Produto da aplicação em Desktop" />
  <hr>
  
</div>



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
