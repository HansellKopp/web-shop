export interface Product {
    _id?: string,
    image: string,
    title: string,
    subtitle: string,
    excerpt: string,
    content: string,
    price: number,
    categories: Array<string>,
}
