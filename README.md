# custom_node_n8n

Este projeto implementa um conector personalizado para o n8n que gera um número inteiro aleatório dentro de um intervalo definido (min e max) utilizando a API da Random.org.

## Tecnologias utilizadas

- Node.js 22 (LTS)
- TypeScript
- Docker + Docker Compose
- PostgreSQL
- n8n (self-hosted)
- Axios (para requisição HTTP)

## Estrutura do Projeto

- `.n8n/custom/random-node/Random.node.ts`: Implementação do conector personalizado.
- `docker-compose.yml`: Configuração dos serviços Docker (n8n e PostgreSQL).
- `README.md`: Documentação do projeto.

## Como rodar o projeto localmente

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd custom_node_n8n
```

2. Inicie os containers do Docker:

```bash
docker-compose up -d
```

3. Acesse o n8n em `http://localhost:5678/setup`.

4. Instalar e compilar o Custom Node

Dentro da pasta do node:

```bash
cd .n8n/custom/random-node
npm install
npm run build
```

5. Reiniciar o n8n

Depois de compilar o node, reinicie o serviço para que o conector seja carregado:

```bash
docker compose restart n8n
```

6. Como Usar o Custom Node

Acesse o editor do n8n: http://localhost:5678

Clique em “+ Add Node”

Pesquise por “Random”

Configure os parâmetros:

- Min: valor mínimo (inteiro)
- Max: valor máximo (inteiro)
  Execute o node

O retorno será um JSON com a estrutura:

```json
{
  "min": 1,
  "max": 100,
  "randomNumber": 42
}
```

## EndPoint utilizado

O node utiliza a API pública da Random.org:

```
GET https://www.random.org/integers/?num=1&min=<MIN>&max=<MAX>&col=1&base=10&format=plain&rnd=new
```

## Desenvolvimento e estrutura do código

Random.node.ts: implementa a descrição do node e a função execute().
package.json: define metadados e dependências do pacote.
tsconfig.json: configuração de compilação TypeScript.
Random.svg: ícone SVG exibido no editor do n8n.
docker-compose.yml: infraestrutura de containers para n8n + PostgreSQL.

## Boas práticas

- Código organizado e tipado com TypeScript
- Requisições HTTP externas isoladas com axios
- Estrutura compatível com guidelines oficiais de custom nodes do n8n
- Nomes de propriedades amigáveis e legíveis
- Documentação detalhada para setup e uso
