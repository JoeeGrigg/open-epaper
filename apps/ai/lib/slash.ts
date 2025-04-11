import welcome from './welcome';
import { router } from 'expo-router';

export default function slashCommand(command: string, setOutput: (output: string) => void) {
  command = command.slice(1);

  switch(command) {
  case 'clear':
    setOutput(welcome);
    break;
  case 'settings':
    router.push('/settings');
    break;
  default:
    break;
  }
}