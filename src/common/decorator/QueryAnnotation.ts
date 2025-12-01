export interface QueryingStepMeta{
    methodKey:  string,
    baseURL?:   string,
    interval?:  string | [number, string]
};

export const QueryingStep: MethodDecorator = (proto, methodKey, _) => {
    Reflect.defineMetadata("QueryingStep", {methodKey}, proto);
}

export const BaseURL = (baseURL: string): MethodDecorator => (proto, methodKey, _) =>{
    const meta = Reflect.getMetadata("QueryingStep", proto);
    if(meta)
        Reflect.defineMetadata("QueryingStep", {...meta, baseURL}, proto);
}

export const Interval = (interval: string | [number, string]): MethodDecorator => (proto, methodKey, _) => {
    const meta = Reflect.getMetadata("QueryingStep", proto);
    if(meta) {
        Reflect.defineMetadata("QueryingStep", {...meta, interval}, proto);
    }
}