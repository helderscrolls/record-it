import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) { }

  // add a project
  @Post(':userId/project')
  async addProject(@Res() res, @Param('userId') userId, @Body() createProjectDTO: CreateProjectDTO) {
    const project = await this.projectService.addUserToProject(userId, createProjectDTO);
    return res.status(HttpStatus.OK).json({
      message: "Project has been created successfully",
      project
    })
  }

  // Retrieve projects list
  @Get()
  async getAllProject(@Res() res) {
    const projects = await this.projectService.getAllProject();
    return res.status(HttpStatus.OK).json(projects);
  }

  // Fetch a particular project using ID
  @Get(':id')
  async getProject(@Res() res, @Param('id') id) {
    const project = await this.projectService.getProject(id);
    if (!project) throw new NotFoundException('Project does not exist!');
    return res.status(HttpStatus.OK).json(project);
  }

  // Update a project's details
  @Put(':id')
  async updateProject(@Res() res, @Param('id') id, @Body() createProjectDTO: CreateProjectDTO) {
    const project = await this.projectService.updateProject(id, createProjectDTO);
    if (!project) throw new NotFoundException('Project does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Project has been successfully updated',
      project
    });
  }

  // Delete a project
  @Delete(':id')
  async deleteProject(@Res() res, @Param('id') id) {
    const project = await this.projectService.deleteProject(id);
    if (!project) throw new NotFoundException('Project does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Project has been deleted',
      project
    })
  }
}