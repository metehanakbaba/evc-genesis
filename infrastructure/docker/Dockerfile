# Use the official Node.js 20 LTS image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Create workspace structure and copy package files
RUN mkdir -p apps/admin-web packages/shared/api packages/shared/business-logic packages/shared/store packages/shared/types packages/shared/utils packages/design/tokens

COPY apps/admin-web/package.json ./apps/admin-web/
COPY packages/shared/api/package.json ./packages/shared/api/
COPY packages/shared/business-logic/package.json ./packages/shared/business-logic/
COPY packages/shared/store/package.json ./packages/shared/store/
COPY packages/shared/types/package.json ./packages/shared/types/
COPY packages/shared/utils/package.json ./packages/shared/utils/
COPY packages/design/tokens/package.json ./packages/design/tokens/

# Install dependencies (use npm install instead of ci for workspace compatibility)
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy shared packages
COPY packages/shared ./packages/shared
COPY packages/design ./packages/design

# Set environment variables for optimized build
ENV NEXT_TELEMETRY_DISABLED=1 \
    CI=true \
    NODE_ENV=production \
    NX_CLOUD_DISTRIBUTED_EXECUTION=false \
    NX_CLOUD_ACCESS_TOKEN=""

# Build shared packages first using NX (disable cloud explicitly)
RUN npx nx run-many --target=build --projects=@evc/shared-api,@evc/shared-types,@evc/shared-store,@evc/shared-utils,@evc/design-tokens --parallel=3 --no-cloud

# Build the admin app using NX
RUN npx nx build admin-web --configuration=docker --skip-nx-cache --no-cloud

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the built application
COPY --from=builder /app/apps/admin-web/public ./apps/admin-web/public

# Set the correct permission for prerender cache
RUN mkdir -p apps/admin-web/.next
RUN chown nextjs:nodejs apps/admin-web/.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin-web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin-web/.next/static ./apps/admin-web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "apps/admin-web/server.js"] 