import {Controller, Post, Body, Res, HttpException, HttpStatus} from '@nestjs/common';
import {Response} from 'express';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {ConfigService} from "@nestjs/config";
import {LogInDto} from "./dtos/log-in.dto";
import {CreateUserDto} from "./dtos/create-user.dto";

@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
  }

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const userExists = await this.userRepository.findOne({
      where: {email: createUserDto.email}
    });

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword
    });

    await this.userRepository.save(newUser);

    const token = jwt.sign({id: newUser.id}, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: "30d"
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return res.json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    });
  }

  @Post('/login')
  async loginUser(
    @Body() loginDto: LogInDto,
    @Res() res: Response
  ) {
    const existingUser = await this.userRepository.findOne({where: {email: loginDto.email}});

    if (!existingUser) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, existingUser.password);

    if (!isPasswordValid) {
      throw new HttpException('Password is not valid', HttpStatus.BAD_REQUEST);
    }

    const token = jwt.sign({id: existingUser.id}, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email
    });
  }

  @Post('logout')
  async logoutCurrentUser(@Res() res: Response) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({message: "Logged out successfully"});
  }
}
