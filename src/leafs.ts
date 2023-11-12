// export const StaticText = (text: string | null) => {
//   return {
//     match: (node: HTMLElement) => {
//       return node.textContent === text;
//     },
//     roles: [],
//     specificity: 1,
//   };
// };

// export const Any = () => {
//   return {
//     match: () => true,
//     roles: [],
//     specificity: 0,
//   };
// };

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

  // isEqual(other: StaticText): boolean {
  //   if (this.text === null || other.text === null) {
  //     return this.text === other.text;
  //   } else {
  //     if (this.text instanceof RegExp && other.text instanceof RegExp) {
  //       return this.text.toString() === other.text.toString();
  //     } else if (this.text instanceof RegExp) {
  //       return this.text.test(other.text);
  //     } else if (other.text instanceof RegExp) {
  //       return other.text.test(this.text);
  //     } else {
  //       return this.text === other.text;
  //     }
  //   }
  // }
}

class UnknownNode {
  #node: unknown;

  constructor(node: unknown) {
    this.#node = node;
  }

  toString(): string {
    return `${this.#node}`;
  }
}

class Any {
  constructor() {}
}

export { StaticText, Any, UnknownNode };
