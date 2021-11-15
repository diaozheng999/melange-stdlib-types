declare module "@nasi/melange-stdlib" {
  export interface OCamlPolyVariant<TName, TValue> {
    NAME: TName;
    VAL: TValue;
  }

  export type ValueOfOCamlPolyVariant<T> = T extends OCamlPolyVariant<
    unknown,
    infer TValue
  >
    ? TValue
    : never;

  export interface OCamlVariant<TName, T> {
    TAG: TName;
    _0: T;
  }

  export interface OCamlVariant2<TName, T, T1> extends OCamlVariant<TName, T> {
    _1: T1;
  }

  export interface OCamlVariant3<TName, T, T1, T2>
    extends OCamlVariant2<TName, T, T1> {
    _2: T2;
  }

  export type Untag<T> = Omit<T, "TAG">;

  export type OCamlList<T> = 0 | { hd: T; tl: OCamlList<T> };

  export interface OCamlError<ID extends string, TPayload> {
    RE_EXN_ID: ID;
    _1: TPayload;
    Error: Error;
  }

  export type OCamlOptionSome<T> = T extends undefined | void
    ? { BS_PRIVATE_NESTED_SOME_NONE: number }
    : T;

  export type OCamlOption<T> = void | OCamlOptionSome<T>;

  export type OCamlLazy<T> =
    | { LAZY_DONE: false; VAL(): T }
    | { LAZY_DONE: true; VAL: T };

  export interface OCamlRef<T> {
    contents: T;
  }

  const OCamlOpaque: unique symbol;

  export type opaque<T, TWitness> = T & { [OCamlOpaque]: TWitness };

  export type int = number & { [OCamlOpaque]: "int" };

  export type char = number & { [OCamlOpaque]: "char" };

  export type int64 = [number, number] & { [OCamlOpaque]: "int64" };

  export type CurriedFunction<A extends unknown[], B> = A extends []
    ? () => B
    : A extends [infer Arg]
    ? (arg: Arg) => B
    : A extends [infer Arg1, ...infer Rest]
    ? ((arg: Arg1) => CurriedFunction<Rest, B>) | ((...args: A) => B)
    : never;
}

declare module "@nasi/melange-stdlib/lib/es6/array.js" {
  import type {
    Curried,
    Uncurry1,
    Uncurry2,
  } from "@nasi/melange-stdlib/lib/es6/curry.js";
  import type { CurriedFunction, int, OCamlList } from "@nasi/melange-stdlib";
  import type { Seq } from "@nasi/melange-stdlib/lib/es6/seq.js";
  export function make_float(len: number): number[];
  export function init<F extends Curried<[any]>>(
    len: number,
    f: F
  ): Array<ReturnType<Uncurry1<F>>>;
  export function make_matrix<T>(sx: number, sy: number, init: T): T[][];
  export function create_matrix<T>(sx: number, sy: number, init: T): T[][];
  export function copy<T>(a: T[]): T[];
  export function concat<T>(a: OCamlList<T[]>): T[];
  export function append<T>(a1: T[], a2: T[]): T[];
  export function sub<T>(a: T[], ofs: number, len: number): T[];
  export function fill<T>(a: T[], ofs: number, len: number, v: T): void;
  export function blit<T>(
    a1: T[],
    ofs1: number,
    a2: T[],
    ofs2: number,
    len: number
  ): void;
  export function iter<T>(f: CurriedFunction<[T], void>, a: T[]): void;
  export function iter2<T, U>(
    f: CurriedFunction<[T, U], void>,
    a: T[],
    b: U[]
  ): void;
  export function map<T, F extends Curried<[T]>>(
    f: F,
    a: T[]
  ): Array<ReturnType<Uncurry1<F>>>;
  export function map2<T, U, F extends Curried<[T, U]>>(
    f: F,
    a: T[],
    b: U[]
  ): Array<ReturnType<Uncurry2<F>>>;
  export function iteri<T>(f: CurriedFunction<[T], void>, a: T[]): void;
  export function mapi<T, F extends Curried<[number, T]>>(
    f: F,
    a: T
  ): Array<ReturnType<Uncurry2<F>>>;
  export function to_list<T>(f: T[]): OCamlList<T>;
  export function of_list<T>(f: OCamlList<T>): T[];
  export function fold_left<T, U>(
    f: CurriedFunction<[U, T], U>,
    x: U,
    a: T[]
  ): U;
  export function fold_right<T, U>(
    f: CurriedFunction<[T, U], U>,
    a: T[],
    x: U
  ): U;
  export function exists<T>(p: CurriedFunction<[T], boolean>, a: T[]): boolean;
  export function for_all<T>(p: CurriedFunction<[T], boolean>, a: T[]): boolean;
  export function for_all2<T, U>(
    p: CurriedFunction<[T, U], boolean>,
    a: T[],
    b: U[]
  ): boolean;
  export function exists2<T, U>(
    p: CurriedFunction<[T, U], boolean>,
    a: T[],
    b: U[]
  ): boolean;
  export function mem<T>(x: T, a: T[]): boolean;
  export function memq<T>(x: T, a: T[]): boolean;

