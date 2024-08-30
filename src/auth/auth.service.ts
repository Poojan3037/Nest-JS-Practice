import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entity/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (user) {
            throw new ConflictException(`User already exist with email : ${email}`)
        }

        const newUser = new User();
        newUser.email = email;
        newUser.password = await bcrypt.hash(password, 10);
        await this.usersRepository.save(newUser)

        return { message: "User registered successfully." }
    }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException(`User not found with email : ${email}`)
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new UnauthorizedException()
        }

        const payload = { id: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload, { secret: this.configService.get<string>('JWT_SECRET') }),
        };

    }

}
