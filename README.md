# Avaliação Angular

## Descrição
Este projeto faz parte do processo seletivo da empresa Minsait. A aplicação desenvolvida em Angular permite listar, cadastrar, editar e excluir pessoas e seus contatos, seguindo boas práticas e padrões recomendados.

## Funcionalidades
- **Listagem de Pessoas:** Apresenta uma tabela com os campos: ID, Nome, Endereço, CEP, UF, Contato e ações.
- **Cadastro de Pessoas:** Permite adicionar uma nova pessoa e seu contato.
- **Edição de Pessoas:** Possibilita alterar os dados de uma pessoa cadastrada.
- **Exclusão de Pessoas:** Opção de remover um registro.
- **Busca automática de endereço pelo CEP:** Integração com a API [ViaCEP](https://viacep.com.br/) para preenchimento automático do endereço.

## Tecnologias Utilizadas
- **Angular 16.2.16**
- **Node JS 18.20.6**
- **TypeScript**
- **HTML5 & SCCS**
- **Angular Material, Bootstrap e SweetAlert2**
- **API [api-controle-de-contatos](https://github.com/Mendes17/api-controle-de-contatos.git) v1.0.1
- **API ViaCEP** (para busca automática de endereço)

## Instruções para Execução

1. Rode a aplicação api-controle-de-contatos na sua versão 1.0.1, explicação de como [aqui](https://github.com/Mendes17/api-controle-de-contatos/new/master?filename=README.md)

2. Clone este repositório:
   ```bash
   git clone https://github.com/Mendes17/angular-people-manager.git
   ```
3. Navegue até a pasta do projeto:
   ```bash
   cd nome-do-projeto
   ```
4. Instale as dependências:
   ```bash
   npm install
   ```
5. Execute o servidor de desenvolvimento:
   ```bash
   ng serve
   ```
6. Acesse a aplicação no navegador:
   ```
   http://localhost:4200
   ```


---
**Desenvolvido por [Henrique Cerqueira Mendes] Full Stack Developer**

