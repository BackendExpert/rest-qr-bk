import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuditLog, AuditLogSchema } from "src/auditlogs/schema/auditlog.schema";
import { AuthModule } from "src/auth/auth.module";
import { RoleModule } from "src/role/role.module";
import { User, UserSchema } from "src/user/schema/user.schema";
import { Food, FoodSchema } from "./schema/food.schema";
import { Category, CategorySchema } from "./schema/category.schema";
import { FoodController } from "./food.controller";
import { FoodService } from "./food.service";

@Module({
    imports: [
        AuthModule,
        RoleModule,
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: AuditLog.name, schema: AuditLogSchema },
            { name: Food.name, schema: FoodSchema },
            { name: Category.name, schema: CategorySchema }
        ]),
    ],

    controllers: [FoodController],
    providers: [
        FoodService
    ],
    exports: [FoodService]
})

export class FoodModule { }