import { getSettings } from './settings';
import { Chat, GoogleGenAI } from '@google/genai';

export async function getAIClient() {
  const apiKey = (await getSettings()).apiKey;
  return new GoogleGenAI({ apiKey });
}

export async function createAIChat() {
  const ai = await getAIClient();
  return ai.chats.create({
    model: 'gemini-2.0-flash',
    config: {
      tools: [{googleSearch: {}}],
    }
  });
}

export async function sendChatMessage(chat: Chat, message: string) {
  const res = await chat.sendMessage({ message });
  // console.log(res?.candidates[0]?.groundingMetadata?.groundingChunks);
  return res.text;
}