import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  // add a customer
  @Post()
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {

    const user = await this.userService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: "User has been created successfully",
      user
    })
  }

  // Retrieve users list
  @Get()
  async getAllUser(@Res() res) {
    const users = await this.userService.getAllUser();
    return res.status(HttpStatus.OK).json(users);
  }

  // Fetch a particular user using ID
  @Get(':id')
  async getUser(@Res() res, @Param('id') id) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  // Update a user's details
  @Put(':id')
  async updateUser(@Res() res, @Param('id') id, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.updateUser(id, createUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user
    });
  }

  // Delete a customer
  @Delete(':id')
  async deleteUser(@Res() res, @Param('id') id) {
    const user = await this.userService.deleteUser(id);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user
    })
  }
}