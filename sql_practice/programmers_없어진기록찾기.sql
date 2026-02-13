-- =================
--       Lv.3
-- =================

SELECT O.ANIMAL_ID, O.NAME FROM ANIMAL_OUTS O
LEFT JOIN ANIMAL_INS I ON O.ANIMAL_ID = I.ANIMAL_ID
WHERE I.ANIMAL_ID IS NULL
ORDER BY O.ANIMAL_ID ASC

/*

풀이 설명 : 
문제 조건 1. 입양을 간 기록은 있는데, 보호소에 들어온 기록이 없는 동물의 ID와 이름 조회
    입양 보낸 동물의 기록은 ANIMAL_OUTS 테이블(O)에,
    보호소에 들어온 동물의 기록은 ANIMAL_INS 테이블(I)에 정리되어 있다.
    입양 간 기록(O)은 전부 있어야 함 + 보호소에 들어온 기록(I)은 없을 수도 있음
     -> ANIMAL_OUTS 테이블을 기준으로 LEFT JOIN
    이제 보호소에 들어온 기록(I)이 없는 경우를 IS NULL로 검색한다.

문제 조건 2. ID 순으로 조회
    ID 오름차순(ASC) 정렬

*/

