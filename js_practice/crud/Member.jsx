import React, { useEffect, useState } from "react";
import "./member.css";

const Member = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "user1", email: "user1@gmail.com", password:"1234" },
    { id: 2, username: "user2", email: "user2@gmail.com", password:"5678" },
    { id: 3, username: "user3", email: "user3@gmail.com", password:"91011" },
  ]);

  const [form, setForm]=useState({username:'', email:'', password:''}); // 회원가입 폼
  const [loginForm, setLoginForm]=useState({username:'', password:''}); // 로그인 폼
  const [editUserForm,setEditUserForm]=useState({username:"",email:"",password:""});  //수정폼 

  const [loggedInUser,setLoggedInUser]=useState(null); //현재 로그인된 사용자
  const [modiMode, setModiMode]=useState(false);  // 수정 모드 상태
  const [selUser1, setSelUser1]=useState(null);  // 현재 선택된 사용자

  // 사용자 클릭할 때마다 변화값을 selPost1(객체)에 저장
  const selUser=(user)=>{
      setSelUser1(user);
  }

  const [today1, setToday1]=useState("");  // 현재 시간
  
  const getCurrentTime = () => {
    const now = new Date();  // 날짜 객체 생성

    // YYYY-MM-DD HH:mm 형식
    return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,"0")}-
      ${(now.getDate()).toString().padStart(2,"0")} 
      ${(now.getHours()).toString().padStart(2,"0")}:${(now.getMinutes()).toString().padStart(2,"0")}`;
  }

  // 컴포넌트 최초 렌더링 시 날짜 저장
  useEffect(()=>{setToday1(getCurrentTime())},[]);
  // const [today1] = useState(getCurrentTime()); // 어차피 첫 렌더링 시 한 번 호출할 거면


  // 회원 등록
  const addUser=()=>{
    if(form.username.trim()&&form.email.trim()&&form.password.trim()){
      const newUser={
            id:users.length+1,
            ...form,
        };
        setUsers([...users, newUser]);
        setForm({ username:"", email:"", password:"" });
      }
  };

  // 로그인
  const loginUser=()=>{
    const user=users.find((user) => user.username === loginForm.username && user.password === loginForm.password);

    if(user){  // find()로 찾은 user가 존재하면
      setLoggedInUser(user); 
      setEditUserForm(user); // 로그인 된 사용자 정보 수정
      setLoginForm({ username:"", password:"" });
    }
    else{
      alert("아이디 또는 비밀번호가 틀렸습니다");
    }
  };

  // 로그아웃
  const logoutUser=()=>{
    setLoggedInUser(null);
  }

  // 수정한 후 저장버튼 클릭 시 -> 선택한 회원 업데이트
  const updateUser= () => {
    const updateUsers=users.map((user) =>
    user.id===selUser1.id?selUser1:user
      );

    setUsers(updateUsers);
    setModiMode(false);
  };

  // 회원 삭제
  const deleteUser =(userId)=>{
      //주어진 postId값과 일치하지 않은 게시글만 필터링해서 새 배열 생성
      setUsers(users.filter((user1)=>user1.id !== userId));
  };

  // users 배열이 바뀌거나 selUser1(선택된 유저)가 바뀔 때 실행
  // selUser1가 users에서 사라졌을 때 선택 상태 초기화
  useEffect(() => {
    if (selUser1 && !users.some((user) => user.id===selUser1.id)) {
      setSelUser1(null);
    }
  }, [users,selUser1]);

  const updateMyInfo=()=>{
    const updateUser=users.map((user) => user.id === loggedInUser.id ? {...user, ...editUserForm}:user); // 배열

    setUsers(updateUser);
    setLoggedInUser({ ...loggedInUser, ...editUserForm });  // 로그인한 사용자 정보 - 수정된 값 넣음
    setEditUserForm({ username:"", email:"", password:"" });  // 회원정보수정 버튼 누르고 폼 비어있게 초기화

    alert("회원정보 수정 완료");
  };

  return (
      <div className='app'>
        <h1>Member</h1>

        {/* //로그인 여부에 따라서 회원가입 보이고 안보이고  */}
        {!loggedInUser ?   (
        <div className="auth-section">
          <h2>회원가입</h2>
          <input type='text' value={form.username} placeholder='아이디 입력' onChange={(e)=>setForm({...form, username: e.target.value})}></input><br></br>
          <input type='email' value={form.email} placeholder='이메일 입력'  onChange={(e)=>setForm({...form, email: e.target.value})}></input>
          <input type="password" value={form.password} placeholder="비밀번호 입력" onChange={(e)=>setForm({...form, password:e.target.value})} />
          <button onClick={addUser}>회원 가입</button>
          </div>
        )  : (
          //로그인 되어있으면 
          <>

          <h2>로그인된 사용자 : {loggedInUser.username}</h2>

          <button onClick={logoutUser} className="logoutBtn">
            로그아웃
          </button>

          <div className="user-detail">
            <h2>회원 정보 수정</h2>

            <input type="text" value={editUserForm.username} onChange={(e)=>setEditUserForm({...editUserForm, username: e.target.value})}/>
            <input type="email" value={editUserForm.email} onChange={(e)=>setEditUserForm({...editUserForm, email: e.target.value})}/>
            <input type="password" value={editUserForm.password} onChange={(e)=>setEditUserForm({...editUserForm, password: e.target.value})}/>

            <button onClick={updateMyInfo}>회원 정보 수정</button>
            </div>
          </>
        )}

        <div className="auth-section">
            <h2>로그인</h2>
            <input type='text' value={loginForm.username} placeholder='아이디 입력' onChange={(e)=>setLoginForm({...loginForm, username:e.target.value})}></input><br></br>
            <input type="password" value={loginForm.password} placeholder="비밀번호 입력" onChange={(e)=>setLoginForm({...loginForm, password:e.target.value})} />
            <button onClick={loginUser}>로그인</button>
            <h2>{today1}</h2>
            {users.map((user1)=>{  
                return(
                    <div key={user1.id} className="po-item" onClick={()=>{selUser(user1)}}>
                        <h1>{user1.username}</h1>
                        <p>{user1.email}</p>
                        <button onClick={(e)=>{
                            e.stopPropagation();
                            deleteUser(user1.id)}}>삭제</button>
                    </div> //key 속성 왜쓰냐 : React에서 배열 렌더링할때 각 항목 식별하기 위해
                          //상태변화시(어떤항목이 변경, 추가, 삭제되었는지 효율적 파악) 에 dom 업데이트 최적화하기 위해
                );
            })} 
        </div>
        {selUser1 && (
        <div className="selected-user">
          {modiMode ? (
              <>
                <input type='text' value={selUser1.username} onChange={(e)=>setSelUser1({...selUser1, username:e.target.value})}  />
                <input value={selUser1.email} onChange={(e)=>setSelUser1({...selUser1, email:e.target.value})} />
                <button onClick={updateUser}>저장</button>
              </>
          )  : (
              <>
                <h2>{selUser1.username}</h2>  
                <p>{selUser1.email}</p>
                <p>{selUser1.date}</p>
                <button onClick={()=>setModiMode(true)}>수정</button>
              </>
          )}
        </div>
        )}
      </div>
  )
}

export default Member;