  export const Bottom: "Array.Bottom/0";

  export function sort<T>(cmp: CurriedFunction<[T, T], number>, a: T[]): void;
  export function stable_sort<T>(
    cmp: CurriedFunction<[T, T], number>,
    a: T[]
  ): void;
  export function fast_sort<T>(
    cmp: CurriedFunction<[T, T], number>,
    a: T[]
  ): void;
  export function to_seq<T>(a: T[]): Seq<T>;
  export function to_seqi<T>(a: T[]): Seq<[int, T]>;
  export function of_seq<T>(a: Seq<T>): T[];
}

declare module "@nasi/melange-stdlib/lib/es6/arrayLabels.js" {
  import {
    make_float,
    init,
    make_matrix,
    create_matrix,
    append,
    concat,
    sub,
    copy,
    fill,
    blit,
    to_list,
    of_list,
    iter,
    iteri,
    map,
    mapi,
    fold_left,
    fold_right,
    iter2,
    map2,
    for_all,
    exists,
    for_all2,
    exists2,
    mem,
    memq,
    sort,
    stable_sort,
    fast_sort,
    to_seq,
    to_seqi,
    of_seq,
  } from "@nasi/melange-stdlib/lib/es6/array.js";
  export {
    make_float,
    init,
    make_matrix,
    create_matrix,
    append,
    concat,
    sub,
    copy,
    fill,
    blit,
    to_list,
    of_list,
    iter,
    iteri,
    map,
    mapi,
    fold_left,
    fold_right,
    iter2,
    map2,
    for_all,
    exists,
    for_all2,
    exists2,
    mem,
    memq,
    sort,
    stable_sort,
    fast_sort,
    to_seq,
    to_seqi,
    of_seq,
  };
}

declare module "@nasi/melange-stdlib/lib/es6/atomic.js" {
  import {
    make,
    get,
    set,
    exchange,
    compare_and_set,
    fetch_and_add,
    incr,
    decr,
  } from "@nasi/melange-stdlib/lib/es6/camlinternalAtomic.js";
  export {
    make,
    get,
    set,
    exchange,
    compare_and_set,
    fetch_and_add,
    incr,
    decr,
  };
}

