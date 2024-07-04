FROM node

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY prisma/schema.prisma ./prisma/

RUN npm run prisma:generate

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["npm", "start"]
