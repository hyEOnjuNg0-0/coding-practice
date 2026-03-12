import { createContext, useContext } from 'react';
import {Link} from "react-router-dom";

export const UsersContext=createContext();

export const UsersProvider=({children})=>{  // children : UsersProvider로 감싼 컴포넌트들
    const users=[
        {id:1, name:'Alice',age:25, email:'alice@naver.com'},
        {id:2, name:'Bob',age:35, email:'bob@naver.com'},
        {id:3, name:'Juli',age:45, email:'juli@naver.com'},
    ];

    return(
        <UsersContext.Provider value={users}>
            {children}
        </UsersContext.Provider>
    )
}

export const Users = () => {
    const users=useContext(UsersContext);
    
    return ( // Link → URL 변경 → Route 매칭 → useParams로 값 읽기
        <div>                                       {/*Link to="/users/1"*/}
            {users.map((user)=>(<li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></li>))}
        </div>
    );
};