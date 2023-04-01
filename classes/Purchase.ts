export interface Purchase {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    price: number;
    date: Date;
    giftCard: Array<String>;
}
