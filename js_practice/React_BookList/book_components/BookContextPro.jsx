// 책 배열 state 전역으로 관리
// 책 배열에 추가, 삭제, 수정 기능

import { createContext, useContext, useState } from "react";

const BookContext = createContext();

const BookContextPro = ({children}) => {

    const [books, setBooks] = useState(
        JSON.parse(localStorage.getItem("books")) || []
    );

    // 책 추가
    const addBook = (newBook) => {
        const updated = [...books, newBook];
        setBooks(updated);
        localStorage.setItem("books", JSON.stringify(updated));
    };

    // 책 삭제
    const deleteBook = (id) => {
        // id가 일치하는 책 제외한 배열
        const updated = books.filter((book)=>book.id !== id);
        setBooks(updated);
        localStorage.setItem("books", JSON.stringify(updated));
    };

    // 책 정보 수정
    const updateBook = (updatedBook) => {
        // 수정한 책 id와 일치하는 책이 배열에 있으면 그 수정된 정보(updatedBook)로 책 배열(books) 저장
        // 없으면 기존 값(book) 유지
        const updated = books.map((book)=>
            book.id === updatedBook.id ? updatedBook : book
        );

        setBooks(updated);
        localStorage.setItem("books", JSON.stringify(updated));
    };

    return (
        <BookContext.Provider value={{books, addBook, deleteBook, updateBook}}>
            {children}
        </BookContext.Provider>
    );
};

// useBook 커스텀 훅
export const useBook = () => useContext(BookContext);

export default BookContextPro;