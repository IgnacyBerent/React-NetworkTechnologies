import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MyLoansPage.css';

import { Box } from '@mui/material';
import MenuAppBar from '../../app-bar/MenuAppBar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LoanItem from '../loan-item/LoanItem';
import { useApi } from '../../api/ApiProvider';
import { LoanPageDto } from '../../api/dto/loan.dto';
import { ClientResponse } from '../../api/library-client';

function MyLoans() {
  const location = useLocation();
  const navigate = useNavigate();
  const apiClient = useApi();
  const [loans, setLoans] = useState<LoanPageDto | null>(null);
  const [page, setPage] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastLoanElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loans?.hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loans],
  );

  useEffect(() => {
    const fetchLoans = async () => {
      const userResponse = await apiClient.getCurrentUser();
      if (userResponse.success) {
        const userId = userResponse.data?.id;
        if (userId) {
          const response: ClientResponse<LoanPageDto | null> =
            await apiClient.getLoans(page, userId);
          if (response.success) {
            setLoans((prevLoans) => {
              const newLoans =
                page > 0
                  ? [...(prevLoans?.loans || []), ...response.data!.loans]
                  : response.data!.loans;
              return {
                ...response.data,
                loans: newLoans,
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
              console.error('Failed to fetch loans', response.statusCode);
            }
          }
        } else {
          console.error('Failed to fetch user ID');
        }
      } else {
        if (
          userResponse.statusCode === 401 ||
          userResponse.statusCode === 403
        ) {
          navigate('/login', { state: { from: location, error: true } });
        } else {
          console.error(`Failed to fetch user: ${userResponse.statusCode}`);
        }
      }
    };

    fetchLoans();
  }, [navigate, location, apiClient, page, lastLoanElementRef]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box>
        <div className="loans-list">
          {loans?.loans.map((loan, index) => {
            if (loans.loans.length === index + 1) {
              return (
                <LoanItem ref={lastLoanElementRef} key={index} loan={loan} />
              );
            } else {
              return <LoanItem key={index} loan={loan} />;
            }
          })}
        </div>
      </Box>
      <Outlet />
    </Box>
  );
}

export default MyLoans;
