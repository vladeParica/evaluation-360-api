FROM node:18-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "start"] 