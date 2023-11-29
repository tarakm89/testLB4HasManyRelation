import {Entity, model, property, belongsTo} from '@loopback/repository';
import {AssocItemItemCategory} from './assoc-item-item-category.model';
import {Color} from './color.model';

@model()
export class AssocItemItemCategoryColor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;
  @belongsTo(() => AssocItemItemCategory, {name: 'AsocItemItemCategoryBelongsTo'})
  asoc_item_item_category_id: number;

  @belongsTo(() => Color, {name: 'AsocItemItemCategoryColorBelongsTo'})
  color_id: number;

  constructor(data?: Partial<AssocItemItemCategoryColor>) {
    super(data);
  }
}

export interface AssocItemItemCategoryColorRelations {
  // describe navigational properties here
}

export type AssocItemItemCategoryColorWithRelations = AssocItemItemCategoryColor & AssocItemItemCategoryColorRelations;
