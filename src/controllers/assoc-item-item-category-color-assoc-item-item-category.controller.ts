import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AssocItemItemCategoryColor,
  AssocItemItemCategory,
} from '../models';
import {AssocItemItemCategoryColorRepository} from '../repositories';

export class AssocItemItemCategoryColorAssocItemItemCategoryController {
  constructor(
    @repository(AssocItemItemCategoryColorRepository)
    public assocItemItemCategoryColorRepository: AssocItemItemCategoryColorRepository,
  ) { }

  @get('/assoc-item-item-category-colors/{id}/assoc-item-item-category', {
    responses: {
      '200': {
        description: 'AssocItemItemCategory belonging to AssocItemItemCategoryColor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AssocItemItemCategory),
          },
        },
      },
    },
  })
  async getAssocItemItemCategory(
    @param.path.number('id') id: typeof AssocItemItemCategoryColor.prototype.ID,
  ): Promise<AssocItemItemCategory> {
    return this.assocItemItemCategoryColorRepository.AsocItemItemCategoryBelongsTo(id);
  }
}
