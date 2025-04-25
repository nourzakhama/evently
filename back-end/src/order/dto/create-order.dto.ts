export class CreateOrderDto {
    stripeId: string ;
    eventTitle?: string ;
    eventId: string ;
    price: string;
    buyerId: string ;
}
