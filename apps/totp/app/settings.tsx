import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Header, Button } from 'ui';

export default function () {
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
          <Button text="Backup" onPress={() => {}} />
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
