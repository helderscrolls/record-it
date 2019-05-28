import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDTO } from './dto/create-video.dto';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) { }

  // add a video
  @Post(':chapterId/video')
  async addVideo(@Res() res, @Param('chapterId') chapterId, @Body() createVideoDTO: CreateVideoDTO) {
    const video = await this.videoService.addVideoToChapter(chapterId, createVideoDTO);
    return res.status(HttpStatus.OK).json({
      message: "Video has been created successfully",
      video
    })
  }

  // Retrieve videos list
  @Get()
  async getAllVideo(@Res() res) {
    const videos = await this.videoService.getAllVideo();
    return res.status(HttpStatus.OK).json(videos);
  }

  // Fetch a particular video using ID
  @Get(':id')
  async getVideo(@Res() res, @Param('id') id) {
    const video = await this.videoService.getVideo(id);
    if (!video) throw new NotFoundException('Video does not exist!');
    return res.status(HttpStatus.OK).json(video);
  }

  // Update a video's details
  @Put(':id')
  async updateVideo(@Res() res, @Param('id') id, @Body() createVideoDTO: CreateVideoDTO) {
    const video = await this.videoService.updateVideo(id, createVideoDTO);
    if (!video) throw new NotFoundException('Video does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Video has been successfully updated',
      video
    });
  }

  // Delete a video
  @Delete(':id')
  async deleteVideo(@Res() res, @Param('id') id) {
    const video = await this.videoService.deleteVideo(id);
    if (!video) throw new NotFoundException('Video does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Video has been deleted',
      video
    })
  }
}