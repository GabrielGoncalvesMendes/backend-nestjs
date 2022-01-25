import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CustomersModule } from './customers/customers.module';
import { HttpErrorFilter } from './shared/http-error.filter';

@Module({
  imports: [CustomersModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
