import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDTO } from './dto/create-chapter.dto';

@Controller('chapter')
export class ChapterController {
  constructor(private chapterService: ChapterService) { }

  // add a chapter
  @Post(':projectId/chapter')
  async addChapter(@Res() res, @Param('projectId') projectId, @Body() createChapterDTO: CreateChapterDTO) {
    const chapter = await this.chapterService.addChapterToProject(projectId, createChapterDTO);
    return res.status(HttpStatus.OK).json({
      message: "Chapter has been created successfully",
      chapter
    })
  }

  // Retrieve chapters list
  @Get()
  async getAllChapter(@Res() res) {
    const chapters = await this.chapterService.getAllChapter();
    return res.status(HttpStatus.OK).json(chapters);
  }

  // Fetch a particular chapter using ID
  @Get(':id')
  async getChapter(@Res() res, @Param('id') id) {
    const chapter = await this.chapterService.getChapter(id);
    if (!chapter) throw new NotFoundException('Chapter does not exist!');
    return res.status(HttpStatus.OK).json(chapter);
  }

  // Update a chapter's details
  @Put(':id')
  async updateChapter(@Res() res, @Param('id') id, @Body() createChapterDTO: CreateChapterDTO) {
    const chapter = await this.chapterService.updateChapter(id, createChapterDTO);
    if (!chapter) throw new NotFoundException('Chapter does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Chapter has been successfully updated',
      chapter
    });
  }

  // Delete a chapter
  @Delete(':id')
  async deleteChapter(@Res() res, @Param('id') id) {
    const chapter = await this.chapterService.deleteChapter(id);
    if (!chapter) throw new NotFoundException('Chapter does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Chapter has been deleted',
      chapter
    })
  }
}