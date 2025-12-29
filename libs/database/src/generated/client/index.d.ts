/**
 * Client
 **/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Quality
 *
 */
export type Quality = $Result.DefaultSelection<Prisma.$QualityPayload>;
/**
 * Model Rarity
 *
 */
export type Rarity = $Result.DefaultSelection<Prisma.$RarityPayload>;
/**
 * Model Country
 *
 */
export type Country = $Result.DefaultSelection<Prisma.$CountryPayload>;
/**
 * Model Position
 *
 */
export type Position = $Result.DefaultSelection<Prisma.$PositionPayload>;
/**
 * Model PlayerPosition
 *
 */
export type PlayerPosition = $Result.DefaultSelection<Prisma.$PlayerPositionPayload>;
/**
 * Model League
 *
 */
export type League = $Result.DefaultSelection<Prisma.$LeaguePayload>;
/**
 * Model Club
 *
 */
export type Club = $Result.DefaultSelection<Prisma.$ClubPayload>;
/**
 * Model Player
 *
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>;
/**
 * Model ClubPlayer
 *
 */
export type ClubPlayer = $Result.DefaultSelection<Prisma.$ClubPlayerPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Qualities
 * const qualities = await prisma.quality.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Qualities
   * const qualities = await prisma.quality.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void
  ): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>;

  /**
   * `prisma.quality`: Exposes CRUD operations for the **Quality** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Qualities
   * const qualities = await prisma.quality.findMany()
   * ```
   */
  get quality(): Prisma.QualityDelegate<ExtArgs>;

  /**
   * `prisma.rarity`: Exposes CRUD operations for the **Rarity** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Rarities
   * const rarities = await prisma.rarity.findMany()
   * ```
   */
  get rarity(): Prisma.RarityDelegate<ExtArgs>;

  /**
   * `prisma.country`: Exposes CRUD operations for the **Country** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Countries
   * const countries = await prisma.country.findMany()
   * ```
   */
  get country(): Prisma.CountryDelegate<ExtArgs>;

  /**
   * `prisma.position`: Exposes CRUD operations for the **Position** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Positions
   * const positions = await prisma.position.findMany()
   * ```
   */
  get position(): Prisma.PositionDelegate<ExtArgs>;

  /**
   * `prisma.playerPosition`: Exposes CRUD operations for the **PlayerPosition** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more PlayerPositions
   * const playerPositions = await prisma.playerPosition.findMany()
   * ```
   */
  get playerPosition(): Prisma.PlayerPositionDelegate<ExtArgs>;

  /**
   * `prisma.league`: Exposes CRUD operations for the **League** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Leagues
   * const leagues = await prisma.league.findMany()
   * ```
   */
  get league(): Prisma.LeagueDelegate<ExtArgs>;

  /**
   * `prisma.club`: Exposes CRUD operations for the **Club** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Clubs
   * const clubs = await prisma.club.findMany()
   * ```
   */
  get club(): Prisma.ClubDelegate<ExtArgs>;

  /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Players
   * const players = await prisma.player.findMany()
   * ```
   */
  get player(): Prisma.PlayerDelegate<ExtArgs>;

  /**
   * `prisma.clubPlayer`: Exposes CRUD operations for the **ClubPlayer** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ClubPlayers
   * const clubPlayers = await prisma.clubPlayer.findMany()
   * ```
   */
  get clubPlayer(): Prisma.ClubPlayerDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I
  ) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> =
    IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Quality: 'Quality';
    Rarity: 'Rarity';
    Country: 'Country';
    Position: 'Position';
    PlayerPosition: 'PlayerPosition';
    League: 'League';
    Club: 'Club';
    Player: 'Player';
    ClubPlayer: 'ClubPlayer';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs; clientOptions: PrismaClientOptions },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    ClientOptions = {},
  > = {
    meta: {
      modelProps:
        | 'quality'
        | 'rarity'
        | 'country'
        | 'position'
        | 'playerPosition'
        | 'league'
        | 'club'
        | 'player'
        | 'clubPlayer';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Quality: {
        payload: Prisma.$QualityPayload<ExtArgs>;
        fields: Prisma.QualityFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.QualityFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$QualityPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.QualityFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$QualityPayload>;
          };
          findFirst: {
            args: Prisma.QualityFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$QualityPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.QualityFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$QualityPayload>;
          };
          findMany: {
            args: Prisma.QualityFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$QualityPayload>[];
          };
          create: {
            args: Prisma.QualityCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$QualityPayload>;
          };
          createMany: {
            args: Prisma.QualityCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.QualityCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$QualityPayload>[];
          };
          delete: {
            args: Prisma.QualityDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$QualityPayload>;
          };
          update: {
            args: Prisma.QualityUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$QualityPayload>;
          };
          deleteMany: {
            args: Prisma.QualityDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.QualityUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.QualityUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$QualityPayload>;
          };
          aggregate: {
            args: Prisma.QualityAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateQuality>;
          };
          groupBy: {
            args: Prisma.QualityGroupByArgs<ExtArgs>;
            result: $Utils.Optional<QualityGroupByOutputType>[];
          };
          count: {
            args: Prisma.QualityCountArgs<ExtArgs>;
            result: $Utils.Optional<QualityCountAggregateOutputType> | number;
          };
        };
      };
      Rarity: {
        payload: Prisma.$RarityPayload<ExtArgs>;
        fields: Prisma.RarityFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RarityFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RarityPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RarityFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RarityPayload>;
          };
          findFirst: {
            args: Prisma.RarityFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RarityPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RarityFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RarityPayload>;
          };
          findMany: {
            args: Prisma.RarityFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RarityPayload>[];
          };
          create: {
            args: Prisma.RarityCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RarityPayload>;
          };
          createMany: {
            args: Prisma.RarityCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RarityCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RarityPayload>[];
          };
          delete: {
            args: Prisma.RarityDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RarityPayload>;
          };
          update: {
            args: Prisma.RarityUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RarityPayload>;
          };
          deleteMany: {
            args: Prisma.RarityDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RarityUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.RarityUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RarityPayload>;
          };
          aggregate: {
            args: Prisma.RarityAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRarity>;
          };
          groupBy: {
            args: Prisma.RarityGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RarityGroupByOutputType>[];
          };
          count: {
            args: Prisma.RarityCountArgs<ExtArgs>;
            result: $Utils.Optional<RarityCountAggregateOutputType> | number;
          };
        };
      };
      Country: {
        payload: Prisma.$CountryPayload<ExtArgs>;
        fields: Prisma.CountryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CountryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CountryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CountryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>;
          };
          findFirst: {
            args: Prisma.CountryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CountryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CountryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>;
          };
          findMany: {
            args: Prisma.CountryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[];
          };
          create: {
            args: Prisma.CountryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>;
          };
          createMany: {
            args: Prisma.CountryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CountryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[];
          };
          delete: {
            args: Prisma.CountryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>;
          };
          update: {
            args: Prisma.CountryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>;
          };
          deleteMany: {
            args: Prisma.CountryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CountryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.CountryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>;
          };
          aggregate: {
            args: Prisma.CountryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCountry>;
          };
          groupBy: {
            args: Prisma.CountryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CountryGroupByOutputType>[];
          };
          count: {
            args: Prisma.CountryCountArgs<ExtArgs>;
            result: $Utils.Optional<CountryCountAggregateOutputType> | number;
          };
        };
      };
      Position: {
        payload: Prisma.$PositionPayload<ExtArgs>;
        fields: Prisma.PositionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PositionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PositionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>;
          };
          findFirst: {
            args: Prisma.PositionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PositionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>;
          };
          findMany: {
            args: Prisma.PositionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[];
          };
          create: {
            args: Prisma.PositionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>;
          };
          createMany: {
            args: Prisma.PositionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PositionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[];
          };
          delete: {
            args: Prisma.PositionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>;
          };
          update: {
            args: Prisma.PositionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>;
          };
          deleteMany: {
            args: Prisma.PositionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PositionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.PositionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>;
          };
          aggregate: {
            args: Prisma.PositionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePosition>;
          };
          groupBy: {
            args: Prisma.PositionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PositionGroupByOutputType>[];
          };
          count: {
            args: Prisma.PositionCountArgs<ExtArgs>;
            result: $Utils.Optional<PositionCountAggregateOutputType> | number;
          };
        };
      };
      PlayerPosition: {
        payload: Prisma.$PlayerPositionPayload<ExtArgs>;
        fields: Prisma.PlayerPositionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PlayerPositionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPositionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PlayerPositionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPositionPayload>;
          };
          findFirst: {
            args: Prisma.PlayerPositionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPositionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PlayerPositionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPositionPayload>;
          };
          findMany: {
            args: Prisma.PlayerPositionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPositionPayload>[];
          };
          create: {
            args: Prisma.PlayerPositionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPositionPayload>;
          };
          createMany: {
            args: Prisma.PlayerPositionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PlayerPositionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPositionPayload>[];
          };
          delete: {
            args: Prisma.PlayerPositionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPositionPayload>;
          };
          update: {
            args: Prisma.PlayerPositionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPositionPayload>;
          };
          deleteMany: {
            args: Prisma.PlayerPositionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PlayerPositionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.PlayerPositionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPositionPayload>;
          };
          aggregate: {
            args: Prisma.PlayerPositionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePlayerPosition>;
          };
          groupBy: {
            args: Prisma.PlayerPositionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PlayerPositionGroupByOutputType>[];
          };
          count: {
            args: Prisma.PlayerPositionCountArgs<ExtArgs>;
            result: $Utils.Optional<PlayerPositionCountAggregateOutputType> | number;
          };
        };
      };
      League: {
        payload: Prisma.$LeaguePayload<ExtArgs>;
        fields: Prisma.LeagueFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.LeagueFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeaguePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.LeagueFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeaguePayload>;
          };
          findFirst: {
            args: Prisma.LeagueFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeaguePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.LeagueFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeaguePayload>;
          };
          findMany: {
            args: Prisma.LeagueFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeaguePayload>[];
          };
          create: {
            args: Prisma.LeagueCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeaguePayload>;
          };
          createMany: {
            args: Prisma.LeagueCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.LeagueCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeaguePayload>[];
          };
          delete: {
            args: Prisma.LeagueDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeaguePayload>;
          };
          update: {
            args: Prisma.LeagueUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeaguePayload>;
          };
          deleteMany: {
            args: Prisma.LeagueDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.LeagueUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.LeagueUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$LeaguePayload>;
          };
          aggregate: {
            args: Prisma.LeagueAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateLeague>;
          };
          groupBy: {
            args: Prisma.LeagueGroupByArgs<ExtArgs>;
            result: $Utils.Optional<LeagueGroupByOutputType>[];
          };
          count: {
            args: Prisma.LeagueCountArgs<ExtArgs>;
            result: $Utils.Optional<LeagueCountAggregateOutputType> | number;
          };
        };
      };
      Club: {
        payload: Prisma.$ClubPayload<ExtArgs>;
        fields: Prisma.ClubFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ClubFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ClubFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>;
          };
          findFirst: {
            args: Prisma.ClubFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ClubFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>;
          };
          findMany: {
            args: Prisma.ClubFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[];
          };
          create: {
            args: Prisma.ClubCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>;
          };
          createMany: {
            args: Prisma.ClubCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ClubCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[];
          };
          delete: {
            args: Prisma.ClubDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>;
          };
          update: {
            args: Prisma.ClubUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>;
          };
          deleteMany: {
            args: Prisma.ClubDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ClubUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.ClubUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>;
          };
          aggregate: {
            args: Prisma.ClubAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateClub>;
          };
          groupBy: {
            args: Prisma.ClubGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ClubGroupByOutputType>[];
          };
          count: {
            args: Prisma.ClubCountArgs<ExtArgs>;
            result: $Utils.Optional<ClubCountAggregateOutputType> | number;
          };
        };
      };
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>;
        fields: Prisma.PlayerFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>;
          };
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>;
          };
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[];
          };
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>;
          };
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[];
          };
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>;
          };
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>;
          };
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>;
          };
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePlayer>;
          };
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PlayerGroupByOutputType>[];
          };
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>;
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number;
          };
        };
      };
      ClubPlayer: {
        payload: Prisma.$ClubPlayerPayload<ExtArgs>;
        fields: Prisma.ClubPlayerFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ClubPlayerFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPlayerPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ClubPlayerFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPlayerPayload>;
          };
          findFirst: {
            args: Prisma.ClubPlayerFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPlayerPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ClubPlayerFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPlayerPayload>;
          };
          findMany: {
            args: Prisma.ClubPlayerFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPlayerPayload>[];
          };
          create: {
            args: Prisma.ClubPlayerCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPlayerPayload>;
          };
          createMany: {
            args: Prisma.ClubPlayerCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ClubPlayerCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPlayerPayload>[];
          };
          delete: {
            args: Prisma.ClubPlayerDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPlayerPayload>;
          };
          update: {
            args: Prisma.ClubPlayerUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPlayerPayload>;
          };
          deleteMany: {
            args: Prisma.ClubPlayerDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ClubPlayerUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.ClubPlayerUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClubPlayerPayload>;
          };
          aggregate: {
            args: Prisma.ClubPlayerAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateClubPlayer>;
          };
          groupBy: {
            args: Prisma.ClubPlayerGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ClubPlayerGroupByOutputType>[];
          };
          count: {
            args: Prisma.ClubPlayerCountArgs<ExtArgs>;
            result: $Utils.Optional<ClubPlayerCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition
    ? T['emit'] extends 'event'
      ? T['level']
      : never
    : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type QualityCountOutputType
   */

  export type QualityCountOutputType = {
    players: number;
  };

  export type QualityCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    players?: boolean | QualityCountOutputTypeCountPlayersArgs;
  };

  // Custom InputTypes
  /**
   * QualityCountOutputType without action
   */
  export type QualityCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the QualityCountOutputType
     */
    select?: QualityCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * QualityCountOutputType without action
   */
  export type QualityCountOutputTypeCountPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PlayerWhereInput;
  };

  /**
   * Count Type RarityCountOutputType
   */

  export type RarityCountOutputType = {
    players: number;
  };

  export type RarityCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    players?: boolean | RarityCountOutputTypeCountPlayersArgs;
  };

  // Custom InputTypes
  /**
   * RarityCountOutputType without action
   */
  export type RarityCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RarityCountOutputType
     */
    select?: RarityCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * RarityCountOutputType without action
   */
  export type RarityCountOutputTypeCountPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PlayerWhereInput;
  };

  /**
   * Count Type CountryCountOutputType
   */

  export type CountryCountOutputType = {
    clubs: number;
    leagues: number;
    players: number;
  };

  export type CountryCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    clubs?: boolean | CountryCountOutputTypeCountClubsArgs;
    leagues?: boolean | CountryCountOutputTypeCountLeaguesArgs;
    players?: boolean | CountryCountOutputTypeCountPlayersArgs;
  };

  // Custom InputTypes
  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CountryCountOutputType
     */
    select?: CountryCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountClubsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ClubWhereInput;
  };

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountLeaguesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: LeagueWhereInput;
  };

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PlayerWhereInput;
  };

  /**
   * Count Type PositionCountOutputType
   */

  export type PositionCountOutputType = {
    players: number;
  };

  export type PositionCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    players?: boolean | PositionCountOutputTypeCountPlayersArgs;
  };

  // Custom InputTypes
  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PositionCountOutputType
     */
    select?: PositionCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * PositionCountOutputType without action
   */
  export type PositionCountOutputTypeCountPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PlayerPositionWhereInput;
  };

  /**
   * Count Type LeagueCountOutputType
   */

  export type LeagueCountOutputType = {
    clubs: number;
    players: number;
  };

  export type LeagueCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    clubs?: boolean | LeagueCountOutputTypeCountClubsArgs;
    players?: boolean | LeagueCountOutputTypeCountPlayersArgs;
  };

  // Custom InputTypes
  /**
   * LeagueCountOutputType without action
   */
  export type LeagueCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the LeagueCountOutputType
     */
    select?: LeagueCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * LeagueCountOutputType without action
   */
  export type LeagueCountOutputTypeCountClubsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ClubWhereInput;
  };

  /**
   * LeagueCountOutputType without action
   */
  export type LeagueCountOutputTypeCountPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PlayerWhereInput;
  };

  /**
   * Count Type ClubCountOutputType
   */

  export type ClubCountOutputType = {
    players: number;
  };

  export type ClubCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    players?: boolean | ClubCountOutputTypeCountPlayersArgs;
  };

  // Custom InputTypes
  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubCountOutputType
     */
    select?: ClubCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ClubCountOutputType without action
   */
  export type ClubCountOutputTypeCountPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PlayerWhereInput;
  };

  /**
   * Count Type PlayerCountOutputType
   */

  export type PlayerCountOutputType = {
    positions: number;
    clubPlayers: number;
  };

  export type PlayerCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    positions?: boolean | PlayerCountOutputTypeCountPositionsArgs;
    clubPlayers?: boolean | PlayerCountOutputTypeCountClubPlayersArgs;
  };

  // Custom InputTypes
  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerCountOutputType
     */
    select?: PlayerCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountPositionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PlayerPositionWhereInput;
  };

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountClubPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ClubPlayerWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Quality
   */

  export type AggregateQuality = {
    _count: QualityCountAggregateOutputType | null;
    _avg: QualityAvgAggregateOutputType | null;
    _sum: QualitySumAggregateOutputType | null;
    _min: QualityMinAggregateOutputType | null;
    _max: QualityMaxAggregateOutputType | null;
  };

  export type QualityAvgAggregateOutputType = {
    id: number | null;
  };

  export type QualitySumAggregateOutputType = {
    id: number | null;
  };

  export type QualityMinAggregateOutputType = {
    id: number | null;
    name: string | null;
  };

  export type QualityMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
  };

  export type QualityCountAggregateOutputType = {
    id: number;
    name: number;
    _all: number;
  };

  export type QualityAvgAggregateInputType = {
    id?: true;
  };

  export type QualitySumAggregateInputType = {
    id?: true;
  };

  export type QualityMinAggregateInputType = {
    id?: true;
    name?: true;
  };

  export type QualityMaxAggregateInputType = {
    id?: true;
    name?: true;
  };

  export type QualityCountAggregateInputType = {
    id?: true;
    name?: true;
    _all?: true;
  };

  export type QualityAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Quality to aggregate.
     */
    where?: QualityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Qualities to fetch.
     */
    orderBy?: QualityOrderByWithRelationInput | QualityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: QualityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Qualities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Qualities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Qualities
     **/
    _count?: true | QualityCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: QualityAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: QualitySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: QualityMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: QualityMaxAggregateInputType;
  };

  export type GetQualityAggregateType<T extends QualityAggregateArgs> = {
    [P in keyof T & keyof AggregateQuality]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuality[P]>
      : GetScalarType<T[P], AggregateQuality[P]>;
  };

  export type QualityGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: QualityWhereInput;
    orderBy?: QualityOrderByWithAggregationInput | QualityOrderByWithAggregationInput[];
    by: QualityScalarFieldEnum[] | QualityScalarFieldEnum;
    having?: QualityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QualityCountAggregateInputType | true;
    _avg?: QualityAvgAggregateInputType;
    _sum?: QualitySumAggregateInputType;
    _min?: QualityMinAggregateInputType;
    _max?: QualityMaxAggregateInputType;
  };

  export type QualityGroupByOutputType = {
    id: number;
    name: string;
    _count: QualityCountAggregateOutputType | null;
    _avg: QualityAvgAggregateOutputType | null;
    _sum: QualitySumAggregateOutputType | null;
    _min: QualityMinAggregateOutputType | null;
    _max: QualityMaxAggregateOutputType | null;
  };

  type GetQualityGroupByPayload<T extends QualityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QualityGroupByOutputType, T['by']> & {
        [P in keyof T & keyof QualityGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], QualityGroupByOutputType[P]>
          : GetScalarType<T[P], QualityGroupByOutputType[P]>;
      }
    >
  >;

  export type QualitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        players?: boolean | Quality$playersArgs<ExtArgs>;
        _count?: boolean | QualityCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['quality']
    >;

  export type QualitySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
    },
    ExtArgs['result']['quality']
  >;

  export type QualitySelectScalar = {
    id?: boolean;
    name?: boolean;
  };

  export type QualityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | Quality$playersArgs<ExtArgs>;
    _count?: boolean | QualityCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type QualityIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $QualityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Quality';
      objects: {
        players: Prisma.$PlayerPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: number;
          name: string;
        },
        ExtArgs['result']['quality']
      >;
      composites: {};
    };

  type QualityGetPayload<S extends boolean | null | undefined | QualityDefaultArgs> =
    $Result.GetResult<Prisma.$QualityPayload, S>;

  type QualityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    QualityFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: QualityCountAggregateInputType | true;
  };

  export interface QualityDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quality']; meta: { name: 'Quality' } };
    /**
     * Find zero or one Quality that matches the filter.
     * @param {QualityFindUniqueArgs} args - Arguments to find a Quality
     * @example
     * // Get one Quality
     * const quality = await prisma.quality.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QualityFindUniqueArgs>(
      args: SelectSubset<T, QualityFindUniqueArgs<ExtArgs>>
    ): Prisma__QualityClient<
      $Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Quality that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QualityFindUniqueOrThrowArgs} args - Arguments to find a Quality
     * @example
     * // Get one Quality
     * const quality = await prisma.quality.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QualityFindUniqueOrThrowArgs>(
      args: SelectSubset<T, QualityFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__QualityClient<
      $Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Quality that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityFindFirstArgs} args - Arguments to find a Quality
     * @example
     * // Get one Quality
     * const quality = await prisma.quality.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QualityFindFirstArgs>(
      args?: SelectSubset<T, QualityFindFirstArgs<ExtArgs>>
    ): Prisma__QualityClient<
      $Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Quality that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityFindFirstOrThrowArgs} args - Arguments to find a Quality
     * @example
     * // Get one Quality
     * const quality = await prisma.quality.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QualityFindFirstOrThrowArgs>(
      args?: SelectSubset<T, QualityFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__QualityClient<
      $Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Qualities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Qualities
     * const qualities = await prisma.quality.findMany()
     *
     * // Get first 10 Qualities
     * const qualities = await prisma.quality.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const qualityWithIdOnly = await prisma.quality.findMany({ select: { id: true } })
     *
     */
    findMany<T extends QualityFindManyArgs>(
      args?: SelectSubset<T, QualityFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Quality.
     * @param {QualityCreateArgs} args - Arguments to create a Quality.
     * @example
     * // Create one Quality
     * const Quality = await prisma.quality.create({
     *   data: {
     *     // ... data to create a Quality
     *   }
     * })
     *
     */
    create<T extends QualityCreateArgs>(
      args: SelectSubset<T, QualityCreateArgs<ExtArgs>>
    ): Prisma__QualityClient<
      $Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Qualities.
     * @param {QualityCreateManyArgs} args - Arguments to create many Qualities.
     * @example
     * // Create many Qualities
     * const quality = await prisma.quality.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends QualityCreateManyArgs>(
      args?: SelectSubset<T, QualityCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Qualities and returns the data saved in the database.
     * @param {QualityCreateManyAndReturnArgs} args - Arguments to create many Qualities.
     * @example
     * // Create many Qualities
     * const quality = await prisma.quality.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Qualities and only return the `id`
     * const qualityWithIdOnly = await prisma.quality.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends QualityCreateManyAndReturnArgs>(
      args?: SelectSubset<T, QualityCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Quality.
     * @param {QualityDeleteArgs} args - Arguments to delete one Quality.
     * @example
     * // Delete one Quality
     * const Quality = await prisma.quality.delete({
     *   where: {
     *     // ... filter to delete one Quality
     *   }
     * })
     *
     */
    delete<T extends QualityDeleteArgs>(
      args: SelectSubset<T, QualityDeleteArgs<ExtArgs>>
    ): Prisma__QualityClient<
      $Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Quality.
     * @param {QualityUpdateArgs} args - Arguments to update one Quality.
     * @example
     * // Update one Quality
     * const quality = await prisma.quality.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends QualityUpdateArgs>(
      args: SelectSubset<T, QualityUpdateArgs<ExtArgs>>
    ): Prisma__QualityClient<
      $Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Qualities.
     * @param {QualityDeleteManyArgs} args - Arguments to filter Qualities to delete.
     * @example
     * // Delete a few Qualities
     * const { count } = await prisma.quality.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends QualityDeleteManyArgs>(
      args?: SelectSubset<T, QualityDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Qualities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Qualities
     * const quality = await prisma.quality.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends QualityUpdateManyArgs>(
      args: SelectSubset<T, QualityUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Quality.
     * @param {QualityUpsertArgs} args - Arguments to update or create a Quality.
     * @example
     * // Update or create a Quality
     * const quality = await prisma.quality.upsert({
     *   create: {
     *     // ... data to create a Quality
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quality we want to update
     *   }
     * })
     */
    upsert<T extends QualityUpsertArgs>(
      args: SelectSubset<T, QualityUpsertArgs<ExtArgs>>
    ): Prisma__QualityClient<
      $Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Qualities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityCountArgs} args - Arguments to filter Qualities to count.
     * @example
     * // Count the number of Qualities
     * const count = await prisma.quality.count({
     *   where: {
     *     // ... the filter for the Qualities we want to count
     *   }
     * })
     **/
    count<T extends QualityCountArgs>(
      args?: Subset<T, QualityCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QualityCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Quality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends QualityAggregateArgs>(
      args: Subset<T, QualityAggregateArgs>
    ): Prisma.PrismaPromise<GetQualityAggregateType<T>>;

    /**
     * Group by Quality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends QualityGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QualityGroupByArgs['orderBy'] }
        : { orderBy?: QualityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, QualityGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetQualityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Quality model
     */
    readonly fields: QualityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quality.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QualityClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    players<T extends Quality$playersArgs<ExtArgs> = {}>(
      args?: Subset<T, Quality$playersArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Quality model
   */
  interface QualityFieldRefs {
    readonly id: FieldRef<'Quality', 'Int'>;
    readonly name: FieldRef<'Quality', 'String'>;
  }

  // Custom InputTypes
  /**
   * Quality findUnique
   */
  export type QualityFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityInclude<ExtArgs> | null;
    /**
     * Filter, which Quality to fetch.
     */
    where: QualityWhereUniqueInput;
  };

  /**
   * Quality findUniqueOrThrow
   */
  export type QualityFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityInclude<ExtArgs> | null;
    /**
     * Filter, which Quality to fetch.
     */
    where: QualityWhereUniqueInput;
  };

  /**
   * Quality findFirst
   */
  export type QualityFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityInclude<ExtArgs> | null;
    /**
     * Filter, which Quality to fetch.
     */
    where?: QualityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Qualities to fetch.
     */
    orderBy?: QualityOrderByWithRelationInput | QualityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Qualities.
     */
    cursor?: QualityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Qualities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Qualities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Qualities.
     */
    distinct?: QualityScalarFieldEnum | QualityScalarFieldEnum[];
  };

  /**
   * Quality findFirstOrThrow
   */
  export type QualityFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityInclude<ExtArgs> | null;
    /**
     * Filter, which Quality to fetch.
     */
    where?: QualityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Qualities to fetch.
     */
    orderBy?: QualityOrderByWithRelationInput | QualityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Qualities.
     */
    cursor?: QualityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Qualities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Qualities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Qualities.
     */
    distinct?: QualityScalarFieldEnum | QualityScalarFieldEnum[];
  };

  /**
   * Quality findMany
   */
  export type QualityFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityInclude<ExtArgs> | null;
    /**
     * Filter, which Qualities to fetch.
     */
    where?: QualityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Qualities to fetch.
     */
    orderBy?: QualityOrderByWithRelationInput | QualityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Qualities.
     */
    cursor?: QualityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Qualities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Qualities.
     */
    skip?: number;
    distinct?: QualityScalarFieldEnum | QualityScalarFieldEnum[];
  };

  /**
   * Quality create
   */
  export type QualityCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityInclude<ExtArgs> | null;
    /**
     * The data needed to create a Quality.
     */
    data: XOR<QualityCreateInput, QualityUncheckedCreateInput>;
  };

  /**
   * Quality createMany
   */
  export type QualityCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Qualities.
     */
    data: QualityCreateManyInput | QualityCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Quality createManyAndReturn
   */
  export type QualityCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Qualities.
     */
    data: QualityCreateManyInput | QualityCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Quality update
   */
  export type QualityUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityInclude<ExtArgs> | null;
    /**
     * The data needed to update a Quality.
     */
    data: XOR<QualityUpdateInput, QualityUncheckedUpdateInput>;
    /**
     * Choose, which Quality to update.
     */
    where: QualityWhereUniqueInput;
  };

  /**
   * Quality updateMany
   */
  export type QualityUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Qualities.
     */
    data: XOR<QualityUpdateManyMutationInput, QualityUncheckedUpdateManyInput>;
    /**
     * Filter which Qualities to update
     */
    where?: QualityWhereInput;
  };

  /**
   * Quality upsert
   */
  export type QualityUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityInclude<ExtArgs> | null;
    /**
     * The filter to search for the Quality to update in case it exists.
     */
    where: QualityWhereUniqueInput;
    /**
     * In case the Quality found by the `where` argument doesn't exist, create a new Quality with this data.
     */
    create: XOR<QualityCreateInput, QualityUncheckedCreateInput>;
    /**
     * In case the Quality was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QualityUpdateInput, QualityUncheckedUpdateInput>;
  };

  /**
   * Quality delete
   */
  export type QualityDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityInclude<ExtArgs> | null;
    /**
     * Filter which Quality to delete.
     */
    where: QualityWhereUniqueInput;
  };

  /**
   * Quality deleteMany
   */
  export type QualityDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Qualities to delete
     */
    where?: QualityWhereInput;
  };

  /**
   * Quality.players
   */
  export type Quality$playersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null;
    where?: PlayerWhereInput;
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[];
    cursor?: PlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[];
  };

  /**
   * Quality without action
   */
  export type QualityDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Quality
     */
    select?: QualitySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityInclude<ExtArgs> | null;
  };

  /**
   * Model Rarity
   */

  export type AggregateRarity = {
    _count: RarityCountAggregateOutputType | null;
    _avg: RarityAvgAggregateOutputType | null;
    _sum: RaritySumAggregateOutputType | null;
    _min: RarityMinAggregateOutputType | null;
    _max: RarityMaxAggregateOutputType | null;
  };

  export type RarityAvgAggregateOutputType = {
    id: number | null;
  };

  export type RaritySumAggregateOutputType = {
    id: number | null;
  };

  export type RarityMinAggregateOutputType = {
    id: number | null;
    name: string | null;
  };

  export type RarityMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
  };

  export type RarityCountAggregateOutputType = {
    id: number;
    name: number;
    _all: number;
  };

  export type RarityAvgAggregateInputType = {
    id?: true;
  };

  export type RaritySumAggregateInputType = {
    id?: true;
  };

  export type RarityMinAggregateInputType = {
    id?: true;
    name?: true;
  };

  export type RarityMaxAggregateInputType = {
    id?: true;
    name?: true;
  };

  export type RarityCountAggregateInputType = {
    id?: true;
    name?: true;
    _all?: true;
  };

  export type RarityAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Rarity to aggregate.
     */
    where?: RarityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rarities to fetch.
     */
    orderBy?: RarityOrderByWithRelationInput | RarityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RarityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rarities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rarities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Rarities
     **/
    _count?: true | RarityCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: RarityAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: RaritySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RarityMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RarityMaxAggregateInputType;
  };

  export type GetRarityAggregateType<T extends RarityAggregateArgs> = {
    [P in keyof T & keyof AggregateRarity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRarity[P]>
      : GetScalarType<T[P], AggregateRarity[P]>;
  };

  export type RarityGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RarityWhereInput;
    orderBy?: RarityOrderByWithAggregationInput | RarityOrderByWithAggregationInput[];
    by: RarityScalarFieldEnum[] | RarityScalarFieldEnum;
    having?: RarityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RarityCountAggregateInputType | true;
    _avg?: RarityAvgAggregateInputType;
    _sum?: RaritySumAggregateInputType;
    _min?: RarityMinAggregateInputType;
    _max?: RarityMaxAggregateInputType;
  };

  export type RarityGroupByOutputType = {
    id: number;
    name: string;
    _count: RarityCountAggregateOutputType | null;
    _avg: RarityAvgAggregateOutputType | null;
    _sum: RaritySumAggregateOutputType | null;
    _min: RarityMinAggregateOutputType | null;
    _max: RarityMaxAggregateOutputType | null;
  };

  type GetRarityGroupByPayload<T extends RarityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RarityGroupByOutputType, T['by']> & {
        [P in keyof T & keyof RarityGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], RarityGroupByOutputType[P]>
          : GetScalarType<T[P], RarityGroupByOutputType[P]>;
      }
    >
  >;

  export type RaritySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        players?: boolean | Rarity$playersArgs<ExtArgs>;
        _count?: boolean | RarityCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['rarity']
    >;

  export type RaritySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
    },
    ExtArgs['result']['rarity']
  >;

  export type RaritySelectScalar = {
    id?: boolean;
    name?: boolean;
  };

  export type RarityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | Rarity$playersArgs<ExtArgs>;
    _count?: boolean | RarityCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type RarityIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $RarityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Rarity';
    objects: {
      players: Prisma.$PlayerPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        name: string;
      },
      ExtArgs['result']['rarity']
    >;
    composites: {};
  };

  type RarityGetPayload<S extends boolean | null | undefined | RarityDefaultArgs> =
    $Result.GetResult<Prisma.$RarityPayload, S>;

  type RarityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    RarityFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: RarityCountAggregateInputType | true;
  };

  export interface RarityDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rarity']; meta: { name: 'Rarity' } };
    /**
     * Find zero or one Rarity that matches the filter.
     * @param {RarityFindUniqueArgs} args - Arguments to find a Rarity
     * @example
     * // Get one Rarity
     * const rarity = await prisma.rarity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RarityFindUniqueArgs>(
      args: SelectSubset<T, RarityFindUniqueArgs<ExtArgs>>
    ): Prisma__RarityClient<
      $Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Rarity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RarityFindUniqueOrThrowArgs} args - Arguments to find a Rarity
     * @example
     * // Get one Rarity
     * const rarity = await prisma.rarity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RarityFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RarityFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RarityClient<
      $Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Rarity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RarityFindFirstArgs} args - Arguments to find a Rarity
     * @example
     * // Get one Rarity
     * const rarity = await prisma.rarity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RarityFindFirstArgs>(
      args?: SelectSubset<T, RarityFindFirstArgs<ExtArgs>>
    ): Prisma__RarityClient<
      $Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Rarity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RarityFindFirstOrThrowArgs} args - Arguments to find a Rarity
     * @example
     * // Get one Rarity
     * const rarity = await prisma.rarity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RarityFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RarityFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RarityClient<
      $Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Rarities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RarityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rarities
     * const rarities = await prisma.rarity.findMany()
     *
     * // Get first 10 Rarities
     * const rarities = await prisma.rarity.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const rarityWithIdOnly = await prisma.rarity.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RarityFindManyArgs>(
      args?: SelectSubset<T, RarityFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Rarity.
     * @param {RarityCreateArgs} args - Arguments to create a Rarity.
     * @example
     * // Create one Rarity
     * const Rarity = await prisma.rarity.create({
     *   data: {
     *     // ... data to create a Rarity
     *   }
     * })
     *
     */
    create<T extends RarityCreateArgs>(
      args: SelectSubset<T, RarityCreateArgs<ExtArgs>>
    ): Prisma__RarityClient<
      $Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Rarities.
     * @param {RarityCreateManyArgs} args - Arguments to create many Rarities.
     * @example
     * // Create many Rarities
     * const rarity = await prisma.rarity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RarityCreateManyArgs>(
      args?: SelectSubset<T, RarityCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Rarities and returns the data saved in the database.
     * @param {RarityCreateManyAndReturnArgs} args - Arguments to create many Rarities.
     * @example
     * // Create many Rarities
     * const rarity = await prisma.rarity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Rarities and only return the `id`
     * const rarityWithIdOnly = await prisma.rarity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RarityCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RarityCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Rarity.
     * @param {RarityDeleteArgs} args - Arguments to delete one Rarity.
     * @example
     * // Delete one Rarity
     * const Rarity = await prisma.rarity.delete({
     *   where: {
     *     // ... filter to delete one Rarity
     *   }
     * })
     *
     */
    delete<T extends RarityDeleteArgs>(
      args: SelectSubset<T, RarityDeleteArgs<ExtArgs>>
    ): Prisma__RarityClient<
      $Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Rarity.
     * @param {RarityUpdateArgs} args - Arguments to update one Rarity.
     * @example
     * // Update one Rarity
     * const rarity = await prisma.rarity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RarityUpdateArgs>(
      args: SelectSubset<T, RarityUpdateArgs<ExtArgs>>
    ): Prisma__RarityClient<
      $Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Rarities.
     * @param {RarityDeleteManyArgs} args - Arguments to filter Rarities to delete.
     * @example
     * // Delete a few Rarities
     * const { count } = await prisma.rarity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RarityDeleteManyArgs>(
      args?: SelectSubset<T, RarityDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Rarities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RarityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rarities
     * const rarity = await prisma.rarity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RarityUpdateManyArgs>(
      args: SelectSubset<T, RarityUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Rarity.
     * @param {RarityUpsertArgs} args - Arguments to update or create a Rarity.
     * @example
     * // Update or create a Rarity
     * const rarity = await prisma.rarity.upsert({
     *   create: {
     *     // ... data to create a Rarity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rarity we want to update
     *   }
     * })
     */
    upsert<T extends RarityUpsertArgs>(
      args: SelectSubset<T, RarityUpsertArgs<ExtArgs>>
    ): Prisma__RarityClient<
      $Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Rarities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RarityCountArgs} args - Arguments to filter Rarities to count.
     * @example
     * // Count the number of Rarities
     * const count = await prisma.rarity.count({
     *   where: {
     *     // ... the filter for the Rarities we want to count
     *   }
     * })
     **/
    count<T extends RarityCountArgs>(
      args?: Subset<T, RarityCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RarityCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Rarity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RarityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RarityAggregateArgs>(
      args: Subset<T, RarityAggregateArgs>
    ): Prisma.PrismaPromise<GetRarityAggregateType<T>>;

    /**
     * Group by Rarity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RarityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RarityGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RarityGroupByArgs['orderBy'] }
        : { orderBy?: RarityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RarityGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetRarityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Rarity model
     */
    readonly fields: RarityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rarity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RarityClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    players<T extends Rarity$playersArgs<ExtArgs> = {}>(
      args?: Subset<T, Rarity$playersArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Rarity model
   */
  interface RarityFieldRefs {
    readonly id: FieldRef<'Rarity', 'Int'>;
    readonly name: FieldRef<'Rarity', 'String'>;
  }

  // Custom InputTypes
  /**
   * Rarity findUnique
   */
  export type RarityFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Rarity
     */
    select?: RaritySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RarityInclude<ExtArgs> | null;
    /**
     * Filter, which Rarity to fetch.
     */
    where: RarityWhereUniqueInput;
  };

  /**
   * Rarity findUniqueOrThrow
   */
  export type RarityFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Rarity
     */
    select?: RaritySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RarityInclude<ExtArgs> | null;
    /**
     * Filter, which Rarity to fetch.
     */
    where: RarityWhereUniqueInput;
  };

  /**
   * Rarity findFirst
   */
  export type RarityFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Rarity
     */
    select?: RaritySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RarityInclude<ExtArgs> | null;
    /**
     * Filter, which Rarity to fetch.
     */
    where?: RarityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rarities to fetch.
     */
    orderBy?: RarityOrderByWithRelationInput | RarityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rarities.
     */
    cursor?: RarityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rarities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rarities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rarities.
     */
    distinct?: RarityScalarFieldEnum | RarityScalarFieldEnum[];
  };

  /**
   * Rarity findFirstOrThrow
   */
  export type RarityFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Rarity
     */
    select?: RaritySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RarityInclude<ExtArgs> | null;
    /**
     * Filter, which Rarity to fetch.
     */
    where?: RarityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rarities to fetch.
     */
    orderBy?: RarityOrderByWithRelationInput | RarityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rarities.
     */
    cursor?: RarityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rarities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rarities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rarities.
     */
    distinct?: RarityScalarFieldEnum | RarityScalarFieldEnum[];
  };

  /**
   * Rarity findMany
   */
  export type RarityFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Rarity
     */
    select?: RaritySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RarityInclude<ExtArgs> | null;
    /**
     * Filter, which Rarities to fetch.
     */
    where?: RarityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rarities to fetch.
     */
    orderBy?: RarityOrderByWithRelationInput | RarityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Rarities.
     */
    cursor?: RarityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rarities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rarities.
     */
    skip?: number;
    distinct?: RarityScalarFieldEnum | RarityScalarFieldEnum[];
  };

  /**
   * Rarity create
   */
  export type RarityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Rarity
       */
      select?: RaritySelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: RarityInclude<ExtArgs> | null;
      /**
       * The data needed to create a Rarity.
       */
      data: XOR<RarityCreateInput, RarityUncheckedCreateInput>;
    };

  /**
   * Rarity createMany
   */
  export type RarityCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Rarities.
     */
    data: RarityCreateManyInput | RarityCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Rarity createManyAndReturn
   */
  export type RarityCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Rarity
     */
    select?: RaritySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Rarities.
     */
    data: RarityCreateManyInput | RarityCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Rarity update
   */
  export type RarityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Rarity
       */
      select?: RaritySelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: RarityInclude<ExtArgs> | null;
      /**
       * The data needed to update a Rarity.
       */
      data: XOR<RarityUpdateInput, RarityUncheckedUpdateInput>;
      /**
       * Choose, which Rarity to update.
       */
      where: RarityWhereUniqueInput;
    };

  /**
   * Rarity updateMany
   */
  export type RarityUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Rarities.
     */
    data: XOR<RarityUpdateManyMutationInput, RarityUncheckedUpdateManyInput>;
    /**
     * Filter which Rarities to update
     */
    where?: RarityWhereInput;
  };

  /**
   * Rarity upsert
   */
  export type RarityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Rarity
       */
      select?: RaritySelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: RarityInclude<ExtArgs> | null;
      /**
       * The filter to search for the Rarity to update in case it exists.
       */
      where: RarityWhereUniqueInput;
      /**
       * In case the Rarity found by the `where` argument doesn't exist, create a new Rarity with this data.
       */
      create: XOR<RarityCreateInput, RarityUncheckedCreateInput>;
      /**
       * In case the Rarity was found with the provided `where` argument, update it with this data.
       */
      update: XOR<RarityUpdateInput, RarityUncheckedUpdateInput>;
    };

  /**
   * Rarity delete
   */
  export type RarityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Rarity
       */
      select?: RaritySelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: RarityInclude<ExtArgs> | null;
      /**
       * Filter which Rarity to delete.
       */
      where: RarityWhereUniqueInput;
    };

  /**
   * Rarity deleteMany
   */
  export type RarityDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Rarities to delete
     */
    where?: RarityWhereInput;
  };

  /**
   * Rarity.players
   */
  export type Rarity$playersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null;
    where?: PlayerWhereInput;
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[];
    cursor?: PlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[];
  };

  /**
   * Rarity without action
   */
  export type RarityDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Rarity
     */
    select?: RaritySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RarityInclude<ExtArgs> | null;
  };

  /**
   * Model Country
   */

  export type AggregateCountry = {
    _count: CountryCountAggregateOutputType | null;
    _avg: CountryAvgAggregateOutputType | null;
    _sum: CountrySumAggregateOutputType | null;
    _min: CountryMinAggregateOutputType | null;
    _max: CountryMaxAggregateOutputType | null;
  };

  export type CountryAvgAggregateOutputType = {
    id: number | null;
  };

  export type CountrySumAggregateOutputType = {
    id: number | null;
  };

  export type CountryMinAggregateOutputType = {
    id: number | null;
    name: string | null;
  };

  export type CountryMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
  };

  export type CountryCountAggregateOutputType = {
    id: number;
    name: number;
    _all: number;
  };

  export type CountryAvgAggregateInputType = {
    id?: true;
  };

  export type CountrySumAggregateInputType = {
    id?: true;
  };

  export type CountryMinAggregateInputType = {
    id?: true;
    name?: true;
  };

  export type CountryMaxAggregateInputType = {
    id?: true;
    name?: true;
  };

  export type CountryCountAggregateInputType = {
    id?: true;
    name?: true;
    _all?: true;
  };

  export type CountryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Country to aggregate.
     */
    where?: CountryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CountryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Countries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Countries
     **/
    _count?: true | CountryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: CountryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: CountrySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CountryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CountryMaxAggregateInputType;
  };

  export type GetCountryAggregateType<T extends CountryAggregateArgs> = {
    [P in keyof T & keyof AggregateCountry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountry[P]>
      : GetScalarType<T[P], AggregateCountry[P]>;
  };

  export type CountryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CountryWhereInput;
    orderBy?: CountryOrderByWithAggregationInput | CountryOrderByWithAggregationInput[];
    by: CountryScalarFieldEnum[] | CountryScalarFieldEnum;
    having?: CountryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CountryCountAggregateInputType | true;
    _avg?: CountryAvgAggregateInputType;
    _sum?: CountrySumAggregateInputType;
    _min?: CountryMinAggregateInputType;
    _max?: CountryMaxAggregateInputType;
  };

  export type CountryGroupByOutputType = {
    id: number;
    name: string;
    _count: CountryCountAggregateOutputType | null;
    _avg: CountryAvgAggregateOutputType | null;
    _sum: CountrySumAggregateOutputType | null;
    _min: CountryMinAggregateOutputType | null;
    _max: CountryMaxAggregateOutputType | null;
  };

  type GetCountryGroupByPayload<T extends CountryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountryGroupByOutputType, T['by']> & {
        [P in keyof T & keyof CountryGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], CountryGroupByOutputType[P]>
          : GetScalarType<T[P], CountryGroupByOutputType[P]>;
      }
    >
  >;

  export type CountrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        clubs?: boolean | Country$clubsArgs<ExtArgs>;
        leagues?: boolean | Country$leaguesArgs<ExtArgs>;
        players?: boolean | Country$playersArgs<ExtArgs>;
        _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['country']
    >;

  export type CountrySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
    },
    ExtArgs['result']['country']
  >;

  export type CountrySelectScalar = {
    id?: boolean;
    name?: boolean;
  };

  export type CountryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clubs?: boolean | Country$clubsArgs<ExtArgs>;
    leagues?: boolean | Country$leaguesArgs<ExtArgs>;
    players?: boolean | Country$playersArgs<ExtArgs>;
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type CountryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $CountryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Country';
      objects: {
        clubs: Prisma.$ClubPayload<ExtArgs>[];
        leagues: Prisma.$LeaguePayload<ExtArgs>[];
        players: Prisma.$PlayerPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: number;
          name: string;
        },
        ExtArgs['result']['country']
      >;
      composites: {};
    };

  type CountryGetPayload<S extends boolean | null | undefined | CountryDefaultArgs> =
    $Result.GetResult<Prisma.$CountryPayload, S>;

  type CountryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    CountryFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: CountryCountAggregateInputType | true;
  };

  export interface CountryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Country']; meta: { name: 'Country' } };
    /**
     * Find zero or one Country that matches the filter.
     * @param {CountryFindUniqueArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CountryFindUniqueArgs>(
      args: SelectSubset<T, CountryFindUniqueArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Country that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CountryFindUniqueOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CountryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CountryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Country that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CountryFindFirstArgs>(
      args?: SelectSubset<T, CountryFindFirstArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Country that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CountryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CountryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Countries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Countries
     * const countries = await prisma.country.findMany()
     *
     * // Get first 10 Countries
     * const countries = await prisma.country.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const countryWithIdOnly = await prisma.country.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CountryFindManyArgs>(
      args?: SelectSubset<T, CountryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Country.
     * @param {CountryCreateArgs} args - Arguments to create a Country.
     * @example
     * // Create one Country
     * const Country = await prisma.country.create({
     *   data: {
     *     // ... data to create a Country
     *   }
     * })
     *
     */
    create<T extends CountryCreateArgs>(
      args: SelectSubset<T, CountryCreateArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Countries.
     * @param {CountryCreateManyArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CountryCreateManyArgs>(
      args?: SelectSubset<T, CountryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Countries and returns the data saved in the database.
     * @param {CountryCreateManyAndReturnArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Countries and only return the `id`
     * const countryWithIdOnly = await prisma.country.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CountryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CountryCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Country.
     * @param {CountryDeleteArgs} args - Arguments to delete one Country.
     * @example
     * // Delete one Country
     * const Country = await prisma.country.delete({
     *   where: {
     *     // ... filter to delete one Country
     *   }
     * })
     *
     */
    delete<T extends CountryDeleteArgs>(
      args: SelectSubset<T, CountryDeleteArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Country.
     * @param {CountryUpdateArgs} args - Arguments to update one Country.
     * @example
     * // Update one Country
     * const country = await prisma.country.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CountryUpdateArgs>(
      args: SelectSubset<T, CountryUpdateArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Countries.
     * @param {CountryDeleteManyArgs} args - Arguments to filter Countries to delete.
     * @example
     * // Delete a few Countries
     * const { count } = await prisma.country.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CountryDeleteManyArgs>(
      args?: SelectSubset<T, CountryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CountryUpdateManyArgs>(
      args: SelectSubset<T, CountryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Country.
     * @param {CountryUpsertArgs} args - Arguments to update or create a Country.
     * @example
     * // Update or create a Country
     * const country = await prisma.country.upsert({
     *   create: {
     *     // ... data to create a Country
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Country we want to update
     *   }
     * })
     */
    upsert<T extends CountryUpsertArgs>(
      args: SelectSubset<T, CountryUpsertArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryCountArgs} args - Arguments to filter Countries to count.
     * @example
     * // Count the number of Countries
     * const count = await prisma.country.count({
     *   where: {
     *     // ... the filter for the Countries we want to count
     *   }
     * })
     **/
    count<T extends CountryCountArgs>(
      args?: Subset<T, CountryCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CountryAggregateArgs>(
      args: Subset<T, CountryAggregateArgs>
    ): Prisma.PrismaPromise<GetCountryAggregateType<T>>;

    /**
     * Group by Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CountryGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CountryGroupByArgs['orderBy'] }
        : { orderBy?: CountryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, CountryGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetCountryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Country model
     */
    readonly fields: CountryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Country.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CountryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    clubs<T extends Country$clubsArgs<ExtArgs> = {}>(
      args?: Subset<T, Country$clubsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'findMany'> | Null>;
    leagues<T extends Country$leaguesArgs<ExtArgs> = {}>(
      args?: Subset<T, Country$leaguesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'findMany'> | Null
    >;
    players<T extends Country$playersArgs<ExtArgs> = {}>(
      args?: Subset<T, Country$playersArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Country model
   */
  interface CountryFieldRefs {
    readonly id: FieldRef<'Country', 'Int'>;
    readonly name: FieldRef<'Country', 'String'>;
  }

  // Custom InputTypes
  /**
   * Country findUnique
   */
  export type CountryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null;
    /**
     * Filter, which Country to fetch.
     */
    where: CountryWhereUniqueInput;
  };

  /**
   * Country findUniqueOrThrow
   */
  export type CountryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null;
    /**
     * Filter, which Country to fetch.
     */
    where: CountryWhereUniqueInput;
  };

  /**
   * Country findFirst
   */
  export type CountryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null;
    /**
     * Filter, which Country to fetch.
     */
    where?: CountryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Countries.
     */
    cursor?: CountryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Countries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[];
  };

  /**
   * Country findFirstOrThrow
   */
  export type CountryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null;
    /**
     * Filter, which Country to fetch.
     */
    where?: CountryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Countries.
     */
    cursor?: CountryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Countries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[];
  };

  /**
   * Country findMany
   */
  export type CountryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null;
    /**
     * Filter, which Countries to fetch.
     */
    where?: CountryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Countries.
     */
    cursor?: CountryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Countries.
     */
    skip?: number;
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[];
  };

  /**
   * Country create
   */
  export type CountryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null;
    /**
     * The data needed to create a Country.
     */
    data: XOR<CountryCreateInput, CountryUncheckedCreateInput>;
  };

  /**
   * Country createMany
   */
  export type CountryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Countries.
     */
    data: CountryCreateManyInput | CountryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Country createManyAndReturn
   */
  export type CountryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Countries.
     */
    data: CountryCreateManyInput | CountryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Country update
   */
  export type CountryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null;
    /**
     * The data needed to update a Country.
     */
    data: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>;
    /**
     * Choose, which Country to update.
     */
    where: CountryWhereUniqueInput;
  };

  /**
   * Country updateMany
   */
  export type CountryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Countries.
     */
    data: XOR<CountryUpdateManyMutationInput, CountryUncheckedUpdateManyInput>;
    /**
     * Filter which Countries to update
     */
    where?: CountryWhereInput;
  };

  /**
   * Country upsert
   */
  export type CountryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null;
    /**
     * The filter to search for the Country to update in case it exists.
     */
    where: CountryWhereUniqueInput;
    /**
     * In case the Country found by the `where` argument doesn't exist, create a new Country with this data.
     */
    create: XOR<CountryCreateInput, CountryUncheckedCreateInput>;
    /**
     * In case the Country was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>;
  };

  /**
   * Country delete
   */
  export type CountryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null;
    /**
     * Filter which Country to delete.
     */
    where: CountryWhereUniqueInput;
  };

  /**
   * Country deleteMany
   */
  export type CountryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Countries to delete
     */
    where?: CountryWhereInput;
  };

  /**
   * Country.clubs
   */
  export type Country$clubsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null;
    where?: ClubWhereInput;
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[];
    cursor?: ClubWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[];
  };

  /**
   * Country.leagues
   */
  export type Country$leaguesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the League
     */
    select?: LeagueSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeagueInclude<ExtArgs> | null;
    where?: LeagueWhereInput;
    orderBy?: LeagueOrderByWithRelationInput | LeagueOrderByWithRelationInput[];
    cursor?: LeagueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: LeagueScalarFieldEnum | LeagueScalarFieldEnum[];
  };

  /**
   * Country.players
   */
  export type Country$playersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null;
    where?: PlayerWhereInput;
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[];
    cursor?: PlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[];
  };

  /**
   * Country without action
   */
  export type CountryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null;
  };

  /**
   * Model Position
   */

  export type AggregatePosition = {
    _count: PositionCountAggregateOutputType | null;
    _avg: PositionAvgAggregateOutputType | null;
    _sum: PositionSumAggregateOutputType | null;
    _min: PositionMinAggregateOutputType | null;
    _max: PositionMaxAggregateOutputType | null;
  };

  export type PositionAvgAggregateOutputType = {
    id: number | null;
  };

  export type PositionSumAggregateOutputType = {
    id: number | null;
  };

  export type PositionMinAggregateOutputType = {
    id: number | null;
    name: string | null;
  };

  export type PositionMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
  };

  export type PositionCountAggregateOutputType = {
    id: number;
    name: number;
    _all: number;
  };

  export type PositionAvgAggregateInputType = {
    id?: true;
  };

  export type PositionSumAggregateInputType = {
    id?: true;
  };

  export type PositionMinAggregateInputType = {
    id?: true;
    name?: true;
  };

  export type PositionMaxAggregateInputType = {
    id?: true;
    name?: true;
  };

  export type PositionCountAggregateInputType = {
    id?: true;
    name?: true;
    _all?: true;
  };

  export type PositionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Position to aggregate.
     */
    where?: PositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Positions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Positions
     **/
    _count?: true | PositionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: PositionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: PositionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PositionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PositionMaxAggregateInputType;
  };

  export type GetPositionAggregateType<T extends PositionAggregateArgs> = {
    [P in keyof T & keyof AggregatePosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosition[P]>
      : GetScalarType<T[P], AggregatePosition[P]>;
  };

  export type PositionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PositionWhereInput;
    orderBy?: PositionOrderByWithAggregationInput | PositionOrderByWithAggregationInput[];
    by: PositionScalarFieldEnum[] | PositionScalarFieldEnum;
    having?: PositionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PositionCountAggregateInputType | true;
    _avg?: PositionAvgAggregateInputType;
    _sum?: PositionSumAggregateInputType;
    _min?: PositionMinAggregateInputType;
    _max?: PositionMaxAggregateInputType;
  };

  export type PositionGroupByOutputType = {
    id: number;
    name: string;
    _count: PositionCountAggregateOutputType | null;
    _avg: PositionAvgAggregateOutputType | null;
    _sum: PositionSumAggregateOutputType | null;
    _min: PositionMinAggregateOutputType | null;
    _max: PositionMaxAggregateOutputType | null;
  };

  type GetPositionGroupByPayload<T extends PositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PositionGroupByOutputType, T['by']> & {
        [P in keyof T & keyof PositionGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], PositionGroupByOutputType[P]>
          : GetScalarType<T[P], PositionGroupByOutputType[P]>;
      }
    >
  >;

  export type PositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        players?: boolean | Position$playersArgs<ExtArgs>;
        _count?: boolean | PositionCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['position']
    >;

  export type PositionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
    },
    ExtArgs['result']['position']
  >;

  export type PositionSelectScalar = {
    id?: boolean;
    name?: boolean;
  };

  export type PositionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      players?: boolean | Position$playersArgs<ExtArgs>;
      _count?: boolean | PositionCountOutputTypeDefaultArgs<ExtArgs>;
    };
  export type PositionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $PositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Position';
      objects: {
        players: Prisma.$PlayerPositionPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: number;
          name: string;
        },
        ExtArgs['result']['position']
      >;
      composites: {};
    };

  type PositionGetPayload<S extends boolean | null | undefined | PositionDefaultArgs> =
    $Result.GetResult<Prisma.$PositionPayload, S>;

  type PositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    PositionFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: PositionCountAggregateInputType | true;
  };

  export interface PositionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Position'];
      meta: { name: 'Position' };
    };
    /**
     * Find zero or one Position that matches the filter.
     * @param {PositionFindUniqueArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PositionFindUniqueArgs>(
      args: SelectSubset<T, PositionFindUniqueArgs<ExtArgs>>
    ): Prisma__PositionClient<
      $Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Position that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PositionFindUniqueOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PositionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PositionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PositionClient<
      $Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Position that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PositionFindFirstArgs>(
      args?: SelectSubset<T, PositionFindFirstArgs<ExtArgs>>
    ): Prisma__PositionClient<
      $Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Position that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PositionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PositionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PositionClient<
      $Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Positions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Positions
     * const positions = await prisma.position.findMany()
     *
     * // Get first 10 Positions
     * const positions = await prisma.position.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const positionWithIdOnly = await prisma.position.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PositionFindManyArgs>(
      args?: SelectSubset<T, PositionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Position.
     * @param {PositionCreateArgs} args - Arguments to create a Position.
     * @example
     * // Create one Position
     * const Position = await prisma.position.create({
     *   data: {
     *     // ... data to create a Position
     *   }
     * })
     *
     */
    create<T extends PositionCreateArgs>(
      args: SelectSubset<T, PositionCreateArgs<ExtArgs>>
    ): Prisma__PositionClient<
      $Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Positions.
     * @param {PositionCreateManyArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PositionCreateManyArgs>(
      args?: SelectSubset<T, PositionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Positions and returns the data saved in the database.
     * @param {PositionCreateManyAndReturnArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Positions and only return the `id`
     * const positionWithIdOnly = await prisma.position.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PositionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PositionCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Position.
     * @param {PositionDeleteArgs} args - Arguments to delete one Position.
     * @example
     * // Delete one Position
     * const Position = await prisma.position.delete({
     *   where: {
     *     // ... filter to delete one Position
     *   }
     * })
     *
     */
    delete<T extends PositionDeleteArgs>(
      args: SelectSubset<T, PositionDeleteArgs<ExtArgs>>
    ): Prisma__PositionClient<
      $Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Position.
     * @param {PositionUpdateArgs} args - Arguments to update one Position.
     * @example
     * // Update one Position
     * const position = await prisma.position.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PositionUpdateArgs>(
      args: SelectSubset<T, PositionUpdateArgs<ExtArgs>>
    ): Prisma__PositionClient<
      $Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Positions.
     * @param {PositionDeleteManyArgs} args - Arguments to filter Positions to delete.
     * @example
     * // Delete a few Positions
     * const { count } = await prisma.position.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PositionDeleteManyArgs>(
      args?: SelectSubset<T, PositionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Positions
     * const position = await prisma.position.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PositionUpdateManyArgs>(
      args: SelectSubset<T, PositionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Position.
     * @param {PositionUpsertArgs} args - Arguments to update or create a Position.
     * @example
     * // Update or create a Position
     * const position = await prisma.position.upsert({
     *   create: {
     *     // ... data to create a Position
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Position we want to update
     *   }
     * })
     */
    upsert<T extends PositionUpsertArgs>(
      args: SelectSubset<T, PositionUpsertArgs<ExtArgs>>
    ): Prisma__PositionClient<
      $Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionCountArgs} args - Arguments to filter Positions to count.
     * @example
     * // Count the number of Positions
     * const count = await prisma.position.count({
     *   where: {
     *     // ... the filter for the Positions we want to count
     *   }
     * })
     **/
    count<T extends PositionCountArgs>(
      args?: Subset<T, PositionCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PositionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PositionAggregateArgs>(
      args: Subset<T, PositionAggregateArgs>
    ): Prisma.PrismaPromise<GetPositionAggregateType<T>>;

    /**
     * Group by Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PositionGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PositionGroupByArgs['orderBy'] }
        : { orderBy?: PositionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, PositionGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetPositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Position model
     */
    readonly fields: PositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Position.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PositionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    players<T extends Position$playersArgs<ExtArgs> = {}>(
      args?: Subset<T, Position$playersArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Position model
   */
  interface PositionFieldRefs {
    readonly id: FieldRef<'Position', 'Int'>;
    readonly name: FieldRef<'Position', 'String'>;
  }

  // Custom InputTypes
  /**
   * Position findUnique
   */
  export type PositionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null;
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput;
  };

  /**
   * Position findUniqueOrThrow
   */
  export type PositionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null;
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput;
  };

  /**
   * Position findFirst
   */
  export type PositionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null;
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Positions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[];
  };

  /**
   * Position findFirstOrThrow
   */
  export type PositionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null;
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Positions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[];
  };

  /**
   * Position findMany
   */
  export type PositionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null;
    /**
     * Filter, which Positions to fetch.
     */
    where?: PositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Positions.
     */
    cursor?: PositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Positions.
     */
    skip?: number;
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[];
  };

  /**
   * Position create
   */
  export type PositionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Position.
     */
    data: XOR<PositionCreateInput, PositionUncheckedCreateInput>;
  };

  /**
   * Position createMany
   */
  export type PositionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Position createManyAndReturn
   */
  export type PositionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Position update
   */
  export type PositionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Position.
     */
    data: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>;
    /**
     * Choose, which Position to update.
     */
    where: PositionWhereUniqueInput;
  };

  /**
   * Position updateMany
   */
  export type PositionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Positions.
     */
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyInput>;
    /**
     * Filter which Positions to update
     */
    where?: PositionWhereInput;
  };

  /**
   * Position upsert
   */
  export type PositionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Position to update in case it exists.
     */
    where: PositionWhereUniqueInput;
    /**
     * In case the Position found by the `where` argument doesn't exist, create a new Position with this data.
     */
    create: XOR<PositionCreateInput, PositionUncheckedCreateInput>;
    /**
     * In case the Position was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>;
  };

  /**
   * Position delete
   */
  export type PositionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null;
    /**
     * Filter which Position to delete.
     */
    where: PositionWhereUniqueInput;
  };

  /**
   * Position deleteMany
   */
  export type PositionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Positions to delete
     */
    where?: PositionWhereInput;
  };

  /**
   * Position.players
   */
  export type Position$playersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    where?: PlayerPositionWhereInput;
    orderBy?: PlayerPositionOrderByWithRelationInput | PlayerPositionOrderByWithRelationInput[];
    cursor?: PlayerPositionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PlayerPositionScalarFieldEnum | PlayerPositionScalarFieldEnum[];
  };

  /**
   * Position without action
   */
  export type PositionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null;
  };

  /**
   * Model PlayerPosition
   */

  export type AggregatePlayerPosition = {
    _count: PlayerPositionCountAggregateOutputType | null;
    _avg: PlayerPositionAvgAggregateOutputType | null;
    _sum: PlayerPositionSumAggregateOutputType | null;
    _min: PlayerPositionMinAggregateOutputType | null;
    _max: PlayerPositionMaxAggregateOutputType | null;
  };

  export type PlayerPositionAvgAggregateOutputType = {
    id: number | null;
    playerId: number | null;
    positionId: number | null;
  };

  export type PlayerPositionSumAggregateOutputType = {
    id: number | null;
    playerId: number | null;
    positionId: number | null;
  };

  export type PlayerPositionMinAggregateOutputType = {
    id: number | null;
    playerId: number | null;
    positionId: number | null;
  };

  export type PlayerPositionMaxAggregateOutputType = {
    id: number | null;
    playerId: number | null;
    positionId: number | null;
  };

  export type PlayerPositionCountAggregateOutputType = {
    id: number;
    playerId: number;
    positionId: number;
    _all: number;
  };

  export type PlayerPositionAvgAggregateInputType = {
    id?: true;
    playerId?: true;
    positionId?: true;
  };

  export type PlayerPositionSumAggregateInputType = {
    id?: true;
    playerId?: true;
    positionId?: true;
  };

  export type PlayerPositionMinAggregateInputType = {
    id?: true;
    playerId?: true;
    positionId?: true;
  };

  export type PlayerPositionMaxAggregateInputType = {
    id?: true;
    playerId?: true;
    positionId?: true;
  };

  export type PlayerPositionCountAggregateInputType = {
    id?: true;
    playerId?: true;
    positionId?: true;
    _all?: true;
  };

  export type PlayerPositionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which PlayerPosition to aggregate.
     */
    where?: PlayerPositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PlayerPositions to fetch.
     */
    orderBy?: PlayerPositionOrderByWithRelationInput | PlayerPositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PlayerPositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PlayerPositions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PlayerPositions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PlayerPositions
     **/
    _count?: true | PlayerPositionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: PlayerPositionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: PlayerPositionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PlayerPositionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PlayerPositionMaxAggregateInputType;
  };

  export type GetPlayerPositionAggregateType<T extends PlayerPositionAggregateArgs> = {
    [P in keyof T & keyof AggregatePlayerPosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayerPosition[P]>
      : GetScalarType<T[P], AggregatePlayerPosition[P]>;
  };

  export type PlayerPositionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PlayerPositionWhereInput;
    orderBy?:
      | PlayerPositionOrderByWithAggregationInput
      | PlayerPositionOrderByWithAggregationInput[];
    by: PlayerPositionScalarFieldEnum[] | PlayerPositionScalarFieldEnum;
    having?: PlayerPositionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PlayerPositionCountAggregateInputType | true;
    _avg?: PlayerPositionAvgAggregateInputType;
    _sum?: PlayerPositionSumAggregateInputType;
    _min?: PlayerPositionMinAggregateInputType;
    _max?: PlayerPositionMaxAggregateInputType;
  };

  export type PlayerPositionGroupByOutputType = {
    id: number;
    playerId: number;
    positionId: number;
    _count: PlayerPositionCountAggregateOutputType | null;
    _avg: PlayerPositionAvgAggregateOutputType | null;
    _sum: PlayerPositionSumAggregateOutputType | null;
    _min: PlayerPositionMinAggregateOutputType | null;
    _max: PlayerPositionMaxAggregateOutputType | null;
  };

  type GetPlayerPositionGroupByPayload<T extends PlayerPositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerPositionGroupByOutputType, T['by']> & {
        [P in keyof T & keyof PlayerPositionGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], PlayerPositionGroupByOutputType[P]>
          : GetScalarType<T[P], PlayerPositionGroupByOutputType[P]>;
      }
    >
  >;

  export type PlayerPositionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      playerId?: boolean;
      positionId?: boolean;
      player?: boolean | PlayerDefaultArgs<ExtArgs>;
      position?: boolean | PositionDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['playerPosition']
  >;

  export type PlayerPositionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      playerId?: boolean;
      positionId?: boolean;
      player?: boolean | PlayerDefaultArgs<ExtArgs>;
      position?: boolean | PositionDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['playerPosition']
  >;

  export type PlayerPositionSelectScalar = {
    id?: boolean;
    playerId?: boolean;
    positionId?: boolean;
  };

  export type PlayerPositionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>;
    position?: boolean | PositionDefaultArgs<ExtArgs>;
  };
  export type PlayerPositionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>;
    position?: boolean | PositionDefaultArgs<ExtArgs>;
  };

  export type $PlayerPositionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'PlayerPosition';
    objects: {
      player: Prisma.$PlayerPayload<ExtArgs>;
      position: Prisma.$PositionPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        playerId: number;
        positionId: number;
      },
      ExtArgs['result']['playerPosition']
    >;
    composites: {};
  };

  type PlayerPositionGetPayload<S extends boolean | null | undefined | PlayerPositionDefaultArgs> =
    $Result.GetResult<Prisma.$PlayerPositionPayload, S>;

  type PlayerPositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerPositionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlayerPositionCountAggregateInputType | true;
    };

  export interface PlayerPositionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['PlayerPosition'];
      meta: { name: 'PlayerPosition' };
    };
    /**
     * Find zero or one PlayerPosition that matches the filter.
     * @param {PlayerPositionFindUniqueArgs} args - Arguments to find a PlayerPosition
     * @example
     * // Get one PlayerPosition
     * const playerPosition = await prisma.playerPosition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerPositionFindUniqueArgs>(
      args: SelectSubset<T, PlayerPositionFindUniqueArgs<ExtArgs>>
    ): Prisma__PlayerPositionClient<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one PlayerPosition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerPositionFindUniqueOrThrowArgs} args - Arguments to find a PlayerPosition
     * @example
     * // Get one PlayerPosition
     * const playerPosition = await prisma.playerPosition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerPositionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PlayerPositionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PlayerPositionClient<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first PlayerPosition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerPositionFindFirstArgs} args - Arguments to find a PlayerPosition
     * @example
     * // Get one PlayerPosition
     * const playerPosition = await prisma.playerPosition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerPositionFindFirstArgs>(
      args?: SelectSubset<T, PlayerPositionFindFirstArgs<ExtArgs>>
    ): Prisma__PlayerPositionClient<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first PlayerPosition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerPositionFindFirstOrThrowArgs} args - Arguments to find a PlayerPosition
     * @example
     * // Get one PlayerPosition
     * const playerPosition = await prisma.playerPosition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerPositionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PlayerPositionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PlayerPositionClient<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more PlayerPositions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerPositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlayerPositions
     * const playerPositions = await prisma.playerPosition.findMany()
     *
     * // Get first 10 PlayerPositions
     * const playerPositions = await prisma.playerPosition.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const playerPositionWithIdOnly = await prisma.playerPosition.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PlayerPositionFindManyArgs>(
      args?: SelectSubset<T, PlayerPositionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a PlayerPosition.
     * @param {PlayerPositionCreateArgs} args - Arguments to create a PlayerPosition.
     * @example
     * // Create one PlayerPosition
     * const PlayerPosition = await prisma.playerPosition.create({
     *   data: {
     *     // ... data to create a PlayerPosition
     *   }
     * })
     *
     */
    create<T extends PlayerPositionCreateArgs>(
      args: SelectSubset<T, PlayerPositionCreateArgs<ExtArgs>>
    ): Prisma__PlayerPositionClient<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many PlayerPositions.
     * @param {PlayerPositionCreateManyArgs} args - Arguments to create many PlayerPositions.
     * @example
     * // Create many PlayerPositions
     * const playerPosition = await prisma.playerPosition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PlayerPositionCreateManyArgs>(
      args?: SelectSubset<T, PlayerPositionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many PlayerPositions and returns the data saved in the database.
     * @param {PlayerPositionCreateManyAndReturnArgs} args - Arguments to create many PlayerPositions.
     * @example
     * // Create many PlayerPositions
     * const playerPosition = await prisma.playerPosition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PlayerPositions and only return the `id`
     * const playerPositionWithIdOnly = await prisma.playerPosition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PlayerPositionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PlayerPositionCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a PlayerPosition.
     * @param {PlayerPositionDeleteArgs} args - Arguments to delete one PlayerPosition.
     * @example
     * // Delete one PlayerPosition
     * const PlayerPosition = await prisma.playerPosition.delete({
     *   where: {
     *     // ... filter to delete one PlayerPosition
     *   }
     * })
     *
     */
    delete<T extends PlayerPositionDeleteArgs>(
      args: SelectSubset<T, PlayerPositionDeleteArgs<ExtArgs>>
    ): Prisma__PlayerPositionClient<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one PlayerPosition.
     * @param {PlayerPositionUpdateArgs} args - Arguments to update one PlayerPosition.
     * @example
     * // Update one PlayerPosition
     * const playerPosition = await prisma.playerPosition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PlayerPositionUpdateArgs>(
      args: SelectSubset<T, PlayerPositionUpdateArgs<ExtArgs>>
    ): Prisma__PlayerPositionClient<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more PlayerPositions.
     * @param {PlayerPositionDeleteManyArgs} args - Arguments to filter PlayerPositions to delete.
     * @example
     * // Delete a few PlayerPositions
     * const { count } = await prisma.playerPosition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PlayerPositionDeleteManyArgs>(
      args?: SelectSubset<T, PlayerPositionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more PlayerPositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerPositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlayerPositions
     * const playerPosition = await prisma.playerPosition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PlayerPositionUpdateManyArgs>(
      args: SelectSubset<T, PlayerPositionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one PlayerPosition.
     * @param {PlayerPositionUpsertArgs} args - Arguments to update or create a PlayerPosition.
     * @example
     * // Update or create a PlayerPosition
     * const playerPosition = await prisma.playerPosition.upsert({
     *   create: {
     *     // ... data to create a PlayerPosition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlayerPosition we want to update
     *   }
     * })
     */
    upsert<T extends PlayerPositionUpsertArgs>(
      args: SelectSubset<T, PlayerPositionUpsertArgs<ExtArgs>>
    ): Prisma__PlayerPositionClient<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of PlayerPositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerPositionCountArgs} args - Arguments to filter PlayerPositions to count.
     * @example
     * // Count the number of PlayerPositions
     * const count = await prisma.playerPosition.count({
     *   where: {
     *     // ... the filter for the PlayerPositions we want to count
     *   }
     * })
     **/
    count<T extends PlayerPositionCountArgs>(
      args?: Subset<T, PlayerPositionCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerPositionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a PlayerPosition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerPositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PlayerPositionAggregateArgs>(
      args: Subset<T, PlayerPositionAggregateArgs>
    ): Prisma.PrismaPromise<GetPlayerPositionAggregateType<T>>;

    /**
     * Group by PlayerPosition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerPositionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PlayerPositionGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerPositionGroupByArgs['orderBy'] }
        : { orderBy?: PlayerPositionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, PlayerPositionGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetPlayerPositionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PlayerPosition model
     */
    readonly fields: PlayerPositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlayerPosition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerPositionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, PlayerDefaultArgs<ExtArgs>>
    ): Prisma__PlayerClient<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    position<T extends PositionDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, PositionDefaultArgs<ExtArgs>>
    ): Prisma__PositionClient<
      $Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the PlayerPosition model
   */
  interface PlayerPositionFieldRefs {
    readonly id: FieldRef<'PlayerPosition', 'Int'>;
    readonly playerId: FieldRef<'PlayerPosition', 'Int'>;
    readonly positionId: FieldRef<'PlayerPosition', 'Int'>;
  }

  // Custom InputTypes
  /**
   * PlayerPosition findUnique
   */
  export type PlayerPositionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    /**
     * Filter, which PlayerPosition to fetch.
     */
    where: PlayerPositionWhereUniqueInput;
  };

  /**
   * PlayerPosition findUniqueOrThrow
   */
  export type PlayerPositionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    /**
     * Filter, which PlayerPosition to fetch.
     */
    where: PlayerPositionWhereUniqueInput;
  };

  /**
   * PlayerPosition findFirst
   */
  export type PlayerPositionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    /**
     * Filter, which PlayerPosition to fetch.
     */
    where?: PlayerPositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PlayerPositions to fetch.
     */
    orderBy?: PlayerPositionOrderByWithRelationInput | PlayerPositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PlayerPositions.
     */
    cursor?: PlayerPositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PlayerPositions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PlayerPositions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PlayerPositions.
     */
    distinct?: PlayerPositionScalarFieldEnum | PlayerPositionScalarFieldEnum[];
  };

  /**
   * PlayerPosition findFirstOrThrow
   */
  export type PlayerPositionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    /**
     * Filter, which PlayerPosition to fetch.
     */
    where?: PlayerPositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PlayerPositions to fetch.
     */
    orderBy?: PlayerPositionOrderByWithRelationInput | PlayerPositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PlayerPositions.
     */
    cursor?: PlayerPositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PlayerPositions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PlayerPositions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PlayerPositions.
     */
    distinct?: PlayerPositionScalarFieldEnum | PlayerPositionScalarFieldEnum[];
  };

  /**
   * PlayerPosition findMany
   */
  export type PlayerPositionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    /**
     * Filter, which PlayerPositions to fetch.
     */
    where?: PlayerPositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PlayerPositions to fetch.
     */
    orderBy?: PlayerPositionOrderByWithRelationInput | PlayerPositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PlayerPositions.
     */
    cursor?: PlayerPositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PlayerPositions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PlayerPositions.
     */
    skip?: number;
    distinct?: PlayerPositionScalarFieldEnum | PlayerPositionScalarFieldEnum[];
  };

  /**
   * PlayerPosition create
   */
  export type PlayerPositionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    /**
     * The data needed to create a PlayerPosition.
     */
    data: XOR<PlayerPositionCreateInput, PlayerPositionUncheckedCreateInput>;
  };

  /**
   * PlayerPosition createMany
   */
  export type PlayerPositionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many PlayerPositions.
     */
    data: PlayerPositionCreateManyInput | PlayerPositionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * PlayerPosition createManyAndReturn
   */
  export type PlayerPositionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many PlayerPositions.
     */
    data: PlayerPositionCreateManyInput | PlayerPositionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * PlayerPosition update
   */
  export type PlayerPositionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    /**
     * The data needed to update a PlayerPosition.
     */
    data: XOR<PlayerPositionUpdateInput, PlayerPositionUncheckedUpdateInput>;
    /**
     * Choose, which PlayerPosition to update.
     */
    where: PlayerPositionWhereUniqueInput;
  };

  /**
   * PlayerPosition updateMany
   */
  export type PlayerPositionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update PlayerPositions.
     */
    data: XOR<PlayerPositionUpdateManyMutationInput, PlayerPositionUncheckedUpdateManyInput>;
    /**
     * Filter which PlayerPositions to update
     */
    where?: PlayerPositionWhereInput;
  };

  /**
   * PlayerPosition upsert
   */
  export type PlayerPositionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    /**
     * The filter to search for the PlayerPosition to update in case it exists.
     */
    where: PlayerPositionWhereUniqueInput;
    /**
     * In case the PlayerPosition found by the `where` argument doesn't exist, create a new PlayerPosition with this data.
     */
    create: XOR<PlayerPositionCreateInput, PlayerPositionUncheckedCreateInput>;
    /**
     * In case the PlayerPosition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerPositionUpdateInput, PlayerPositionUncheckedUpdateInput>;
  };

  /**
   * PlayerPosition delete
   */
  export type PlayerPositionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    /**
     * Filter which PlayerPosition to delete.
     */
    where: PlayerPositionWhereUniqueInput;
  };

  /**
   * PlayerPosition deleteMany
   */
  export type PlayerPositionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which PlayerPositions to delete
     */
    where?: PlayerPositionWhereInput;
  };

  /**
   * PlayerPosition without action
   */
  export type PlayerPositionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
  };

  /**
   * Model League
   */

  export type AggregateLeague = {
    _count: LeagueCountAggregateOutputType | null;
    _avg: LeagueAvgAggregateOutputType | null;
    _sum: LeagueSumAggregateOutputType | null;
    _min: LeagueMinAggregateOutputType | null;
    _max: LeagueMaxAggregateOutputType | null;
  };

  export type LeagueAvgAggregateOutputType = {
    id: number | null;
    countryId: number | null;
  };

  export type LeagueSumAggregateOutputType = {
    id: number | null;
    countryId: number | null;
  };

  export type LeagueMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    countryId: number | null;
  };

  export type LeagueMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    countryId: number | null;
  };

  export type LeagueCountAggregateOutputType = {
    id: number;
    name: number;
    countryId: number;
    _all: number;
  };

  export type LeagueAvgAggregateInputType = {
    id?: true;
    countryId?: true;
  };

  export type LeagueSumAggregateInputType = {
    id?: true;
    countryId?: true;
  };

  export type LeagueMinAggregateInputType = {
    id?: true;
    name?: true;
    countryId?: true;
  };

  export type LeagueMaxAggregateInputType = {
    id?: true;
    name?: true;
    countryId?: true;
  };

  export type LeagueCountAggregateInputType = {
    id?: true;
    name?: true;
    countryId?: true;
    _all?: true;
  };

  export type LeagueAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which League to aggregate.
     */
    where?: LeagueWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Leagues to fetch.
     */
    orderBy?: LeagueOrderByWithRelationInput | LeagueOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: LeagueWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Leagues from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Leagues.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Leagues
     **/
    _count?: true | LeagueCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: LeagueAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: LeagueSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: LeagueMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: LeagueMaxAggregateInputType;
  };

  export type GetLeagueAggregateType<T extends LeagueAggregateArgs> = {
    [P in keyof T & keyof AggregateLeague]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeague[P]>
      : GetScalarType<T[P], AggregateLeague[P]>;
  };

  export type LeagueGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: LeagueWhereInput;
    orderBy?: LeagueOrderByWithAggregationInput | LeagueOrderByWithAggregationInput[];
    by: LeagueScalarFieldEnum[] | LeagueScalarFieldEnum;
    having?: LeagueScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LeagueCountAggregateInputType | true;
    _avg?: LeagueAvgAggregateInputType;
    _sum?: LeagueSumAggregateInputType;
    _min?: LeagueMinAggregateInputType;
    _max?: LeagueMaxAggregateInputType;
  };

  export type LeagueGroupByOutputType = {
    id: number;
    name: string;
    countryId: number;
    _count: LeagueCountAggregateOutputType | null;
    _avg: LeagueAvgAggregateOutputType | null;
    _sum: LeagueSumAggregateOutputType | null;
    _min: LeagueMinAggregateOutputType | null;
    _max: LeagueMaxAggregateOutputType | null;
  };

  type GetLeagueGroupByPayload<T extends LeagueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeagueGroupByOutputType, T['by']> & {
        [P in keyof T & keyof LeagueGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], LeagueGroupByOutputType[P]>
          : GetScalarType<T[P], LeagueGroupByOutputType[P]>;
      }
    >
  >;

  export type LeagueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        countryId?: boolean;
        country?: boolean | CountryDefaultArgs<ExtArgs>;
        clubs?: boolean | League$clubsArgs<ExtArgs>;
        players?: boolean | League$playersArgs<ExtArgs>;
        _count?: boolean | LeagueCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['league']
    >;

  export type LeagueSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      countryId?: boolean;
      country?: boolean | CountryDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['league']
  >;

  export type LeagueSelectScalar = {
    id?: boolean;
    name?: boolean;
    countryId?: boolean;
  };

  export type LeagueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    country?: boolean | CountryDefaultArgs<ExtArgs>;
    clubs?: boolean | League$clubsArgs<ExtArgs>;
    players?: boolean | League$playersArgs<ExtArgs>;
    _count?: boolean | LeagueCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type LeagueIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    country?: boolean | CountryDefaultArgs<ExtArgs>;
  };

  export type $LeaguePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'League';
    objects: {
      country: Prisma.$CountryPayload<ExtArgs>;
      clubs: Prisma.$ClubPayload<ExtArgs>[];
      players: Prisma.$PlayerPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        name: string;
        countryId: number;
      },
      ExtArgs['result']['league']
    >;
    composites: {};
  };

  type LeagueGetPayload<S extends boolean | null | undefined | LeagueDefaultArgs> =
    $Result.GetResult<Prisma.$LeaguePayload, S>;

  type LeagueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    LeagueFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: LeagueCountAggregateInputType | true;
  };

  export interface LeagueDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['League']; meta: { name: 'League' } };
    /**
     * Find zero or one League that matches the filter.
     * @param {LeagueFindUniqueArgs} args - Arguments to find a League
     * @example
     * // Get one League
     * const league = await prisma.league.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeagueFindUniqueArgs>(
      args: SelectSubset<T, LeagueFindUniqueArgs<ExtArgs>>
    ): Prisma__LeagueClient<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one League that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeagueFindUniqueOrThrowArgs} args - Arguments to find a League
     * @example
     * // Get one League
     * const league = await prisma.league.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeagueFindUniqueOrThrowArgs>(
      args: SelectSubset<T, LeagueFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__LeagueClient<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first League that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeagueFindFirstArgs} args - Arguments to find a League
     * @example
     * // Get one League
     * const league = await prisma.league.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeagueFindFirstArgs>(
      args?: SelectSubset<T, LeagueFindFirstArgs<ExtArgs>>
    ): Prisma__LeagueClient<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first League that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeagueFindFirstOrThrowArgs} args - Arguments to find a League
     * @example
     * // Get one League
     * const league = await prisma.league.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeagueFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LeagueFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__LeagueClient<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Leagues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeagueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leagues
     * const leagues = await prisma.league.findMany()
     *
     * // Get first 10 Leagues
     * const leagues = await prisma.league.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const leagueWithIdOnly = await prisma.league.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LeagueFindManyArgs>(
      args?: SelectSubset<T, LeagueFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a League.
     * @param {LeagueCreateArgs} args - Arguments to create a League.
     * @example
     * // Create one League
     * const League = await prisma.league.create({
     *   data: {
     *     // ... data to create a League
     *   }
     * })
     *
     */
    create<T extends LeagueCreateArgs>(
      args: SelectSubset<T, LeagueCreateArgs<ExtArgs>>
    ): Prisma__LeagueClient<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Leagues.
     * @param {LeagueCreateManyArgs} args - Arguments to create many Leagues.
     * @example
     * // Create many Leagues
     * const league = await prisma.league.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LeagueCreateManyArgs>(
      args?: SelectSubset<T, LeagueCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Leagues and returns the data saved in the database.
     * @param {LeagueCreateManyAndReturnArgs} args - Arguments to create many Leagues.
     * @example
     * // Create many Leagues
     * const league = await prisma.league.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Leagues and only return the `id`
     * const leagueWithIdOnly = await prisma.league.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LeagueCreateManyAndReturnArgs>(
      args?: SelectSubset<T, LeagueCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a League.
     * @param {LeagueDeleteArgs} args - Arguments to delete one League.
     * @example
     * // Delete one League
     * const League = await prisma.league.delete({
     *   where: {
     *     // ... filter to delete one League
     *   }
     * })
     *
     */
    delete<T extends LeagueDeleteArgs>(
      args: SelectSubset<T, LeagueDeleteArgs<ExtArgs>>
    ): Prisma__LeagueClient<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one League.
     * @param {LeagueUpdateArgs} args - Arguments to update one League.
     * @example
     * // Update one League
     * const league = await prisma.league.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LeagueUpdateArgs>(
      args: SelectSubset<T, LeagueUpdateArgs<ExtArgs>>
    ): Prisma__LeagueClient<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Leagues.
     * @param {LeagueDeleteManyArgs} args - Arguments to filter Leagues to delete.
     * @example
     * // Delete a few Leagues
     * const { count } = await prisma.league.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LeagueDeleteManyArgs>(
      args?: SelectSubset<T, LeagueDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Leagues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeagueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leagues
     * const league = await prisma.league.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LeagueUpdateManyArgs>(
      args: SelectSubset<T, LeagueUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one League.
     * @param {LeagueUpsertArgs} args - Arguments to update or create a League.
     * @example
     * // Update or create a League
     * const league = await prisma.league.upsert({
     *   create: {
     *     // ... data to create a League
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the League we want to update
     *   }
     * })
     */
    upsert<T extends LeagueUpsertArgs>(
      args: SelectSubset<T, LeagueUpsertArgs<ExtArgs>>
    ): Prisma__LeagueClient<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Leagues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeagueCountArgs} args - Arguments to filter Leagues to count.
     * @example
     * // Count the number of Leagues
     * const count = await prisma.league.count({
     *   where: {
     *     // ... the filter for the Leagues we want to count
     *   }
     * })
     **/
    count<T extends LeagueCountArgs>(
      args?: Subset<T, LeagueCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeagueCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a League.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeagueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends LeagueAggregateArgs>(
      args: Subset<T, LeagueAggregateArgs>
    ): Prisma.PrismaPromise<GetLeagueAggregateType<T>>;

    /**
     * Group by League.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeagueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends LeagueGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeagueGroupByArgs['orderBy'] }
        : { orderBy?: LeagueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, LeagueGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetLeagueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the League model
     */
    readonly fields: LeagueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for League.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeagueClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    country<T extends CountryDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, CountryDefaultArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    clubs<T extends League$clubsArgs<ExtArgs> = {}>(
      args?: Subset<T, League$clubsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'findMany'> | Null>;
    players<T extends League$playersArgs<ExtArgs> = {}>(
      args?: Subset<T, League$playersArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the League model
   */
  interface LeagueFieldRefs {
    readonly id: FieldRef<'League', 'Int'>;
    readonly name: FieldRef<'League', 'String'>;
    readonly countryId: FieldRef<'League', 'Int'>;
  }

  // Custom InputTypes
  /**
   * League findUnique
   */
  export type LeagueFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the League
     */
    select?: LeagueSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeagueInclude<ExtArgs> | null;
    /**
     * Filter, which League to fetch.
     */
    where: LeagueWhereUniqueInput;
  };

  /**
   * League findUniqueOrThrow
   */
  export type LeagueFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the League
     */
    select?: LeagueSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeagueInclude<ExtArgs> | null;
    /**
     * Filter, which League to fetch.
     */
    where: LeagueWhereUniqueInput;
  };

  /**
   * League findFirst
   */
  export type LeagueFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the League
     */
    select?: LeagueSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeagueInclude<ExtArgs> | null;
    /**
     * Filter, which League to fetch.
     */
    where?: LeagueWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Leagues to fetch.
     */
    orderBy?: LeagueOrderByWithRelationInput | LeagueOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Leagues.
     */
    cursor?: LeagueWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Leagues from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Leagues.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Leagues.
     */
    distinct?: LeagueScalarFieldEnum | LeagueScalarFieldEnum[];
  };

  /**
   * League findFirstOrThrow
   */
  export type LeagueFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the League
     */
    select?: LeagueSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeagueInclude<ExtArgs> | null;
    /**
     * Filter, which League to fetch.
     */
    where?: LeagueWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Leagues to fetch.
     */
    orderBy?: LeagueOrderByWithRelationInput | LeagueOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Leagues.
     */
    cursor?: LeagueWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Leagues from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Leagues.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Leagues.
     */
    distinct?: LeagueScalarFieldEnum | LeagueScalarFieldEnum[];
  };

  /**
   * League findMany
   */
  export type LeagueFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the League
     */
    select?: LeagueSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeagueInclude<ExtArgs> | null;
    /**
     * Filter, which Leagues to fetch.
     */
    where?: LeagueWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Leagues to fetch.
     */
    orderBy?: LeagueOrderByWithRelationInput | LeagueOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Leagues.
     */
    cursor?: LeagueWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Leagues from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Leagues.
     */
    skip?: number;
    distinct?: LeagueScalarFieldEnum | LeagueScalarFieldEnum[];
  };

  /**
   * League create
   */
  export type LeagueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the League
       */
      select?: LeagueSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: LeagueInclude<ExtArgs> | null;
      /**
       * The data needed to create a League.
       */
      data: XOR<LeagueCreateInput, LeagueUncheckedCreateInput>;
    };

  /**
   * League createMany
   */
  export type LeagueCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Leagues.
     */
    data: LeagueCreateManyInput | LeagueCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * League createManyAndReturn
   */
  export type LeagueCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the League
     */
    select?: LeagueSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Leagues.
     */
    data: LeagueCreateManyInput | LeagueCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeagueIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * League update
   */
  export type LeagueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the League
       */
      select?: LeagueSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: LeagueInclude<ExtArgs> | null;
      /**
       * The data needed to update a League.
       */
      data: XOR<LeagueUpdateInput, LeagueUncheckedUpdateInput>;
      /**
       * Choose, which League to update.
       */
      where: LeagueWhereUniqueInput;
    };

  /**
   * League updateMany
   */
  export type LeagueUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Leagues.
     */
    data: XOR<LeagueUpdateManyMutationInput, LeagueUncheckedUpdateManyInput>;
    /**
     * Filter which Leagues to update
     */
    where?: LeagueWhereInput;
  };

  /**
   * League upsert
   */
  export type LeagueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the League
       */
      select?: LeagueSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: LeagueInclude<ExtArgs> | null;
      /**
       * The filter to search for the League to update in case it exists.
       */
      where: LeagueWhereUniqueInput;
      /**
       * In case the League found by the `where` argument doesn't exist, create a new League with this data.
       */
      create: XOR<LeagueCreateInput, LeagueUncheckedCreateInput>;
      /**
       * In case the League was found with the provided `where` argument, update it with this data.
       */
      update: XOR<LeagueUpdateInput, LeagueUncheckedUpdateInput>;
    };

  /**
   * League delete
   */
  export type LeagueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the League
       */
      select?: LeagueSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: LeagueInclude<ExtArgs> | null;
      /**
       * Filter which League to delete.
       */
      where: LeagueWhereUniqueInput;
    };

  /**
   * League deleteMany
   */
  export type LeagueDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Leagues to delete
     */
    where?: LeagueWhereInput;
  };

  /**
   * League.clubs
   */
  export type League$clubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Club
       */
      select?: ClubSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClubInclude<ExtArgs> | null;
      where?: ClubWhereInput;
      orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[];
      cursor?: ClubWhereUniqueInput;
      take?: number;
      skip?: number;
      distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[];
    };

  /**
   * League.players
   */
  export type League$playersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null;
    where?: PlayerWhereInput;
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[];
    cursor?: PlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[];
  };

  /**
   * League without action
   */
  export type LeagueDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the League
     */
    select?: LeagueSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeagueInclude<ExtArgs> | null;
  };

  /**
   * Model Club
   */

  export type AggregateClub = {
    _count: ClubCountAggregateOutputType | null;
    _avg: ClubAvgAggregateOutputType | null;
    _sum: ClubSumAggregateOutputType | null;
    _min: ClubMinAggregateOutputType | null;
    _max: ClubMaxAggregateOutputType | null;
  };

  export type ClubAvgAggregateOutputType = {
    id: number | null;
    countryId: number | null;
    leagueId: number | null;
  };

  export type ClubSumAggregateOutputType = {
    id: number | null;
    countryId: number | null;
    leagueId: number | null;
  };

  export type ClubMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    countryId: number | null;
    leagueId: number | null;
  };

  export type ClubMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    countryId: number | null;
    leagueId: number | null;
  };

  export type ClubCountAggregateOutputType = {
    id: number;
    name: number;
    countryId: number;
    leagueId: number;
    _all: number;
  };

  export type ClubAvgAggregateInputType = {
    id?: true;
    countryId?: true;
    leagueId?: true;
  };

  export type ClubSumAggregateInputType = {
    id?: true;
    countryId?: true;
    leagueId?: true;
  };

  export type ClubMinAggregateInputType = {
    id?: true;
    name?: true;
    countryId?: true;
    leagueId?: true;
  };

  export type ClubMaxAggregateInputType = {
    id?: true;
    name?: true;
    countryId?: true;
    leagueId?: true;
  };

  export type ClubCountAggregateInputType = {
    id?: true;
    name?: true;
    countryId?: true;
    leagueId?: true;
    _all?: true;
  };

  export type ClubAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Club to aggregate.
     */
    where?: ClubWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ClubWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clubs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Clubs
     **/
    _count?: true | ClubCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ClubAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ClubSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ClubMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ClubMaxAggregateInputType;
  };

  export type GetClubAggregateType<T extends ClubAggregateArgs> = {
    [P in keyof T & keyof AggregateClub]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClub[P]>
      : GetScalarType<T[P], AggregateClub[P]>;
  };

  export type ClubGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: ClubWhereInput;
      orderBy?: ClubOrderByWithAggregationInput | ClubOrderByWithAggregationInput[];
      by: ClubScalarFieldEnum[] | ClubScalarFieldEnum;
      having?: ClubScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: ClubCountAggregateInputType | true;
      _avg?: ClubAvgAggregateInputType;
      _sum?: ClubSumAggregateInputType;
      _min?: ClubMinAggregateInputType;
      _max?: ClubMaxAggregateInputType;
    };

  export type ClubGroupByOutputType = {
    id: number;
    name: string;
    countryId: number;
    leagueId: number;
    _count: ClubCountAggregateOutputType | null;
    _avg: ClubAvgAggregateOutputType | null;
    _sum: ClubSumAggregateOutputType | null;
    _min: ClubMinAggregateOutputType | null;
    _max: ClubMaxAggregateOutputType | null;
  };

  type GetClubGroupByPayload<T extends ClubGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClubGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ClubGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ClubGroupByOutputType[P]>
          : GetScalarType<T[P], ClubGroupByOutputType[P]>;
      }
    >
  >;

  export type ClubSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        countryId?: boolean;
        leagueId?: boolean;
        country?: boolean | CountryDefaultArgs<ExtArgs>;
        league?: boolean | LeagueDefaultArgs<ExtArgs>;
        players?: boolean | Club$playersArgs<ExtArgs>;
        _count?: boolean | ClubCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['club']
    >;

  export type ClubSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      countryId?: boolean;
      leagueId?: boolean;
      country?: boolean | CountryDefaultArgs<ExtArgs>;
      league?: boolean | LeagueDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['club']
  >;

  export type ClubSelectScalar = {
    id?: boolean;
    name?: boolean;
    countryId?: boolean;
    leagueId?: boolean;
  };

  export type ClubInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    country?: boolean | CountryDefaultArgs<ExtArgs>;
    league?: boolean | LeagueDefaultArgs<ExtArgs>;
    players?: boolean | Club$playersArgs<ExtArgs>;
    _count?: boolean | ClubCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ClubIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    country?: boolean | CountryDefaultArgs<ExtArgs>;
    league?: boolean | LeagueDefaultArgs<ExtArgs>;
  };

  export type $ClubPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Club';
    objects: {
      country: Prisma.$CountryPayload<ExtArgs>;
      league: Prisma.$LeaguePayload<ExtArgs>;
      players: Prisma.$PlayerPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        name: string;
        countryId: number;
        leagueId: number;
      },
      ExtArgs['result']['club']
    >;
    composites: {};
  };

  type ClubGetPayload<S extends boolean | null | undefined | ClubDefaultArgs> = $Result.GetResult<
    Prisma.$ClubPayload,
    S
  >;

  type ClubCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    ClubFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: ClubCountAggregateInputType | true;
  };

  export interface ClubDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Club']; meta: { name: 'Club' } };
    /**
     * Find zero or one Club that matches the filter.
     * @param {ClubFindUniqueArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClubFindUniqueArgs>(
      args: SelectSubset<T, ClubFindUniqueArgs<ExtArgs>>
    ): Prisma__ClubClient<
      $Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Club that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClubFindUniqueOrThrowArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClubFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ClubFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ClubClient<
      $Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Club that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindFirstArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClubFindFirstArgs>(
      args?: SelectSubset<T, ClubFindFirstArgs<ExtArgs>>
    ): Prisma__ClubClient<
      $Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Club that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindFirstOrThrowArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClubFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ClubFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ClubClient<
      $Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Clubs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clubs
     * const clubs = await prisma.club.findMany()
     *
     * // Get first 10 Clubs
     * const clubs = await prisma.club.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const clubWithIdOnly = await prisma.club.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ClubFindManyArgs>(
      args?: SelectSubset<T, ClubFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Club.
     * @param {ClubCreateArgs} args - Arguments to create a Club.
     * @example
     * // Create one Club
     * const Club = await prisma.club.create({
     *   data: {
     *     // ... data to create a Club
     *   }
     * })
     *
     */
    create<T extends ClubCreateArgs>(
      args: SelectSubset<T, ClubCreateArgs<ExtArgs>>
    ): Prisma__ClubClient<
      $Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Clubs.
     * @param {ClubCreateManyArgs} args - Arguments to create many Clubs.
     * @example
     * // Create many Clubs
     * const club = await prisma.club.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ClubCreateManyArgs>(
      args?: SelectSubset<T, ClubCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Clubs and returns the data saved in the database.
     * @param {ClubCreateManyAndReturnArgs} args - Arguments to create many Clubs.
     * @example
     * // Create many Clubs
     * const club = await prisma.club.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Clubs and only return the `id`
     * const clubWithIdOnly = await prisma.club.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ClubCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ClubCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Club.
     * @param {ClubDeleteArgs} args - Arguments to delete one Club.
     * @example
     * // Delete one Club
     * const Club = await prisma.club.delete({
     *   where: {
     *     // ... filter to delete one Club
     *   }
     * })
     *
     */
    delete<T extends ClubDeleteArgs>(
      args: SelectSubset<T, ClubDeleteArgs<ExtArgs>>
    ): Prisma__ClubClient<
      $Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Club.
     * @param {ClubUpdateArgs} args - Arguments to update one Club.
     * @example
     * // Update one Club
     * const club = await prisma.club.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ClubUpdateArgs>(
      args: SelectSubset<T, ClubUpdateArgs<ExtArgs>>
    ): Prisma__ClubClient<
      $Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Clubs.
     * @param {ClubDeleteManyArgs} args - Arguments to filter Clubs to delete.
     * @example
     * // Delete a few Clubs
     * const { count } = await prisma.club.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ClubDeleteManyArgs>(
      args?: SelectSubset<T, ClubDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Clubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clubs
     * const club = await prisma.club.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ClubUpdateManyArgs>(
      args: SelectSubset<T, ClubUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Club.
     * @param {ClubUpsertArgs} args - Arguments to update or create a Club.
     * @example
     * // Update or create a Club
     * const club = await prisma.club.upsert({
     *   create: {
     *     // ... data to create a Club
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Club we want to update
     *   }
     * })
     */
    upsert<T extends ClubUpsertArgs>(
      args: SelectSubset<T, ClubUpsertArgs<ExtArgs>>
    ): Prisma__ClubClient<
      $Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Clubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubCountArgs} args - Arguments to filter Clubs to count.
     * @example
     * // Count the number of Clubs
     * const count = await prisma.club.count({
     *   where: {
     *     // ... the filter for the Clubs we want to count
     *   }
     * })
     **/
    count<T extends ClubCountArgs>(
      args?: Subset<T, ClubCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClubCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Club.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ClubAggregateArgs>(
      args: Subset<T, ClubAggregateArgs>
    ): Prisma.PrismaPromise<GetClubAggregateType<T>>;

    /**
     * Group by Club.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ClubGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClubGroupByArgs['orderBy'] }
        : { orderBy?: ClubGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ClubGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetClubGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Club model
     */
    readonly fields: ClubFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Club.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClubClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    country<T extends CountryDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, CountryDefaultArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    league<T extends LeagueDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, LeagueDefaultArgs<ExtArgs>>
    ): Prisma__LeagueClient<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    players<T extends Club$playersArgs<ExtArgs> = {}>(
      args?: Subset<T, Club$playersArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Club model
   */
  interface ClubFieldRefs {
    readonly id: FieldRef<'Club', 'Int'>;
    readonly name: FieldRef<'Club', 'String'>;
    readonly countryId: FieldRef<'Club', 'Int'>;
    readonly leagueId: FieldRef<'Club', 'Int'>;
  }

  // Custom InputTypes
  /**
   * Club findUnique
   */
  export type ClubFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null;
    /**
     * Filter, which Club to fetch.
     */
    where: ClubWhereUniqueInput;
  };

  /**
   * Club findUniqueOrThrow
   */
  export type ClubFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null;
    /**
     * Filter, which Club to fetch.
     */
    where: ClubWhereUniqueInput;
  };

  /**
   * Club findFirst
   */
  export type ClubFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null;
    /**
     * Filter, which Club to fetch.
     */
    where?: ClubWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Clubs.
     */
    cursor?: ClubWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clubs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Clubs.
     */
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[];
  };

  /**
   * Club findFirstOrThrow
   */
  export type ClubFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null;
    /**
     * Filter, which Club to fetch.
     */
    where?: ClubWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Clubs.
     */
    cursor?: ClubWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clubs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Clubs.
     */
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[];
  };

  /**
   * Club findMany
   */
  export type ClubFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Club
       */
      select?: ClubSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClubInclude<ExtArgs> | null;
      /**
       * Filter, which Clubs to fetch.
       */
      where?: ClubWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Clubs to fetch.
       */
      orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[];
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Clubs.
       */
      cursor?: ClubWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Clubs from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Clubs.
       */
      skip?: number;
      distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[];
    };

  /**
   * Club create
   */
  export type ClubCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null;
    /**
     * The data needed to create a Club.
     */
    data: XOR<ClubCreateInput, ClubUncheckedCreateInput>;
  };

  /**
   * Club createMany
   */
  export type ClubCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Clubs.
     */
    data: ClubCreateManyInput | ClubCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Club createManyAndReturn
   */
  export type ClubCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Clubs.
     */
    data: ClubCreateManyInput | ClubCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Club update
   */
  export type ClubUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null;
    /**
     * The data needed to update a Club.
     */
    data: XOR<ClubUpdateInput, ClubUncheckedUpdateInput>;
    /**
     * Choose, which Club to update.
     */
    where: ClubWhereUniqueInput;
  };

  /**
   * Club updateMany
   */
  export type ClubUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Clubs.
     */
    data: XOR<ClubUpdateManyMutationInput, ClubUncheckedUpdateManyInput>;
    /**
     * Filter which Clubs to update
     */
    where?: ClubWhereInput;
  };

  /**
   * Club upsert
   */
  export type ClubUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null;
    /**
     * The filter to search for the Club to update in case it exists.
     */
    where: ClubWhereUniqueInput;
    /**
     * In case the Club found by the `where` argument doesn't exist, create a new Club with this data.
     */
    create: XOR<ClubCreateInput, ClubUncheckedCreateInput>;
    /**
     * In case the Club was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClubUpdateInput, ClubUncheckedUpdateInput>;
  };

  /**
   * Club delete
   */
  export type ClubDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null;
    /**
     * Filter which Club to delete.
     */
    where: ClubWhereUniqueInput;
  };

  /**
   * Club deleteMany
   */
  export type ClubDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Clubs to delete
     */
    where?: ClubWhereInput;
  };

  /**
   * Club.players
   */
  export type Club$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Player
       */
      select?: PlayerSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: PlayerInclude<ExtArgs> | null;
      where?: PlayerWhereInput;
      orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[];
      cursor?: PlayerWhereUniqueInput;
      take?: number;
      skip?: number;
      distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[];
    };

  /**
   * Club without action
   */
  export type ClubDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Club
       */
      select?: ClubSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClubInclude<ExtArgs> | null;
    };

  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null;
    _avg: PlayerAvgAggregateOutputType | null;
    _sum: PlayerSumAggregateOutputType | null;
    _min: PlayerMinAggregateOutputType | null;
    _max: PlayerMaxAggregateOutputType | null;
  };

  export type PlayerAvgAggregateOutputType = {
    id: number | null;
    qualityId: number | null;
    rarityId: number | null;
    ovr: number | null;
    rating1: number | null;
    rating2: number | null;
    rating3: number | null;
    rating4: number | null;
    rating5: number | null;
    rating6: number | null;
    countryId: number | null;
    clubId: number | null;
    leagueId: number | null;
  };

  export type PlayerSumAggregateOutputType = {
    id: number | null;
    qualityId: number | null;
    rarityId: number | null;
    ovr: number | null;
    rating1: number | null;
    rating2: number | null;
    rating3: number | null;
    rating4: number | null;
    rating5: number | null;
    rating6: number | null;
    countryId: number | null;
    clubId: number | null;
    leagueId: number | null;
  };

  export type PlayerMinAggregateOutputType = {
    id: number | null;
    displayName: string | null;
    fullName: string | null;
    qualityId: number | null;
    rarityId: number | null;
    ovr: number | null;
    rating1: number | null;
    rating2: number | null;
    rating3: number | null;
    rating4: number | null;
    rating5: number | null;
    rating6: number | null;
    countryId: number | null;
    clubId: number | null;
    leagueId: number | null;
  };

  export type PlayerMaxAggregateOutputType = {
    id: number | null;
    displayName: string | null;
    fullName: string | null;
    qualityId: number | null;
    rarityId: number | null;
    ovr: number | null;
    rating1: number | null;
    rating2: number | null;
    rating3: number | null;
    rating4: number | null;
    rating5: number | null;
    rating6: number | null;
    countryId: number | null;
    clubId: number | null;
    leagueId: number | null;
  };

  export type PlayerCountAggregateOutputType = {
    id: number;
    displayName: number;
    fullName: number;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    leagueId: number;
    _all: number;
  };

  export type PlayerAvgAggregateInputType = {
    id?: true;
    qualityId?: true;
    rarityId?: true;
    ovr?: true;
    rating1?: true;
    rating2?: true;
    rating3?: true;
    rating4?: true;
    rating5?: true;
    rating6?: true;
    countryId?: true;
    clubId?: true;
    leagueId?: true;
  };

  export type PlayerSumAggregateInputType = {
    id?: true;
    qualityId?: true;
    rarityId?: true;
    ovr?: true;
    rating1?: true;
    rating2?: true;
    rating3?: true;
    rating4?: true;
    rating5?: true;
    rating6?: true;
    countryId?: true;
    clubId?: true;
    leagueId?: true;
  };

  export type PlayerMinAggregateInputType = {
    id?: true;
    displayName?: true;
    fullName?: true;
    qualityId?: true;
    rarityId?: true;
    ovr?: true;
    rating1?: true;
    rating2?: true;
    rating3?: true;
    rating4?: true;
    rating5?: true;
    rating6?: true;
    countryId?: true;
    clubId?: true;
    leagueId?: true;
  };

  export type PlayerMaxAggregateInputType = {
    id?: true;
    displayName?: true;
    fullName?: true;
    qualityId?: true;
    rarityId?: true;
    ovr?: true;
    rating1?: true;
    rating2?: true;
    rating3?: true;
    rating4?: true;
    rating5?: true;
    rating6?: true;
    countryId?: true;
    clubId?: true;
    leagueId?: true;
  };

  export type PlayerCountAggregateInputType = {
    id?: true;
    displayName?: true;
    fullName?: true;
    qualityId?: true;
    rarityId?: true;
    ovr?: true;
    rating1?: true;
    rating2?: true;
    rating3?: true;
    rating4?: true;
    rating5?: true;
    rating6?: true;
    countryId?: true;
    clubId?: true;
    leagueId?: true;
    _all?: true;
  };

  export type PlayerAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Players from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Players.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Players
     **/
    _count?: true | PlayerCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: PlayerAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: PlayerSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PlayerMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PlayerMaxAggregateInputType;
  };

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
    [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>;
  };

  export type PlayerGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PlayerWhereInput;
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[];
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum;
    having?: PlayerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PlayerCountAggregateInputType | true;
    _avg?: PlayerAvgAggregateInputType;
    _sum?: PlayerSumAggregateInputType;
    _min?: PlayerMinAggregateInputType;
    _max?: PlayerMaxAggregateInputType;
  };

  export type PlayerGroupByOutputType = {
    id: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    leagueId: number;
    _count: PlayerCountAggregateOutputType | null;
    _avg: PlayerAvgAggregateOutputType | null;
    _sum: PlayerSumAggregateOutputType | null;
    _min: PlayerMinAggregateOutputType | null;
    _max: PlayerMaxAggregateOutputType | null;
  };

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> & {
        [P in keyof T & keyof PlayerGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
          : GetScalarType<T[P], PlayerGroupByOutputType[P]>;
      }
    >
  >;

  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        displayName?: boolean;
        fullName?: boolean;
        qualityId?: boolean;
        rarityId?: boolean;
        ovr?: boolean;
        rating1?: boolean;
        rating2?: boolean;
        rating3?: boolean;
        rating4?: boolean;
        rating5?: boolean;
        rating6?: boolean;
        countryId?: boolean;
        clubId?: boolean;
        leagueId?: boolean;
        positions?: boolean | Player$positionsArgs<ExtArgs>;
        clubPlayers?: boolean | Player$clubPlayersArgs<ExtArgs>;
        quality?: boolean | QualityDefaultArgs<ExtArgs>;
        rarity?: boolean | RarityDefaultArgs<ExtArgs>;
        country?: boolean | CountryDefaultArgs<ExtArgs>;
        league?: boolean | LeagueDefaultArgs<ExtArgs>;
        club?: boolean | ClubDefaultArgs<ExtArgs>;
        _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['player']
    >;

  export type PlayerSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      displayName?: boolean;
      fullName?: boolean;
      qualityId?: boolean;
      rarityId?: boolean;
      ovr?: boolean;
      rating1?: boolean;
      rating2?: boolean;
      rating3?: boolean;
      rating4?: boolean;
      rating5?: boolean;
      rating6?: boolean;
      countryId?: boolean;
      clubId?: boolean;
      leagueId?: boolean;
      quality?: boolean | QualityDefaultArgs<ExtArgs>;
      rarity?: boolean | RarityDefaultArgs<ExtArgs>;
      country?: boolean | CountryDefaultArgs<ExtArgs>;
      league?: boolean | LeagueDefaultArgs<ExtArgs>;
      club?: boolean | ClubDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['player']
  >;

  export type PlayerSelectScalar = {
    id?: boolean;
    displayName?: boolean;
    fullName?: boolean;
    qualityId?: boolean;
    rarityId?: boolean;
    ovr?: boolean;
    rating1?: boolean;
    rating2?: boolean;
    rating3?: boolean;
    rating4?: boolean;
    rating5?: boolean;
    rating6?: boolean;
    countryId?: boolean;
    clubId?: boolean;
    leagueId?: boolean;
  };

  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    positions?: boolean | Player$positionsArgs<ExtArgs>;
    clubPlayers?: boolean | Player$clubPlayersArgs<ExtArgs>;
    quality?: boolean | QualityDefaultArgs<ExtArgs>;
    rarity?: boolean | RarityDefaultArgs<ExtArgs>;
    country?: boolean | CountryDefaultArgs<ExtArgs>;
    league?: boolean | LeagueDefaultArgs<ExtArgs>;
    club?: boolean | ClubDefaultArgs<ExtArgs>;
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type PlayerIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    quality?: boolean | QualityDefaultArgs<ExtArgs>;
    rarity?: boolean | RarityDefaultArgs<ExtArgs>;
    country?: boolean | CountryDefaultArgs<ExtArgs>;
    league?: boolean | LeagueDefaultArgs<ExtArgs>;
    club?: boolean | ClubDefaultArgs<ExtArgs>;
  };

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Player';
    objects: {
      positions: Prisma.$PlayerPositionPayload<ExtArgs>[];
      clubPlayers: Prisma.$ClubPlayerPayload<ExtArgs>[];
      quality: Prisma.$QualityPayload<ExtArgs>;
      rarity: Prisma.$RarityPayload<ExtArgs>;
      country: Prisma.$CountryPayload<ExtArgs>;
      league: Prisma.$LeaguePayload<ExtArgs>;
      club: Prisma.$ClubPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        displayName: string;
        fullName: string;
        qualityId: number;
        rarityId: number;
        ovr: number;
        rating1: number;
        rating2: number;
        rating3: number;
        rating4: number;
        rating5: number;
        rating6: number;
        countryId: number;
        clubId: number;
        leagueId: number;
      },
      ExtArgs['result']['player']
    >;
    composites: {};
  };

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> =
    $Result.GetResult<Prisma.$PlayerPayload, S>;

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    PlayerFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: PlayerCountAggregateInputType | true;
  };

  export interface PlayerDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player']; meta: { name: 'Player' } };
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(
      args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>
    ): Prisma__PlayerClient<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PlayerClient<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(
      args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>
    ): Prisma__PlayerClient<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PlayerClient<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     *
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PlayerFindManyArgs>(
      args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     *
     */
    create<T extends PlayerCreateArgs>(
      args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>
    ): Prisma__PlayerClient<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PlayerCreateManyArgs>(
      args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     *
     */
    delete<T extends PlayerDeleteArgs>(
      args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>
    ): Prisma__PlayerClient<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PlayerUpdateArgs>(
      args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>
    ): Prisma__PlayerClient<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PlayerDeleteManyArgs>(
      args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PlayerUpdateManyArgs>(
      args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(
      args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>
    ): Prisma__PlayerClient<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
     **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PlayerAggregateArgs>(
      args: Subset<T, PlayerAggregateArgs>
    ): Prisma.PrismaPromise<GetPlayerAggregateType<T>>;

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Player model
     */
    readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    positions<T extends Player$positionsArgs<ExtArgs> = {}>(
      args?: Subset<T, Player$positionsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PlayerPositionPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    clubPlayers<T extends Player$clubPlayersArgs<ExtArgs> = {}>(
      args?: Subset<T, Player$clubPlayersArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    quality<T extends QualityDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, QualityDefaultArgs<ExtArgs>>
    ): Prisma__QualityClient<
      $Result.GetResult<Prisma.$QualityPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    rarity<T extends RarityDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, RarityDefaultArgs<ExtArgs>>
    ): Prisma__RarityClient<
      $Result.GetResult<Prisma.$RarityPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    country<T extends CountryDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, CountryDefaultArgs<ExtArgs>>
    ): Prisma__CountryClient<
      $Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    league<T extends LeagueDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, LeagueDefaultArgs<ExtArgs>>
    ): Prisma__LeagueClient<
      $Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    club<T extends ClubDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ClubDefaultArgs<ExtArgs>>
    ): Prisma__ClubClient<
      $Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly id: FieldRef<'Player', 'Int'>;
    readonly displayName: FieldRef<'Player', 'String'>;
    readonly fullName: FieldRef<'Player', 'String'>;
    readonly qualityId: FieldRef<'Player', 'Int'>;
    readonly rarityId: FieldRef<'Player', 'Int'>;
    readonly ovr: FieldRef<'Player', 'Int'>;
    readonly rating1: FieldRef<'Player', 'Int'>;
    readonly rating2: FieldRef<'Player', 'Int'>;
    readonly rating3: FieldRef<'Player', 'Int'>;
    readonly rating4: FieldRef<'Player', 'Int'>;
    readonly rating5: FieldRef<'Player', 'Int'>;
    readonly rating6: FieldRef<'Player', 'Int'>;
    readonly countryId: FieldRef<'Player', 'Int'>;
    readonly clubId: FieldRef<'Player', 'Int'>;
    readonly leagueId: FieldRef<'Player', 'Int'>;
  }

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null;
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput;
  };

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null;
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput;
  };

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null;
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Players from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Players.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[];
  };

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null;
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Players from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Players.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[];
  };

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null;
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Players from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Players.
     */
    skip?: number;
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[];
  };

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Player
       */
      select?: PlayerSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: PlayerInclude<ExtArgs> | null;
      /**
       * The data needed to create a Player.
       */
      data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>;
    };

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Player
       */
      select?: PlayerSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: PlayerInclude<ExtArgs> | null;
      /**
       * The data needed to update a Player.
       */
      data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>;
      /**
       * Choose, which Player to update.
       */
      where: PlayerWhereUniqueInput;
    };

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>;
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput;
  };

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Player
       */
      select?: PlayerSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: PlayerInclude<ExtArgs> | null;
      /**
       * The filter to search for the Player to update in case it exists.
       */
      where: PlayerWhereUniqueInput;
      /**
       * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
       */
      create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>;
      /**
       * In case the Player was found with the provided `where` argument, update it with this data.
       */
      update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>;
    };

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Player
       */
      select?: PlayerSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: PlayerInclude<ExtArgs> | null;
      /**
       * Filter which Player to delete.
       */
      where: PlayerWhereUniqueInput;
    };

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput;
  };

  /**
   * Player.positions
   */
  export type Player$positionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PlayerPosition
     */
    select?: PlayerPositionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerPositionInclude<ExtArgs> | null;
    where?: PlayerPositionWhereInput;
    orderBy?: PlayerPositionOrderByWithRelationInput | PlayerPositionOrderByWithRelationInput[];
    cursor?: PlayerPositionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PlayerPositionScalarFieldEnum | PlayerPositionScalarFieldEnum[];
  };

  /**
   * Player.clubPlayers
   */
  export type Player$clubPlayersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
    where?: ClubPlayerWhereInput;
    orderBy?: ClubPlayerOrderByWithRelationInput | ClubPlayerOrderByWithRelationInput[];
    cursor?: ClubPlayerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ClubPlayerScalarFieldEnum | ClubPlayerScalarFieldEnum[];
  };

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null;
  };

  /**
   * Model ClubPlayer
   */

  export type AggregateClubPlayer = {
    _count: ClubPlayerCountAggregateOutputType | null;
    _avg: ClubPlayerAvgAggregateOutputType | null;
    _sum: ClubPlayerSumAggregateOutputType | null;
    _min: ClubPlayerMinAggregateOutputType | null;
    _max: ClubPlayerMaxAggregateOutputType | null;
  };

  export type ClubPlayerAvgAggregateOutputType = {
    id: number | null;
    playerId: number | null;
  };

  export type ClubPlayerSumAggregateOutputType = {
    id: number | null;
    playerId: number | null;
  };

  export type ClubPlayerMinAggregateOutputType = {
    id: number | null;
    playerId: number | null;
    sbc: boolean | null;
    squad: boolean | null;
  };

  export type ClubPlayerMaxAggregateOutputType = {
    id: number | null;
    playerId: number | null;
    sbc: boolean | null;
    squad: boolean | null;
  };

  export type ClubPlayerCountAggregateOutputType = {
    id: number;
    playerId: number;
    sbc: number;
    squad: number;
    _all: number;
  };

  export type ClubPlayerAvgAggregateInputType = {
    id?: true;
    playerId?: true;
  };

  export type ClubPlayerSumAggregateInputType = {
    id?: true;
    playerId?: true;
  };

  export type ClubPlayerMinAggregateInputType = {
    id?: true;
    playerId?: true;
    sbc?: true;
    squad?: true;
  };

  export type ClubPlayerMaxAggregateInputType = {
    id?: true;
    playerId?: true;
    sbc?: true;
    squad?: true;
  };

  export type ClubPlayerCountAggregateInputType = {
    id?: true;
    playerId?: true;
    sbc?: true;
    squad?: true;
    _all?: true;
  };

  export type ClubPlayerAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ClubPlayer to aggregate.
     */
    where?: ClubPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ClubPlayers to fetch.
     */
    orderBy?: ClubPlayerOrderByWithRelationInput | ClubPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ClubPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ClubPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ClubPlayers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ClubPlayers
     **/
    _count?: true | ClubPlayerCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ClubPlayerAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ClubPlayerSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ClubPlayerMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ClubPlayerMaxAggregateInputType;
  };

  export type GetClubPlayerAggregateType<T extends ClubPlayerAggregateArgs> = {
    [P in keyof T & keyof AggregateClubPlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClubPlayer[P]>
      : GetScalarType<T[P], AggregateClubPlayer[P]>;
  };

  export type ClubPlayerGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ClubPlayerWhereInput;
    orderBy?: ClubPlayerOrderByWithAggregationInput | ClubPlayerOrderByWithAggregationInput[];
    by: ClubPlayerScalarFieldEnum[] | ClubPlayerScalarFieldEnum;
    having?: ClubPlayerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClubPlayerCountAggregateInputType | true;
    _avg?: ClubPlayerAvgAggregateInputType;
    _sum?: ClubPlayerSumAggregateInputType;
    _min?: ClubPlayerMinAggregateInputType;
    _max?: ClubPlayerMaxAggregateInputType;
  };

  export type ClubPlayerGroupByOutputType = {
    id: number;
    playerId: number;
    sbc: boolean;
    squad: boolean;
    _count: ClubPlayerCountAggregateOutputType | null;
    _avg: ClubPlayerAvgAggregateOutputType | null;
    _sum: ClubPlayerSumAggregateOutputType | null;
    _min: ClubPlayerMinAggregateOutputType | null;
    _max: ClubPlayerMaxAggregateOutputType | null;
  };

  type GetClubPlayerGroupByPayload<T extends ClubPlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClubPlayerGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ClubPlayerGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ClubPlayerGroupByOutputType[P]>
          : GetScalarType<T[P], ClubPlayerGroupByOutputType[P]>;
      }
    >
  >;

  export type ClubPlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        playerId?: boolean;
        sbc?: boolean;
        squad?: boolean;
        player?: boolean | PlayerDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['clubPlayer']
    >;

  export type ClubPlayerSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      playerId?: boolean;
      sbc?: boolean;
      squad?: boolean;
      player?: boolean | PlayerDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['clubPlayer']
  >;

  export type ClubPlayerSelectScalar = {
    id?: boolean;
    playerId?: boolean;
    sbc?: boolean;
    squad?: boolean;
  };

  export type ClubPlayerInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>;
  };
  export type ClubPlayerIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>;
  };

  export type $ClubPlayerPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ClubPlayer';
    objects: {
      player: Prisma.$PlayerPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        playerId: number;
        sbc: boolean;
        squad: boolean;
      },
      ExtArgs['result']['clubPlayer']
    >;
    composites: {};
  };

  type ClubPlayerGetPayload<S extends boolean | null | undefined | ClubPlayerDefaultArgs> =
    $Result.GetResult<Prisma.$ClubPlayerPayload, S>;

  type ClubPlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClubPlayerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClubPlayerCountAggregateInputType | true;
    };

  export interface ClubPlayerDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ClubPlayer'];
      meta: { name: 'ClubPlayer' };
    };
    /**
     * Find zero or one ClubPlayer that matches the filter.
     * @param {ClubPlayerFindUniqueArgs} args - Arguments to find a ClubPlayer
     * @example
     * // Get one ClubPlayer
     * const clubPlayer = await prisma.clubPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClubPlayerFindUniqueArgs>(
      args: SelectSubset<T, ClubPlayerFindUniqueArgs<ExtArgs>>
    ): Prisma__ClubPlayerClient<
      $Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one ClubPlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClubPlayerFindUniqueOrThrowArgs} args - Arguments to find a ClubPlayer
     * @example
     * // Get one ClubPlayer
     * const clubPlayer = await prisma.clubPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClubPlayerFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ClubPlayerFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ClubPlayerClient<
      $Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first ClubPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubPlayerFindFirstArgs} args - Arguments to find a ClubPlayer
     * @example
     * // Get one ClubPlayer
     * const clubPlayer = await prisma.clubPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClubPlayerFindFirstArgs>(
      args?: SelectSubset<T, ClubPlayerFindFirstArgs<ExtArgs>>
    ): Prisma__ClubPlayerClient<
      $Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first ClubPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubPlayerFindFirstOrThrowArgs} args - Arguments to find a ClubPlayer
     * @example
     * // Get one ClubPlayer
     * const clubPlayer = await prisma.clubPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClubPlayerFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ClubPlayerFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ClubPlayerClient<
      $Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more ClubPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubPlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClubPlayers
     * const clubPlayers = await prisma.clubPlayer.findMany()
     *
     * // Get first 10 ClubPlayers
     * const clubPlayers = await prisma.clubPlayer.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const clubPlayerWithIdOnly = await prisma.clubPlayer.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ClubPlayerFindManyArgs>(
      args?: SelectSubset<T, ClubPlayerFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a ClubPlayer.
     * @param {ClubPlayerCreateArgs} args - Arguments to create a ClubPlayer.
     * @example
     * // Create one ClubPlayer
     * const ClubPlayer = await prisma.clubPlayer.create({
     *   data: {
     *     // ... data to create a ClubPlayer
     *   }
     * })
     *
     */
    create<T extends ClubPlayerCreateArgs>(
      args: SelectSubset<T, ClubPlayerCreateArgs<ExtArgs>>
    ): Prisma__ClubPlayerClient<
      $Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many ClubPlayers.
     * @param {ClubPlayerCreateManyArgs} args - Arguments to create many ClubPlayers.
     * @example
     * // Create many ClubPlayers
     * const clubPlayer = await prisma.clubPlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ClubPlayerCreateManyArgs>(
      args?: SelectSubset<T, ClubPlayerCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ClubPlayers and returns the data saved in the database.
     * @param {ClubPlayerCreateManyAndReturnArgs} args - Arguments to create many ClubPlayers.
     * @example
     * // Create many ClubPlayers
     * const clubPlayer = await prisma.clubPlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ClubPlayers and only return the `id`
     * const clubPlayerWithIdOnly = await prisma.clubPlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ClubPlayerCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ClubPlayerCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a ClubPlayer.
     * @param {ClubPlayerDeleteArgs} args - Arguments to delete one ClubPlayer.
     * @example
     * // Delete one ClubPlayer
     * const ClubPlayer = await prisma.clubPlayer.delete({
     *   where: {
     *     // ... filter to delete one ClubPlayer
     *   }
     * })
     *
     */
    delete<T extends ClubPlayerDeleteArgs>(
      args: SelectSubset<T, ClubPlayerDeleteArgs<ExtArgs>>
    ): Prisma__ClubPlayerClient<
      $Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one ClubPlayer.
     * @param {ClubPlayerUpdateArgs} args - Arguments to update one ClubPlayer.
     * @example
     * // Update one ClubPlayer
     * const clubPlayer = await prisma.clubPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ClubPlayerUpdateArgs>(
      args: SelectSubset<T, ClubPlayerUpdateArgs<ExtArgs>>
    ): Prisma__ClubPlayerClient<
      $Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more ClubPlayers.
     * @param {ClubPlayerDeleteManyArgs} args - Arguments to filter ClubPlayers to delete.
     * @example
     * // Delete a few ClubPlayers
     * const { count } = await prisma.clubPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ClubPlayerDeleteManyArgs>(
      args?: SelectSubset<T, ClubPlayerDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ClubPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClubPlayers
     * const clubPlayer = await prisma.clubPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ClubPlayerUpdateManyArgs>(
      args: SelectSubset<T, ClubPlayerUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one ClubPlayer.
     * @param {ClubPlayerUpsertArgs} args - Arguments to update or create a ClubPlayer.
     * @example
     * // Update or create a ClubPlayer
     * const clubPlayer = await prisma.clubPlayer.upsert({
     *   create: {
     *     // ... data to create a ClubPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClubPlayer we want to update
     *   }
     * })
     */
    upsert<T extends ClubPlayerUpsertArgs>(
      args: SelectSubset<T, ClubPlayerUpsertArgs<ExtArgs>>
    ): Prisma__ClubPlayerClient<
      $Result.GetResult<Prisma.$ClubPlayerPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of ClubPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubPlayerCountArgs} args - Arguments to filter ClubPlayers to count.
     * @example
     * // Count the number of ClubPlayers
     * const count = await prisma.clubPlayer.count({
     *   where: {
     *     // ... the filter for the ClubPlayers we want to count
     *   }
     * })
     **/
    count<T extends ClubPlayerCountArgs>(
      args?: Subset<T, ClubPlayerCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClubPlayerCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ClubPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ClubPlayerAggregateArgs>(
      args: Subset<T, ClubPlayerAggregateArgs>
    ): Prisma.PrismaPromise<GetClubPlayerAggregateType<T>>;

    /**
     * Group by ClubPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubPlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ClubPlayerGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClubPlayerGroupByArgs['orderBy'] }
        : { orderBy?: ClubPlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ClubPlayerGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetClubPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ClubPlayer model
     */
    readonly fields: ClubPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClubPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClubPlayerClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, PlayerDefaultArgs<ExtArgs>>
    ): Prisma__PlayerClient<
      $Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ClubPlayer model
   */
  interface ClubPlayerFieldRefs {
    readonly id: FieldRef<'ClubPlayer', 'Int'>;
    readonly playerId: FieldRef<'ClubPlayer', 'Int'>;
    readonly sbc: FieldRef<'ClubPlayer', 'Boolean'>;
    readonly squad: FieldRef<'ClubPlayer', 'Boolean'>;
  }

  // Custom InputTypes
  /**
   * ClubPlayer findUnique
   */
  export type ClubPlayerFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which ClubPlayer to fetch.
     */
    where: ClubPlayerWhereUniqueInput;
  };

  /**
   * ClubPlayer findUniqueOrThrow
   */
  export type ClubPlayerFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which ClubPlayer to fetch.
     */
    where: ClubPlayerWhereUniqueInput;
  };

  /**
   * ClubPlayer findFirst
   */
  export type ClubPlayerFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which ClubPlayer to fetch.
     */
    where?: ClubPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ClubPlayers to fetch.
     */
    orderBy?: ClubPlayerOrderByWithRelationInput | ClubPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ClubPlayers.
     */
    cursor?: ClubPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ClubPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ClubPlayers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ClubPlayers.
     */
    distinct?: ClubPlayerScalarFieldEnum | ClubPlayerScalarFieldEnum[];
  };

  /**
   * ClubPlayer findFirstOrThrow
   */
  export type ClubPlayerFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which ClubPlayer to fetch.
     */
    where?: ClubPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ClubPlayers to fetch.
     */
    orderBy?: ClubPlayerOrderByWithRelationInput | ClubPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ClubPlayers.
     */
    cursor?: ClubPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ClubPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ClubPlayers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ClubPlayers.
     */
    distinct?: ClubPlayerScalarFieldEnum | ClubPlayerScalarFieldEnum[];
  };

  /**
   * ClubPlayer findMany
   */
  export type ClubPlayerFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
    /**
     * Filter, which ClubPlayers to fetch.
     */
    where?: ClubPlayerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ClubPlayers to fetch.
     */
    orderBy?: ClubPlayerOrderByWithRelationInput | ClubPlayerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ClubPlayers.
     */
    cursor?: ClubPlayerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ClubPlayers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ClubPlayers.
     */
    skip?: number;
    distinct?: ClubPlayerScalarFieldEnum | ClubPlayerScalarFieldEnum[];
  };

  /**
   * ClubPlayer create
   */
  export type ClubPlayerCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
    /**
     * The data needed to create a ClubPlayer.
     */
    data: XOR<ClubPlayerCreateInput, ClubPlayerUncheckedCreateInput>;
  };

  /**
   * ClubPlayer createMany
   */
  export type ClubPlayerCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ClubPlayers.
     */
    data: ClubPlayerCreateManyInput | ClubPlayerCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ClubPlayer createManyAndReturn
   */
  export type ClubPlayerCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many ClubPlayers.
     */
    data: ClubPlayerCreateManyInput | ClubPlayerCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ClubPlayer update
   */
  export type ClubPlayerUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
    /**
     * The data needed to update a ClubPlayer.
     */
    data: XOR<ClubPlayerUpdateInput, ClubPlayerUncheckedUpdateInput>;
    /**
     * Choose, which ClubPlayer to update.
     */
    where: ClubPlayerWhereUniqueInput;
  };

  /**
   * ClubPlayer updateMany
   */
  export type ClubPlayerUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ClubPlayers.
     */
    data: XOR<ClubPlayerUpdateManyMutationInput, ClubPlayerUncheckedUpdateManyInput>;
    /**
     * Filter which ClubPlayers to update
     */
    where?: ClubPlayerWhereInput;
  };

  /**
   * ClubPlayer upsert
   */
  export type ClubPlayerUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
    /**
     * The filter to search for the ClubPlayer to update in case it exists.
     */
    where: ClubPlayerWhereUniqueInput;
    /**
     * In case the ClubPlayer found by the `where` argument doesn't exist, create a new ClubPlayer with this data.
     */
    create: XOR<ClubPlayerCreateInput, ClubPlayerUncheckedCreateInput>;
    /**
     * In case the ClubPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClubPlayerUpdateInput, ClubPlayerUncheckedUpdateInput>;
  };

  /**
   * ClubPlayer delete
   */
  export type ClubPlayerDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
    /**
     * Filter which ClubPlayer to delete.
     */
    where: ClubPlayerWhereUniqueInput;
  };

  /**
   * ClubPlayer deleteMany
   */
  export type ClubPlayerDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ClubPlayers to delete
     */
    where?: ClubPlayerWhereInput;
  };

  /**
   * ClubPlayer without action
   */
  export type ClubPlayerDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClubPlayer
     */
    select?: ClubPlayerSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubPlayerInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const QualityScalarFieldEnum: {
    id: 'id';
    name: 'name';
  };

  export type QualityScalarFieldEnum =
    (typeof QualityScalarFieldEnum)[keyof typeof QualityScalarFieldEnum];

  export const RarityScalarFieldEnum: {
    id: 'id';
    name: 'name';
  };

  export type RarityScalarFieldEnum =
    (typeof RarityScalarFieldEnum)[keyof typeof RarityScalarFieldEnum];

  export const CountryScalarFieldEnum: {
    id: 'id';
    name: 'name';
  };

  export type CountryScalarFieldEnum =
    (typeof CountryScalarFieldEnum)[keyof typeof CountryScalarFieldEnum];

  export const PositionScalarFieldEnum: {
    id: 'id';
    name: 'name';
  };

  export type PositionScalarFieldEnum =
    (typeof PositionScalarFieldEnum)[keyof typeof PositionScalarFieldEnum];

  export const PlayerPositionScalarFieldEnum: {
    id: 'id';
    playerId: 'playerId';
    positionId: 'positionId';
  };

  export type PlayerPositionScalarFieldEnum =
    (typeof PlayerPositionScalarFieldEnum)[keyof typeof PlayerPositionScalarFieldEnum];

  export const LeagueScalarFieldEnum: {
    id: 'id';
    name: 'name';
    countryId: 'countryId';
  };

  export type LeagueScalarFieldEnum =
    (typeof LeagueScalarFieldEnum)[keyof typeof LeagueScalarFieldEnum];

  export const ClubScalarFieldEnum: {
    id: 'id';
    name: 'name';
    countryId: 'countryId';
    leagueId: 'leagueId';
  };

  export type ClubScalarFieldEnum = (typeof ClubScalarFieldEnum)[keyof typeof ClubScalarFieldEnum];

  export const PlayerScalarFieldEnum: {
    id: 'id';
    displayName: 'displayName';
    fullName: 'fullName';
    qualityId: 'qualityId';
    rarityId: 'rarityId';
    ovr: 'ovr';
    rating1: 'rating1';
    rating2: 'rating2';
    rating3: 'rating3';
    rating4: 'rating4';
    rating5: 'rating5';
    rating6: 'rating6';
    countryId: 'countryId';
    clubId: 'clubId';
    leagueId: 'leagueId';
  };

  export type PlayerScalarFieldEnum =
    (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum];

  export const ClubPlayerScalarFieldEnum: {
    id: 'id';
    playerId: 'playerId';
    sbc: 'sbc';
    squad: 'squad';
  };

  export type ClubPlayerScalarFieldEnum =
    (typeof ClubPlayerScalarFieldEnum)[keyof typeof ClubPlayerScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;

  /**
   * Deep Input Types
   */

  export type QualityWhereInput = {
    AND?: QualityWhereInput | QualityWhereInput[];
    OR?: QualityWhereInput[];
    NOT?: QualityWhereInput | QualityWhereInput[];
    id?: IntFilter<'Quality'> | number;
    name?: StringFilter<'Quality'> | string;
    players?: PlayerListRelationFilter;
  };

  export type QualityOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    players?: PlayerOrderByRelationAggregateInput;
  };

  export type QualityWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      name?: string;
      AND?: QualityWhereInput | QualityWhereInput[];
      OR?: QualityWhereInput[];
      NOT?: QualityWhereInput | QualityWhereInput[];
      players?: PlayerListRelationFilter;
    },
    'id' | 'name'
  >;

  export type QualityOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    _count?: QualityCountOrderByAggregateInput;
    _avg?: QualityAvgOrderByAggregateInput;
    _max?: QualityMaxOrderByAggregateInput;
    _min?: QualityMinOrderByAggregateInput;
    _sum?: QualitySumOrderByAggregateInput;
  };

  export type QualityScalarWhereWithAggregatesInput = {
    AND?: QualityScalarWhereWithAggregatesInput | QualityScalarWhereWithAggregatesInput[];
    OR?: QualityScalarWhereWithAggregatesInput[];
    NOT?: QualityScalarWhereWithAggregatesInput | QualityScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Quality'> | number;
    name?: StringWithAggregatesFilter<'Quality'> | string;
  };

  export type RarityWhereInput = {
    AND?: RarityWhereInput | RarityWhereInput[];
    OR?: RarityWhereInput[];
    NOT?: RarityWhereInput | RarityWhereInput[];
    id?: IntFilter<'Rarity'> | number;
    name?: StringFilter<'Rarity'> | string;
    players?: PlayerListRelationFilter;
  };

  export type RarityOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    players?: PlayerOrderByRelationAggregateInput;
  };

  export type RarityWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      name?: string;
      AND?: RarityWhereInput | RarityWhereInput[];
      OR?: RarityWhereInput[];
      NOT?: RarityWhereInput | RarityWhereInput[];
      players?: PlayerListRelationFilter;
    },
    'id' | 'name'
  >;

  export type RarityOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    _count?: RarityCountOrderByAggregateInput;
    _avg?: RarityAvgOrderByAggregateInput;
    _max?: RarityMaxOrderByAggregateInput;
    _min?: RarityMinOrderByAggregateInput;
    _sum?: RaritySumOrderByAggregateInput;
  };

  export type RarityScalarWhereWithAggregatesInput = {
    AND?: RarityScalarWhereWithAggregatesInput | RarityScalarWhereWithAggregatesInput[];
    OR?: RarityScalarWhereWithAggregatesInput[];
    NOT?: RarityScalarWhereWithAggregatesInput | RarityScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Rarity'> | number;
    name?: StringWithAggregatesFilter<'Rarity'> | string;
  };

  export type CountryWhereInput = {
    AND?: CountryWhereInput | CountryWhereInput[];
    OR?: CountryWhereInput[];
    NOT?: CountryWhereInput | CountryWhereInput[];
    id?: IntFilter<'Country'> | number;
    name?: StringFilter<'Country'> | string;
    clubs?: ClubListRelationFilter;
    leagues?: LeagueListRelationFilter;
    players?: PlayerListRelationFilter;
  };

  export type CountryOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    clubs?: ClubOrderByRelationAggregateInput;
    leagues?: LeagueOrderByRelationAggregateInput;
    players?: PlayerOrderByRelationAggregateInput;
  };

  export type CountryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      name?: string;
      AND?: CountryWhereInput | CountryWhereInput[];
      OR?: CountryWhereInput[];
      NOT?: CountryWhereInput | CountryWhereInput[];
      clubs?: ClubListRelationFilter;
      leagues?: LeagueListRelationFilter;
      players?: PlayerListRelationFilter;
    },
    'id' | 'name'
  >;

  export type CountryOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    _count?: CountryCountOrderByAggregateInput;
    _avg?: CountryAvgOrderByAggregateInput;
    _max?: CountryMaxOrderByAggregateInput;
    _min?: CountryMinOrderByAggregateInput;
    _sum?: CountrySumOrderByAggregateInput;
  };

  export type CountryScalarWhereWithAggregatesInput = {
    AND?: CountryScalarWhereWithAggregatesInput | CountryScalarWhereWithAggregatesInput[];
    OR?: CountryScalarWhereWithAggregatesInput[];
    NOT?: CountryScalarWhereWithAggregatesInput | CountryScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Country'> | number;
    name?: StringWithAggregatesFilter<'Country'> | string;
  };

  export type PositionWhereInput = {
    AND?: PositionWhereInput | PositionWhereInput[];
    OR?: PositionWhereInput[];
    NOT?: PositionWhereInput | PositionWhereInput[];
    id?: IntFilter<'Position'> | number;
    name?: StringFilter<'Position'> | string;
    players?: PlayerPositionListRelationFilter;
  };

  export type PositionOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    players?: PlayerPositionOrderByRelationAggregateInput;
  };

  export type PositionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      name?: string;
      AND?: PositionWhereInput | PositionWhereInput[];
      OR?: PositionWhereInput[];
      NOT?: PositionWhereInput | PositionWhereInput[];
      players?: PlayerPositionListRelationFilter;
    },
    'id' | 'name'
  >;

  export type PositionOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    _count?: PositionCountOrderByAggregateInput;
    _avg?: PositionAvgOrderByAggregateInput;
    _max?: PositionMaxOrderByAggregateInput;
    _min?: PositionMinOrderByAggregateInput;
    _sum?: PositionSumOrderByAggregateInput;
  };

  export type PositionScalarWhereWithAggregatesInput = {
    AND?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[];
    OR?: PositionScalarWhereWithAggregatesInput[];
    NOT?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Position'> | number;
    name?: StringWithAggregatesFilter<'Position'> | string;
  };

  export type PlayerPositionWhereInput = {
    AND?: PlayerPositionWhereInput | PlayerPositionWhereInput[];
    OR?: PlayerPositionWhereInput[];
    NOT?: PlayerPositionWhereInput | PlayerPositionWhereInput[];
    id?: IntFilter<'PlayerPosition'> | number;
    playerId?: IntFilter<'PlayerPosition'> | number;
    positionId?: IntFilter<'PlayerPosition'> | number;
    player?: XOR<PlayerRelationFilter, PlayerWhereInput>;
    position?: XOR<PositionRelationFilter, PositionWhereInput>;
  };

  export type PlayerPositionOrderByWithRelationInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    positionId?: SortOrder;
    player?: PlayerOrderByWithRelationInput;
    position?: PositionOrderByWithRelationInput;
  };

  export type PlayerPositionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      playerId_positionId?: PlayerPositionPlayerIdPositionIdCompoundUniqueInput;
      AND?: PlayerPositionWhereInput | PlayerPositionWhereInput[];
      OR?: PlayerPositionWhereInput[];
      NOT?: PlayerPositionWhereInput | PlayerPositionWhereInput[];
      playerId?: IntFilter<'PlayerPosition'> | number;
      positionId?: IntFilter<'PlayerPosition'> | number;
      player?: XOR<PlayerRelationFilter, PlayerWhereInput>;
      position?: XOR<PositionRelationFilter, PositionWhereInput>;
    },
    'id' | 'playerId_positionId'
  >;

  export type PlayerPositionOrderByWithAggregationInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    positionId?: SortOrder;
    _count?: PlayerPositionCountOrderByAggregateInput;
    _avg?: PlayerPositionAvgOrderByAggregateInput;
    _max?: PlayerPositionMaxOrderByAggregateInput;
    _min?: PlayerPositionMinOrderByAggregateInput;
    _sum?: PlayerPositionSumOrderByAggregateInput;
  };

  export type PlayerPositionScalarWhereWithAggregatesInput = {
    AND?:
      | PlayerPositionScalarWhereWithAggregatesInput
      | PlayerPositionScalarWhereWithAggregatesInput[];
    OR?: PlayerPositionScalarWhereWithAggregatesInput[];
    NOT?:
      | PlayerPositionScalarWhereWithAggregatesInput
      | PlayerPositionScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'PlayerPosition'> | number;
    playerId?: IntWithAggregatesFilter<'PlayerPosition'> | number;
    positionId?: IntWithAggregatesFilter<'PlayerPosition'> | number;
  };

  export type LeagueWhereInput = {
    AND?: LeagueWhereInput | LeagueWhereInput[];
    OR?: LeagueWhereInput[];
    NOT?: LeagueWhereInput | LeagueWhereInput[];
    id?: IntFilter<'League'> | number;
    name?: StringFilter<'League'> | string;
    countryId?: IntFilter<'League'> | number;
    country?: XOR<CountryRelationFilter, CountryWhereInput>;
    clubs?: ClubListRelationFilter;
    players?: PlayerListRelationFilter;
  };

  export type LeagueOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    countryId?: SortOrder;
    country?: CountryOrderByWithRelationInput;
    clubs?: ClubOrderByRelationAggregateInput;
    players?: PlayerOrderByRelationAggregateInput;
  };

  export type LeagueWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      name_countryId?: LeagueNameCountryIdCompoundUniqueInput;
      AND?: LeagueWhereInput | LeagueWhereInput[];
      OR?: LeagueWhereInput[];
      NOT?: LeagueWhereInput | LeagueWhereInput[];
      name?: StringFilter<'League'> | string;
      countryId?: IntFilter<'League'> | number;
      country?: XOR<CountryRelationFilter, CountryWhereInput>;
      clubs?: ClubListRelationFilter;
      players?: PlayerListRelationFilter;
    },
    'id' | 'name_countryId'
  >;

  export type LeagueOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    countryId?: SortOrder;
    _count?: LeagueCountOrderByAggregateInput;
    _avg?: LeagueAvgOrderByAggregateInput;
    _max?: LeagueMaxOrderByAggregateInput;
    _min?: LeagueMinOrderByAggregateInput;
    _sum?: LeagueSumOrderByAggregateInput;
  };

  export type LeagueScalarWhereWithAggregatesInput = {
    AND?: LeagueScalarWhereWithAggregatesInput | LeagueScalarWhereWithAggregatesInput[];
    OR?: LeagueScalarWhereWithAggregatesInput[];
    NOT?: LeagueScalarWhereWithAggregatesInput | LeagueScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'League'> | number;
    name?: StringWithAggregatesFilter<'League'> | string;
    countryId?: IntWithAggregatesFilter<'League'> | number;
  };

  export type ClubWhereInput = {
    AND?: ClubWhereInput | ClubWhereInput[];
    OR?: ClubWhereInput[];
    NOT?: ClubWhereInput | ClubWhereInput[];
    id?: IntFilter<'Club'> | number;
    name?: StringFilter<'Club'> | string;
    countryId?: IntFilter<'Club'> | number;
    leagueId?: IntFilter<'Club'> | number;
    country?: XOR<CountryRelationFilter, CountryWhereInput>;
    league?: XOR<LeagueRelationFilter, LeagueWhereInput>;
    players?: PlayerListRelationFilter;
  };

  export type ClubOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    countryId?: SortOrder;
    leagueId?: SortOrder;
    country?: CountryOrderByWithRelationInput;
    league?: LeagueOrderByWithRelationInput;
    players?: PlayerOrderByRelationAggregateInput;
  };

  export type ClubWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      name_leagueId?: ClubNameLeagueIdCompoundUniqueInput;
      AND?: ClubWhereInput | ClubWhereInput[];
      OR?: ClubWhereInput[];
      NOT?: ClubWhereInput | ClubWhereInput[];
      name?: StringFilter<'Club'> | string;
      countryId?: IntFilter<'Club'> | number;
      leagueId?: IntFilter<'Club'> | number;
      country?: XOR<CountryRelationFilter, CountryWhereInput>;
      league?: XOR<LeagueRelationFilter, LeagueWhereInput>;
      players?: PlayerListRelationFilter;
    },
    'id' | 'name_leagueId'
  >;

  export type ClubOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    countryId?: SortOrder;
    leagueId?: SortOrder;
    _count?: ClubCountOrderByAggregateInput;
    _avg?: ClubAvgOrderByAggregateInput;
    _max?: ClubMaxOrderByAggregateInput;
    _min?: ClubMinOrderByAggregateInput;
    _sum?: ClubSumOrderByAggregateInput;
  };

  export type ClubScalarWhereWithAggregatesInput = {
    AND?: ClubScalarWhereWithAggregatesInput | ClubScalarWhereWithAggregatesInput[];
    OR?: ClubScalarWhereWithAggregatesInput[];
    NOT?: ClubScalarWhereWithAggregatesInput | ClubScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Club'> | number;
    name?: StringWithAggregatesFilter<'Club'> | string;
    countryId?: IntWithAggregatesFilter<'Club'> | number;
    leagueId?: IntWithAggregatesFilter<'Club'> | number;
  };

  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[];
    OR?: PlayerWhereInput[];
    NOT?: PlayerWhereInput | PlayerWhereInput[];
    id?: IntFilter<'Player'> | number;
    displayName?: StringFilter<'Player'> | string;
    fullName?: StringFilter<'Player'> | string;
    qualityId?: IntFilter<'Player'> | number;
    rarityId?: IntFilter<'Player'> | number;
    ovr?: IntFilter<'Player'> | number;
    rating1?: IntFilter<'Player'> | number;
    rating2?: IntFilter<'Player'> | number;
    rating3?: IntFilter<'Player'> | number;
    rating4?: IntFilter<'Player'> | number;
    rating5?: IntFilter<'Player'> | number;
    rating6?: IntFilter<'Player'> | number;
    countryId?: IntFilter<'Player'> | number;
    clubId?: IntFilter<'Player'> | number;
    leagueId?: IntFilter<'Player'> | number;
    positions?: PlayerPositionListRelationFilter;
    clubPlayers?: ClubPlayerListRelationFilter;
    quality?: XOR<QualityRelationFilter, QualityWhereInput>;
    rarity?: XOR<RarityRelationFilter, RarityWhereInput>;
    country?: XOR<CountryRelationFilter, CountryWhereInput>;
    league?: XOR<LeagueRelationFilter, LeagueWhereInput>;
    club?: XOR<ClubRelationFilter, ClubWhereInput>;
  };

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder;
    displayName?: SortOrder;
    fullName?: SortOrder;
    qualityId?: SortOrder;
    rarityId?: SortOrder;
    ovr?: SortOrder;
    rating1?: SortOrder;
    rating2?: SortOrder;
    rating3?: SortOrder;
    rating4?: SortOrder;
    rating5?: SortOrder;
    rating6?: SortOrder;
    countryId?: SortOrder;
    clubId?: SortOrder;
    leagueId?: SortOrder;
    positions?: PlayerPositionOrderByRelationAggregateInput;
    clubPlayers?: ClubPlayerOrderByRelationAggregateInput;
    quality?: QualityOrderByWithRelationInput;
    rarity?: RarityOrderByWithRelationInput;
    country?: CountryOrderByWithRelationInput;
    league?: LeagueOrderByWithRelationInput;
    club?: ClubOrderByWithRelationInput;
  };

  export type PlayerWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      displayName_ovr_qualityId_rarityId?: PlayerDisplayNameOvrQualityIdRarityIdCompoundUniqueInput;
      AND?: PlayerWhereInput | PlayerWhereInput[];
      OR?: PlayerWhereInput[];
      NOT?: PlayerWhereInput | PlayerWhereInput[];
      displayName?: StringFilter<'Player'> | string;
      fullName?: StringFilter<'Player'> | string;
      qualityId?: IntFilter<'Player'> | number;
      rarityId?: IntFilter<'Player'> | number;
      ovr?: IntFilter<'Player'> | number;
      rating1?: IntFilter<'Player'> | number;
      rating2?: IntFilter<'Player'> | number;
      rating3?: IntFilter<'Player'> | number;
      rating4?: IntFilter<'Player'> | number;
      rating5?: IntFilter<'Player'> | number;
      rating6?: IntFilter<'Player'> | number;
      countryId?: IntFilter<'Player'> | number;
      clubId?: IntFilter<'Player'> | number;
      leagueId?: IntFilter<'Player'> | number;
      positions?: PlayerPositionListRelationFilter;
      clubPlayers?: ClubPlayerListRelationFilter;
      quality?: XOR<QualityRelationFilter, QualityWhereInput>;
      rarity?: XOR<RarityRelationFilter, RarityWhereInput>;
      country?: XOR<CountryRelationFilter, CountryWhereInput>;
      league?: XOR<LeagueRelationFilter, LeagueWhereInput>;
      club?: XOR<ClubRelationFilter, ClubWhereInput>;
    },
    'id' | 'displayName_ovr_qualityId_rarityId'
  >;

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder;
    displayName?: SortOrder;
    fullName?: SortOrder;
    qualityId?: SortOrder;
    rarityId?: SortOrder;
    ovr?: SortOrder;
    rating1?: SortOrder;
    rating2?: SortOrder;
    rating3?: SortOrder;
    rating4?: SortOrder;
    rating5?: SortOrder;
    rating6?: SortOrder;
    countryId?: SortOrder;
    clubId?: SortOrder;
    leagueId?: SortOrder;
    _count?: PlayerCountOrderByAggregateInput;
    _avg?: PlayerAvgOrderByAggregateInput;
    _max?: PlayerMaxOrderByAggregateInput;
    _min?: PlayerMinOrderByAggregateInput;
    _sum?: PlayerSumOrderByAggregateInput;
  };

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[];
    OR?: PlayerScalarWhereWithAggregatesInput[];
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Player'> | number;
    displayName?: StringWithAggregatesFilter<'Player'> | string;
    fullName?: StringWithAggregatesFilter<'Player'> | string;
    qualityId?: IntWithAggregatesFilter<'Player'> | number;
    rarityId?: IntWithAggregatesFilter<'Player'> | number;
    ovr?: IntWithAggregatesFilter<'Player'> | number;
    rating1?: IntWithAggregatesFilter<'Player'> | number;
    rating2?: IntWithAggregatesFilter<'Player'> | number;
    rating3?: IntWithAggregatesFilter<'Player'> | number;
    rating4?: IntWithAggregatesFilter<'Player'> | number;
    rating5?: IntWithAggregatesFilter<'Player'> | number;
    rating6?: IntWithAggregatesFilter<'Player'> | number;
    countryId?: IntWithAggregatesFilter<'Player'> | number;
    clubId?: IntWithAggregatesFilter<'Player'> | number;
    leagueId?: IntWithAggregatesFilter<'Player'> | number;
  };

  export type ClubPlayerWhereInput = {
    AND?: ClubPlayerWhereInput | ClubPlayerWhereInput[];
    OR?: ClubPlayerWhereInput[];
    NOT?: ClubPlayerWhereInput | ClubPlayerWhereInput[];
    id?: IntFilter<'ClubPlayer'> | number;
    playerId?: IntFilter<'ClubPlayer'> | number;
    sbc?: BoolFilter<'ClubPlayer'> | boolean;
    squad?: BoolFilter<'ClubPlayer'> | boolean;
    player?: XOR<PlayerRelationFilter, PlayerWhereInput>;
  };

  export type ClubPlayerOrderByWithRelationInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    sbc?: SortOrder;
    squad?: SortOrder;
    player?: PlayerOrderByWithRelationInput;
  };

  export type ClubPlayerWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      playerId?: number;
      AND?: ClubPlayerWhereInput | ClubPlayerWhereInput[];
      OR?: ClubPlayerWhereInput[];
      NOT?: ClubPlayerWhereInput | ClubPlayerWhereInput[];
      sbc?: BoolFilter<'ClubPlayer'> | boolean;
      squad?: BoolFilter<'ClubPlayer'> | boolean;
      player?: XOR<PlayerRelationFilter, PlayerWhereInput>;
    },
    'id' | 'playerId'
  >;

  export type ClubPlayerOrderByWithAggregationInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    sbc?: SortOrder;
    squad?: SortOrder;
    _count?: ClubPlayerCountOrderByAggregateInput;
    _avg?: ClubPlayerAvgOrderByAggregateInput;
    _max?: ClubPlayerMaxOrderByAggregateInput;
    _min?: ClubPlayerMinOrderByAggregateInput;
    _sum?: ClubPlayerSumOrderByAggregateInput;
  };

  export type ClubPlayerScalarWhereWithAggregatesInput = {
    AND?: ClubPlayerScalarWhereWithAggregatesInput | ClubPlayerScalarWhereWithAggregatesInput[];
    OR?: ClubPlayerScalarWhereWithAggregatesInput[];
    NOT?: ClubPlayerScalarWhereWithAggregatesInput | ClubPlayerScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'ClubPlayer'> | number;
    playerId?: IntWithAggregatesFilter<'ClubPlayer'> | number;
    sbc?: BoolWithAggregatesFilter<'ClubPlayer'> | boolean;
    squad?: BoolWithAggregatesFilter<'ClubPlayer'> | boolean;
  };

  export type QualityCreateInput = {
    name: string;
    players?: PlayerCreateNestedManyWithoutQualityInput;
  };

  export type QualityUncheckedCreateInput = {
    id?: number;
    name: string;
    players?: PlayerUncheckedCreateNestedManyWithoutQualityInput;
  };

  export type QualityUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    players?: PlayerUpdateManyWithoutQualityNestedInput;
  };

  export type QualityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    players?: PlayerUncheckedUpdateManyWithoutQualityNestedInput;
  };

  export type QualityCreateManyInput = {
    id?: number;
    name: string;
  };

  export type QualityUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type QualityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type RarityCreateInput = {
    name: string;
    players?: PlayerCreateNestedManyWithoutRarityInput;
  };

  export type RarityUncheckedCreateInput = {
    id?: number;
    name: string;
    players?: PlayerUncheckedCreateNestedManyWithoutRarityInput;
  };

  export type RarityUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    players?: PlayerUpdateManyWithoutRarityNestedInput;
  };

  export type RarityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    players?: PlayerUncheckedUpdateManyWithoutRarityNestedInput;
  };

  export type RarityCreateManyInput = {
    id?: number;
    name: string;
  };

  export type RarityUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type RarityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type CountryCreateInput = {
    name: string;
    clubs?: ClubCreateNestedManyWithoutCountryInput;
    leagues?: LeagueCreateNestedManyWithoutCountryInput;
    players?: PlayerCreateNestedManyWithoutCountryInput;
  };

  export type CountryUncheckedCreateInput = {
    id?: number;
    name: string;
    clubs?: ClubUncheckedCreateNestedManyWithoutCountryInput;
    leagues?: LeagueUncheckedCreateNestedManyWithoutCountryInput;
    players?: PlayerUncheckedCreateNestedManyWithoutCountryInput;
  };

  export type CountryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    clubs?: ClubUpdateManyWithoutCountryNestedInput;
    leagues?: LeagueUpdateManyWithoutCountryNestedInput;
    players?: PlayerUpdateManyWithoutCountryNestedInput;
  };

  export type CountryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    clubs?: ClubUncheckedUpdateManyWithoutCountryNestedInput;
    leagues?: LeagueUncheckedUpdateManyWithoutCountryNestedInput;
    players?: PlayerUncheckedUpdateManyWithoutCountryNestedInput;
  };

  export type CountryCreateManyInput = {
    id?: number;
    name: string;
  };

  export type CountryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type CountryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type PositionCreateInput = {
    name: string;
    players?: PlayerPositionCreateNestedManyWithoutPositionInput;
  };

  export type PositionUncheckedCreateInput = {
    id?: number;
    name: string;
    players?: PlayerPositionUncheckedCreateNestedManyWithoutPositionInput;
  };

  export type PositionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    players?: PlayerPositionUpdateManyWithoutPositionNestedInput;
  };

  export type PositionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    players?: PlayerPositionUncheckedUpdateManyWithoutPositionNestedInput;
  };

  export type PositionCreateManyInput = {
    id?: number;
    name: string;
  };

  export type PositionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type PositionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type PlayerPositionCreateInput = {
    player: PlayerCreateNestedOneWithoutPositionsInput;
    position: PositionCreateNestedOneWithoutPlayersInput;
  };

  export type PlayerPositionUncheckedCreateInput = {
    id?: number;
    playerId: number;
    positionId: number;
  };

  export type PlayerPositionUpdateInput = {
    player?: PlayerUpdateOneRequiredWithoutPositionsNestedInput;
    position?: PositionUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type PlayerPositionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    playerId?: IntFieldUpdateOperationsInput | number;
    positionId?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerPositionCreateManyInput = {
    id?: number;
    playerId: number;
    positionId: number;
  };

  export type PlayerPositionUpdateManyMutationInput = {};

  export type PlayerPositionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    playerId?: IntFieldUpdateOperationsInput | number;
    positionId?: IntFieldUpdateOperationsInput | number;
  };

  export type LeagueCreateInput = {
    name: string;
    country: CountryCreateNestedOneWithoutLeaguesInput;
    clubs?: ClubCreateNestedManyWithoutLeagueInput;
    players?: PlayerCreateNestedManyWithoutLeagueInput;
  };

  export type LeagueUncheckedCreateInput = {
    id?: number;
    name: string;
    countryId: number;
    clubs?: ClubUncheckedCreateNestedManyWithoutLeagueInput;
    players?: PlayerUncheckedCreateNestedManyWithoutLeagueInput;
  };

  export type LeagueUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    country?: CountryUpdateOneRequiredWithoutLeaguesNestedInput;
    clubs?: ClubUpdateManyWithoutLeagueNestedInput;
    players?: PlayerUpdateManyWithoutLeagueNestedInput;
  };

  export type LeagueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubs?: ClubUncheckedUpdateManyWithoutLeagueNestedInput;
    players?: PlayerUncheckedUpdateManyWithoutLeagueNestedInput;
  };

  export type LeagueCreateManyInput = {
    id?: number;
    name: string;
    countryId: number;
  };

  export type LeagueUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type LeagueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    countryId?: IntFieldUpdateOperationsInput | number;
  };

  export type ClubCreateInput = {
    name: string;
    country: CountryCreateNestedOneWithoutClubsInput;
    league: LeagueCreateNestedOneWithoutClubsInput;
    players?: PlayerCreateNestedManyWithoutClubInput;
  };

  export type ClubUncheckedCreateInput = {
    id?: number;
    name: string;
    countryId: number;
    leagueId: number;
    players?: PlayerUncheckedCreateNestedManyWithoutClubInput;
  };

  export type ClubUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    country?: CountryUpdateOneRequiredWithoutClubsNestedInput;
    league?: LeagueUpdateOneRequiredWithoutClubsNestedInput;
    players?: PlayerUpdateManyWithoutClubNestedInput;
  };

  export type ClubUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    countryId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
    players?: PlayerUncheckedUpdateManyWithoutClubNestedInput;
  };

  export type ClubCreateManyInput = {
    id?: number;
    name: string;
    countryId: number;
    leagueId: number;
  };

  export type ClubUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type ClubUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    countryId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerCreateInput = {
    displayName: string;
    fullName: string;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    positions?: PlayerPositionCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerCreateNestedManyWithoutPlayerInput;
    quality: QualityCreateNestedOneWithoutPlayersInput;
    rarity: RarityCreateNestedOneWithoutPlayersInput;
    country: CountryCreateNestedOneWithoutPlayersInput;
    league: LeagueCreateNestedOneWithoutPlayersInput;
    club: ClubCreateNestedOneWithoutPlayersInput;
  };

  export type PlayerUncheckedCreateInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    leagueId: number;
    positions?: PlayerPositionUncheckedCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerUncheckedCreateNestedManyWithoutPlayerInput;
  };

  export type PlayerUpdateInput = {
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUpdateManyWithoutPlayerNestedInput;
    quality?: QualityUpdateOneRequiredWithoutPlayersNestedInput;
    rarity?: RarityUpdateOneRequiredWithoutPlayersNestedInput;
    country?: CountryUpdateOneRequiredWithoutPlayersNestedInput;
    league?: LeagueUpdateOneRequiredWithoutPlayersNestedInput;
    club?: ClubUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type PlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUncheckedUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUncheckedUpdateManyWithoutPlayerNestedInput;
  };

  export type PlayerCreateManyInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    leagueId: number;
  };

  export type PlayerUpdateManyMutationInput = {
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
  };

  export type ClubPlayerCreateInput = {
    sbc?: boolean;
    squad?: boolean;
    player: PlayerCreateNestedOneWithoutClubPlayersInput;
  };

  export type ClubPlayerUncheckedCreateInput = {
    id?: number;
    playerId: number;
    sbc?: boolean;
    squad?: boolean;
  };

  export type ClubPlayerUpdateInput = {
    sbc?: BoolFieldUpdateOperationsInput | boolean;
    squad?: BoolFieldUpdateOperationsInput | boolean;
    player?: PlayerUpdateOneRequiredWithoutClubPlayersNestedInput;
  };

  export type ClubPlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    playerId?: IntFieldUpdateOperationsInput | number;
    sbc?: BoolFieldUpdateOperationsInput | boolean;
    squad?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ClubPlayerCreateManyInput = {
    id?: number;
    playerId: number;
    sbc?: boolean;
    squad?: boolean;
  };

  export type ClubPlayerUpdateManyMutationInput = {
    sbc?: BoolFieldUpdateOperationsInput | boolean;
    squad?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ClubPlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    playerId?: IntFieldUpdateOperationsInput | number;
    sbc?: BoolFieldUpdateOperationsInput | boolean;
    squad?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type PlayerListRelationFilter = {
    every?: PlayerWhereInput;
    some?: PlayerWhereInput;
    none?: PlayerWhereInput;
  };

  export type PlayerOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type QualityCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type QualityAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type QualityMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type QualityMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type QualitySumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type RarityCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type RarityAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type RarityMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type RarityMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type RaritySumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type ClubListRelationFilter = {
    every?: ClubWhereInput;
    some?: ClubWhereInput;
    none?: ClubWhereInput;
  };

  export type LeagueListRelationFilter = {
    every?: LeagueWhereInput;
    some?: LeagueWhereInput;
    none?: LeagueWhereInput;
  };

  export type ClubOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type LeagueOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type CountryCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type CountryAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type CountryMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type CountryMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type CountrySumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type PlayerPositionListRelationFilter = {
    every?: PlayerPositionWhereInput;
    some?: PlayerPositionWhereInput;
    none?: PlayerPositionWhereInput;
  };

  export type PlayerPositionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type PositionCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type PositionAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type PositionMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type PositionMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
  };

  export type PositionSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type PlayerRelationFilter = {
    is?: PlayerWhereInput;
    isNot?: PlayerWhereInput;
  };

  export type PositionRelationFilter = {
    is?: PositionWhereInput;
    isNot?: PositionWhereInput;
  };

  export type PlayerPositionPlayerIdPositionIdCompoundUniqueInput = {
    playerId: number;
    positionId: number;
  };

  export type PlayerPositionCountOrderByAggregateInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    positionId?: SortOrder;
  };

  export type PlayerPositionAvgOrderByAggregateInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    positionId?: SortOrder;
  };

  export type PlayerPositionMaxOrderByAggregateInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    positionId?: SortOrder;
  };

  export type PlayerPositionMinOrderByAggregateInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    positionId?: SortOrder;
  };

  export type PlayerPositionSumOrderByAggregateInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    positionId?: SortOrder;
  };

  export type CountryRelationFilter = {
    is?: CountryWhereInput;
    isNot?: CountryWhereInput;
  };

  export type LeagueNameCountryIdCompoundUniqueInput = {
    name: string;
    countryId: number;
  };

  export type LeagueCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    countryId?: SortOrder;
  };

  export type LeagueAvgOrderByAggregateInput = {
    id?: SortOrder;
    countryId?: SortOrder;
  };

  export type LeagueMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    countryId?: SortOrder;
  };

  export type LeagueMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    countryId?: SortOrder;
  };

  export type LeagueSumOrderByAggregateInput = {
    id?: SortOrder;
    countryId?: SortOrder;
  };

  export type LeagueRelationFilter = {
    is?: LeagueWhereInput;
    isNot?: LeagueWhereInput;
  };

  export type ClubNameLeagueIdCompoundUniqueInput = {
    name: string;
    leagueId: number;
  };

  export type ClubCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    countryId?: SortOrder;
    leagueId?: SortOrder;
  };

  export type ClubAvgOrderByAggregateInput = {
    id?: SortOrder;
    countryId?: SortOrder;
    leagueId?: SortOrder;
  };

  export type ClubMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    countryId?: SortOrder;
    leagueId?: SortOrder;
  };

  export type ClubMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    countryId?: SortOrder;
    leagueId?: SortOrder;
  };

  export type ClubSumOrderByAggregateInput = {
    id?: SortOrder;
    countryId?: SortOrder;
    leagueId?: SortOrder;
  };

  export type ClubPlayerListRelationFilter = {
    every?: ClubPlayerWhereInput;
    some?: ClubPlayerWhereInput;
    none?: ClubPlayerWhereInput;
  };

  export type QualityRelationFilter = {
    is?: QualityWhereInput;
    isNot?: QualityWhereInput;
  };

  export type RarityRelationFilter = {
    is?: RarityWhereInput;
    isNot?: RarityWhereInput;
  };

  export type ClubRelationFilter = {
    is?: ClubWhereInput;
    isNot?: ClubWhereInput;
  };

  export type ClubPlayerOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type PlayerDisplayNameOvrQualityIdRarityIdCompoundUniqueInput = {
    displayName: string;
    ovr: number;
    qualityId: number;
    rarityId: number;
  };

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder;
    displayName?: SortOrder;
    fullName?: SortOrder;
    qualityId?: SortOrder;
    rarityId?: SortOrder;
    ovr?: SortOrder;
    rating1?: SortOrder;
    rating2?: SortOrder;
    rating3?: SortOrder;
    rating4?: SortOrder;
    rating5?: SortOrder;
    rating6?: SortOrder;
    countryId?: SortOrder;
    clubId?: SortOrder;
    leagueId?: SortOrder;
  };

  export type PlayerAvgOrderByAggregateInput = {
    id?: SortOrder;
    qualityId?: SortOrder;
    rarityId?: SortOrder;
    ovr?: SortOrder;
    rating1?: SortOrder;
    rating2?: SortOrder;
    rating3?: SortOrder;
    rating4?: SortOrder;
    rating5?: SortOrder;
    rating6?: SortOrder;
    countryId?: SortOrder;
    clubId?: SortOrder;
    leagueId?: SortOrder;
  };

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder;
    displayName?: SortOrder;
    fullName?: SortOrder;
    qualityId?: SortOrder;
    rarityId?: SortOrder;
    ovr?: SortOrder;
    rating1?: SortOrder;
    rating2?: SortOrder;
    rating3?: SortOrder;
    rating4?: SortOrder;
    rating5?: SortOrder;
    rating6?: SortOrder;
    countryId?: SortOrder;
    clubId?: SortOrder;
    leagueId?: SortOrder;
  };

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder;
    displayName?: SortOrder;
    fullName?: SortOrder;
    qualityId?: SortOrder;
    rarityId?: SortOrder;
    ovr?: SortOrder;
    rating1?: SortOrder;
    rating2?: SortOrder;
    rating3?: SortOrder;
    rating4?: SortOrder;
    rating5?: SortOrder;
    rating6?: SortOrder;
    countryId?: SortOrder;
    clubId?: SortOrder;
    leagueId?: SortOrder;
  };

  export type PlayerSumOrderByAggregateInput = {
    id?: SortOrder;
    qualityId?: SortOrder;
    rarityId?: SortOrder;
    ovr?: SortOrder;
    rating1?: SortOrder;
    rating2?: SortOrder;
    rating3?: SortOrder;
    rating4?: SortOrder;
    rating5?: SortOrder;
    rating6?: SortOrder;
    countryId?: SortOrder;
    clubId?: SortOrder;
    leagueId?: SortOrder;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type ClubPlayerCountOrderByAggregateInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    sbc?: SortOrder;
    squad?: SortOrder;
  };

  export type ClubPlayerAvgOrderByAggregateInput = {
    id?: SortOrder;
    playerId?: SortOrder;
  };

  export type ClubPlayerMaxOrderByAggregateInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    sbc?: SortOrder;
    squad?: SortOrder;
  };

  export type ClubPlayerMinOrderByAggregateInput = {
    id?: SortOrder;
    playerId?: SortOrder;
    sbc?: SortOrder;
    squad?: SortOrder;
  };

  export type ClubPlayerSumOrderByAggregateInput = {
    id?: SortOrder;
    playerId?: SortOrder;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type PlayerCreateNestedManyWithoutQualityInput = {
    create?:
      | XOR<PlayerCreateWithoutQualityInput, PlayerUncheckedCreateWithoutQualityInput>
      | PlayerCreateWithoutQualityInput[]
      | PlayerUncheckedCreateWithoutQualityInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutQualityInput
      | PlayerCreateOrConnectWithoutQualityInput[];
    createMany?: PlayerCreateManyQualityInputEnvelope;
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
  };

  export type PlayerUncheckedCreateNestedManyWithoutQualityInput = {
    create?:
      | XOR<PlayerCreateWithoutQualityInput, PlayerUncheckedCreateWithoutQualityInput>
      | PlayerCreateWithoutQualityInput[]
      | PlayerUncheckedCreateWithoutQualityInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutQualityInput
      | PlayerCreateOrConnectWithoutQualityInput[];
    createMany?: PlayerCreateManyQualityInputEnvelope;
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type PlayerUpdateManyWithoutQualityNestedInput = {
    create?:
      | XOR<PlayerCreateWithoutQualityInput, PlayerUncheckedCreateWithoutQualityInput>
      | PlayerCreateWithoutQualityInput[]
      | PlayerUncheckedCreateWithoutQualityInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutQualityInput
      | PlayerCreateOrConnectWithoutQualityInput[];
    upsert?:
      | PlayerUpsertWithWhereUniqueWithoutQualityInput
      | PlayerUpsertWithWhereUniqueWithoutQualityInput[];
    createMany?: PlayerCreateManyQualityInputEnvelope;
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    update?:
      | PlayerUpdateWithWhereUniqueWithoutQualityInput
      | PlayerUpdateWithWhereUniqueWithoutQualityInput[];
    updateMany?:
      | PlayerUpdateManyWithWhereWithoutQualityInput
      | PlayerUpdateManyWithWhereWithoutQualityInput[];
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type PlayerUncheckedUpdateManyWithoutQualityNestedInput = {
    create?:
      | XOR<PlayerCreateWithoutQualityInput, PlayerUncheckedCreateWithoutQualityInput>
      | PlayerCreateWithoutQualityInput[]
      | PlayerUncheckedCreateWithoutQualityInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutQualityInput
      | PlayerCreateOrConnectWithoutQualityInput[];
    upsert?:
      | PlayerUpsertWithWhereUniqueWithoutQualityInput
      | PlayerUpsertWithWhereUniqueWithoutQualityInput[];
    createMany?: PlayerCreateManyQualityInputEnvelope;
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    update?:
      | PlayerUpdateWithWhereUniqueWithoutQualityInput
      | PlayerUpdateWithWhereUniqueWithoutQualityInput[];
    updateMany?:
      | PlayerUpdateManyWithWhereWithoutQualityInput
      | PlayerUpdateManyWithWhereWithoutQualityInput[];
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
  };

  export type PlayerCreateNestedManyWithoutRarityInput = {
    create?:
      | XOR<PlayerCreateWithoutRarityInput, PlayerUncheckedCreateWithoutRarityInput>
      | PlayerCreateWithoutRarityInput[]
      | PlayerUncheckedCreateWithoutRarityInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutRarityInput
      | PlayerCreateOrConnectWithoutRarityInput[];
    createMany?: PlayerCreateManyRarityInputEnvelope;
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
  };

  export type PlayerUncheckedCreateNestedManyWithoutRarityInput = {
    create?:
      | XOR<PlayerCreateWithoutRarityInput, PlayerUncheckedCreateWithoutRarityInput>
      | PlayerCreateWithoutRarityInput[]
      | PlayerUncheckedCreateWithoutRarityInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutRarityInput
      | PlayerCreateOrConnectWithoutRarityInput[];
    createMany?: PlayerCreateManyRarityInputEnvelope;
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
  };

  export type PlayerUpdateManyWithoutRarityNestedInput = {
    create?:
      | XOR<PlayerCreateWithoutRarityInput, PlayerUncheckedCreateWithoutRarityInput>
      | PlayerCreateWithoutRarityInput[]
      | PlayerUncheckedCreateWithoutRarityInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutRarityInput
      | PlayerCreateOrConnectWithoutRarityInput[];
    upsert?:
      | PlayerUpsertWithWhereUniqueWithoutRarityInput
      | PlayerUpsertWithWhereUniqueWithoutRarityInput[];
    createMany?: PlayerCreateManyRarityInputEnvelope;
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    update?:
      | PlayerUpdateWithWhereUniqueWithoutRarityInput
      | PlayerUpdateWithWhereUniqueWithoutRarityInput[];
    updateMany?:
      | PlayerUpdateManyWithWhereWithoutRarityInput
      | PlayerUpdateManyWithWhereWithoutRarityInput[];
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
  };

  export type PlayerUncheckedUpdateManyWithoutRarityNestedInput = {
    create?:
      | XOR<PlayerCreateWithoutRarityInput, PlayerUncheckedCreateWithoutRarityInput>
      | PlayerCreateWithoutRarityInput[]
      | PlayerUncheckedCreateWithoutRarityInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutRarityInput
      | PlayerCreateOrConnectWithoutRarityInput[];
    upsert?:
      | PlayerUpsertWithWhereUniqueWithoutRarityInput
      | PlayerUpsertWithWhereUniqueWithoutRarityInput[];
    createMany?: PlayerCreateManyRarityInputEnvelope;
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    update?:
      | PlayerUpdateWithWhereUniqueWithoutRarityInput
      | PlayerUpdateWithWhereUniqueWithoutRarityInput[];
    updateMany?:
      | PlayerUpdateManyWithWhereWithoutRarityInput
      | PlayerUpdateManyWithWhereWithoutRarityInput[];
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
  };

  export type ClubCreateNestedManyWithoutCountryInput = {
    create?:
      | XOR<ClubCreateWithoutCountryInput, ClubUncheckedCreateWithoutCountryInput>
      | ClubCreateWithoutCountryInput[]
      | ClubUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | ClubCreateOrConnectWithoutCountryInput
      | ClubCreateOrConnectWithoutCountryInput[];
    createMany?: ClubCreateManyCountryInputEnvelope;
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
  };

  export type LeagueCreateNestedManyWithoutCountryInput = {
    create?:
      | XOR<LeagueCreateWithoutCountryInput, LeagueUncheckedCreateWithoutCountryInput>
      | LeagueCreateWithoutCountryInput[]
      | LeagueUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | LeagueCreateOrConnectWithoutCountryInput
      | LeagueCreateOrConnectWithoutCountryInput[];
    createMany?: LeagueCreateManyCountryInputEnvelope;
    connect?: LeagueWhereUniqueInput | LeagueWhereUniqueInput[];
  };

  export type PlayerCreateNestedManyWithoutCountryInput = {
    create?:
      | XOR<PlayerCreateWithoutCountryInput, PlayerUncheckedCreateWithoutCountryInput>
      | PlayerCreateWithoutCountryInput[]
      | PlayerUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutCountryInput
      | PlayerCreateOrConnectWithoutCountryInput[];
    createMany?: PlayerCreateManyCountryInputEnvelope;
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
  };

  export type ClubUncheckedCreateNestedManyWithoutCountryInput = {
    create?:
      | XOR<ClubCreateWithoutCountryInput, ClubUncheckedCreateWithoutCountryInput>
      | ClubCreateWithoutCountryInput[]
      | ClubUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | ClubCreateOrConnectWithoutCountryInput
      | ClubCreateOrConnectWithoutCountryInput[];
    createMany?: ClubCreateManyCountryInputEnvelope;
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
  };

  export type LeagueUncheckedCreateNestedManyWithoutCountryInput = {
    create?:
      | XOR<LeagueCreateWithoutCountryInput, LeagueUncheckedCreateWithoutCountryInput>
      | LeagueCreateWithoutCountryInput[]
      | LeagueUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | LeagueCreateOrConnectWithoutCountryInput
      | LeagueCreateOrConnectWithoutCountryInput[];
    createMany?: LeagueCreateManyCountryInputEnvelope;
    connect?: LeagueWhereUniqueInput | LeagueWhereUniqueInput[];
  };

  export type PlayerUncheckedCreateNestedManyWithoutCountryInput = {
    create?:
      | XOR<PlayerCreateWithoutCountryInput, PlayerUncheckedCreateWithoutCountryInput>
      | PlayerCreateWithoutCountryInput[]
      | PlayerUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutCountryInput
      | PlayerCreateOrConnectWithoutCountryInput[];
    createMany?: PlayerCreateManyCountryInputEnvelope;
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
  };

  export type ClubUpdateManyWithoutCountryNestedInput = {
    create?:
      | XOR<ClubCreateWithoutCountryInput, ClubUncheckedCreateWithoutCountryInput>
      | ClubCreateWithoutCountryInput[]
      | ClubUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | ClubCreateOrConnectWithoutCountryInput
      | ClubCreateOrConnectWithoutCountryInput[];
    upsert?:
      | ClubUpsertWithWhereUniqueWithoutCountryInput
      | ClubUpsertWithWhereUniqueWithoutCountryInput[];
    createMany?: ClubCreateManyCountryInputEnvelope;
    set?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    disconnect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    delete?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    update?:
      | ClubUpdateWithWhereUniqueWithoutCountryInput
      | ClubUpdateWithWhereUniqueWithoutCountryInput[];
    updateMany?:
      | ClubUpdateManyWithWhereWithoutCountryInput
      | ClubUpdateManyWithWhereWithoutCountryInput[];
    deleteMany?: ClubScalarWhereInput | ClubScalarWhereInput[];
  };

  export type LeagueUpdateManyWithoutCountryNestedInput = {
    create?:
      | XOR<LeagueCreateWithoutCountryInput, LeagueUncheckedCreateWithoutCountryInput>
      | LeagueCreateWithoutCountryInput[]
      | LeagueUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | LeagueCreateOrConnectWithoutCountryInput
      | LeagueCreateOrConnectWithoutCountryInput[];
    upsert?:
      | LeagueUpsertWithWhereUniqueWithoutCountryInput
      | LeagueUpsertWithWhereUniqueWithoutCountryInput[];
    createMany?: LeagueCreateManyCountryInputEnvelope;
    set?: LeagueWhereUniqueInput | LeagueWhereUniqueInput[];
    disconnect?: LeagueWhereUniqueInput | LeagueWhereUniqueInput[];
    delete?: LeagueWhereUniqueInput | LeagueWhereUniqueInput[];
    connect?: LeagueWhereUniqueInput | LeagueWhereUniqueInput[];
    update?:
      | LeagueUpdateWithWhereUniqueWithoutCountryInput
      | LeagueUpdateWithWhereUniqueWithoutCountryInput[];
    updateMany?:
      | LeagueUpdateManyWithWhereWithoutCountryInput
      | LeagueUpdateManyWithWhereWithoutCountryInput[];
    deleteMany?: LeagueScalarWhereInput | LeagueScalarWhereInput[];
  };

  export type PlayerUpdateManyWithoutCountryNestedInput = {
    create?:
      | XOR<PlayerCreateWithoutCountryInput, PlayerUncheckedCreateWithoutCountryInput>
      | PlayerCreateWithoutCountryInput[]
      | PlayerUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutCountryInput
      | PlayerCreateOrConnectWithoutCountryInput[];
    upsert?:
      | PlayerUpsertWithWhereUniqueWithoutCountryInput
      | PlayerUpsertWithWhereUniqueWithoutCountryInput[];
    createMany?: PlayerCreateManyCountryInputEnvelope;
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    update?:
      | PlayerUpdateWithWhereUniqueWithoutCountryInput
      | PlayerUpdateWithWhereUniqueWithoutCountryInput[];
    updateMany?:
      | PlayerUpdateManyWithWhereWithoutCountryInput
      | PlayerUpdateManyWithWhereWithoutCountryInput[];
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
  };

  export type ClubUncheckedUpdateManyWithoutCountryNestedInput = {
    create?:
      | XOR<ClubCreateWithoutCountryInput, ClubUncheckedCreateWithoutCountryInput>
      | ClubCreateWithoutCountryInput[]
      | ClubUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | ClubCreateOrConnectWithoutCountryInput
      | ClubCreateOrConnectWithoutCountryInput[];
    upsert?:
      | ClubUpsertWithWhereUniqueWithoutCountryInput
      | ClubUpsertWithWhereUniqueWithoutCountryInput[];
    createMany?: ClubCreateManyCountryInputEnvelope;
    set?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    disconnect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    delete?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    update?:
      | ClubUpdateWithWhereUniqueWithoutCountryInput
      | ClubUpdateWithWhereUniqueWithoutCountryInput[];
    updateMany?:
      | ClubUpdateManyWithWhereWithoutCountryInput
      | ClubUpdateManyWithWhereWithoutCountryInput[];
    deleteMany?: ClubScalarWhereInput | ClubScalarWhereInput[];
  };

  export type LeagueUncheckedUpdateManyWithoutCountryNestedInput = {
    create?:
      | XOR<LeagueCreateWithoutCountryInput, LeagueUncheckedCreateWithoutCountryInput>
      | LeagueCreateWithoutCountryInput[]
      | LeagueUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | LeagueCreateOrConnectWithoutCountryInput
      | LeagueCreateOrConnectWithoutCountryInput[];
    upsert?:
      | LeagueUpsertWithWhereUniqueWithoutCountryInput
      | LeagueUpsertWithWhereUniqueWithoutCountryInput[];
    createMany?: LeagueCreateManyCountryInputEnvelope;
    set?: LeagueWhereUniqueInput | LeagueWhereUniqueInput[];
    disconnect?: LeagueWhereUniqueInput | LeagueWhereUniqueInput[];
    delete?: LeagueWhereUniqueInput | LeagueWhereUniqueInput[];
    connect?: LeagueWhereUniqueInput | LeagueWhereUniqueInput[];
    update?:
      | LeagueUpdateWithWhereUniqueWithoutCountryInput
      | LeagueUpdateWithWhereUniqueWithoutCountryInput[];
    updateMany?:
      | LeagueUpdateManyWithWhereWithoutCountryInput
      | LeagueUpdateManyWithWhereWithoutCountryInput[];
    deleteMany?: LeagueScalarWhereInput | LeagueScalarWhereInput[];
  };

  export type PlayerUncheckedUpdateManyWithoutCountryNestedInput = {
    create?:
      | XOR<PlayerCreateWithoutCountryInput, PlayerUncheckedCreateWithoutCountryInput>
      | PlayerCreateWithoutCountryInput[]
      | PlayerUncheckedCreateWithoutCountryInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutCountryInput
      | PlayerCreateOrConnectWithoutCountryInput[];
    upsert?:
      | PlayerUpsertWithWhereUniqueWithoutCountryInput
      | PlayerUpsertWithWhereUniqueWithoutCountryInput[];
    createMany?: PlayerCreateManyCountryInputEnvelope;
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    update?:
      | PlayerUpdateWithWhereUniqueWithoutCountryInput
      | PlayerUpdateWithWhereUniqueWithoutCountryInput[];
    updateMany?:
      | PlayerUpdateManyWithWhereWithoutCountryInput
      | PlayerUpdateManyWithWhereWithoutCountryInput[];
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
  };

  export type PlayerPositionCreateNestedManyWithoutPositionInput = {
    create?:
      | XOR<
          PlayerPositionCreateWithoutPositionInput,
          PlayerPositionUncheckedCreateWithoutPositionInput
        >
      | PlayerPositionCreateWithoutPositionInput[]
      | PlayerPositionUncheckedCreateWithoutPositionInput[];
    connectOrCreate?:
      | PlayerPositionCreateOrConnectWithoutPositionInput
      | PlayerPositionCreateOrConnectWithoutPositionInput[];
    createMany?: PlayerPositionCreateManyPositionInputEnvelope;
    connect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
  };

  export type PlayerPositionUncheckedCreateNestedManyWithoutPositionInput = {
    create?:
      | XOR<
          PlayerPositionCreateWithoutPositionInput,
          PlayerPositionUncheckedCreateWithoutPositionInput
        >
      | PlayerPositionCreateWithoutPositionInput[]
      | PlayerPositionUncheckedCreateWithoutPositionInput[];
    connectOrCreate?:
      | PlayerPositionCreateOrConnectWithoutPositionInput
      | PlayerPositionCreateOrConnectWithoutPositionInput[];
    createMany?: PlayerPositionCreateManyPositionInputEnvelope;
    connect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
  };

  export type PlayerPositionUpdateManyWithoutPositionNestedInput = {
    create?:
      | XOR<
          PlayerPositionCreateWithoutPositionInput,
          PlayerPositionUncheckedCreateWithoutPositionInput
        >
      | PlayerPositionCreateWithoutPositionInput[]
      | PlayerPositionUncheckedCreateWithoutPositionInput[];
    connectOrCreate?:
      | PlayerPositionCreateOrConnectWithoutPositionInput
      | PlayerPositionCreateOrConnectWithoutPositionInput[];
    upsert?:
      | PlayerPositionUpsertWithWhereUniqueWithoutPositionInput
      | PlayerPositionUpsertWithWhereUniqueWithoutPositionInput[];
    createMany?: PlayerPositionCreateManyPositionInputEnvelope;
    set?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    disconnect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    delete?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    connect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    update?:
      | PlayerPositionUpdateWithWhereUniqueWithoutPositionInput
      | PlayerPositionUpdateWithWhereUniqueWithoutPositionInput[];
    updateMany?:
      | PlayerPositionUpdateManyWithWhereWithoutPositionInput
      | PlayerPositionUpdateManyWithWhereWithoutPositionInput[];
    deleteMany?: PlayerPositionScalarWhereInput | PlayerPositionScalarWhereInput[];
  };

  export type PlayerPositionUncheckedUpdateManyWithoutPositionNestedInput = {
    create?:
      | XOR<
          PlayerPositionCreateWithoutPositionInput,
          PlayerPositionUncheckedCreateWithoutPositionInput
        >
      | PlayerPositionCreateWithoutPositionInput[]
      | PlayerPositionUncheckedCreateWithoutPositionInput[];
    connectOrCreate?:
      | PlayerPositionCreateOrConnectWithoutPositionInput
      | PlayerPositionCreateOrConnectWithoutPositionInput[];
    upsert?:
      | PlayerPositionUpsertWithWhereUniqueWithoutPositionInput
      | PlayerPositionUpsertWithWhereUniqueWithoutPositionInput[];
    createMany?: PlayerPositionCreateManyPositionInputEnvelope;
    set?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    disconnect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    delete?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    connect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    update?:
      | PlayerPositionUpdateWithWhereUniqueWithoutPositionInput
      | PlayerPositionUpdateWithWhereUniqueWithoutPositionInput[];
    updateMany?:
      | PlayerPositionUpdateManyWithWhereWithoutPositionInput
      | PlayerPositionUpdateManyWithWhereWithoutPositionInput[];
    deleteMany?: PlayerPositionScalarWhereInput | PlayerPositionScalarWhereInput[];
  };

  export type PlayerCreateNestedOneWithoutPositionsInput = {
    create?: XOR<PlayerCreateWithoutPositionsInput, PlayerUncheckedCreateWithoutPositionsInput>;
    connectOrCreate?: PlayerCreateOrConnectWithoutPositionsInput;
    connect?: PlayerWhereUniqueInput;
  };

  export type PositionCreateNestedOneWithoutPlayersInput = {
    create?: XOR<PositionCreateWithoutPlayersInput, PositionUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: PositionCreateOrConnectWithoutPlayersInput;
    connect?: PositionWhereUniqueInput;
  };

  export type PlayerUpdateOneRequiredWithoutPositionsNestedInput = {
    create?: XOR<PlayerCreateWithoutPositionsInput, PlayerUncheckedCreateWithoutPositionsInput>;
    connectOrCreate?: PlayerCreateOrConnectWithoutPositionsInput;
    upsert?: PlayerUpsertWithoutPositionsInput;
    connect?: PlayerWhereUniqueInput;
    update?: XOR<
      XOR<PlayerUpdateToOneWithWhereWithoutPositionsInput, PlayerUpdateWithoutPositionsInput>,
      PlayerUncheckedUpdateWithoutPositionsInput
    >;
  };

  export type PositionUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<PositionCreateWithoutPlayersInput, PositionUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: PositionCreateOrConnectWithoutPlayersInput;
    upsert?: PositionUpsertWithoutPlayersInput;
    connect?: PositionWhereUniqueInput;
    update?: XOR<
      XOR<PositionUpdateToOneWithWhereWithoutPlayersInput, PositionUpdateWithoutPlayersInput>,
      PositionUncheckedUpdateWithoutPlayersInput
    >;
  };

  export type CountryCreateNestedOneWithoutLeaguesInput = {
    create?: XOR<CountryCreateWithoutLeaguesInput, CountryUncheckedCreateWithoutLeaguesInput>;
    connectOrCreate?: CountryCreateOrConnectWithoutLeaguesInput;
    connect?: CountryWhereUniqueInput;
  };

  export type ClubCreateNestedManyWithoutLeagueInput = {
    create?:
      | XOR<ClubCreateWithoutLeagueInput, ClubUncheckedCreateWithoutLeagueInput>
      | ClubCreateWithoutLeagueInput[]
      | ClubUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?:
      | ClubCreateOrConnectWithoutLeagueInput
      | ClubCreateOrConnectWithoutLeagueInput[];
    createMany?: ClubCreateManyLeagueInputEnvelope;
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
  };

  export type PlayerCreateNestedManyWithoutLeagueInput = {
    create?:
      | XOR<PlayerCreateWithoutLeagueInput, PlayerUncheckedCreateWithoutLeagueInput>
      | PlayerCreateWithoutLeagueInput[]
      | PlayerUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutLeagueInput
      | PlayerCreateOrConnectWithoutLeagueInput[];
    createMany?: PlayerCreateManyLeagueInputEnvelope;
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
  };

  export type ClubUncheckedCreateNestedManyWithoutLeagueInput = {
    create?:
      | XOR<ClubCreateWithoutLeagueInput, ClubUncheckedCreateWithoutLeagueInput>
      | ClubCreateWithoutLeagueInput[]
      | ClubUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?:
      | ClubCreateOrConnectWithoutLeagueInput
      | ClubCreateOrConnectWithoutLeagueInput[];
    createMany?: ClubCreateManyLeagueInputEnvelope;
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
  };

  export type PlayerUncheckedCreateNestedManyWithoutLeagueInput = {
    create?:
      | XOR<PlayerCreateWithoutLeagueInput, PlayerUncheckedCreateWithoutLeagueInput>
      | PlayerCreateWithoutLeagueInput[]
      | PlayerUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutLeagueInput
      | PlayerCreateOrConnectWithoutLeagueInput[];
    createMany?: PlayerCreateManyLeagueInputEnvelope;
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
  };

  export type CountryUpdateOneRequiredWithoutLeaguesNestedInput = {
    create?: XOR<CountryCreateWithoutLeaguesInput, CountryUncheckedCreateWithoutLeaguesInput>;
    connectOrCreate?: CountryCreateOrConnectWithoutLeaguesInput;
    upsert?: CountryUpsertWithoutLeaguesInput;
    connect?: CountryWhereUniqueInput;
    update?: XOR<
      XOR<CountryUpdateToOneWithWhereWithoutLeaguesInput, CountryUpdateWithoutLeaguesInput>,
      CountryUncheckedUpdateWithoutLeaguesInput
    >;
  };

  export type ClubUpdateManyWithoutLeagueNestedInput = {
    create?:
      | XOR<ClubCreateWithoutLeagueInput, ClubUncheckedCreateWithoutLeagueInput>
      | ClubCreateWithoutLeagueInput[]
      | ClubUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?:
      | ClubCreateOrConnectWithoutLeagueInput
      | ClubCreateOrConnectWithoutLeagueInput[];
    upsert?:
      | ClubUpsertWithWhereUniqueWithoutLeagueInput
      | ClubUpsertWithWhereUniqueWithoutLeagueInput[];
    createMany?: ClubCreateManyLeagueInputEnvelope;
    set?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    disconnect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    delete?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    update?:
      | ClubUpdateWithWhereUniqueWithoutLeagueInput
      | ClubUpdateWithWhereUniqueWithoutLeagueInput[];
    updateMany?:
      | ClubUpdateManyWithWhereWithoutLeagueInput
      | ClubUpdateManyWithWhereWithoutLeagueInput[];
    deleteMany?: ClubScalarWhereInput | ClubScalarWhereInput[];
  };

  export type PlayerUpdateManyWithoutLeagueNestedInput = {
    create?:
      | XOR<PlayerCreateWithoutLeagueInput, PlayerUncheckedCreateWithoutLeagueInput>
      | PlayerCreateWithoutLeagueInput[]
      | PlayerUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutLeagueInput
      | PlayerCreateOrConnectWithoutLeagueInput[];
    upsert?:
      | PlayerUpsertWithWhereUniqueWithoutLeagueInput
      | PlayerUpsertWithWhereUniqueWithoutLeagueInput[];
    createMany?: PlayerCreateManyLeagueInputEnvelope;
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    update?:
      | PlayerUpdateWithWhereUniqueWithoutLeagueInput
      | PlayerUpdateWithWhereUniqueWithoutLeagueInput[];
    updateMany?:
      | PlayerUpdateManyWithWhereWithoutLeagueInput
      | PlayerUpdateManyWithWhereWithoutLeagueInput[];
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
  };

  export type ClubUncheckedUpdateManyWithoutLeagueNestedInput = {
    create?:
      | XOR<ClubCreateWithoutLeagueInput, ClubUncheckedCreateWithoutLeagueInput>
      | ClubCreateWithoutLeagueInput[]
      | ClubUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?:
      | ClubCreateOrConnectWithoutLeagueInput
      | ClubCreateOrConnectWithoutLeagueInput[];
    upsert?:
      | ClubUpsertWithWhereUniqueWithoutLeagueInput
      | ClubUpsertWithWhereUniqueWithoutLeagueInput[];
    createMany?: ClubCreateManyLeagueInputEnvelope;
    set?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    disconnect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    delete?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    connect?: ClubWhereUniqueInput | ClubWhereUniqueInput[];
    update?:
      | ClubUpdateWithWhereUniqueWithoutLeagueInput
      | ClubUpdateWithWhereUniqueWithoutLeagueInput[];
    updateMany?:
      | ClubUpdateManyWithWhereWithoutLeagueInput
      | ClubUpdateManyWithWhereWithoutLeagueInput[];
    deleteMany?: ClubScalarWhereInput | ClubScalarWhereInput[];
  };

  export type PlayerUncheckedUpdateManyWithoutLeagueNestedInput = {
    create?:
      | XOR<PlayerCreateWithoutLeagueInput, PlayerUncheckedCreateWithoutLeagueInput>
      | PlayerCreateWithoutLeagueInput[]
      | PlayerUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutLeagueInput
      | PlayerCreateOrConnectWithoutLeagueInput[];
    upsert?:
      | PlayerUpsertWithWhereUniqueWithoutLeagueInput
      | PlayerUpsertWithWhereUniqueWithoutLeagueInput[];
    createMany?: PlayerCreateManyLeagueInputEnvelope;
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    update?:
      | PlayerUpdateWithWhereUniqueWithoutLeagueInput
      | PlayerUpdateWithWhereUniqueWithoutLeagueInput[];
    updateMany?:
      | PlayerUpdateManyWithWhereWithoutLeagueInput
      | PlayerUpdateManyWithWhereWithoutLeagueInput[];
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
  };

  export type CountryCreateNestedOneWithoutClubsInput = {
    create?: XOR<CountryCreateWithoutClubsInput, CountryUncheckedCreateWithoutClubsInput>;
    connectOrCreate?: CountryCreateOrConnectWithoutClubsInput;
    connect?: CountryWhereUniqueInput;
  };

  export type LeagueCreateNestedOneWithoutClubsInput = {
    create?: XOR<LeagueCreateWithoutClubsInput, LeagueUncheckedCreateWithoutClubsInput>;
    connectOrCreate?: LeagueCreateOrConnectWithoutClubsInput;
    connect?: LeagueWhereUniqueInput;
  };

  export type PlayerCreateNestedManyWithoutClubInput = {
    create?:
      | XOR<PlayerCreateWithoutClubInput, PlayerUncheckedCreateWithoutClubInput>
      | PlayerCreateWithoutClubInput[]
      | PlayerUncheckedCreateWithoutClubInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutClubInput
      | PlayerCreateOrConnectWithoutClubInput[];
    createMany?: PlayerCreateManyClubInputEnvelope;
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
  };

  export type PlayerUncheckedCreateNestedManyWithoutClubInput = {
    create?:
      | XOR<PlayerCreateWithoutClubInput, PlayerUncheckedCreateWithoutClubInput>
      | PlayerCreateWithoutClubInput[]
      | PlayerUncheckedCreateWithoutClubInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutClubInput
      | PlayerCreateOrConnectWithoutClubInput[];
    createMany?: PlayerCreateManyClubInputEnvelope;
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
  };

  export type CountryUpdateOneRequiredWithoutClubsNestedInput = {
    create?: XOR<CountryCreateWithoutClubsInput, CountryUncheckedCreateWithoutClubsInput>;
    connectOrCreate?: CountryCreateOrConnectWithoutClubsInput;
    upsert?: CountryUpsertWithoutClubsInput;
    connect?: CountryWhereUniqueInput;
    update?: XOR<
      XOR<CountryUpdateToOneWithWhereWithoutClubsInput, CountryUpdateWithoutClubsInput>,
      CountryUncheckedUpdateWithoutClubsInput
    >;
  };

  export type LeagueUpdateOneRequiredWithoutClubsNestedInput = {
    create?: XOR<LeagueCreateWithoutClubsInput, LeagueUncheckedCreateWithoutClubsInput>;
    connectOrCreate?: LeagueCreateOrConnectWithoutClubsInput;
    upsert?: LeagueUpsertWithoutClubsInput;
    connect?: LeagueWhereUniqueInput;
    update?: XOR<
      XOR<LeagueUpdateToOneWithWhereWithoutClubsInput, LeagueUpdateWithoutClubsInput>,
      LeagueUncheckedUpdateWithoutClubsInput
    >;
  };

  export type PlayerUpdateManyWithoutClubNestedInput = {
    create?:
      | XOR<PlayerCreateWithoutClubInput, PlayerUncheckedCreateWithoutClubInput>
      | PlayerCreateWithoutClubInput[]
      | PlayerUncheckedCreateWithoutClubInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutClubInput
      | PlayerCreateOrConnectWithoutClubInput[];
    upsert?:
      | PlayerUpsertWithWhereUniqueWithoutClubInput
      | PlayerUpsertWithWhereUniqueWithoutClubInput[];
    createMany?: PlayerCreateManyClubInputEnvelope;
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    update?:
      | PlayerUpdateWithWhereUniqueWithoutClubInput
      | PlayerUpdateWithWhereUniqueWithoutClubInput[];
    updateMany?:
      | PlayerUpdateManyWithWhereWithoutClubInput
      | PlayerUpdateManyWithWhereWithoutClubInput[];
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
  };

  export type PlayerUncheckedUpdateManyWithoutClubNestedInput = {
    create?:
      | XOR<PlayerCreateWithoutClubInput, PlayerUncheckedCreateWithoutClubInput>
      | PlayerCreateWithoutClubInput[]
      | PlayerUncheckedCreateWithoutClubInput[];
    connectOrCreate?:
      | PlayerCreateOrConnectWithoutClubInput
      | PlayerCreateOrConnectWithoutClubInput[];
    upsert?:
      | PlayerUpsertWithWhereUniqueWithoutClubInput
      | PlayerUpsertWithWhereUniqueWithoutClubInput[];
    createMany?: PlayerCreateManyClubInputEnvelope;
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[];
    update?:
      | PlayerUpdateWithWhereUniqueWithoutClubInput
      | PlayerUpdateWithWhereUniqueWithoutClubInput[];
    updateMany?:
      | PlayerUpdateManyWithWhereWithoutClubInput
      | PlayerUpdateManyWithWhereWithoutClubInput[];
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
  };

  export type PlayerPositionCreateNestedManyWithoutPlayerInput = {
    create?:
      | XOR<PlayerPositionCreateWithoutPlayerInput, PlayerPositionUncheckedCreateWithoutPlayerInput>
      | PlayerPositionCreateWithoutPlayerInput[]
      | PlayerPositionUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | PlayerPositionCreateOrConnectWithoutPlayerInput
      | PlayerPositionCreateOrConnectWithoutPlayerInput[];
    createMany?: PlayerPositionCreateManyPlayerInputEnvelope;
    connect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
  };

  export type ClubPlayerCreateNestedManyWithoutPlayerInput = {
    create?:
      | XOR<ClubPlayerCreateWithoutPlayerInput, ClubPlayerUncheckedCreateWithoutPlayerInput>
      | ClubPlayerCreateWithoutPlayerInput[]
      | ClubPlayerUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | ClubPlayerCreateOrConnectWithoutPlayerInput
      | ClubPlayerCreateOrConnectWithoutPlayerInput[];
    createMany?: ClubPlayerCreateManyPlayerInputEnvelope;
    connect?: ClubPlayerWhereUniqueInput | ClubPlayerWhereUniqueInput[];
  };

  export type QualityCreateNestedOneWithoutPlayersInput = {
    create?: XOR<QualityCreateWithoutPlayersInput, QualityUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: QualityCreateOrConnectWithoutPlayersInput;
    connect?: QualityWhereUniqueInput;
  };

  export type RarityCreateNestedOneWithoutPlayersInput = {
    create?: XOR<RarityCreateWithoutPlayersInput, RarityUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: RarityCreateOrConnectWithoutPlayersInput;
    connect?: RarityWhereUniqueInput;
  };

  export type CountryCreateNestedOneWithoutPlayersInput = {
    create?: XOR<CountryCreateWithoutPlayersInput, CountryUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: CountryCreateOrConnectWithoutPlayersInput;
    connect?: CountryWhereUniqueInput;
  };

  export type LeagueCreateNestedOneWithoutPlayersInput = {
    create?: XOR<LeagueCreateWithoutPlayersInput, LeagueUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: LeagueCreateOrConnectWithoutPlayersInput;
    connect?: LeagueWhereUniqueInput;
  };

  export type ClubCreateNestedOneWithoutPlayersInput = {
    create?: XOR<ClubCreateWithoutPlayersInput, ClubUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: ClubCreateOrConnectWithoutPlayersInput;
    connect?: ClubWhereUniqueInput;
  };

  export type PlayerPositionUncheckedCreateNestedManyWithoutPlayerInput = {
    create?:
      | XOR<PlayerPositionCreateWithoutPlayerInput, PlayerPositionUncheckedCreateWithoutPlayerInput>
      | PlayerPositionCreateWithoutPlayerInput[]
      | PlayerPositionUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | PlayerPositionCreateOrConnectWithoutPlayerInput
      | PlayerPositionCreateOrConnectWithoutPlayerInput[];
    createMany?: PlayerPositionCreateManyPlayerInputEnvelope;
    connect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
  };

  export type ClubPlayerUncheckedCreateNestedManyWithoutPlayerInput = {
    create?:
      | XOR<ClubPlayerCreateWithoutPlayerInput, ClubPlayerUncheckedCreateWithoutPlayerInput>
      | ClubPlayerCreateWithoutPlayerInput[]
      | ClubPlayerUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | ClubPlayerCreateOrConnectWithoutPlayerInput
      | ClubPlayerCreateOrConnectWithoutPlayerInput[];
    createMany?: ClubPlayerCreateManyPlayerInputEnvelope;
    connect?: ClubPlayerWhereUniqueInput | ClubPlayerWhereUniqueInput[];
  };

  export type PlayerPositionUpdateManyWithoutPlayerNestedInput = {
    create?:
      | XOR<PlayerPositionCreateWithoutPlayerInput, PlayerPositionUncheckedCreateWithoutPlayerInput>
      | PlayerPositionCreateWithoutPlayerInput[]
      | PlayerPositionUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | PlayerPositionCreateOrConnectWithoutPlayerInput
      | PlayerPositionCreateOrConnectWithoutPlayerInput[];
    upsert?:
      | PlayerPositionUpsertWithWhereUniqueWithoutPlayerInput
      | PlayerPositionUpsertWithWhereUniqueWithoutPlayerInput[];
    createMany?: PlayerPositionCreateManyPlayerInputEnvelope;
    set?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    disconnect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    delete?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    connect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    update?:
      | PlayerPositionUpdateWithWhereUniqueWithoutPlayerInput
      | PlayerPositionUpdateWithWhereUniqueWithoutPlayerInput[];
    updateMany?:
      | PlayerPositionUpdateManyWithWhereWithoutPlayerInput
      | PlayerPositionUpdateManyWithWhereWithoutPlayerInput[];
    deleteMany?: PlayerPositionScalarWhereInput | PlayerPositionScalarWhereInput[];
  };

  export type ClubPlayerUpdateManyWithoutPlayerNestedInput = {
    create?:
      | XOR<ClubPlayerCreateWithoutPlayerInput, ClubPlayerUncheckedCreateWithoutPlayerInput>
      | ClubPlayerCreateWithoutPlayerInput[]
      | ClubPlayerUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | ClubPlayerCreateOrConnectWithoutPlayerInput
      | ClubPlayerCreateOrConnectWithoutPlayerInput[];
    upsert?:
      | ClubPlayerUpsertWithWhereUniqueWithoutPlayerInput
      | ClubPlayerUpsertWithWhereUniqueWithoutPlayerInput[];
    createMany?: ClubPlayerCreateManyPlayerInputEnvelope;
    set?: ClubPlayerWhereUniqueInput | ClubPlayerWhereUniqueInput[];
    disconnect?: ClubPlayerWhereUniqueInput | ClubPlayerWhereUniqueInput[];
    delete?: ClubPlayerWhereUniqueInput | ClubPlayerWhereUniqueInput[];
    connect?: ClubPlayerWhereUniqueInput | ClubPlayerWhereUniqueInput[];
    update?:
      | ClubPlayerUpdateWithWhereUniqueWithoutPlayerInput
      | ClubPlayerUpdateWithWhereUniqueWithoutPlayerInput[];
    updateMany?:
      | ClubPlayerUpdateManyWithWhereWithoutPlayerInput
      | ClubPlayerUpdateManyWithWhereWithoutPlayerInput[];
    deleteMany?: ClubPlayerScalarWhereInput | ClubPlayerScalarWhereInput[];
  };

  export type QualityUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<QualityCreateWithoutPlayersInput, QualityUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: QualityCreateOrConnectWithoutPlayersInput;
    upsert?: QualityUpsertWithoutPlayersInput;
    connect?: QualityWhereUniqueInput;
    update?: XOR<
      XOR<QualityUpdateToOneWithWhereWithoutPlayersInput, QualityUpdateWithoutPlayersInput>,
      QualityUncheckedUpdateWithoutPlayersInput
    >;
  };

  export type RarityUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<RarityCreateWithoutPlayersInput, RarityUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: RarityCreateOrConnectWithoutPlayersInput;
    upsert?: RarityUpsertWithoutPlayersInput;
    connect?: RarityWhereUniqueInput;
    update?: XOR<
      XOR<RarityUpdateToOneWithWhereWithoutPlayersInput, RarityUpdateWithoutPlayersInput>,
      RarityUncheckedUpdateWithoutPlayersInput
    >;
  };

  export type CountryUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<CountryCreateWithoutPlayersInput, CountryUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: CountryCreateOrConnectWithoutPlayersInput;
    upsert?: CountryUpsertWithoutPlayersInput;
    connect?: CountryWhereUniqueInput;
    update?: XOR<
      XOR<CountryUpdateToOneWithWhereWithoutPlayersInput, CountryUpdateWithoutPlayersInput>,
      CountryUncheckedUpdateWithoutPlayersInput
    >;
  };

  export type LeagueUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<LeagueCreateWithoutPlayersInput, LeagueUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: LeagueCreateOrConnectWithoutPlayersInput;
    upsert?: LeagueUpsertWithoutPlayersInput;
    connect?: LeagueWhereUniqueInput;
    update?: XOR<
      XOR<LeagueUpdateToOneWithWhereWithoutPlayersInput, LeagueUpdateWithoutPlayersInput>,
      LeagueUncheckedUpdateWithoutPlayersInput
    >;
  };

  export type ClubUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<ClubCreateWithoutPlayersInput, ClubUncheckedCreateWithoutPlayersInput>;
    connectOrCreate?: ClubCreateOrConnectWithoutPlayersInput;
    upsert?: ClubUpsertWithoutPlayersInput;
    connect?: ClubWhereUniqueInput;
    update?: XOR<
      XOR<ClubUpdateToOneWithWhereWithoutPlayersInput, ClubUpdateWithoutPlayersInput>,
      ClubUncheckedUpdateWithoutPlayersInput
    >;
  };

  export type PlayerPositionUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?:
      | XOR<PlayerPositionCreateWithoutPlayerInput, PlayerPositionUncheckedCreateWithoutPlayerInput>
      | PlayerPositionCreateWithoutPlayerInput[]
      | PlayerPositionUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | PlayerPositionCreateOrConnectWithoutPlayerInput
      | PlayerPositionCreateOrConnectWithoutPlayerInput[];
    upsert?:
      | PlayerPositionUpsertWithWhereUniqueWithoutPlayerInput
      | PlayerPositionUpsertWithWhereUniqueWithoutPlayerInput[];
    createMany?: PlayerPositionCreateManyPlayerInputEnvelope;
    set?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    disconnect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    delete?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    connect?: PlayerPositionWhereUniqueInput | PlayerPositionWhereUniqueInput[];
    update?:
      | PlayerPositionUpdateWithWhereUniqueWithoutPlayerInput
      | PlayerPositionUpdateWithWhereUniqueWithoutPlayerInput[];
    updateMany?:
      | PlayerPositionUpdateManyWithWhereWithoutPlayerInput
      | PlayerPositionUpdateManyWithWhereWithoutPlayerInput[];
    deleteMany?: PlayerPositionScalarWhereInput | PlayerPositionScalarWhereInput[];
  };

  export type ClubPlayerUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?:
      | XOR<ClubPlayerCreateWithoutPlayerInput, ClubPlayerUncheckedCreateWithoutPlayerInput>
      | ClubPlayerCreateWithoutPlayerInput[]
      | ClubPlayerUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?:
      | ClubPlayerCreateOrConnectWithoutPlayerInput
      | ClubPlayerCreateOrConnectWithoutPlayerInput[];
    upsert?:
      | ClubPlayerUpsertWithWhereUniqueWithoutPlayerInput
      | ClubPlayerUpsertWithWhereUniqueWithoutPlayerInput[];
    createMany?: ClubPlayerCreateManyPlayerInputEnvelope;
    set?: ClubPlayerWhereUniqueInput | ClubPlayerWhereUniqueInput[];
    disconnect?: ClubPlayerWhereUniqueInput | ClubPlayerWhereUniqueInput[];
    delete?: ClubPlayerWhereUniqueInput | ClubPlayerWhereUniqueInput[];
    connect?: ClubPlayerWhereUniqueInput | ClubPlayerWhereUniqueInput[];
    update?:
      | ClubPlayerUpdateWithWhereUniqueWithoutPlayerInput
      | ClubPlayerUpdateWithWhereUniqueWithoutPlayerInput[];
    updateMany?:
      | ClubPlayerUpdateManyWithWhereWithoutPlayerInput
      | ClubPlayerUpdateManyWithWhereWithoutPlayerInput[];
    deleteMany?: ClubPlayerScalarWhereInput | ClubPlayerScalarWhereInput[];
  };

  export type PlayerCreateNestedOneWithoutClubPlayersInput = {
    create?: XOR<PlayerCreateWithoutClubPlayersInput, PlayerUncheckedCreateWithoutClubPlayersInput>;
    connectOrCreate?: PlayerCreateOrConnectWithoutClubPlayersInput;
    connect?: PlayerWhereUniqueInput;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type PlayerUpdateOneRequiredWithoutClubPlayersNestedInput = {
    create?: XOR<PlayerCreateWithoutClubPlayersInput, PlayerUncheckedCreateWithoutClubPlayersInput>;
    connectOrCreate?: PlayerCreateOrConnectWithoutClubPlayersInput;
    upsert?: PlayerUpsertWithoutClubPlayersInput;
    connect?: PlayerWhereUniqueInput;
    update?: XOR<
      XOR<PlayerUpdateToOneWithWhereWithoutClubPlayersInput, PlayerUpdateWithoutClubPlayersInput>,
      PlayerUncheckedUpdateWithoutClubPlayersInput
    >;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type PlayerCreateWithoutQualityInput = {
    displayName: string;
    fullName: string;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    positions?: PlayerPositionCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerCreateNestedManyWithoutPlayerInput;
    rarity: RarityCreateNestedOneWithoutPlayersInput;
    country: CountryCreateNestedOneWithoutPlayersInput;
    league: LeagueCreateNestedOneWithoutPlayersInput;
    club: ClubCreateNestedOneWithoutPlayersInput;
  };

  export type PlayerUncheckedCreateWithoutQualityInput = {
    id?: number;
    displayName: string;
    fullName: string;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    leagueId: number;
    positions?: PlayerPositionUncheckedCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerUncheckedCreateNestedManyWithoutPlayerInput;
  };

  export type PlayerCreateOrConnectWithoutQualityInput = {
    where: PlayerWhereUniqueInput;
    create: XOR<PlayerCreateWithoutQualityInput, PlayerUncheckedCreateWithoutQualityInput>;
  };

  export type PlayerCreateManyQualityInputEnvelope = {
    data: PlayerCreateManyQualityInput | PlayerCreateManyQualityInput[];
    skipDuplicates?: boolean;
  };

  export type PlayerUpsertWithWhereUniqueWithoutQualityInput = {
    where: PlayerWhereUniqueInput;
    update: XOR<PlayerUpdateWithoutQualityInput, PlayerUncheckedUpdateWithoutQualityInput>;
    create: XOR<PlayerCreateWithoutQualityInput, PlayerUncheckedCreateWithoutQualityInput>;
  };

  export type PlayerUpdateWithWhereUniqueWithoutQualityInput = {
    where: PlayerWhereUniqueInput;
    data: XOR<PlayerUpdateWithoutQualityInput, PlayerUncheckedUpdateWithoutQualityInput>;
  };

  export type PlayerUpdateManyWithWhereWithoutQualityInput = {
    where: PlayerScalarWhereInput;
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutQualityInput>;
  };

  export type PlayerScalarWhereInput = {
    AND?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
    OR?: PlayerScalarWhereInput[];
    NOT?: PlayerScalarWhereInput | PlayerScalarWhereInput[];
    id?: IntFilter<'Player'> | number;
    displayName?: StringFilter<'Player'> | string;
    fullName?: StringFilter<'Player'> | string;
    qualityId?: IntFilter<'Player'> | number;
    rarityId?: IntFilter<'Player'> | number;
    ovr?: IntFilter<'Player'> | number;
    rating1?: IntFilter<'Player'> | number;
    rating2?: IntFilter<'Player'> | number;
    rating3?: IntFilter<'Player'> | number;
    rating4?: IntFilter<'Player'> | number;
    rating5?: IntFilter<'Player'> | number;
    rating6?: IntFilter<'Player'> | number;
    countryId?: IntFilter<'Player'> | number;
    clubId?: IntFilter<'Player'> | number;
    leagueId?: IntFilter<'Player'> | number;
  };

  export type PlayerCreateWithoutRarityInput = {
    displayName: string;
    fullName: string;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    positions?: PlayerPositionCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerCreateNestedManyWithoutPlayerInput;
    quality: QualityCreateNestedOneWithoutPlayersInput;
    country: CountryCreateNestedOneWithoutPlayersInput;
    league: LeagueCreateNestedOneWithoutPlayersInput;
    club: ClubCreateNestedOneWithoutPlayersInput;
  };

  export type PlayerUncheckedCreateWithoutRarityInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    leagueId: number;
    positions?: PlayerPositionUncheckedCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerUncheckedCreateNestedManyWithoutPlayerInput;
  };

  export type PlayerCreateOrConnectWithoutRarityInput = {
    where: PlayerWhereUniqueInput;
    create: XOR<PlayerCreateWithoutRarityInput, PlayerUncheckedCreateWithoutRarityInput>;
  };

  export type PlayerCreateManyRarityInputEnvelope = {
    data: PlayerCreateManyRarityInput | PlayerCreateManyRarityInput[];
    skipDuplicates?: boolean;
  };

  export type PlayerUpsertWithWhereUniqueWithoutRarityInput = {
    where: PlayerWhereUniqueInput;
    update: XOR<PlayerUpdateWithoutRarityInput, PlayerUncheckedUpdateWithoutRarityInput>;
    create: XOR<PlayerCreateWithoutRarityInput, PlayerUncheckedCreateWithoutRarityInput>;
  };

  export type PlayerUpdateWithWhereUniqueWithoutRarityInput = {
    where: PlayerWhereUniqueInput;
    data: XOR<PlayerUpdateWithoutRarityInput, PlayerUncheckedUpdateWithoutRarityInput>;
  };

  export type PlayerUpdateManyWithWhereWithoutRarityInput = {
    where: PlayerScalarWhereInput;
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutRarityInput>;
  };

  export type ClubCreateWithoutCountryInput = {
    name: string;
    league: LeagueCreateNestedOneWithoutClubsInput;
    players?: PlayerCreateNestedManyWithoutClubInput;
  };

  export type ClubUncheckedCreateWithoutCountryInput = {
    id?: number;
    name: string;
    leagueId: number;
    players?: PlayerUncheckedCreateNestedManyWithoutClubInput;
  };

  export type ClubCreateOrConnectWithoutCountryInput = {
    where: ClubWhereUniqueInput;
    create: XOR<ClubCreateWithoutCountryInput, ClubUncheckedCreateWithoutCountryInput>;
  };

  export type ClubCreateManyCountryInputEnvelope = {
    data: ClubCreateManyCountryInput | ClubCreateManyCountryInput[];
    skipDuplicates?: boolean;
  };

  export type LeagueCreateWithoutCountryInput = {
    name: string;
    clubs?: ClubCreateNestedManyWithoutLeagueInput;
    players?: PlayerCreateNestedManyWithoutLeagueInput;
  };

  export type LeagueUncheckedCreateWithoutCountryInput = {
    id?: number;
    name: string;
    clubs?: ClubUncheckedCreateNestedManyWithoutLeagueInput;
    players?: PlayerUncheckedCreateNestedManyWithoutLeagueInput;
  };

  export type LeagueCreateOrConnectWithoutCountryInput = {
    where: LeagueWhereUniqueInput;
    create: XOR<LeagueCreateWithoutCountryInput, LeagueUncheckedCreateWithoutCountryInput>;
  };

  export type LeagueCreateManyCountryInputEnvelope = {
    data: LeagueCreateManyCountryInput | LeagueCreateManyCountryInput[];
    skipDuplicates?: boolean;
  };

  export type PlayerCreateWithoutCountryInput = {
    displayName: string;
    fullName: string;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    positions?: PlayerPositionCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerCreateNestedManyWithoutPlayerInput;
    quality: QualityCreateNestedOneWithoutPlayersInput;
    rarity: RarityCreateNestedOneWithoutPlayersInput;
    league: LeagueCreateNestedOneWithoutPlayersInput;
    club: ClubCreateNestedOneWithoutPlayersInput;
  };

  export type PlayerUncheckedCreateWithoutCountryInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    clubId: number;
    leagueId: number;
    positions?: PlayerPositionUncheckedCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerUncheckedCreateNestedManyWithoutPlayerInput;
  };

  export type PlayerCreateOrConnectWithoutCountryInput = {
    where: PlayerWhereUniqueInput;
    create: XOR<PlayerCreateWithoutCountryInput, PlayerUncheckedCreateWithoutCountryInput>;
  };

  export type PlayerCreateManyCountryInputEnvelope = {
    data: PlayerCreateManyCountryInput | PlayerCreateManyCountryInput[];
    skipDuplicates?: boolean;
  };

  export type ClubUpsertWithWhereUniqueWithoutCountryInput = {
    where: ClubWhereUniqueInput;
    update: XOR<ClubUpdateWithoutCountryInput, ClubUncheckedUpdateWithoutCountryInput>;
    create: XOR<ClubCreateWithoutCountryInput, ClubUncheckedCreateWithoutCountryInput>;
  };

  export type ClubUpdateWithWhereUniqueWithoutCountryInput = {
    where: ClubWhereUniqueInput;
    data: XOR<ClubUpdateWithoutCountryInput, ClubUncheckedUpdateWithoutCountryInput>;
  };

  export type ClubUpdateManyWithWhereWithoutCountryInput = {
    where: ClubScalarWhereInput;
    data: XOR<ClubUpdateManyMutationInput, ClubUncheckedUpdateManyWithoutCountryInput>;
  };

  export type ClubScalarWhereInput = {
    AND?: ClubScalarWhereInput | ClubScalarWhereInput[];
    OR?: ClubScalarWhereInput[];
    NOT?: ClubScalarWhereInput | ClubScalarWhereInput[];
    id?: IntFilter<'Club'> | number;
    name?: StringFilter<'Club'> | string;
    countryId?: IntFilter<'Club'> | number;
    leagueId?: IntFilter<'Club'> | number;
  };

  export type LeagueUpsertWithWhereUniqueWithoutCountryInput = {
    where: LeagueWhereUniqueInput;
    update: XOR<LeagueUpdateWithoutCountryInput, LeagueUncheckedUpdateWithoutCountryInput>;
    create: XOR<LeagueCreateWithoutCountryInput, LeagueUncheckedCreateWithoutCountryInput>;
  };

  export type LeagueUpdateWithWhereUniqueWithoutCountryInput = {
    where: LeagueWhereUniqueInput;
    data: XOR<LeagueUpdateWithoutCountryInput, LeagueUncheckedUpdateWithoutCountryInput>;
  };

  export type LeagueUpdateManyWithWhereWithoutCountryInput = {
    where: LeagueScalarWhereInput;
    data: XOR<LeagueUpdateManyMutationInput, LeagueUncheckedUpdateManyWithoutCountryInput>;
  };

  export type LeagueScalarWhereInput = {
    AND?: LeagueScalarWhereInput | LeagueScalarWhereInput[];
    OR?: LeagueScalarWhereInput[];
    NOT?: LeagueScalarWhereInput | LeagueScalarWhereInput[];
    id?: IntFilter<'League'> | number;
    name?: StringFilter<'League'> | string;
    countryId?: IntFilter<'League'> | number;
  };

  export type PlayerUpsertWithWhereUniqueWithoutCountryInput = {
    where: PlayerWhereUniqueInput;
    update: XOR<PlayerUpdateWithoutCountryInput, PlayerUncheckedUpdateWithoutCountryInput>;
    create: XOR<PlayerCreateWithoutCountryInput, PlayerUncheckedCreateWithoutCountryInput>;
  };

  export type PlayerUpdateWithWhereUniqueWithoutCountryInput = {
    where: PlayerWhereUniqueInput;
    data: XOR<PlayerUpdateWithoutCountryInput, PlayerUncheckedUpdateWithoutCountryInput>;
  };

  export type PlayerUpdateManyWithWhereWithoutCountryInput = {
    where: PlayerScalarWhereInput;
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutCountryInput>;
  };

  export type PlayerPositionCreateWithoutPositionInput = {
    player: PlayerCreateNestedOneWithoutPositionsInput;
  };

  export type PlayerPositionUncheckedCreateWithoutPositionInput = {
    id?: number;
    playerId: number;
  };

  export type PlayerPositionCreateOrConnectWithoutPositionInput = {
    where: PlayerPositionWhereUniqueInput;
    create: XOR<
      PlayerPositionCreateWithoutPositionInput,
      PlayerPositionUncheckedCreateWithoutPositionInput
    >;
  };

  export type PlayerPositionCreateManyPositionInputEnvelope = {
    data: PlayerPositionCreateManyPositionInput | PlayerPositionCreateManyPositionInput[];
    skipDuplicates?: boolean;
  };

  export type PlayerPositionUpsertWithWhereUniqueWithoutPositionInput = {
    where: PlayerPositionWhereUniqueInput;
    update: XOR<
      PlayerPositionUpdateWithoutPositionInput,
      PlayerPositionUncheckedUpdateWithoutPositionInput
    >;
    create: XOR<
      PlayerPositionCreateWithoutPositionInput,
      PlayerPositionUncheckedCreateWithoutPositionInput
    >;
  };

  export type PlayerPositionUpdateWithWhereUniqueWithoutPositionInput = {
    where: PlayerPositionWhereUniqueInput;
    data: XOR<
      PlayerPositionUpdateWithoutPositionInput,
      PlayerPositionUncheckedUpdateWithoutPositionInput
    >;
  };

  export type PlayerPositionUpdateManyWithWhereWithoutPositionInput = {
    where: PlayerPositionScalarWhereInput;
    data: XOR<
      PlayerPositionUpdateManyMutationInput,
      PlayerPositionUncheckedUpdateManyWithoutPositionInput
    >;
  };

  export type PlayerPositionScalarWhereInput = {
    AND?: PlayerPositionScalarWhereInput | PlayerPositionScalarWhereInput[];
    OR?: PlayerPositionScalarWhereInput[];
    NOT?: PlayerPositionScalarWhereInput | PlayerPositionScalarWhereInput[];
    id?: IntFilter<'PlayerPosition'> | number;
    playerId?: IntFilter<'PlayerPosition'> | number;
    positionId?: IntFilter<'PlayerPosition'> | number;
  };

  export type PlayerCreateWithoutPositionsInput = {
    displayName: string;
    fullName: string;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    clubPlayers?: ClubPlayerCreateNestedManyWithoutPlayerInput;
    quality: QualityCreateNestedOneWithoutPlayersInput;
    rarity: RarityCreateNestedOneWithoutPlayersInput;
    country: CountryCreateNestedOneWithoutPlayersInput;
    league: LeagueCreateNestedOneWithoutPlayersInput;
    club: ClubCreateNestedOneWithoutPlayersInput;
  };

  export type PlayerUncheckedCreateWithoutPositionsInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    leagueId: number;
    clubPlayers?: ClubPlayerUncheckedCreateNestedManyWithoutPlayerInput;
  };

  export type PlayerCreateOrConnectWithoutPositionsInput = {
    where: PlayerWhereUniqueInput;
    create: XOR<PlayerCreateWithoutPositionsInput, PlayerUncheckedCreateWithoutPositionsInput>;
  };

  export type PositionCreateWithoutPlayersInput = {
    name: string;
  };

  export type PositionUncheckedCreateWithoutPlayersInput = {
    id?: number;
    name: string;
  };

  export type PositionCreateOrConnectWithoutPlayersInput = {
    where: PositionWhereUniqueInput;
    create: XOR<PositionCreateWithoutPlayersInput, PositionUncheckedCreateWithoutPlayersInput>;
  };

  export type PlayerUpsertWithoutPositionsInput = {
    update: XOR<PlayerUpdateWithoutPositionsInput, PlayerUncheckedUpdateWithoutPositionsInput>;
    create: XOR<PlayerCreateWithoutPositionsInput, PlayerUncheckedCreateWithoutPositionsInput>;
    where?: PlayerWhereInput;
  };

  export type PlayerUpdateToOneWithWhereWithoutPositionsInput = {
    where?: PlayerWhereInput;
    data: XOR<PlayerUpdateWithoutPositionsInput, PlayerUncheckedUpdateWithoutPositionsInput>;
  };

  export type PlayerUpdateWithoutPositionsInput = {
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    clubPlayers?: ClubPlayerUpdateManyWithoutPlayerNestedInput;
    quality?: QualityUpdateOneRequiredWithoutPlayersNestedInput;
    rarity?: RarityUpdateOneRequiredWithoutPlayersNestedInput;
    country?: CountryUpdateOneRequiredWithoutPlayersNestedInput;
    league?: LeagueUpdateOneRequiredWithoutPlayersNestedInput;
    club?: ClubUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type PlayerUncheckedUpdateWithoutPositionsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
    clubPlayers?: ClubPlayerUncheckedUpdateManyWithoutPlayerNestedInput;
  };

  export type PositionUpsertWithoutPlayersInput = {
    update: XOR<PositionUpdateWithoutPlayersInput, PositionUncheckedUpdateWithoutPlayersInput>;
    create: XOR<PositionCreateWithoutPlayersInput, PositionUncheckedCreateWithoutPlayersInput>;
    where?: PositionWhereInput;
  };

  export type PositionUpdateToOneWithWhereWithoutPlayersInput = {
    where?: PositionWhereInput;
    data: XOR<PositionUpdateWithoutPlayersInput, PositionUncheckedUpdateWithoutPlayersInput>;
  };

  export type PositionUpdateWithoutPlayersInput = {
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type PositionUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type CountryCreateWithoutLeaguesInput = {
    name: string;
    clubs?: ClubCreateNestedManyWithoutCountryInput;
    players?: PlayerCreateNestedManyWithoutCountryInput;
  };

  export type CountryUncheckedCreateWithoutLeaguesInput = {
    id?: number;
    name: string;
    clubs?: ClubUncheckedCreateNestedManyWithoutCountryInput;
    players?: PlayerUncheckedCreateNestedManyWithoutCountryInput;
  };

  export type CountryCreateOrConnectWithoutLeaguesInput = {
    where: CountryWhereUniqueInput;
    create: XOR<CountryCreateWithoutLeaguesInput, CountryUncheckedCreateWithoutLeaguesInput>;
  };

  export type ClubCreateWithoutLeagueInput = {
    name: string;
    country: CountryCreateNestedOneWithoutClubsInput;
    players?: PlayerCreateNestedManyWithoutClubInput;
  };

  export type ClubUncheckedCreateWithoutLeagueInput = {
    id?: number;
    name: string;
    countryId: number;
    players?: PlayerUncheckedCreateNestedManyWithoutClubInput;
  };

  export type ClubCreateOrConnectWithoutLeagueInput = {
    where: ClubWhereUniqueInput;
    create: XOR<ClubCreateWithoutLeagueInput, ClubUncheckedCreateWithoutLeagueInput>;
  };

  export type ClubCreateManyLeagueInputEnvelope = {
    data: ClubCreateManyLeagueInput | ClubCreateManyLeagueInput[];
    skipDuplicates?: boolean;
  };

  export type PlayerCreateWithoutLeagueInput = {
    displayName: string;
    fullName: string;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    positions?: PlayerPositionCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerCreateNestedManyWithoutPlayerInput;
    quality: QualityCreateNestedOneWithoutPlayersInput;
    rarity: RarityCreateNestedOneWithoutPlayersInput;
    country: CountryCreateNestedOneWithoutPlayersInput;
    club: ClubCreateNestedOneWithoutPlayersInput;
  };

  export type PlayerUncheckedCreateWithoutLeagueInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    positions?: PlayerPositionUncheckedCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerUncheckedCreateNestedManyWithoutPlayerInput;
  };

  export type PlayerCreateOrConnectWithoutLeagueInput = {
    where: PlayerWhereUniqueInput;
    create: XOR<PlayerCreateWithoutLeagueInput, PlayerUncheckedCreateWithoutLeagueInput>;
  };

  export type PlayerCreateManyLeagueInputEnvelope = {
    data: PlayerCreateManyLeagueInput | PlayerCreateManyLeagueInput[];
    skipDuplicates?: boolean;
  };

  export type CountryUpsertWithoutLeaguesInput = {
    update: XOR<CountryUpdateWithoutLeaguesInput, CountryUncheckedUpdateWithoutLeaguesInput>;
    create: XOR<CountryCreateWithoutLeaguesInput, CountryUncheckedCreateWithoutLeaguesInput>;
    where?: CountryWhereInput;
  };

  export type CountryUpdateToOneWithWhereWithoutLeaguesInput = {
    where?: CountryWhereInput;
    data: XOR<CountryUpdateWithoutLeaguesInput, CountryUncheckedUpdateWithoutLeaguesInput>;
  };

  export type CountryUpdateWithoutLeaguesInput = {
    name?: StringFieldUpdateOperationsInput | string;
    clubs?: ClubUpdateManyWithoutCountryNestedInput;
    players?: PlayerUpdateManyWithoutCountryNestedInput;
  };

  export type CountryUncheckedUpdateWithoutLeaguesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    clubs?: ClubUncheckedUpdateManyWithoutCountryNestedInput;
    players?: PlayerUncheckedUpdateManyWithoutCountryNestedInput;
  };

  export type ClubUpsertWithWhereUniqueWithoutLeagueInput = {
    where: ClubWhereUniqueInput;
    update: XOR<ClubUpdateWithoutLeagueInput, ClubUncheckedUpdateWithoutLeagueInput>;
    create: XOR<ClubCreateWithoutLeagueInput, ClubUncheckedCreateWithoutLeagueInput>;
  };

  export type ClubUpdateWithWhereUniqueWithoutLeagueInput = {
    where: ClubWhereUniqueInput;
    data: XOR<ClubUpdateWithoutLeagueInput, ClubUncheckedUpdateWithoutLeagueInput>;
  };

  export type ClubUpdateManyWithWhereWithoutLeagueInput = {
    where: ClubScalarWhereInput;
    data: XOR<ClubUpdateManyMutationInput, ClubUncheckedUpdateManyWithoutLeagueInput>;
  };

  export type PlayerUpsertWithWhereUniqueWithoutLeagueInput = {
    where: PlayerWhereUniqueInput;
    update: XOR<PlayerUpdateWithoutLeagueInput, PlayerUncheckedUpdateWithoutLeagueInput>;
    create: XOR<PlayerCreateWithoutLeagueInput, PlayerUncheckedCreateWithoutLeagueInput>;
  };

  export type PlayerUpdateWithWhereUniqueWithoutLeagueInput = {
    where: PlayerWhereUniqueInput;
    data: XOR<PlayerUpdateWithoutLeagueInput, PlayerUncheckedUpdateWithoutLeagueInput>;
  };

  export type PlayerUpdateManyWithWhereWithoutLeagueInput = {
    where: PlayerScalarWhereInput;
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutLeagueInput>;
  };

  export type CountryCreateWithoutClubsInput = {
    name: string;
    leagues?: LeagueCreateNestedManyWithoutCountryInput;
    players?: PlayerCreateNestedManyWithoutCountryInput;
  };

  export type CountryUncheckedCreateWithoutClubsInput = {
    id?: number;
    name: string;
    leagues?: LeagueUncheckedCreateNestedManyWithoutCountryInput;
    players?: PlayerUncheckedCreateNestedManyWithoutCountryInput;
  };

  export type CountryCreateOrConnectWithoutClubsInput = {
    where: CountryWhereUniqueInput;
    create: XOR<CountryCreateWithoutClubsInput, CountryUncheckedCreateWithoutClubsInput>;
  };

  export type LeagueCreateWithoutClubsInput = {
    name: string;
    country: CountryCreateNestedOneWithoutLeaguesInput;
    players?: PlayerCreateNestedManyWithoutLeagueInput;
  };

  export type LeagueUncheckedCreateWithoutClubsInput = {
    id?: number;
    name: string;
    countryId: number;
    players?: PlayerUncheckedCreateNestedManyWithoutLeagueInput;
  };

  export type LeagueCreateOrConnectWithoutClubsInput = {
    where: LeagueWhereUniqueInput;
    create: XOR<LeagueCreateWithoutClubsInput, LeagueUncheckedCreateWithoutClubsInput>;
  };

  export type PlayerCreateWithoutClubInput = {
    displayName: string;
    fullName: string;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    positions?: PlayerPositionCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerCreateNestedManyWithoutPlayerInput;
    quality: QualityCreateNestedOneWithoutPlayersInput;
    rarity: RarityCreateNestedOneWithoutPlayersInput;
    country: CountryCreateNestedOneWithoutPlayersInput;
    league: LeagueCreateNestedOneWithoutPlayersInput;
  };

  export type PlayerUncheckedCreateWithoutClubInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    leagueId: number;
    positions?: PlayerPositionUncheckedCreateNestedManyWithoutPlayerInput;
    clubPlayers?: ClubPlayerUncheckedCreateNestedManyWithoutPlayerInput;
  };

  export type PlayerCreateOrConnectWithoutClubInput = {
    where: PlayerWhereUniqueInput;
    create: XOR<PlayerCreateWithoutClubInput, PlayerUncheckedCreateWithoutClubInput>;
  };

  export type PlayerCreateManyClubInputEnvelope = {
    data: PlayerCreateManyClubInput | PlayerCreateManyClubInput[];
    skipDuplicates?: boolean;
  };

  export type CountryUpsertWithoutClubsInput = {
    update: XOR<CountryUpdateWithoutClubsInput, CountryUncheckedUpdateWithoutClubsInput>;
    create: XOR<CountryCreateWithoutClubsInput, CountryUncheckedCreateWithoutClubsInput>;
    where?: CountryWhereInput;
  };

  export type CountryUpdateToOneWithWhereWithoutClubsInput = {
    where?: CountryWhereInput;
    data: XOR<CountryUpdateWithoutClubsInput, CountryUncheckedUpdateWithoutClubsInput>;
  };

  export type CountryUpdateWithoutClubsInput = {
    name?: StringFieldUpdateOperationsInput | string;
    leagues?: LeagueUpdateManyWithoutCountryNestedInput;
    players?: PlayerUpdateManyWithoutCountryNestedInput;
  };

  export type CountryUncheckedUpdateWithoutClubsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    leagues?: LeagueUncheckedUpdateManyWithoutCountryNestedInput;
    players?: PlayerUncheckedUpdateManyWithoutCountryNestedInput;
  };

  export type LeagueUpsertWithoutClubsInput = {
    update: XOR<LeagueUpdateWithoutClubsInput, LeagueUncheckedUpdateWithoutClubsInput>;
    create: XOR<LeagueCreateWithoutClubsInput, LeagueUncheckedCreateWithoutClubsInput>;
    where?: LeagueWhereInput;
  };

  export type LeagueUpdateToOneWithWhereWithoutClubsInput = {
    where?: LeagueWhereInput;
    data: XOR<LeagueUpdateWithoutClubsInput, LeagueUncheckedUpdateWithoutClubsInput>;
  };

  export type LeagueUpdateWithoutClubsInput = {
    name?: StringFieldUpdateOperationsInput | string;
    country?: CountryUpdateOneRequiredWithoutLeaguesNestedInput;
    players?: PlayerUpdateManyWithoutLeagueNestedInput;
  };

  export type LeagueUncheckedUpdateWithoutClubsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    countryId?: IntFieldUpdateOperationsInput | number;
    players?: PlayerUncheckedUpdateManyWithoutLeagueNestedInput;
  };

  export type PlayerUpsertWithWhereUniqueWithoutClubInput = {
    where: PlayerWhereUniqueInput;
    update: XOR<PlayerUpdateWithoutClubInput, PlayerUncheckedUpdateWithoutClubInput>;
    create: XOR<PlayerCreateWithoutClubInput, PlayerUncheckedCreateWithoutClubInput>;
  };

  export type PlayerUpdateWithWhereUniqueWithoutClubInput = {
    where: PlayerWhereUniqueInput;
    data: XOR<PlayerUpdateWithoutClubInput, PlayerUncheckedUpdateWithoutClubInput>;
  };

  export type PlayerUpdateManyWithWhereWithoutClubInput = {
    where: PlayerScalarWhereInput;
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutClubInput>;
  };

  export type PlayerPositionCreateWithoutPlayerInput = {
    position: PositionCreateNestedOneWithoutPlayersInput;
  };

  export type PlayerPositionUncheckedCreateWithoutPlayerInput = {
    id?: number;
    positionId: number;
  };

  export type PlayerPositionCreateOrConnectWithoutPlayerInput = {
    where: PlayerPositionWhereUniqueInput;
    create: XOR<
      PlayerPositionCreateWithoutPlayerInput,
      PlayerPositionUncheckedCreateWithoutPlayerInput
    >;
  };

  export type PlayerPositionCreateManyPlayerInputEnvelope = {
    data: PlayerPositionCreateManyPlayerInput | PlayerPositionCreateManyPlayerInput[];
    skipDuplicates?: boolean;
  };

  export type ClubPlayerCreateWithoutPlayerInput = {
    sbc?: boolean;
    squad?: boolean;
  };

  export type ClubPlayerUncheckedCreateWithoutPlayerInput = {
    id?: number;
    sbc?: boolean;
    squad?: boolean;
  };

  export type ClubPlayerCreateOrConnectWithoutPlayerInput = {
    where: ClubPlayerWhereUniqueInput;
    create: XOR<ClubPlayerCreateWithoutPlayerInput, ClubPlayerUncheckedCreateWithoutPlayerInput>;
  };

  export type ClubPlayerCreateManyPlayerInputEnvelope = {
    data: ClubPlayerCreateManyPlayerInput | ClubPlayerCreateManyPlayerInput[];
    skipDuplicates?: boolean;
  };

  export type QualityCreateWithoutPlayersInput = {
    name: string;
  };

  export type QualityUncheckedCreateWithoutPlayersInput = {
    id?: number;
    name: string;
  };

  export type QualityCreateOrConnectWithoutPlayersInput = {
    where: QualityWhereUniqueInput;
    create: XOR<QualityCreateWithoutPlayersInput, QualityUncheckedCreateWithoutPlayersInput>;
  };

  export type RarityCreateWithoutPlayersInput = {
    name: string;
  };

  export type RarityUncheckedCreateWithoutPlayersInput = {
    id?: number;
    name: string;
  };

  export type RarityCreateOrConnectWithoutPlayersInput = {
    where: RarityWhereUniqueInput;
    create: XOR<RarityCreateWithoutPlayersInput, RarityUncheckedCreateWithoutPlayersInput>;
  };

  export type CountryCreateWithoutPlayersInput = {
    name: string;
    clubs?: ClubCreateNestedManyWithoutCountryInput;
    leagues?: LeagueCreateNestedManyWithoutCountryInput;
  };

  export type CountryUncheckedCreateWithoutPlayersInput = {
    id?: number;
    name: string;
    clubs?: ClubUncheckedCreateNestedManyWithoutCountryInput;
    leagues?: LeagueUncheckedCreateNestedManyWithoutCountryInput;
  };

  export type CountryCreateOrConnectWithoutPlayersInput = {
    where: CountryWhereUniqueInput;
    create: XOR<CountryCreateWithoutPlayersInput, CountryUncheckedCreateWithoutPlayersInput>;
  };

  export type LeagueCreateWithoutPlayersInput = {
    name: string;
    country: CountryCreateNestedOneWithoutLeaguesInput;
    clubs?: ClubCreateNestedManyWithoutLeagueInput;
  };

  export type LeagueUncheckedCreateWithoutPlayersInput = {
    id?: number;
    name: string;
    countryId: number;
    clubs?: ClubUncheckedCreateNestedManyWithoutLeagueInput;
  };

  export type LeagueCreateOrConnectWithoutPlayersInput = {
    where: LeagueWhereUniqueInput;
    create: XOR<LeagueCreateWithoutPlayersInput, LeagueUncheckedCreateWithoutPlayersInput>;
  };

  export type ClubCreateWithoutPlayersInput = {
    name: string;
    country: CountryCreateNestedOneWithoutClubsInput;
    league: LeagueCreateNestedOneWithoutClubsInput;
  };

  export type ClubUncheckedCreateWithoutPlayersInput = {
    id?: number;
    name: string;
    countryId: number;
    leagueId: number;
  };

  export type ClubCreateOrConnectWithoutPlayersInput = {
    where: ClubWhereUniqueInput;
    create: XOR<ClubCreateWithoutPlayersInput, ClubUncheckedCreateWithoutPlayersInput>;
  };

  export type PlayerPositionUpsertWithWhereUniqueWithoutPlayerInput = {
    where: PlayerPositionWhereUniqueInput;
    update: XOR<
      PlayerPositionUpdateWithoutPlayerInput,
      PlayerPositionUncheckedUpdateWithoutPlayerInput
    >;
    create: XOR<
      PlayerPositionCreateWithoutPlayerInput,
      PlayerPositionUncheckedCreateWithoutPlayerInput
    >;
  };

  export type PlayerPositionUpdateWithWhereUniqueWithoutPlayerInput = {
    where: PlayerPositionWhereUniqueInput;
    data: XOR<
      PlayerPositionUpdateWithoutPlayerInput,
      PlayerPositionUncheckedUpdateWithoutPlayerInput
    >;
  };

  export type PlayerPositionUpdateManyWithWhereWithoutPlayerInput = {
    where: PlayerPositionScalarWhereInput;
    data: XOR<
      PlayerPositionUpdateManyMutationInput,
      PlayerPositionUncheckedUpdateManyWithoutPlayerInput
    >;
  };

  export type ClubPlayerUpsertWithWhereUniqueWithoutPlayerInput = {
    where: ClubPlayerWhereUniqueInput;
    update: XOR<ClubPlayerUpdateWithoutPlayerInput, ClubPlayerUncheckedUpdateWithoutPlayerInput>;
    create: XOR<ClubPlayerCreateWithoutPlayerInput, ClubPlayerUncheckedCreateWithoutPlayerInput>;
  };

  export type ClubPlayerUpdateWithWhereUniqueWithoutPlayerInput = {
    where: ClubPlayerWhereUniqueInput;
    data: XOR<ClubPlayerUpdateWithoutPlayerInput, ClubPlayerUncheckedUpdateWithoutPlayerInput>;
  };

  export type ClubPlayerUpdateManyWithWhereWithoutPlayerInput = {
    where: ClubPlayerScalarWhereInput;
    data: XOR<ClubPlayerUpdateManyMutationInput, ClubPlayerUncheckedUpdateManyWithoutPlayerInput>;
  };

  export type ClubPlayerScalarWhereInput = {
    AND?: ClubPlayerScalarWhereInput | ClubPlayerScalarWhereInput[];
    OR?: ClubPlayerScalarWhereInput[];
    NOT?: ClubPlayerScalarWhereInput | ClubPlayerScalarWhereInput[];
    id?: IntFilter<'ClubPlayer'> | number;
    playerId?: IntFilter<'ClubPlayer'> | number;
    sbc?: BoolFilter<'ClubPlayer'> | boolean;
    squad?: BoolFilter<'ClubPlayer'> | boolean;
  };

  export type QualityUpsertWithoutPlayersInput = {
    update: XOR<QualityUpdateWithoutPlayersInput, QualityUncheckedUpdateWithoutPlayersInput>;
    create: XOR<QualityCreateWithoutPlayersInput, QualityUncheckedCreateWithoutPlayersInput>;
    where?: QualityWhereInput;
  };

  export type QualityUpdateToOneWithWhereWithoutPlayersInput = {
    where?: QualityWhereInput;
    data: XOR<QualityUpdateWithoutPlayersInput, QualityUncheckedUpdateWithoutPlayersInput>;
  };

  export type QualityUpdateWithoutPlayersInput = {
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type QualityUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type RarityUpsertWithoutPlayersInput = {
    update: XOR<RarityUpdateWithoutPlayersInput, RarityUncheckedUpdateWithoutPlayersInput>;
    create: XOR<RarityCreateWithoutPlayersInput, RarityUncheckedCreateWithoutPlayersInput>;
    where?: RarityWhereInput;
  };

  export type RarityUpdateToOneWithWhereWithoutPlayersInput = {
    where?: RarityWhereInput;
    data: XOR<RarityUpdateWithoutPlayersInput, RarityUncheckedUpdateWithoutPlayersInput>;
  };

  export type RarityUpdateWithoutPlayersInput = {
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type RarityUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type CountryUpsertWithoutPlayersInput = {
    update: XOR<CountryUpdateWithoutPlayersInput, CountryUncheckedUpdateWithoutPlayersInput>;
    create: XOR<CountryCreateWithoutPlayersInput, CountryUncheckedCreateWithoutPlayersInput>;
    where?: CountryWhereInput;
  };

  export type CountryUpdateToOneWithWhereWithoutPlayersInput = {
    where?: CountryWhereInput;
    data: XOR<CountryUpdateWithoutPlayersInput, CountryUncheckedUpdateWithoutPlayersInput>;
  };

  export type CountryUpdateWithoutPlayersInput = {
    name?: StringFieldUpdateOperationsInput | string;
    clubs?: ClubUpdateManyWithoutCountryNestedInput;
    leagues?: LeagueUpdateManyWithoutCountryNestedInput;
  };

  export type CountryUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    clubs?: ClubUncheckedUpdateManyWithoutCountryNestedInput;
    leagues?: LeagueUncheckedUpdateManyWithoutCountryNestedInput;
  };

  export type LeagueUpsertWithoutPlayersInput = {
    update: XOR<LeagueUpdateWithoutPlayersInput, LeagueUncheckedUpdateWithoutPlayersInput>;
    create: XOR<LeagueCreateWithoutPlayersInput, LeagueUncheckedCreateWithoutPlayersInput>;
    where?: LeagueWhereInput;
  };

  export type LeagueUpdateToOneWithWhereWithoutPlayersInput = {
    where?: LeagueWhereInput;
    data: XOR<LeagueUpdateWithoutPlayersInput, LeagueUncheckedUpdateWithoutPlayersInput>;
  };

  export type LeagueUpdateWithoutPlayersInput = {
    name?: StringFieldUpdateOperationsInput | string;
    country?: CountryUpdateOneRequiredWithoutLeaguesNestedInput;
    clubs?: ClubUpdateManyWithoutLeagueNestedInput;
  };

  export type LeagueUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubs?: ClubUncheckedUpdateManyWithoutLeagueNestedInput;
  };

  export type ClubUpsertWithoutPlayersInput = {
    update: XOR<ClubUpdateWithoutPlayersInput, ClubUncheckedUpdateWithoutPlayersInput>;
    create: XOR<ClubCreateWithoutPlayersInput, ClubUncheckedCreateWithoutPlayersInput>;
    where?: ClubWhereInput;
  };

  export type ClubUpdateToOneWithWhereWithoutPlayersInput = {
    where?: ClubWhereInput;
    data: XOR<ClubUpdateWithoutPlayersInput, ClubUncheckedUpdateWithoutPlayersInput>;
  };

  export type ClubUpdateWithoutPlayersInput = {
    name?: StringFieldUpdateOperationsInput | string;
    country?: CountryUpdateOneRequiredWithoutClubsNestedInput;
    league?: LeagueUpdateOneRequiredWithoutClubsNestedInput;
  };

  export type ClubUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    countryId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerCreateWithoutClubPlayersInput = {
    displayName: string;
    fullName: string;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    positions?: PlayerPositionCreateNestedManyWithoutPlayerInput;
    quality: QualityCreateNestedOneWithoutPlayersInput;
    rarity: RarityCreateNestedOneWithoutPlayersInput;
    country: CountryCreateNestedOneWithoutPlayersInput;
    league: LeagueCreateNestedOneWithoutPlayersInput;
    club: ClubCreateNestedOneWithoutPlayersInput;
  };

  export type PlayerUncheckedCreateWithoutClubPlayersInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    leagueId: number;
    positions?: PlayerPositionUncheckedCreateNestedManyWithoutPlayerInput;
  };

  export type PlayerCreateOrConnectWithoutClubPlayersInput = {
    where: PlayerWhereUniqueInput;
    create: XOR<PlayerCreateWithoutClubPlayersInput, PlayerUncheckedCreateWithoutClubPlayersInput>;
  };

  export type PlayerUpsertWithoutClubPlayersInput = {
    update: XOR<PlayerUpdateWithoutClubPlayersInput, PlayerUncheckedUpdateWithoutClubPlayersInput>;
    create: XOR<PlayerCreateWithoutClubPlayersInput, PlayerUncheckedCreateWithoutClubPlayersInput>;
    where?: PlayerWhereInput;
  };

  export type PlayerUpdateToOneWithWhereWithoutClubPlayersInput = {
    where?: PlayerWhereInput;
    data: XOR<PlayerUpdateWithoutClubPlayersInput, PlayerUncheckedUpdateWithoutClubPlayersInput>;
  };

  export type PlayerUpdateWithoutClubPlayersInput = {
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUpdateManyWithoutPlayerNestedInput;
    quality?: QualityUpdateOneRequiredWithoutPlayersNestedInput;
    rarity?: RarityUpdateOneRequiredWithoutPlayersNestedInput;
    country?: CountryUpdateOneRequiredWithoutPlayersNestedInput;
    league?: LeagueUpdateOneRequiredWithoutPlayersNestedInput;
    club?: ClubUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type PlayerUncheckedUpdateWithoutClubPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUncheckedUpdateManyWithoutPlayerNestedInput;
  };

  export type PlayerCreateManyQualityInput = {
    id?: number;
    displayName: string;
    fullName: string;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    leagueId: number;
  };

  export type PlayerUpdateWithoutQualityInput = {
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUpdateManyWithoutPlayerNestedInput;
    rarity?: RarityUpdateOneRequiredWithoutPlayersNestedInput;
    country?: CountryUpdateOneRequiredWithoutPlayersNestedInput;
    league?: LeagueUpdateOneRequiredWithoutPlayersNestedInput;
    club?: ClubUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type PlayerUncheckedUpdateWithoutQualityInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUncheckedUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUncheckedUpdateManyWithoutPlayerNestedInput;
  };

  export type PlayerUncheckedUpdateManyWithoutQualityInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerCreateManyRarityInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
    leagueId: number;
  };

  export type PlayerUpdateWithoutRarityInput = {
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUpdateManyWithoutPlayerNestedInput;
    quality?: QualityUpdateOneRequiredWithoutPlayersNestedInput;
    country?: CountryUpdateOneRequiredWithoutPlayersNestedInput;
    league?: LeagueUpdateOneRequiredWithoutPlayersNestedInput;
    club?: ClubUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type PlayerUncheckedUpdateWithoutRarityInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUncheckedUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUncheckedUpdateManyWithoutPlayerNestedInput;
  };

  export type PlayerUncheckedUpdateManyWithoutRarityInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
  };

  export type ClubCreateManyCountryInput = {
    id?: number;
    name: string;
    leagueId: number;
  };

  export type LeagueCreateManyCountryInput = {
    id?: number;
    name: string;
  };

  export type PlayerCreateManyCountryInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    clubId: number;
    leagueId: number;
  };

  export type ClubUpdateWithoutCountryInput = {
    name?: StringFieldUpdateOperationsInput | string;
    league?: LeagueUpdateOneRequiredWithoutClubsNestedInput;
    players?: PlayerUpdateManyWithoutClubNestedInput;
  };

  export type ClubUncheckedUpdateWithoutCountryInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    leagueId?: IntFieldUpdateOperationsInput | number;
    players?: PlayerUncheckedUpdateManyWithoutClubNestedInput;
  };

  export type ClubUncheckedUpdateManyWithoutCountryInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    leagueId?: IntFieldUpdateOperationsInput | number;
  };

  export type LeagueUpdateWithoutCountryInput = {
    name?: StringFieldUpdateOperationsInput | string;
    clubs?: ClubUpdateManyWithoutLeagueNestedInput;
    players?: PlayerUpdateManyWithoutLeagueNestedInput;
  };

  export type LeagueUncheckedUpdateWithoutCountryInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    clubs?: ClubUncheckedUpdateManyWithoutLeagueNestedInput;
    players?: PlayerUncheckedUpdateManyWithoutLeagueNestedInput;
  };

  export type LeagueUncheckedUpdateManyWithoutCountryInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type PlayerUpdateWithoutCountryInput = {
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUpdateManyWithoutPlayerNestedInput;
    quality?: QualityUpdateOneRequiredWithoutPlayersNestedInput;
    rarity?: RarityUpdateOneRequiredWithoutPlayersNestedInput;
    league?: LeagueUpdateOneRequiredWithoutPlayersNestedInput;
    club?: ClubUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type PlayerUncheckedUpdateWithoutCountryInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUncheckedUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUncheckedUpdateManyWithoutPlayerNestedInput;
  };

  export type PlayerUncheckedUpdateManyWithoutCountryInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerPositionCreateManyPositionInput = {
    id?: number;
    playerId: number;
  };

  export type PlayerPositionUpdateWithoutPositionInput = {
    player?: PlayerUpdateOneRequiredWithoutPositionsNestedInput;
  };

  export type PlayerPositionUncheckedUpdateWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number;
    playerId?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerPositionUncheckedUpdateManyWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number;
    playerId?: IntFieldUpdateOperationsInput | number;
  };

  export type ClubCreateManyLeagueInput = {
    id?: number;
    name: string;
    countryId: number;
  };

  export type PlayerCreateManyLeagueInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    clubId: number;
  };

  export type ClubUpdateWithoutLeagueInput = {
    name?: StringFieldUpdateOperationsInput | string;
    country?: CountryUpdateOneRequiredWithoutClubsNestedInput;
    players?: PlayerUpdateManyWithoutClubNestedInput;
  };

  export type ClubUncheckedUpdateWithoutLeagueInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    countryId?: IntFieldUpdateOperationsInput | number;
    players?: PlayerUncheckedUpdateManyWithoutClubNestedInput;
  };

  export type ClubUncheckedUpdateManyWithoutLeagueInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    countryId?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerUpdateWithoutLeagueInput = {
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUpdateManyWithoutPlayerNestedInput;
    quality?: QualityUpdateOneRequiredWithoutPlayersNestedInput;
    rarity?: RarityUpdateOneRequiredWithoutPlayersNestedInput;
    country?: CountryUpdateOneRequiredWithoutPlayersNestedInput;
    club?: ClubUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type PlayerUncheckedUpdateWithoutLeagueInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUncheckedUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUncheckedUpdateManyWithoutPlayerNestedInput;
  };

  export type PlayerUncheckedUpdateManyWithoutLeagueInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    clubId?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerCreateManyClubInput = {
    id?: number;
    displayName: string;
    fullName: string;
    qualityId: number;
    rarityId: number;
    ovr: number;
    rating1: number;
    rating2: number;
    rating3: number;
    rating4: number;
    rating5: number;
    rating6: number;
    countryId: number;
    leagueId: number;
  };

  export type PlayerUpdateWithoutClubInput = {
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUpdateManyWithoutPlayerNestedInput;
    quality?: QualityUpdateOneRequiredWithoutPlayersNestedInput;
    rarity?: RarityUpdateOneRequiredWithoutPlayersNestedInput;
    country?: CountryUpdateOneRequiredWithoutPlayersNestedInput;
    league?: LeagueUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type PlayerUncheckedUpdateWithoutClubInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
    positions?: PlayerPositionUncheckedUpdateManyWithoutPlayerNestedInput;
    clubPlayers?: ClubPlayerUncheckedUpdateManyWithoutPlayerNestedInput;
  };

  export type PlayerUncheckedUpdateManyWithoutClubInput = {
    id?: IntFieldUpdateOperationsInput | number;
    displayName?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    qualityId?: IntFieldUpdateOperationsInput | number;
    rarityId?: IntFieldUpdateOperationsInput | number;
    ovr?: IntFieldUpdateOperationsInput | number;
    rating1?: IntFieldUpdateOperationsInput | number;
    rating2?: IntFieldUpdateOperationsInput | number;
    rating3?: IntFieldUpdateOperationsInput | number;
    rating4?: IntFieldUpdateOperationsInput | number;
    rating5?: IntFieldUpdateOperationsInput | number;
    rating6?: IntFieldUpdateOperationsInput | number;
    countryId?: IntFieldUpdateOperationsInput | number;
    leagueId?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerPositionCreateManyPlayerInput = {
    id?: number;
    positionId: number;
  };

  export type ClubPlayerCreateManyPlayerInput = {
    id?: number;
    sbc?: boolean;
    squad?: boolean;
  };

  export type PlayerPositionUpdateWithoutPlayerInput = {
    position?: PositionUpdateOneRequiredWithoutPlayersNestedInput;
  };

  export type PlayerPositionUncheckedUpdateWithoutPlayerInput = {
    id?: IntFieldUpdateOperationsInput | number;
    positionId?: IntFieldUpdateOperationsInput | number;
  };

  export type PlayerPositionUncheckedUpdateManyWithoutPlayerInput = {
    id?: IntFieldUpdateOperationsInput | number;
    positionId?: IntFieldUpdateOperationsInput | number;
  };

  export type ClubPlayerUpdateWithoutPlayerInput = {
    sbc?: BoolFieldUpdateOperationsInput | boolean;
    squad?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ClubPlayerUncheckedUpdateWithoutPlayerInput = {
    id?: IntFieldUpdateOperationsInput | number;
    sbc?: BoolFieldUpdateOperationsInput | boolean;
    squad?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ClubPlayerUncheckedUpdateManyWithoutPlayerInput = {
    id?: IntFieldUpdateOperationsInput | number;
    sbc?: BoolFieldUpdateOperationsInput | boolean;
    squad?: BoolFieldUpdateOperationsInput | boolean;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use QualityCountOutputTypeDefaultArgs instead
   */
  export type QualityCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = QualityCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use RarityCountOutputTypeDefaultArgs instead
   */
  export type RarityCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = RarityCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use CountryCountOutputTypeDefaultArgs instead
   */
  export type CountryCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = CountryCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PositionCountOutputTypeDefaultArgs instead
   */
  export type PositionCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = PositionCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use LeagueCountOutputTypeDefaultArgs instead
   */
  export type LeagueCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = LeagueCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ClubCountOutputTypeDefaultArgs instead
   */
  export type ClubCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ClubCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PlayerCountOutputTypeDefaultArgs instead
   */
  export type PlayerCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = PlayerCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use QualityDefaultArgs instead
   */
  export type QualityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    QualityDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use RarityDefaultArgs instead
   */
  export type RarityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    RarityDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use CountryDefaultArgs instead
   */
  export type CountryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    CountryDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PositionDefaultArgs instead
   */
  export type PositionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    PositionDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PlayerPositionDefaultArgs instead
   */
  export type PlayerPositionArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = PlayerPositionDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use LeagueDefaultArgs instead
   */
  export type LeagueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    LeagueDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ClubDefaultArgs instead
   */
  export type ClubArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    ClubDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PlayerDefaultArgs instead
   */
  export type PlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    PlayerDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ClubPlayerDefaultArgs instead
   */
  export type ClubPlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    ClubPlayerDefaultArgs<ExtArgs>;

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
