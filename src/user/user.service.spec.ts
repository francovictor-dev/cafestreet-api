import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;
  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const data: CreateUserDto = {
      email: 'test@email.com',
      password: 'password123',
    };
    mockRepo.save.mockResolvedValueOnce(data);
    const result = await service.create(data);

    expect(result.email).toEqual(data.email);
    expect(result.password).toEqual(data.password);
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('should find all users', async () => {
    const data: User[] = [
      {
        id: 1,
        email: 'test@email.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: 'test2@email.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockRepo.find.mockResolvedValue(data);
    //@ts-ignore
    const result = await service.findAll();
    expect(result).toEqual(data);
    expect(result.length).toBe(2);
    expect(mockRepo.find).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const data: User = {
      id: 1,
      email: 'test@email.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockRepo.findOne.mockResolvedValue(data);
    const result = await service.findOne(1);
    expect(result).toEqual(data);
    expect(result!.id).toBe(1);
    expect(mockRepo.findOne).toHaveBeenCalled();
  });

  it('should update user', async () => {
    const data: User = {
      id: 1,
      email: 'test@email.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockRepo.update.mockResolvedValue(data);
    const result = await service.update(1, { email: 'test2@gmail.com' });
    expect(result).toEqual(data);
    expect(mockRepo.update).toHaveBeenCalled();
  });

  it('should delete user', async () => {
    const data: User = {
      id: 1,
      email: 'test@email.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockRepo.delete.mockResolvedValue({ affected: 1, raw: data });
    const result = await service.delete(1);

    expect(result.raw.id).toEqual(1);
    expect(mockRepo.delete).toHaveBeenCalled();
  });

  it('should accept create user DTO', async () => {
    const dto = plainToInstance(CreateUserDto, {
      password: 'João123',
      email: 'joao@mail.com',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should handle error on email user DTO', async () => {
    const dto = plainToInstance(CreateUserDto, {
      password: 'João123',
      email: 'joao.com',
    });
    const errors = await validate(dto);

    expect(errors.some((e) => e.property === 'email')).toBe(true);
  });
});
