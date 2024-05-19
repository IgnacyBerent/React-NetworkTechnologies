import { BookDto } from './book.dto';
import { UserDto } from './user.dto';

export class LoanDto {
  id!: number;
  book!: BookDto;
  user!: UserDto;
  loanDate!: string;
  dueDate!: string;
  returnDate: string | null = null;
}

export class LoanPageDto {
  loans!: LoanDto[];
  currentPage!: number;
  totalPages!: number;
  totalItems!: number;
  hasMore!: boolean;
}

export class CreateLoanDto {
  userId!: number;
  bookId!: number;
  loanDate!: string;
  dueDate!: string;
}

export class CreateLoanResponseDto {
  id!: number;
  bookId!: number;
  userId!: number;
  loanDate!: string;
  dueDate!: string;
}
