import React, { useState } from 'react';

// != : 값이 다르면 참
// !== : 값과 타입 전부 다르면 참

const App = () => {
  const [input, setInput] =useState('');  // 입력값
  const [todo, setTodo]=useState([]);  // 배열 초기화
  const [modiId, setModiId]=useState(null); //수정 상태 false

  // 할 일 입력이 input에 저장
  const onCh=(e)=>{
    setInput(e.target.value);
  }

  const onAddUpdate=()=>{
    if(modiId !== null){
      setTodo(todo.map((todo1)=> todo1.id===modiId?{...todo1, msg:input}:todo1));
      setModiId(null);  // 수정 끝나면 ModiId null로 초기화
    }
    else{
      setTodo([...todo, {id:Date.now(), msg:input}])
    }
    
    setInput("");
  }

  const onModify=(todo)=>{
    setInput(todo.msg);
    setModiId(todo.id);
  }

  // const onModify=(id)=>{
  //   const data = todo.find((todo1)=>todo1.id===id);
  //   if(!data){
  //     return;  // 못 찾으면 그냥 종료
  //   }
  //   setInput(data);
  //   setModiId(id);
  // }

  const onDelete = (id)=>{
    setTodo(todo.filter((todo)=>todo.id !== id));

    if(id===modiId){
      setModiId(null);
      setInput("");
    }

  }

  // 수정버튼 누르기 전 -> 추가버튼 보여야 함
  // 수정버튼 누르면 -> 수정할 수 있는 input창 / 수정완료 버튼 보여야 함
  return (
    <div>
        <h2>오늘 뭐할까</h2>
        <input value={input} onChange={onCh} placeholder='할 일 입력'/>
        <button onClick={onAddUpdate}>{modiId == null?'추가':'수정완료'}</button>

        <ul>
          {todo.map((todo1)=>(
            <li key={todo1.id}>{todo1.msg}
              <button onClick={()=>onModify(todo1)}>수정</button>
              <button onClick={()=>onDelete(todo1.id)}>삭제</button>
            </li>
          ))}
        </ul>

    </div>
  );
}
export default App;
