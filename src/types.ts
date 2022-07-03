export type IObject     = Record<string, unknown>;
export type IFlatObject = Record<string, string | number | boolean | null>;

export type IdType      = string;
export type RawDateType = string; // 'iso-date-string'
export type RawBool     = boolean;

export interface IBaseDto extends IObject {
  id       : IdType;
  createdAt: RawDateType;
  updatedAt: RawDateType;
}

export type IJson = string | number | boolean | null | IJson[] | {[key: string]: IJson };
