import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {

    @Prop({ required: true, type: String, trim: true })
    name!: string;

    @Prop({ required: true, type: String, unique: true, index: true })
    slug!: string;

    @Prop({ type: String })
    image!: string;

    @Prop({ type: Boolean, default: true })
    isActive!: boolean;

}

export const CategorySchema = SchemaFactory.createForClass(Category);