FROM node:lts-alpine3.19
WORKDIR /apps
COPY . .
# Build the necessary packages
RUN npm install -g npm@latest \
    && npm install -g pnpm@latest \
    && pnpm i \
    && pnpm nx build services \
    && pnpm nx build ui \
    && pnpm nx build admin

# Final stage: Create a slim image with the built app
WORKDIR /apps
COPY --from=builder /apps/admin/ .
COPY --from=builder /apps/node_modules /apps/node_modules
EXPOSE 3000
CMD ["pnpm", "start", "-H", "0.0.0.0"]
