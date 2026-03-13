import { useBook } from "./BookContextPro";

const BookList = ({setTitle, setEditId}) => {

    const { books, deleteBook } = useBook();

    const handleEdit = (book) => {
        setTitle(book.title);
        setEditId(book.id);
    };

    return (
        <div>
            {books.length > 0 ? (

                books.map((book)=>(
                    <div key={book.id}>

                        <span>{book.title}</span>

                        <button onClick={()=>handleEdit(book)}>
                            수정
                        </button>

                        <button onClick={()=>deleteBook(book.id)}>
                            삭제
                        </button>

                    </div>
                ))

            ) : (
                <div>책 목록 없음</div>
            )}

        </div>
    );
};

export default BookList;