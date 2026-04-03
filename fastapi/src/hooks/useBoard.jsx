import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { showErrorAlert, showSuccessAlert } from "../utils/alertUtiles";

export const useBoard=()=>{

    const [loading, setLoading]=useState(false);

    //1. 전체 게시글 가져오기
    const fetchBoards=useCallback(async() =>{
        setLoading(true);
        try{
            const response=await api.get("/boards")

            if(response.status === 200){
                return response.data;
            }
            return [];
        }catch(error){
            showErrorAlert(error, "게시글을 불러올 수 없습니다");
            return [];
        }finally{
            setLoading(false);
        }
    },[]);

    //전체 게시글 개수



    //새 게시글 생성
    const addBoard=useCallback(async (boardData) => {
        setLoading(true);
        try{
            const response=await api.post("/boards", boardData);

            if(response.status === 200 || response.status ===201){
                showSuccessAlert("게시글이 생성되었습니다");
                return response.data;
            }
            return null;
        }catch(error){
            showErrorAlert(error, "게시글 생성할 수 없습니다");
            return null;
        }finally{
            setLoading(false);
        }
    },[]);

    return{
        loading,
        fetchBoards,
        addBoard,
    };
};