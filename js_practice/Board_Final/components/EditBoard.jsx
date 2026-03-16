import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBoard = () => {
    const {id} = useParams();  // /board/edit/${post.id}에 해당하는 id
    const [post, setPost] = useState({title:'', content:''})
    const navigator = useNavigate();

    
    useEffect(()=>{
        // id가 변경될 때마다 로컬스토리지에서 posts 가져옴
        const posts = JSON.parse(localStorage.getItem('posts')) || [];

        const currentPost = posts.find((p)=>parseInt(id)===p.id);

        if(currentPost){
            setPost(currentPost);
        }

    }, [id])

    const onSubmit1 = (e) => {
        // HTML form은 기본적으로 submit하면 페이지가 새로고침됨. 이를 방지
        e.preventDefault();

        let posts = JSON.parse(localStorage.getItem('posts')) || [];

        // 게시물 수정
        posts = posts.map((p)=>p.id===parseInt(id)?{...post, writerId:p.writerId} : p);

        // 수정된 게시물 로컬 스토리지에 저장
        localStorage.setItem('posts', JSON.stringify(posts));

        navigator('/boardList')
    }

    return (
        <div>
            <h1>게시글 수정</h1>
            <form onSubmit={onSubmit1}>
                <input value={post.title} onChange={(e)=>setPost({...post, title:e.target.value})} />
                <input value={post.content} onChange={(e)=>setPost({...post, content:e.target.value})} />

                <button>수정</button>
            </form>
            
        </div>
    );
};

export default EditBoard;