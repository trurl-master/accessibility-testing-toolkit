class StaticText {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  toString(): string {
    if (this.text === null) {
      return 'null';
    }

    return this.text;
  }
}

export { StaticText };
