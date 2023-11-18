class StaticText {
  text: string | null;

  constructor(text: string | null) {
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
