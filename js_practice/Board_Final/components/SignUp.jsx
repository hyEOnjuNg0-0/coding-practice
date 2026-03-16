// 회원 가입 기능

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    const onSubmit1= e=>{
        e.preventDefault();

        const user = {id, password};  // 입력한 값 객체로

        // 저장되어 있던 users 불러오기
        // 맨 처음엔(값 없을 때) 빈 배열 생성
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);  // users에 user 담음

        localStorage.setItem("users", JSON.stringify(users));  //user localStorage에 저장

        setId('');
        setPassword('');
        navigator('/login');
    }

    return (
        <div>
            <form onSubmit={onSubmit1}>
                <h1>회원 가입</h1>
                아이디 : <input type='text' value={id} onChange={(e)=>setId(e.target.value)} />
                비밀번호 : <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />

                <button type='submit'>회원 가입</button>
            </form>
            
        </div>
    );
};

export default SignUp;