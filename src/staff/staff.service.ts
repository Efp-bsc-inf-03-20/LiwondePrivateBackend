import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../shared/entities/User.staff.entity';
import * as bcryptjs from 'bcryptjs';
import { verify, sign } from 'jsonwebtoken';
import { UpdateStaffDto } from '../shared/dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor( @InjectRepository( User ) private staffRepository: Repository<User> ) { }
  private generateRandomUsername( firstName: string, lastName: string, roles: string[] ): string {
    // Logic to generate a random username based on first name, last name, and roles
    // Adjust this logic based on your specific requirements
    const randomSuffix = Math.floor( Math.random() * 1000 );
    return `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${roles.join( '_' )}_${randomSuffix}`;
  }
  async loginStaff( user: User, res: Response ) {
    const { email, password } = user;
    // Check for required fields
    if ( !email?.trim() || !password?.trim() ) {
      return res.status( 500 ).send( { message: 'Not all required fields have been filled in.' } );
    }

    const staffMember = await this.staffRepository.findOne( { where: { email } } );

    // Staff not found or wrong password
    if ( !staffMember || !( await bcryptjs.compare( password, staffMember.password ) ) ) {
      res.status( 500 ).send( { message: 'Invalid Credentials.' } );
    }

    const accessToken = sign( { id: staffMember.id }, 'access_secret', { expiresIn: 60 * 60 } );
    const refreshToken = sign( { id: staffMember.id }, 'refresh_secret', { expiresIn: 24 * 60 * 60 } );

    res.cookie( 'accessToken', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } ); // 1 day
    res.cookie( 'refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 } ); // 7 days
    res.status( 200 ).send( { message: 'login success' } );
  }

  async authStaff( req: Request, res: Response ) {
    try {
      const accessToken = req.cookies['accessToken'];
      const payload: any = verify( accessToken, 'access_secret' );

      if ( !payload ) {
        return res.status( 401 ).send( { message: 'unauthenticated.' } );
      }

      const user = await this.staffRepository.findOne( { where: { id: payload.id } } );

      if ( !user ) {
        return res.status( 401 ).send( { message: 'unauthenticated.' } );
      }

      return res.status( 200 ).send( user );
    } catch ( error ) {
      console.error( error );
      return res.status( 500 ).send( { message: error.message } );
    }
  }

  async refreshStaff( req: Request, res: Response ) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      const payload: any = verify( refreshToken, 'refresh_secret' );

      const consoleDotLog = console.log( 'user not logged in' );
      if ( !payload ) {
        return res.status( 401 ).send( { message: 'Unauthenticated.' } );
      }
      const accessToken = sign( { id: payload.id }, 'access_secret', { expiresIn: 60 * 60 } );
      res.cookie( 'accessToken', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } );
      return res.status( 200 ).send( { message: 'refresh success' } );
    } catch ( error ) {
      console.error( error );
      console.log( 'status( 500 ) user not logged in' );
      return res.status( 500 ).send( { message: 'User not Logged in.' } );

    }
  }

  async logoutStaff( res: Response ) {
    try {
      res.cookie( 'accessToken', '', { maxAge: 0 } );
      res.cookie( 'refreshToken', '', { maxAge: 0 } );
      return res.status( 200 ).send( { message: 'logged out' } );
    } catch ( error ) {
      console.error( error );
      return res.status( 500 ).send( { message: error.message } );
    }
  }

  async registerStaff( user: User, res: Response ) {
    const { firstName, lastName, dateOfBirth, phoneNumber, email, password, roles } = user;
    // Check for required fields
    if ( !firstName?.trim() || !lastName?.trim() || !dateOfBirth || !phoneNumber?.trim() || !email?.trim() || !password?.trim() ) {
      throw new BadRequestException( 'Not all required fields have been filled in.' );
    }
    try {
      // Check if a user with the given email already exists
      const existingUser = await this.staffRepository.findOne( { where: { email } } ) as User;
      if ( existingUser ) {
        throw new BadRequestException( 'There is already a user with this email.' );
      }

      // Generate a random username based on first name, last name, and a role
      const username = this.generateRandomUsername( firstName, lastName, roles );

      // Hash the password
      const hashedPassword = await bcryptjs.hash( password, 12 );

      // Save the new user
      const newUser = await this.staffRepository.save( {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        email,
        password: hashedPassword,
        roles,
        username,
      } );

      // Respond with the generated username and password
      res.status( 200 ).json( { message: 'Staff registered successfully', username, password } );
    } catch ( error ) {
      console.error( error );

      if ( error instanceof QueryFailedError ) {
        console.error( `Query failed error: ${error.message}` );
        throw new InternalServerErrorException( error.message );
      }

      throw new InternalServerErrorException( 'Internal Server Error' );
    }
  }

  async findAllStaff() {
    return await this.staffRepository.find();
  }

  async findStaffById( id: number ) {
    return await this.staffRepository.findOne( { where: { id } } );
  }

  async countStaff(): Promise<number> {
    return await this.staffRepository.count();
  }

  async updateStaffById( staffId: number, updateStaffDto: UpdateStaffDto ) {
    const staff = await this.findStaffById( staffId );

    if ( !staff ) {
      throw new NotFoundException();
    }

    Object.assign( staff, updateStaffDto );
    return await this.staffRepository.save( staff );
  }

  async deleteStaffById( staffId: number ) {
    const staff = await this.findStaffById( staffId );

    if ( !staff ) {
      throw new NotFoundException();
    }

    return await this.staffRepository.remove( staff );
  }
}
