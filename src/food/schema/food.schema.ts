import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type FoodDocument = Food & Document;

@Schema({ timestamps: true })
export class Food {


    @Prop({ required: true, type: String, trim: true })
    name!: string;

    @Prop({ required: true, type: String })
    description!: string;

    @Prop({ type: [String], required: true })
    ingredients!: string[];


    @Prop({ required: true, type: Number })
    price!: number;

    @Prop({ type: Number, default: 0 })
    discount!: number; 


    @Prop({ type: Types.ObjectId, ref: "Category", required: true })
    category!: Types.ObjectId;

    @Prop({ type: String })
    image!: string;

    @Prop({ type: Boolean, default: true })
    isAvailable!: boolean;

    @Prop({ type: Boolean, default: true })
    isActive!: boolean;

    @Prop({ type: Number })
    prepTime!: number;

    @Prop({
        type: String,
        enum: ["mild", "medium", "hot"],
        default: "medium",
    })
    spiceLevel!: string;

    @Prop({ type: [String], default: [] })
    tags!: string[];

    @Prop({ type: [String], default: [] })
    allergens!: string[];

    @Prop({ type: Number, default: 0 })
    rating!: number;

    @Prop({ type: Number, default: 0 })
    ratingCount!: number;

    @Prop({
        type: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true },
            },
        ],
        default: [],
    })
    variants!: {
        name: string;
        price: number;
    }[];

    @Prop({ type: String, unique: true, index: true })
    slug!: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);