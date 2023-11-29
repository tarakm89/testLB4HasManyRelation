import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FilesourceDataSource} from '../datasources';
import {AssocItemItemCategoryColor, AssocItemItemCategoryColorRelations, AssocItemItemCategory, Color} from '../models';
import {AssocItemItemCategoryRepository} from './assoc-item-item-category.repository';
import {ColorRepository} from './color.repository';

export class AssocItemItemCategoryColorRepository extends DefaultCrudRepository<
  AssocItemItemCategoryColor,
  typeof AssocItemItemCategoryColor.prototype.ID,
  AssocItemItemCategoryColorRelations
> {

  public readonly AsocItemItemCategoryBelongsTo: BelongsToAccessor<AssocItemItemCategory, typeof AssocItemItemCategoryColor.prototype.ID>;

  public readonly AsocItemItemCategoryColorBelongsTo: BelongsToAccessor<Color, typeof AssocItemItemCategoryColor.prototype.ID>;

  constructor(
    @inject('datasources.filesource') dataSource: FilesourceDataSource, @repository.getter('AssocItemItemCategoryRepository') protected assocItemItemCategoryRepositoryGetter: Getter<AssocItemItemCategoryRepository>, @repository.getter('ColorRepository') protected colorRepositoryGetter: Getter<ColorRepository>,
  ) {
    super(AssocItemItemCategoryColor, dataSource);
    this.AsocItemItemCategoryColorBelongsTo = this.createBelongsToAccessorFor('AsocItemItemCategoryColorBelongsTo', colorRepositoryGetter,);
    this.registerInclusionResolver('AsocItemItemCategoryColorBelongsTo', this.AsocItemItemCategoryColorBelongsTo.inclusionResolver);
    this.AsocItemItemCategoryBelongsTo = this.createBelongsToAccessorFor('AsocItemItemCategoryBelongsTo', assocItemItemCategoryRepositoryGetter,);
    this.registerInclusionResolver('AsocItemItemCategoryBelongsTo', this.AsocItemItemCategoryBelongsTo.inclusionResolver);
  }
}
