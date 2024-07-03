import * as rl from 'readline-sync';

export default function displayPressKey(message: string, message2: string) {
    const question = `${message}\n${message2}\n=== Press any key to continue ===\n\n`;
    rl.keyInPause(question, { guide: false });
}