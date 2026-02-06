-- 내 풀이
SELECT COUNT(*) AS COUNT FROM ECOLI_DATA
WHERE (GENOTYPE&5) = 5 OR (GENOTYPE&1) = 1 OR (GENOTYPE&4) = 4 
  AND (GENOTYPE&2)=0

-- 다른 방식
SELECT COUNT(*) AS COUNT FROM ECOLI_DATA
WHERE (GENOTYPE & (5|1|4)) > 0
  AND (GENOTYPE&2)=0

-- GPT 풀이
SELECT COUNT(*) AS COUNT
FROM ECOLI_DATA
WHERE (GENOTYPE & 2) = 0
  AND (GENOTYPE & 5) > 0;

/*
비트마스크 문제
&(AND) 연산: 비트(자리)별 비교
(값 & 마스크) > 0 : 마스크 중 하나라도 있음 (OR)
(값 & 마스크) = 0 : 마스크의 비트 전부 없음
(값 & 마스크) = 마스크 : 마스크의 비트가 전부 포함됨 (AND)

모든 경우의 수를 하나하나 적어줄 필요는 없다
*/
