import { DataSource, DataSourceOptions } from 'typeorm';

import config from './config';

const postgresDataSource = new DataSource(config as DataSourceOptions);

export default postgresDataSource;
