import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VideoSchema } from './schemas/video.schema';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { ChapterService } from 'src/chapter/chapter.service';
import { ChapterModule } from 'src/chapter/chapter.module';
import { ProjectService } from 'src/project/project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
    ChapterModule
  ],
  providers: [
    ProjectService,
    ChapterService,
    VideoService
  ],
  controllers: [VideoController]
})
export class VideoModule {}
