import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Post, User } from '@devplify/shared-types';

// Mock data using shared types
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React Native',
    content: 'Learn the basics of React Native development with TypeScript and shared types across your entire stack.',
    published: true,
    authorId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    author: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'developer',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: '2',
    title: 'Monorepo Best Practices',
    content: 'How to structure a monorepo with shared packages for web, mobile, and backend applications.',
    published: true,
    authorId: '2',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    author: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'architect',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: '3',
    title: 'Type-Safe API Development',
    content: 'Building APIs with TypeScript, GraphQL, and Prisma for maximum type safety.',
    published: true,
    authorId: '3',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    author: {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'backend-engineer',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
];

export default function PostsScreen() {
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <View style={styles.postMeta}>
        <Text style={styles.postAuthor}>By: {item.author?.name}</Text>
        <Text style={styles.postRole}>({item.author?.role})</Text>
      </View>
      <Text style={styles.postDate}>
        {item.createdAt.toLocaleDateString()}
      </Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postFooter}>
        <Text style={styles.postStatus}>
          Status: {item.published ? '✅ Published' : '⏳ Draft'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Posts</Text>
        <Text style={styles.subtitle}>
          Demonstrating shared types across platforms
        </Text>
      </View>
      
      <FlatList
        data={mockPosts}
        renderItem={renderPost}
        keyExtractor={(item: Post) => item.id}
        style={styles.postsList}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  postsList: {
    flex: 1,
  },
  postCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: '#007AFF',
    marginRight: 5,
  },
  postRole: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  postDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 15,
  },
  postFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  postStatus: {
    fontSize: 14,
    color: '#666',
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
