import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsBoolean()
    done?: boolean;
}