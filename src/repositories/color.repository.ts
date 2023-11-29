import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {FilesourceDataSource} from '../datasources';
import {Color, ColorRelations, AssocItemItemCategoryColor} from '../models';
import {AssocItemItemCategoryColorRepository} from './assoc-item-item-category-color.repository';

export class ColorRepository extends DefaultCrudRepository<
  Color,
  typeof Color.prototype.ID,
  ColorRelations
> {

  public readonly assocItemColorItemCategory: HasManyRepositoryFactory<AssocItemItemCategoryColor, typeof Color.prototype.ID>;

  constructor(
    @inject('datasources.filesource') dataSource: FilesourceDataSource, @repository.getter('AssocItemItemCategoryColorRepository') protected assocItemItemCategoryColorRepositoryGetter: Getter<AssocItemItemCategoryColorRepository>,
  ) {
    super(Color, dataSource);
    this.assocItemColorItemCategory = this.createHasManyRepositoryFactoryFor('assocItemColorItemCategory', assocItemItemCategoryColorRepositoryGetter,);
    this.registerInclusionResolver('assocItemColorItemCategory', this.assocItemColorItemCategory.inclusionResolver);
  }
}
