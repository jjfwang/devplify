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
export declare const validateEmail: (email: string) => boolean;
export declare const validatePassword: (password: string) => boolean;
export declare const formatDate: (date: Date | string) => string;
export declare const formatDateTime: (date: Date | string) => string;
export declare const isValidDate: (date: any) => boolean;
export declare const truncateText: (text: string, maxLength: number) => string;
export declare const slugify: (text: string) => string;
export declare const getUserDisplayName: (user: User) => string;
export declare const isUserAdmin: (user: User) => boolean;
export declare const getPostExcerpt: (post: Post, maxLength?: number) => string;
export declare const isPostPublished: (post: Post) => boolean;
export declare const buildApiUrl: (baseUrl: string, endpoint: string, params?: Record<string, any>) => string;
export declare const buildPaginationParams: (params: PaginationParams) => Record<string, any>;
export declare const calculatePagination: (total: number, page: number, limit: number) => {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
    startIndex: number;
    endIndex: number;
};
export declare const createErrorMessage: (error: any) => string;
export declare const isNetworkError: (error: any) => boolean;
export declare const buildGraphQLQuery: (query: string, variables?: Record<string, any>) => {
    query: string;
    variables: Record<string, any>;
};
export declare const extractGraphQLData: <T>(response: any) => T | null;
export declare const extractGraphQLErrors: (response: any) => string[];
export declare const setStorageItem: (key: string, value: any) => void;
export declare const getStorageItem: <T>(key: string) => T | null;
export declare const removeStorageItem: (key: string) => void;
export declare const groupBy: <T>(array: T[], key: keyof T) => Record<string, T[]>;
export declare const sortBy: <T>(array: T[], key: keyof T, direction?: "asc" | "desc") => T[];
export {};
