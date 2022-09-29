# **server**
Essa pasta armazenará todos os arquivos e diretórios relativos ao desenvolvimento do backend da aplicação.  
A arquitetura escolhida para o desenvolvimento dessa aplicação é a **Arquitetura Hexagonal**.  
  
A seguir, descreveremos o objetivo de cada um dos diretórios armazenados nessa pasta.  
  
---
  
## **domains**
A pasta de **domínio** tem por objetivo armazenar cada uma das entidades do sistema em formato de código puro. Em outras palavras, ela conterá as definições de classes das entidades, bem como os principais métodos relacionados a elas.  
A ideia é que os elementos aqui presentes não tenham dependências externas, principalmente de tecnologias que possam ser alteradas constantemente.  
  
## **gates**
Basicamente, essa pasta contém os "serviços" ou "**portas**" do aplicativo. São arquivos de código com funções que dialogam diretamente com os domínios, instanciando entidades, editando, excluindo, entre outras operações.  
Além disso, os arquivos aqui presentes são os que fazem comunicação direta com o banco de dados e outas features do sistema, fazendo a manipulação de objetos e realizando operações desejadas pelos usuários.  
  
## **routes**
Essa pasta armazena os arquivos de código que fazem a comunicação com o mundo exterior, realizando o consumo dos serviços presentes na pasta "gates". As rotas, nesse caso são os **adaptadores** desenvolvidas para a comunicação dos meios externos com o servidor.  
No geral, espera-se que as rotas escritas nos arquivos dessa pasta sejam curtas, preferencialmente apenas chamando um serviço codificado em "gates" e realizando o tratamento de excessão do mesmo.  
  
## **infrastructure**
Como o próprio nome sugere, cuida da infraestrutura do sistema. Nessa pasta estão arquivos de modelo de entidades no banco de dados escolhido, além de outros arquivos de configuração, como um ".env", por exemplo.  
  
---
  
Nas pastas **domains**, **app** e  **interface**, espera-se que haja arquivos nomeados para as entidades, que serão todos importados por um único arquivo "_index.js_" que, por sua vez, será o arquivo que exportará cada um dos métodos e classes definidos nos arquivos importados. O arquivo "_index.js_" é a face de comunicação com os outros níveis do hexágono.  
  
