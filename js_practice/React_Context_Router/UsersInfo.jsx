import React, { useContext } from 'react';
import { UsersContext } from './Users';
import { useParams } from 'react-router-dom';

// Link → URL 변경 → Route 매칭 → useParams로 값 읽기
// useParams() : Route에서 받은 URL 파라미터를 반환
const UsersInfo = () => {
    const users=useContext(UsersContext);
    const userId=parseInt(useParams().id);
    const currUser=users.find((user) => user.id === userId);

    return (
        <div> 
            {/* //id, name, age, email 출력 */}
            <li>id:{currUser.id}</li>
            <li>name:{currUser.name}</li>
            <li>age:{currUser.age}</li>
            <li>email:{currUser.email}</li>
            
        </div>
    );
};

export default UsersInfo;