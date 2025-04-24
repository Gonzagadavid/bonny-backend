import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FormAnswerDocument = HydratedDocument<FormAnswer>;

type Answer = Record<string, string | string[]>

@Schema()
export class FormAnswer {
    @Prop()
    formVersionId: string;

    @Prop()
    title: string;
    
    @Prop()
    answers: string;

    @Prop()
    userId: string

    @Prop()
    createdAt: Date

    _id: string
}

export const FormAnswerSchema = SchemaFactory.createForClass(FormAnswer);
