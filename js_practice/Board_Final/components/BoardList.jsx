import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContextPro";

// 게시글 목록 화면

const BoardList = () => {
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts")) || []);
    const {currentUser} = useAuth();

    const handleDelete = (id) => {
        // 삭제되고 남은 post들만 posts에 저장
        const updated = posts.filter((post) => post.id !== id);
        setPosts(updated)

        // 로컬 스토리지에 저장
        localStorage.setItem('posts', JSON.stringify(updated));
    }

    return (
        <div>
            <h1>게시글 목록</h1>
            <Link to='/board/create'>글쓰기</Link>

            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id}>
                        <div>{post.title}</div>

                        {currentUser && currentUser.id === post.writerId && (
                            <div>
                                <Link to={`/board/edit/${post.id}`}>수정</Link>
                                <button onClick={()=>handleDelete(post.id)}>삭제</button>
                            </div>
                        )}
                    </div>
                ))
                
            ) : (
                <div>게시물 없음</div>
            )}
        </div>  
    );
};

export default BoardList;