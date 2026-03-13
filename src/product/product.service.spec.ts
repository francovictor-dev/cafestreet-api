import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { productCreateMock } from '../../test/mocks/product.mock';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

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
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should accept create user DTO', async () => {
    const dto = plainToInstance(CreateProductDto, productCreateMock);

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should create a product', async () => {
    const data = productCreateMock;
    mockRepo.save.mockResolvedValueOnce(data);
    const result = await service.create(data);

    expect(result.name).toEqual(data.name);
    expect(result.amount).toEqual(data.amount);
    expect(mockRepo.save).toHaveBeenCalled();
  });
});
