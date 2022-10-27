# **server**
Essa pasta armazenará todos os arquivos e diretórios relativos ao desenvolvimento do backend da aplicação.  
A arquitetura escolhida para o desenvolvimento dessa aplicação é a **Arquitetura Hexagonal**.  
  
A seguir, descreveremos o objetivo de cada um dos diretórios armazenados nessa pasta.  
  
---
  
## **domains**
A pasta de **domínio** tem por objetivo armazenar cada uma das entidades do sistema em formato de código puro. Em outras palavras, ela conterá as definições de classes das entidades, bem como os principais métodos relacionados a elas.  
A ideia é que os elementos aqui presentes não tenham dependências externas, principalmente de tecnologias que possam ser alteradas constantemente.  
O padrão de nomenclatura adotado para os arquivos contidos nessa pasta é: "\<nomeDaEntidade\>Domain".  
  
## **gates**
Basicamente, essa pasta contém os "serviços" ou "**portas**" do aplicativo. São arquivos de código com funções limpas de dependências externas, que ainda fazem parte do domínio da aplicação, facilitando a comunicação entre o domínio "puro" (aquele que é referenciado pelas rotas de acesso) e os dados armazenados pelo SGBD escolhido.  
Durante o desenvolvimento do projeto, foi constatado que somente as portas de saída eram necessárias, enquanto as de entrada se mostraram redundantes. Dessa forma, os arquivos aqui presentes são nomeados como "\<nomeDaEntidade\>ExitGate".  
Foi atribuído aos arquivos dessa pasta realizarem a limpa e tratamento dos dados recuperados do SGBD.  
  
## **adapters**
Essa pasta armazena os arquivos de código que fazem a comunicação com o mundo exterior, realizando o consumo das entidades presentes na pasta "domains". Esses **adaptadores** se dividem entre as rotas de comunicação com o mundo exterior (requisições HTTP, por exemplo) e arquivos de comunicação com o SGBD selecionado.  
No geral, espera-se que as rotas escritas nos arquivos dessa pasta sejam curtas, preferencialmente apenas chamando um serviço codificado em "domain" e realizando o tratamento de excessão do mesmo.  
O padrão de nomenclatura dos arquivos dessa pasta é: "\<nomeDaEntidade\>Router" (para adaptadores de requisições http por exemplo) e "\<nomeDaEntidade\>DBAdapter" (para adaptadores de conexão com o banco de dados).  
  
## **infrastructure**
Como o próprio nome sugere, cuida da **infraestrutura** do sistema. Nessa pasta estão arquivos de modelo de entidades no banco de dados escolhido, além de outros arquivos de configuração, como um ".env", por exemplo.  