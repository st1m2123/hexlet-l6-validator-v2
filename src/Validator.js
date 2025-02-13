import StringSchema from './StringSchema.js';
import NumberSchema from './NumberSchema.js';
import ArraySchema from './ArraySchema.js';
import ObjectSchema from './ObjectSchema.js';

class Validator {
    string() {
        return new StringSchema();
    }

    number() {
        return new NumberSchema();
    }

    array() {
        return new ArraySchema();
    }

    object() {
        return new ObjectSchema();
    }
}

export default Validator;
