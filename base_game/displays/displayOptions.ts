import * as rl from 'readline-sync';

export default function displayOptions(message: string, message2: string) {
    const options =
      "---Options-----------\n 1. Attack   2. Heal\n\n" +
      message +
      "\n" +
      message2 +
      "\n";
    return rl.questionInt(options);
}