import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {FilesourceDataSource} from '../datasources';
import {User, UserRelations, Item} from '../models';
import {ItemRepository} from './item.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.ID,
  UserRelations
> {

  public readonly items: HasManyRepositoryFactory<Item, typeof User.prototype.ID>;

  constructor(
    @inject('datasources.filesource') dataSource: FilesourceDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(User, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', itemRepositoryGetter,);
  }
}
