import { Join, NestedObjectLeaves, Prev } from '@common/AppTypes';
import * as en from './JSON/en.json';

type PluralScopeObj<T1, T2 = '', D extends number = 10> = [D] extends [never]
  ? never
  : T1 extends object
  ? {
      [K in keyof T1]-?: T1[K] extends object
        ? PluralScopeObj<T1[K], Join<T2, K>, Prev[D]>
        : K extends 'one' | 'zero' | 'other'
        ? T2
        : never;
    }[keyof T1]
  : '';

export type Scope = NestedObjectLeaves<typeof en>;
export type PluralScope = PluralScopeObj<typeof en>;
