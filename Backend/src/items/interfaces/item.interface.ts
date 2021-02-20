export interface Item {
  id?: string,
  image: string,
  title: string,
  subtitle: string,
  excerpt: string,
  content: string,
  price: number,
  categories: Array<string>,
  status: string
}