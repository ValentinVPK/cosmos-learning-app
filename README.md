# Cosmos Explorer

This is a modern application for exploring and interacting with Cosmos blockchains, built with cutting-edge technologies.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supported Chains

The application currently supports the following Cosmos chains:

- **Mantra Testnet** (Chain ID: mantrachaintestnet2)
- **Celestia Mainnet** (Chain ID: celestia)
- **Noble Testnet** (Chain ID: nobletestnet)
- **Osmosis Testnet** (Chain ID: osmosistestnet)

## Technology Stack

### Core Libraries

- **Next.js** (v15.1.7) - The React framework for building web applications
- **React** (v19.0.0) - A JavaScript library for building user interfaces

### Blockchain Libraries

- **@cosmjs/stargate** (v0.33.0) - CosmJS Stargate client for connecting to Cosmos blockchains
- **@cosmos-kit/react** (v2.21.7) - React components for Cosmos blockchain integration
- **@cosmos-kit/keplr** (v2.14.7) - Keplr wallet integration for Cosmos Kit
- **chain-registry** (v1.69.135) - A registry of Cosmos chains and assets

### UI Libraries

- **@interchain-ui/react** (v1.26.2) - UI components for Interchain applications
- **shadcn/ui** - Beautifully designed components built with Radix UI and Tailwind CSS
- **Tailwind CSS** (v4.0.9) - A utility-first CSS framework for rapid UI development

### Utility Libraries

- **Zod** (v3.24.2) - TypeScript-first schema validation with static type inference

## Features

- Connect to multiple Cosmos chains
- View blockchain data and interact with smart contracts
- Modern and responsive UI built with Tailwind CSS and shadcn/ui
- Type-safe development with TypeScript

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [CosmJS Documentation](https://github.com/cosmos/cosmjs)
- [Cosmos Kit Documentation](https://docs.cosmoskit.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
