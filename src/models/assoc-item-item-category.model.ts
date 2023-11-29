import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Item} from './item.model';
import {ItemCategory} from './item-category.model';
import {AssocItemItemCategoryColor} from './assoc-item-item-category-color.model';
import {Color} from './color.model';

@model({settings: {strict: false}})
export class AssocItemItemCategory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;
  @belongsTo(() => Item, {name: 'ItemIDAssoc'})
  ItemID: number;

  @belongsTo(() => ItemCategory, {name: 'ItemCategoryAssoc'})
  ItemCategoryID: number;

  @hasMany(() => AssocItemItemCategoryColor, {keyTo: 'asoc_item_item_category_id'})
  assocItemItemCategoryColors: AssocItemItemCategoryColor[];

  @hasMany(() => Color, {through: {model: () => AssocItemItemCategoryColor, keyFrom: 'asoc_item_item_category_id', keyTo: 'color_id'}})
  AsocItemToColor: Color[];

  @hasMany(() => Color, {through: {model: () => AssocItemItemCategoryColor, keyFrom: 'asoc_item_item_category_id', keyTo: 'color_id'}})
  colors: Color[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AssocItemItemCategory>) {
    super(data);
  }
}

export interface AssocItemItemCategoryRelations {
  // describe navigational properties here
}

export type AssocItemItemCategoryWithRelations = AssocItemItemCategory & AssocItemItemCategoryRelations;
