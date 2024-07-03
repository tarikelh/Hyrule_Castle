import * as rl from 'readline-sync';

export default function displayPressKey(message: string, message2: string, message3: string) {
    const question = `${message}\n${message2}${message3}\n=== Press any key to continue ===\n\n`;
    rl.keyInPause(question, { guide: false });
}