
export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image: string;
    created_at: string;
};

export interface IProductCreate {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image: string;
};

export interface IProductUpdate extends IProductCreate {};
