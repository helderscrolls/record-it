import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './interfaces/video.interface';
import { CreateVideoDTO } from './dto/create-video.dto';
import { ChapterService } from 'src/chapter/chapter.service';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel('Video')
    private readonly videoModel: Model<Video>,
    private chapterService: ChapterService,
    ) { }

  // fetch all videos
  async getAllVideo(): Promise<Video[]> {
    const videos = await this.videoModel.find().exec();
    return videos;
  }

  // Get a single video
  async getVideo(id): Promise<Video> {
    const video = await this.videoModel.findById(id).exec();
    return video;
  }

  // post a single video
  async addVideo(createVideoDTO: CreateVideoDTO): Promise<Video> {
    const newVideo = await new this.videoModel(createVideoDTO);
    return newVideo.save();
  }

  async addVideoToChapter(chapterId, createVideoDTO: CreateVideoDTO): Promise<Video> {
    let newVideo 
    await this.addVideo(createVideoDTO).then(video => {
      newVideo = video
      return newVideo;
    }).then(_ => {
      const chapterToUpdate = this.chapterService.getChapter(chapterId);
      return chapterToUpdate;
    }).then(chapterToUpdate => {
      let chapterUpdated
      chapterToUpdate.videos.push(newVideo._id);
      chapterUpdated = chapterToUpdate;
      this.chapterService.updateChapter(chapterUpdated._id, chapterToUpdate) 
    });
    return newVideo
  }
  
  // Edit video details
  async updateVideo(id, createVideoDTO: CreateVideoDTO): Promise<Video> {
    const updatedVideo = await this.videoModel.findByIdAndUpdate(id, createVideoDTO, { new: true });
    return updatedVideo;
  }

  // Delete a video
  async deleteVideo(id): Promise<any> {
    const deletedVideo = await this.videoModel.findByIdAndRemove(id);
    return deletedVideo;
  }
}