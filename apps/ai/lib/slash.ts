import { OutputPart, emptyOutput } from './output';
import { router } from 'expo-router';

export default function slashCommand(command: string, setOutput: (output: OutputPart[]) => void) {
  command = command.slice(1);

  switch(command) {
  case 'clear':
    setOutput(emptyOutput);
    break;
  case 'settings':
    router.push('/settings');
    break;
  default:
    break;
  }
}