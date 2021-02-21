export interface Item {
  id?: string,
  title: string,
  subtitle: string,
  excerpt: string,
  content: string,
  price: number,
  images: Array<string>,
  categories: Array<string>,
  status: string
}