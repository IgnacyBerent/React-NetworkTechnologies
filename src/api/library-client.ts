import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import {
  BooksPageDto,
  BookDetailsDto,
  AddBookDto,
  AddBookResponseDto,
} from './dto/book.dto';
import {
  AddReviewDto,
  CreateReviewResponseDto,
  ReviewsPageDto,
} from './dto/review.dto';
import { NewsDto } from './dto/news.dto';
import {
  CreateLoanDto,
  CreateLoanResponseDto,
  LoanPageDto,
} from './dto/loan.dto';
import { UserDto } from './dto/user.dto';
import Cookies from 'universal-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

interface MyJwtPayload extends JwtPayload {
  role?: string;
}

export class LibraryClient {
  private client: AxiosInstance;
  private cookies = new Cookies();

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
    });

    this.client.interceptors.request.use((config) => {
      const token = this.cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  public getUserRole(): string {
    const token = this.cookies.get('token');
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      if (decoded.role) {
        return decoded.role;
      }
    }
    return '';
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        'auth/login',
        data,
      );

      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;
      const decoded = jwtDecode<MyJwtPayload>(response.data.token);

      if (decoded.exp) {
        this.cookies.set('token', response.data.token, {
          expires: new Date(decoded.exp * 1000),
        });
      }

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public signOut(): void {
    this.cookies.remove('token');
    this.client.defaults.headers.common['Authorization'] = '';
  }

  public async getBooks(
    page: number = 0,
  ): Promise<ClientResponse<BooksPageDto | null>> {
    try {
      const response: AxiosResponse<BooksPageDto> = await this.client.get(
        'books/getAll',
        {
          params: {
            page: page,
            size: 8,
          },
        },
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBookDetails(
    id: number,
  ): Promise<ClientResponse<BookDetailsDto | null>> {
    try {
      const response: AxiosResponse<BookDetailsDto> = await this.client.get(
        `books/details/${id}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteBook(id: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.delete(
        `books/delete/${id}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addBook(
    data: AddBookDto,
  ): Promise<ClientResponse<AddBookResponseDto>> {
    try {
      const response: AxiosResponse<AddBookResponseDto> =
        await this.client.post('books/add', data);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: { id: 0, copies: 0 },
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getReviews(
    bookId: number,
    page: number = 0,
  ): Promise<ClientResponse<ReviewsPageDto | null>> {
    try {
      const response: AxiosResponse<ReviewsPageDto> = await this.client.get(
        `reviews/book/${bookId}`,
        {
          params: {
            page: page,
            size: 8,
          },
        },
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addReview(
    data: AddReviewDto,
  ): Promise<ClientResponse<CreateReviewResponseDto | null>> {
    try {
      const response: AxiosResponse<null> = await this.client.post(
        'reviews/add',
        data,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getNews(): Promise<ClientResponse<NewsDto[] | null>> {
    try {
      const response: AxiosResponse<NewsDto[]> =
        await this.client.get('news/fetch');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoans(
    page: number = 0,
    userId: number,
  ): Promise<ClientResponse<LoanPageDto | null>> {
    try {
      const response: AxiosResponse<LoanPageDto> = await this.client.get(
        `loans/getAll`,
        {
          params: {
            userId: userId,
            page: page,
            size: 8,
          },
        },
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async takeLoan(
    data: CreateLoanDto,
  ): Promise<ClientResponse<CreateLoanResponseDto | null>> {
    try {
      const response: AxiosResponse<CreateLoanResponseDto> =
        await this.client.post('loans/add', data);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async returnLoan(loanId: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.put(
        `loans/return/${loanId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getCurrentUser(): Promise<ClientResponse<UserDto | null>> {
    try {
      const response: AxiosResponse<UserDto> = await this.client.get('user/me');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
