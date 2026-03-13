// 상단 메뉴 UI

import { Link } from "react-router-dom";

// Link : <a>태그와 비슷. 페이지 전체를 새로고침하지 않고 SPA 방식으로 url 변경해준다.
// 라우터를 통해 다른 경로로 이동시키는 컴포넌트
// &nbsp; : 공백 문자
const BookNaviBar = () => {
    return (
        <>
        <Link to='/'>홈</Link><br />
        <Link to='/book'>책 목록</Link>
        </>
    )
}

export default BookNaviBar