declare module "@nasi/melange-stdlib/lib/es6/belt_Array.js" {
  import type { CurriedFunction, OCamlOption, int } from "@nasi/melange-stdlib";
  import type {
    Uncurry1,
    Uncurry2,
    Curried,
  } from "@nasi/melange-stdlib/lib/es6/curry.js";
  export function get<T>(arr: Array<T>, i: number): OCamlOption<T>;
  export function getExn<T>(arr: Array<T>, i: number): T;
  export function set<T>(arr: Array<T>, i: number, value: T): boolean;
  export function setExn<T>(arr: Array<T>, i: number, value: T): void;
  export function shuffleInPlace<T>(arr: Array<T>): void;
  export function shuffle<T>(arr: Array<T>): Array<T>;
  export function reverseInPlace<T>(arr: Array<T>): void;
  export function reverse<T>(arr: Array<T>): Array<T>;
  export function make<T>(l: number, f: T): Array<T>;
  export function makeByU<T>(l: number, f: (i: number) => T): Array<T>;
  export function makeBy<F extends Curried<[number]>>(
    l: number,
    f: F
  ): Array<ReturnType<Uncurry1<F>>>;
  export function makeByAndShuffleU<T>(
    l: number,
    f: (i: number) => T
  ): Array<T>;
  export function makeByAndShuffle<F extends Curried<[number]>>(
    l: number,
    f: F
  ): Array<ReturnType<Uncurry1<F>>>;
  export function range(start: number, finish: number): Array<number>;
  export function rangeBy(
    start: number,
    finish: number,
    step: number
  ): Array<number>;
  export function zip<T, U>(xs: Array<T>, ys: Array<U>): Array<[T, U]>;
  export function zipByU<T, U, V>(
    xs: Array<T>,
    ys: Array<U>,
    f: (x: T, y: U) => V
  ): Array<V>;
  export function zipBy<T, U, F extends Curried<[T, U]>>(
    xs: Array<T>,
    ys: Array<U>,
    f: F
  ): Array<Uncurry2<F>>;
  export function concat<T>(a1: Array<T>, a2: Array<T>): Array<T>;
  export function concatMany<T>(arrs: T[][]): T[];
  export function slice<T>(a: T[], offset: number, len: number): T[];
  export function sliceToEnd<T>(a: T[], offset: number): T[];
  export function fill<T>(a: T[], offset: number, len: number, v: T): void;
  export function blitUnsafe<T>(
    a1: T[],
    srcofs1: number,
    a2: T[],
    srcofs2: number,
    blitLength: number
  ): void;
  export function blit<T>(
    a1: T[],
    ofs1: number,
    a2: T[],
    ofs2: number,
    len: number
  ): void;
  export function forEachU<T>(a: T[], f: (arg: T) => void): void;
  export function forEach<T>(a: T[], f: CurriedFunction<[T], void>): void;
  export function mapU<T, U>(a: T[], f: (arg: T) => U): U[];
  export function map<T, F extends Curried<[T]>>(
    a: T[],
    f: F
  ): Array<ReturnType<Uncurry1<F>>>;
  export function getByU<T>(a: T[], p: (value: T) => boolean): OCamlOption<T>;
  export function getBy<T, F extends CurriedFunction<[T], boolean>>(
    a: T[],
    p: F
  ): OCamlOption<T>;
  export function getIndexByU<T>(
    a: T[],
    p: (value: T) => boolean
  ): OCamlOption<int>;
  export function getIndexBy<T, F extends CurriedFunction<[T], number>>(
    a: T[],
    p: F
  ): OCamlOption<int>;
  export function keepU<T>(a: T[], p: (value: T) => boolean): T[];
  export function keep<T, F extends CurriedFunction<[T], number>>(
    a: T[],
    p: F
  ): T[];
  export function keepWithIndexU<T>(
    a: T[],
    p: (value: T, i: number) => boolean
  ): T[];
  export function keepWithIndex<
    T,
    F extends CurriedFunction<[T, number], boolean>
  >(a: T[], p: F): T[];
  export function keepMapU<T, U>(a: T[], f: (arg: T) => OCamlOption<U>): U[];
  export function keepMap<T, U>(
    a: T[],
    f: CurriedFunction<[T], OCamlOption<U>>
  ): U[];
  export function forEachWithIndexU<T>(
    a: T[],
    f: (i: number, v: T) => void
  ): void;
  export function forEachWithIndex<T>(
    a: T[],
    f: CurriedFunction<[number, T], void>
  ): void;
  export function mapWithIndexU<T, U>(a: T[], f: (i: number, v: T) => U): U[];
  export function mapWithIndex<T, F extends Curried<[number, T]>>(
    a: T[],
    f: F
  ): Array<ReturnType<Uncurry2<F>>>;
  export function reduceU<T, U>(a: T[], x: U, f: (acc: U, v: T) => U): U;
  export function reduce<T, U>(a: T[], x: U, f: CurriedFunction<[U, T], U>): U;
  export function reduceReverseU<T, U>(a: T[], x: U, f: (acc: U, v: T) => U): U;
  export function reduceReverse<T, U>(
    a: T[],
    x: U,
    f: CurriedFunction<[U, T], U>
  ): U;
  export function reduceReverse2U<T, U, V>(
    a: T[],
    b: U[],
    x: V,
    f: (acc: V, a: T, b: U) => V
  ): V;
  export function reduceReverse2<T, U, V>(
    a: T[],
    b: U[],
    x: V,
    f: CurriedFunction<[V, T, U], V>
  ): V;
  export function reduceWithIndexU<T, U>(
    a: T[],
    x: U,
    f: (acc: U, v: T, idx: number) => U
  ): U;
  export function reduceWithIndex<T, U>(
    a: T[],
    x: U,
    f: CurriedFunction<[U, T, number], U>
  ): U;
  export function everyU<T>(a: T[], b: (v: T) => boolean): boolean;
  export function every<T>(a: T[], b: CurriedFunction<[T], boolean>): boolean;
  export function someU<T>(a: T[], b: (v: T) => boolean): boolean;
  export function some<T>(a: T[], b: CurriedFunction<[T], boolean>): boolean;
  export function every2U<T, U>(
    a: T[],
    b: U[],
    p: (a: T, b: U) => boolean
  ): boolean;
  export function every2<T, U>(
    a: T[],
    b: U[],
    p: CurriedFunction<[T, U], boolean>
  ): boolean;
  export function some2U<T, U>(
    a: T[],
    b: U[],
    p: (a: T, b: U) => boolean
  ): boolean;
  export function some2<T, U>(
    a: T[],
    b: U[],
    p: CurriedFunction<[T, U], boolean>
  ): boolean;
  export function eqU<T>(a: T[], b: T[], p: (a: T, b: T) => boolean): boolean;
  export function eq<T>(
    a: T[],
    b: T[],
    p: CurriedFunction<[T, T], boolean>
  ): boolean;
  export function cmpU<T>(
    a: T[],
    b: T[],
    p: (a: T, b: T) => 0 | 1 | -1
  ): 0 | 1 | -1;
  export function cmp<T>(
    a: T[],
    b: T[],
    p: CurriedFunction<[T, T], 0 | 1 | -1>
  ): 0 | 1 | -1;
  export function partitionU<T>(
    a: T[],
    keep: (value: T) => boolean
  ): [T[], T[]];
  export function partition<T>(
    a: T[],
    keep: CurriedFunction<[T], boolean>
  ): [T[], T[]];
  export function unzip<T, U>(a: Array<[T, U]>): [T[], U[]];
  export function joinWithU<T>(
    a: T[],
    sep: string,
    toString: (value: T) => string
  ): string;
  export function joinWith<T>(
    a: T[],
    sep: string,
    toString: CurriedFunction<[T], string>
  ): string;
}

