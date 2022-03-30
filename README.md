# job-queue
jobqueue example with redis-sentinel
## redis-sentinel
HA구성을 위해서 sentinel로 접속 한다.
현재 26379 port로 접속 가능하다.
```
[
  { host: 'redis-1', port: 26379} ,
  { host: 'redis-2', port: 26379} ,
  { host: 'redis-3', port: 26379} ,
]
```
### build
```
npm install
```

## 실행 방법
### Server 
- nestJS start
Rest API를 이용해서 job을 enqueue할 수 있다.(아래 참조)
기본 worker를 가지고 있다.
```
npm run start:dev

```


### enqueue
```
curl -v -X POST localhost:3000/audio/transcode
```
### worker

```
cd workers
node ./consumer.js

```
### reference
https://github.com/nestjs/nest/tree/master/sample/26-queues
