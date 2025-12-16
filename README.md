# QavTix_Website

## Project Architecture

This project follows the [Bulletproof React](https://github.com/alan2207/bulletproof-react) architecture pattern.

### Folder Structure

```
├── app/                # Next.js App Router (pages, layouts, routes)
├── components/         # Shared UI components (Button, Modal, Card, etc.)
├── config/             # App configuration, environment variables
├── features/           # Feature-based modules
│   └── [feature]/
│       ├── api/        # API calls for this feature
│       ├── components/ # Feature-specific components
│       ├── hooks/      # Feature-specific hooks
│       ├── stores/     # Feature state management
│       ├── types/      # Feature TypeScript types
│       └── index.ts    # Public API (barrel export)
├── hooks/              # Shared React hooks
├── lib/                # Shared utilities, API client, third-party configs
├── providers/          # React context providers (QueryClient, Theme, Auth, etc.)
├── stores/             # Global state management
├── types/              # Global TypeScript types
├── utils/              # Helper functions
└── public/             # Static assets
```

### Import Rules

1. **Features** can import from shared folders (`components/`, `hooks/`, `lib/`, etc.)
2. **Features** must NOT import from other features
3. **Shared code** must NOT import from features
4. Use barrel exports (`index.ts`) to control feature public APIs
