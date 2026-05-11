import { BadRequestException, Body, Controller, Headers, Patch, Post, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FoodService } from "./food.service";
import { JwtAuthGuard } from "src/common/guard/jwt-auth.guard";
import { PermissionsGuard } from "src/common/guard/permissions.guard";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageUploadOptions } from "src/common/utils/file-upload.util";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { ClientInfoDecorator } from "src/common/decorators/client-info.decorator";
import type { ClientInfo } from "src/common/interfaces/client-info.interface";

@Controller('/api/food')

export class FoodController {
    constructor(
        private readonly foodService: FoodService
    ) { }

    @Post('/create-category')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @UseInterceptors(FileInterceptor('category-img', imageUploadOptions))
    @Permissions('food:create-category')

    CreateFoodCategory(
        @Body() dto: CreateCategoryDTO,
        @Headers("authorization") authHeader: string,
        @UploadedFile() file: Express.Multer.File,
        @ClientInfoDecorator() client: ClientInfo
    ) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Invalid or missing token");
        }

        if (!file) {
            throw new BadRequestException("Profile Image file is required");
        }

        const token = authHeader.split(" ")[1];

        return this.foodService.CreateFoodCaregory(
            token,
            dto,
            file.filename,
            client.ipAddress,
            client.userAgent
        )
    }

    @Patch('/update-category')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @UseInterceptors(FileInterceptor('category-img', imageUploadOptions))
    @Permissions('food:update-category')

    UpdateFoodCategory(
        @Headers("authorization") authHeader: string,
        @UploadedFile() file: Express.Multer.File,
        @ClientInfoDecorator() client: ClientInfo
    ) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Invalid or missing token");
        }

        if (!file) {
            throw new BadRequestException("Profile Image file is required");
        }

        const token = authHeader.split(" ")[1];

        return this.foodService.UpdateCategory(
            token,
            file.filename,
            client.ipAddress,
            client.userAgent
        )
    }
}
