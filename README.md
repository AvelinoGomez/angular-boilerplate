# **Angular Boilerplate - Estrutura e Boas Práticas**

Este boilerplate foi projetado para fornecer uma base sólida para desenvolvimento de aplicações Angular, seguindo boas práticas de organização, modularização e reutilização de código.

## **Detalhes**

- **Autor:** Avelino Alonso
- **Nome do Projeto:** Angular Boilerplate
- **Versão:** 0.0.1
- **Node.js Recomendado:** 22.x
- **Dependências Principais:**
  - Angular Core: ^18.2.0
  - Bootstrap: ^5.3.3
  - RxJS: ~7.8.0

- **Scripts Disponíveis:**
  - `start`: Inicia o servidor de desenvolvimento.
  - `build`: Compila a aplicação para produção.
  - `watch`: Recompila a aplicação ao detectar alterações.
  - `test`: Executa os testes unitários usando Karma.
  - `llm-guide`: Compila uma documentação de infraestrutura para auxílio em LLMs
  - `g-module`: Geração de módulos dentro do padrão do projeto

---

## **Estrutura do Projeto**

A estrutura de diretórios foi projetada para ser modular e escalável, dividindo responsabilidades de forma clara. Abaixo está a explicação de cada pasta e seu propósito:

### **src/app/core**

Esta pasta contém elementos centrais do projeto que são utilizados em toda a aplicação.

- **`guards/`**: Contém os _guards_ (Angular Route Guards) para proteger rotas e controlar o acesso a partes específicas da aplicação.
  
- **`interceptors/`**: Contém os _interceptors_ HTTP que manipulam requisições e respostas de maneira global (ex.: adicionar tokens de autenticação, tratar erros).

- **`services/`**: Contém os serviços (Consultas para APIs) que podem ser compartilhados entre os módulos (serviços específicos devem estar localizado dentro do módulo respectivo).

- **`dtos/`**: Contém os _DTO_ (Data Transfer Object) que podem ser compartilhados entre os módulos.

- **`validators/`**: Contém validadores customizados para Reactive Forms. Segue os princípios de Orientação a Objetos e **SOLID**.
  - **`cnpj.validator.ts`**: Validador para CNPJ.
  - **`cpf.validator.ts`**: Validador para CPF.
  - **`custom-validators.ts`**: Wrapper para expor os validadores customizados em Reactive Forms.
  - **`validator.interface.ts`**: Define uma interface para criar validadores reutilizáveis e padronizados.

---

### **src/app/domain**

A pasta `domain` contém a lógica específica de negócios e funcionalidades agrupadas em módulos. Essa estrutura promove modularidade e facilita a escalabilidade.

- **`<nome-do-dominio>/`**: Exemplo de um domínio/módulo funcional.
  - **`components/`**: Componentes reutilizáveis específicos do domínio.
  - **`dtos/`**: Contém os _DTO_ (Data Transfer Object) que devem ser utilizados apenas no módulo específico.
  - **`pages/`**: Componentes de páginas únicas (geralmente associados a rotas).
  - **`services/`**: Serviços não compartilhados do módulo (específico para este módulo).
      - **`<nome-do-dominio>-forms.service.ts`**: Serviço para formulários (Reactive Forms) que devem seguir o padrão solid de classe (formulários privados e _gets_ para leitura).
  - **`demo-routing.module.ts`**: Gerencia as rotas específicas do módulo.
  - **`demo.module.ts`**: Define o módulo do domínio e seus imports/exports.

---

### **src/app/shared**

Esta pasta contém elementos reutilizáveis e genéricos que podem ser utilizados em qualquer lugar da aplicação.

- **`components/`**: Componentes genéricos reutilizáveis, como botões, modais ou tabelas.
- **`pipes/`**: _Pipes_ reutilizáveis, como formatações específicas.
  - **`cnpj.pipe.ts`**: Pipe para formatar CNPJ.
  - **`cpf.pipe.ts`**: Pipe para formatar CPF.
  - **`phone.pipe.ts`**: Pipe para formatar números de telefone.

---

### **src/environments**

Gerencia variáveis de ambiente para diferentes configurações de build:
- **`environment.ts`**: Ambiente local.
- **`environment.development.ts`**: Ambiente de desenvolvimento.
- **`environment.prod.ts`**: Ambiente de produção.

---

## **Boas Práticas no Uso deste Boilerplate**

1. **Modularização**
   - Crie novos módulos para funcionalidades distintas, agrupando componentes, serviços e rotas relacionados.
   - Utilize `domínios` para encapsular a lógica de negócio específica.

2. **Reutilização de Código**
   - Coloque componentes, pipes e etc, que podem ser reutilizados em `shared/`.
   - Use o diretório `core/` para funcionalidades centrais e globais, como validadores, interceptors e serviços compartilhados.

3. **Seguindo os Princípios de SOLID**
   - **Single Responsibility Principle**: Cada arquivo (classe, componente ou serviço) deve ter apenas uma responsabilidade.
   - **Open/Closed Principle**: Adicione novas funcionalidades extendendo classes/módulos existentes em vez de modificá-los diretamente.

4. **Reactive Forms**
   - Utilize os validadores em `core/validators` para validar campos como CPF e CNPJ.
   - Para usar um validador customizado no formulário, importe o `CustomValidators`:
     ```typescript
     import { CustomValidators } from 'src/app/core/validators/custom-validators';

     formGroup: FormGroup = new FormGroup({
       cpf: new FormControl('', [Validators.required, CustomValidators.cpf()]),
       cnpj: new FormControl('', [Validators.required, CustomValidators.cnpj()]),
     });
     ```

