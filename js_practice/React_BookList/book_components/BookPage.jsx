import { useState } from "react";
import { useBook } from "./BookContextPro";
import BookList from "./BookList";

const BookPage = () => {

    const { addBook, updateBook } = useBook();

    const [title, setTitle] = useState('');
    const [editId, setEditId] = useState(null);

    const onSubmit = () => {

        if(title.trim() === '') return;

        if(editId){
            updateBook({id:editId, title});
            setEditId(null);
        }
        else{
            addBook({
                id: Date.now(),
                title
            });
        }

        setTitle('');
    };

    // 엔터 키로도 제출 가능
    const onKeyDown = (e) => {
        if(e.key === "Enter"){
            onSubmit();
        }
    };

    return (
        <div>
            <h1>읽고 싶은 책</h1>

            <input value={title} onChange={(e)=>setTitle(e.target.value)} onKeyDown={onKeyDown} />

            <button onClick={onSubmit}>
                {editId ? "수정" : "추가"}
            </button>

            <BookList setTitle={setTitle} setEditId={setEditId} />
        </div>
    );
};

export default BookPage;