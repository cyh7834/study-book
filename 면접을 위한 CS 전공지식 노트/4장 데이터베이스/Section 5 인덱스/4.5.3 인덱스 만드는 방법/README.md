# 인덱스 만드는 방법
인덱스를 만드는 방법은 데이터베이스마다 다르며 MySQL과 MongoDB를 기준으로 알아보자.<br/>

###### MySQL
MySQL의 경우 클러스터형 인덱스와 세컨더리 인덱스가 있으며, 클러스터형 인덱스는 테이블당 하나를 설정할 수 있다. primary key 옵션으로 기본키로 만들면 클러스터형 인덱스를 생성할 수 있고, 기본키로 만들지 않고 unique not null 옵션을 붙이면 클러스터형 인덱스로 만들 수 있다.<br/>
create index... 명령어를 기반으로 만들면 세컨더리 인덱스를 만들 수 있다. 하나의 인덱스만 생성할 것이라면 클러스터형 인덱스를 만드는 것이 세컨더리 인덱스를 만드는 것보다 성능이 좋다.<br/>
세컨더리 인덱스는 보조 인덱스로 여러 개의 필드 값을 기반으로 쿼리를 많이 보낼 때 생성해야 하는 인덱스이다. 예를 들어 age라는 하나의 필드만으로 쿼리를 보낸다면 클러스터형 인덱스만 필요하다. 하지만 age, name, email 등 다양한 필드를 기반으로 쿼리를 보낼 때는 세컨더리 인덱스를 사용해야 한다.<br/>

###### MongoDB
MongoDB의 경우 도큐먼트를 만들면 자동으로 ObjectID가 형성되며, 해당 키가 기본키로 설정된다. 그리고 세컨더리 키도 부가적으로 설정해서 기본키와 세컨더리 키를 같이 쓰는 복합 인덱스를 설정할 수 있다.
