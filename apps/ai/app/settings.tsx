import { View, Alert } from 'react-native';
import { Header, TextInput } from 'ui';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getSettings, setSettings } from '../lib/settings';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      setApiKey(settings.apiKey);
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    Alert.alert(
      'Save Settings',
      'Are you sure you want to save these settings?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: async () => {
            await setSettings({ apiKey });
            router.back();
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Settings"
        iconLeft="chevron-left"
        iconLeftOnPress={() => router.back()}
        icon="save"
        iconOnPress={handleSave}
      />
      <View style={{ flex: 1, padding: 10 }}>
        <TextInput
          label="Gemini API Key"
          description="Your Gemini API key is used to authenticate your requests to the Gemini API."
          value={apiKey}
          onChangeText={setApiKey}
        />
      </View>
    </View>
  );
}