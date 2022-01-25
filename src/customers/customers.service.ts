import {
  BadRequestException,
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { getRedis, redisClient, setRedis } from '../config/redisConfig';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  async create(createCustomerDto: CreateCustomerDto) {
    const id = uuidv4();
    const customerData = {
      id,
      ...createCustomerDto,
    };

    if (redisClient.status === 'reconnecting') {
      throw new ServiceUnavailableException({
        status: HttpStatus.BAD_GATEWAY,
        error: 'Cache indisponível',
      });
    }

    const customSave = await setRedis(
      `customer:${id}`,
      JSON.stringify(customerData),
    );

    if (customSave !== 'OK') {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Request inválida',
      });
    }

    return customerData;
  }

  async findOne(id: string) {
    const validateId = validate(id);
    if (!validateId) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Request inválida',
      });
    }

    if (redisClient.status === 'reconnecting') {
      throw new ServiceUnavailableException({
        status: HttpStatus.BAD_GATEWAY,
        error: 'Cache indisponível',
      });
    }

    const customerRedis = await getRedis(`customer:${id}`);

    const customer = JSON.parse(customerRedis);

    if (!customer) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Request inválida',
      });
    }

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const validateId = validate(id);
    if (!validateId) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Request inválida',
      });
    }

    if (redisClient.status === 'reconnecting') {
      throw new ServiceUnavailableException({
        status: HttpStatus.BAD_GATEWAY,
        error: 'Cache indisponível',
      });
    }

    const customerRedis = await getRedis(`customer:${id}`);
    const customer = JSON.parse(customerRedis);

    if (!customer) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Request inválida',
      });
    }

    const customerData = {
      ...customer,
      ...updateCustomerDto,
    };

    const customSave = await setRedis(
      `customer:${id}`,
      JSON.stringify(customerData),
    );

    if (customSave !== 'OK') {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Request inválida',
      });
    }

    return customerData;
  }
}
