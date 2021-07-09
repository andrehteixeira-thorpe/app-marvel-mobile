## Começando

Para executar esse projeto você precisa ter o Expo instalado.
Para instalar o Expo execute o camondo: 

```bash
npm install -g expo-cli
```

Em seguida, instale as dependências do projeto:

```bash
yarn install
```

Agora, crie o arquivo `.env` na raiz do projeto com a PUBLIC_KEY e a PRIVATE_KEY da sua conta Marvel para poder ter acesso a API da Marvel e a como: BASE_URL=https://gateway.marvel.com/v1/public. 
Há um exemplo no arquivo: `.env.example`. Você pode usá-lo para criar um arquivo .env ou criar um novo arquivo com suas credenciais da Marvel.

Inicie o projeto com:

```bash
yarn start
```

Agora voce pode ver o app funcionando em um Simulador no Mac, Emulardo Android ou direto no seu dispositivo Andoid ou iOS instalando o app Expo Go na sua loja de aplcativos.

## Autor
Desenvolvido por André Teixeira. Dúvidas ou sugestão: andreteixera@gmail.com