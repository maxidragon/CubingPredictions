import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DbService } from '../db/db.service';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: DbService,
          useValue: {},
        },
        {
          provide: MailerService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('isTaken', () => {
    it('should return false if email is not taken', async () => {
      const email = 'test@mailinator.com';
      jest.spyOn(authService, 'isTaken').mockImplementation(async () => false);
      expect(await authService.isTaken(email)).toBe(false);
    });

    it('should return true if email is taken', async () => {
      const email = 'test2@mailinator.com';
      jest.spyOn(authService, 'isTaken').mockImplementation(async () => true);
      expect(await authService.isTaken(email)).toBe(true);
    });

    it('should return true if email is taken by a user', async () => {
      const email = 'existinguser@mailinator.com';
      jest
        .spyOn(authService, 'isTaken')
        .mockImplementation(async (emailToCheck) => {
          if (emailToCheck === email) {
            return true;
          } else {
            return false;
          }
        });

      expect(await authService.isTaken(email)).toBe(true);
    });
  });
  describe('signup', () => {
    it('should throw an error if email is taken', async () => {
      const dto = {
        email: 'test@mailinator.com',
        password: 'test',
        username: 'test',
      };
      jest.spyOn(authService, 'isTaken').mockImplementation(async () => true);
      await expect(authService.signup(dto)).rejects.toThrowError(
        'Credentials taken!',
      );
    });
  });
});
