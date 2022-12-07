export interface Items {
    item_name: string;
    quantity: string;
    price: number;
    free: boolean;
}

export interface OrderItems {
    offer_name:string;
    offer_type: string;
    discount_percentage: number;
    items: Items[]
}

export interface Orders {
    order_number: string;
    order_price: number;
    order_at: Date;
    status: string;
    items: OrderItems[];
}

export interface ItemApi {
    items: MenuItems[];
}

export interface MenuItems {
    item_id: number;
    variant_id: number;
    name: string;
    quantity: string;
    price: number;
    free: boolean;
}

export interface FreeOfferItem {
    item_name:string;
    quantity: string;
    price: number;
    free: boolean;
}

export interface FreeOffers {
    name: string;
    offer_id: number;
    price: number;
    items: FreeOfferItem[];
}

export interface DiscountOfferItem {
    item_name:string;
    quantity: string;
    price: number;
}

export interface DiscountOffers {
    name: string;
    offer_id: number;
    discount_percentage: number;
    discounted_price: number;
    price: number;
    items: DiscountOfferItem[];
}

export interface OrderStatus {
    id: number;
    order_number: string;
    status: string;
}

export interface VariantAttributes {
    quantity: string;
    price: number;
}

export interface CreateItem {
    name: string;
    variant_attributes: VariantAttributes[];
}
