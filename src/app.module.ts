import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource, initializeTransactionalContext } from 'typeorm-transactional';

import { ControllerModule } from './infra/controller/Controller.module';
import config from './infra/database/config/config';

@Module({
  imports: [TypeOrmModule.forRoot(config), ControllerModule],
  controllers: [],
  providers: []
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  onModuleInit() {
    initializeTransactionalContext();
    addTransactionalDataSource(this.dataSource);
  }
}
