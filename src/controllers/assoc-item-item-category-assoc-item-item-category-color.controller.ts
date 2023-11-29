import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  AssocItemItemCategory,
  AssocItemItemCategoryColor,
} from '../models';
import {AssocItemItemCategoryRepository} from '../repositories';

export class AssocItemItemCategoryAssocItemItemCategoryColorController {
  constructor(
    @repository(AssocItemItemCategoryRepository) protected assocItemItemCategoryRepository: AssocItemItemCategoryRepository,
  ) { }

  @get('/assoc-item-item-categories/{id}/assoc-item-item-category-colors', {
    responses: {
      '200': {
        description: 'Array of AssocItemItemCategory has many AssocItemItemCategoryColor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AssocItemItemCategoryColor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AssocItemItemCategoryColor>,
  ): Promise<AssocItemItemCategoryColor[]> {
    return this.assocItemItemCategoryRepository.assocItemItemCategoryColors(id).find(filter);
  }

  @post('/assoc-item-item-categories/{id}/assoc-item-item-category-colors', {
    responses: {
      '200': {
        description: 'AssocItemItemCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(AssocItemItemCategoryColor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AssocItemItemCategory.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssocItemItemCategoryColor, {
            title: 'NewAssocItemItemCategoryColorInAssocItemItemCategory',
            exclude: ['ID'],
            optional: ['asoc_item_item_category_id']
          }),
        },
      },
    }) assocItemItemCategoryColor: Omit<AssocItemItemCategoryColor, 'ID'>,
  ): Promise<AssocItemItemCategoryColor> {
    return this.assocItemItemCategoryRepository.assocItemItemCategoryColors(id).create(assocItemItemCategoryColor);
  }

  @patch('/assoc-item-item-categories/{id}/assoc-item-item-category-colors', {
    responses: {
      '200': {
        description: 'AssocItemItemCategory.AssocItemItemCategoryColor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssocItemItemCategoryColor, {partial: true}),
        },
      },
    })
    assocItemItemCategoryColor: Partial<AssocItemItemCategoryColor>,
    @param.query.object('where', getWhereSchemaFor(AssocItemItemCategoryColor)) where?: Where<AssocItemItemCategoryColor>,
  ): Promise<Count> {
    return this.assocItemItemCategoryRepository.assocItemItemCategoryColors(id).patch(assocItemItemCategoryColor, where);
  }

  @del('/assoc-item-item-categories/{id}/assoc-item-item-category-colors', {
    responses: {
      '200': {
        description: 'AssocItemItemCategory.AssocItemItemCategoryColor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AssocItemItemCategoryColor)) where?: Where<AssocItemItemCategoryColor>,
  ): Promise<Count> {
    return this.assocItemItemCategoryRepository.assocItemItemCategoryColors(id).delete(where);
  }
}
