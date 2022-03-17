export interface ServiceClassOptions {
    isSingleton: boolean;
}

export function ServiceClass(options?: ServiceClassOptions) {
    options = { isSingleton: true, ...options };
    return (constructor: any) => {
        const original = constructor;

        if (!options!.isSingleton) {
            return constructor;
        }
        const fun: any = (...args: any) => {
            if (options!.isSingleton) {
                if (constructor.prototype.Instance) {
                    return constructor.prototype.Instance;
                } else {
                    const instance = new constructor(...args);
                    constructor.prototype.Instance = instance;

                    return instance;
                }
            }
            return new constructor(...args);
        };

        fun.prototype = original.prototype;

        return fun;
    };
}
