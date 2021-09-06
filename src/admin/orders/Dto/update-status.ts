import { IsIn } from "class-validator";

export class UpdateOrderStatusDto {
    @IsIn(['pending', 'processing', 'in_transit', 'delivered', 'cancelled'])
    status: string;
}