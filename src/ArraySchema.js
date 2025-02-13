class ArraySchema {
    isValid(value) {
        return Array.isArray(value);
    }

    custom(callback) {
        return {
            isValid: (value) => Array.isArray(value) && value.every(callback),
        };
    }
}

export default ArraySchema;
