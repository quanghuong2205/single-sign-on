# Build
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN yarn install && yarn build1

# Extract static
FROM nginx:1.27.2
WORKDIR /app
COPY --from=build /app/dist/ dist/
COPY nginx.conf /etc/nginx/nginx.conf
