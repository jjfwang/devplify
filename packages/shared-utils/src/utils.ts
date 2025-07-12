// Basic types for utilities (to avoid circular dependencies)
interface User {
  id: string;
  name?: string;
  email?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Post {
  id: string;
  title: string;
  content?: string;
  published: boolean;
  authorId?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PaginationParams {
  skip?: number;
  take?: number;
  page?: number;
  limit?: number;
  orderBy?: OrderByParams;
}

interface OrderByParams {
  [key: string]: 'asc' | 'desc';
}

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

// Date utilities
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleString();
};

export const isValidDate = (date: any): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

// String utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

// User utilities
export const getUserDisplayName = (user: User): string => {
  return user.name || user.email || 'Unknown User';
};

export const isUserAdmin = (user: User): boolean => {
  return user.role === 'ADMIN' || user.role === 'SUPERUSER';
};

// Post utilities
export const getPostExcerpt = (post: Post, maxLength: number = 150): string => {
  if (!post.content) return '';
  return truncateText(post.content, maxLength);
};

export const isPostPublished = (post: Post): boolean => {
  return post.published;
};

// API utilities
export const buildApiUrl = (baseUrl: string, endpoint: string, params?: Record<string, any>): string => {
  const url = new URL(endpoint, baseUrl);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
};

// Pagination utilities
export const buildPaginationParams = (params: PaginationParams): Record<string, any> => {
  const result: Record<string, any> = {};
  
  if (params.page) result.page = params.page;
  if (params.limit) result.limit = params.limit;
  if (params.orderBy) {
    result.orderBy = params.orderBy.field;
    result.orderDirection = params.orderBy.direction;
  }
  
  return result;
};

export const calculatePagination = (total: number, page: number, limit: number) => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;
  
  return {
    total,
    totalPages,
    currentPage: page,
    limit,
    hasNext,
    hasPrev,
    startIndex: (page - 1) * limit,
    endIndex: Math.min(page * limit - 1, total - 1),
  };
};

// Error handling utilities
export const createErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An unexpected error occurred';
};

export const isNetworkError = (error: any): boolean => {
  return error?.code === 'NETWORK_ERROR' || 
         error?.message?.includes('fetch') ||
         error?.message?.includes('network');
};

// GraphQL utilities
export const buildGraphQLQuery = (query: string, variables?: Record<string, any>) => {
  return {
    query,
    variables: variables || {},
  };
};

export const extractGraphQLData = <T>(response: any): T | null => {
  if (response?.data) {
    return response.data;
  }
  return null;
};

export const extractGraphQLErrors = (response: any): string[] => {
  if (response?.errors) {
    return response.errors.map((error: any) => error.message);
  }
  return [];
};

// Local storage utilities (for web/mobile)
export const setStorageItem = (key: string, value: any): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.warn('Failed to set storage item:', error);
  }
};

export const getStorageItem = <T>(key: string): T | null => {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  } catch (error) {
    console.warn('Failed to get storage item:', error);
  }
  return null;
};

export const removeStorageItem = (key: string): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.warn('Failed to remove storage item:', error);
  }
};

// Array utilities
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return array.sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};
