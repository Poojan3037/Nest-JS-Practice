import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/database/entity/Profile';
import { User } from 'src/database/entity/User';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>
    ) { }

    async getUsers() {
        const users = await this.userRepository.find({ relations: { profile: true }, select: { email: true, profile: { firstName: true, lastName: true, phoneNumber: true } } })
        return { data: users }
    }

    async addProfile(userId: string, firstName: string, lastName: string, phoneNumber: string) {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: { profile: true } })

        if (!user) {
            throw new NotFoundException("User not found.")
        }

        if (user.profile) {
            throw new ConflictException("Profile is already added.")
        }

        const isPhoneNumberInUse = await this.profileRepository.findOne({ where: { phoneNumber } })

        if (isPhoneNumberInUse) {
            throw new ConflictException("Phone number is already in use by another user.")
        }

        const profile = new Profile();
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.phoneNumber = phoneNumber;
        await this.profileRepository.save(profile)

        user.profile = profile;
        await this.userRepository.save(user);

        return { message: "Profile added successfully." }
    }

    async updateProfile(userId: string, firstName: string, lastName: string, phoneNumber: string, email: string) {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: { profile: true } })

        if (!user) {
            throw new NotFoundException("User not found.")
        }

        const isPhoneNumberInUse = await this.profileRepository.findOne({ where: { phoneNumber, user: Not(userId) } })

        if (isPhoneNumberInUse) {
            throw new ConflictException("Phone number is already in use by another user.")
        }

        const profile = user.profile;
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.phoneNumber = phoneNumber;
        await this.profileRepository.save(profile)



        return { message: "Profile updated successfully." }
    }
}