declare module "@nasi/melange-stdlib/lib/es6/belt_Float.js" {
  export function fromString(i: string): number;
}

declare module "@nasi/melange-stdlib/lib/es6/belt_HashMap.js" {
  import { Buckets } from "@nasi/melange-stdlib/lib/es6/belt_internalBucketsType.js";

  export interface HashMap<TKey, TValue, TId> extends Buckets<TKey, TValue> {}
}

declare module "@nasi/melange-stdlib/lib/es6/belt_internalBucketsType.js" {
  export interface Buckets<K, V> {
    size: number;
    buckets: Array<V>;
    eq(a: V, b: V): boolean;
    hash(value: K): number;
  }

  export function make<K, V>(
    hash: (value: K) => number,
    eq: (a: V, b: V) => boolean,
    hintSize: number
  ): Buckets<K, V>;

  export function isEmpty<K, V>(buckets: Buckets<K, V>): boolean;
  export function clear<K, V>(buckets: Buckets<K, V>): void;
}

declare module "@nasi/melange-stdlib/lib/es6/caml_array.js" {
  import type { OCamlList } from "@nasi/melange-stdlib";
  export function dup<T>(array: T[]): T[];
  export function sub<T>(x: T[], offset: number, len: number): T[];
  export function concat<T>(l: OCamlList<T[]>): T[];
  export function set<T>(xs: T[], index: number, newval: T): void;
  export function get<T>(xs: T[], index: number): void;
  export function make<T>(len: number, init: T): T[];
  export function make_float(len: number): number[];
  export function blit<T>(
    a1: T[],
    i1: number,
    a2: T[],
    i2: number,
    len: number
  ): void;
}

