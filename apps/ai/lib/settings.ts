import AsyncStorage from '@react-native-async-storage/async-storage';

const settingsKey = 'settings';

export type Settings = {
  apiKey: string;
};

export const getSettings = async (): Promise<Settings> => {
  const settings = await AsyncStorage.getItem(settingsKey);
  return settings ? JSON.parse(settings) : defaultSettings;
};

export const setSettings = async (settings: Settings): Promise<Settings> => {
  await AsyncStorage.setItem(settingsKey, JSON.stringify(settings));
  return settings;
};

export const defaultSettings: Settings = {
  apiKey: '',
};