import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookContextPro from "./book_components/BookContextPro";
import BookPage from "./book_components/BookPage";
import BookHome from "./book_components/BookHome";
import BookNaviBar from "./book_components/BookNaviBar";

const FinalApp = () => {

    return (
        <BookContextPro>
            <BrowserRouter>
                <BookNaviBar />
                <Routes>
                    <Route path="/" element={<BookHome/>}/>
                    <Route path="/book" element={<BookPage/>}/>
                </Routes>
            </BrowserRouter>
        </BookContextPro>
    )
}

export default FinalApp;