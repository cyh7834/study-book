# 합집합 조인
합집합 조인(완전 외부 조인)은 양쪽 테이블에서 일치하는 레코드와 함께 테이블 A와 테이블 B의 모든 레코드 집합을 생성한다.<br/>
이때 일치하는 항목이 없으면 누락된 쪽에 null 값이 포함되어 출력된다.<br/>
<br/>
SELECT * FROM TableA A<br/>
FROM OUTER JOIN TableB B ON<br/>
A.key = B.key
