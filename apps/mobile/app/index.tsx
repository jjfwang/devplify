import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { User, Post } from '@devplify/shared-types';

// Mock data using shared types
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Welcome to Devplify',
    content: 'This is a sample post using shared types across platforms.',
    published: true,
    authorId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    author: mockUsers[0],
  },
  {
    id: '2',
    title: 'Cross-Platform Development',
    content: 'Building with shared types between web, mobile, and backend.',
    published: true,
    authorId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    author: mockUsers[1],
  },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulate API calls
    setPosts(mockPosts);
    setUsers(mockUsers);
  }, []);

  const handlePostPress = (post: Post) => {
    Alert.alert(
      post.title,
      `By: ${post.author?.name}\n\n${post.content}`,
      [{ text: 'OK' }]
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity style={styles.postCard} onPress={() => handlePostPress(item)}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postAuthor}>By: {item.author?.name}</Text>
      <Text style={styles.postContent} numberOfLines={2}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Devplify Mobile</Text>
        <Text style={styles.subtitle}>Cross-Platform Type-Safe Development</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{users.length}</Text>
          <Text style={styles.statLabel}>Users</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{posts.length}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/posts')}
        >
          <Text style={styles.navButtonText}>View All Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={[styles.navButton, styles.demoButton]}
          onPress={() => router.push('/demo')}
        >
          <Text style={styles.navButtonText}>🔗 Type Sharing Demo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item: Post) => item.id}
        style={styles.postsList}
      />
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
    alignItems: 'center',
    marginBottom: 30,
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
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  navButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  navButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  demoButton: {
    backgroundColor: '#FF9500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  postsList: {
    flex: 1,
  },
  postCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
