# Dependencies
FROM node:16-alpine AS deps
# See https://t.ly/xJB9 for why this may be needed
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm i --frozen-lockfile

# Build
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Prod
FROM node:16-alpine AS prod
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 next
RUN adduser --system --uid 1001 next
COPY --from=builder /app/public ./public
COPY --from=builder --chown=next:next /app/.next/standalone ./
COPY --from=builder --chown=next:next /app/.next/static ./.next/static
COPY --from=builder --chown=next:next /app/.env ./
USER next
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
