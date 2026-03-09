// 이름과 이메일을 입력하여 CRUD 만들어보기
// 1. 삭제하면 사라짐
// 2. 이메일에 @ 기호 있어야 함
// 3. 수정 버튼 누르면 입력창에 기존 정보가 채워지고 버튼 '저장'으로 변경돼야 함

import React, { useState } from 'react'

const App = () => {
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [userArray, setUserArray] = useState([]);
    const [modiId, setModiId] = useState(null);

    const onChName = (e) =>{
        setInputName(e.target.value);
    }

    const onChEmail = (e) =>{
        setInputEmail(e.target.value);
    }

    const onAddUpdate = () => {
        if(!inputEmail.includes("@")) return

        if (modiId !== null){
            setUserArray(userArray.map((user)=>user.id===modiId?{...user,name: inputName, email:inputEmail}:user));
            setModiId(null);
        }
        else {
            setUserArray([...userArray, {id: Date.now(), name: inputName, email: inputEmail}]);
        }
        
        setInputName("")
        setInputEmail("")
    }

    // input 창에 기존 정보 띄우기 + modiId 설정
    const onModify = (user) => {
        setInputName(user.name)
        setInputEmail(user.email)
        setModiId(user.id)
    }

    const onDelete = (id) => {
        // 선택한 id에 해당하지 않는 데이터만 놔둠
        setUserArray(userArray.filter((user)=> id !== user.id))

        if(id === modiId){
            setInputName("");
            setInputEmail("");
            setModiId(null);
        }
    }

    return (
        <div>
            <input value={inputName} onChange={onChName} placeholder='이름'/>
            <input value={inputEmail} onChange={onChEmail} placeholder='이메일'/>
            <button onClick={onAddUpdate}>{modiId == null?'추가':'저장'}</button>

            <ul>
                {userArray.map((user)=>(
                    <li key={user.id}>{'이름: ' + user.name + ', 이메일: ' + user.email}
                    <button onClick={()=>onModify(user)}>수정</button>
                    <button onClick={()=>onDelete(user.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;