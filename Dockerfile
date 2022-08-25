FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY ./ ./

RUN npm i
RUN npm run build

FROM nginx:alpine

#!/bin/sh
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/build /usr/share/nginx/html

# Same as app's port
EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]