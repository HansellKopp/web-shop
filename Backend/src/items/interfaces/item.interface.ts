export interface Item {
  id?: string,
  slug: string,
  image: string,
  title: string,
  subtitle: string,
  excerpt: string,
  content: string,
  price: number,
  categories: Array<string>,
}