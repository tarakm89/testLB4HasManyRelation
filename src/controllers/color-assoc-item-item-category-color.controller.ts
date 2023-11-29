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
  Color,
  AssocItemItemCategoryColor,
} from '../models';
import {ColorRepository} from '../repositories';

export class ColorAssocItemItemCategoryColorController {
  constructor(
    @repository(ColorRepository) protected colorRepository: ColorRepository,
  ) { }

  @get('/colors/{id}/assoc-item-item-category-colors', {
    responses: {
      '200': {
        description: 'Array of Color has many AssocItemItemCategoryColor',
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
    return this.colorRepository.assocItemColorItemCategory(id).find(filter);
  }

  @post('/colors/{id}/assoc-item-item-category-colors', {
    responses: {
      '200': {
        description: 'Color model instance',
        content: {'application/json': {schema: getModelSchemaRef(AssocItemItemCategoryColor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Color.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssocItemItemCategoryColor, {
            title: 'NewAssocItemItemCategoryColorInColor',
            exclude: ['ID'],
            optional: ['color_id']
          }),
        },
      },
    }) assocItemItemCategoryColor: Omit<AssocItemItemCategoryColor, 'ID'>,
  ): Promise<AssocItemItemCategoryColor> {
    return this.colorRepository.assocItemColorItemCategory(id).create(assocItemItemCategoryColor);
  }

  @patch('/colors/{id}/assoc-item-item-category-colors', {
    responses: {
      '200': {
        description: 'Color.AssocItemItemCategoryColor PATCH success count',
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
    return this.colorRepository.assocItemColorItemCategory(id).patch(assocItemItemCategoryColor, where);
  }

  @del('/colors/{id}/assoc-item-item-category-colors', {
    responses: {
      '200': {
        description: 'Color.AssocItemItemCategoryColor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AssocItemItemCategoryColor)) where?: Where<AssocItemItemCategoryColor>,
  ): Promise<Count> {
    return this.colorRepository.assocItemColorItemCategory(id).delete(where);
  }
}
