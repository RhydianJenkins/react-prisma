FROM node:13.12.0-alpine
# ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]
