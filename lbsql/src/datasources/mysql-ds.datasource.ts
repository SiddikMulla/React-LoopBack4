import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mysqlDs',
  connector: 'mysql',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',  // Update with your MySQL root password if set
  database: 'Todo',
};

@lifeCycleObserver('datasource')
export class MysqlDsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysqlDs';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysqlDs', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
