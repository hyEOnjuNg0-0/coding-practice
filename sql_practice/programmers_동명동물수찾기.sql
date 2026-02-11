-- =================
--       Lv.2
-- =================

-- 내 풀이
SELECT NAME, COUNT(*) AS COUNT FROM ANIMAL_INS
WHERE NAME IS NOT NULL
GROUP BY NAME
HAVING COUNT(*)>=2
ORDER BY NAME ASC

/*

풀이 설명 : 
문제 조건 1. 두 번 이상 쓰인 이름과 그 횟수 출력
    이름의 횟수를 출력해야 하므로 NAME을 기준으로 그룹화
    두 번 이상 쓰여야 하므로 HAVING으로 그룹 조건 걸기

문제 조건 2. 이름 없는 동물은 집계 제외
    이름 없다 = NULL
    집계 제외 = IS NOT NULL

문제 조건 3. 이름 순 조회
    NAME을 오름차순(ASC) 정렬하면 알파벳 순으로 이름을 조회할 수 있다.

*/