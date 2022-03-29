# job-queue
jobqueue example with redis-sentinel
## redis-sentinel
HA구성을 위해서 sentinel로 접속 한다.
현재 26379 port로 접속 가능하다.
### build
-
```
npm i 
```

## 실행 방법
### Server 
- nestJS start
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


