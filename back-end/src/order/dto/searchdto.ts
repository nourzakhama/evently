import { IsString, IsOptional } from 'class-validator';

export class SearchOrdersDto {
    @IsString()
    @IsOptional()
    query?: string;
}