declare module "@nasi/melange-stdlib/lib/es6/caml_int64.js" {
  import type { int, int64 } from "@nasi/melange-stdlib";
  export function mk(lo: number, hi: number): int64;
  export function succ(n: int64): int64;
  export const min_int: int64;
  export const max_int: int64;
  export const one: int64;
  export const zero: int64;
  export const neg_one: int64;
  export function of_int32(lo: number): int64;
  export function to_int32(n: int64): int;
  export function add(a: int64, b: int64): int64;
  export function neg(n: int64): int64;
  export function sub(a: int64, b: int64): int64;
  export function lsl_(a: int64, b: number): int64;
  export function lsr_(a: int64, b: number): int64;
  export function asr_(a: int64, b: number): int64;
  export function is_zero(a: int64): boolean;
  export function mul(a: int64, b: int64): int64;
  export function xor(a: int64, b: int64): int64;
  export function or_(a: int64, b: int64): int64;
  export function and_(a: int64, b: int64): int64;
  export function equal_null(a: int64, b: int64 | null): int64;
  export function equal_undefined(a: int64, b?: int64 | undefined): int64;
  export function equal_nullable(a: int64, b?: int64 | null | undefined): int64;
  export function to_float(a: int64): number;
  export function of_float(a: number): int64;
  export function div(a: int64, b: int64): int64;
  export function mod_(a: int64, b: int64): int64;
  export function compare(a: int64, b: int64): 0 | 1 | -1;
  export function float_of_bits(x: int64): number;
  export function bits_of_float(x: number): int64;
  export function div_mod(a: int64, b: int64): [int64, int64];
  export function to_hex(a: int64): string;
  export function discard_sign(a: int64): int64;
  export function to_string(a: int64): int64;
}

declare module "@nasi/melange-stdlib/lib/es6/caml_option.js" {
  import type {
    OCamlOption,
    OCamlPolyVariant,
    ValueOfOCamlPolyVariant,
  } from "@nasi/melange-stdlib";

  export function nullable_to_opt<T>(x: T | null | undefined): OCamlOption<T>;

  export function undefined_to_opt<T>(x: T | undefined): OCamlOption<T>;

  export function null_to_opt<T>(x: T | null): OCamlOption<T>;

  export function valFromOption<T extends undefined | void>(
    x: OCamlOption<undefined>
  ): OCamlOption<undefined>;
  export function valFromOption<T>(x: OCamlOption<T>): T | undefined;

  export function isNested<T>(x: OCamlOption<T>): boolean;

  export function some<T>(x: T): OCamlOption<T>;

  export function option_get<T>(value: OCamlOption<T>): T | undefined;

  export function option_unwrap<T extends OCamlPolyVariant<unknown, unknown>>(
    value: OCamlOption<T>
  ): ValueOfOCamlPolyVariant<T>;
}

declare module "@nasi/melange-stdlib/lib/es6/caml_string.js" {
  import type { char } from "@nasi/melange-stdlib";

  export function get(s: string, i: number): char;

  export function make(n: number, ch: char): string;
}

declare module "@nasi/melange-stdlib/lib/es6/camlinternalAtomic.js" {
  import type { int } from "@nasi/melange-stdlib";
  export interface Atomic<T> {
    v: T;
  }
  export function make<T>(v: T): Atomic<T>;
  export function get<T>(r: Atomic<T>): T;
  export function set<T>(r: Atomic<T>, v: T): void;
  export function exchange<T>(r: Atomic<T>, v: T): T;
  export function compare_and_set<T>(r: Atomic<T>, seen: T, v: T): boolean;
  export function fetch_and_add(r: Atomic<int>, n: int): int;
  export function incr(r: Atomic<int>): void;
  export function decr(r: Atomic<int>): void;
}

declare module "@nasi/melange-stdlib/lib/es6/camlinternalFormatBasics.js" {
  import type {
    OCamlVariant,
    OCamlVariant2,
    OCamlOption,
    int,
    Untag,
  } from "@nasi/melange-stdlib";
  export const enum Padty {
    Left,
    Right,
    Zeros,
  }

  export const enum IntConv {
    Int_d,
    Int_pd,
    Int_sd,
    Int_i,
    Int_pi,
    Int_si,
    Int_x,
    Int_Cx,
    Int_X,
    Int_CX,
    Int_o,
    Int_Co,
    Int_u,
    Int_Cd,
    Int_Ci,
    Int_Cu,
  }

