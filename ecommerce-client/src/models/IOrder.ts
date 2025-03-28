export interface IOrders {
    id: number;
    customer_id: number;
    total_price: number;
    payment_status: string;
    payment_id: null;
    order_status: string;
    created_at: string;
    customer_firstname: string;
    customer_lastname: string;
    customer_email: string;
    customer_phone: string;
    customer_street_address: string;
    customer_postal_code: string;
    customer_city: string;
    customer_country: string;
    customers_created_at: string;
};

export interface IOrder extends IOrders {       //:id and /payment/:id
    order_items: [
        {
          id: number;
          product_id: number;
          product_name: string;
          quantity: number;
          unit_price: number;
        }
    ]
};

export interface IOrderCreate {
    customer_id: number;
    payment_status: string;
    payment_id: null;
    order_status: string;
    order_items: IOrderItem[];
};

export interface IOrderUpdate {
    payment_status: string;
    payment_id: string;
    order_status: string;
};


// OrderItem
export interface IOrderItem {
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
}

export interface IOrderItemUpdate {
    quantity: number;
};
