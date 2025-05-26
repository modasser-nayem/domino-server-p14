FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# Make entrypoint executable
RUN chmod +x ./entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]

CMD [ "npm", "start" ]