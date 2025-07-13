import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { User, UpdateUserInput } from '@devplify/shared-types';

export default function ProfileScreen() {
  // Mock user data using shared types
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'developer',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UpdateUserInput>({
    name: user.name || '',
    email: user.email || '',
    role: user.role,
  });

  const handleSave = () => {
    // In a real app, this would make an API call
    const updatedUser: User = {
      ...user,
      ...editForm,
      updatedAt: new Date(),
    };
    
    setUser(updatedUser);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      role: user.role,
    });
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>User information and settings</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(user.name || 'U').charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.userInfo}>
          {isEditing ? (
            <>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                value={editForm.name}
                onChangeText={(text) => setEditForm({ ...editForm, name: text })}
                placeholder="Enter your name"
              />

              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={editForm.email}
                onChangeText={(text) => setEditForm({ ...editForm, email: text })}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.label}>Role:</Text>
              <TextInput
                style={styles.input}
                value={editForm.role}
                onChangeText={(text) => setEditForm({ ...editForm, role: text })}
                placeholder="Enter your role"
              />

              <View style={styles.editButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userRole}>Role: {user.role}</Text>
              
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Member since:</Text>
                <Text style={styles.dateValue}>
                  {user.createdAt.toLocaleDateString()}
                </Text>
              </View>
              
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Last updated:</Text>
                <Text style={styles.dateValue}>
                  {user.updatedAt.toLocaleDateString()}
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View style={styles.typeInfo}>
        <Text style={styles.typeInfoTitle}>🔒 Type Safety Demo</Text>
        <Text style={styles.typeInfoText}>
          This profile uses the same User and UpdateUserInput types that are 
          shared between the frontend, mobile app, and backend. Changes here 
          would be type-safe across all platforms.
        </Text>
      </View>

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
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    width: '100%',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  userRole: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  dateInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
  },
  dateValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  saveButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  typeInfo: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  typeInfoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
