export class GetBookDetailsDto {
  id!: number;
  img!: string;
  title!: string;
  author!: string;
  isbn!: string;
  publicationYear!: number;
  publisher!: string;
  rating!: number;
  ratingCount!: number;
  genre!: string;
  summary!: string;
  availableCopies!: number;
}