5. **Lazy Loading**
   - Utilize o _Lazy Loading_ para carregar os módulos do domínio (ex.: `domain/demo`) somente quando necessário, otimizando a performance.

6. **Documentação**
   - Adicione comentários claros em validadores, pipes e serviços para facilitar o entendimento e a manutenção.

7. **Padrões de Código**
   - Siga as melhores práticas do Angular CLI e utilize ferramentas como `ESLint` e `Prettier` para manter um código limpo e consistente.

8. **Serviços**
   - Para a criação de serviços é imprescindível a utilização dos principais conceitos de orientação a objeto.
   Serviços devem ser criados sempre na estrutura de uma interface abstrata que representará todas as assinaturas de métodos
   ```typescript
   export abstract class ApiService {
      abstract assinaturaMetodosPublicos(): Observable<DTO>
      abstract assinaturaFuncoesPublicas(parametros: ParamDTO): Observable<DTO>
   }
   ``` 
   Perceba a utilização das assinaturas abstratas todas assinaladas com seus respectivos DTOs.

   Com a assinatura abstrata poderemos realizar a abstração das chamadas de APIs externas, utilizando um serviço para testes (_mock_) e outro 
   serviço para implementação real (_impl_). 
   ```typescript
   @Injectable({
   providedIn: 'root'
   })
   export class ImplApiService implements ApiService {
      constructor(private http: HttpClient) {}
      assinaturaMetodosPublicos(): Observable<DTO> {
         return this.http.get<DTO>(`${environment.apiUrl}/demo`);
      }

      assinaturaMetodosPublicos(parametros: ParamDTO): Observable<DTO> {
         return this.http.post<DTO>(`${environment.apiUrl}/demo`, parametros);
      }
   }

   @Injectable({
   providedIn: 'root'
   })
   export class MockApiService implements ApiService {
      assinaturaMetodosPublicos(): Observable<DTO> {
         return of([{ message: `Mensagem mockada sem consulta ao backend` }]);
      }

      assinaturaMetodosPublicos(parametros: ParamDTO): Observable<DTO> {
         return of([{ message: `Mensagem mockada sem consulta ao backend (parametros ${parametros})` }]);
      }
   }
   ```
   Com a implantação acima garantimos o principio _Open Close_ onde poderemos utilizar o serviço mockado para realização de services
   apenas alterando o provider no módulo.

   **`<nome-do-dominio>/<nome-do-dominio>.module.ts`**:
   ```typescript
   import { ApiService, ImplApiService } from './services/<dominio>-api.service';

   @NgModule({
   declarations: [
      ...Componentes
   ],
   imports: [
      ...Módulos, Pipes
   ],
   providers: [
      //Utilização do serviço real (do backend)
      { provide: ApiService, useClass: ImplApiService }
      //Utilização do serviço mockado
      { provide: ApiService, useClass: MockApiService }
   ]
   })
   export class DemoModule { }

   ```
   
   Para utilizar a injeção de dependências da forma correta no componente, deve-se importar a interface abstrata.
   ```typescript
   @Component({ ... })
   export class DemoComponent {

      constructor(
         private readonly demoService: ApiService
      ){
         this.demoService.getInfo().subscribe({
            next: (data) => console.log(data),
            error: (error) => console.error(error)
         });
      }

      ...
   }
   ```

---

## **Exemplo de Uso**

### Adicionar um Validador de CPF

- No seu componente, importe o validador:
  ```typescript
  import { CustomValidators } from 'src/app/core/validators/custom-validators';

  myForm: FormGroup = new FormGroup({
    cpf: new FormControl('', [Validators.required, CustomValidators.cpf()]),
  });
  ```

### Adicionar Pipes Reutilizáveis

- Crie pipes genéricos em shared/pipes e importe no módulo onde necessário:
 ```typescript
    import { CPFCustomPipe } from 'src/app/shared/pipes/cpf.pipe';

    // Exemplo no HTML:
    <p>{{ '12345678909' | cpf }}</p>
 ```

---

## **Ferramentas Adicionais**

### Instalação do Projeto

- Clone o repositório e instale as dependências:
 ```console
    git clone <repo-url>
    cd <project-folder>
    npm install
 ```

### Servindo a Aplicação

- Para rodar o projeto em desenvolvimento:
 ```console
    ng serve
 ```

### Build para Produção

- Gere a build otimizada:
 ```console
    ng build --prod
 ```

### Testes

- Para executar os testes:
 ```console
    ng test
 ```

### Criar um Novo Domínio

- Use o _Module Generate_ para gerar um módulo:
 ```console
    npm run g-module nome-do-modulo
 ```
Desta forma ele criará toda a estrutura de diretórios para o novo módulo (seguindo os padrões do projeto).

### Contextualização para LLM

- Use o _update-context_ para gerar um documento (.txt) de contextualização para LLM:

A ferramenta gera um documento de contextualização para qualquer ferramenta LLM (por exemplo: _ChatGPT_), 
que contextualiza a modelo artficial com os padrões específicos do projeto.
**Observação:** Lembre-se de deixar claro para seguir o padrão do projeto da base de conhecimento.
 ```console
    npm run llm-guide
 ```
Desta forma ele criará um arquivo que terá toda a estrutura de código do projeto para a LLM

---

## **Contribuindo**

Sinta-se à vontade para criar novos módulos, pipes e validadores, mas siga as boas práticas descritas acima. Mantenha a documentação atualizada e adicione comentários claros ao código.

---

## **Referências**

- [Documentação Oficial Angular](https://angular.io/docs)
- [Bootstrap](https://getbootstrap.com/)
- [Guia de Estilo Angular](https://angular.io/guide/styleguide)

---

Este boilerplate é uma base robusta para aplicações Angular escaláveis e de fácil manutenção. 🚀