FROM node:16-alpine AS base

FROM base AS deps

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./

RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  # elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi
RUN rm -rf ./.next/cache

# RUN npm ci --production
# RUN npm install -g npm@latest
# RUN npm ci

FROM base AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# RUN npm ci
RUN yarn build

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