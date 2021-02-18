export class ItemDTO {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly excerpt: string;
  readonly content: string;
  readonly price: number;
  readonly categories: Array<string>;
}
