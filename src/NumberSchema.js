import Schema from './Schema.js';

class NumberSchema extends Schema {
    constructor() {
        super();
        this.addCheck((value) => typeof value === 'number' || value === null);
    }

    required() {
        this.addCheck((value) => typeof value === 'number');
        return this;
    }

    positive() {
        this.addCheck((value) => typeof value === 'number' && value > 0);
        return this;
    }

    range(min, max) {
        this.addCheck((value) => typeof value === 'number' && value >= min && value <= max);
        return this;
    }
}

export default NumberSchema;
