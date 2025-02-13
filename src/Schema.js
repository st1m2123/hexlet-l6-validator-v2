class Schema {
    constructor() {
      this.checks = [];
    }
  
    addCheck(fn) {
      this.checks.push(fn);
    }
  
    isValid(value) {
      return this.checks.every((check) => check(value));
    }
  
    custom(fn) {
      this.addCheck(fn);
      return this;
    }
  }
  
  export default Schema;
  