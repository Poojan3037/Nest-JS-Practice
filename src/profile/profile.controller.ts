import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AddProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { ExpressRequest } from 'src/types/express-request.interface';
import { request } from 'http';


@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @UseGuards(AuthGuard)
    @Get()
    async getUsers() {
        return this.profileService.getUsers()
    }

    @UseGuards(AuthGuard)
    @Post()
    async addProfile(@Req() request: ExpressRequest, @Body() addProfileDto: AddProfileDto) {
        const user = request.user
        return this.profileService.addProfile(user.id, addProfileDto.firstName, addProfileDto.lastName, addProfileDto.phoneNumber)
    }


    @UseGuards(AuthGuard)
    @Put()
    async updateProfile(@Req() request: ExpressRequest, @Body() updateProfileDto: UpdateProfileDto) {
        const user = request.user
        return this.profileService.updateProfile(user.id, updateProfileDto.firstName, updateProfileDto.lastName, updateProfileDto.phoneNumber, updateProfileDto.email)
    }
}
