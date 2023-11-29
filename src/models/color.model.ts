import {Entity, model, property, hasMany} from '@loopback/repository';
import {AssocItemItemCategoryColor} from './assoc-item-item-category-color.model';

@model()
export class Color extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'string',
    required: true,
  })
  color_name: string;

  @hasMany(() => AssocItemItemCategoryColor, {keyTo: 'color_id'})
  assocItemColorItemCategory: AssocItemItemCategoryColor[];

  constructor(data?: Partial<Color>) {
    super(data);
  }
}

export interface ColorRelations {
  // describe navigational properties here
}

export type ColorWithRelations = Color & ColorRelations;
