FROM node:16-alpine AS base
# --platform=linux/amd64
FROM base AS deps
# production / development

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock package-lock.json* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# RUN npm ci
RUN yarn build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV development

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV PATH="/usr/local/bin/yarn:${PATH}"

RUN ls -l ./ \
  && ls -l ./.next/ \
  && ls -l ./.next/static

USER nextjs

CMD [ "node", "server.js" ]