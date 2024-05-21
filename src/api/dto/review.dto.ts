import { UserDto } from './user.dto';

export class ReviewDto {
  id!: number;
  user!: UserDto;
  rating!: number;
  comment!: string;
  reviewDate!: Date;
}

export class ReviewsPageDto {
  reviews!: ReviewDto[];
  currentPage!: number;
  totalPages!: number;
  totalItems!: number;
  hasMore!: boolean;
}

export class AddReviewDto {
  bookId!: number;
  userId!: number;
  rating!: number;
  comment!: string;
}

export class CreateReviewResponseDto {
  id!: number;
  bookId!: number;
  userId!: number;
  rating!: number;
  comment!: string;
  reviewDate!: Date;
}
