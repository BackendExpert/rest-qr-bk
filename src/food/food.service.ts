import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schema/user.schema";
import { Food, FoodDocument } from "./schema/food.schema";
import { Category, CategoryDocument } from "./schema/category.schema";
import { AuditLog, AuditLogDocument } from "src/auditlogs/schema/auditlog.schema";

@Injectable()
export class FoodService{
    constructor (
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,

        @InjectModel(Food.name)
        private readonly foodModel: Model<FoodDocument>,

        @InjectModel(Category.name)
        private readonly caregoryModel: Model<CategoryDocument>,

        @InjectModel(AuditLog.name)
        private readonly auditlogModel: Model<AuditLogDocument>,

        private jwtService: JwtService
    ) { }

    async CreateFoodCaregory () {
        
    }
}