import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersInfo from './UsersInfo';
import { Users, UsersProvider } from "./Users";

// Link → URL 변경 → Route 매칭 → useParams로 값 읽기
const App = () => {
  return ( // children : UsersProvider로 감싼 컴포넌트들 ( BrowserRouter )
  <UsersProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/users' element={<Users />}></Route>
                    {/* /users/뒤에 오는 값을 id라는 변수로 받는다 */}
        <Route path='/users/:id' element={<UsersInfo />} ></Route>
      </Routes>
    </BrowserRouter>
    </UsersProvider>
  );
};

export default App;