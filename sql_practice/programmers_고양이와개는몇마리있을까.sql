-- =================
--       Lv.2
-- =================

/*
-- 첫 오답
SELECT ANIMAL_TYPE, COUNT(*) AS count FROM ANIMAL_INS
GROUP BY ANIMAL_TYPE

-- 결과
ANIMAL_TYPE	count
Cat	        15
Dog	        85

-- WHY?
조건 누락
문제 조건 1. 고양이와 개가 각각 몇 마리인지 조회
문제 조건 2. 고양이를 개보다 먼저 조회
*/

-- 내 풀이
SELECT ANIMAL_TYPE, COUNT(*) AS count FROM ANIMAL_INS
WHERE ANIMAL_TYPE = 'Dog' OR ANIMAL_TYPE = 'Cat'
GROUP BY ANIMAL_TYPE
ORDER BY ANIMAL_TYPE ASC;

/*

풀이 설명 :
첫 번째 결과는 제대로 나왔지만 문제 조건을 두 가지 누락했다.

조건 1.
  만일 보호소에 고양이와 개가 아닌 다른 종류의 동물들도 들어와 있었다면
  단순히 ANIMAL_TYPE를 그룹화했을 때 다른 종류의 동물들의 수도 출력될 것이다.
  따라서 ANIMAL_TYPE을 제한해주었다.

조건 2.
  알파벳 순서 상 C 다음에 D가 나오기 때문에 
  Cat이 Dog보다 먼저 출력되려면 오름차순 정렬이라는 조건을 추가해주어야 한다.

Memo : 
문제 조건 빠트리지 말 것
문제에 제시된 예제 테이블에 대해서는 동일한 결과가 출력되더라도 다른 테이블에선 다른 결과가 출력될 수 있음.

*/
