// 상단 메뉴 UI

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextPro";

// Link : <a>태그와 비슷. 페이지 전체를 새로고침하지 않고 SPA 방식으로 url 변경해준다.
// 라우터를 통해 다른 경로로 이동시키는 컴포넌트
// &nbsp; : 공백 문자
const NaviBar = () => {
    const {currentUser, logout} = useAuth();
    const navigator = useNavigate();

    // 로그아웃 함수 호출 + 홈으로 이동
    const logout1 = () => {
        logout();
        navigator('/');
    }

    return (
        <>
        <Link to='/'>홈</Link><br />
        <Link to='/memberList'>회원목록</Link><br />
        <Link to='/boardList'>게시글목록</Link><br />

        {currentUser ? (
            <>
                <span>{currentUser.id}님</span>
                <button onClick={logout1}>로그아웃</button>
            
            </>
        ) : (
            <>
                <Link to='/login'>로그인</Link><br />
                <Link to='/join'>회원가입 </Link><br />
            </>
        )}
        </>
    )
}

export default NaviBar