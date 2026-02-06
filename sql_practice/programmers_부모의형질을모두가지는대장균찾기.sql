-- =================
--       Lv.2
-- =================

-- 내 풀이
SELECT ed1.ID, ed1.GENOTYPE, ed2.GENOTYPE AS PARENT_GENOTYPE FROM ECOLI_DATA ed1
JOIN ECOLI_DATA ed2 ON ed1.PARENT_ID=ed2.ID
WHERE (ed1.GENOTYPE & ed2.GENOTYPE)=ed2.GENOTYPE
ORDER BY ed1.ID ASC

/*
풀이 설명 :

현재 대장균과 부모 대장균의 형질을 비교하기 위해 동일한 테이블을 INNER JOIN했다.
(PARENT_ID가 NULL인 경우는 비교할 필요가 없으므로 PARENT_ID가 존재하는 데이터만 사용)
ed1는 현재 대장균 테이블, ed2는 부모 대장균 테이블로 사용
부모 형질(ed2.GENOTYPE)을 비트마스크로 사용. 타겟 대장균 형질(ed1.GENOTYPE)과 비교하여
부모 형질이 전부 포함되어 있는지 확인
*/

/*
Memo :
"Column 'ID' in field list is ambiguous"
어떤 컬럼을 말하는지 명확하게 할 것.
*/

