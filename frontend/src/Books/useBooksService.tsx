import { useCallback, useEffect, useState } from "react";
import axios from 'axios';

const BOOK_SERVICE_BASE_API = process.env.REACT_APP_BOOK_SERVICE_BASE_API;

export type Book = {
    ID?:   string
    name:   string
	author: string
}

export function useBooksService() {
    const [books, setBooks] = useState<Book[]>([])
    const [isReady, setIsReady] = useState(false)
    
    const healthCheckBookService = useCallback(() => {
        return axios.get(`${BOOK_SERVICE_BASE_API}/health`)
    }, [])

    const getBooks = useCallback((): Promise<Book[]> => {
        return axios.get<Book[]>(`${BOOK_SERVICE_BASE_API}/books`).then((result) => result.data)
    }, [])

    const createBook = useCallback((book: Book) => {
        return axios.post(`${BOOK_SERVICE_BASE_API}/books`, book)
    }, [])

    const getBookById = useCallback((id: string): Promise<Book> => {
        return axios.get(`${BOOK_SERVICE_BASE_API}/books/${id}`)
    }, [])

    const deleteBookById = useCallback((id: string): Promise<Book> => {
        return axios.delete(`${BOOK_SERVICE_BASE_API}/books/${id}`)
    }, [])

    useEffect(() => {
        const id = setInterval(() => {
            healthCheckBookService()
                .then(async() => {
                    const b = await getBooks()
                    setIsReady(true)
                    setBooks(b)
                })
                .catch(() => setIsReady(false))
        }, 5000);
        return () => clearInterval(id);
    });

    return {
        isReady,
        books,
        getBooks,
        createBook,
        getBookById,
        deleteBookById,
    }
}