  export const enum FloatFlagConv {
    Float_flag_,
    Float_flag_p,
    Float_flag_s,
  }

  export const enum FloatKindConv {
    Float_f,
    Float_e,
    Float_E,
    Float_g,
    Float_G,
    Float_F,
    Float_h,
    Float_H,
    Float_CF,
  }

  export type FloatConv = [FloatFlagConv, FloatKindConv];

  export const enum Counter {
    Line_counter,
    Char_counter,
    Token_counter,
  }

  export const enum PaddingType {
    Lit_padding = 0,
    Arg_padding = 1,
  }

  export type Padding =
    | 0
    | OCamlVariant2<PaddingType.Lit_padding, Padty, number>
    | OCamlVariant<PaddingType.Arg_padding, number>;

  export type PadOption = OCamlOption<int>;

  export const enum PrecisionType {
    No_precision,
    Arg_precision,
  }

  export type Precision = PrecisionType | Untag<OCamlVariant<unknown, int>>;

  export type PrecOption = OCamlOption<int>;

  export type CustomArity = 0 | { _1: CustomArity };

  export enum BlockType {
    Pp_hbox,
    Pp_vbox,
    Pp_hvbox,
    Pp_hovbox,
    Pp_box,
    Pp_fits,
  }
}

declare module "@nasi/melange-stdlib/lib/es6/camlinternalLazy.js" {
  import type { OCamlLazy } from "@nasi/melange-stdlib";
  export const Undefined: "CamlinternalLazy.Undefined/0";

  export function is_val<T>(l: OCamlLazy<T>): l is { LAZY_DONE: true; VAL: T };

  export function force<T>(l: OCamlLazy<T>): T;

  export function force_lazy_block<T>(l: OCamlLazy<T>): T;

  export function force_val_lazy_block<T>(l: OCamlLazy<T>): T;

  export function force_val<T>(l: OCamlLazy<T>): T;
}

declare module "@nasi/melange-stdlib/lib/es6/curry.js" {
  import type { CurriedFunction } from "@nasi/melange-stdlib";

  type ArgumentsOf<T> = T extends (...args: infer U) => unknown ? U : never;

  export type Curried<TArgs extends any[]> = CurriedFunction<
    [...TArgs, ...any[]],
    any
  >;

  export type Uncurry1<T extends Curried<[any]>> = T extends (
    arg: infer A
  ) => infer R
    ? (arg: A) => R
    : T extends CurriedFunction<[infer A, ...infer Args], infer R>
    ? (arg: A) => CurriedFunction<Args, R>
    : never;

  export type Uncurry2<T extends Curried<[any, any]>> =
    T extends CurriedFunction<[infer A, infer B], infer R>
      ? (arg: A, arg1: B) => R
      : T extends CurriedFunction<[infer A, infer B, ...infer Args], infer R>
      ? (arg: A, arg1: B) => CurriedFunction<Args, R>
      : never;

  export type Uncurry3<T extends Curried<[any, any, any]>> =
    T extends CurriedFunction<[infer A, infer B, infer C], infer R>
      ? (a0: A, a1: B, a2: C) => R
      : T extends CurriedFunction<
          [infer A, infer B, infer C, ...infer Args],
          infer R
        >
      ? (a0: A, a1: B, a2: C) => CurriedFunction<Args, R>
      : never;

  export type Uncurry4<T extends Curried<[any, any, any, any]>> =
    T extends CurriedFunction<[infer A, infer B, infer C, infer D], infer R>
      ? (a0: A, a1: B, a2: C, a3: D) => R
      : T extends CurriedFunction<
          [infer A, infer B, infer C, infer D, ...infer Args],
          infer R
        >
      ? (a0: A, a1: B, a2: C, a3: D) => CurriedFunction<Args, R>
      : never;

  export type Uncurry5<T extends Curried<[any, any, any, any, any]>> =
    T extends CurriedFunction<
      [infer A, infer B, infer C, infer D, infer E],
      infer R
    >
      ? (a0: A, a1: B, a2: C, a3: D, a4: E) => R
      : T extends CurriedFunction<
          [infer A, infer B, infer C, infer D, infer E, ...infer Args],
          infer R
        >
      ? (a0: A, a1: B, a2: C, a3: D, a4: E) => CurriedFunction<Args, R>
      : never;

