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
 * Model UserSession
 *
 */
export type UserSession = $Result.DefaultSelection<Prisma.$UserSessionPayload>;
/**
 * Model SbcChallenge
 *
 */
export type SbcChallenge = $Result.DefaultSelection<Prisma.$SbcChallengePayload>;
/**
 * Model SbcSolution
 *
 */
export type SbcSolution = $Result.DefaultSelection<Prisma.$SbcSolutionPayload>;
/**
 * Model CompanionAppState
 *
 */
export type CompanionAppState = $Result.DefaultSelection<Prisma.$CompanionAppStatePayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserSessions
 * const userSessions = await prisma.userSession.findMany()
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
   * // Fetch zero or more UserSessions
   * const userSessions = await prisma.userSession.findMany()
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
   * `prisma.userSession`: Exposes CRUD operations for the **UserSession** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more UserSessions
   * const userSessions = await prisma.userSession.findMany()
   * ```
   */
  get userSession(): Prisma.UserSessionDelegate<ExtArgs>;

  /**
   * `prisma.sbcChallenge`: Exposes CRUD operations for the **SbcChallenge** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more SbcChallenges
   * const sbcChallenges = await prisma.sbcChallenge.findMany()
   * ```
   */
  get sbcChallenge(): Prisma.SbcChallengeDelegate<ExtArgs>;

  /**
   * `prisma.sbcSolution`: Exposes CRUD operations for the **SbcSolution** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more SbcSolutions
   * const sbcSolutions = await prisma.sbcSolution.findMany()
   * ```
   */
  get sbcSolution(): Prisma.SbcSolutionDelegate<ExtArgs>;

  /**
   * `prisma.companionAppState`: Exposes CRUD operations for the **CompanionAppState** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more CompanionAppStates
   * const companionAppStates = await prisma.companionAppState.findMany()
   * ```
   */
  get companionAppState(): Prisma.CompanionAppStateDelegate<ExtArgs>;
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
    UserSession: 'UserSession';
    SbcChallenge: 'SbcChallenge';
    SbcSolution: 'SbcSolution';
    CompanionAppState: 'CompanionAppState';
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
      modelProps: 'userSession' | 'sbcChallenge' | 'sbcSolution' | 'companionAppState';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      UserSession: {
        payload: Prisma.$UserSessionPayload<ExtArgs>;
        fields: Prisma.UserSessionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserSessionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserSessionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>;
          };
          findFirst: {
            args: Prisma.UserSessionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserSessionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>;
          };
          findMany: {
            args: Prisma.UserSessionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[];
          };
          create: {
            args: Prisma.UserSessionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>;
          };
          createMany: {
            args: Prisma.UserSessionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserSessionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[];
          };
          delete: {
            args: Prisma.UserSessionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>;
          };
          update: {
            args: Prisma.UserSessionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>;
          };
          deleteMany: {
            args: Prisma.UserSessionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserSessionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.UserSessionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>;
          };
          aggregate: {
            args: Prisma.UserSessionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUserSession>;
          };
          groupBy: {
            args: Prisma.UserSessionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserSessionGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserSessionCountArgs<ExtArgs>;
            result: $Utils.Optional<UserSessionCountAggregateOutputType> | number;
          };
        };
      };
      SbcChallenge: {
        payload: Prisma.$SbcChallengePayload<ExtArgs>;
        fields: Prisma.SbcChallengeFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SbcChallengeFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcChallengePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SbcChallengeFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcChallengePayload>;
          };
          findFirst: {
            args: Prisma.SbcChallengeFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcChallengePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SbcChallengeFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcChallengePayload>;
          };
          findMany: {
            args: Prisma.SbcChallengeFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcChallengePayload>[];
          };
          create: {
            args: Prisma.SbcChallengeCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcChallengePayload>;
          };
          createMany: {
            args: Prisma.SbcChallengeCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SbcChallengeCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcChallengePayload>[];
          };
          delete: {
            args: Prisma.SbcChallengeDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcChallengePayload>;
          };
          update: {
            args: Prisma.SbcChallengeUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcChallengePayload>;
          };
          deleteMany: {
            args: Prisma.SbcChallengeDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SbcChallengeUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.SbcChallengeUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcChallengePayload>;
          };
          aggregate: {
            args: Prisma.SbcChallengeAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSbcChallenge>;
          };
          groupBy: {
            args: Prisma.SbcChallengeGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SbcChallengeGroupByOutputType>[];
          };
          count: {
            args: Prisma.SbcChallengeCountArgs<ExtArgs>;
            result: $Utils.Optional<SbcChallengeCountAggregateOutputType> | number;
          };
        };
      };
      SbcSolution: {
        payload: Prisma.$SbcSolutionPayload<ExtArgs>;
        fields: Prisma.SbcSolutionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SbcSolutionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcSolutionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SbcSolutionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcSolutionPayload>;
          };
          findFirst: {
            args: Prisma.SbcSolutionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcSolutionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SbcSolutionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcSolutionPayload>;
          };
          findMany: {
            args: Prisma.SbcSolutionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcSolutionPayload>[];
          };
          create: {
            args: Prisma.SbcSolutionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcSolutionPayload>;
          };
          createMany: {
            args: Prisma.SbcSolutionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SbcSolutionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcSolutionPayload>[];
          };
          delete: {
            args: Prisma.SbcSolutionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcSolutionPayload>;
          };
          update: {
            args: Prisma.SbcSolutionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcSolutionPayload>;
          };
          deleteMany: {
            args: Prisma.SbcSolutionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SbcSolutionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.SbcSolutionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SbcSolutionPayload>;
          };
          aggregate: {
            args: Prisma.SbcSolutionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSbcSolution>;
          };
          groupBy: {
            args: Prisma.SbcSolutionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SbcSolutionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SbcSolutionCountArgs<ExtArgs>;
            result: $Utils.Optional<SbcSolutionCountAggregateOutputType> | number;
          };
        };
      };
      CompanionAppState: {
        payload: Prisma.$CompanionAppStatePayload<ExtArgs>;
        fields: Prisma.CompanionAppStateFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CompanionAppStateFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CompanionAppStatePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CompanionAppStateFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CompanionAppStatePayload>;
          };
          findFirst: {
            args: Prisma.CompanionAppStateFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CompanionAppStatePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CompanionAppStateFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CompanionAppStatePayload>;
          };
          findMany: {
            args: Prisma.CompanionAppStateFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CompanionAppStatePayload>[];
          };
          create: {
            args: Prisma.CompanionAppStateCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CompanionAppStatePayload>;
          };
          createMany: {
            args: Prisma.CompanionAppStateCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CompanionAppStateCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CompanionAppStatePayload>[];
          };
          delete: {
            args: Prisma.CompanionAppStateDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CompanionAppStatePayload>;
          };
          update: {
            args: Prisma.CompanionAppStateUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CompanionAppStatePayload>;
          };
          deleteMany: {
            args: Prisma.CompanionAppStateDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CompanionAppStateUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.CompanionAppStateUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CompanionAppStatePayload>;
          };
          aggregate: {
            args: Prisma.CompanionAppStateAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCompanionAppState>;
          };
          groupBy: {
            args: Prisma.CompanionAppStateGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CompanionAppStateGroupByOutputType>[];
          };
          count: {
            args: Prisma.CompanionAppStateCountArgs<ExtArgs>;
            result: $Utils.Optional<CompanionAppStateCountAggregateOutputType> | number;
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
   * Count Type SbcChallengeCountOutputType
   */

  export type SbcChallengeCountOutputType = {
    solutions: number;
  };

  export type SbcChallengeCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    solutions?: boolean | SbcChallengeCountOutputTypeCountSolutionsArgs;
  };

  // Custom InputTypes
  /**
   * SbcChallengeCountOutputType without action
   */
  export type SbcChallengeCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallengeCountOutputType
     */
    select?: SbcChallengeCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * SbcChallengeCountOutputType without action
   */
  export type SbcChallengeCountOutputTypeCountSolutionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SbcSolutionWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model UserSession
   */

  export type AggregateUserSession = {
    _count: UserSessionCountAggregateOutputType | null;
    _min: UserSessionMinAggregateOutputType | null;
    _max: UserSessionMaxAggregateOutputType | null;
  };

  export type UserSessionMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    sessionId: string | null;
  };

  export type UserSessionMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    sessionId: string | null;
  };

  export type UserSessionCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    sessionId: number;
    data: number;
    _all: number;
  };

  export type UserSessionMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    sessionId?: true;
  };

  export type UserSessionMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    sessionId?: true;
  };

  export type UserSessionCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    sessionId?: true;
    data?: true;
    _all?: true;
  };

  export type UserSessionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserSession to aggregate.
     */
    where?: UserSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UserSessions
     **/
    _count?: true | UserSessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserSessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserSessionMaxAggregateInputType;
  };

  export type GetUserSessionAggregateType<T extends UserSessionAggregateArgs> = {
    [P in keyof T & keyof AggregateUserSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSession[P]>
      : GetScalarType<T[P], AggregateUserSession[P]>;
  };

  export type UserSessionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserSessionWhereInput;
    orderBy?: UserSessionOrderByWithAggregationInput | UserSessionOrderByWithAggregationInput[];
    by: UserSessionScalarFieldEnum[] | UserSessionScalarFieldEnum;
    having?: UserSessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserSessionCountAggregateInputType | true;
    _min?: UserSessionMinAggregateInputType;
    _max?: UserSessionMaxAggregateInputType;
  };

  export type UserSessionGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    sessionId: string;
    data: JsonValue | null;
    _count: UserSessionCountAggregateOutputType | null;
    _min: UserSessionMinAggregateOutputType | null;
    _max: UserSessionMaxAggregateOutputType | null;
  };

  type GetUserSessionGroupByPayload<T extends UserSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSessionGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserSessionGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
          : GetScalarType<T[P], UserSessionGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSessionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      sessionId?: boolean;
      data?: boolean;
    },
    ExtArgs['result']['userSession']
  >;

  export type UserSessionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      sessionId?: boolean;
      data?: boolean;
    },
    ExtArgs['result']['userSession']
  >;

  export type UserSessionSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    sessionId?: boolean;
    data?: boolean;
  };

  export type $UserSessionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'UserSession';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sessionId: string;
        data: Prisma.JsonValue | null;
      },
      ExtArgs['result']['userSession']
    >;
    composites: {};
  };

  type UserSessionGetPayload<S extends boolean | null | undefined | UserSessionDefaultArgs> =
    $Result.GetResult<Prisma.$UserSessionPayload, S>;

  type UserSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserSessionCountAggregateInputType | true;
    };

  export interface UserSessionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['UserSession'];
      meta: { name: 'UserSession' };
    };
    /**
     * Find zero or one UserSession that matches the filter.
     * @param {UserSessionFindUniqueArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSessionFindUniqueArgs>(
      args: SelectSubset<T, UserSessionFindUniqueArgs<ExtArgs>>
    ): Prisma__UserSessionClient<
      $Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one UserSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSessionFindUniqueOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSessionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserSessionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserSessionClient<
      $Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first UserSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSessionFindFirstArgs>(
      args?: SelectSubset<T, UserSessionFindFirstArgs<ExtArgs>>
    ): Prisma__UserSessionClient<
      $Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first UserSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserSessionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserSessionClient<
      $Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more UserSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSessions
     * const userSessions = await prisma.userSession.findMany()
     *
     * // Get first 10 UserSessions
     * const userSessions = await prisma.userSession.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userSessionWithIdOnly = await prisma.userSession.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserSessionFindManyArgs>(
      args?: SelectSubset<T, UserSessionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a UserSession.
     * @param {UserSessionCreateArgs} args - Arguments to create a UserSession.
     * @example
     * // Create one UserSession
     * const UserSession = await prisma.userSession.create({
     *   data: {
     *     // ... data to create a UserSession
     *   }
     * })
     *
     */
    create<T extends UserSessionCreateArgs>(
      args: SelectSubset<T, UserSessionCreateArgs<ExtArgs>>
    ): Prisma__UserSessionClient<
      $Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many UserSessions.
     * @param {UserSessionCreateManyArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserSessionCreateManyArgs>(
      args?: SelectSubset<T, UserSessionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many UserSessions and returns the data saved in the database.
     * @param {UserSessionCreateManyAndReturnArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserSessionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserSessionCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a UserSession.
     * @param {UserSessionDeleteArgs} args - Arguments to delete one UserSession.
     * @example
     * // Delete one UserSession
     * const UserSession = await prisma.userSession.delete({
     *   where: {
     *     // ... filter to delete one UserSession
     *   }
     * })
     *
     */
    delete<T extends UserSessionDeleteArgs>(
      args: SelectSubset<T, UserSessionDeleteArgs<ExtArgs>>
    ): Prisma__UserSessionClient<
      $Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one UserSession.
     * @param {UserSessionUpdateArgs} args - Arguments to update one UserSession.
     * @example
     * // Update one UserSession
     * const userSession = await prisma.userSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserSessionUpdateArgs>(
      args: SelectSubset<T, UserSessionUpdateArgs<ExtArgs>>
    ): Prisma__UserSessionClient<
      $Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more UserSessions.
     * @param {UserSessionDeleteManyArgs} args - Arguments to filter UserSessions to delete.
     * @example
     * // Delete a few UserSessions
     * const { count } = await prisma.userSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserSessionDeleteManyArgs>(
      args?: SelectSubset<T, UserSessionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserSessionUpdateManyArgs>(
      args: SelectSubset<T, UserSessionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one UserSession.
     * @param {UserSessionUpsertArgs} args - Arguments to update or create a UserSession.
     * @example
     * // Update or create a UserSession
     * const userSession = await prisma.userSession.upsert({
     *   create: {
     *     // ... data to create a UserSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSession we want to update
     *   }
     * })
     */
    upsert<T extends UserSessionUpsertArgs>(
      args: SelectSubset<T, UserSessionUpsertArgs<ExtArgs>>
    ): Prisma__UserSessionClient<
      $Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionCountArgs} args - Arguments to filter UserSessions to count.
     * @example
     * // Count the number of UserSessions
     * const count = await prisma.userSession.count({
     *   where: {
     *     // ... the filter for the UserSessions we want to count
     *   }
     * })
     **/
    count<T extends UserSessionCountArgs>(
      args?: Subset<T, UserSessionCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSessionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserSessionAggregateArgs>(
      args: Subset<T, UserSessionAggregateArgs>
    ): Prisma.PrismaPromise<GetUserSessionAggregateType<T>>;

    /**
     * Group by UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionGroupByArgs} args - Group by arguments.
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
      T extends UserSessionGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSessionGroupByArgs['orderBy'] }
        : { orderBy?: UserSessionGroupByArgs['orderBy'] },
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
      args: SubsetIntersection<T, UserSessionGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetUserSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UserSession model
     */
    readonly fields: UserSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSessionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
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
   * Fields of the UserSession model
   */
  interface UserSessionFieldRefs {
    readonly id: FieldRef<'UserSession', 'String'>;
    readonly createdAt: FieldRef<'UserSession', 'DateTime'>;
    readonly updatedAt: FieldRef<'UserSession', 'DateTime'>;
    readonly sessionId: FieldRef<'UserSession', 'String'>;
    readonly data: FieldRef<'UserSession', 'Json'>;
  }

  // Custom InputTypes
  /**
   * UserSession findUnique
   */
  export type UserSessionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null;
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput;
  };

  /**
   * UserSession findUniqueOrThrow
   */
  export type UserSessionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null;
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput;
  };

  /**
   * UserSession findFirst
   */
  export type UserSessionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null;
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[];
  };

  /**
   * UserSession findFirstOrThrow
   */
  export type UserSessionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null;
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[];
  };

  /**
   * UserSession findMany
   */
  export type UserSessionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null;
    /**
     * Filter, which UserSessions to fetch.
     */
    where?: UserSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserSessions.
     */
    skip?: number;
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[];
  };

  /**
   * UserSession create
   */
  export type UserSessionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null;
    /**
     * The data needed to create a UserSession.
     */
    data: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>;
  };

  /**
   * UserSession createMany
   */
  export type UserSessionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * UserSession createManyAndReturn
   */
  export type UserSessionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * UserSession update
   */
  export type UserSessionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null;
    /**
     * The data needed to update a UserSession.
     */
    data: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>;
    /**
     * Choose, which UserSession to update.
     */
    where: UserSessionWhereUniqueInput;
  };

  /**
   * UserSession updateMany
   */
  export type UserSessionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>;
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput;
  };

  /**
   * UserSession upsert
   */
  export type UserSessionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null;
    /**
     * The filter to search for the UserSession to update in case it exists.
     */
    where: UserSessionWhereUniqueInput;
    /**
     * In case the UserSession found by the `where` argument doesn't exist, create a new UserSession with this data.
     */
    create: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>;
    /**
     * In case the UserSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>;
  };

  /**
   * UserSession delete
   */
  export type UserSessionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null;
    /**
     * Filter which UserSession to delete.
     */
    where: UserSessionWhereUniqueInput;
  };

  /**
   * UserSession deleteMany
   */
  export type UserSessionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserSessions to delete
     */
    where?: UserSessionWhereInput;
  };

  /**
   * UserSession without action
   */
  export type UserSessionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null;
  };

  /**
   * Model SbcChallenge
   */

  export type AggregateSbcChallenge = {
    _count: SbcChallengeCountAggregateOutputType | null;
    _min: SbcChallengeMinAggregateOutputType | null;
    _max: SbcChallengeMaxAggregateOutputType | null;
  };

  export type SbcChallengeMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    challengeId: string | null;
    name: string | null;
    status: string | null;
  };

  export type SbcChallengeMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    challengeId: string | null;
    name: string | null;
    status: string | null;
  };

  export type SbcChallengeCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    challengeId: number;
    name: number;
    requirements: number;
    status: number;
    _all: number;
  };

  export type SbcChallengeMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    challengeId?: true;
    name?: true;
    status?: true;
  };

  export type SbcChallengeMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    challengeId?: true;
    name?: true;
    status?: true;
  };

  export type SbcChallengeCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    challengeId?: true;
    name?: true;
    requirements?: true;
    status?: true;
    _all?: true;
  };

  export type SbcChallengeAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which SbcChallenge to aggregate.
     */
    where?: SbcChallengeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SbcChallenges to fetch.
     */
    orderBy?: SbcChallengeOrderByWithRelationInput | SbcChallengeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SbcChallengeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SbcChallenges from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SbcChallenges.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SbcChallenges
     **/
    _count?: true | SbcChallengeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SbcChallengeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SbcChallengeMaxAggregateInputType;
  };

  export type GetSbcChallengeAggregateType<T extends SbcChallengeAggregateArgs> = {
    [P in keyof T & keyof AggregateSbcChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSbcChallenge[P]>
      : GetScalarType<T[P], AggregateSbcChallenge[P]>;
  };

  export type SbcChallengeGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SbcChallengeWhereInput;
    orderBy?: SbcChallengeOrderByWithAggregationInput | SbcChallengeOrderByWithAggregationInput[];
    by: SbcChallengeScalarFieldEnum[] | SbcChallengeScalarFieldEnum;
    having?: SbcChallengeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SbcChallengeCountAggregateInputType | true;
    _min?: SbcChallengeMinAggregateInputType;
    _max?: SbcChallengeMaxAggregateInputType;
  };

  export type SbcChallengeGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    challengeId: string;
    name: string;
    requirements: JsonValue;
    status: string;
    _count: SbcChallengeCountAggregateOutputType | null;
    _min: SbcChallengeMinAggregateOutputType | null;
    _max: SbcChallengeMaxAggregateOutputType | null;
  };

  type GetSbcChallengeGroupByPayload<T extends SbcChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SbcChallengeGroupByOutputType, T['by']> & {
        [P in keyof T & keyof SbcChallengeGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], SbcChallengeGroupByOutputType[P]>
          : GetScalarType<T[P], SbcChallengeGroupByOutputType[P]>;
      }
    >
  >;

  export type SbcChallengeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      challengeId?: boolean;
      name?: boolean;
      requirements?: boolean;
      status?: boolean;
      solutions?: boolean | SbcChallenge$solutionsArgs<ExtArgs>;
      _count?: boolean | SbcChallengeCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['sbcChallenge']
  >;

  export type SbcChallengeSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      challengeId?: boolean;
      name?: boolean;
      requirements?: boolean;
      status?: boolean;
    },
    ExtArgs['result']['sbcChallenge']
  >;

  export type SbcChallengeSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    challengeId?: boolean;
    name?: boolean;
    requirements?: boolean;
    status?: boolean;
  };

  export type SbcChallengeInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    solutions?: boolean | SbcChallenge$solutionsArgs<ExtArgs>;
    _count?: boolean | SbcChallengeCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type SbcChallengeIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $SbcChallengePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'SbcChallenge';
    objects: {
      solutions: Prisma.$SbcSolutionPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        challengeId: string;
        name: string;
        requirements: Prisma.JsonValue;
        status: string;
      },
      ExtArgs['result']['sbcChallenge']
    >;
    composites: {};
  };

  type SbcChallengeGetPayload<S extends boolean | null | undefined | SbcChallengeDefaultArgs> =
    $Result.GetResult<Prisma.$SbcChallengePayload, S>;

  type SbcChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SbcChallengeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SbcChallengeCountAggregateInputType | true;
    };

  export interface SbcChallengeDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['SbcChallenge'];
      meta: { name: 'SbcChallenge' };
    };
    /**
     * Find zero or one SbcChallenge that matches the filter.
     * @param {SbcChallengeFindUniqueArgs} args - Arguments to find a SbcChallenge
     * @example
     * // Get one SbcChallenge
     * const sbcChallenge = await prisma.sbcChallenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SbcChallengeFindUniqueArgs>(
      args: SelectSubset<T, SbcChallengeFindUniqueArgs<ExtArgs>>
    ): Prisma__SbcChallengeClient<
      $Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one SbcChallenge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SbcChallengeFindUniqueOrThrowArgs} args - Arguments to find a SbcChallenge
     * @example
     * // Get one SbcChallenge
     * const sbcChallenge = await prisma.sbcChallenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SbcChallengeFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SbcChallengeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SbcChallengeClient<
      $Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first SbcChallenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcChallengeFindFirstArgs} args - Arguments to find a SbcChallenge
     * @example
     * // Get one SbcChallenge
     * const sbcChallenge = await prisma.sbcChallenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SbcChallengeFindFirstArgs>(
      args?: SelectSubset<T, SbcChallengeFindFirstArgs<ExtArgs>>
    ): Prisma__SbcChallengeClient<
      $Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first SbcChallenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcChallengeFindFirstOrThrowArgs} args - Arguments to find a SbcChallenge
     * @example
     * // Get one SbcChallenge
     * const sbcChallenge = await prisma.sbcChallenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SbcChallengeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SbcChallengeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SbcChallengeClient<
      $Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more SbcChallenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SbcChallenges
     * const sbcChallenges = await prisma.sbcChallenge.findMany()
     *
     * // Get first 10 SbcChallenges
     * const sbcChallenges = await prisma.sbcChallenge.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sbcChallengeWithIdOnly = await prisma.sbcChallenge.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SbcChallengeFindManyArgs>(
      args?: SelectSubset<T, SbcChallengeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a SbcChallenge.
     * @param {SbcChallengeCreateArgs} args - Arguments to create a SbcChallenge.
     * @example
     * // Create one SbcChallenge
     * const SbcChallenge = await prisma.sbcChallenge.create({
     *   data: {
     *     // ... data to create a SbcChallenge
     *   }
     * })
     *
     */
    create<T extends SbcChallengeCreateArgs>(
      args: SelectSubset<T, SbcChallengeCreateArgs<ExtArgs>>
    ): Prisma__SbcChallengeClient<
      $Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many SbcChallenges.
     * @param {SbcChallengeCreateManyArgs} args - Arguments to create many SbcChallenges.
     * @example
     * // Create many SbcChallenges
     * const sbcChallenge = await prisma.sbcChallenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SbcChallengeCreateManyArgs>(
      args?: SelectSubset<T, SbcChallengeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many SbcChallenges and returns the data saved in the database.
     * @param {SbcChallengeCreateManyAndReturnArgs} args - Arguments to create many SbcChallenges.
     * @example
     * // Create many SbcChallenges
     * const sbcChallenge = await prisma.sbcChallenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SbcChallenges and only return the `id`
     * const sbcChallengeWithIdOnly = await prisma.sbcChallenge.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SbcChallengeCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SbcChallengeCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a SbcChallenge.
     * @param {SbcChallengeDeleteArgs} args - Arguments to delete one SbcChallenge.
     * @example
     * // Delete one SbcChallenge
     * const SbcChallenge = await prisma.sbcChallenge.delete({
     *   where: {
     *     // ... filter to delete one SbcChallenge
     *   }
     * })
     *
     */
    delete<T extends SbcChallengeDeleteArgs>(
      args: SelectSubset<T, SbcChallengeDeleteArgs<ExtArgs>>
    ): Prisma__SbcChallengeClient<
      $Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one SbcChallenge.
     * @param {SbcChallengeUpdateArgs} args - Arguments to update one SbcChallenge.
     * @example
     * // Update one SbcChallenge
     * const sbcChallenge = await prisma.sbcChallenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SbcChallengeUpdateArgs>(
      args: SelectSubset<T, SbcChallengeUpdateArgs<ExtArgs>>
    ): Prisma__SbcChallengeClient<
      $Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more SbcChallenges.
     * @param {SbcChallengeDeleteManyArgs} args - Arguments to filter SbcChallenges to delete.
     * @example
     * // Delete a few SbcChallenges
     * const { count } = await prisma.sbcChallenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SbcChallengeDeleteManyArgs>(
      args?: SelectSubset<T, SbcChallengeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more SbcChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SbcChallenges
     * const sbcChallenge = await prisma.sbcChallenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SbcChallengeUpdateManyArgs>(
      args: SelectSubset<T, SbcChallengeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one SbcChallenge.
     * @param {SbcChallengeUpsertArgs} args - Arguments to update or create a SbcChallenge.
     * @example
     * // Update or create a SbcChallenge
     * const sbcChallenge = await prisma.sbcChallenge.upsert({
     *   create: {
     *     // ... data to create a SbcChallenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SbcChallenge we want to update
     *   }
     * })
     */
    upsert<T extends SbcChallengeUpsertArgs>(
      args: SelectSubset<T, SbcChallengeUpsertArgs<ExtArgs>>
    ): Prisma__SbcChallengeClient<
      $Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of SbcChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcChallengeCountArgs} args - Arguments to filter SbcChallenges to count.
     * @example
     * // Count the number of SbcChallenges
     * const count = await prisma.sbcChallenge.count({
     *   where: {
     *     // ... the filter for the SbcChallenges we want to count
     *   }
     * })
     **/
    count<T extends SbcChallengeCountArgs>(
      args?: Subset<T, SbcChallengeCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SbcChallengeCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a SbcChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SbcChallengeAggregateArgs>(
      args: Subset<T, SbcChallengeAggregateArgs>
    ): Prisma.PrismaPromise<GetSbcChallengeAggregateType<T>>;

    /**
     * Group by SbcChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcChallengeGroupByArgs} args - Group by arguments.
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
      T extends SbcChallengeGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SbcChallengeGroupByArgs['orderBy'] }
        : { orderBy?: SbcChallengeGroupByArgs['orderBy'] },
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
      args: SubsetIntersection<T, SbcChallengeGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetSbcChallengeGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SbcChallenge model
     */
    readonly fields: SbcChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SbcChallenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SbcChallengeClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    solutions<T extends SbcChallenge$solutionsArgs<ExtArgs> = {}>(
      args?: Subset<T, SbcChallenge$solutionsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'findMany'> | Null
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
   * Fields of the SbcChallenge model
   */
  interface SbcChallengeFieldRefs {
    readonly id: FieldRef<'SbcChallenge', 'String'>;
    readonly createdAt: FieldRef<'SbcChallenge', 'DateTime'>;
    readonly updatedAt: FieldRef<'SbcChallenge', 'DateTime'>;
    readonly challengeId: FieldRef<'SbcChallenge', 'String'>;
    readonly name: FieldRef<'SbcChallenge', 'String'>;
    readonly requirements: FieldRef<'SbcChallenge', 'Json'>;
    readonly status: FieldRef<'SbcChallenge', 'String'>;
  }

  // Custom InputTypes
  /**
   * SbcChallenge findUnique
   */
  export type SbcChallengeFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcChallengeInclude<ExtArgs> | null;
    /**
     * Filter, which SbcChallenge to fetch.
     */
    where: SbcChallengeWhereUniqueInput;
  };

  /**
   * SbcChallenge findUniqueOrThrow
   */
  export type SbcChallengeFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcChallengeInclude<ExtArgs> | null;
    /**
     * Filter, which SbcChallenge to fetch.
     */
    where: SbcChallengeWhereUniqueInput;
  };

  /**
   * SbcChallenge findFirst
   */
  export type SbcChallengeFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcChallengeInclude<ExtArgs> | null;
    /**
     * Filter, which SbcChallenge to fetch.
     */
    where?: SbcChallengeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SbcChallenges to fetch.
     */
    orderBy?: SbcChallengeOrderByWithRelationInput | SbcChallengeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SbcChallenges.
     */
    cursor?: SbcChallengeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SbcChallenges from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SbcChallenges.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SbcChallenges.
     */
    distinct?: SbcChallengeScalarFieldEnum | SbcChallengeScalarFieldEnum[];
  };

  /**
   * SbcChallenge findFirstOrThrow
   */
  export type SbcChallengeFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcChallengeInclude<ExtArgs> | null;
    /**
     * Filter, which SbcChallenge to fetch.
     */
    where?: SbcChallengeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SbcChallenges to fetch.
     */
    orderBy?: SbcChallengeOrderByWithRelationInput | SbcChallengeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SbcChallenges.
     */
    cursor?: SbcChallengeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SbcChallenges from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SbcChallenges.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SbcChallenges.
     */
    distinct?: SbcChallengeScalarFieldEnum | SbcChallengeScalarFieldEnum[];
  };

  /**
   * SbcChallenge findMany
   */
  export type SbcChallengeFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcChallengeInclude<ExtArgs> | null;
    /**
     * Filter, which SbcChallenges to fetch.
     */
    where?: SbcChallengeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SbcChallenges to fetch.
     */
    orderBy?: SbcChallengeOrderByWithRelationInput | SbcChallengeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SbcChallenges.
     */
    cursor?: SbcChallengeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SbcChallenges from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SbcChallenges.
     */
    skip?: number;
    distinct?: SbcChallengeScalarFieldEnum | SbcChallengeScalarFieldEnum[];
  };

  /**
   * SbcChallenge create
   */
  export type SbcChallengeCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcChallengeInclude<ExtArgs> | null;
    /**
     * The data needed to create a SbcChallenge.
     */
    data: XOR<SbcChallengeCreateInput, SbcChallengeUncheckedCreateInput>;
  };

  /**
   * SbcChallenge createMany
   */
  export type SbcChallengeCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many SbcChallenges.
     */
    data: SbcChallengeCreateManyInput | SbcChallengeCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * SbcChallenge createManyAndReturn
   */
  export type SbcChallengeCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many SbcChallenges.
     */
    data: SbcChallengeCreateManyInput | SbcChallengeCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * SbcChallenge update
   */
  export type SbcChallengeUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcChallengeInclude<ExtArgs> | null;
    /**
     * The data needed to update a SbcChallenge.
     */
    data: XOR<SbcChallengeUpdateInput, SbcChallengeUncheckedUpdateInput>;
    /**
     * Choose, which SbcChallenge to update.
     */
    where: SbcChallengeWhereUniqueInput;
  };

  /**
   * SbcChallenge updateMany
   */
  export type SbcChallengeUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update SbcChallenges.
     */
    data: XOR<SbcChallengeUpdateManyMutationInput, SbcChallengeUncheckedUpdateManyInput>;
    /**
     * Filter which SbcChallenges to update
     */
    where?: SbcChallengeWhereInput;
  };

  /**
   * SbcChallenge upsert
   */
  export type SbcChallengeUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcChallengeInclude<ExtArgs> | null;
    /**
     * The filter to search for the SbcChallenge to update in case it exists.
     */
    where: SbcChallengeWhereUniqueInput;
    /**
     * In case the SbcChallenge found by the `where` argument doesn't exist, create a new SbcChallenge with this data.
     */
    create: XOR<SbcChallengeCreateInput, SbcChallengeUncheckedCreateInput>;
    /**
     * In case the SbcChallenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SbcChallengeUpdateInput, SbcChallengeUncheckedUpdateInput>;
  };

  /**
   * SbcChallenge delete
   */
  export type SbcChallengeDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcChallengeInclude<ExtArgs> | null;
    /**
     * Filter which SbcChallenge to delete.
     */
    where: SbcChallengeWhereUniqueInput;
  };

  /**
   * SbcChallenge deleteMany
   */
  export type SbcChallengeDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which SbcChallenges to delete
     */
    where?: SbcChallengeWhereInput;
  };

  /**
   * SbcChallenge.solutions
   */
  export type SbcChallenge$solutionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
    where?: SbcSolutionWhereInput;
    orderBy?: SbcSolutionOrderByWithRelationInput | SbcSolutionOrderByWithRelationInput[];
    cursor?: SbcSolutionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SbcSolutionScalarFieldEnum | SbcSolutionScalarFieldEnum[];
  };

  /**
   * SbcChallenge without action
   */
  export type SbcChallengeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcChallenge
     */
    select?: SbcChallengeSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcChallengeInclude<ExtArgs> | null;
  };

  /**
   * Model SbcSolution
   */

  export type AggregateSbcSolution = {
    _count: SbcSolutionCountAggregateOutputType | null;
    _avg: SbcSolutionAvgAggregateOutputType | null;
    _sum: SbcSolutionSumAggregateOutputType | null;
    _min: SbcSolutionMinAggregateOutputType | null;
    _max: SbcSolutionMaxAggregateOutputType | null;
  };

  export type SbcSolutionAvgAggregateOutputType = {
    cost: number | null;
    rating: number | null;
  };

  export type SbcSolutionSumAggregateOutputType = {
    cost: number | null;
    rating: number | null;
  };

  export type SbcSolutionMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    challengeId: string | null;
    cost: number | null;
    rating: number | null;
    isValid: boolean | null;
  };

  export type SbcSolutionMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    challengeId: string | null;
    cost: number | null;
    rating: number | null;
    isValid: boolean | null;
  };

  export type SbcSolutionCountAggregateOutputType = {
    id: number;
    createdAt: number;
    challengeId: number;
    players: number;
    cost: number;
    rating: number;
    isValid: number;
    _all: number;
  };

  export type SbcSolutionAvgAggregateInputType = {
    cost?: true;
    rating?: true;
  };

  export type SbcSolutionSumAggregateInputType = {
    cost?: true;
    rating?: true;
  };

  export type SbcSolutionMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    challengeId?: true;
    cost?: true;
    rating?: true;
    isValid?: true;
  };

  export type SbcSolutionMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    challengeId?: true;
    cost?: true;
    rating?: true;
    isValid?: true;
  };

  export type SbcSolutionCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    challengeId?: true;
    players?: true;
    cost?: true;
    rating?: true;
    isValid?: true;
    _all?: true;
  };

  export type SbcSolutionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which SbcSolution to aggregate.
     */
    where?: SbcSolutionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SbcSolutions to fetch.
     */
    orderBy?: SbcSolutionOrderByWithRelationInput | SbcSolutionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SbcSolutionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SbcSolutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SbcSolutions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SbcSolutions
     **/
    _count?: true | SbcSolutionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: SbcSolutionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: SbcSolutionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SbcSolutionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SbcSolutionMaxAggregateInputType;
  };

  export type GetSbcSolutionAggregateType<T extends SbcSolutionAggregateArgs> = {
    [P in keyof T & keyof AggregateSbcSolution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSbcSolution[P]>
      : GetScalarType<T[P], AggregateSbcSolution[P]>;
  };

  export type SbcSolutionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SbcSolutionWhereInput;
    orderBy?: SbcSolutionOrderByWithAggregationInput | SbcSolutionOrderByWithAggregationInput[];
    by: SbcSolutionScalarFieldEnum[] | SbcSolutionScalarFieldEnum;
    having?: SbcSolutionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SbcSolutionCountAggregateInputType | true;
    _avg?: SbcSolutionAvgAggregateInputType;
    _sum?: SbcSolutionSumAggregateInputType;
    _min?: SbcSolutionMinAggregateInputType;
    _max?: SbcSolutionMaxAggregateInputType;
  };

  export type SbcSolutionGroupByOutputType = {
    id: string;
    createdAt: Date;
    challengeId: string;
    players: JsonValue;
    cost: number | null;
    rating: number | null;
    isValid: boolean;
    _count: SbcSolutionCountAggregateOutputType | null;
    _avg: SbcSolutionAvgAggregateOutputType | null;
    _sum: SbcSolutionSumAggregateOutputType | null;
    _min: SbcSolutionMinAggregateOutputType | null;
    _max: SbcSolutionMaxAggregateOutputType | null;
  };

  type GetSbcSolutionGroupByPayload<T extends SbcSolutionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SbcSolutionGroupByOutputType, T['by']> & {
        [P in keyof T & keyof SbcSolutionGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], SbcSolutionGroupByOutputType[P]>
          : GetScalarType<T[P], SbcSolutionGroupByOutputType[P]>;
      }
    >
  >;

  export type SbcSolutionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      challengeId?: boolean;
      players?: boolean;
      cost?: boolean;
      rating?: boolean;
      isValid?: boolean;
      challenge?: boolean | SbcChallengeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['sbcSolution']
  >;

  export type SbcSolutionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      challengeId?: boolean;
      players?: boolean;
      cost?: boolean;
      rating?: boolean;
      isValid?: boolean;
      challenge?: boolean | SbcChallengeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['sbcSolution']
  >;

  export type SbcSolutionSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    challengeId?: boolean;
    players?: boolean;
    cost?: boolean;
    rating?: boolean;
    isValid?: boolean;
  };

  export type SbcSolutionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    challenge?: boolean | SbcChallengeDefaultArgs<ExtArgs>;
  };
  export type SbcSolutionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    challenge?: boolean | SbcChallengeDefaultArgs<ExtArgs>;
  };

  export type $SbcSolutionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'SbcSolution';
    objects: {
      challenge: Prisma.$SbcChallengePayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        createdAt: Date;
        challengeId: string;
        players: Prisma.JsonValue;
        cost: number | null;
        rating: number | null;
        isValid: boolean;
      },
      ExtArgs['result']['sbcSolution']
    >;
    composites: {};
  };

  type SbcSolutionGetPayload<S extends boolean | null | undefined | SbcSolutionDefaultArgs> =
    $Result.GetResult<Prisma.$SbcSolutionPayload, S>;

  type SbcSolutionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SbcSolutionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SbcSolutionCountAggregateInputType | true;
    };

  export interface SbcSolutionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['SbcSolution'];
      meta: { name: 'SbcSolution' };
    };
    /**
     * Find zero or one SbcSolution that matches the filter.
     * @param {SbcSolutionFindUniqueArgs} args - Arguments to find a SbcSolution
     * @example
     * // Get one SbcSolution
     * const sbcSolution = await prisma.sbcSolution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SbcSolutionFindUniqueArgs>(
      args: SelectSubset<T, SbcSolutionFindUniqueArgs<ExtArgs>>
    ): Prisma__SbcSolutionClient<
      $Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one SbcSolution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SbcSolutionFindUniqueOrThrowArgs} args - Arguments to find a SbcSolution
     * @example
     * // Get one SbcSolution
     * const sbcSolution = await prisma.sbcSolution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SbcSolutionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SbcSolutionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SbcSolutionClient<
      $Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first SbcSolution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcSolutionFindFirstArgs} args - Arguments to find a SbcSolution
     * @example
     * // Get one SbcSolution
     * const sbcSolution = await prisma.sbcSolution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SbcSolutionFindFirstArgs>(
      args?: SelectSubset<T, SbcSolutionFindFirstArgs<ExtArgs>>
    ): Prisma__SbcSolutionClient<
      $Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first SbcSolution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcSolutionFindFirstOrThrowArgs} args - Arguments to find a SbcSolution
     * @example
     * // Get one SbcSolution
     * const sbcSolution = await prisma.sbcSolution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SbcSolutionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SbcSolutionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SbcSolutionClient<
      $Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more SbcSolutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcSolutionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SbcSolutions
     * const sbcSolutions = await prisma.sbcSolution.findMany()
     *
     * // Get first 10 SbcSolutions
     * const sbcSolutions = await prisma.sbcSolution.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sbcSolutionWithIdOnly = await prisma.sbcSolution.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SbcSolutionFindManyArgs>(
      args?: SelectSubset<T, SbcSolutionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a SbcSolution.
     * @param {SbcSolutionCreateArgs} args - Arguments to create a SbcSolution.
     * @example
     * // Create one SbcSolution
     * const SbcSolution = await prisma.sbcSolution.create({
     *   data: {
     *     // ... data to create a SbcSolution
     *   }
     * })
     *
     */
    create<T extends SbcSolutionCreateArgs>(
      args: SelectSubset<T, SbcSolutionCreateArgs<ExtArgs>>
    ): Prisma__SbcSolutionClient<
      $Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many SbcSolutions.
     * @param {SbcSolutionCreateManyArgs} args - Arguments to create many SbcSolutions.
     * @example
     * // Create many SbcSolutions
     * const sbcSolution = await prisma.sbcSolution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SbcSolutionCreateManyArgs>(
      args?: SelectSubset<T, SbcSolutionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many SbcSolutions and returns the data saved in the database.
     * @param {SbcSolutionCreateManyAndReturnArgs} args - Arguments to create many SbcSolutions.
     * @example
     * // Create many SbcSolutions
     * const sbcSolution = await prisma.sbcSolution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SbcSolutions and only return the `id`
     * const sbcSolutionWithIdOnly = await prisma.sbcSolution.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SbcSolutionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SbcSolutionCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a SbcSolution.
     * @param {SbcSolutionDeleteArgs} args - Arguments to delete one SbcSolution.
     * @example
     * // Delete one SbcSolution
     * const SbcSolution = await prisma.sbcSolution.delete({
     *   where: {
     *     // ... filter to delete one SbcSolution
     *   }
     * })
     *
     */
    delete<T extends SbcSolutionDeleteArgs>(
      args: SelectSubset<T, SbcSolutionDeleteArgs<ExtArgs>>
    ): Prisma__SbcSolutionClient<
      $Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one SbcSolution.
     * @param {SbcSolutionUpdateArgs} args - Arguments to update one SbcSolution.
     * @example
     * // Update one SbcSolution
     * const sbcSolution = await prisma.sbcSolution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SbcSolutionUpdateArgs>(
      args: SelectSubset<T, SbcSolutionUpdateArgs<ExtArgs>>
    ): Prisma__SbcSolutionClient<
      $Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more SbcSolutions.
     * @param {SbcSolutionDeleteManyArgs} args - Arguments to filter SbcSolutions to delete.
     * @example
     * // Delete a few SbcSolutions
     * const { count } = await prisma.sbcSolution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SbcSolutionDeleteManyArgs>(
      args?: SelectSubset<T, SbcSolutionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more SbcSolutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcSolutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SbcSolutions
     * const sbcSolution = await prisma.sbcSolution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SbcSolutionUpdateManyArgs>(
      args: SelectSubset<T, SbcSolutionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one SbcSolution.
     * @param {SbcSolutionUpsertArgs} args - Arguments to update or create a SbcSolution.
     * @example
     * // Update or create a SbcSolution
     * const sbcSolution = await prisma.sbcSolution.upsert({
     *   create: {
     *     // ... data to create a SbcSolution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SbcSolution we want to update
     *   }
     * })
     */
    upsert<T extends SbcSolutionUpsertArgs>(
      args: SelectSubset<T, SbcSolutionUpsertArgs<ExtArgs>>
    ): Prisma__SbcSolutionClient<
      $Result.GetResult<Prisma.$SbcSolutionPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of SbcSolutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcSolutionCountArgs} args - Arguments to filter SbcSolutions to count.
     * @example
     * // Count the number of SbcSolutions
     * const count = await prisma.sbcSolution.count({
     *   where: {
     *     // ... the filter for the SbcSolutions we want to count
     *   }
     * })
     **/
    count<T extends SbcSolutionCountArgs>(
      args?: Subset<T, SbcSolutionCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SbcSolutionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a SbcSolution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcSolutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SbcSolutionAggregateArgs>(
      args: Subset<T, SbcSolutionAggregateArgs>
    ): Prisma.PrismaPromise<GetSbcSolutionAggregateType<T>>;

    /**
     * Group by SbcSolution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SbcSolutionGroupByArgs} args - Group by arguments.
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
      T extends SbcSolutionGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SbcSolutionGroupByArgs['orderBy'] }
        : { orderBy?: SbcSolutionGroupByArgs['orderBy'] },
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
      args: SubsetIntersection<T, SbcSolutionGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetSbcSolutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SbcSolution model
     */
    readonly fields: SbcSolutionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SbcSolution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SbcSolutionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    challenge<T extends SbcChallengeDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, SbcChallengeDefaultArgs<ExtArgs>>
    ): Prisma__SbcChallengeClient<
      $Result.GetResult<Prisma.$SbcChallengePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
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
   * Fields of the SbcSolution model
   */
  interface SbcSolutionFieldRefs {
    readonly id: FieldRef<'SbcSolution', 'String'>;
    readonly createdAt: FieldRef<'SbcSolution', 'DateTime'>;
    readonly challengeId: FieldRef<'SbcSolution', 'String'>;
    readonly players: FieldRef<'SbcSolution', 'Json'>;
    readonly cost: FieldRef<'SbcSolution', 'Float'>;
    readonly rating: FieldRef<'SbcSolution', 'Int'>;
    readonly isValid: FieldRef<'SbcSolution', 'Boolean'>;
  }

  // Custom InputTypes
  /**
   * SbcSolution findUnique
   */
  export type SbcSolutionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
    /**
     * Filter, which SbcSolution to fetch.
     */
    where: SbcSolutionWhereUniqueInput;
  };

  /**
   * SbcSolution findUniqueOrThrow
   */
  export type SbcSolutionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
    /**
     * Filter, which SbcSolution to fetch.
     */
    where: SbcSolutionWhereUniqueInput;
  };

  /**
   * SbcSolution findFirst
   */
  export type SbcSolutionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
    /**
     * Filter, which SbcSolution to fetch.
     */
    where?: SbcSolutionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SbcSolutions to fetch.
     */
    orderBy?: SbcSolutionOrderByWithRelationInput | SbcSolutionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SbcSolutions.
     */
    cursor?: SbcSolutionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SbcSolutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SbcSolutions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SbcSolutions.
     */
    distinct?: SbcSolutionScalarFieldEnum | SbcSolutionScalarFieldEnum[];
  };

  /**
   * SbcSolution findFirstOrThrow
   */
  export type SbcSolutionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
    /**
     * Filter, which SbcSolution to fetch.
     */
    where?: SbcSolutionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SbcSolutions to fetch.
     */
    orderBy?: SbcSolutionOrderByWithRelationInput | SbcSolutionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SbcSolutions.
     */
    cursor?: SbcSolutionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SbcSolutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SbcSolutions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SbcSolutions.
     */
    distinct?: SbcSolutionScalarFieldEnum | SbcSolutionScalarFieldEnum[];
  };

  /**
   * SbcSolution findMany
   */
  export type SbcSolutionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
    /**
     * Filter, which SbcSolutions to fetch.
     */
    where?: SbcSolutionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SbcSolutions to fetch.
     */
    orderBy?: SbcSolutionOrderByWithRelationInput | SbcSolutionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SbcSolutions.
     */
    cursor?: SbcSolutionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SbcSolutions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SbcSolutions.
     */
    skip?: number;
    distinct?: SbcSolutionScalarFieldEnum | SbcSolutionScalarFieldEnum[];
  };

  /**
   * SbcSolution create
   */
  export type SbcSolutionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
    /**
     * The data needed to create a SbcSolution.
     */
    data: XOR<SbcSolutionCreateInput, SbcSolutionUncheckedCreateInput>;
  };

  /**
   * SbcSolution createMany
   */
  export type SbcSolutionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many SbcSolutions.
     */
    data: SbcSolutionCreateManyInput | SbcSolutionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * SbcSolution createManyAndReturn
   */
  export type SbcSolutionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many SbcSolutions.
     */
    data: SbcSolutionCreateManyInput | SbcSolutionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * SbcSolution update
   */
  export type SbcSolutionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
    /**
     * The data needed to update a SbcSolution.
     */
    data: XOR<SbcSolutionUpdateInput, SbcSolutionUncheckedUpdateInput>;
    /**
     * Choose, which SbcSolution to update.
     */
    where: SbcSolutionWhereUniqueInput;
  };

  /**
   * SbcSolution updateMany
   */
  export type SbcSolutionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update SbcSolutions.
     */
    data: XOR<SbcSolutionUpdateManyMutationInput, SbcSolutionUncheckedUpdateManyInput>;
    /**
     * Filter which SbcSolutions to update
     */
    where?: SbcSolutionWhereInput;
  };

  /**
   * SbcSolution upsert
   */
  export type SbcSolutionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
    /**
     * The filter to search for the SbcSolution to update in case it exists.
     */
    where: SbcSolutionWhereUniqueInput;
    /**
     * In case the SbcSolution found by the `where` argument doesn't exist, create a new SbcSolution with this data.
     */
    create: XOR<SbcSolutionCreateInput, SbcSolutionUncheckedCreateInput>;
    /**
     * In case the SbcSolution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SbcSolutionUpdateInput, SbcSolutionUncheckedUpdateInput>;
  };

  /**
   * SbcSolution delete
   */
  export type SbcSolutionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
    /**
     * Filter which SbcSolution to delete.
     */
    where: SbcSolutionWhereUniqueInput;
  };

  /**
   * SbcSolution deleteMany
   */
  export type SbcSolutionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which SbcSolutions to delete
     */
    where?: SbcSolutionWhereInput;
  };

  /**
   * SbcSolution without action
   */
  export type SbcSolutionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SbcSolution
     */
    select?: SbcSolutionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SbcSolutionInclude<ExtArgs> | null;
  };

  /**
   * Model CompanionAppState
   */

  export type AggregateCompanionAppState = {
    _count: CompanionAppStateCountAggregateOutputType | null;
    _min: CompanionAppStateMinAggregateOutputType | null;
    _max: CompanionAppStateMaxAggregateOutputType | null;
  };

  export type CompanionAppStateMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    sessionId: string | null;
  };

  export type CompanionAppStateMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    sessionId: string | null;
  };

  export type CompanionAppStateCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    state: number;
    sessionId: number;
    _all: number;
  };

  export type CompanionAppStateMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    sessionId?: true;
  };

  export type CompanionAppStateMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    sessionId?: true;
  };

  export type CompanionAppStateCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    state?: true;
    sessionId?: true;
    _all?: true;
  };

  export type CompanionAppStateAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which CompanionAppState to aggregate.
     */
    where?: CompanionAppStateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CompanionAppStates to fetch.
     */
    orderBy?:
      | CompanionAppStateOrderByWithRelationInput
      | CompanionAppStateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CompanionAppStateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CompanionAppStates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CompanionAppStates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned CompanionAppStates
     **/
    _count?: true | CompanionAppStateCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CompanionAppStateMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CompanionAppStateMaxAggregateInputType;
  };

  export type GetCompanionAppStateAggregateType<T extends CompanionAppStateAggregateArgs> = {
    [P in keyof T & keyof AggregateCompanionAppState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanionAppState[P]>
      : GetScalarType<T[P], AggregateCompanionAppState[P]>;
  };

  export type CompanionAppStateGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CompanionAppStateWhereInput;
    orderBy?:
      | CompanionAppStateOrderByWithAggregationInput
      | CompanionAppStateOrderByWithAggregationInput[];
    by: CompanionAppStateScalarFieldEnum[] | CompanionAppStateScalarFieldEnum;
    having?: CompanionAppStateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CompanionAppStateCountAggregateInputType | true;
    _min?: CompanionAppStateMinAggregateInputType;
    _max?: CompanionAppStateMaxAggregateInputType;
  };

  export type CompanionAppStateGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    state: JsonValue;
    sessionId: string | null;
    _count: CompanionAppStateCountAggregateOutputType | null;
    _min: CompanionAppStateMinAggregateOutputType | null;
    _max: CompanionAppStateMaxAggregateOutputType | null;
  };

  type GetCompanionAppStateGroupByPayload<T extends CompanionAppStateGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<CompanionAppStateGroupByOutputType, T['by']> & {
          [P in keyof T & keyof CompanionAppStateGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanionAppStateGroupByOutputType[P]>
            : GetScalarType<T[P], CompanionAppStateGroupByOutputType[P]>;
        }
      >
    >;

  export type CompanionAppStateSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      state?: boolean;
      sessionId?: boolean;
    },
    ExtArgs['result']['companionAppState']
  >;

  export type CompanionAppStateSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      state?: boolean;
      sessionId?: boolean;
    },
    ExtArgs['result']['companionAppState']
  >;

  export type CompanionAppStateSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    state?: boolean;
    sessionId?: boolean;
  };

  export type $CompanionAppStatePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'CompanionAppState';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        state: Prisma.JsonValue;
        sessionId: string | null;
      },
      ExtArgs['result']['companionAppState']
    >;
    composites: {};
  };

  type CompanionAppStateGetPayload<
    S extends boolean | null | undefined | CompanionAppStateDefaultArgs,
  > = $Result.GetResult<Prisma.$CompanionAppStatePayload, S>;

  type CompanionAppStateCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<CompanionAppStateFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: CompanionAppStateCountAggregateInputType | true;
  };

  export interface CompanionAppStateDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['CompanionAppState'];
      meta: { name: 'CompanionAppState' };
    };
    /**
     * Find zero or one CompanionAppState that matches the filter.
     * @param {CompanionAppStateFindUniqueArgs} args - Arguments to find a CompanionAppState
     * @example
     * // Get one CompanionAppState
     * const companionAppState = await prisma.companionAppState.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanionAppStateFindUniqueArgs>(
      args: SelectSubset<T, CompanionAppStateFindUniqueArgs<ExtArgs>>
    ): Prisma__CompanionAppStateClient<
      $Result.GetResult<Prisma.$CompanionAppStatePayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one CompanionAppState that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanionAppStateFindUniqueOrThrowArgs} args - Arguments to find a CompanionAppState
     * @example
     * // Get one CompanionAppState
     * const companionAppState = await prisma.companionAppState.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanionAppStateFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CompanionAppStateFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CompanionAppStateClient<
      $Result.GetResult<Prisma.$CompanionAppStatePayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first CompanionAppState that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanionAppStateFindFirstArgs} args - Arguments to find a CompanionAppState
     * @example
     * // Get one CompanionAppState
     * const companionAppState = await prisma.companionAppState.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanionAppStateFindFirstArgs>(
      args?: SelectSubset<T, CompanionAppStateFindFirstArgs<ExtArgs>>
    ): Prisma__CompanionAppStateClient<
      $Result.GetResult<Prisma.$CompanionAppStatePayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first CompanionAppState that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanionAppStateFindFirstOrThrowArgs} args - Arguments to find a CompanionAppState
     * @example
     * // Get one CompanionAppState
     * const companionAppState = await prisma.companionAppState.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanionAppStateFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CompanionAppStateFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CompanionAppStateClient<
      $Result.GetResult<Prisma.$CompanionAppStatePayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more CompanionAppStates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanionAppStateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanionAppStates
     * const companionAppStates = await prisma.companionAppState.findMany()
     *
     * // Get first 10 CompanionAppStates
     * const companionAppStates = await prisma.companionAppState.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const companionAppStateWithIdOnly = await prisma.companionAppState.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CompanionAppStateFindManyArgs>(
      args?: SelectSubset<T, CompanionAppStateFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CompanionAppStatePayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a CompanionAppState.
     * @param {CompanionAppStateCreateArgs} args - Arguments to create a CompanionAppState.
     * @example
     * // Create one CompanionAppState
     * const CompanionAppState = await prisma.companionAppState.create({
     *   data: {
     *     // ... data to create a CompanionAppState
     *   }
     * })
     *
     */
    create<T extends CompanionAppStateCreateArgs>(
      args: SelectSubset<T, CompanionAppStateCreateArgs<ExtArgs>>
    ): Prisma__CompanionAppStateClient<
      $Result.GetResult<Prisma.$CompanionAppStatePayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many CompanionAppStates.
     * @param {CompanionAppStateCreateManyArgs} args - Arguments to create many CompanionAppStates.
     * @example
     * // Create many CompanionAppStates
     * const companionAppState = await prisma.companionAppState.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CompanionAppStateCreateManyArgs>(
      args?: SelectSubset<T, CompanionAppStateCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many CompanionAppStates and returns the data saved in the database.
     * @param {CompanionAppStateCreateManyAndReturnArgs} args - Arguments to create many CompanionAppStates.
     * @example
     * // Create many CompanionAppStates
     * const companionAppState = await prisma.companionAppState.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many CompanionAppStates and only return the `id`
     * const companionAppStateWithIdOnly = await prisma.companionAppState.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CompanionAppStateCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CompanionAppStateCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CompanionAppStatePayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a CompanionAppState.
     * @param {CompanionAppStateDeleteArgs} args - Arguments to delete one CompanionAppState.
     * @example
     * // Delete one CompanionAppState
     * const CompanionAppState = await prisma.companionAppState.delete({
     *   where: {
     *     // ... filter to delete one CompanionAppState
     *   }
     * })
     *
     */
    delete<T extends CompanionAppStateDeleteArgs>(
      args: SelectSubset<T, CompanionAppStateDeleteArgs<ExtArgs>>
    ): Prisma__CompanionAppStateClient<
      $Result.GetResult<Prisma.$CompanionAppStatePayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one CompanionAppState.
     * @param {CompanionAppStateUpdateArgs} args - Arguments to update one CompanionAppState.
     * @example
     * // Update one CompanionAppState
     * const companionAppState = await prisma.companionAppState.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CompanionAppStateUpdateArgs>(
      args: SelectSubset<T, CompanionAppStateUpdateArgs<ExtArgs>>
    ): Prisma__CompanionAppStateClient<
      $Result.GetResult<Prisma.$CompanionAppStatePayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more CompanionAppStates.
     * @param {CompanionAppStateDeleteManyArgs} args - Arguments to filter CompanionAppStates to delete.
     * @example
     * // Delete a few CompanionAppStates
     * const { count } = await prisma.companionAppState.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CompanionAppStateDeleteManyArgs>(
      args?: SelectSubset<T, CompanionAppStateDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more CompanionAppStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanionAppStateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanionAppStates
     * const companionAppState = await prisma.companionAppState.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CompanionAppStateUpdateManyArgs>(
      args: SelectSubset<T, CompanionAppStateUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one CompanionAppState.
     * @param {CompanionAppStateUpsertArgs} args - Arguments to update or create a CompanionAppState.
     * @example
     * // Update or create a CompanionAppState
     * const companionAppState = await prisma.companionAppState.upsert({
     *   create: {
     *     // ... data to create a CompanionAppState
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanionAppState we want to update
     *   }
     * })
     */
    upsert<T extends CompanionAppStateUpsertArgs>(
      args: SelectSubset<T, CompanionAppStateUpsertArgs<ExtArgs>>
    ): Prisma__CompanionAppStateClient<
      $Result.GetResult<Prisma.$CompanionAppStatePayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of CompanionAppStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanionAppStateCountArgs} args - Arguments to filter CompanionAppStates to count.
     * @example
     * // Count the number of CompanionAppStates
     * const count = await prisma.companionAppState.count({
     *   where: {
     *     // ... the filter for the CompanionAppStates we want to count
     *   }
     * })
     **/
    count<T extends CompanionAppStateCountArgs>(
      args?: Subset<T, CompanionAppStateCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanionAppStateCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a CompanionAppState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanionAppStateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanionAppStateAggregateArgs>(
      args: Subset<T, CompanionAppStateAggregateArgs>
    ): Prisma.PrismaPromise<GetCompanionAppStateAggregateType<T>>;

    /**
     * Group by CompanionAppState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanionAppStateGroupByArgs} args - Group by arguments.
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
      T extends CompanionAppStateGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanionAppStateGroupByArgs['orderBy'] }
        : { orderBy?: CompanionAppStateGroupByArgs['orderBy'] },
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
      args: SubsetIntersection<T, CompanionAppStateGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetCompanionAppStateGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the CompanionAppState model
     */
    readonly fields: CompanionAppStateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanionAppState.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanionAppStateClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
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
   * Fields of the CompanionAppState model
   */
  interface CompanionAppStateFieldRefs {
    readonly id: FieldRef<'CompanionAppState', 'String'>;
    readonly createdAt: FieldRef<'CompanionAppState', 'DateTime'>;
    readonly updatedAt: FieldRef<'CompanionAppState', 'DateTime'>;
    readonly state: FieldRef<'CompanionAppState', 'Json'>;
    readonly sessionId: FieldRef<'CompanionAppState', 'String'>;
  }

  // Custom InputTypes
  /**
   * CompanionAppState findUnique
   */
  export type CompanionAppStateFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelect<ExtArgs> | null;
    /**
     * Filter, which CompanionAppState to fetch.
     */
    where: CompanionAppStateWhereUniqueInput;
  };

  /**
   * CompanionAppState findUniqueOrThrow
   */
  export type CompanionAppStateFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelect<ExtArgs> | null;
    /**
     * Filter, which CompanionAppState to fetch.
     */
    where: CompanionAppStateWhereUniqueInput;
  };

  /**
   * CompanionAppState findFirst
   */
  export type CompanionAppStateFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelect<ExtArgs> | null;
    /**
     * Filter, which CompanionAppState to fetch.
     */
    where?: CompanionAppStateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CompanionAppStates to fetch.
     */
    orderBy?:
      | CompanionAppStateOrderByWithRelationInput
      | CompanionAppStateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CompanionAppStates.
     */
    cursor?: CompanionAppStateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CompanionAppStates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CompanionAppStates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CompanionAppStates.
     */
    distinct?: CompanionAppStateScalarFieldEnum | CompanionAppStateScalarFieldEnum[];
  };

  /**
   * CompanionAppState findFirstOrThrow
   */
  export type CompanionAppStateFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelect<ExtArgs> | null;
    /**
     * Filter, which CompanionAppState to fetch.
     */
    where?: CompanionAppStateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CompanionAppStates to fetch.
     */
    orderBy?:
      | CompanionAppStateOrderByWithRelationInput
      | CompanionAppStateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CompanionAppStates.
     */
    cursor?: CompanionAppStateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CompanionAppStates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CompanionAppStates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CompanionAppStates.
     */
    distinct?: CompanionAppStateScalarFieldEnum | CompanionAppStateScalarFieldEnum[];
  };

  /**
   * CompanionAppState findMany
   */
  export type CompanionAppStateFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelect<ExtArgs> | null;
    /**
     * Filter, which CompanionAppStates to fetch.
     */
    where?: CompanionAppStateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CompanionAppStates to fetch.
     */
    orderBy?:
      | CompanionAppStateOrderByWithRelationInput
      | CompanionAppStateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing CompanionAppStates.
     */
    cursor?: CompanionAppStateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CompanionAppStates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CompanionAppStates.
     */
    skip?: number;
    distinct?: CompanionAppStateScalarFieldEnum | CompanionAppStateScalarFieldEnum[];
  };

  /**
   * CompanionAppState create
   */
  export type CompanionAppStateCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelect<ExtArgs> | null;
    /**
     * The data needed to create a CompanionAppState.
     */
    data: XOR<CompanionAppStateCreateInput, CompanionAppStateUncheckedCreateInput>;
  };

  /**
   * CompanionAppState createMany
   */
  export type CompanionAppStateCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many CompanionAppStates.
     */
    data: CompanionAppStateCreateManyInput | CompanionAppStateCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * CompanionAppState createManyAndReturn
   */
  export type CompanionAppStateCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many CompanionAppStates.
     */
    data: CompanionAppStateCreateManyInput | CompanionAppStateCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * CompanionAppState update
   */
  export type CompanionAppStateUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelect<ExtArgs> | null;
    /**
     * The data needed to update a CompanionAppState.
     */
    data: XOR<CompanionAppStateUpdateInput, CompanionAppStateUncheckedUpdateInput>;
    /**
     * Choose, which CompanionAppState to update.
     */
    where: CompanionAppStateWhereUniqueInput;
  };

  /**
   * CompanionAppState updateMany
   */
  export type CompanionAppStateUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update CompanionAppStates.
     */
    data: XOR<CompanionAppStateUpdateManyMutationInput, CompanionAppStateUncheckedUpdateManyInput>;
    /**
     * Filter which CompanionAppStates to update
     */
    where?: CompanionAppStateWhereInput;
  };

  /**
   * CompanionAppState upsert
   */
  export type CompanionAppStateUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelect<ExtArgs> | null;
    /**
     * The filter to search for the CompanionAppState to update in case it exists.
     */
    where: CompanionAppStateWhereUniqueInput;
    /**
     * In case the CompanionAppState found by the `where` argument doesn't exist, create a new CompanionAppState with this data.
     */
    create: XOR<CompanionAppStateCreateInput, CompanionAppStateUncheckedCreateInput>;
    /**
     * In case the CompanionAppState was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanionAppStateUpdateInput, CompanionAppStateUncheckedUpdateInput>;
  };

  /**
   * CompanionAppState delete
   */
  export type CompanionAppStateDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelect<ExtArgs> | null;
    /**
     * Filter which CompanionAppState to delete.
     */
    where: CompanionAppStateWhereUniqueInput;
  };

  /**
   * CompanionAppState deleteMany
   */
  export type CompanionAppStateDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which CompanionAppStates to delete
     */
    where?: CompanionAppStateWhereInput;
  };

  /**
   * CompanionAppState without action
   */
  export type CompanionAppStateDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CompanionAppState
     */
    select?: CompanionAppStateSelect<ExtArgs> | null;
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

  export const UserSessionScalarFieldEnum: {
    id: 'id';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
    sessionId: 'sessionId';
    data: 'data';
  };

  export type UserSessionScalarFieldEnum =
    (typeof UserSessionScalarFieldEnum)[keyof typeof UserSessionScalarFieldEnum];

  export const SbcChallengeScalarFieldEnum: {
    id: 'id';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
    challengeId: 'challengeId';
    name: 'name';
    requirements: 'requirements';
    status: 'status';
  };

  export type SbcChallengeScalarFieldEnum =
    (typeof SbcChallengeScalarFieldEnum)[keyof typeof SbcChallengeScalarFieldEnum];

  export const SbcSolutionScalarFieldEnum: {
    id: 'id';
    createdAt: 'createdAt';
    challengeId: 'challengeId';
    players: 'players';
    cost: 'cost';
    rating: 'rating';
    isValid: 'isValid';
  };

  export type SbcSolutionScalarFieldEnum =
    (typeof SbcSolutionScalarFieldEnum)[keyof typeof SbcSolutionScalarFieldEnum];

  export const CompanionAppStateScalarFieldEnum: {
    id: 'id';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
    state: 'state';
    sessionId: 'sessionId';
  };

  export type CompanionAppStateScalarFieldEnum =
    (typeof CompanionAppStateScalarFieldEnum)[keyof typeof CompanionAppStateScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
  };

  export type NullableJsonNullValueInput =
    (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;

  /**
   * Deep Input Types
   */

  export type UserSessionWhereInput = {
    AND?: UserSessionWhereInput | UserSessionWhereInput[];
    OR?: UserSessionWhereInput[];
    NOT?: UserSessionWhereInput | UserSessionWhereInput[];
    id?: StringFilter<'UserSession'> | string;
    createdAt?: DateTimeFilter<'UserSession'> | Date | string;
    updatedAt?: DateTimeFilter<'UserSession'> | Date | string;
    sessionId?: StringFilter<'UserSession'> | string;
    data?: JsonNullableFilter<'UserSession'>;
  };

  export type UserSessionOrderByWithRelationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    sessionId?: SortOrder;
    data?: SortOrderInput | SortOrder;
  };

  export type UserSessionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      sessionId?: string;
      AND?: UserSessionWhereInput | UserSessionWhereInput[];
      OR?: UserSessionWhereInput[];
      NOT?: UserSessionWhereInput | UserSessionWhereInput[];
      createdAt?: DateTimeFilter<'UserSession'> | Date | string;
      updatedAt?: DateTimeFilter<'UserSession'> | Date | string;
      data?: JsonNullableFilter<'UserSession'>;
    },
    'id' | 'sessionId'
  >;

  export type UserSessionOrderByWithAggregationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    sessionId?: SortOrder;
    data?: SortOrderInput | SortOrder;
    _count?: UserSessionCountOrderByAggregateInput;
    _max?: UserSessionMaxOrderByAggregateInput;
    _min?: UserSessionMinOrderByAggregateInput;
  };

  export type UserSessionScalarWhereWithAggregatesInput = {
    AND?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[];
    OR?: UserSessionScalarWhereWithAggregatesInput[];
    NOT?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'UserSession'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'UserSession'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'UserSession'> | Date | string;
    sessionId?: StringWithAggregatesFilter<'UserSession'> | string;
    data?: JsonNullableWithAggregatesFilter<'UserSession'>;
  };

  export type SbcChallengeWhereInput = {
    AND?: SbcChallengeWhereInput | SbcChallengeWhereInput[];
    OR?: SbcChallengeWhereInput[];
    NOT?: SbcChallengeWhereInput | SbcChallengeWhereInput[];
    id?: StringFilter<'SbcChallenge'> | string;
    createdAt?: DateTimeFilter<'SbcChallenge'> | Date | string;
    updatedAt?: DateTimeFilter<'SbcChallenge'> | Date | string;
    challengeId?: StringFilter<'SbcChallenge'> | string;
    name?: StringFilter<'SbcChallenge'> | string;
    requirements?: JsonFilter<'SbcChallenge'>;
    status?: StringFilter<'SbcChallenge'> | string;
    solutions?: SbcSolutionListRelationFilter;
  };

  export type SbcChallengeOrderByWithRelationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    challengeId?: SortOrder;
    name?: SortOrder;
    requirements?: SortOrder;
    status?: SortOrder;
    solutions?: SbcSolutionOrderByRelationAggregateInput;
  };

  export type SbcChallengeWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      challengeId?: string;
      AND?: SbcChallengeWhereInput | SbcChallengeWhereInput[];
      OR?: SbcChallengeWhereInput[];
      NOT?: SbcChallengeWhereInput | SbcChallengeWhereInput[];
      createdAt?: DateTimeFilter<'SbcChallenge'> | Date | string;
      updatedAt?: DateTimeFilter<'SbcChallenge'> | Date | string;
      name?: StringFilter<'SbcChallenge'> | string;
      requirements?: JsonFilter<'SbcChallenge'>;
      status?: StringFilter<'SbcChallenge'> | string;
      solutions?: SbcSolutionListRelationFilter;
    },
    'id' | 'challengeId'
  >;

  export type SbcChallengeOrderByWithAggregationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    challengeId?: SortOrder;
    name?: SortOrder;
    requirements?: SortOrder;
    status?: SortOrder;
    _count?: SbcChallengeCountOrderByAggregateInput;
    _max?: SbcChallengeMaxOrderByAggregateInput;
    _min?: SbcChallengeMinOrderByAggregateInput;
  };

  export type SbcChallengeScalarWhereWithAggregatesInput = {
    AND?: SbcChallengeScalarWhereWithAggregatesInput | SbcChallengeScalarWhereWithAggregatesInput[];
    OR?: SbcChallengeScalarWhereWithAggregatesInput[];
    NOT?: SbcChallengeScalarWhereWithAggregatesInput | SbcChallengeScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'SbcChallenge'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'SbcChallenge'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'SbcChallenge'> | Date | string;
    challengeId?: StringWithAggregatesFilter<'SbcChallenge'> | string;
    name?: StringWithAggregatesFilter<'SbcChallenge'> | string;
    requirements?: JsonWithAggregatesFilter<'SbcChallenge'>;
    status?: StringWithAggregatesFilter<'SbcChallenge'> | string;
  };

  export type SbcSolutionWhereInput = {
    AND?: SbcSolutionWhereInput | SbcSolutionWhereInput[];
    OR?: SbcSolutionWhereInput[];
    NOT?: SbcSolutionWhereInput | SbcSolutionWhereInput[];
    id?: StringFilter<'SbcSolution'> | string;
    createdAt?: DateTimeFilter<'SbcSolution'> | Date | string;
    challengeId?: StringFilter<'SbcSolution'> | string;
    players?: JsonFilter<'SbcSolution'>;
    cost?: FloatNullableFilter<'SbcSolution'> | number | null;
    rating?: IntNullableFilter<'SbcSolution'> | number | null;
    isValid?: BoolFilter<'SbcSolution'> | boolean;
    challenge?: XOR<SbcChallengeRelationFilter, SbcChallengeWhereInput>;
  };

  export type SbcSolutionOrderByWithRelationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    challengeId?: SortOrder;
    players?: SortOrder;
    cost?: SortOrderInput | SortOrder;
    rating?: SortOrderInput | SortOrder;
    isValid?: SortOrder;
    challenge?: SbcChallengeOrderByWithRelationInput;
  };

  export type SbcSolutionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: SbcSolutionWhereInput | SbcSolutionWhereInput[];
      OR?: SbcSolutionWhereInput[];
      NOT?: SbcSolutionWhereInput | SbcSolutionWhereInput[];
      createdAt?: DateTimeFilter<'SbcSolution'> | Date | string;
      challengeId?: StringFilter<'SbcSolution'> | string;
      players?: JsonFilter<'SbcSolution'>;
      cost?: FloatNullableFilter<'SbcSolution'> | number | null;
      rating?: IntNullableFilter<'SbcSolution'> | number | null;
      isValid?: BoolFilter<'SbcSolution'> | boolean;
      challenge?: XOR<SbcChallengeRelationFilter, SbcChallengeWhereInput>;
    },
    'id'
  >;

  export type SbcSolutionOrderByWithAggregationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    challengeId?: SortOrder;
    players?: SortOrder;
    cost?: SortOrderInput | SortOrder;
    rating?: SortOrderInput | SortOrder;
    isValid?: SortOrder;
    _count?: SbcSolutionCountOrderByAggregateInput;
    _avg?: SbcSolutionAvgOrderByAggregateInput;
    _max?: SbcSolutionMaxOrderByAggregateInput;
    _min?: SbcSolutionMinOrderByAggregateInput;
    _sum?: SbcSolutionSumOrderByAggregateInput;
  };

  export type SbcSolutionScalarWhereWithAggregatesInput = {
    AND?: SbcSolutionScalarWhereWithAggregatesInput | SbcSolutionScalarWhereWithAggregatesInput[];
    OR?: SbcSolutionScalarWhereWithAggregatesInput[];
    NOT?: SbcSolutionScalarWhereWithAggregatesInput | SbcSolutionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'SbcSolution'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'SbcSolution'> | Date | string;
    challengeId?: StringWithAggregatesFilter<'SbcSolution'> | string;
    players?: JsonWithAggregatesFilter<'SbcSolution'>;
    cost?: FloatNullableWithAggregatesFilter<'SbcSolution'> | number | null;
    rating?: IntNullableWithAggregatesFilter<'SbcSolution'> | number | null;
    isValid?: BoolWithAggregatesFilter<'SbcSolution'> | boolean;
  };

  export type CompanionAppStateWhereInput = {
    AND?: CompanionAppStateWhereInput | CompanionAppStateWhereInput[];
    OR?: CompanionAppStateWhereInput[];
    NOT?: CompanionAppStateWhereInput | CompanionAppStateWhereInput[];
    id?: StringFilter<'CompanionAppState'> | string;
    createdAt?: DateTimeFilter<'CompanionAppState'> | Date | string;
    updatedAt?: DateTimeFilter<'CompanionAppState'> | Date | string;
    state?: JsonFilter<'CompanionAppState'>;
    sessionId?: StringNullableFilter<'CompanionAppState'> | string | null;
  };

  export type CompanionAppStateOrderByWithRelationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    state?: SortOrder;
    sessionId?: SortOrderInput | SortOrder;
  };

  export type CompanionAppStateWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: CompanionAppStateWhereInput | CompanionAppStateWhereInput[];
      OR?: CompanionAppStateWhereInput[];
      NOT?: CompanionAppStateWhereInput | CompanionAppStateWhereInput[];
      createdAt?: DateTimeFilter<'CompanionAppState'> | Date | string;
      updatedAt?: DateTimeFilter<'CompanionAppState'> | Date | string;
      state?: JsonFilter<'CompanionAppState'>;
      sessionId?: StringNullableFilter<'CompanionAppState'> | string | null;
    },
    'id'
  >;

  export type CompanionAppStateOrderByWithAggregationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    state?: SortOrder;
    sessionId?: SortOrderInput | SortOrder;
    _count?: CompanionAppStateCountOrderByAggregateInput;
    _max?: CompanionAppStateMaxOrderByAggregateInput;
    _min?: CompanionAppStateMinOrderByAggregateInput;
  };

  export type CompanionAppStateScalarWhereWithAggregatesInput = {
    AND?:
      | CompanionAppStateScalarWhereWithAggregatesInput
      | CompanionAppStateScalarWhereWithAggregatesInput[];
    OR?: CompanionAppStateScalarWhereWithAggregatesInput[];
    NOT?:
      | CompanionAppStateScalarWhereWithAggregatesInput
      | CompanionAppStateScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'CompanionAppState'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'CompanionAppState'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'CompanionAppState'> | Date | string;
    state?: JsonWithAggregatesFilter<'CompanionAppState'>;
    sessionId?: StringNullableWithAggregatesFilter<'CompanionAppState'> | string | null;
  };

  export type UserSessionCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessionId: string;
    data?: NullableJsonNullValueInput | InputJsonValue;
  };

  export type UserSessionUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessionId: string;
    data?: NullableJsonNullValueInput | InputJsonValue;
  };

  export type UserSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessionId?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
  };

  export type UserSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessionId?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
  };

  export type UserSessionCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessionId: string;
    data?: NullableJsonNullValueInput | InputJsonValue;
  };

  export type UserSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessionId?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
  };

  export type UserSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessionId?: StringFieldUpdateOperationsInput | string;
    data?: NullableJsonNullValueInput | InputJsonValue;
  };

  export type SbcChallengeCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    challengeId: string;
    name: string;
    requirements: JsonNullValueInput | InputJsonValue;
    status?: string;
    solutions?: SbcSolutionCreateNestedManyWithoutChallengeInput;
  };

  export type SbcChallengeUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    challengeId: string;
    name: string;
    requirements: JsonNullValueInput | InputJsonValue;
    status?: string;
    solutions?: SbcSolutionUncheckedCreateNestedManyWithoutChallengeInput;
  };

  export type SbcChallengeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    challengeId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    requirements?: JsonNullValueInput | InputJsonValue;
    status?: StringFieldUpdateOperationsInput | string;
    solutions?: SbcSolutionUpdateManyWithoutChallengeNestedInput;
  };

  export type SbcChallengeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    challengeId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    requirements?: JsonNullValueInput | InputJsonValue;
    status?: StringFieldUpdateOperationsInput | string;
    solutions?: SbcSolutionUncheckedUpdateManyWithoutChallengeNestedInput;
  };

  export type SbcChallengeCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    challengeId: string;
    name: string;
    requirements: JsonNullValueInput | InputJsonValue;
    status?: string;
  };

  export type SbcChallengeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    challengeId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    requirements?: JsonNullValueInput | InputJsonValue;
    status?: StringFieldUpdateOperationsInput | string;
  };

  export type SbcChallengeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    challengeId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    requirements?: JsonNullValueInput | InputJsonValue;
    status?: StringFieldUpdateOperationsInput | string;
  };

  export type SbcSolutionCreateInput = {
    id?: string;
    createdAt?: Date | string;
    players: JsonNullValueInput | InputJsonValue;
    cost?: number | null;
    rating?: number | null;
    isValid?: boolean;
    challenge: SbcChallengeCreateNestedOneWithoutSolutionsInput;
  };

  export type SbcSolutionUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    challengeId: string;
    players: JsonNullValueInput | InputJsonValue;
    cost?: number | null;
    rating?: number | null;
    isValid?: boolean;
  };

  export type SbcSolutionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    players?: JsonNullValueInput | InputJsonValue;
    cost?: NullableFloatFieldUpdateOperationsInput | number | null;
    rating?: NullableIntFieldUpdateOperationsInput | number | null;
    isValid?: BoolFieldUpdateOperationsInput | boolean;
    challenge?: SbcChallengeUpdateOneRequiredWithoutSolutionsNestedInput;
  };

  export type SbcSolutionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    challengeId?: StringFieldUpdateOperationsInput | string;
    players?: JsonNullValueInput | InputJsonValue;
    cost?: NullableFloatFieldUpdateOperationsInput | number | null;
    rating?: NullableIntFieldUpdateOperationsInput | number | null;
    isValid?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type SbcSolutionCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    challengeId: string;
    players: JsonNullValueInput | InputJsonValue;
    cost?: number | null;
    rating?: number | null;
    isValid?: boolean;
  };

  export type SbcSolutionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    players?: JsonNullValueInput | InputJsonValue;
    cost?: NullableFloatFieldUpdateOperationsInput | number | null;
    rating?: NullableIntFieldUpdateOperationsInput | number | null;
    isValid?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type SbcSolutionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    challengeId?: StringFieldUpdateOperationsInput | string;
    players?: JsonNullValueInput | InputJsonValue;
    cost?: NullableFloatFieldUpdateOperationsInput | number | null;
    rating?: NullableIntFieldUpdateOperationsInput | number | null;
    isValid?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type CompanionAppStateCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    state: JsonNullValueInput | InputJsonValue;
    sessionId?: string | null;
  };

  export type CompanionAppStateUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    state: JsonNullValueInput | InputJsonValue;
    sessionId?: string | null;
  };

  export type CompanionAppStateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    state?: JsonNullValueInput | InputJsonValue;
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type CompanionAppStateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    state?: JsonNullValueInput | InputJsonValue;
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type CompanionAppStateCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    state: JsonNullValueInput | InputJsonValue;
    sessionId?: string | null;
  };

  export type CompanionAppStateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    state?: JsonNullValueInput | InputJsonValue;
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type CompanionAppStateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    state?: JsonNullValueInput | InputJsonValue;
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null;
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

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type UserSessionCountOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    sessionId?: SortOrder;
    data?: SortOrder;
  };

  export type UserSessionMaxOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    sessionId?: SortOrder;
  };

  export type UserSessionMinOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    sessionId?: SortOrder;
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedJsonNullableFilter<$PrismaModel>;
    _max?: NestedJsonNullableFilter<$PrismaModel>;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type SbcSolutionListRelationFilter = {
    every?: SbcSolutionWhereInput;
    some?: SbcSolutionWhereInput;
    none?: SbcSolutionWhereInput;
  };

  export type SbcSolutionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type SbcChallengeCountOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    challengeId?: SortOrder;
    name?: SortOrder;
    requirements?: SortOrder;
    status?: SortOrder;
  };

  export type SbcChallengeMaxOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    challengeId?: SortOrder;
    name?: SortOrder;
    status?: SortOrder;
  };

  export type SbcChallengeMinOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    challengeId?: SortOrder;
    name?: SortOrder;
    status?: SortOrder;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type SbcChallengeRelationFilter = {
    is?: SbcChallengeWhereInput;
    isNot?: SbcChallengeWhereInput;
  };

  export type SbcSolutionCountOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    challengeId?: SortOrder;
    players?: SortOrder;
    cost?: SortOrder;
    rating?: SortOrder;
    isValid?: SortOrder;
  };

  export type SbcSolutionAvgOrderByAggregateInput = {
    cost?: SortOrder;
    rating?: SortOrder;
  };

  export type SbcSolutionMaxOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    challengeId?: SortOrder;
    cost?: SortOrder;
    rating?: SortOrder;
    isValid?: SortOrder;
  };

  export type SbcSolutionMinOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    challengeId?: SortOrder;
    cost?: SortOrder;
    rating?: SortOrder;
    isValid?: SortOrder;
  };

  export type SbcSolutionSumOrderByAggregateInput = {
    cost?: SortOrder;
    rating?: SortOrder;
  };

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedFloatNullableFilter<$PrismaModel>;
    _min?: NestedFloatNullableFilter<$PrismaModel>;
    _max?: NestedFloatNullableFilter<$PrismaModel>;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type CompanionAppStateCountOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    state?: SortOrder;
    sessionId?: SortOrder;
  };

  export type CompanionAppStateMaxOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    sessionId?: SortOrder;
  };

  export type CompanionAppStateMinOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    sessionId?: SortOrder;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type SbcSolutionCreateNestedManyWithoutChallengeInput = {
    create?:
      | XOR<SbcSolutionCreateWithoutChallengeInput, SbcSolutionUncheckedCreateWithoutChallengeInput>
      | SbcSolutionCreateWithoutChallengeInput[]
      | SbcSolutionUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?:
      | SbcSolutionCreateOrConnectWithoutChallengeInput
      | SbcSolutionCreateOrConnectWithoutChallengeInput[];
    createMany?: SbcSolutionCreateManyChallengeInputEnvelope;
    connect?: SbcSolutionWhereUniqueInput | SbcSolutionWhereUniqueInput[];
  };

  export type SbcSolutionUncheckedCreateNestedManyWithoutChallengeInput = {
    create?:
      | XOR<SbcSolutionCreateWithoutChallengeInput, SbcSolutionUncheckedCreateWithoutChallengeInput>
      | SbcSolutionCreateWithoutChallengeInput[]
      | SbcSolutionUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?:
      | SbcSolutionCreateOrConnectWithoutChallengeInput
      | SbcSolutionCreateOrConnectWithoutChallengeInput[];
    createMany?: SbcSolutionCreateManyChallengeInputEnvelope;
    connect?: SbcSolutionWhereUniqueInput | SbcSolutionWhereUniqueInput[];
  };

  export type SbcSolutionUpdateManyWithoutChallengeNestedInput = {
    create?:
      | XOR<SbcSolutionCreateWithoutChallengeInput, SbcSolutionUncheckedCreateWithoutChallengeInput>
      | SbcSolutionCreateWithoutChallengeInput[]
      | SbcSolutionUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?:
      | SbcSolutionCreateOrConnectWithoutChallengeInput
      | SbcSolutionCreateOrConnectWithoutChallengeInput[];
    upsert?:
      | SbcSolutionUpsertWithWhereUniqueWithoutChallengeInput
      | SbcSolutionUpsertWithWhereUniqueWithoutChallengeInput[];
    createMany?: SbcSolutionCreateManyChallengeInputEnvelope;
    set?: SbcSolutionWhereUniqueInput | SbcSolutionWhereUniqueInput[];
    disconnect?: SbcSolutionWhereUniqueInput | SbcSolutionWhereUniqueInput[];
    delete?: SbcSolutionWhereUniqueInput | SbcSolutionWhereUniqueInput[];
    connect?: SbcSolutionWhereUniqueInput | SbcSolutionWhereUniqueInput[];
    update?:
      | SbcSolutionUpdateWithWhereUniqueWithoutChallengeInput
      | SbcSolutionUpdateWithWhereUniqueWithoutChallengeInput[];
    updateMany?:
      | SbcSolutionUpdateManyWithWhereWithoutChallengeInput
      | SbcSolutionUpdateManyWithWhereWithoutChallengeInput[];
    deleteMany?: SbcSolutionScalarWhereInput | SbcSolutionScalarWhereInput[];
  };

  export type SbcSolutionUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?:
      | XOR<SbcSolutionCreateWithoutChallengeInput, SbcSolutionUncheckedCreateWithoutChallengeInput>
      | SbcSolutionCreateWithoutChallengeInput[]
      | SbcSolutionUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?:
      | SbcSolutionCreateOrConnectWithoutChallengeInput
      | SbcSolutionCreateOrConnectWithoutChallengeInput[];
    upsert?:
      | SbcSolutionUpsertWithWhereUniqueWithoutChallengeInput
      | SbcSolutionUpsertWithWhereUniqueWithoutChallengeInput[];
    createMany?: SbcSolutionCreateManyChallengeInputEnvelope;
    set?: SbcSolutionWhereUniqueInput | SbcSolutionWhereUniqueInput[];
    disconnect?: SbcSolutionWhereUniqueInput | SbcSolutionWhereUniqueInput[];
    delete?: SbcSolutionWhereUniqueInput | SbcSolutionWhereUniqueInput[];
    connect?: SbcSolutionWhereUniqueInput | SbcSolutionWhereUniqueInput[];
    update?:
      | SbcSolutionUpdateWithWhereUniqueWithoutChallengeInput
      | SbcSolutionUpdateWithWhereUniqueWithoutChallengeInput[];
    updateMany?:
      | SbcSolutionUpdateManyWithWhereWithoutChallengeInput
      | SbcSolutionUpdateManyWithWhereWithoutChallengeInput[];
    deleteMany?: SbcSolutionScalarWhereInput | SbcSolutionScalarWhereInput[];
  };

  export type SbcChallengeCreateNestedOneWithoutSolutionsInput = {
    create?: XOR<
      SbcChallengeCreateWithoutSolutionsInput,
      SbcChallengeUncheckedCreateWithoutSolutionsInput
    >;
    connectOrCreate?: SbcChallengeCreateOrConnectWithoutSolutionsInput;
    connect?: SbcChallengeWhereUniqueInput;
  };

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type SbcChallengeUpdateOneRequiredWithoutSolutionsNestedInput = {
    create?: XOR<
      SbcChallengeCreateWithoutSolutionsInput,
      SbcChallengeUncheckedCreateWithoutSolutionsInput
    >;
    connectOrCreate?: SbcChallengeCreateOrConnectWithoutSolutionsInput;
    upsert?: SbcChallengeUpsertWithoutSolutionsInput;
    connect?: SbcChallengeWhereUniqueInput;
    update?: XOR<
      XOR<
        SbcChallengeUpdateToOneWithWhereWithoutSolutionsInput,
        SbcChallengeUpdateWithoutSolutionsInput
      >,
      SbcChallengeUncheckedUpdateWithoutSolutionsInput
    >;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
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

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedFloatNullableFilter<$PrismaModel>;
    _min?: NestedFloatNullableFilter<$PrismaModel>;
    _max?: NestedFloatNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type SbcSolutionCreateWithoutChallengeInput = {
    id?: string;
    createdAt?: Date | string;
    players: JsonNullValueInput | InputJsonValue;
    cost?: number | null;
    rating?: number | null;
    isValid?: boolean;
  };

  export type SbcSolutionUncheckedCreateWithoutChallengeInput = {
    id?: string;
    createdAt?: Date | string;
    players: JsonNullValueInput | InputJsonValue;
    cost?: number | null;
    rating?: number | null;
    isValid?: boolean;
  };

  export type SbcSolutionCreateOrConnectWithoutChallengeInput = {
    where: SbcSolutionWhereUniqueInput;
    create: XOR<
      SbcSolutionCreateWithoutChallengeInput,
      SbcSolutionUncheckedCreateWithoutChallengeInput
    >;
  };

  export type SbcSolutionCreateManyChallengeInputEnvelope = {
    data: SbcSolutionCreateManyChallengeInput | SbcSolutionCreateManyChallengeInput[];
    skipDuplicates?: boolean;
  };

  export type SbcSolutionUpsertWithWhereUniqueWithoutChallengeInput = {
    where: SbcSolutionWhereUniqueInput;
    update: XOR<
      SbcSolutionUpdateWithoutChallengeInput,
      SbcSolutionUncheckedUpdateWithoutChallengeInput
    >;
    create: XOR<
      SbcSolutionCreateWithoutChallengeInput,
      SbcSolutionUncheckedCreateWithoutChallengeInput
    >;
  };

  export type SbcSolutionUpdateWithWhereUniqueWithoutChallengeInput = {
    where: SbcSolutionWhereUniqueInput;
    data: XOR<
      SbcSolutionUpdateWithoutChallengeInput,
      SbcSolutionUncheckedUpdateWithoutChallengeInput
    >;
  };

  export type SbcSolutionUpdateManyWithWhereWithoutChallengeInput = {
    where: SbcSolutionScalarWhereInput;
    data: XOR<
      SbcSolutionUpdateManyMutationInput,
      SbcSolutionUncheckedUpdateManyWithoutChallengeInput
    >;
  };

  export type SbcSolutionScalarWhereInput = {
    AND?: SbcSolutionScalarWhereInput | SbcSolutionScalarWhereInput[];
    OR?: SbcSolutionScalarWhereInput[];
    NOT?: SbcSolutionScalarWhereInput | SbcSolutionScalarWhereInput[];
    id?: StringFilter<'SbcSolution'> | string;
    createdAt?: DateTimeFilter<'SbcSolution'> | Date | string;
    challengeId?: StringFilter<'SbcSolution'> | string;
    players?: JsonFilter<'SbcSolution'>;
    cost?: FloatNullableFilter<'SbcSolution'> | number | null;
    rating?: IntNullableFilter<'SbcSolution'> | number | null;
    isValid?: BoolFilter<'SbcSolution'> | boolean;
  };

  export type SbcChallengeCreateWithoutSolutionsInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    challengeId: string;
    name: string;
    requirements: JsonNullValueInput | InputJsonValue;
    status?: string;
  };

  export type SbcChallengeUncheckedCreateWithoutSolutionsInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    challengeId: string;
    name: string;
    requirements: JsonNullValueInput | InputJsonValue;
    status?: string;
  };

  export type SbcChallengeCreateOrConnectWithoutSolutionsInput = {
    where: SbcChallengeWhereUniqueInput;
    create: XOR<
      SbcChallengeCreateWithoutSolutionsInput,
      SbcChallengeUncheckedCreateWithoutSolutionsInput
    >;
  };

  export type SbcChallengeUpsertWithoutSolutionsInput = {
    update: XOR<
      SbcChallengeUpdateWithoutSolutionsInput,
      SbcChallengeUncheckedUpdateWithoutSolutionsInput
    >;
    create: XOR<
      SbcChallengeCreateWithoutSolutionsInput,
      SbcChallengeUncheckedCreateWithoutSolutionsInput
    >;
    where?: SbcChallengeWhereInput;
  };

  export type SbcChallengeUpdateToOneWithWhereWithoutSolutionsInput = {
    where?: SbcChallengeWhereInput;
    data: XOR<
      SbcChallengeUpdateWithoutSolutionsInput,
      SbcChallengeUncheckedUpdateWithoutSolutionsInput
    >;
  };

  export type SbcChallengeUpdateWithoutSolutionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    challengeId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    requirements?: JsonNullValueInput | InputJsonValue;
    status?: StringFieldUpdateOperationsInput | string;
  };

  export type SbcChallengeUncheckedUpdateWithoutSolutionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    challengeId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    requirements?: JsonNullValueInput | InputJsonValue;
    status?: StringFieldUpdateOperationsInput | string;
  };

  export type SbcSolutionCreateManyChallengeInput = {
    id?: string;
    createdAt?: Date | string;
    players: JsonNullValueInput | InputJsonValue;
    cost?: number | null;
    rating?: number | null;
    isValid?: boolean;
  };

  export type SbcSolutionUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    players?: JsonNullValueInput | InputJsonValue;
    cost?: NullableFloatFieldUpdateOperationsInput | number | null;
    rating?: NullableIntFieldUpdateOperationsInput | number | null;
    isValid?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type SbcSolutionUncheckedUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    players?: JsonNullValueInput | InputJsonValue;
    cost?: NullableFloatFieldUpdateOperationsInput | number | null;
    rating?: NullableIntFieldUpdateOperationsInput | number | null;
    isValid?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type SbcSolutionUncheckedUpdateManyWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    players?: JsonNullValueInput | InputJsonValue;
    cost?: NullableFloatFieldUpdateOperationsInput | number | null;
    rating?: NullableIntFieldUpdateOperationsInput | number | null;
    isValid?: BoolFieldUpdateOperationsInput | boolean;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use SbcChallengeCountOutputTypeDefaultArgs instead
   */
  export type SbcChallengeCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = SbcChallengeCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use UserSessionDefaultArgs instead
   */
  export type UserSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    UserSessionDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use SbcChallengeDefaultArgs instead
   */
  export type SbcChallengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    SbcChallengeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use SbcSolutionDefaultArgs instead
   */
  export type SbcSolutionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    SbcSolutionDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use CompanionAppStateDefaultArgs instead
   */
  export type CompanionAppStateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = CompanionAppStateDefaultArgs<ExtArgs>;

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
