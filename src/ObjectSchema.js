class ObjectSchema {
    constructor() {
        this.shapeRules = {};
    }

    shape(rules) {
        this.shapeRules = rules;
        return this;
    }

    isValid(obj) {
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            return false;
        }

        const objKeys = Object.keys(obj);
        const schemaKeys = Object.keys(this.shapeRules);

        // Проверяем количество ключей
        if (objKeys.length !== schemaKeys.length) {
            return false;
        }

        // Рекурсивная проверка вложенных объектов и других типов данных
        return schemaKeys.every((key) => {
            const value = obj[key];
            const rule = this.shapeRules[key];

            if (typeof rule === 'object' && !(rule instanceof Function)) {
                // Если это объект, то вызываем рекурсивно
                const nestedValidator = new ObjectSchema().shape(rule);
                return nestedValidator.isValid(value);
            }

            if (rule && rule.isValid) {
                return rule.isValid(value);
            }

            return false;
        });
    }
}

export default ObjectSchema;
