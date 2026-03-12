import React, { useEffect, useState } from 'react';
import "./Board.css";

const Board = () => {

    const [posts, setPosts]=useState([
        {id:1, title:'첫번째 제목', content:'첫번째 내용', date:'2023-11-01 10:30'},
        {id:2, title:'두번째 제목', content:'두번째 내용', date:'2024-07-01 12:40'},
        {id:3, title:'세번째 제목', content:'세번째 내용', date:'2025-10-26 16:04'},
    ]);

    //클릭할때마다 클릭한 값(변화값)을 selPost1(객체)에 저장
    const [selPost1, setSelPost1]=useState(null);

    const selPost=(post)=>{
        setSelPost1(post); //post : 클릭한 값(객체)
    }

    //새 게시글 제목 관리하는 state
    const [newTitle, setNewTitle]=useState('');

    //새 게시글 내용 관리하는 state
    const [newContent, setNewContent]=useState('');

    //수정 게시글 관리
    const [modiMode, setModiMode]=useState(false);

    //게시글 등록함수
    const addPost=()=>{
        if(newTitle.trim() && newContent.trim()){ //공백제거

            const now=new Date();                                                     //2자리로 맞추고 앞에 0 추가
            const todayNow = `${now.getFullYear()}-${(now.getMonth() +1).toString().padStart(2,"0")}-${now.getDate().toString().padStart(2,"0")} ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;

            const newPost={
                id:posts.length+1,
                title:newTitle,  //제목 입력하면 제목이 newTitle 에 저장
                content:newContent,
                date:todayNow,          
            };
            setPosts([...posts, newPost]);
            //기존게시물을 펼쳐서 복사하겠다. newPost를 배열 마지막에 추가하여 새로운 배열을 만들어 설정하겠다.
            //기존게시물은 유지, 추가만됨

    
            //등록하고 text, textarea 공백으로 설정
            setNewTitle("");
            setNewContent("");

        }
    }

    //해당 postId를 가진 게시글 삭제할거임
    //클릭한 id와 일치하지 않는 게시글의 id만 남겨서 posts 객체배열에 저장하겠다.
    const deletePost=(postId)=>{
       //                        클릭한 id      게시글 id
        setPosts(posts.filter((post1) =>   postId  !==  post1.id));
        //삭제된 게시글은 배열에 있으면 안되므로 .. setPosts 를 사용해 상태변경함
    };

    useEffect(()=>{
        //클릭한 게시글이 있고(클릭한 상태) 이고// 클릭한 게시글이 현재 게시글 목록에는 없네?
        if(selPost1 && !posts.some((post) => post.id === selPost1.id)){
           setSelPost1(null); //내가 선택한 객체를 null로 변경해줘~ -> null-> falsy
        }
    },[posts,selPost1]); 
    //게시글을 클릭해서 보고 있는데,
    //그 게시글을 삭제하면 더이상 게시물이 선택되어있으면 안되니까 초기값은 null로 세팅함


    const updatePost=()=>{
        const now=new Date();                                                     //2자리로 맞추고 앞에 0 추가
        const todayNow = `${now.getFullYear()}-${(now.getMonth() +1).toString().padStart(2,"0")}-${now.getDate().toString().padStart(2,"0")} ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;
    
        //저장버튼 클릭한 id랑 배열에 있는 id와 비교
        const updatedPosts=posts.map((post) => post.id === selPost1.id
        ? {...post, title:selPost1.title, 
                    content:selPost1.content,
                    date:todayNow,
         }   : post );

        //수정된 데이터를 세팅
        setPosts(updatedPosts);
        setModiMode(false);

    }

    return( //컴포넌트 return  (App에 넘길 출력할 jsx)
        <div className='board-app'>
            <h1>Board</h1>
            <div className="input-section">
            <div className='board-li'>
                <input type='text' placeholder='제목 입력' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}></input><br></br>
                <textarea placeholder='내용 입력' onChange={(e)=>setNewContent(e.target.value)} value={newContent}></textarea>
                <button onClick={addPost}>게시글 등록!!!!</button>
                </div>
                <div className='board-li'>
                <h2>Board List</h2>

                {posts.map((i) => {
                        return(  //map return (배열 돌면서 출력할 jsx)
                    <div key={i.id} className='board-item' onClick={()=> selPost(i)}>
                        <h2>{i.title}</h2>
                        <p>{i.date}</p>
                        <button onClick={()=>{
                            //e.stopPropagation(); //버블링 방지(부모 이벤트까지 전파되지 않게 막음)
                            deletePost(i.id)}}>삭제</button>
                    </div> //key 속성 왜 쓰냐: React에서 배열 렌더링할때 각 항목 식별하기 위해 
                           //상태변화 시 (어떤 항목이 변경, 추가, 삭제되었는지 효율적 파악) 에 dom 업데이트 최적화하기 위해
                );
            })}
        </div>
        </div>
        {selPost1 && (
            <div className='post-detail'> 
            {modiMode ? (
                <>
                    <input type='text' value={selPost1.title} onChange={(e)=> setSelPost1({...selPost1, title: e.target.value})} />
                    <textarea value={selPost1.content} onChange={(e)=> setSelPost1({...selPost1, content:e.target.value})} />
                    <button className='saveBtn' onClick={updatePost}>저장</button>
                </>
            )   : 
            
            (
                <>
                    <h2>{selPost1.title}</h2>
                    <h2>{selPost1.content}</h2>
                    <h2>{selPost1.date}</h2>
                    <button className='ModiBtn' onClick={()=>setModiMode(true)}>수정</button>
                </>
            
            )}
    </div>
        )}
    </div>
    );
};

export default Board;
