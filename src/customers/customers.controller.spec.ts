import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create an customer', async () => {
    const customerData = {
      document: 1,
      name: 'Name 1',
    };

    const customerCreated = await controller.create(customerData);

    expect(customerData.document).toStrictEqual(customerCreated.document);
    expect(customerData.name).toStrictEqual(customerCreated.name);
  });

  it('should be updated an customer', async () => {
    const customerDataCreated = {
      document: 1132,
      name: 'Another Name',
    };

    const customerCreated = await controller.create(customerDataCreated);
    const updatedCustomer = await controller.update(customerCreated.id, {
      id: customerCreated.id,
      document: 123,
      name: 'Changed Name',
    });

    expect(123).toStrictEqual(updatedCustomer.document);
    expect('Changed Name').toStrictEqual(updatedCustomer.name);
  });

  it('should be get an customer', async () => {
    const customerDataCreated = {
      document: 55365,
      name: 'Getter Name',
    };

    const customerCreated = await controller.create(customerDataCreated);
    const updatedCustomer = await controller.findOne(customerCreated.id);

    expect(customerCreated.id).toStrictEqual(updatedCustomer.id);
    expect(customerCreated.document).toStrictEqual(updatedCustomer.document);
    expect(customerCreated.name).toStrictEqual(updatedCustomer.name);
  });
});
