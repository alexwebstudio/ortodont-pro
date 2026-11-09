export type HeadingWord = { text: string; accent: boolean; trail: string };

// Разметка заголовков в content/*: *акцент*, « / » — перенос строки.
export function splitWords(source: string) {
  const lines = source.split(/ +\/ +/).map((line) => {
    const words: HeadingWord[] = [];
    line.split("*").forEach((chunk, index) => {
      // Знак сразу за акцентом остаётся с предыдущим словом, без пробела.
      const tail = words.at(-1);
      const punctuation = chunk.match(/^[,.:;!?]+/)?.[0];
      if (tail && punctuation) {
        tail.trail = punctuation;
        chunk = chunk.slice(punctuation.length);
      }
      chunk
        .split(/ +/) // неразрывный пробел держит предлог со словом
        .filter(Boolean)
        .forEach((text) => words.push({ text, accent: index % 2 === 1, trail: "" }));
    });
    return words;
  });
  const plain = source.replaceAll("*", "").replace(/ +\/ +/g, " ").replaceAll(" ", " ");
  return { lines, plain };
}

export function plainText(source: string) {
  return splitWords(source).plain;
}
