import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AssocItemItemCategory} from '../models';
import {AssocItemItemCategoryRepository} from '../repositories';

export class AssocItemItemCategoryController {
  constructor(
    @repository(AssocItemItemCategoryRepository)
    public assocItemItemCategoryRepository : AssocItemItemCategoryRepository,
  ) {}

  @post('/assoc-item-item-categories')
  @response(200, {
    description: 'AssocItemItemCategory model instance',
    content: {'application/json': {schema: getModelSchemaRef(AssocItemItemCategory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssocItemItemCategory, {
            title: 'NewAssocItemItemCategory',
            exclude: ['ID'],
          }),
        },
      },
    })
    assocItemItemCategory: Omit<AssocItemItemCategory, 'ID'>,
  ): Promise<AssocItemItemCategory> {
    return this.assocItemItemCategoryRepository.create(assocItemItemCategory);
  }

  @get('/assoc-item-item-categories/count')
  @response(200, {
    description: 'AssocItemItemCategory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AssocItemItemCategory) where?: Where<AssocItemItemCategory>,
  ): Promise<Count> {
    return this.assocItemItemCategoryRepository.count(where);
  }

  @get('/assoc-item-item-categories')
  @response(200, {
    description: 'Array of AssocItemItemCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AssocItemItemCategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AssocItemItemCategory) filter?: Filter<AssocItemItemCategory>,
  ): Promise<AssocItemItemCategory[]> {
    return this.assocItemItemCategoryRepository.find(filter);
  }

  @patch('/assoc-item-item-categories')
  @response(200, {
    description: 'AssocItemItemCategory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssocItemItemCategory, {partial: true}),
        },
      },
    })
    assocItemItemCategory: AssocItemItemCategory,
    @param.where(AssocItemItemCategory) where?: Where<AssocItemItemCategory>,
  ): Promise<Count> {
    return this.assocItemItemCategoryRepository.updateAll(assocItemItemCategory, where);
  }

  @get('/assoc-item-item-categories/{id}')
  @response(200, {
    description: 'AssocItemItemCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AssocItemItemCategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AssocItemItemCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<AssocItemItemCategory>
  ): Promise<AssocItemItemCategory> {
    return this.assocItemItemCategoryRepository.findById(id, filter);
  }

  @patch('/assoc-item-item-categories/{id}')
  @response(204, {
    description: 'AssocItemItemCategory PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssocItemItemCategory, {partial: true}),
        },
      },
    })
    assocItemItemCategory: AssocItemItemCategory,
  ): Promise<void> {
    await this.assocItemItemCategoryRepository.updateById(id, assocItemItemCategory);
  }

  @put('/assoc-item-item-categories/{id}')
  @response(204, {
    description: 'AssocItemItemCategory PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() assocItemItemCategory: AssocItemItemCategory,
  ): Promise<void> {
    await this.assocItemItemCategoryRepository.replaceById(id, assocItemItemCategory);
  }

  @del('/assoc-item-item-categories/{id}')
  @response(204, {
    description: 'AssocItemItemCategory DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.assocItemItemCategoryRepository.deleteById(id);
  }
}
