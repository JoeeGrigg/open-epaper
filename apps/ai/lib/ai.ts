import { getSettings } from './settings';
import { GoogleGenAI } from '@google/genai';

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