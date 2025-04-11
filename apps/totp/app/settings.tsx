import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { Header, Button } from 'ui';
import * as FileSystem from 'expo-file-system';
import { getConfig } from '@/lib/storage';
import * as Sharing from 'expo-sharing';

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
          <Button text="Import" onPress={() => {}} />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.heading}>Clear Data</Text>
          <Text style={styles.text}>Clear all data from the app.</Text>
          <Button text="Clear Data" onPress={() => {}} />
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
