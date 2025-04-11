import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'ui';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Markdown from 'react-native-markdown-display';
import welcome from '../lib/welcome';
import slashCommand from '../lib/slash';

export default function Index() {
  const [output, setOutput] = useState<string>(welcome);
  const [input, setInput] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    setInput('');
    
    const message = input.trim();
    if (message.startsWith('/')) {
      slashCommand(message, setOutput);
      return;
    }

    setOutput(output + 'Hello ' + uuidv4() + '\n\n');
    // Force scroll to bottom after updating output
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 100);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.output} 
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        overScrollMode="never"
      >
        <Markdown>{output}</Markdown>
      </ScrollView>
      <View style={styles.footer}>
        <TextInput placeholder="Ask me anything" containerStyles={styles.inputContainer} value={input} onChangeText={setInput} onSubmitEditing={handleSend} />
        <Button text="Send" onPress={handleSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  output: {
    flex: 1,
    margin: 10,
    marginBottom: 0,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
  scrollContent: {
    padding: 10,
    flexGrow: 1,
  },
  footer: {
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
  },
});
