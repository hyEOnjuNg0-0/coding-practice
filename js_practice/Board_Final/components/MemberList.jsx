// 회원 목록 관리 페이지

import { useAuth } from "./AuthContextPro";
import { useEffect } from "react";

const MemberList = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    const {currentUser, setCurrentUser} = useAuth();

    // // 로그인 했을 때 저장한 사용자 정보 가져오기
    // useEffect(()=>{
    //     const storedUser = JSON.parse(localStorage.getItem(''));
    //     setCurrentUser(storedUser);
    // }, []);

    return (  // 관리자로 로그인 -> 회원 목록 보임. 아니면 안 보임
        <div>
            <h1>회원 목록</h1>
            {currentUser && currentUser.id === 'admin' && currentUser.password === 'admin' ? (
                <ul>
                    {users.length > 0 ? (
                        users.map((user, index) => <li key={index}>{user.id}</li>)
                    ):(
                        <li>회원 없음</li>
                    )}
                </ul>
            ) :(
                <>
                    <div>회원 목록은 관리자만 확인할 수 있습니다.</div>
                </>
            )}
            
        </div>
    );
};

export default MemberList;