  export type Uncurry6<T extends Curried<[any, any, any, any, any, any]>> =
    T extends CurriedFunction<
      [infer A, infer B, infer C, infer D, infer E, infer F],
      infer R
    >
      ? (a0: A, a1: B, a2: C, a3: D, a4: E, a5: F) => R
      : T extends CurriedFunction<
          [infer A, infer B, infer C, infer D, infer E, infer F, ...infer Args],
          infer R
        >
      ? (a0: A, a1: B, a2: C, a3: D, a4: E, a5: F) => CurriedFunction<Args, R>
      : never;

  export type Uncurry7<T extends Curried<[any, any, any, any, any, any, any]>> =
    T extends CurriedFunction<
      [infer A, infer B, infer C, infer D, infer E, infer F, infer G],
      infer R
    >
      ? (a0: A, a1: B, a2: C, a3: D, a4: E, a5: F, a6: G) => R
      : T extends CurriedFunction<
          [
            infer A,
            infer B,
            infer C,
            infer D,
            infer E,
            infer F,
            infer G,
            ...infer Args
          ],
          infer R
        >
      ? (
          a0: A,
          a1: B,
          a2: C,
          a3: D,
          a4: E,
          a5: F,
          a6: G
        ) => CurriedFunction<Args, R>
      : never;

  export type Uncurry8<
    T extends Curried<[any, any, any, any, any, any, any, any]>
  > = T extends CurriedFunction<
    [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H],
    infer R
  >
    ? (a0: A, a1: B, a2: C, a3: D, a4: E, a5: F, a6: G, a7: H) => R
    : T extends CurriedFunction<
        [
          infer A,
          infer B,
          infer C,
          infer D,
          infer E,
          infer F,
          infer G,
          infer H,
          ...infer Args
        ],
        infer R
      >
    ? (
        a0: A,
        a1: B,
        a2: C,
        a3: D,
        a4: E,
        a5: F,
        a6: G,
        a7: H
      ) => CurriedFunction<Args, R>
    : never;
  export function app<A extends [], B>(f: CurriedFunction<A, B>, args: A): B;

  export function _1<A, F extends Curried<[A]>>(
    a: F,
    a0: A
  ): ReturnType<Uncurry1<F>>;
  export function __1<F extends Curried<[any]>>(a: F): Uncurry1<F>;

  export function _2<A, B, F extends Curried<[A, B]>>(
    a: F,
    a0: A,
    a1: B
  ): ReturnType<Uncurry2<F>>;

  export function __2<F extends Curried<[any, any]>>(a: F): Uncurry2<F>;

  export function _3<A, B, C, F extends Curried<[A, B, C]>>(
    a: F,
    a0: A,
    a1: B,
    a2: C
  ): ReturnType<Uncurry3<F>>;

  export function __3<F extends Curried<[any, any, any]>>(a: F): Uncurry3<F>;

  export function _4<A, B, C, D, F extends Curried<[A, B, C, D]>>(
    a: F,
    a0: A,
    a1: B,
    a2: C,
    a3: D
  ): ReturnType<Uncurry4<F>>;

  export function __4<F extends Curried<[any, any, any, any]>>(
    a: F
  ): Uncurry4<F>;

  export function _5<A, B, C, D, E, F extends Curried<[A, B, C, D, E]>>(
    o: F,
    a0: A,
    a1: B,
    a2: C,
    a3: D,
    a4: E
  ): ReturnType<Uncurry5<F>>;

  export function __5<F extends Curried<[any, any, any, any, any]>>(
    o: F
  ): Uncurry5<F>;

  export function _6<A, B, C, D, E, F, O extends Curried<[A, B, C, D, E, F]>>(
    o: O,
    a0: A,
    a1: B,
    a2: C,
    a3: D,
    a4: E,
    a5: F
  ): ReturnType<Uncurry6<O>>;

  export function __6<F extends Curried<[any, any, any, any, any, any]>>(
    o: F
  ): Uncurry6<F>;

  export function _7<
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    O extends Curried<[A, B, C, D, E, F, G]>
  >(
    o: O,
    a0: A,
    a1: B,
    a2: C,
    a3: D,
    a4: E,
    a5: F,
    a6: G
  ): ReturnType<Uncurry7<O>>;

