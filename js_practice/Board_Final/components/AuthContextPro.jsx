// 로그인 사용자 상태를 전역으로 관리
// 로그인 상태를 모든 페이지에서 사용하기 위해 Context 이용

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthContextPro = ({children}) => {
    // 로그인 버튼 누르면 로그인 된 사용자들 로컬 스토리지에 저장되어 있음 (Login.jsx)
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("currentUser")) || null
    );

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    }
    

    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextPro;