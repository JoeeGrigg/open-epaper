import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { Header, Button } from 'ui';
import * as FileSystem from 'expo-file-system';
import { getConfig, clearTotps, setConfig } from '@/lib/storage';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

export default function () {
  const handleBackup = async () => {
    try {
      // Get the current TOTP configs
      const config = await getConfig();
      
      // Create a backup file name with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `totp-backup-${timestamp}.json`;
      
      // Create a temporary file in the cache directory
      const tempFilePath = `${FileSystem.cacheDirectory}${fileName}`;
      
      // Write the config to the temporary file
      await FileSystem.writeAsStringAsync(
        tempFilePath,
        JSON.stringify(config, null, 2)
      );
      
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        // Share the file, which will allow the user to save it to their downloads
        await Sharing.shareAsync(tempFilePath, {
          mimeType: 'application/json',
          dialogTitle: 'Save TOTP Backup',
          UTI: 'public.json'
        });
        
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Backup error:', error);
      Alert.alert('Error', 'Failed to create backup');
    }
  };

  const handleImport = async () => {
    try {
      // Use document picker to select a JSON file
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });
      
      if (result.canceled) {
        return;
      }
      
      // Read the file content
      const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
      
      try {
        // Parse the JSON content
        const importedConfig = JSON.parse(fileContent);
        
        // Validate the imported data structure
        if (!importedConfig.totps) {
          throw new Error('Invalid backup file format');
        }
        
        // Confirm with the user before importing
        Alert.alert(
          'Confirm Import',
          'This will replace your current data. Continue?',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Import', 
              onPress: async () => {
                // Save the imported config
                await setConfig(importedConfig);
                Alert.alert('Success', 'Data imported successfully');
              } 
            }
          ]
        );
      } catch {
        Alert.alert('Error', 'Invalid backup file format');
      }
    } catch (error) {
      console.error('Import error:', error);
      Alert.alert('Error', 'Failed to import backup');
    }
  };

  const handleClear = async () => {
    Alert.alert(
      'Confirm Data Clear',
      'Are you sure you want to delete all data from this application? Once deleted it will be unrecoverable...',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: async () => {
          await clearTotps();
          Alert.alert('Success', 'All data has been cleared');
        } }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Settings" iconLeft="chevron-left" iconLeftLink="/" />
      <ScrollView 
        contentContainerStyle={styles.page} 
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={true}
        style={styles.scrollView}
      >
        <View style={styles.section}>
          <Text style={styles.heading}>Backup</Text>
          <Text style={styles.text}>Backup your data to the file system of your device.</Text>
          <Button text="Backup" onPress={handleBackup} />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.heading}>Import</Text>
          <Text style={styles.text}>Import data from the file system of your device.</Text>
          <Button text="Import" onPress={handleImport} />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.heading}>Clear Data</Text>
          <Text style={styles.text}>Clear all data from the app.</Text>
          <Button text="Clear Data" onPress={handleClear} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  scrollView: {
    flex: 1
  },
  section: {
    paddingVertical: 10
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10
  },
  text: {
    marginBottom: 10
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  page: {
    padding: 10
  }
});
