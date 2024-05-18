import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { GetBooksPageDto } from './dto/book-page.dto';
import { GetBookDetailsDto } from './dto/book-details.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
    });
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

  public async getBooks(
    page: number = 0,
  ): Promise<ClientResponse<GetBooksPageDto | null>> {
    try {
      const response: AxiosResponse<GetBooksPageDto> = await this.client.get(
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
  ): Promise<ClientResponse<GetBookDetailsDto | null>> {
    try {
      const response: AxiosResponse<GetBookDetailsDto> = await this.client.get(
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
}
