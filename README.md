# Projeto React de Classificação de Dados com Algoritmos de IA

Este projeto React foi desenvolvido para a classificação de dados utilizando algoritmos de Inteligência Artificial (IA) como KNN (K-Nearest Neighbors), Árvore de Decisão e Algoritmo Genético. Para utilizar este projeto, é necessário configurar e executar a API Flask que fornece os serviços de classificação de dados.

## Estrutura de Pastas e Arquivos

A estrutura de pastas e arquivos do projeto é organizada da seguinte forma:

```
app/
├── assets/
├── components/
├── constants/
├── hooks/
├── scripts/
├── .gitignore
├── README.md
├── app.json
├── babel.config.js
├── package-lock.json
├── package.json
└── tsconfig.json
```

- **assets/**: Contém recursos estáticos como imagens, ícones, etc.
- **components/**: Componentes React reutilizáveis para a interface do usuário.
- **constants/**: Arquivos contendo constantes ou configurações específicas do projeto.
- **hooks/**: Hooks personalizados para lógica compartilhada entre componentes.
- **scripts/**: Scripts de utilidade para tarefas específicas do projeto.
- **.gitignore**: Arquivo de configuração do Git para ignorar arquivos/diretórios específicos.
- **README.md**: Documentação principal do projeto (este arquivo).
- **app.json**: Configurações específicas do Expo para a aplicação.
- **babel.config.js**: Configuração do Babel para transpilação de código.
- **package-lock.json**: Arquivo de bloqueio do npm para controle preciso de dependências.
- **package.json**: Arquivo de manifesto do npm com informações sobre o projeto e suas dependências.
- **tsconfig.json**: Configurações do TypeScript, se aplicável ao projeto.

## Padrão do Expo

Este projeto segue o padrão do Expo para desenvolvimento de aplicativos móveis. Ao iniciar o projeto, siga as instruções abaixo:

1. Instale as dependências:

   ```
   npm install
   ```

2. Inicie o aplicativo:

   ```
   npx expo start
   ```

   No output, você encontrará opções para abrir o aplicativo em um:

   - Build de desenvolvimento
   - Emulador Android
   - Simulador iOS
   - Expo Go, um ambiente sandbox limitado para experimentar o desenvolvimento de aplicativos com Expo

3. Você pode começar a desenvolver editando os arquivos dentro do diretório `app`. Este projeto utiliza o roteamento baseado em arquivos.

4. Quando estiver pronto para iniciar um novo projeto, execute:

   ```
   npm run reset-project
   ```

   Este comando moverá o código inicial para o diretório `app-example` e criará um diretório de aplicativo em branco onde você pode começar a desenvolver.

## Configuração e Execução da API Flask

Para utilizar as funcionalidades de classificação de dados, é necessário configurar e executar a API Flask que fornece os serviços. Siga os passos abaixo para configurar e executar a API:

1. Clone o repositório da API Flask:

   ```bash
   git clone https://github.com/mayarakaren/API-Flask.git
   ```

2. Navegue até o diretório do projeto da API Flask:

   ```bash
   cd API-Flask
   ```

3. Instale as dependências Python listadas no arquivo `requirements.txt`:

   ```bash
   pip install -r requirements.txt
   ```

4. Execute o servidor Flask para iniciar a API:

   ```bash
   python app.py
   ```

   O servidor Flask será iniciado e a API estará disponível localmente em http://localhost:5000/.

## Utilizando a API

A API oferece funcionalidades para classificação de dados usando diferentes algoritmos de aprendizado de máquina. A base URL da API é http://localhost:5000/.

### Métodos da API

1. **Classificação**

   - **Endpoint:** /classify
   - **Método:** POST
   - **Parâmetros de Requisição:**
     - `algorithm` (string): O algoritmo a ser utilizado (knn, algGenetico, arvore)
     - `filePath` (string): (Somente para algoritmo 'arvore') Caminho do arquivo contendo os dados (opcional)
   - **Corpo da Requisição:**

     ```json
     {
         "algorithm": "knn"
     }
     ```

   - **Resposta de Sucesso:**

     ```json
     {
         "output": "Resultado da classificação",
         "acurácia": "Valor da acurácia (N/A se não aplicável)",
         "imagem": "URL para a imagem de saída (se aplicável)"
     }
     ```

   - **Resposta de Erro:**

     ```json
     {
         "erro": "Descrição do erro"
     }
     ```

2. **Servir Imagem**

   - **Endpoint:** /imagens/<path:filename>
   - **Método:** GET
   - **Parâmetros de Requisição:**
     - `filename` (string): Nome do arquivo de imagem

### Atualizando o IP da API no Projeto React

No trecho do código do projeto React onde é feita a requisição à API, é necessário atualizar o IP para o endereço da sua máquina física. Por exemplo:

```javascript
const classifyResponse = await fetch('http://SEU_IP_AQUI:5000/classify', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath: filePath,
          algorithm: algorithm,
        }),
      });
```

Substitua `SEU_IP_AQUI` pelo endereço IP da sua máquina física onde a API Flask está sendo executada.

## Aprenda Mais

Para aprender mais sobre o desenvolvimento do seu projeto com Expo, consulte os recursos a seguir:

- [Documentação do Expo](https://docs.expo.dev/): Aprenda os fundamentos ou aprofunde-se em tópicos avançados com nossos guias.
- [Tutorial do Expo](https://docs.expo.dev/tutorial/): Siga um tutorial passo a passo onde você criará um projeto que roda em Android, iOS e web.
- [Expo no GitHub](https://github.com/expo/expo): Visualize nossa plataforma de código aberto e contribua.
- [Comunidade Discord](https://discord.gg/expo): Converse com usuários do Expo e faça perguntas.

## Contato



Para qualquer dúvida ou sugestão, entre em contato conosco na nossa comunidade do Discord ou abra uma issue em nosso repositório no GitHub.

---
