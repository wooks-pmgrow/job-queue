import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        //host: 'redis-1',
        //port: 6379,
        sentinels: [
          {
            host: 'redis-1',
            port: 26379,
          },
          {
            host: 'redis-2',
            port: 26379,
          },
          {
            host: 'redis-3',
            port: 26379,
          },
        ],
              name: 'turple',
          },
    }),
    AudioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
