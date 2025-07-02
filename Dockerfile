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

# Copy workspace package files
COPY packages/app/admin/package.json ./packages/app/admin/
COPY packages/shared/*/package.json ./packages/shared/*/
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

# Build the admin app
ENV NEXT_TELEMETRY_DISABLED 1
ENV CI true
ENV NEXT_PRIVATE_SKIP_TYPECHECK true
ENV DISABLE_ESLINT_PLUGIN true
WORKDIR /app/packages/app/admin

# Backup original config and create build-optimized config
RUN cp next.config.ts next.config.ts.backup
RUN echo 'import type { NextConfig } from "next"; \
\
const nextConfig: NextConfig = { \
  output: "standalone", \
  typescript: { ignoreBuildErrors: true }, \
  eslint: { ignoreDuringBuilds: true }, \
  experimental: { \
    turbo: { \
      rules: { \
        "*.svg": { \
          loaders: ["@svgr/webpack"], \
          as: "*.js", \
        }, \
      }, \
    }, \
  }, \
  transpilePackages: [ \
    "@evc/shared-api", \
    "@evc/shared-types", \
    "@evc/design-tokens", \
    "@evc/shared-store", \
    "@evc/shared-utils" \
  ], \
  webpack: (config, { dev, isServer }) => { \
    config.resolve.extensions = [".ts", ".tsx", ".js", ".jsx", ...config.resolve.extensions]; \
    return config; \
  }, \
}; \
\
export default nextConfig;' > next.config.ts

# Build with TypeScript and ESLint errors ignored
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the built application
COPY --from=builder /app/packages/app/admin/public ./packages/app/admin/public

# Set the correct permission for prerender cache
RUN mkdir -p packages/app/admin/.next
RUN chown nextjs:nodejs packages/app/admin/.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/packages/app/admin/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/app/admin/.next/static ./packages/app/admin/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "packages/app/admin/server.js"] 