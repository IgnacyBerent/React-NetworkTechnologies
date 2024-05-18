export class BookDto {
  id!: number;
  img!: string;
  title!: string;
  author!: string;
  rating!: number;
  isAvailable!: boolean;
}

export class BooksPageDto {
  books!: BookDto[];
  currentPage!: number;
  totalPages!: number;
  totalItems!: number;
  hasMore!: boolean;
}
