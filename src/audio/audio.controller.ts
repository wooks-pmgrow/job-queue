import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

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

