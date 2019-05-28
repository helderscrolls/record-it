import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { ChapterModule } from './chapter/chapter.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/record-it-app', { useNewUrlParser: true }),
    ChapterModule,
    ProjectModule,
    UserModule,
    VideoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
