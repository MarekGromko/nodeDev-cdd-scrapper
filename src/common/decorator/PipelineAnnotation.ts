import pipelines from "@common/pipelines";
import { toReadableVarname } from "../utility"

export const Pipeline = (): ClassDecorator => (constructor) => {
    pipelines.add(constructor as any);
}

export const ParsingStep: MethodDecorator = (proto, methodKey, _) => {
    Reflect.defineMetadata("ParsingStep", {methodKey}, proto);
}

export const ValidationStep:  MethodDecorator = (proto, methodKey, _) => {
    Reflect.defineMetadata("ValidationStep", {methodKey}, proto);
}