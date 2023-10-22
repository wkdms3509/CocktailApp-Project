FROM node:20-alpine AS base

FROM base AS deps

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

# RUN npm ci --production
RUN npm install -g npm@latest
RUN npm ci

FROM base AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# RUN npm ci
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]

# FROM node:20-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm ci

# COPY . .

# EXPOSE 3000

# CMD ["npm", "run", "dev"]