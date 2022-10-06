import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const NEWS_SERVICE_BASE_API = process.env.REACT_APP_NEWS_SERVICE_BASE_API;

export type News = {
  id?: string;
  title: string;
  description: string;
};

export function useNewsService() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isReady, setIsReady] = useState(false);

  const healthCheckBookService = useCallback(() => {
    return axios.get(`${NEWS_SERVICE_BASE_API}/health`);
  }, []);

  const getNews = useCallback((): Promise<News[]> => {
    return axios
      .get<News[]>(`${NEWS_SERVICE_BASE_API}/api/news`)
      .then((result) => result.data);
  }, []);

  const createNews = useCallback((book: News) => {
    return axios.post(`${NEWS_SERVICE_BASE_API}/api/news`, book);
  }, []);

  const getNewsById = useCallback((id: string): Promise<News> => {
    return axios.get(`${NEWS_SERVICE_BASE_API}/api/news/${id}`);
  }, []);

  const deleteNewsById = useCallback((id: string): Promise<News> => {
    return axios.delete(`${NEWS_SERVICE_BASE_API}/api/news/${id}`);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      healthCheckBookService()
        .then(async () => {
          const b = await getNews();
          setIsReady(true);
          setNewsList(b);
        })
        .catch(() => setIsReady(false));
    }, 5000);
    return () => clearInterval(id);
  });

  return {
    isReady,
    newsList,
    getNews,
    createNews,
    getNewsById,
    deleteNewsById,
  };
}
