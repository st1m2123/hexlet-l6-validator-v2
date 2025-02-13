class StringSchema {
  isValid(value) {
    return typeof value === 'string';
  }

  containsNumber() {
    return {
      isValid: (value) => typeof value === 'string' && /\d/.test(value),
    };
  }
}

export default StringSchema;
