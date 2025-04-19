export const themes = [
  "chrome",
  "clouds",
  "crimson_editor",
  "dawn",
  "eclipse",
  "github",
  "xcode",
  "ambiance",
  "clouds_midnight",
  "cobalt",
  "monokai",
  "solarized_dark",
  "terminal",
  "twilight",
  "tomorrow",
];

export const languages = [
  {
    name: "Javascript",
  },
  {
    name: "Python",
  },
  {
    name: "Java",
  },
  {
    name: "C++",
  },
  {
    name: "C#",
  },
  {
    name: "Ruby",
  },
  {
    name: "Go",
  },
  {
    name: "Rust",
  },
  {
    name: "Typescript",
  },
  {
    name: "HTML",
  },
  {
    name: "JSON",
  },
  {
    name: "SQL",
  },
  {
    name: "XML",
  },
  {
    name: "YAML",
  },
];

export const initialCode = `function guessMyNumber() {
    const userGuess = prompt("Guess a number between 1 and 10:");
    const secretNumber = Math.ceil(Math.random() * 10);
  
    if (parseInt(userGuess) === secretNumber) {
      return "Wow, you must be a psychic!";
    } else {
      return \`Nope, the number was \${secretNumber}. Better luck next time!\`;
    }
  }`;
