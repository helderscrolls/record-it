import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter } from './interfaces/chapter.interface';
import { CreateChapterDTO } from './dto/create-chapter.dto';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel('Chapter') 
    private readonly chapterModel: Model<Chapter>,
    private projectService: ProjectService,
    ) { }

  // fetch all chapters
  async getAllChapter(): Promise<Chapter[]> {
    const chapters = await this.chapterModel.find().exec();
    return chapters;
  }

  // Get a single chapter
  async getChapter(id): Promise<Chapter> {
    const chapter = await this.chapterModel.findById(id).exec();
    return chapter;
  }

  // post a single chapter
  async addChapter(createChapterDTO: CreateChapterDTO): Promise<Chapter> {
    const newChapter = await new this.chapterModel(createChapterDTO);
    return newChapter.save();
  }

  async addChapterToProject(projectId, createChapterDTO: CreateChapterDTO): Promise<Chapter> {
    let newChapter 
    await this.addChapter(createChapterDTO).then(chapter => {
      newChapter = chapter
      return newChapter;
    }).then(_ => {
      const projectToUpdate = this.projectService.getProject(projectId);
      return projectToUpdate;
    }).then(projectToUpdate => {
      let projectUpdated
      projectToUpdate.index.push(newChapter._id);
      projectUpdated = projectToUpdate;
      this.projectService.updateProject(projectUpdated._id, projectToUpdate) 
    });
    return newChapter
  }

  // Edit chapter details
  async updateChapter(id, createChapterDTO: CreateChapterDTO): Promise<Chapter> {
    const updatedChapter = await this.chapterModel
      .findByIdAndUpdate(id, createChapterDTO, { new: true });
    return updatedChapter;
  }
  
  // Delete a chapter
  async deleteChapter(id): Promise<any> {
    const deletedChapter = await this.chapterModel.findByIdAndRemove(id);
    return deletedChapter;
  }
}