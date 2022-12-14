# 중첩 루프 조인
중첩 루프 조인은 중첩 for 문과 같은 원리로 조건에 맞는 조인을 하는 방법이며, 랜덤 접근에 대한 비용이 많이 증가하므로 대용량의 테이블에서는 사용하지 않는다.<br/>
예를 들어 "t1, t2 테이블을 조인한다." 라고 했을 때 첫 번째 테이블에서 행을 한 번에 하나씩 읽고 그 다음 테이블에서도 행을 하나씩 읽어 조건에 맞는 레코드를 찾아 결과 값을 반환한다.<br/>
<br/>
for each row in t1 matching reference key {<br/>
    for each row in t2 matching reference key {<br/>
        if row satisfies join conditions, send to client<br/>
    }<br/>
}<br/>
<br/>
참고로 중첩 루프 조인에서 발전한 조인할 테이블을 작은 블록으로 나눠서 블록 하나씩 조인하는 블록 중첩 루프 조인이라는 방식도 있다.<br/>
