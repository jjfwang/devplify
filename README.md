# Devplify - Full-Stack TypeScript Monorepo

A modern monorepo demonstrating cross-platform type sharing between **Web (Next.js)**, **Mobile (React Native/Expo)**, and **Backend (NestJS/GraphQL)** applications.

## 🚀 Features

- **🔗 Cross-Platform Type Safety**: Shared TypeScript types across all platforms
- **📱 Multi-Platform Support**: Web, iOS, Android, and Backend in one repo
- **🛠️ Shared Utilities**: Common validation and utility functions
- **🎯 Type-Safe APIs**: GraphQL with automatically generated types
- **📦 Monorepo Architecture**: Organized workspace with shared packages
- **🔄 Hot Reloading**: Development mode across all platforms simultaneously

## 📁 Project Structure

```
devplify/
├── apps/
│   ├── frontend/           # Next.js web application
│   ├── mobile/            # React Native mobile app (Expo)
│   └── backend/           # NestJS GraphQL API
├── packages/
│   ├── shared-types/      # Shared TypeScript types
│   └── shared-utils/      # Shared utility functions
├── prisma/
│   └── schema.prisma      # Database schema
├── package.json           # Root package.json
└── turbo.json            # Turborepo configuration
```

## 🔧 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devplify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build shared packages**
   ```bash
   cd packages/shared-types && npm run build
   cd ../shared-utils && npm run build
   ```

4. **Start all development servers**
   ```bash
   # Starts backend, frontend, and mobile simultaneously
   npm run dev
   
   # Or start individual platforms
   npm run dev:backend    # NestJS API on port 3001
   npm run dev:web       # Next.js on port 3000  
   npm run dev:mobile    # Expo development server
   ```

## 🎯 Applications

### 🌐 Frontend (Next.js)
- **Location**: `apps/frontend/`
- **URL**: http://localhost:3000
- **Tech Stack**: Next.js, NextAuth, URQL, Material UI
- **Features**: 
  - Modern React with TypeScript
  - Shared types for type-safe forms
  - Integration with GraphQL backend
  - Responsive design

### 📱 Mobile (React Native + Expo)
- **Location**: `apps/mobile/`
- **Features**:
  - Cross-platform iOS/Android/Web
  - Expo Router for navigation
  - Shared types and utilities
  - Type-safe mobile development

**Mobile Commands:**
```bash
cd apps/mobile

# Development
npm run dev          # Start Expo dev server
npm run ios         # iOS simulator
npm run android     # Android emulator
npm run web         # Web browser

# Building
npm run build:ios
npm run build:android
```

### ⚙️ Backend (NestJS + GraphQL)
- **Location**: `apps/backend/`
- **URL**: http://localhost:3001/graphql
- **Tech Stack**: NestJS, GraphQL, Prisma ORM
- **Features**:
  - GraphQL API with type generation
  - Prisma ORM for database
  - Authentication and authorization
  - Auto-generated TypeScript types

## 🎮 Development Scripts

### Root Level Commands
```bash
# Development (all platforms)
npm run dev              # Start backend + frontend + mobile
npm run dev:duo         # Start only backend + frontend  

# Individual platforms
npm run dev:web         # Frontend only
npm run dev:backend     # Backend only  
npm run dev:mobile      # Mobile only

# Mobile specific
npm run start:mobile    # Start mobile dev server
npm run build:mobile    # Build mobile app

# Setup
npm install             # Install all dependencies
npx prisma generate     # Generate Prisma client
npx prettier --write .  # Format code
```

## 📦 Shared Packages

### 🏷️ Shared Types (`@devplify/shared-types`)
**Location**: `packages/shared-types/`

Common TypeScript interfaces used across all platforms:

```typescript
// User types
export interface User {
  id: string;
  name?: string;
  email?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  name?: string;
  email: string;
  role?: string;
}

// Post types  
export interface Post {
  id: string;
  title: string;
  content?: string;
  published: boolean;
  authorId?: string;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
}
```

### 🔧 Shared Utils (`@devplify/shared-utils`)
**Location**: `packages/shared-utils/`

Common utility functions available everywhere:

```typescript
// Validation
export const validateEmail = (email: string): boolean => { /* ... */ }
export const validatePassword = (password: string): boolean => { /* ... */ }

// Formatting
export const formatDate = (date: Date | string): string => { /* ... */ }
export const formatDateTime = (date: Date | string): string => { /* ... */ }

// Pagination
export const calculatePagination = (params: PaginationParams) => { /* ... */ }
```

## 🔗 Type Sharing in Action

### Example: Creating a User

**1. Define types once** (`packages/shared-types/src/types.ts`):
```typescript
export interface CreateUserInput {
  name?: string;
  email: string;
  role?: string;
}
```

**2. Use in Frontend** (`apps/frontend/components/UserForm.tsx`):
```typescript
import { CreateUserInput } from '@devplify/shared-types';

const [user, setUser] = useState<CreateUserInput>({
  email: '',
  name: '',
  role: 'user'
});
```

**3. Use in Mobile** (`apps/mobile/app/profile.tsx`):
```typescript
import { CreateUserInput } from '@devplify/shared-types';

const [formData, setFormData] = useState<CreateUserInput>({
  email: '',
  name: '',
  role: 'user'  
});
```

**4. Use in Backend** (`apps/backend/src/user/user.service.ts`):
```typescript
import { CreateUserInput } from '@devplify/shared-types';

async createUser(input: CreateUserInput): Promise<User> {
  // Implementation
}
```

## 📊 Benefits of This Architecture

### ✅ Type Safety
- **Single Source of Truth**: Types defined once, used everywhere
- **Compile-time Errors**: Catch issues before runtime
- **IntelliSense**: Auto-completion across all platforms
- **Refactoring Safety**: Changes propagate automatically

### ✅ Developer Experience
- **Hot Reloading**: All platforms update automatically
- **Shared Utilities**: No code duplication
- **Consistent APIs**: Same interfaces everywhere
- **Easy Debugging**: Shared error handling

### ✅ Maintainability  
- **Centralized Types**: Update once, apply everywhere
- **Consistent Validation**: Same rules across platforms
- **Reduced Bugs**: Type system prevents common errors
- **Scalable Architecture**: Easy to add new platforms

## 🧪 Testing Type Safety

Visit the mobile app's demo screen (`/demo`) or web app for interactive examples of:

- ✅ Type-safe form creation
- ✅ Shared validation functions  
- ✅ Cross-platform utilities
- ✅ Auto-completion and error checking
- ✅ Refactoring safety demonstration

## 🤝 Contributing

1. **Add new types**: Update `packages/shared-types/src/types.ts`
2. **Add utilities**: Update `packages/shared-utils/src/utils.ts`  
3. **Build packages**: `npm run build` in package directories
4. **Test across platforms**: Ensure changes work in web, mobile, and backend
5. **Maintain type safety**: All changes should be type-safe

## 📄 License

MIT License - see LICENSE file for details

---

**Ready to build type-safe, cross-platform applications? Get started with `npm run dev`! 🚀**