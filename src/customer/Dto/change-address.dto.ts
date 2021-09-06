import { Optional } from "@nestjs/common";
import { IsLatitude, IsLongitude, IsOptional } from "class-validator";

export class changeAddressDto {
    @Optional()
    address: string;

    @IsOptional()
    @IsLatitude()
    lat: number;

    @IsOptional()
    @IsLongitude()
    long: number;
}