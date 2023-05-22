import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import UpdatePasswordDto from './dto/update-password.dto';
import UpdateUserDto from './dto/update-user.dto';
import { UsersService } from './users.service';
import ResetPasswordDTO from './dto/reset-password.dto';
import { JwtAuthGuard } from 'src/auth/authentication/jwt-auth.guard';
import { Role } from 'src/auth/authorization/role.enum';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { RolesGuard } from 'src/auth/authorization/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //done
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('/for_admin')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createByAdmin(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createByAdmin(
      createUserDto,
      createUserDto.type,
    );
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('user/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.findOne(id);
  }

  @Put('/password')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    await this.usersService.updatePassword(updatePasswordDto, req.user.id);
  }

  @Put('/password_reset')
  async resetPasswrod(@Body() resetPasswordDto: ResetPasswordDTO) {
    await this.usersService.resetPassword(resetPasswordDto);
  }

  @Patch('/me')
  @UseGuards(JwtAuthGuard)
  async updateUserSelf(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(req.user.id, updateUserDto);
  }

  @Patch('user/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.update(id, updateUserDto);
  }

  @Delete('user/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.remove(id);
  }
}
