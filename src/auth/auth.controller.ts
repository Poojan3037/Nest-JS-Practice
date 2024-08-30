import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto.email, registerUserDto.password)
    }

    @Post("login")
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto.email, loginUserDto.password)
    }
}
