import { getSettings } from './settings';
import { Chat, GoogleGenAI } from '@google/genai';

export async function getAIClient() {
  const apiKey = (await getSettings()).apiKey;
  return new GoogleGenAI({ apiKey });
}

export async function createAIChat() {
  const ai = await getAIClient();
  return ai.chats.create({ model: 'gemini-2.0-flash' });
}

export async function sendChatMessage(chat: Chat, message: string) {
  const res = await chat.sendMessage({ message });
  return res.text;
}

export default async function promptAI(prompt: string): Promise<string> {
  try {
    const apiKey = (await getSettings()).apiKey;
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt
    });

    return Promise.resolve(response.text || '');
  } catch (error) {
    return Promise.reject(error);
  }
}