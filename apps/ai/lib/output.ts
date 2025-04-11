import welcome from './welcome';

export type OutputPart = {
  text: string;
  type: 'ai' | 'me' | 'error';
}

export const emptyOutput: OutputPart[] = [{ text: welcome, type: 'ai' }];