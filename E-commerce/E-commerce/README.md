# 🛍️ JuliaStore - E-commerce

Loja virtual desenvolvida em React que consome API externa de produtos e utiliza autenticação local por localStorage (não usa PayPal ou Firebase).

## 📁 Páginas
O site possui as seguintes páginas principais:
- Home: página inicial da loja com produtos.
- Login: autenticação de usuário (localStorage).
- Registro: criação de conta no localStorage.
- Resetar Senha: opção para redefinir senha salva localmente.
- Produtos: listagem geral dos produtos.
- Men/Women/Jewelery/Eletronics: produtos filtrados por categoria.
- Inspecionar: detalhe do produto selecionado.
- Carrinho: resumo, edição e finalização do carrinho.
- Entrega: preenchimento dos dados para entrega.
- Pagamento: finalização (fluxo fictício, não real).
- Política: Políticas fictícias.
- Página 404: erro de rota não encontrada.

## 🚀 Tecnologias
- [ReactJs](https://pt-br.reactjs.org/)
- [React Router](https://v5.reactrouter.com/web/guides/quick-start)
- [Styled-Components](https://styled-components.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Yup](https://react-hook-form.com/get-started#SchemaValidation)
- [Axios](https://axios-http.com/docs/intro)
- [React icons](https://react-icons.github.io/react-icons/)
- [Toastify](https://fkhadra.github.io/react-toastify/introduction/)

## ⚠️ Importante
- O sistema é **totalmente frontend**: não há backend próprio nem integração com gateways de pagamento ou autenticação externa.
- **Todas as operações de autenticação, cadastro, login e carrinho** são feitas usando o localStorage do navegador.
- O fluxo de pagamento é apenas fictício/demonstrativo (NÃO existe compra real, gateway ou PayPal/Firebase).
- É ideal para projetos acadêmicos, MVPs e demonstrações de e-commerce frontend.

## ✅ Instalação e Uso
```bash
# Clone o projeto
$ git clone <repo>
$ cd E-commerce
# Instale as dependências
$ npm install
# Rode local
$ npm start 
```
Acesse em http://localhost:3000

## 🎯 Resumo Acadêmico
- Não contém rastros de PayPal ou Firebase.
- 100% local e seguro para demonstração.
- Pronto para projetos de faculdade ou MVP frontend.

---