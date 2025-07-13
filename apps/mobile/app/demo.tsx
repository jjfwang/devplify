import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { User, Post, CreateUserInput, CreatePostInput } from '@devplify/shared-types';
import { validateEmail, validatePassword, formatDate, formatDateTime } from '@devplify/shared-utils';

export default function TypeSharingDemoScreen() {
  const [user, setUser] = useState<CreateUserInput>({
    name: '',
    email: '',
    role: 'user',
  });

  const [post, setPost] = useState<CreatePostInput>({
    title: '',
    content: '',
    published: false,
  });

  const [validationResults, setValidationResults] = useState({
    emailValid: false,
    passwordValid: false,
  });

  const handleValidateEmail = () => {
    const isValid = validateEmail(user.email);
    setValidationResults(prev => ({ ...prev, emailValid: isValid }));
    Alert.alert(
      'Email Validation',
      `Email "${user.email}" is ${isValid ? 'valid' : 'invalid'}`,
      [{ text: 'OK' }]
    );
  };

  const handleValidatePassword = () => {
    const testPassword = 'testpassword123';
    const isValid = validatePassword(testPassword);
    setValidationResults(prev => ({ ...prev, passwordValid: isValid }));
    Alert.alert(
      'Password Validation',
      `Password "${testPassword}" is ${isValid ? 'valid' : 'invalid'} (must be 8+ characters)`,
      [{ text: 'OK' }]
    );
  };

  const handleCreateUser = () => {
    if (!validateEmail(user.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Simulate creating a user with shared types
    const newUser: User = {
      id: Date.now().toString(),
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Alert.alert(
      'User Created',
      `✅ User "${newUser.name}" created successfully!\n\nType: ${typeof newUser}\nCreated: ${formatDateTime(newUser.createdAt)}`,
      [{ text: 'OK' }]
    );
  };

  const handleCreatePost = () => {
    if (!post.title.trim()) {
      Alert.alert('Error', 'Please enter a post title');
      return;
    }

    // Simulate creating a post with shared types
    const newPost: Post = {
      id: Date.now().toString(),
      title: post.title,
      content: post.content,
      published: post.published || false,
      authorId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Alert.alert(
      'Post Created',
      `✅ Post "${newPost.title}" created successfully!\n\nType: ${typeof newPost}\nCreated: ${formatDate(newPost.createdAt)}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔗 Type Sharing Demo</Text>
        <Text style={styles.subtitle}>
          This screen demonstrates shared types and utilities working across platforms
        </Text>
      </View>

      {/* User Creation Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Create User (CreateUserInput → User)</Text>
        
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={(text: string) => setUser({ ...user, name: text })}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email:</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputWithButton]}
            value={user.email}
            onChangeText={(text: string) => setUser({ ...user, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.validateButton} onPress={handleValidateEmail}>
            <Text style={styles.validateButtonText}>
              {validationResults.emailValid ? '✅' : '❓'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Role:</Text>
        <TextInput
          style={styles.input}
          value={user.role}
          onChangeText={(text: string) => setUser({ ...user, role: text })}
          placeholder="Enter role (user, admin, etc.)"
        />

        <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
          <Text style={styles.createButtonText}>Create User</Text>
        </TouchableOpacity>
      </View>

      {/* Post Creation Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Create Post (CreatePostInput → Post)</Text>
        
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={post.title}
          onChangeText={(text: string) => setPost({ ...post, title: text })}
          placeholder="Enter post title"
        />

        <Text style={styles.label}>Content:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={post.content}
          onChangeText={(text: string) => setPost({ ...post, content: text })}
          placeholder="Enter post content"
          multiline
          numberOfLines={4}
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setPost({ ...post, published: !post.published })}
          >
            <Text style={styles.checkboxText}>
              {post.published ? '✅' : '⬜'} Published
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
          <Text style={styles.createButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>

      {/* Utility Functions Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛠️ Shared Utility Functions</Text>
        
        <TouchableOpacity style={styles.utilityButton} onPress={handleValidatePassword}>
          <Text style={styles.utilityButtonText}>
            Test Password Validation {validationResults.passwordValid ? '✅' : '❓'}
          </Text>
        </TouchableOpacity>

        <View style={styles.utilityDemo}>
          <Text style={styles.utilityText}>
            📅 Current Date: {formatDate(new Date())}
          </Text>
          <Text style={styles.utilityText}>
            🕐 Current DateTime: {formatDateTime(new Date())}
          </Text>
        </View>
      </View>

      {/* Type Safety Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>🔒 Type Safety Benefits</Text>
        <Text style={styles.infoText}>
          • Same User and Post types across web, mobile, and backend{'\n'}
          • Shared validation functions work everywhere{'\n'}
          • Utility functions have consistent behavior{'\n'}
          • IntelliSense and error checking in all platforms{'\n'}
          • Refactoring changes propagate automatically
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.push('/')}
      >
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
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
    lineHeight: 22,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputWithButton: {
    flex: 1,
    marginRight: 10,
    marginBottom: 0,
  },
  validateButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
  },
  validateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    marginVertical: 10,
  },
  checkbox: {
    padding: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },
  createButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  createButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  utilityButton: {
    backgroundColor: '#FF9500',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  utilityButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  utilityDemo: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  utilityText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 40,
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
