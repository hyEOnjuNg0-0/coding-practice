// 사용자 로그인 처리

import { useAuth } from './AuthContextPro';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    // useAuth 함수 호출 -> setCurrentUser 사용
    const {setCurrentUser} = useAuth();
    
    const onSubmit2= e=>{
        e.preventDefault();

        // 저장되어 있는 users 불러오기
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // users에 있는 객체 중 id와 pw가 같은 user = 로그인 된 유저
        const loggedUser = users.find((user)=>user.Id === id && user.password === password);

        // 로그인 성공 시 현재 사용자 정보 로컬 스토리지에 저장
        if(loggedUser){
            setCurrentUser(loggedUser);

            localStorage.setItem("currentUser", JSON.stringify(loggedUser));

            setId('');
            setPassword('');
            navigator('/boardList')  // /boardList로 이동
        }
        else {
            alert('아이디 또는 비밀번호가 맞지 않습니다.');
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit2}>
                <h1>로그인</h1>
                아이디 : <input type='text' value={id} onChange={(e)=>setId(e.target.value)} />
                비밀번호 : <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />

                <button type='submit'>로그인</button>
            </form>
            
        </div>
    );
};

export default Login;