import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schema/user.schema";
import { Food, FoodDocument } from "./schema/food.schema";
import { Category, CategoryDocument } from "./schema/category.schema";
import { AuditLog, AuditLogDocument } from "src/auditlogs/schema/auditlog.schema";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { createAuditLog } from "src/common/utils/auditlogs.util";

@Injectable()
export class FoodService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,

        @InjectModel(Food.name)
        private readonly foodModel: Model<FoodDocument>,

        @InjectModel(Category.name)
        private readonly categoryModel: Model<CategoryDocument>,

        @InjectModel(AuditLog.name)
        private readonly auditlogModel: Model<AuditLogDocument>,

        private jwtService: JwtService
    ) { }

    async CreateFoodCaregory(
        token: string,
        dto: CreateCategoryDTO,
        CategoryImageFile: string,
        ipAddress?: string,
        userAgent?: string
    ) {
        const payload = await this.jwtService.verify(token)
        const user = await this.userModel.findOne({ email: payload.user })

        if (!user) {
            throw new NotFoundException("The User Not Found")
        }

        const category = await this.categoryModel.findOne({
            name: dto.name,
            slug: dto.slug
        })

        if (category) {
            throw new ConflictException("Category Already Created")
        }

        await this.categoryModel.create({
            name: dto.name,
            slug: dto.slug,
            image: `/uploads/category/${CategoryImageFile}`,
        })

        await createAuditLog(this.auditlogModel, {
            user: user._id,
            action: "FOOD_CATEGORY_CREATED",
            description: `User ${user.email} created a new food category`,
            ipAddress,
            userAgent,
            metadata: { ipAddress, userAgent }
        });

        return {
            success: true,
            message: "Food Category Created Success"
        }
    }

    async UpdateCategory(
        token: string,
        id: string,
        CategoryImageFile: string,
        ipAddress?: string,
        userAgent?: string
    ) {
        const payload = await this.jwtService.verify(token)
        const user = await this.userModel.findOne({ email: payload.user })

        if (!user) {
            throw new NotFoundException("The User Not Found")
        }

        const category = await this.categoryModel.findByIdAndUpdate(
            id,
            {
                image: `/uploads/category/${CategoryImageFile}`
            },
            { new: true }
        )
        
        if (!category) {
            throw new NotFoundException("Category Not Found");
        }

        await createAuditLog(this.auditlogModel, {
            user: user._id,
            action: "FOOD_CATEGORY_UPDATED",
            description: `User ${user.email} Update {id} category`,
            ipAddress,
            userAgent,
            metadata: { ipAddress, userAgent }
        });

        return {
            success: true,
            message: "Food Category Updated Success"
        }
    }
}