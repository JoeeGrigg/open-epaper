import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'ui';
import 'react-native-get-random-values';
import Markdown from 'react-native-markdown-display';
import slashCommand from '../lib/slash';
import promptAI from '../lib/ai';
import { OutputPart, emptyOutput } from '../lib/output';

const defaultInputPlaceholder = 'Ask me anything';

export default function Index() {
  const [output, setOutput] = useState<OutputPart[]>(emptyOutput);
  const [input, setInput] = useState<string>('');
  const [inputPlaceholder, setInputPlaceholder] = useState<string>(defaultInputPlaceholder);
  const [thinking, setThinking] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    setInput('');

    const message = input.trim();
    if (message.startsWith('/')) {
      slashCommand(message, setOutput);
      return;
    }

    setThinking(true);
    let dots = 1;
    const thinkingInterval = setInterval(() => {
      setInputPlaceholder('Thinking' + '.'.repeat(dots));
      dots = dots === 3 ? 1 : dots + 1;
    }, 500);

    const newOutput: OutputPart[] = [...output, { text: message, type: 'me' }];
    setOutput(newOutput);

    try {
      const response = await promptAI(message);
      setOutput([...newOutput, { text: response, type: 'ai' }]);
    } catch (error) {
      console.error(error);
    }

    clearInterval(thinkingInterval);
    setInputPlaceholder(defaultInputPlaceholder);
    setThinking(false);

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
        {output.map((part, index) => (
          <Markdown key={index}>{part.text}</Markdown>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          placeholder={inputPlaceholder}
          containerStyles={styles.inputContainer}
          value={input} onChangeText={setInput}
          onSubmitEditing={handleSend}
          disabled={thinking}
        />
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
