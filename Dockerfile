FROM node:lts-alpine3.19 as builder
WORKDIR /apps
COPY . .
# Build the necessary packages
RUN npm install -g npm@latest \
    && npm install -g pnpm@latest \
    && pnpm i \
    && pnpm nx build services \
    && pnpm nx build ui \
    && pnpm nx build admin
FROM node:lts-alpine3.19 as  runner
WORKDIR /apps
RUN npm install -g pnpm@latest
COPY --from=builder /apps/apps/admin/ .
COPY --from=builder /apps/node_modules /apps/node_modules
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]
