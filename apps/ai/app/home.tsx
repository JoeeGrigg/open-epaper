import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'ui';
import 'react-native-get-random-values';
import Markdown from 'react-native-markdown-display';
import { createAIChat, sendChatMessage } from '../lib/ai';
import { OutputPart, emptyOutput } from '../lib/output';
import { Chat } from '@google/genai';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ButtonModal } from 'ui';
import { router } from 'expo-router';

const defaultInputPlaceholder = 'Ask me anything';

export default function Index() {
  const [output, setOutput] = useState<OutputPart[]>(emptyOutput);
  const [input, setInput] = useState<string>('');
  const [inputPlaceholder, setInputPlaceholder] = useState<string>(defaultInputPlaceholder);
  const [thinking, setThinking] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const resetOutput = () => {
    setOutput(emptyOutput);
    setInput('');
    setInputPlaceholder(defaultInputPlaceholder);
    setThinking(false);
  };

  useEffect(() => {
    createChat();
  }, []);

  const createChat = async () => {
    resetOutput();
    const chat = await createAIChat();
    setChat(chat);
  };

  const scrollToBottom = (delay: number = 100) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, delay);
  };

  const handleSend = async () => {
    setInput('');
    const message = input.trim();
    setThinking(true);

    let dots = 1;
    const thinkingInterval = setInterval(() => {
      setInputPlaceholder('Thinking' + '.'.repeat(dots));
      dots = dots === 3 ? 1 : dots + 1;
    }, 500);

    const newOutput: OutputPart[] = [...output, { text: message, type: 'me' }];
    setOutput(newOutput);
    scrollToBottom();

    if (!chat) return;
    try {
      const response = await sendChatMessage(chat, message);
      setOutput([...newOutput, { text: response || '', type: 'ai' }]);
    } catch (error) {
      console.error(error);
    }

    clearInterval(thinkingInterval);
    setInputPlaceholder(defaultInputPlaceholder);
    setThinking(false);

    scrollToBottom();
  };

  const optionButtons = [
    { text: 'New Chat', onPress: () => createChat() },
    { text: 'Clear', onPress: () => resetOutput() },
    { text: 'Settings', onPress: () => router.push('/settings') },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.outputContainer}>
        <TouchableOpacity onPress={() => setOptionsVisible(true)} style={styles.options}>
          <FontAwesome name="ellipsis-v" size={24} color="black" />
        </TouchableOpacity>
        <ButtonModal buttons={optionButtons} visible={optionsVisible} onRequestClose={() => setOptionsVisible(false)} />
        <ScrollView 
          ref={scrollViewRef}
          style={styles.output} 
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          overScrollMode="never"
        >
          {output.map((part, index) => {
            if (part.type === 'me') {
              return <Text key={index} style={{...styles.chatItem, ...styles.me}}>{part.text}</Text>;
            } else {
              return <View key={index} style={{...styles.chatItem, ...styles.ai}}><Markdown>{part.text}</Markdown></View>;
            }
          })}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TextInput
          placeholder={inputPlaceholder}
          containerStyles={styles.inputContainer}
          value={input} onChangeText={setInput}
          onSubmitEditing={handleSend}
          disabled={thinking}
          onFocus={() => scrollToBottom(150)}
        />
        <Button text="Send" onPress={handleSend} disabled={thinking} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  output: {
    flex: 1
  },
  outputContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 0,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 10,
    flexGrow: 1,
    gap: 10,
  },
  footer: {
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
  },
  chatItem: {
    width: '90%',
  },
  me: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    borderRightWidth: 2,
    borderRightColor: '#c0c0c0',
    paddingRight: 10,
  },
  ai: {
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  options: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#fff',
    zIndex: 1000,
  }
});