  export function __7<F extends Curried<[any, any, any, any, any, any, any]>>(
    o: F
  ): Uncurry7<F>;

  export function _8<
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    O extends Curried<[any, any, any, any, any, any, any, any]>
  >(
    o: O,
    a0: A,
    a1: B,
    a2: C,
    a3: D,
    a4: E,
    a5: F,
    a6: G,
    a7: H
  ): ReturnType<Uncurry8<O>>;

  export function __8<
    F extends Curried<[any, any, any, any, any, any, any, any]>
  >(o: F): Uncurry8<F>;
}

declare module "@nasi/melange-stdlib/lib/es6/seq.js" {
  import type { CurriedFunction, OCamlOption } from "@nasi/melange-stdlib";
  import type {
    Curried,
    Uncurry1,
  } from "@nasi/melange-stdlib/lib/es6/curry.js";
  export type Node<T> = 0 | { _0: T; _1: Seq<T> };
  export type Seq<T> = (() => Node<T>) | ((_unit: void | undefined) => Node<T>);

  export function empty<T>(): Node<T>;

  export function $$return<T>(x: T, _unit: void): Node<T>;
  export function cons<T>(x: T, next: Seq<T>, _unit: void): Node<T>;
  export function append<T>(s1: Seq<T>, s2: Seq<T>, _unit: void): Node<T>;
  export function map<T, F extends Curried<[T]>>(
    f: F,
    seq: Seq<T>,
    _unit: void
  ): Node<ReturnType<Uncurry1<F>>>;
  export function filter_map<T, U>(
    f: CurriedFunction<[T], OCamlOption<U>>,
    seq: Seq<T>,
    _unit: void
  ): Node<U>;
  export function filter<T>(
    f: CurriedFunction<[T], boolean>,
    seq: Seq<T>,
    _unit: void
  ): Node<T>;
  export function flat_map<T, U>(
    f: CurriedFunction<[T], Seq<U>>,
    seq: Seq<T>,
    _unit: void
  ): Node<T>;
  export function fold_left<T, U>(
    f: CurriedFunction<[T, U], T>,
    acc: T,
    seq: Seq<U>
  ): T;
  export function iter<T>(f: CurriedFunction<[T], void>, seq: Seq<T>): void;
  export function unfold<T, TState>(
    f: CurriedFunction<[TState], OCamlOption<[T, TState]>>,
    initState: TState,
    _unit: void
  ): Node<T>;
}

declare module "@nasi/melange-stdlib/lib/es6/stdlib__no_aliases.js" {
  import type { char, int, OCamlOption } from "@nasi/melange-stdlib";

  export function failwith(s: string): never;

  export function invalid_arg(s: string): never;

  export const Exit: "Stdlib__no_aliases.Stdlib.Exit/0";

  export const Match_failure: "Match_failure";

  export const Assert_failure: "Assert_failure";

  export const Invalid_argument: "Invalid_argument";

  export const Failure: "Failure";

  export const Not_found: "Not_found";

  export const Out_of_memory: "Out_of_memory";

  export const Stack_overflow: "Stack_overflow";

  export const Sys_error: "Sys_error";

  export const End_of_file: "End_of_file";

  export const Division_by_zero: "Division_by_zero";

  export const Sys_blocked_io: "Sys_blocked_io";

  export const Undefined_recursive_module: "Undefined_recursive_module";

  export function abs(x: int): int;

  export function lnot(x: int): int;

  export const min_int: int;

  export const max_int: int;

  export const infinity: number;

  export const neg_infinity: number;

  export const max_float: number;

  export const min_float: number;

  export const epsilon_float: number;

  export const enum FP {
    Normal,
    Subnormal,
    Zero,
    Infinite,
    NaN,
  }

  export function classify_float(x: number): FP;
  export function char_of_int(x: char): int;
  export function string_of_bool(b: boolean): string;
  export function bool_of_string(s: string): boolean;
  export function bool_of_string_opt(s: string): OCamlOption<boolean>;
  export function int_of_string_opt(s: string): OCamlOption<int>;
  export function valid_float_lexem(s: string): string;
}

declare module "@nasi/melange-stdlib/lib/cjs/curry.js" {
  export * from "@nasi/melange-stdlib/lib/es6/curry.js";
}
