import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {
    audioQueue.on('error', (error) => {
      console.log('--------------------------------------------');
      console.log(error)
      console.log('--------------------------------------------');
    });
    audioQueue.on('failed', (job, error) => { console.log('failed ' + error)});
    audioQueue.on('waiting', (job) => { console.log('waiting ')});
    audioQueue.on('removed', (job) => { console.log('removed ')});
  }

  @Post('transcode')
  async transcode() {
    await this.audioQueue.add('transcode', {
      file: 'audio.mp3',
      message: 'Good job! wooks',
      param:'KR',
    }, 
    { removeOnComplete: true, // remove job if complete
      attempts: 3 // attempt if job is error retry 3 times
    }
    );
  }
}

