interface ComponentData {
  foo: {
    bar: string;
  };

  baz: number;
}

type PropType<T, P extends string> = string extends P
  ? unknown
  : P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PropType<T[K], R>
    : unknown
  : unknown;

interface Model<TDataDef> {
  // 根据之前说的，返回的类型最好是 unknown 而非 any
  get<T extends string>(key: T): PropType<TDataDef, T>;

  set<T extends string>(key: T, val: PropType<TDataDef, T>): void;
}

declare const model: Model<ComponentData>;

const baz = model.get('baz');

// baz 为 number 类型

const bar = model.get('foo.bar');

// bar 为 string 类型

const bar2 = model.get('foo.baz');
