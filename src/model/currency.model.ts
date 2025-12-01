import mongoose, { HydratedDocument, mongo, Schema } from "mongoose";

export interface Currency {
    code: string,
    rate: number,
    timestamp: Date,
    api: string
}

export namespace Currency {
    export const schema = new Schema<Currency>({
        "code": { type: String, required: true },
        "rate": { type: Number, required: true },
        "timestamp": { type: Date, required: true },
        "api": { type: String, required: true }
    });
    export const Model      = mongoose.model("Currency", schema);
    export type Document    = HydratedDocument<Currency>;
}