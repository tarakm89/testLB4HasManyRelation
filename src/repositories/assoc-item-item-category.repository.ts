import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FilesourceDataSource} from '../datasources';
import {AssocItemItemCategory, AssocItemItemCategoryRelations, Item, ItemCategory} from '../models';
import {ItemRepository} from './item.repository';
import {ItemCategoryRepository} from './item-category.repository';

export class AssocItemItemCategoryRepository extends DefaultCrudRepository<
  AssocItemItemCategory,
  typeof AssocItemItemCategory.prototype.ID,
  AssocItemItemCategoryRelations
> {

  public readonly ItemIDAssoc: BelongsToAccessor<Item, typeof AssocItemItemCategory.prototype.ID>;

  public readonly ItemCategoryAssoc: BelongsToAccessor<ItemCategory, typeof AssocItemItemCategory.prototype.ID>;

  constructor(
    @inject('datasources.filesource') dataSource: FilesourceDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>, @repository.getter('ItemCategoryRepository') protected itemCategoryRepositoryGetter: Getter<ItemCategoryRepository>,
  ) {
    super(AssocItemItemCategory, dataSource);
    this.ItemCategoryAssoc = this.createBelongsToAccessorFor('ItemCategoryAssoc', itemCategoryRepositoryGetter,);
    this.registerInclusionResolver('ItemCategoryAssoc', this.ItemCategoryAssoc.inclusionResolver);
    this.ItemIDAssoc = this.createBelongsToAccessorFor('ItemIDAssoc', itemRepositoryGetter,);
    this.registerInclusionResolver('ItemIDAssoc', this.ItemIDAssoc.inclusionResolver);
  }
}
