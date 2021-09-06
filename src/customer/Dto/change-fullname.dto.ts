import { IsString, MaxLength, MinLength } from "class-validator";

export class changeFullnameDto {
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    full_name: string;
}