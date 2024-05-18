import React, { useEffect, useState } from 'react';
import { useApi } from '../../api/ApiProvider';
import { NewsDto } from '../../api/dto/news.dto';
import './News.css';
import { Grid, Box, Typography } from '@mui/material';

const News = () => {
  const apiClient = useApi();
  const [newsItems, setNewsItems] = useState<NewsDto[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await apiClient.getNews();
      if (response.success) {
        setNewsItems(response.data!);
      } else {
        console.error('Failed to fetch news', response.statusCode);
      }
    };
    fetchNews();
  }, [apiClient]);

  return (
    <div>
      {newsItems.map((item, index) => (
        <div className="mainContainer">
          <a href={item.link} key={index} style={{ textDecoration: 'none' }}>
            <Grid container>
              <Grid item xs={8}>
                <Box>
                  <Typography
                    className="news-title"
                    sx={{
                      fontSize: '1.5em',
                      fontWeight: 'bold',
                      fontFamily: 'lato',
                      marginY: '0',
                      color: '#333',
                      marginLeft: '1em',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.2em',
                      fontWeight: '300',
                      fontFamily: 'karla',
                      marginY: '0',
                      color: '#333',
                      marginLeft: '1.25em',
                      marginRight: '1em',
                    }}
                  >
                    {item.description}
                  </Typography>{' '}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <div className="news-image">
                    {' '}
                    <img
                      style={{
                        position: 'relative',
                        zIndex: 0,
                        maxWidth: '100%',
                      }}
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
            <hr />
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
