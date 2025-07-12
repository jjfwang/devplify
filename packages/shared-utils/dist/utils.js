"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortBy = exports.groupBy = exports.removeStorageItem = exports.getStorageItem = exports.setStorageItem = exports.extractGraphQLErrors = exports.extractGraphQLData = exports.buildGraphQLQuery = exports.isNetworkError = exports.createErrorMessage = exports.calculatePagination = exports.buildPaginationParams = exports.buildApiUrl = exports.isPostPublished = exports.getPostExcerpt = exports.isUserAdmin = exports.getUserDisplayName = exports.slugify = exports.truncateText = exports.isValidDate = exports.formatDateTime = exports.formatDate = exports.validatePassword = exports.validateEmail = void 0;
// Validation utilities
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
const validatePassword = (password) => {
    return password.length >= 8;
};
exports.validatePassword = validatePassword;
// Date utilities
const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
};
exports.formatDate = formatDate;
const formatDateTime = (date) => {
    const d = new Date(date);
    return d.toLocaleString();
};
exports.formatDateTime = formatDateTime;
const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime());
};
exports.isValidDate = isValidDate;
// String utilities
const truncateText = (text, maxLength) => {
    if (text.length <= maxLength)
        return text;
    return text.substring(0, maxLength) + '...';
};
exports.truncateText = truncateText;
const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
};
exports.slugify = slugify;
// User utilities
const getUserDisplayName = (user) => {
    return user.name || user.email || 'Unknown User';
};
exports.getUserDisplayName = getUserDisplayName;
const isUserAdmin = (user) => {
    return user.role === 'ADMIN' || user.role === 'SUPERUSER';
};
exports.isUserAdmin = isUserAdmin;
// Post utilities
const getPostExcerpt = (post, maxLength = 150) => {
    if (!post.content)
        return '';
    return (0, exports.truncateText)(post.content, maxLength);
};
exports.getPostExcerpt = getPostExcerpt;
const isPostPublished = (post) => {
    return post.published;
};
exports.isPostPublished = isPostPublished;
// API utilities
const buildApiUrl = (baseUrl, endpoint, params) => {
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
exports.buildApiUrl = buildApiUrl;
// Pagination utilities
const buildPaginationParams = (params) => {
    const result = {};
    if (params.page)
        result.page = params.page;
    if (params.limit)
        result.limit = params.limit;
    if (params.orderBy) {
        result.orderBy = params.orderBy.field;
        result.orderDirection = params.orderBy.direction;
    }
    return result;
};
exports.buildPaginationParams = buildPaginationParams;
const calculatePagination = (total, page, limit) => {
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
exports.calculatePagination = calculatePagination;
// Error handling utilities
const createErrorMessage = (error) => {
    if (typeof error === 'string')
        return error;
    if (error?.message)
        return error.message;
    if (error?.error)
        return error.error;
    return 'An unexpected error occurred';
};
exports.createErrorMessage = createErrorMessage;
const isNetworkError = (error) => {
    return error?.code === 'NETWORK_ERROR' ||
        error?.message?.includes('fetch') ||
        error?.message?.includes('network');
};
exports.isNetworkError = isNetworkError;
// GraphQL utilities
const buildGraphQLQuery = (query, variables) => {
    return {
        query,
        variables: variables || {},
    };
};
exports.buildGraphQLQuery = buildGraphQLQuery;
const extractGraphQLData = (response) => {
    if (response?.data) {
        return response.data;
    }
    return null;
};
exports.extractGraphQLData = extractGraphQLData;
const extractGraphQLErrors = (response) => {
    if (response?.errors) {
        return response.errors.map((error) => error.message);
    }
    return [];
};
exports.extractGraphQLErrors = extractGraphQLErrors;
// Local storage utilities (for web/mobile)
const setStorageItem = (key, value) => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
    catch (error) {
        console.warn('Failed to set storage item:', error);
    }
};
exports.setStorageItem = setStorageItem;
const getStorageItem = (key) => {
    try {
        if (typeof window !== 'undefined') {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
    }
    catch (error) {
        console.warn('Failed to get storage item:', error);
    }
    return null;
};
exports.getStorageItem = getStorageItem;
const removeStorageItem = (key) => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    }
    catch (error) {
        console.warn('Failed to remove storage item:', error);
    }
};
exports.removeStorageItem = removeStorageItem;
// Array utilities
const groupBy = (array, key) => {
    return array.reduce((groups, item) => {
        const group = String(item[key]);
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(item);
        return groups;
    }, {});
};
exports.groupBy = groupBy;
const sortBy = (array, key, direction = 'asc') => {
    return array.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal < bVal)
            return direction === 'asc' ? -1 : 1;
        if (aVal > bVal)
            return direction === 'asc' ? 1 : -1;
        return 0;
    });
};
exports.sortBy = sortBy;
