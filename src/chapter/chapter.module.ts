import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChapterSchema } from './schemas/chapter.schema';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { ProjectModule } from 'src/project/project.module';
import { ProjectService } from 'src/project/project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chapter', schema: ChapterSchema }]),
    ProjectModule
  ],
  providers: [
    ProjectService,
    ChapterService
  ],
  controllers: [ChapterController]
})
export class ChapterModule { }
