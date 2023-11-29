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
Color,
} from '../models';
import {AssocItemItemCategoryRepository} from '../repositories';

export class AssocItemItemCategoryColorController {
  constructor(
    @repository(AssocItemItemCategoryRepository) protected assocItemItemCategoryRepository: AssocItemItemCategoryRepository,
  ) { }

  @get('/assoc-item-item-categories/{id}/colors', {
    responses: {
      '200': {
        description: 'Array of AssocItemItemCategory has many Color through AssocItemItemCategoryColor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Color)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Color>,
  ): Promise<Color[]> {
    return this.assocItemItemCategoryRepository.colors(id).find(filter);
  }

  @post('/assoc-item-item-categories/{id}/colors', {
    responses: {
      '200': {
        description: 'create a Color model instance',
        content: {'application/json': {schema: getModelSchemaRef(Color)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AssocItemItemCategory.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Color, {
            title: 'NewColorInAssocItemItemCategory',
            exclude: ['ID'],
          }),
        },
      },
    }) color: Omit<Color, 'ID'>,
  ): Promise<Color> {
    return this.assocItemItemCategoryRepository.colors(id).create(color);
  }

  @patch('/assoc-item-item-categories/{id}/colors', {
    responses: {
      '200': {
        description: 'AssocItemItemCategory.Color PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Color, {partial: true}),
        },
      },
    })
    color: Partial<Color>,
    @param.query.object('where', getWhereSchemaFor(Color)) where?: Where<Color>,
  ): Promise<Count> {
    return this.assocItemItemCategoryRepository.colors(id).patch(color, where);
  }

  @del('/assoc-item-item-categories/{id}/colors', {
    responses: {
      '200': {
        description: 'AssocItemItemCategory.Color DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Color)) where?: Where<Color>,
  ): Promise<Count> {
    return this.assocItemItemCategoryRepository.colors(id).delete(where);
  }
}
