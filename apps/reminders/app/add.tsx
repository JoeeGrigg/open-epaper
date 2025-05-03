import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Button, TextInput } from 'ui';
import { router } from 'expo-router';

export default function Add() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log({ title, description, dueDate });
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Add Reminder"
        iconLeft="chevron-left"
        iconLeftOnPress={() => router.push('/')}
      />
      <View style={styles.form}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <Button
          //style={styles.saveButton}
          onPress={handleSave}
          text="Save Reminder"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 