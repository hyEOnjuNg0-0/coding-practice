import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { showErrorAlert, showSuccessAlert } from "../utils/alertUtiles";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser]=useState(null);
  const navigate=useNavigate();

  const login = async (email, password) => {
    try{
      const response=await api.post("/users/login", {email, password});

      //jwt 토큰을 서버에 검증 요청
      if(response.status===200){
        setUser(response.data);
        setIsAuthenticated(true);
        await verifyJWT();
        showSuccessAlert("환영합니다~~");
        return true;
      }
    }
    catch(error){
      console.error(error);
      setError(error.response?.data.detail || "로그인에 실패했습니다");
      setIsAuthenticated(false);
      return false;
    }
  };

  const signup = async ({email,username,password,confirmPassword}) => {
    if(!email.includes("@")){
      setError("유효한 이메일을 입력하세요");
      return false;
    }
    if(username.length < 2){
      setError("최소 2글자 이상이어야 해요");
      return false;
    }
    if(password.length < 5) {
      setError("비밀번호는 최소 5자리 이상이어야 해요");
      return false;
    }
    if(password !== confirmPassword){
      setError("비밀번호가 일치하지 않아요");
      return false;
    }
    try{
      const response=await api.post("/users/signup" , {
        email,
        username,
        password,
      });

      if(response.status === 200){
        showSuccessAlert("회원가입이 완료되었습니다");
        return true;
      }
      return false;
    }
    catch(error){
      console.error(error);
      setError(error.response?.data.detail || "회원가입에 실패했습니다");
      return false;
    }
  };

  const logout = async () => {
    try{
      const response=await api.post("/users/logout");
      setIsAuthenticated(false);
      setUser(null);

      if(response.status === 200){
        showSuccessAlert("로그아웃 되었습니다");
        navigate("/");
      }
    }catch(error){
      console.error(error);
    }finally{
      setIsAuthenticated(false);
      setUser(null);
      navigate("/");
    }
  };
  //jwt토큰 검증+사용자 상태관리 함수
  //현재 로그인 사용자인지 확인하려고
  //withCredentials:true -> 쿠키에 있는 jwt가 자동 전송
  //성공시 서버가 사용자 정보 반환 
  const verifyJWT = async()=>{
    try{
      const response=await api.get("/users/me");
      setIsAuthenticated(true);
      setUser(response.data);
      return true;
    }
    //옵셔널 체이닝(?.)
    //error.response.data?.detail 
    //data가 없으면 에러발생하지 말고 undefined반환해. 만약 detail있음 그 값 가져와
    catch(error){
      if(error.response?.status === 401){
        const detail=error.response.data?.detail;

        // if(detail==="Access token expired"){
        //   showErrorAlert("세션이 만료되었다.다시 로그인해주세요");
        //   navigate("/");
        // }
      }
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  };

  //컴포넌트 화면에 첫 렌더링될때 사용자 JWT상태를 확인하려고
  //세션유지, 자동로그인체크시 활용한다. jwt인증에서 거의 필수 패턴
  useEffect(()=>{
    (async () => {
      await verifyJWT();
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ error, setError, isAuthenticated, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 사용하기 위해 AuthProvider로 감싸야한다.");
  }
  return context;
};