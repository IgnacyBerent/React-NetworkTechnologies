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

export class BookDetailsDto {
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

export class AddBookDto {
  img!: string;
  isbn!: string;
  title!: string;
  author!: string;
  publisher!: string;
  publicationYear!: number;
  availableCopies!: number;
  genre!: string;
  summary!: string;
}

export class AddBookResponseDto {
  id!: number;
  copies!: number;
}
