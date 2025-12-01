export const Env = (path: string): PropertyDecorator => (proto, propKey) => {
    const meta = Reflect.getMetadata("Env", proto) || {} as any;   
    Reflect.defineMetadata("Env", {...meta, [propKey]: path}, proto);
}

export const Profile = (label: string): PropertyDecorator => (proto, propKey) => {
    const meta = Reflect.getMetadata("Profile", proto) || {} as any;
    Reflect.defineMetadata("Profile", {...meta, [propKey]: label}, proto);
}

export const Logger: PropertyDecorator = (proto, propKey) => {
    const meta = Reflect.getMetadata("Logger", proto) || [] as any;
    Reflect.defineMetadata("Profile", [...meta, propKey], proto);
}