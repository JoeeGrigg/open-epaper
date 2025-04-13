import { getSettings } from './settings';
import { Chat, GoogleGenAI, GenerateContentResponse } from '@google/genai';

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

function generateResponse(res: GenerateContentResponse): string {
  let output = res.text || '';

  let sources = res.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  sources = sources.filter((source) => source.web !== undefined);

  if (sources.length < 1) return output;

  output += '\n\nSources: ' + sources.map((source) => {
    return `[${source.web?.title}](${source.web?.uri})`;
  }).join(', ');

  return output;
}

export async function sendChatMessage(chat: Chat, message: string): Promise<string> {
  const res = await chat.sendMessage({ message });
  return generateResponse(res);
}