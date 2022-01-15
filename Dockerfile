FROM node:14-alpine3.10 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite*.ts ./
RUN npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx:1.19.0-alpine
COPY --from=ts-compiler /usr/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8099
CMD ["nginx", "-g", "daemon off;"]
