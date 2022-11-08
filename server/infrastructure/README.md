# Infrastructure
Essa pasta , como apresentado no [README da pasta raiz](https://github.com/Pe-Guedss/AcadGame/blob/main/server/README.md), tem por objetivo armazenar os arquivos que ditam as configurações do sistema. A seguir, temos uma descrição de cada um dos componentes deste diretório:

## ```.env-sample```
Este arquivo serve para armazenar variáveis de ambiente necessárias às configurações do sistema, de forma a não poluir os arquivos de código com números e letras "mágicos".  
Como muitas informações de configuração são confidenciais, não é possível disponibilizar o arquivo real "```.env```" para visualização pública. Para que o sistema funcione corretamente, você, localmente, deve renomear este arquivo de ```.env-sample``` para ```.env``` e atribuir os valores para todas as configurações listadas no mesmo.  
Como dito anteriormente, esses valores são, muitas vezes, confidenciais. Portanto, se você for membro da equipe de desenvolvimento, apenas solicite aos desenvolvedores Back-end quais são os valores necessários. Caso contrário, você pode montar a infraestrutura por conta própria e atribuir seus próprios valores às configurações.

## ```models```
O mapeamento de objetos relacionais do sistema será feito através do [Sequelize](https://sequelize.org/). Essa pasta é responsável por armazenar os arquivos que definem os modelos de objetos presentes no banco de dados.  
Cada arquivo de script é responsável por definir um objeto e os atributos que devem estar presentes na tabela do mesmo, bem como os objetos de relacionamento. O arquivo ```exerciseSheet```, por exemplo, é uma tabela que relaciona a entidade ```user``` à entidade ```exercise```.