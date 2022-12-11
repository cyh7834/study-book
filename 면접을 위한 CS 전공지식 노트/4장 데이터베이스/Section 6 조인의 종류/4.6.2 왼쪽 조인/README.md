# 왼쪽 조인
왼쪽 조인은 테이블 B의 일치하는 부분의 레코드와 함께 테이블 A를 기준으로 완전한 레코드 집합을 생성한다.<br/>
만약 테이블 B에 일치하는 항목이 없으면 해당 값은 null 값이 된다.<br/>
<br/>
SELECT * FROM TableA A<br/>
LEFT JOIN TableB B ON<br/>
A.key = B.key
