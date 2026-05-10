import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    slug!: string;

    @IsOptional()
    @IsUrl()
    image?: string;
}