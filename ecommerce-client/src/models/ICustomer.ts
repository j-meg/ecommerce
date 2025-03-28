
export interface ICustomer {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    street_address: string;
    postal_code: string;
    city: string;
    country: string;
    created_at: string;
};

export interface ICustomerCreate {
    firstname: string;
    lastname: string;
    email: string;          // MUST BE UNIQUE
    password: string;       // OPTIONAL NOW
    phone: string;
    street_address: string;
    postal_code: string;
    city: string;
    country: string;
};

export interface ICustomerUpdate extends ICustomerCreate{};