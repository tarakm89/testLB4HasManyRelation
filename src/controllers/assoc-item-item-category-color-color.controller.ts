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
  Color,
} from '../models';
import {AssocItemItemCategoryColorRepository} from '../repositories';

export class AssocItemItemCategoryColorColorController {
  constructor(
    @repository(AssocItemItemCategoryColorRepository)
    public assocItemItemCategoryColorRepository: AssocItemItemCategoryColorRepository,
  ) { }

  @get('/assoc-item-item-category-colors/{id}/color', {
    responses: {
      '200': {
        description: 'Color belonging to AssocItemItemCategoryColor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Color),
          },
        },
      },
    },
  })
  async getColor(
    @param.path.number('id') id: typeof AssocItemItemCategoryColor.prototype.ID,
  ): Promise<Color> {
    return this.assocItemItemCategoryColorRepository.AsocItemItemCategoryColorBelongsTo(id);
  }
}
