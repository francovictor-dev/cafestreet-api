import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeliverymanService } from './deliveryman.service';
import { Deliveryman } from './entities/deliveryman.entity';

describe('DeliverymanService', () => {
  let service: DeliverymanService;

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
        DeliverymanService,
        {
          provide: getRepositoryToken(Deliveryman),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<DeliverymanService>(DeliverymanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /* it('should accept create DTO', async () => {
    const dto = plainToInstance(CreateDeliverymanDto, {});
  }); */
});
