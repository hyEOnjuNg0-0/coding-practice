import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBoard = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 내비게이트 (코드 내에서 페이지 이동)
    // useNavigate() : 페이지 이동 함수
    const navigator = useNavigate();

    // 로그인 한 사용자만 게시글 작성 가능
    // Login.jsx에서 세팅한 값을 가져 옴
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    useEffect(()=>{
        if (!currentUser) {
            alert('로그인이 필요합니다.');
            navigator('/login');
        } 
    }, [])
        
    const onSubmit1 = (e) => {
        // 새로고침 방지
        e.preventDefault();

        // 로컬 스토리지에서 내가 쓴 제목과 내용 읽어와서 posts에 저장
        // 내가 쓴 제목, 내용이 없으면 빈 배열
        // JSON.parse() : 문자열 -> 객체 변환
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        const newPost={
            id:Date.now(),
            title,
            content,
            writerId:currentUser.id
        }

        posts.push(newPost);  // posts에 newPost 추가

        // 로컬 스토리지에 내가 쓴 제목과 내용을 저장 (키 이름: posts)
        // JSON.stringify() : JavaScript 객체 → JSON 문자열로 변환
        localStorage.setItem("posts", JSON.stringify(posts));

        setTitle('');
        setContent('');
        navigator('/boardList');
    }

    
    return (
        <div>
            <h1>게시글 작성</h1>
            <form onSubmit={onSubmit1}>
                제목 : <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} />
                내용 : <textarea value={content} onChange={(e)=>setContent(e.target.value)} />

                <button type='submit'>작성 완료</button>
            </form>
            
        </div>
    );
};

export default CreateBoard;