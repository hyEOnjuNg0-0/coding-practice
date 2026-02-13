-- =================
--       Lv.2
-- =================

SELECT ANIMAL_ID, NAME FROM ANIMAL_INS
WHERE NAME LIKE '%el%' AND ANIMAL_TYPE ='Dog'
ORDER BY NAME ASC

/*

풀이 설명 : 
문제 조건 1. 아이디와 이름을 조회
    ANIMAL_ID와 NAME 컬럼 출력

문제 조건 2. 이름에 "EL"이 들어가는 개 (대소문자 구분X)
    LIKE 연산자를 사용하면 문자열에서 부분 일치하는 문자를 검색할 수 있다.
    % : 문자열의 모든 시퀀스
    _ : 단일 문자
    앞뒤에 어떤 글자가 있든 상관없이 'EL'만 들어가 있으면 되므로 이름을 '%el%'로 검색한다.

문제 조건 3. 이름 순 조회
    NAME을 오름차순(ASC) 정렬하면 알파벳 순으로 이름을 조회할 수 있다.

*/