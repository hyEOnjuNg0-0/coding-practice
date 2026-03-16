// 전체 페이지 라우팅 관리

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NaviBar from "./components/NaviBar";
import Home from "./components/Home";
import BoardList from "./components/BoardList";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CreateBoard from './components/CreateBoard';
import EditBoard from "./components/EditBoard";
import AuthContextPro from "./components/AuthContextPro";
import MemberList from './components/MemberList';

const FinalApp=()=>{
    return (
        <AuthContextPro>
            <BrowserRouter>
                <NaviBar />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/join' element={<SignUp />}></Route>
                    <Route path='/boardList' element={<BoardList />}></Route>
                    <Route path='/board/create' element={<CreateBoard />}></Route>
                    <Route path='/board/edit/:id' element={<EditBoard />}></Route>
                    <Route path='/memberList' element={<MemberList />}></Route>
                </Routes>
            </BrowserRouter>
        </AuthContextPro>
    )
}

export default FinalApp;