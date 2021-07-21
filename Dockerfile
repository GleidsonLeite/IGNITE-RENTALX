# Definindo a imagem
FROM node

# Definindo onde ficará a aplicação dentro do container
WORKDIR /usr/app

# Copiando apenas o package.json para instalar as dependencias da aplicação
COPY package.json ./

# Instalando as dependências da aplicação
RUN npm install

# Copiando tudo de fora para dentro do container
COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]

# Para criar o container, basta utilizar o terminal:
# docker build -t rentx .
# Para mapear as portas:
# docker run -p 3333:3333 rentx
