import { Box, Grid } from '@mui/material';
import MenuAppBar from '../../app-bar/MenuAppBar';
import BookItem from '../book-item/BookItem';

import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useApi } from '../../api/ApiProvider';
import { useEffect, useState, useRef, useCallback } from 'react';
import { BooksPageDto } from '../../api/dto/book.dto';
import { ClientResponse } from '../../api/library-client';

function BookList() {
  const location = useLocation();
  const navigate = useNavigate();
  const apiClient = useApi();
  const [books, setBooks] = useState<BooksPageDto | null>(null);
  const [page, setPage] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && books?.hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [books],
  );

  useEffect(() => {
    const fetchBooks = async () => {
      const response: ClientResponse<BooksPageDto | null> =
        await apiClient.getBooks(page);
      if (response.success) {
        const availableBooks = response.data!.books.filter(
          (book) => !book.isAvailable,
        );
        setBooks((prevBooks) => {
          const newBooks =
            page > 0
              ? [...(prevBooks?.books || []), ...availableBooks]
              : availableBooks;
          return {
            ...response.data,
            books: newBooks,
            currentPage: response.data!.currentPage || 0,
            totalPages: response.data!.totalPages || 0,
            totalItems: response.data!.totalItems || 0,
            hasMore: response.data!.hasMore || false,
          };
        });
      } else {
        if (response.statusCode === 401 || response.statusCode === 403) {
          navigate('/login', { state: { from: location, error: true } });
        } else {
          console.error('Failed to fetch books', response.statusCode);
        }
      }
    };

    fetchBooks();
  }, [navigate, location, apiClient, page]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: '20px',
            paddingRight: '5rem',
            paddingLeft: '5rem',
            paddingTop: '5rem',
          }}
        >
          {books?.books.map((book, index) => {
            if (books.books.length === index + 1) {
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <BookItem
                    ref={lastBookElementRef}
                    id={book.id}
                    img={book.img}
                    title={book.title}
                    author={book.author}
                    rating={book.rating}
                  />
                </Grid>
              );
            } else {
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <BookItem
                    id={book.id}
                    img={book.img}
                    title={book.title}
                    author={book.author}
                    rating={book.rating}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
      <Outlet />
    </Box>
  );
}

export default BookList;
