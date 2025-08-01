
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Exercise
 * 
 */
export type Exercise = $Result.DefaultSelection<Prisma.$ExercisePayload>
/**
 * Model CoreSet
 * 
 */
export type CoreSet = $Result.DefaultSelection<Prisma.$CoreSetPayload>
/**
 * Model CoreCardioSet
 * 
 */
export type CoreCardioSet = $Result.DefaultSelection<Prisma.$CoreCardioSetPayload>
/**
 * Model CoreSetReps
 * 
 */
export type CoreSetReps = $Result.DefaultSelection<Prisma.$CoreSetRepsPayload>
/**
 * Model CoreSetWeight
 * 
 */
export type CoreSetWeight = $Result.DefaultSelection<Prisma.$CoreSetWeightPayload>
/**
 * Model UserSet
 * 
 */
export type UserSet = $Result.DefaultSelection<Prisma.$UserSetPayload>
/**
 * Model Program
 * 
 */
export type Program = $Result.DefaultSelection<Prisma.$ProgramPayload>
/**
 * Model ProgramWorkout
 * 
 */
export type ProgramWorkout = $Result.DefaultSelection<Prisma.$ProgramWorkoutPayload>
/**
 * Model Workout
 * 
 */
export type Workout = $Result.DefaultSelection<Prisma.$WorkoutPayload>
/**
 * Model WorkoutExercise
 * 
 */
export type WorkoutExercise = $Result.DefaultSelection<Prisma.$WorkoutExercisePayload>
/**
 * Model UserWorkoutExercise
 * 
 */
export type UserWorkoutExercise = $Result.DefaultSelection<Prisma.$UserWorkoutExercisePayload>
/**
 * Model UserWorkout
 * 
 */
export type UserWorkout = $Result.DefaultSelection<Prisma.$UserWorkoutPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MuscleGroup: {
  CHEST: 'CHEST',
  SHOULDERS: 'SHOULDERS',
  BACK: 'BACK',
  ARMS: 'ARMS',
  CORE: 'CORE',
  LEGS: 'LEGS',
  STABILIZERS: 'STABILIZERS'
};

export type MuscleGroup = (typeof MuscleGroup)[keyof typeof MuscleGroup]


export const ExerciseMuscle: {
  chest: 'chest',
  front_delts: 'front_delts',
  side_delts: 'side_delts',
  rear_delts: 'rear_delts',
  lats: 'lats',
  traps: 'traps',
  rhomboids: 'rhomboids',
  lower_back: 'lower_back',
  biceps: 'biceps',
  triceps: 'triceps',
  forearms: 'forearms',
  abs: 'abs',
  obliques: 'obliques',
  quads: 'quads',
  hamstrings: 'hamstrings',
  glutes: 'glutes',
  calves: 'calves',
  hip_flexors: 'hip_flexors',
  adductors: 'adductors',
  abductors: 'abductors',
  rotator_cuff: 'rotator_cuff',
  serratus_anterior: 'serratus_anterior'
};

export type ExerciseMuscle = (typeof ExerciseMuscle)[keyof typeof ExerciseMuscle]


export const ExerciseEquipment: {
  barbell: 'barbell',
  dumbbell: 'dumbbell',
  kettlebell: 'kettlebell',
  weight_plates: 'weight_plates',
  ez_curl_bar: 'ez_curl_bar',
  olympic_bar: 'olympic_bar',
  trap_bar: 'trap_bar',
  medicine_ball: 'medicine_ball',
  flat_bench: 'flat_bench',
  incline_bench: 'incline_bench',
  decline_bench: 'decline_bench',
  adjustable_bench: 'adjustable_bench',
  power_rack: 'power_rack',
  squat_rack: 'squat_rack',
  smith_machine: 'smith_machine',
  preacher_bench: 'preacher_bench',
  cable_machine: 'cable_machine',
  cable_crossover: 'cable_crossover',
  lat_pulldown: 'lat_pulldown',
  low_row: 'low_row',
  cable_column: 'cable_column',
  functional_trainer: 'functional_trainer',
  treadmill: 'treadmill',
  elliptical: 'elliptical',
  stationary_bike: 'stationary_bike',
  rowing_machine: 'rowing_machine',
  stair_climber: 'stair_climber',
  stepper: 'stepper',
  spin_bike: 'spin_bike',
  air_bike: 'air_bike',
  leg_press: 'leg_press',
  hack_squat: 'hack_squat',
  leg_curl: 'leg_curl',
  leg_extension: 'leg_extension',
  calf_raise_machine: 'calf_raise_machine',
  chest_press_machine: 'chest_press_machine',
  shoulder_press_machine: 'shoulder_press_machine',
  pec_deck: 'pec_deck',
  hip_abduction_machine: 'hip_abduction_machine',
  hip_adduction_machine: 'hip_adduction_machine',
  pull_up_bar: 'pull_up_bar',
  dip_station: 'dip_station',
  assisted_pull_up_machine: 'assisted_pull_up_machine',
  captains_chair: 'captains_chair',
  trx_straps: 'trx_straps',
  resistance_bands: 'resistance_bands',
  battle_ropes: 'battle_ropes',
  suspension_trainer: 'suspension_trainer',
  stability_ball: 'stability_ball',
  foam_roller: 'foam_roller',
  yoga_mat: 'yoga_mat',
  gymnastics_rings: 'gymnastics_rings',
  plyometric_box: 'plyometric_box',
  agility_ladder: 'agility_ladder',
  speed_rope: 'speed_rope',
  weight_belt: 'weight_belt',
  lifting_straps: 'lifting_straps',
  chalk: 'chalk',
  gloves: 'gloves',
  wrist_wraps: 'wrist_wraps',
  knee_sleeves: 'knee_sleeves'
};

export type ExerciseEquipment = (typeof ExerciseEquipment)[keyof typeof ExerciseEquipment]


export const ExerciseType: {
  strength: 'strength',
  cardio: 'cardio',
  flexibility: 'flexibility',
  miscellaneous: 'miscellaneous'
};

export type ExerciseType = (typeof ExerciseType)[keyof typeof ExerciseType]


export const DaysOfWeek: {
  monday: 'monday',
  tuesday: 'tuesday',
  wednesday: 'wednesday',
  thursday: 'thursday',
  friday: 'friday',
  saturday: 'saturday',
  sunday: 'sunday'
};

export type DaysOfWeek = (typeof DaysOfWeek)[keyof typeof DaysOfWeek]

}

export type MuscleGroup = $Enums.MuscleGroup

export const MuscleGroup: typeof $Enums.MuscleGroup

export type ExerciseMuscle = $Enums.ExerciseMuscle

export const ExerciseMuscle: typeof $Enums.ExerciseMuscle

export type ExerciseEquipment = $Enums.ExerciseEquipment

export const ExerciseEquipment: typeof $Enums.ExerciseEquipment

export type ExerciseType = $Enums.ExerciseType

export const ExerciseType: typeof $Enums.ExerciseType

export type DaysOfWeek = $Enums.DaysOfWeek

export const DaysOfWeek: typeof $Enums.DaysOfWeek

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exercise`: Exposes CRUD operations for the **Exercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exercises
    * const exercises = await prisma.exercise.findMany()
    * ```
    */
  get exercise(): Prisma.ExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.coreSet`: Exposes CRUD operations for the **CoreSet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CoreSets
    * const coreSets = await prisma.coreSet.findMany()
    * ```
    */
  get coreSet(): Prisma.CoreSetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.coreCardioSet`: Exposes CRUD operations for the **CoreCardioSet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CoreCardioSets
    * const coreCardioSets = await prisma.coreCardioSet.findMany()
    * ```
    */
  get coreCardioSet(): Prisma.CoreCardioSetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.coreSetReps`: Exposes CRUD operations for the **CoreSetReps** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CoreSetReps
    * const coreSetReps = await prisma.coreSetReps.findMany()
    * ```
    */
  get coreSetReps(): Prisma.CoreSetRepsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.coreSetWeight`: Exposes CRUD operations for the **CoreSetWeight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CoreSetWeights
    * const coreSetWeights = await prisma.coreSetWeight.findMany()
    * ```
    */
  get coreSetWeight(): Prisma.CoreSetWeightDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSet`: Exposes CRUD operations for the **UserSet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSets
    * const userSets = await prisma.userSet.findMany()
    * ```
    */
  get userSet(): Prisma.UserSetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.program`: Exposes CRUD operations for the **Program** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Programs
    * const programs = await prisma.program.findMany()
    * ```
    */
  get program(): Prisma.ProgramDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.programWorkout`: Exposes CRUD operations for the **ProgramWorkout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProgramWorkouts
    * const programWorkouts = await prisma.programWorkout.findMany()
    * ```
    */
  get programWorkout(): Prisma.ProgramWorkoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workout`: Exposes CRUD operations for the **Workout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workouts
    * const workouts = await prisma.workout.findMany()
    * ```
    */
  get workout(): Prisma.WorkoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workoutExercise`: Exposes CRUD operations for the **WorkoutExercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkoutExercises
    * const workoutExercises = await prisma.workoutExercise.findMany()
    * ```
    */
  get workoutExercise(): Prisma.WorkoutExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userWorkoutExercise`: Exposes CRUD operations for the **UserWorkoutExercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserWorkoutExercises
    * const userWorkoutExercises = await prisma.userWorkoutExercise.findMany()
    * ```
    */
  get userWorkoutExercise(): Prisma.UserWorkoutExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userWorkout`: Exposes CRUD operations for the **UserWorkout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserWorkouts
    * const userWorkouts = await prisma.userWorkout.findMany()
    * ```
    */
  get userWorkout(): Prisma.UserWorkoutDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Exercise: 'Exercise',
    CoreSet: 'CoreSet',
    CoreCardioSet: 'CoreCardioSet',
    CoreSetReps: 'CoreSetReps',
    CoreSetWeight: 'CoreSetWeight',
    UserSet: 'UserSet',
    Program: 'Program',
    ProgramWorkout: 'ProgramWorkout',
    Workout: 'Workout',
    WorkoutExercise: 'WorkoutExercise',
    UserWorkoutExercise: 'UserWorkoutExercise',
    UserWorkout: 'UserWorkout'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "exercise" | "coreSet" | "coreCardioSet" | "coreSetReps" | "coreSetWeight" | "userSet" | "program" | "programWorkout" | "workout" | "workoutExercise" | "userWorkoutExercise" | "userWorkout"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Exercise: {
        payload: Prisma.$ExercisePayload<ExtArgs>
        fields: Prisma.ExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findFirst: {
            args: Prisma.ExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findMany: {
            args: Prisma.ExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          create: {
            args: Prisma.ExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          createMany: {
            args: Prisma.ExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExerciseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          delete: {
            args: Prisma.ExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          update: {
            args: Prisma.ExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          deleteMany: {
            args: Prisma.ExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExerciseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          upsert: {
            args: Prisma.ExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          aggregate: {
            args: Prisma.ExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExercise>
          }
          groupBy: {
            args: Prisma.ExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciseCountAggregateOutputType> | number
          }
        }
      }
      CoreSet: {
        payload: Prisma.$CoreSetPayload<ExtArgs>
        fields: Prisma.CoreSetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CoreSetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CoreSetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload>
          }
          findFirst: {
            args: Prisma.CoreSetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CoreSetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload>
          }
          findMany: {
            args: Prisma.CoreSetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload>[]
          }
          create: {
            args: Prisma.CoreSetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload>
          }
          createMany: {
            args: Prisma.CoreSetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CoreSetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload>[]
          }
          delete: {
            args: Prisma.CoreSetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload>
          }
          update: {
            args: Prisma.CoreSetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload>
          }
          deleteMany: {
            args: Prisma.CoreSetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CoreSetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CoreSetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload>[]
          }
          upsert: {
            args: Prisma.CoreSetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetPayload>
          }
          aggregate: {
            args: Prisma.CoreSetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoreSet>
          }
          groupBy: {
            args: Prisma.CoreSetGroupByArgs<ExtArgs>
            result: $Utils.Optional<CoreSetGroupByOutputType>[]
          }
          count: {
            args: Prisma.CoreSetCountArgs<ExtArgs>
            result: $Utils.Optional<CoreSetCountAggregateOutputType> | number
          }
        }
      }
      CoreCardioSet: {
        payload: Prisma.$CoreCardioSetPayload<ExtArgs>
        fields: Prisma.CoreCardioSetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CoreCardioSetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CoreCardioSetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload>
          }
          findFirst: {
            args: Prisma.CoreCardioSetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CoreCardioSetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload>
          }
          findMany: {
            args: Prisma.CoreCardioSetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload>[]
          }
          create: {
            args: Prisma.CoreCardioSetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload>
          }
          createMany: {
            args: Prisma.CoreCardioSetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CoreCardioSetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload>[]
          }
          delete: {
            args: Prisma.CoreCardioSetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload>
          }
          update: {
            args: Prisma.CoreCardioSetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload>
          }
          deleteMany: {
            args: Prisma.CoreCardioSetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CoreCardioSetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CoreCardioSetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload>[]
          }
          upsert: {
            args: Prisma.CoreCardioSetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreCardioSetPayload>
          }
          aggregate: {
            args: Prisma.CoreCardioSetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoreCardioSet>
          }
          groupBy: {
            args: Prisma.CoreCardioSetGroupByArgs<ExtArgs>
            result: $Utils.Optional<CoreCardioSetGroupByOutputType>[]
          }
          count: {
            args: Prisma.CoreCardioSetCountArgs<ExtArgs>
            result: $Utils.Optional<CoreCardioSetCountAggregateOutputType> | number
          }
        }
      }
      CoreSetReps: {
        payload: Prisma.$CoreSetRepsPayload<ExtArgs>
        fields: Prisma.CoreSetRepsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CoreSetRepsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CoreSetRepsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload>
          }
          findFirst: {
            args: Prisma.CoreSetRepsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CoreSetRepsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload>
          }
          findMany: {
            args: Prisma.CoreSetRepsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload>[]
          }
          create: {
            args: Prisma.CoreSetRepsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload>
          }
          createMany: {
            args: Prisma.CoreSetRepsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CoreSetRepsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload>[]
          }
          delete: {
            args: Prisma.CoreSetRepsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload>
          }
          update: {
            args: Prisma.CoreSetRepsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload>
          }
          deleteMany: {
            args: Prisma.CoreSetRepsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CoreSetRepsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CoreSetRepsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload>[]
          }
          upsert: {
            args: Prisma.CoreSetRepsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetRepsPayload>
          }
          aggregate: {
            args: Prisma.CoreSetRepsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoreSetReps>
          }
          groupBy: {
            args: Prisma.CoreSetRepsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CoreSetRepsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CoreSetRepsCountArgs<ExtArgs>
            result: $Utils.Optional<CoreSetRepsCountAggregateOutputType> | number
          }
        }
      }
      CoreSetWeight: {
        payload: Prisma.$CoreSetWeightPayload<ExtArgs>
        fields: Prisma.CoreSetWeightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CoreSetWeightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CoreSetWeightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload>
          }
          findFirst: {
            args: Prisma.CoreSetWeightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CoreSetWeightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload>
          }
          findMany: {
            args: Prisma.CoreSetWeightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload>[]
          }
          create: {
            args: Prisma.CoreSetWeightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload>
          }
          createMany: {
            args: Prisma.CoreSetWeightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CoreSetWeightCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload>[]
          }
          delete: {
            args: Prisma.CoreSetWeightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload>
          }
          update: {
            args: Prisma.CoreSetWeightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload>
          }
          deleteMany: {
            args: Prisma.CoreSetWeightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CoreSetWeightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CoreSetWeightUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload>[]
          }
          upsert: {
            args: Prisma.CoreSetWeightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoreSetWeightPayload>
          }
          aggregate: {
            args: Prisma.CoreSetWeightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoreSetWeight>
          }
          groupBy: {
            args: Prisma.CoreSetWeightGroupByArgs<ExtArgs>
            result: $Utils.Optional<CoreSetWeightGroupByOutputType>[]
          }
          count: {
            args: Prisma.CoreSetWeightCountArgs<ExtArgs>
            result: $Utils.Optional<CoreSetWeightCountAggregateOutputType> | number
          }
        }
      }
      UserSet: {
        payload: Prisma.$UserSetPayload<ExtArgs>
        fields: Prisma.UserSetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload>
          }
          findFirst: {
            args: Prisma.UserSetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload>
          }
          findMany: {
            args: Prisma.UserSetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload>[]
          }
          create: {
            args: Prisma.UserSetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload>
          }
          createMany: {
            args: Prisma.UserSetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload>[]
          }
          delete: {
            args: Prisma.UserSetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload>
          }
          update: {
            args: Prisma.UserSetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload>
          }
          deleteMany: {
            args: Prisma.UserSetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload>[]
          }
          upsert: {
            args: Prisma.UserSetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSetPayload>
          }
          aggregate: {
            args: Prisma.UserSetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSet>
          }
          groupBy: {
            args: Prisma.UserSetGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSetGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSetCountArgs<ExtArgs>
            result: $Utils.Optional<UserSetCountAggregateOutputType> | number
          }
        }
      }
      Program: {
        payload: Prisma.$ProgramPayload<ExtArgs>
        fields: Prisma.ProgramFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgramFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgramFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findFirst: {
            args: Prisma.ProgramFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgramFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findMany: {
            args: Prisma.ProgramFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          create: {
            args: Prisma.ProgramCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          createMany: {
            args: Prisma.ProgramCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgramCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          delete: {
            args: Prisma.ProgramDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          update: {
            args: Prisma.ProgramUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          deleteMany: {
            args: Prisma.ProgramDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgramUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgramUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          upsert: {
            args: Prisma.ProgramUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          aggregate: {
            args: Prisma.ProgramAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgram>
          }
          groupBy: {
            args: Prisma.ProgramGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgramGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgramCountArgs<ExtArgs>
            result: $Utils.Optional<ProgramCountAggregateOutputType> | number
          }
        }
      }
      ProgramWorkout: {
        payload: Prisma.$ProgramWorkoutPayload<ExtArgs>
        fields: Prisma.ProgramWorkoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgramWorkoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgramWorkoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload>
          }
          findFirst: {
            args: Prisma.ProgramWorkoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgramWorkoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload>
          }
          findMany: {
            args: Prisma.ProgramWorkoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload>[]
          }
          create: {
            args: Prisma.ProgramWorkoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload>
          }
          createMany: {
            args: Prisma.ProgramWorkoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgramWorkoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload>[]
          }
          delete: {
            args: Prisma.ProgramWorkoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload>
          }
          update: {
            args: Prisma.ProgramWorkoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload>
          }
          deleteMany: {
            args: Prisma.ProgramWorkoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgramWorkoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgramWorkoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload>[]
          }
          upsert: {
            args: Prisma.ProgramWorkoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramWorkoutPayload>
          }
          aggregate: {
            args: Prisma.ProgramWorkoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgramWorkout>
          }
          groupBy: {
            args: Prisma.ProgramWorkoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgramWorkoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgramWorkoutCountArgs<ExtArgs>
            result: $Utils.Optional<ProgramWorkoutCountAggregateOutputType> | number
          }
        }
      }
      Workout: {
        payload: Prisma.$WorkoutPayload<ExtArgs>
        fields: Prisma.WorkoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          findFirst: {
            args: Prisma.WorkoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          findMany: {
            args: Prisma.WorkoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>[]
          }
          create: {
            args: Prisma.WorkoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          createMany: {
            args: Prisma.WorkoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>[]
          }
          delete: {
            args: Prisma.WorkoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          update: {
            args: Prisma.WorkoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          deleteMany: {
            args: Prisma.WorkoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>[]
          }
          upsert: {
            args: Prisma.WorkoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>
          }
          aggregate: {
            args: Prisma.WorkoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkout>
          }
          groupBy: {
            args: Prisma.WorkoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkoutCountArgs<ExtArgs>
            result: $Utils.Optional<WorkoutCountAggregateOutputType> | number
          }
        }
      }
      WorkoutExercise: {
        payload: Prisma.$WorkoutExercisePayload<ExtArgs>
        fields: Prisma.WorkoutExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkoutExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkoutExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>
          }
          findFirst: {
            args: Prisma.WorkoutExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkoutExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>
          }
          findMany: {
            args: Prisma.WorkoutExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>[]
          }
          create: {
            args: Prisma.WorkoutExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>
          }
          createMany: {
            args: Prisma.WorkoutExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkoutExerciseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>[]
          }
          delete: {
            args: Prisma.WorkoutExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>
          }
          update: {
            args: Prisma.WorkoutExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>
          }
          deleteMany: {
            args: Prisma.WorkoutExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkoutExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkoutExerciseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>[]
          }
          upsert: {
            args: Prisma.WorkoutExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>
          }
          aggregate: {
            args: Prisma.WorkoutExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkoutExercise>
          }
          groupBy: {
            args: Prisma.WorkoutExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkoutExerciseGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkoutExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<WorkoutExerciseCountAggregateOutputType> | number
          }
        }
      }
      UserWorkoutExercise: {
        payload: Prisma.$UserWorkoutExercisePayload<ExtArgs>
        fields: Prisma.UserWorkoutExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserWorkoutExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserWorkoutExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload>
          }
          findFirst: {
            args: Prisma.UserWorkoutExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserWorkoutExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload>
          }
          findMany: {
            args: Prisma.UserWorkoutExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload>[]
          }
          create: {
            args: Prisma.UserWorkoutExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload>
          }
          createMany: {
            args: Prisma.UserWorkoutExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserWorkoutExerciseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload>[]
          }
          delete: {
            args: Prisma.UserWorkoutExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload>
          }
          update: {
            args: Prisma.UserWorkoutExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload>
          }
          deleteMany: {
            args: Prisma.UserWorkoutExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserWorkoutExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserWorkoutExerciseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload>[]
          }
          upsert: {
            args: Prisma.UserWorkoutExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutExercisePayload>
          }
          aggregate: {
            args: Prisma.UserWorkoutExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserWorkoutExercise>
          }
          groupBy: {
            args: Prisma.UserWorkoutExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserWorkoutExerciseGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserWorkoutExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<UserWorkoutExerciseCountAggregateOutputType> | number
          }
        }
      }
      UserWorkout: {
        payload: Prisma.$UserWorkoutPayload<ExtArgs>
        fields: Prisma.UserWorkoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserWorkoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserWorkoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload>
          }
          findFirst: {
            args: Prisma.UserWorkoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserWorkoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload>
          }
          findMany: {
            args: Prisma.UserWorkoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload>[]
          }
          create: {
            args: Prisma.UserWorkoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload>
          }
          createMany: {
            args: Prisma.UserWorkoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserWorkoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload>[]
          }
          delete: {
            args: Prisma.UserWorkoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload>
          }
          update: {
            args: Prisma.UserWorkoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload>
          }
          deleteMany: {
            args: Prisma.UserWorkoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserWorkoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserWorkoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload>[]
          }
          upsert: {
            args: Prisma.UserWorkoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWorkoutPayload>
          }
          aggregate: {
            args: Prisma.UserWorkoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserWorkout>
          }
          groupBy: {
            args: Prisma.UserWorkoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserWorkoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserWorkoutCountArgs<ExtArgs>
            result: $Utils.Optional<UserWorkoutCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    exercise?: ExerciseOmit
    coreSet?: CoreSetOmit
    coreCardioSet?: CoreCardioSetOmit
    coreSetReps?: CoreSetRepsOmit
    coreSetWeight?: CoreSetWeightOmit
    userSet?: UserSetOmit
    program?: ProgramOmit
    programWorkout?: ProgramWorkoutOmit
    workout?: WorkoutOmit
    workoutExercise?: WorkoutExerciseOmit
    userWorkoutExercise?: UserWorkoutExerciseOmit
    userWorkout?: UserWorkoutOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
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
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    programs: number
    userSets: number
    workouts: number
    userWorkout: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    programs?: boolean | UserCountOutputTypeCountProgramsArgs
    userSets?: boolean | UserCountOutputTypeCountUserSetsArgs
    workouts?: boolean | UserCountOutputTypeCountWorkoutsArgs
    userWorkout?: boolean | UserCountOutputTypeCountUserWorkoutArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProgramsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserSetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserWorkoutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWorkoutWhereInput
  }


  /**
   * Count Type ExerciseCountOutputType
   */

  export type ExerciseCountOutputType = {
    workoutExercises: number
  }

  export type ExerciseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutExercises?: boolean | ExerciseCountOutputTypeCountWorkoutExercisesArgs
  }

  // Custom InputTypes
  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseCountOutputType
     */
    select?: ExerciseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeCountWorkoutExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutExerciseWhereInput
  }


  /**
   * Count Type CoreSetCountOutputType
   */

  export type CoreSetCountOutputType = {
    workoutExercise: number
    reps: number
    weight: number
  }

  export type CoreSetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutExercise?: boolean | CoreSetCountOutputTypeCountWorkoutExerciseArgs
    reps?: boolean | CoreSetCountOutputTypeCountRepsArgs
    weight?: boolean | CoreSetCountOutputTypeCountWeightArgs
  }

  // Custom InputTypes
  /**
   * CoreSetCountOutputType without action
   */
  export type CoreSetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetCountOutputType
     */
    select?: CoreSetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CoreSetCountOutputType without action
   */
  export type CoreSetCountOutputTypeCountWorkoutExerciseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutExerciseWhereInput
  }

  /**
   * CoreSetCountOutputType without action
   */
  export type CoreSetCountOutputTypeCountRepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoreSetRepsWhereInput
  }

  /**
   * CoreSetCountOutputType without action
   */
  export type CoreSetCountOutputTypeCountWeightArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoreSetWeightWhereInput
  }


  /**
   * Count Type CoreCardioSetCountOutputType
   */

  export type CoreCardioSetCountOutputType = {
    workoutExercise: number
  }

  export type CoreCardioSetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutExercise?: boolean | CoreCardioSetCountOutputTypeCountWorkoutExerciseArgs
  }

  // Custom InputTypes
  /**
   * CoreCardioSetCountOutputType without action
   */
  export type CoreCardioSetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSetCountOutputType
     */
    select?: CoreCardioSetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CoreCardioSetCountOutputType without action
   */
  export type CoreCardioSetCountOutputTypeCountWorkoutExerciseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutExerciseWhereInput
  }


  /**
   * Count Type ProgramCountOutputType
   */

  export type ProgramCountOutputType = {
    programWorkouts: number
    userWorkout: number
  }

  export type ProgramCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    programWorkouts?: boolean | ProgramCountOutputTypeCountProgramWorkoutsArgs
    userWorkout?: boolean | ProgramCountOutputTypeCountUserWorkoutArgs
  }

  // Custom InputTypes
  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramCountOutputType
     */
    select?: ProgramCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeCountProgramWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWorkoutWhereInput
  }

  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeCountUserWorkoutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWorkoutWhereInput
  }


  /**
   * Count Type WorkoutCountOutputType
   */

  export type WorkoutCountOutputType = {
    workoutExercises: number
    programWorkouts: number
    userWorkouts: number
  }

  export type WorkoutCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutExercises?: boolean | WorkoutCountOutputTypeCountWorkoutExercisesArgs
    programWorkouts?: boolean | WorkoutCountOutputTypeCountProgramWorkoutsArgs
    userWorkouts?: boolean | WorkoutCountOutputTypeCountUserWorkoutsArgs
  }

  // Custom InputTypes
  /**
   * WorkoutCountOutputType without action
   */
  export type WorkoutCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutCountOutputType
     */
    select?: WorkoutCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkoutCountOutputType without action
   */
  export type WorkoutCountOutputTypeCountWorkoutExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutExerciseWhereInput
  }

  /**
   * WorkoutCountOutputType without action
   */
  export type WorkoutCountOutputTypeCountProgramWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWorkoutWhereInput
  }

  /**
   * WorkoutCountOutputType without action
   */
  export type WorkoutCountOutputTypeCountUserWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWorkoutWhereInput
  }


  /**
   * Count Type WorkoutExerciseCountOutputType
   */

  export type WorkoutExerciseCountOutputType = {
    userWorkoutExercises: number
  }

  export type WorkoutExerciseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userWorkoutExercises?: boolean | WorkoutExerciseCountOutputTypeCountUserWorkoutExercisesArgs
  }

  // Custom InputTypes
  /**
   * WorkoutExerciseCountOutputType without action
   */
  export type WorkoutExerciseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExerciseCountOutputType
     */
    select?: WorkoutExerciseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkoutExerciseCountOutputType without action
   */
  export type WorkoutExerciseCountOutputTypeCountUserWorkoutExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWorkoutExerciseWhereInput
  }


  /**
   * Count Type UserWorkoutExerciseCountOutputType
   */

  export type UserWorkoutExerciseCountOutputType = {
    userSets: number
  }

  export type UserWorkoutExerciseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userSets?: boolean | UserWorkoutExerciseCountOutputTypeCountUserSetsArgs
  }

  // Custom InputTypes
  /**
   * UserWorkoutExerciseCountOutputType without action
   */
  export type UserWorkoutExerciseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExerciseCountOutputType
     */
    select?: UserWorkoutExerciseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserWorkoutExerciseCountOutputType without action
   */
  export type UserWorkoutExerciseCountOutputTypeCountUserSetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSetWhereInput
  }


  /**
   * Count Type UserWorkoutCountOutputType
   */

  export type UserWorkoutCountOutputType = {
    userWorkoutExercises: number
  }

  export type UserWorkoutCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userWorkoutExercises?: boolean | UserWorkoutCountOutputTypeCountUserWorkoutExercisesArgs
  }

  // Custom InputTypes
  /**
   * UserWorkoutCountOutputType without action
   */
  export type UserWorkoutCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutCountOutputType
     */
    select?: UserWorkoutCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserWorkoutCountOutputType without action
   */
  export type UserWorkoutCountOutputTypeCountUserWorkoutExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWorkoutExerciseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    googleId: string | null
    firstName: string | null
    lastName: string | null
    imgUrl: string | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    googleId: string | null
    firstName: string | null
    lastName: string | null
    imgUrl: string | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    googleId: number
    firstName: number
    lastName: number
    imgUrl: number
    isAdmin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    googleId?: true
    firstName?: true
    lastName?: true
    imgUrl?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    googleId?: true
    firstName?: true
    lastName?: true
    imgUrl?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    googleId?: true
    firstName?: true
    lastName?: true
    imgUrl?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string | null
    googleId: string | null
    firstName: string | null
    lastName: string | null
    imgUrl: string | null
    isAdmin: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    googleId?: boolean
    firstName?: boolean
    lastName?: boolean
    imgUrl?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    programs?: boolean | User$programsArgs<ExtArgs>
    userSets?: boolean | User$userSetsArgs<ExtArgs>
    workouts?: boolean | User$workoutsArgs<ExtArgs>
    userWorkout?: boolean | User$userWorkoutArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    googleId?: boolean
    firstName?: boolean
    lastName?: boolean
    imgUrl?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    googleId?: boolean
    firstName?: boolean
    lastName?: boolean
    imgUrl?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    googleId?: boolean
    firstName?: boolean
    lastName?: boolean
    imgUrl?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "googleId" | "firstName" | "lastName" | "imgUrl" | "isAdmin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    programs?: boolean | User$programsArgs<ExtArgs>
    userSets?: boolean | User$userSetsArgs<ExtArgs>
    workouts?: boolean | User$workoutsArgs<ExtArgs>
    userWorkout?: boolean | User$userWorkoutArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      programs: Prisma.$ProgramPayload<ExtArgs>[]
      userSets: Prisma.$UserSetPayload<ExtArgs>[]
      workouts: Prisma.$WorkoutPayload<ExtArgs>[]
      userWorkout: Prisma.$UserWorkoutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string | null
      googleId: string | null
      firstName: string | null
      lastName: string | null
      imgUrl: string | null
      isAdmin: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    programs<T extends User$programsArgs<ExtArgs> = {}>(args?: Subset<T, User$programsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userSets<T extends User$userSetsArgs<ExtArgs> = {}>(args?: Subset<T, User$userSetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workouts<T extends User$workoutsArgs<ExtArgs> = {}>(args?: Subset<T, User$workoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userWorkout<T extends User$userWorkoutArgs<ExtArgs> = {}>(args?: Subset<T, User$userWorkoutArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly imgUrl: FieldRef<"User", 'String'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.programs
   */
  export type User$programsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    where?: ProgramWhereInput
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    cursor?: ProgramWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * User.userSets
   */
  export type User$userSetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    where?: UserSetWhereInput
    orderBy?: UserSetOrderByWithRelationInput | UserSetOrderByWithRelationInput[]
    cursor?: UserSetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSetScalarFieldEnum | UserSetScalarFieldEnum[]
  }

  /**
   * User.workouts
   */
  export type User$workoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    where?: WorkoutWhereInput
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[]
    cursor?: WorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[]
  }

  /**
   * User.userWorkout
   */
  export type User$userWorkoutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    where?: UserWorkoutWhereInput
    orderBy?: UserWorkoutOrderByWithRelationInput | UserWorkoutOrderByWithRelationInput[]
    cursor?: UserWorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWorkoutScalarFieldEnum | UserWorkoutScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Exercise
   */

  export type AggregateExercise = {
    _count: ExerciseCountAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  export type ExerciseMinAggregateOutputType = {
    id: string | null
    name: string | null
    youtubeUrl: string | null
    type: $Enums.ExerciseType | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExerciseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    youtubeUrl: string | null
    type: $Enums.ExerciseType | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExerciseCountAggregateOutputType = {
    id: number
    name: number
    youtubeUrl: number
    type: number
    notes: number
    equipment: number
    muscles: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExerciseMinAggregateInputType = {
    id?: true
    name?: true
    youtubeUrl?: true
    type?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExerciseMaxAggregateInputType = {
    id?: true
    name?: true
    youtubeUrl?: true
    type?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExerciseCountAggregateInputType = {
    id?: true
    name?: true
    youtubeUrl?: true
    type?: true
    notes?: true
    equipment?: true
    muscles?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercise to aggregate.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exercises
    **/
    _count?: true | ExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciseMaxAggregateInputType
  }

  export type GetExerciseAggregateType<T extends ExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExercise[P]>
      : GetScalarType<T[P], AggregateExercise[P]>
  }




  export type ExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithAggregationInput | ExerciseOrderByWithAggregationInput[]
    by: ExerciseScalarFieldEnum[] | ExerciseScalarFieldEnum
    having?: ExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciseCountAggregateInputType | true
    _min?: ExerciseMinAggregateInputType
    _max?: ExerciseMaxAggregateInputType
  }

  export type ExerciseGroupByOutputType = {
    id: string
    name: string
    youtubeUrl: string
    type: $Enums.ExerciseType
    notes: string | null
    equipment: $Enums.ExerciseEquipment[]
    muscles: $Enums.ExerciseMuscle[]
    createdAt: Date
    updatedAt: Date
    _count: ExerciseCountAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  type GetExerciseGroupByPayload<T extends ExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
        }
      >
    >


  export type ExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    youtubeUrl?: boolean
    type?: boolean
    notes?: boolean
    equipment?: boolean
    muscles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workoutExercises?: boolean | Exercise$workoutExercisesArgs<ExtArgs>
    _count?: boolean | ExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    youtubeUrl?: boolean
    type?: boolean
    notes?: boolean
    equipment?: boolean
    muscles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    youtubeUrl?: boolean
    type?: boolean
    notes?: boolean
    equipment?: boolean
    muscles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectScalar = {
    id?: boolean
    name?: boolean
    youtubeUrl?: boolean
    type?: boolean
    notes?: boolean
    equipment?: boolean
    muscles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "youtubeUrl" | "type" | "notes" | "equipment" | "muscles" | "createdAt" | "updatedAt", ExtArgs["result"]["exercise"]>
  export type ExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutExercises?: boolean | Exercise$workoutExercisesArgs<ExtArgs>
    _count?: boolean | ExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExerciseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ExerciseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exercise"
    objects: {
      workoutExercises: Prisma.$WorkoutExercisePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      youtubeUrl: string
      type: $Enums.ExerciseType
      notes: string | null
      equipment: $Enums.ExerciseEquipment[]
      muscles: $Enums.ExerciseMuscle[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["exercise"]>
    composites: {}
  }

  type ExerciseGetPayload<S extends boolean | null | undefined | ExerciseDefaultArgs> = $Result.GetResult<Prisma.$ExercisePayload, S>

  type ExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseCountAggregateInputType | true
    }

  export interface ExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exercise'], meta: { name: 'Exercise' } }
    /**
     * Find zero or one Exercise that matches the filter.
     * @param {ExerciseFindUniqueArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseFindUniqueArgs>(args: SelectSubset<T, ExerciseFindUniqueArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Exercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseFindUniqueOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseFindFirstArgs>(args?: SelectSubset<T, ExerciseFindFirstArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exercises
     * const exercises = await prisma.exercise.findMany()
     * 
     * // Get first 10 Exercises
     * const exercises = await prisma.exercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciseWithIdOnly = await prisma.exercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciseFindManyArgs>(args?: SelectSubset<T, ExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Exercise.
     * @param {ExerciseCreateArgs} args - Arguments to create a Exercise.
     * @example
     * // Create one Exercise
     * const Exercise = await prisma.exercise.create({
     *   data: {
     *     // ... data to create a Exercise
     *   }
     * })
     * 
     */
    create<T extends ExerciseCreateArgs>(args: SelectSubset<T, ExerciseCreateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exercises.
     * @param {ExerciseCreateManyArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciseCreateManyArgs>(args?: SelectSubset<T, ExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exercises and returns the data saved in the database.
     * @param {ExerciseCreateManyAndReturnArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExerciseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Exercise.
     * @param {ExerciseDeleteArgs} args - Arguments to delete one Exercise.
     * @example
     * // Delete one Exercise
     * const Exercise = await prisma.exercise.delete({
     *   where: {
     *     // ... filter to delete one Exercise
     *   }
     * })
     * 
     */
    delete<T extends ExerciseDeleteArgs>(args: SelectSubset<T, ExerciseDeleteArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Exercise.
     * @param {ExerciseUpdateArgs} args - Arguments to update one Exercise.
     * @example
     * // Update one Exercise
     * const exercise = await prisma.exercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciseUpdateArgs>(args: SelectSubset<T, ExerciseUpdateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exercises.
     * @param {ExerciseDeleteManyArgs} args - Arguments to filter Exercises to delete.
     * @example
     * // Delete a few Exercises
     * const { count } = await prisma.exercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciseDeleteManyArgs>(args?: SelectSubset<T, ExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciseUpdateManyArgs>(args: SelectSubset<T, ExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises and returns the data updated in the database.
     * @param {ExerciseUpdateManyAndReturnArgs} args - Arguments to update many Exercises.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExerciseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Exercise.
     * @param {ExerciseUpsertArgs} args - Arguments to update or create a Exercise.
     * @example
     * // Update or create a Exercise
     * const exercise = await prisma.exercise.upsert({
     *   create: {
     *     // ... data to create a Exercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exercise we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseUpsertArgs>(args: SelectSubset<T, ExerciseUpsertArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseCountArgs} args - Arguments to filter Exercises to count.
     * @example
     * // Count the number of Exercises
     * const count = await prisma.exercise.count({
     *   where: {
     *     // ... the filter for the Exercises we want to count
     *   }
     * })
    **/
    count<T extends ExerciseCountArgs>(
      args?: Subset<T, ExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExerciseAggregateArgs>(args: Subset<T, ExerciseAggregateArgs>): Prisma.PrismaPromise<GetExerciseAggregateType<T>>

    /**
     * Group by Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupByArgs} args - Group by arguments.
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
      T extends ExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exercise model
   */
  readonly fields: ExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workoutExercises<T extends Exercise$workoutExercisesArgs<ExtArgs> = {}>(args?: Subset<T, Exercise$workoutExercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exercise model
   */
  interface ExerciseFieldRefs {
    readonly id: FieldRef<"Exercise", 'String'>
    readonly name: FieldRef<"Exercise", 'String'>
    readonly youtubeUrl: FieldRef<"Exercise", 'String'>
    readonly type: FieldRef<"Exercise", 'ExerciseType'>
    readonly notes: FieldRef<"Exercise", 'String'>
    readonly equipment: FieldRef<"Exercise", 'ExerciseEquipment[]'>
    readonly muscles: FieldRef<"Exercise", 'ExerciseMuscle[]'>
    readonly createdAt: FieldRef<"Exercise", 'DateTime'>
    readonly updatedAt: FieldRef<"Exercise", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Exercise findUnique
   */
  export type ExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findUniqueOrThrow
   */
  export type ExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findFirst
   */
  export type ExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findFirstOrThrow
   */
  export type ExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findMany
   */
  export type ExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercises to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise create
   */
  export type ExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to create a Exercise.
     */
    data: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
  }

  /**
   * Exercise createMany
   */
  export type ExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Exercise createManyAndReturn
   */
  export type ExerciseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Exercise update
   */
  export type ExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to update a Exercise.
     */
    data: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
    /**
     * Choose, which Exercise to update.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise updateMany
   */
  export type ExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
  }

  /**
   * Exercise updateManyAndReturn
   */
  export type ExerciseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
  }

  /**
   * Exercise upsert
   */
  export type ExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The filter to search for the Exercise to update in case it exists.
     */
    where: ExerciseWhereUniqueInput
    /**
     * In case the Exercise found by the `where` argument doesn't exist, create a new Exercise with this data.
     */
    create: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
    /**
     * In case the Exercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
  }

  /**
   * Exercise delete
   */
  export type ExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter which Exercise to delete.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise deleteMany
   */
  export type ExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercises to delete
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to delete.
     */
    limit?: number
  }

  /**
   * Exercise.workoutExercises
   */
  export type Exercise$workoutExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    where?: WorkoutExerciseWhereInput
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[]
    cursor?: WorkoutExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[]
  }

  /**
   * Exercise without action
   */
  export type ExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
  }


  /**
   * Model CoreSet
   */

  export type AggregateCoreSet = {
    _count: CoreSetCountAggregateOutputType | null
    _avg: CoreSetAvgAggregateOutputType | null
    _sum: CoreSetSumAggregateOutputType | null
    _min: CoreSetMinAggregateOutputType | null
    _max: CoreSetMaxAggregateOutputType | null
  }

  export type CoreSetAvgAggregateOutputType = {
    restTime: number | null
    numberOfSets: number | null
  }

  export type CoreSetSumAggregateOutputType = {
    restTime: number | null
    numberOfSets: number | null
  }

  export type CoreSetMinAggregateOutputType = {
    id: string | null
    restTime: number | null
    numberOfSets: number | null
    hasWarmup: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoreSetMaxAggregateOutputType = {
    id: string | null
    restTime: number | null
    numberOfSets: number | null
    hasWarmup: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoreSetCountAggregateOutputType = {
    id: number
    restTime: number
    numberOfSets: number
    hasWarmup: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CoreSetAvgAggregateInputType = {
    restTime?: true
    numberOfSets?: true
  }

  export type CoreSetSumAggregateInputType = {
    restTime?: true
    numberOfSets?: true
  }

  export type CoreSetMinAggregateInputType = {
    id?: true
    restTime?: true
    numberOfSets?: true
    hasWarmup?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoreSetMaxAggregateInputType = {
    id?: true
    restTime?: true
    numberOfSets?: true
    hasWarmup?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoreSetCountAggregateInputType = {
    id?: true
    restTime?: true
    numberOfSets?: true
    hasWarmup?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CoreSetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoreSet to aggregate.
     */
    where?: CoreSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSets to fetch.
     */
    orderBy?: CoreSetOrderByWithRelationInput | CoreSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CoreSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CoreSets
    **/
    _count?: true | CoreSetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CoreSetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CoreSetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoreSetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoreSetMaxAggregateInputType
  }

  export type GetCoreSetAggregateType<T extends CoreSetAggregateArgs> = {
        [P in keyof T & keyof AggregateCoreSet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoreSet[P]>
      : GetScalarType<T[P], AggregateCoreSet[P]>
  }




  export type CoreSetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoreSetWhereInput
    orderBy?: CoreSetOrderByWithAggregationInput | CoreSetOrderByWithAggregationInput[]
    by: CoreSetScalarFieldEnum[] | CoreSetScalarFieldEnum
    having?: CoreSetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoreSetCountAggregateInputType | true
    _avg?: CoreSetAvgAggregateInputType
    _sum?: CoreSetSumAggregateInputType
    _min?: CoreSetMinAggregateInputType
    _max?: CoreSetMaxAggregateInputType
  }

  export type CoreSetGroupByOutputType = {
    id: string
    restTime: number
    numberOfSets: number
    hasWarmup: boolean
    createdAt: Date
    updatedAt: Date
    _count: CoreSetCountAggregateOutputType | null
    _avg: CoreSetAvgAggregateOutputType | null
    _sum: CoreSetSumAggregateOutputType | null
    _min: CoreSetMinAggregateOutputType | null
    _max: CoreSetMaxAggregateOutputType | null
  }

  type GetCoreSetGroupByPayload<T extends CoreSetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CoreSetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoreSetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoreSetGroupByOutputType[P]>
            : GetScalarType<T[P], CoreSetGroupByOutputType[P]>
        }
      >
    >


  export type CoreSetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restTime?: boolean
    numberOfSets?: boolean
    hasWarmup?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workoutExercise?: boolean | CoreSet$workoutExerciseArgs<ExtArgs>
    reps?: boolean | CoreSet$repsArgs<ExtArgs>
    weight?: boolean | CoreSet$weightArgs<ExtArgs>
    _count?: boolean | CoreSetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coreSet"]>

  export type CoreSetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restTime?: boolean
    numberOfSets?: boolean
    hasWarmup?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["coreSet"]>

  export type CoreSetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restTime?: boolean
    numberOfSets?: boolean
    hasWarmup?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["coreSet"]>

  export type CoreSetSelectScalar = {
    id?: boolean
    restTime?: boolean
    numberOfSets?: boolean
    hasWarmup?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CoreSetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "restTime" | "numberOfSets" | "hasWarmup" | "createdAt" | "updatedAt", ExtArgs["result"]["coreSet"]>
  export type CoreSetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutExercise?: boolean | CoreSet$workoutExerciseArgs<ExtArgs>
    reps?: boolean | CoreSet$repsArgs<ExtArgs>
    weight?: boolean | CoreSet$weightArgs<ExtArgs>
    _count?: boolean | CoreSetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CoreSetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CoreSetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CoreSetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CoreSet"
    objects: {
      workoutExercise: Prisma.$WorkoutExercisePayload<ExtArgs>[]
      reps: Prisma.$CoreSetRepsPayload<ExtArgs>[]
      weight: Prisma.$CoreSetWeightPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      restTime: number
      numberOfSets: number
      hasWarmup: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["coreSet"]>
    composites: {}
  }

  type CoreSetGetPayload<S extends boolean | null | undefined | CoreSetDefaultArgs> = $Result.GetResult<Prisma.$CoreSetPayload, S>

  type CoreSetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CoreSetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CoreSetCountAggregateInputType | true
    }

  export interface CoreSetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CoreSet'], meta: { name: 'CoreSet' } }
    /**
     * Find zero or one CoreSet that matches the filter.
     * @param {CoreSetFindUniqueArgs} args - Arguments to find a CoreSet
     * @example
     * // Get one CoreSet
     * const coreSet = await prisma.coreSet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CoreSetFindUniqueArgs>(args: SelectSubset<T, CoreSetFindUniqueArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CoreSet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CoreSetFindUniqueOrThrowArgs} args - Arguments to find a CoreSet
     * @example
     * // Get one CoreSet
     * const coreSet = await prisma.coreSet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CoreSetFindUniqueOrThrowArgs>(args: SelectSubset<T, CoreSetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CoreSet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetFindFirstArgs} args - Arguments to find a CoreSet
     * @example
     * // Get one CoreSet
     * const coreSet = await prisma.coreSet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CoreSetFindFirstArgs>(args?: SelectSubset<T, CoreSetFindFirstArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CoreSet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetFindFirstOrThrowArgs} args - Arguments to find a CoreSet
     * @example
     * // Get one CoreSet
     * const coreSet = await prisma.coreSet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CoreSetFindFirstOrThrowArgs>(args?: SelectSubset<T, CoreSetFindFirstOrThrowArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CoreSets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CoreSets
     * const coreSets = await prisma.coreSet.findMany()
     * 
     * // Get first 10 CoreSets
     * const coreSets = await prisma.coreSet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coreSetWithIdOnly = await prisma.coreSet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CoreSetFindManyArgs>(args?: SelectSubset<T, CoreSetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CoreSet.
     * @param {CoreSetCreateArgs} args - Arguments to create a CoreSet.
     * @example
     * // Create one CoreSet
     * const CoreSet = await prisma.coreSet.create({
     *   data: {
     *     // ... data to create a CoreSet
     *   }
     * })
     * 
     */
    create<T extends CoreSetCreateArgs>(args: SelectSubset<T, CoreSetCreateArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CoreSets.
     * @param {CoreSetCreateManyArgs} args - Arguments to create many CoreSets.
     * @example
     * // Create many CoreSets
     * const coreSet = await prisma.coreSet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CoreSetCreateManyArgs>(args?: SelectSubset<T, CoreSetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CoreSets and returns the data saved in the database.
     * @param {CoreSetCreateManyAndReturnArgs} args - Arguments to create many CoreSets.
     * @example
     * // Create many CoreSets
     * const coreSet = await prisma.coreSet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CoreSets and only return the `id`
     * const coreSetWithIdOnly = await prisma.coreSet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CoreSetCreateManyAndReturnArgs>(args?: SelectSubset<T, CoreSetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CoreSet.
     * @param {CoreSetDeleteArgs} args - Arguments to delete one CoreSet.
     * @example
     * // Delete one CoreSet
     * const CoreSet = await prisma.coreSet.delete({
     *   where: {
     *     // ... filter to delete one CoreSet
     *   }
     * })
     * 
     */
    delete<T extends CoreSetDeleteArgs>(args: SelectSubset<T, CoreSetDeleteArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CoreSet.
     * @param {CoreSetUpdateArgs} args - Arguments to update one CoreSet.
     * @example
     * // Update one CoreSet
     * const coreSet = await prisma.coreSet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CoreSetUpdateArgs>(args: SelectSubset<T, CoreSetUpdateArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CoreSets.
     * @param {CoreSetDeleteManyArgs} args - Arguments to filter CoreSets to delete.
     * @example
     * // Delete a few CoreSets
     * const { count } = await prisma.coreSet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CoreSetDeleteManyArgs>(args?: SelectSubset<T, CoreSetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CoreSets
     * const coreSet = await prisma.coreSet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CoreSetUpdateManyArgs>(args: SelectSubset<T, CoreSetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreSets and returns the data updated in the database.
     * @param {CoreSetUpdateManyAndReturnArgs} args - Arguments to update many CoreSets.
     * @example
     * // Update many CoreSets
     * const coreSet = await prisma.coreSet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CoreSets and only return the `id`
     * const coreSetWithIdOnly = await prisma.coreSet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CoreSetUpdateManyAndReturnArgs>(args: SelectSubset<T, CoreSetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CoreSet.
     * @param {CoreSetUpsertArgs} args - Arguments to update or create a CoreSet.
     * @example
     * // Update or create a CoreSet
     * const coreSet = await prisma.coreSet.upsert({
     *   create: {
     *     // ... data to create a CoreSet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CoreSet we want to update
     *   }
     * })
     */
    upsert<T extends CoreSetUpsertArgs>(args: SelectSubset<T, CoreSetUpsertArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CoreSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetCountArgs} args - Arguments to filter CoreSets to count.
     * @example
     * // Count the number of CoreSets
     * const count = await prisma.coreSet.count({
     *   where: {
     *     // ... the filter for the CoreSets we want to count
     *   }
     * })
    **/
    count<T extends CoreSetCountArgs>(
      args?: Subset<T, CoreSetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoreSetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CoreSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CoreSetAggregateArgs>(args: Subset<T, CoreSetAggregateArgs>): Prisma.PrismaPromise<GetCoreSetAggregateType<T>>

    /**
     * Group by CoreSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetGroupByArgs} args - Group by arguments.
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
      T extends CoreSetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoreSetGroupByArgs['orderBy'] }
        : { orderBy?: CoreSetGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoreSetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoreSetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CoreSet model
   */
  readonly fields: CoreSetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CoreSet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CoreSetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workoutExercise<T extends CoreSet$workoutExerciseArgs<ExtArgs> = {}>(args?: Subset<T, CoreSet$workoutExerciseArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reps<T extends CoreSet$repsArgs<ExtArgs> = {}>(args?: Subset<T, CoreSet$repsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weight<T extends CoreSet$weightArgs<ExtArgs> = {}>(args?: Subset<T, CoreSet$weightArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CoreSet model
   */
  interface CoreSetFieldRefs {
    readonly id: FieldRef<"CoreSet", 'String'>
    readonly restTime: FieldRef<"CoreSet", 'Int'>
    readonly numberOfSets: FieldRef<"CoreSet", 'Int'>
    readonly hasWarmup: FieldRef<"CoreSet", 'Boolean'>
    readonly createdAt: FieldRef<"CoreSet", 'DateTime'>
    readonly updatedAt: FieldRef<"CoreSet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CoreSet findUnique
   */
  export type CoreSetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
    /**
     * Filter, which CoreSet to fetch.
     */
    where: CoreSetWhereUniqueInput
  }

  /**
   * CoreSet findUniqueOrThrow
   */
  export type CoreSetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
    /**
     * Filter, which CoreSet to fetch.
     */
    where: CoreSetWhereUniqueInput
  }

  /**
   * CoreSet findFirst
   */
  export type CoreSetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
    /**
     * Filter, which CoreSet to fetch.
     */
    where?: CoreSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSets to fetch.
     */
    orderBy?: CoreSetOrderByWithRelationInput | CoreSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreSets.
     */
    cursor?: CoreSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreSets.
     */
    distinct?: CoreSetScalarFieldEnum | CoreSetScalarFieldEnum[]
  }

  /**
   * CoreSet findFirstOrThrow
   */
  export type CoreSetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
    /**
     * Filter, which CoreSet to fetch.
     */
    where?: CoreSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSets to fetch.
     */
    orderBy?: CoreSetOrderByWithRelationInput | CoreSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreSets.
     */
    cursor?: CoreSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreSets.
     */
    distinct?: CoreSetScalarFieldEnum | CoreSetScalarFieldEnum[]
  }

  /**
   * CoreSet findMany
   */
  export type CoreSetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
    /**
     * Filter, which CoreSets to fetch.
     */
    where?: CoreSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSets to fetch.
     */
    orderBy?: CoreSetOrderByWithRelationInput | CoreSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CoreSets.
     */
    cursor?: CoreSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSets.
     */
    skip?: number
    distinct?: CoreSetScalarFieldEnum | CoreSetScalarFieldEnum[]
  }

  /**
   * CoreSet create
   */
  export type CoreSetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
    /**
     * The data needed to create a CoreSet.
     */
    data: XOR<CoreSetCreateInput, CoreSetUncheckedCreateInput>
  }

  /**
   * CoreSet createMany
   */
  export type CoreSetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CoreSets.
     */
    data: CoreSetCreateManyInput | CoreSetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CoreSet createManyAndReturn
   */
  export type CoreSetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * The data used to create many CoreSets.
     */
    data: CoreSetCreateManyInput | CoreSetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CoreSet update
   */
  export type CoreSetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
    /**
     * The data needed to update a CoreSet.
     */
    data: XOR<CoreSetUpdateInput, CoreSetUncheckedUpdateInput>
    /**
     * Choose, which CoreSet to update.
     */
    where: CoreSetWhereUniqueInput
  }

  /**
   * CoreSet updateMany
   */
  export type CoreSetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CoreSets.
     */
    data: XOR<CoreSetUpdateManyMutationInput, CoreSetUncheckedUpdateManyInput>
    /**
     * Filter which CoreSets to update
     */
    where?: CoreSetWhereInput
    /**
     * Limit how many CoreSets to update.
     */
    limit?: number
  }

  /**
   * CoreSet updateManyAndReturn
   */
  export type CoreSetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * The data used to update CoreSets.
     */
    data: XOR<CoreSetUpdateManyMutationInput, CoreSetUncheckedUpdateManyInput>
    /**
     * Filter which CoreSets to update
     */
    where?: CoreSetWhereInput
    /**
     * Limit how many CoreSets to update.
     */
    limit?: number
  }

  /**
   * CoreSet upsert
   */
  export type CoreSetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
    /**
     * The filter to search for the CoreSet to update in case it exists.
     */
    where: CoreSetWhereUniqueInput
    /**
     * In case the CoreSet found by the `where` argument doesn't exist, create a new CoreSet with this data.
     */
    create: XOR<CoreSetCreateInput, CoreSetUncheckedCreateInput>
    /**
     * In case the CoreSet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CoreSetUpdateInput, CoreSetUncheckedUpdateInput>
  }

  /**
   * CoreSet delete
   */
  export type CoreSetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
    /**
     * Filter which CoreSet to delete.
     */
    where: CoreSetWhereUniqueInput
  }

  /**
   * CoreSet deleteMany
   */
  export type CoreSetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoreSets to delete
     */
    where?: CoreSetWhereInput
    /**
     * Limit how many CoreSets to delete.
     */
    limit?: number
  }

  /**
   * CoreSet.workoutExercise
   */
  export type CoreSet$workoutExerciseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    where?: WorkoutExerciseWhereInput
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[]
    cursor?: WorkoutExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[]
  }

  /**
   * CoreSet.reps
   */
  export type CoreSet$repsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
    where?: CoreSetRepsWhereInput
    orderBy?: CoreSetRepsOrderByWithRelationInput | CoreSetRepsOrderByWithRelationInput[]
    cursor?: CoreSetRepsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CoreSetRepsScalarFieldEnum | CoreSetRepsScalarFieldEnum[]
  }

  /**
   * CoreSet.weight
   */
  export type CoreSet$weightArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
    where?: CoreSetWeightWhereInput
    orderBy?: CoreSetWeightOrderByWithRelationInput | CoreSetWeightOrderByWithRelationInput[]
    cursor?: CoreSetWeightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CoreSetWeightScalarFieldEnum | CoreSetWeightScalarFieldEnum[]
  }

  /**
   * CoreSet without action
   */
  export type CoreSetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
  }


  /**
   * Model CoreCardioSet
   */

  export type AggregateCoreCardioSet = {
    _count: CoreCardioSetCountAggregateOutputType | null
    _avg: CoreCardioSetAvgAggregateOutputType | null
    _sum: CoreCardioSetSumAggregateOutputType | null
    _min: CoreCardioSetMinAggregateOutputType | null
    _max: CoreCardioSetMaxAggregateOutputType | null
  }

  export type CoreCardioSetAvgAggregateOutputType = {
    warmupTime: number | null
    avgHeartRate: number | null
    avgSpeed: number | null
    distance: number | null
    calorieTarget: number | null
    duration: number | null
  }

  export type CoreCardioSetSumAggregateOutputType = {
    warmupTime: number | null
    avgHeartRate: number | null
    avgSpeed: number | null
    distance: number | null
    calorieTarget: number | null
    duration: number | null
  }

  export type CoreCardioSetMinAggregateOutputType = {
    id: string | null
    warmupTime: number | null
    avgHeartRate: number | null
    avgSpeed: number | null
    distance: number | null
    calorieTarget: number | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoreCardioSetMaxAggregateOutputType = {
    id: string | null
    warmupTime: number | null
    avgHeartRate: number | null
    avgSpeed: number | null
    distance: number | null
    calorieTarget: number | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoreCardioSetCountAggregateOutputType = {
    id: number
    warmupTime: number
    avgHeartRate: number
    avgSpeed: number
    distance: number
    calorieTarget: number
    duration: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CoreCardioSetAvgAggregateInputType = {
    warmupTime?: true
    avgHeartRate?: true
    avgSpeed?: true
    distance?: true
    calorieTarget?: true
    duration?: true
  }

  export type CoreCardioSetSumAggregateInputType = {
    warmupTime?: true
    avgHeartRate?: true
    avgSpeed?: true
    distance?: true
    calorieTarget?: true
    duration?: true
  }

  export type CoreCardioSetMinAggregateInputType = {
    id?: true
    warmupTime?: true
    avgHeartRate?: true
    avgSpeed?: true
    distance?: true
    calorieTarget?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoreCardioSetMaxAggregateInputType = {
    id?: true
    warmupTime?: true
    avgHeartRate?: true
    avgSpeed?: true
    distance?: true
    calorieTarget?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoreCardioSetCountAggregateInputType = {
    id?: true
    warmupTime?: true
    avgHeartRate?: true
    avgSpeed?: true
    distance?: true
    calorieTarget?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CoreCardioSetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoreCardioSet to aggregate.
     */
    where?: CoreCardioSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreCardioSets to fetch.
     */
    orderBy?: CoreCardioSetOrderByWithRelationInput | CoreCardioSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CoreCardioSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreCardioSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreCardioSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CoreCardioSets
    **/
    _count?: true | CoreCardioSetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CoreCardioSetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CoreCardioSetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoreCardioSetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoreCardioSetMaxAggregateInputType
  }

  export type GetCoreCardioSetAggregateType<T extends CoreCardioSetAggregateArgs> = {
        [P in keyof T & keyof AggregateCoreCardioSet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoreCardioSet[P]>
      : GetScalarType<T[P], AggregateCoreCardioSet[P]>
  }




  export type CoreCardioSetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoreCardioSetWhereInput
    orderBy?: CoreCardioSetOrderByWithAggregationInput | CoreCardioSetOrderByWithAggregationInput[]
    by: CoreCardioSetScalarFieldEnum[] | CoreCardioSetScalarFieldEnum
    having?: CoreCardioSetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoreCardioSetCountAggregateInputType | true
    _avg?: CoreCardioSetAvgAggregateInputType
    _sum?: CoreCardioSetSumAggregateInputType
    _min?: CoreCardioSetMinAggregateInputType
    _max?: CoreCardioSetMaxAggregateInputType
  }

  export type CoreCardioSetGroupByOutputType = {
    id: string
    warmupTime: number | null
    avgHeartRate: number | null
    avgSpeed: number | null
    distance: number | null
    calorieTarget: number | null
    duration: number | null
    createdAt: Date
    updatedAt: Date
    _count: CoreCardioSetCountAggregateOutputType | null
    _avg: CoreCardioSetAvgAggregateOutputType | null
    _sum: CoreCardioSetSumAggregateOutputType | null
    _min: CoreCardioSetMinAggregateOutputType | null
    _max: CoreCardioSetMaxAggregateOutputType | null
  }

  type GetCoreCardioSetGroupByPayload<T extends CoreCardioSetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CoreCardioSetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoreCardioSetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoreCardioSetGroupByOutputType[P]>
            : GetScalarType<T[P], CoreCardioSetGroupByOutputType[P]>
        }
      >
    >


  export type CoreCardioSetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    warmupTime?: boolean
    avgHeartRate?: boolean
    avgSpeed?: boolean
    distance?: boolean
    calorieTarget?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workoutExercise?: boolean | CoreCardioSet$workoutExerciseArgs<ExtArgs>
    _count?: boolean | CoreCardioSetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coreCardioSet"]>

  export type CoreCardioSetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    warmupTime?: boolean
    avgHeartRate?: boolean
    avgSpeed?: boolean
    distance?: boolean
    calorieTarget?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["coreCardioSet"]>

  export type CoreCardioSetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    warmupTime?: boolean
    avgHeartRate?: boolean
    avgSpeed?: boolean
    distance?: boolean
    calorieTarget?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["coreCardioSet"]>

  export type CoreCardioSetSelectScalar = {
    id?: boolean
    warmupTime?: boolean
    avgHeartRate?: boolean
    avgSpeed?: boolean
    distance?: boolean
    calorieTarget?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CoreCardioSetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "warmupTime" | "avgHeartRate" | "avgSpeed" | "distance" | "calorieTarget" | "duration" | "createdAt" | "updatedAt", ExtArgs["result"]["coreCardioSet"]>
  export type CoreCardioSetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutExercise?: boolean | CoreCardioSet$workoutExerciseArgs<ExtArgs>
    _count?: boolean | CoreCardioSetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CoreCardioSetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CoreCardioSetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CoreCardioSetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CoreCardioSet"
    objects: {
      workoutExercise: Prisma.$WorkoutExercisePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      warmupTime: number | null
      avgHeartRate: number | null
      avgSpeed: number | null
      distance: number | null
      calorieTarget: number | null
      duration: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["coreCardioSet"]>
    composites: {}
  }

  type CoreCardioSetGetPayload<S extends boolean | null | undefined | CoreCardioSetDefaultArgs> = $Result.GetResult<Prisma.$CoreCardioSetPayload, S>

  type CoreCardioSetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CoreCardioSetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CoreCardioSetCountAggregateInputType | true
    }

  export interface CoreCardioSetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CoreCardioSet'], meta: { name: 'CoreCardioSet' } }
    /**
     * Find zero or one CoreCardioSet that matches the filter.
     * @param {CoreCardioSetFindUniqueArgs} args - Arguments to find a CoreCardioSet
     * @example
     * // Get one CoreCardioSet
     * const coreCardioSet = await prisma.coreCardioSet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CoreCardioSetFindUniqueArgs>(args: SelectSubset<T, CoreCardioSetFindUniqueArgs<ExtArgs>>): Prisma__CoreCardioSetClient<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CoreCardioSet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CoreCardioSetFindUniqueOrThrowArgs} args - Arguments to find a CoreCardioSet
     * @example
     * // Get one CoreCardioSet
     * const coreCardioSet = await prisma.coreCardioSet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CoreCardioSetFindUniqueOrThrowArgs>(args: SelectSubset<T, CoreCardioSetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CoreCardioSetClient<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CoreCardioSet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreCardioSetFindFirstArgs} args - Arguments to find a CoreCardioSet
     * @example
     * // Get one CoreCardioSet
     * const coreCardioSet = await prisma.coreCardioSet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CoreCardioSetFindFirstArgs>(args?: SelectSubset<T, CoreCardioSetFindFirstArgs<ExtArgs>>): Prisma__CoreCardioSetClient<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CoreCardioSet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreCardioSetFindFirstOrThrowArgs} args - Arguments to find a CoreCardioSet
     * @example
     * // Get one CoreCardioSet
     * const coreCardioSet = await prisma.coreCardioSet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CoreCardioSetFindFirstOrThrowArgs>(args?: SelectSubset<T, CoreCardioSetFindFirstOrThrowArgs<ExtArgs>>): Prisma__CoreCardioSetClient<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CoreCardioSets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreCardioSetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CoreCardioSets
     * const coreCardioSets = await prisma.coreCardioSet.findMany()
     * 
     * // Get first 10 CoreCardioSets
     * const coreCardioSets = await prisma.coreCardioSet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coreCardioSetWithIdOnly = await prisma.coreCardioSet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CoreCardioSetFindManyArgs>(args?: SelectSubset<T, CoreCardioSetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CoreCardioSet.
     * @param {CoreCardioSetCreateArgs} args - Arguments to create a CoreCardioSet.
     * @example
     * // Create one CoreCardioSet
     * const CoreCardioSet = await prisma.coreCardioSet.create({
     *   data: {
     *     // ... data to create a CoreCardioSet
     *   }
     * })
     * 
     */
    create<T extends CoreCardioSetCreateArgs>(args: SelectSubset<T, CoreCardioSetCreateArgs<ExtArgs>>): Prisma__CoreCardioSetClient<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CoreCardioSets.
     * @param {CoreCardioSetCreateManyArgs} args - Arguments to create many CoreCardioSets.
     * @example
     * // Create many CoreCardioSets
     * const coreCardioSet = await prisma.coreCardioSet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CoreCardioSetCreateManyArgs>(args?: SelectSubset<T, CoreCardioSetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CoreCardioSets and returns the data saved in the database.
     * @param {CoreCardioSetCreateManyAndReturnArgs} args - Arguments to create many CoreCardioSets.
     * @example
     * // Create many CoreCardioSets
     * const coreCardioSet = await prisma.coreCardioSet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CoreCardioSets and only return the `id`
     * const coreCardioSetWithIdOnly = await prisma.coreCardioSet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CoreCardioSetCreateManyAndReturnArgs>(args?: SelectSubset<T, CoreCardioSetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CoreCardioSet.
     * @param {CoreCardioSetDeleteArgs} args - Arguments to delete one CoreCardioSet.
     * @example
     * // Delete one CoreCardioSet
     * const CoreCardioSet = await prisma.coreCardioSet.delete({
     *   where: {
     *     // ... filter to delete one CoreCardioSet
     *   }
     * })
     * 
     */
    delete<T extends CoreCardioSetDeleteArgs>(args: SelectSubset<T, CoreCardioSetDeleteArgs<ExtArgs>>): Prisma__CoreCardioSetClient<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CoreCardioSet.
     * @param {CoreCardioSetUpdateArgs} args - Arguments to update one CoreCardioSet.
     * @example
     * // Update one CoreCardioSet
     * const coreCardioSet = await prisma.coreCardioSet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CoreCardioSetUpdateArgs>(args: SelectSubset<T, CoreCardioSetUpdateArgs<ExtArgs>>): Prisma__CoreCardioSetClient<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CoreCardioSets.
     * @param {CoreCardioSetDeleteManyArgs} args - Arguments to filter CoreCardioSets to delete.
     * @example
     * // Delete a few CoreCardioSets
     * const { count } = await prisma.coreCardioSet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CoreCardioSetDeleteManyArgs>(args?: SelectSubset<T, CoreCardioSetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreCardioSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreCardioSetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CoreCardioSets
     * const coreCardioSet = await prisma.coreCardioSet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CoreCardioSetUpdateManyArgs>(args: SelectSubset<T, CoreCardioSetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreCardioSets and returns the data updated in the database.
     * @param {CoreCardioSetUpdateManyAndReturnArgs} args - Arguments to update many CoreCardioSets.
     * @example
     * // Update many CoreCardioSets
     * const coreCardioSet = await prisma.coreCardioSet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CoreCardioSets and only return the `id`
     * const coreCardioSetWithIdOnly = await prisma.coreCardioSet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CoreCardioSetUpdateManyAndReturnArgs>(args: SelectSubset<T, CoreCardioSetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CoreCardioSet.
     * @param {CoreCardioSetUpsertArgs} args - Arguments to update or create a CoreCardioSet.
     * @example
     * // Update or create a CoreCardioSet
     * const coreCardioSet = await prisma.coreCardioSet.upsert({
     *   create: {
     *     // ... data to create a CoreCardioSet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CoreCardioSet we want to update
     *   }
     * })
     */
    upsert<T extends CoreCardioSetUpsertArgs>(args: SelectSubset<T, CoreCardioSetUpsertArgs<ExtArgs>>): Prisma__CoreCardioSetClient<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CoreCardioSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreCardioSetCountArgs} args - Arguments to filter CoreCardioSets to count.
     * @example
     * // Count the number of CoreCardioSets
     * const count = await prisma.coreCardioSet.count({
     *   where: {
     *     // ... the filter for the CoreCardioSets we want to count
     *   }
     * })
    **/
    count<T extends CoreCardioSetCountArgs>(
      args?: Subset<T, CoreCardioSetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoreCardioSetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CoreCardioSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreCardioSetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CoreCardioSetAggregateArgs>(args: Subset<T, CoreCardioSetAggregateArgs>): Prisma.PrismaPromise<GetCoreCardioSetAggregateType<T>>

    /**
     * Group by CoreCardioSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreCardioSetGroupByArgs} args - Group by arguments.
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
      T extends CoreCardioSetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoreCardioSetGroupByArgs['orderBy'] }
        : { orderBy?: CoreCardioSetGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoreCardioSetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoreCardioSetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CoreCardioSet model
   */
  readonly fields: CoreCardioSetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CoreCardioSet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CoreCardioSetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workoutExercise<T extends CoreCardioSet$workoutExerciseArgs<ExtArgs> = {}>(args?: Subset<T, CoreCardioSet$workoutExerciseArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CoreCardioSet model
   */
  interface CoreCardioSetFieldRefs {
    readonly id: FieldRef<"CoreCardioSet", 'String'>
    readonly warmupTime: FieldRef<"CoreCardioSet", 'Int'>
    readonly avgHeartRate: FieldRef<"CoreCardioSet", 'Int'>
    readonly avgSpeed: FieldRef<"CoreCardioSet", 'Float'>
    readonly distance: FieldRef<"CoreCardioSet", 'Float'>
    readonly calorieTarget: FieldRef<"CoreCardioSet", 'Int'>
    readonly duration: FieldRef<"CoreCardioSet", 'Int'>
    readonly createdAt: FieldRef<"CoreCardioSet", 'DateTime'>
    readonly updatedAt: FieldRef<"CoreCardioSet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CoreCardioSet findUnique
   */
  export type CoreCardioSetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
    /**
     * Filter, which CoreCardioSet to fetch.
     */
    where: CoreCardioSetWhereUniqueInput
  }

  /**
   * CoreCardioSet findUniqueOrThrow
   */
  export type CoreCardioSetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
    /**
     * Filter, which CoreCardioSet to fetch.
     */
    where: CoreCardioSetWhereUniqueInput
  }

  /**
   * CoreCardioSet findFirst
   */
  export type CoreCardioSetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
    /**
     * Filter, which CoreCardioSet to fetch.
     */
    where?: CoreCardioSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreCardioSets to fetch.
     */
    orderBy?: CoreCardioSetOrderByWithRelationInput | CoreCardioSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreCardioSets.
     */
    cursor?: CoreCardioSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreCardioSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreCardioSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreCardioSets.
     */
    distinct?: CoreCardioSetScalarFieldEnum | CoreCardioSetScalarFieldEnum[]
  }

  /**
   * CoreCardioSet findFirstOrThrow
   */
  export type CoreCardioSetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
    /**
     * Filter, which CoreCardioSet to fetch.
     */
    where?: CoreCardioSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreCardioSets to fetch.
     */
    orderBy?: CoreCardioSetOrderByWithRelationInput | CoreCardioSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreCardioSets.
     */
    cursor?: CoreCardioSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreCardioSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreCardioSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreCardioSets.
     */
    distinct?: CoreCardioSetScalarFieldEnum | CoreCardioSetScalarFieldEnum[]
  }

  /**
   * CoreCardioSet findMany
   */
  export type CoreCardioSetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
    /**
     * Filter, which CoreCardioSets to fetch.
     */
    where?: CoreCardioSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreCardioSets to fetch.
     */
    orderBy?: CoreCardioSetOrderByWithRelationInput | CoreCardioSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CoreCardioSets.
     */
    cursor?: CoreCardioSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreCardioSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreCardioSets.
     */
    skip?: number
    distinct?: CoreCardioSetScalarFieldEnum | CoreCardioSetScalarFieldEnum[]
  }

  /**
   * CoreCardioSet create
   */
  export type CoreCardioSetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
    /**
     * The data needed to create a CoreCardioSet.
     */
    data: XOR<CoreCardioSetCreateInput, CoreCardioSetUncheckedCreateInput>
  }

  /**
   * CoreCardioSet createMany
   */
  export type CoreCardioSetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CoreCardioSets.
     */
    data: CoreCardioSetCreateManyInput | CoreCardioSetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CoreCardioSet createManyAndReturn
   */
  export type CoreCardioSetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * The data used to create many CoreCardioSets.
     */
    data: CoreCardioSetCreateManyInput | CoreCardioSetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CoreCardioSet update
   */
  export type CoreCardioSetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
    /**
     * The data needed to update a CoreCardioSet.
     */
    data: XOR<CoreCardioSetUpdateInput, CoreCardioSetUncheckedUpdateInput>
    /**
     * Choose, which CoreCardioSet to update.
     */
    where: CoreCardioSetWhereUniqueInput
  }

  /**
   * CoreCardioSet updateMany
   */
  export type CoreCardioSetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CoreCardioSets.
     */
    data: XOR<CoreCardioSetUpdateManyMutationInput, CoreCardioSetUncheckedUpdateManyInput>
    /**
     * Filter which CoreCardioSets to update
     */
    where?: CoreCardioSetWhereInput
    /**
     * Limit how many CoreCardioSets to update.
     */
    limit?: number
  }

  /**
   * CoreCardioSet updateManyAndReturn
   */
  export type CoreCardioSetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * The data used to update CoreCardioSets.
     */
    data: XOR<CoreCardioSetUpdateManyMutationInput, CoreCardioSetUncheckedUpdateManyInput>
    /**
     * Filter which CoreCardioSets to update
     */
    where?: CoreCardioSetWhereInput
    /**
     * Limit how many CoreCardioSets to update.
     */
    limit?: number
  }

  /**
   * CoreCardioSet upsert
   */
  export type CoreCardioSetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
    /**
     * The filter to search for the CoreCardioSet to update in case it exists.
     */
    where: CoreCardioSetWhereUniqueInput
    /**
     * In case the CoreCardioSet found by the `where` argument doesn't exist, create a new CoreCardioSet with this data.
     */
    create: XOR<CoreCardioSetCreateInput, CoreCardioSetUncheckedCreateInput>
    /**
     * In case the CoreCardioSet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CoreCardioSetUpdateInput, CoreCardioSetUncheckedUpdateInput>
  }

  /**
   * CoreCardioSet delete
   */
  export type CoreCardioSetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
    /**
     * Filter which CoreCardioSet to delete.
     */
    where: CoreCardioSetWhereUniqueInput
  }

  /**
   * CoreCardioSet deleteMany
   */
  export type CoreCardioSetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoreCardioSets to delete
     */
    where?: CoreCardioSetWhereInput
    /**
     * Limit how many CoreCardioSets to delete.
     */
    limit?: number
  }

  /**
   * CoreCardioSet.workoutExercise
   */
  export type CoreCardioSet$workoutExerciseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    where?: WorkoutExerciseWhereInput
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[]
    cursor?: WorkoutExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[]
  }

  /**
   * CoreCardioSet without action
   */
  export type CoreCardioSetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
  }


  /**
   * Model CoreSetReps
   */

  export type AggregateCoreSetReps = {
    _count: CoreSetRepsCountAggregateOutputType | null
    _avg: CoreSetRepsAvgAggregateOutputType | null
    _sum: CoreSetRepsSumAggregateOutputType | null
    _min: CoreSetRepsMinAggregateOutputType | null
    _max: CoreSetRepsMaxAggregateOutputType | null
  }

  export type CoreSetRepsAvgAggregateOutputType = {
    reps: number | null
  }

  export type CoreSetRepsSumAggregateOutputType = {
    reps: number | null
  }

  export type CoreSetRepsMinAggregateOutputType = {
    id: string | null
    coreSetId: string | null
    reps: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoreSetRepsMaxAggregateOutputType = {
    id: string | null
    coreSetId: string | null
    reps: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoreSetRepsCountAggregateOutputType = {
    id: number
    coreSetId: number
    reps: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CoreSetRepsAvgAggregateInputType = {
    reps?: true
  }

  export type CoreSetRepsSumAggregateInputType = {
    reps?: true
  }

  export type CoreSetRepsMinAggregateInputType = {
    id?: true
    coreSetId?: true
    reps?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoreSetRepsMaxAggregateInputType = {
    id?: true
    coreSetId?: true
    reps?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoreSetRepsCountAggregateInputType = {
    id?: true
    coreSetId?: true
    reps?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CoreSetRepsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoreSetReps to aggregate.
     */
    where?: CoreSetRepsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSetReps to fetch.
     */
    orderBy?: CoreSetRepsOrderByWithRelationInput | CoreSetRepsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CoreSetRepsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSetReps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSetReps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CoreSetReps
    **/
    _count?: true | CoreSetRepsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CoreSetRepsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CoreSetRepsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoreSetRepsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoreSetRepsMaxAggregateInputType
  }

  export type GetCoreSetRepsAggregateType<T extends CoreSetRepsAggregateArgs> = {
        [P in keyof T & keyof AggregateCoreSetReps]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoreSetReps[P]>
      : GetScalarType<T[P], AggregateCoreSetReps[P]>
  }




  export type CoreSetRepsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoreSetRepsWhereInput
    orderBy?: CoreSetRepsOrderByWithAggregationInput | CoreSetRepsOrderByWithAggregationInput[]
    by: CoreSetRepsScalarFieldEnum[] | CoreSetRepsScalarFieldEnum
    having?: CoreSetRepsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoreSetRepsCountAggregateInputType | true
    _avg?: CoreSetRepsAvgAggregateInputType
    _sum?: CoreSetRepsSumAggregateInputType
    _min?: CoreSetRepsMinAggregateInputType
    _max?: CoreSetRepsMaxAggregateInputType
  }

  export type CoreSetRepsGroupByOutputType = {
    id: string
    coreSetId: string
    reps: number
    createdAt: Date
    updatedAt: Date
    _count: CoreSetRepsCountAggregateOutputType | null
    _avg: CoreSetRepsAvgAggregateOutputType | null
    _sum: CoreSetRepsSumAggregateOutputType | null
    _min: CoreSetRepsMinAggregateOutputType | null
    _max: CoreSetRepsMaxAggregateOutputType | null
  }

  type GetCoreSetRepsGroupByPayload<T extends CoreSetRepsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CoreSetRepsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoreSetRepsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoreSetRepsGroupByOutputType[P]>
            : GetScalarType<T[P], CoreSetRepsGroupByOutputType[P]>
        }
      >
    >


  export type CoreSetRepsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coreSetId?: boolean
    reps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coreSetReps"]>

  export type CoreSetRepsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coreSetId?: boolean
    reps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coreSetReps"]>

  export type CoreSetRepsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coreSetId?: boolean
    reps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coreSetReps"]>

  export type CoreSetRepsSelectScalar = {
    id?: boolean
    coreSetId?: boolean
    reps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CoreSetRepsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "coreSetId" | "reps" | "createdAt" | "updatedAt", ExtArgs["result"]["coreSetReps"]>
  export type CoreSetRepsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }
  export type CoreSetRepsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }
  export type CoreSetRepsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }

  export type $CoreSetRepsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CoreSetReps"
    objects: {
      coreSet: Prisma.$CoreSetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      coreSetId: string
      reps: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["coreSetReps"]>
    composites: {}
  }

  type CoreSetRepsGetPayload<S extends boolean | null | undefined | CoreSetRepsDefaultArgs> = $Result.GetResult<Prisma.$CoreSetRepsPayload, S>

  type CoreSetRepsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CoreSetRepsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CoreSetRepsCountAggregateInputType | true
    }

  export interface CoreSetRepsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CoreSetReps'], meta: { name: 'CoreSetReps' } }
    /**
     * Find zero or one CoreSetReps that matches the filter.
     * @param {CoreSetRepsFindUniqueArgs} args - Arguments to find a CoreSetReps
     * @example
     * // Get one CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CoreSetRepsFindUniqueArgs>(args: SelectSubset<T, CoreSetRepsFindUniqueArgs<ExtArgs>>): Prisma__CoreSetRepsClient<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CoreSetReps that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CoreSetRepsFindUniqueOrThrowArgs} args - Arguments to find a CoreSetReps
     * @example
     * // Get one CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CoreSetRepsFindUniqueOrThrowArgs>(args: SelectSubset<T, CoreSetRepsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CoreSetRepsClient<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CoreSetReps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetRepsFindFirstArgs} args - Arguments to find a CoreSetReps
     * @example
     * // Get one CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CoreSetRepsFindFirstArgs>(args?: SelectSubset<T, CoreSetRepsFindFirstArgs<ExtArgs>>): Prisma__CoreSetRepsClient<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CoreSetReps that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetRepsFindFirstOrThrowArgs} args - Arguments to find a CoreSetReps
     * @example
     * // Get one CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CoreSetRepsFindFirstOrThrowArgs>(args?: SelectSubset<T, CoreSetRepsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CoreSetRepsClient<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CoreSetReps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetRepsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.findMany()
     * 
     * // Get first 10 CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coreSetRepsWithIdOnly = await prisma.coreSetReps.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CoreSetRepsFindManyArgs>(args?: SelectSubset<T, CoreSetRepsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CoreSetReps.
     * @param {CoreSetRepsCreateArgs} args - Arguments to create a CoreSetReps.
     * @example
     * // Create one CoreSetReps
     * const CoreSetReps = await prisma.coreSetReps.create({
     *   data: {
     *     // ... data to create a CoreSetReps
     *   }
     * })
     * 
     */
    create<T extends CoreSetRepsCreateArgs>(args: SelectSubset<T, CoreSetRepsCreateArgs<ExtArgs>>): Prisma__CoreSetRepsClient<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CoreSetReps.
     * @param {CoreSetRepsCreateManyArgs} args - Arguments to create many CoreSetReps.
     * @example
     * // Create many CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CoreSetRepsCreateManyArgs>(args?: SelectSubset<T, CoreSetRepsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CoreSetReps and returns the data saved in the database.
     * @param {CoreSetRepsCreateManyAndReturnArgs} args - Arguments to create many CoreSetReps.
     * @example
     * // Create many CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CoreSetReps and only return the `id`
     * const coreSetRepsWithIdOnly = await prisma.coreSetReps.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CoreSetRepsCreateManyAndReturnArgs>(args?: SelectSubset<T, CoreSetRepsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CoreSetReps.
     * @param {CoreSetRepsDeleteArgs} args - Arguments to delete one CoreSetReps.
     * @example
     * // Delete one CoreSetReps
     * const CoreSetReps = await prisma.coreSetReps.delete({
     *   where: {
     *     // ... filter to delete one CoreSetReps
     *   }
     * })
     * 
     */
    delete<T extends CoreSetRepsDeleteArgs>(args: SelectSubset<T, CoreSetRepsDeleteArgs<ExtArgs>>): Prisma__CoreSetRepsClient<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CoreSetReps.
     * @param {CoreSetRepsUpdateArgs} args - Arguments to update one CoreSetReps.
     * @example
     * // Update one CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CoreSetRepsUpdateArgs>(args: SelectSubset<T, CoreSetRepsUpdateArgs<ExtArgs>>): Prisma__CoreSetRepsClient<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CoreSetReps.
     * @param {CoreSetRepsDeleteManyArgs} args - Arguments to filter CoreSetReps to delete.
     * @example
     * // Delete a few CoreSetReps
     * const { count } = await prisma.coreSetReps.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CoreSetRepsDeleteManyArgs>(args?: SelectSubset<T, CoreSetRepsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreSetReps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetRepsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CoreSetRepsUpdateManyArgs>(args: SelectSubset<T, CoreSetRepsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreSetReps and returns the data updated in the database.
     * @param {CoreSetRepsUpdateManyAndReturnArgs} args - Arguments to update many CoreSetReps.
     * @example
     * // Update many CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CoreSetReps and only return the `id`
     * const coreSetRepsWithIdOnly = await prisma.coreSetReps.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CoreSetRepsUpdateManyAndReturnArgs>(args: SelectSubset<T, CoreSetRepsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CoreSetReps.
     * @param {CoreSetRepsUpsertArgs} args - Arguments to update or create a CoreSetReps.
     * @example
     * // Update or create a CoreSetReps
     * const coreSetReps = await prisma.coreSetReps.upsert({
     *   create: {
     *     // ... data to create a CoreSetReps
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CoreSetReps we want to update
     *   }
     * })
     */
    upsert<T extends CoreSetRepsUpsertArgs>(args: SelectSubset<T, CoreSetRepsUpsertArgs<ExtArgs>>): Prisma__CoreSetRepsClient<$Result.GetResult<Prisma.$CoreSetRepsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CoreSetReps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetRepsCountArgs} args - Arguments to filter CoreSetReps to count.
     * @example
     * // Count the number of CoreSetReps
     * const count = await prisma.coreSetReps.count({
     *   where: {
     *     // ... the filter for the CoreSetReps we want to count
     *   }
     * })
    **/
    count<T extends CoreSetRepsCountArgs>(
      args?: Subset<T, CoreSetRepsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoreSetRepsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CoreSetReps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetRepsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CoreSetRepsAggregateArgs>(args: Subset<T, CoreSetRepsAggregateArgs>): Prisma.PrismaPromise<GetCoreSetRepsAggregateType<T>>

    /**
     * Group by CoreSetReps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetRepsGroupByArgs} args - Group by arguments.
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
      T extends CoreSetRepsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoreSetRepsGroupByArgs['orderBy'] }
        : { orderBy?: CoreSetRepsGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoreSetRepsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoreSetRepsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CoreSetReps model
   */
  readonly fields: CoreSetRepsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CoreSetReps.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CoreSetRepsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coreSet<T extends CoreSetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CoreSetDefaultArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CoreSetReps model
   */
  interface CoreSetRepsFieldRefs {
    readonly id: FieldRef<"CoreSetReps", 'String'>
    readonly coreSetId: FieldRef<"CoreSetReps", 'String'>
    readonly reps: FieldRef<"CoreSetReps", 'Int'>
    readonly createdAt: FieldRef<"CoreSetReps", 'DateTime'>
    readonly updatedAt: FieldRef<"CoreSetReps", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CoreSetReps findUnique
   */
  export type CoreSetRepsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
    /**
     * Filter, which CoreSetReps to fetch.
     */
    where: CoreSetRepsWhereUniqueInput
  }

  /**
   * CoreSetReps findUniqueOrThrow
   */
  export type CoreSetRepsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
    /**
     * Filter, which CoreSetReps to fetch.
     */
    where: CoreSetRepsWhereUniqueInput
  }

  /**
   * CoreSetReps findFirst
   */
  export type CoreSetRepsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
    /**
     * Filter, which CoreSetReps to fetch.
     */
    where?: CoreSetRepsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSetReps to fetch.
     */
    orderBy?: CoreSetRepsOrderByWithRelationInput | CoreSetRepsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreSetReps.
     */
    cursor?: CoreSetRepsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSetReps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSetReps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreSetReps.
     */
    distinct?: CoreSetRepsScalarFieldEnum | CoreSetRepsScalarFieldEnum[]
  }

  /**
   * CoreSetReps findFirstOrThrow
   */
  export type CoreSetRepsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
    /**
     * Filter, which CoreSetReps to fetch.
     */
    where?: CoreSetRepsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSetReps to fetch.
     */
    orderBy?: CoreSetRepsOrderByWithRelationInput | CoreSetRepsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreSetReps.
     */
    cursor?: CoreSetRepsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSetReps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSetReps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreSetReps.
     */
    distinct?: CoreSetRepsScalarFieldEnum | CoreSetRepsScalarFieldEnum[]
  }

  /**
   * CoreSetReps findMany
   */
  export type CoreSetRepsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
    /**
     * Filter, which CoreSetReps to fetch.
     */
    where?: CoreSetRepsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSetReps to fetch.
     */
    orderBy?: CoreSetRepsOrderByWithRelationInput | CoreSetRepsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CoreSetReps.
     */
    cursor?: CoreSetRepsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSetReps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSetReps.
     */
    skip?: number
    distinct?: CoreSetRepsScalarFieldEnum | CoreSetRepsScalarFieldEnum[]
  }

  /**
   * CoreSetReps create
   */
  export type CoreSetRepsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
    /**
     * The data needed to create a CoreSetReps.
     */
    data: XOR<CoreSetRepsCreateInput, CoreSetRepsUncheckedCreateInput>
  }

  /**
   * CoreSetReps createMany
   */
  export type CoreSetRepsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CoreSetReps.
     */
    data: CoreSetRepsCreateManyInput | CoreSetRepsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CoreSetReps createManyAndReturn
   */
  export type CoreSetRepsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * The data used to create many CoreSetReps.
     */
    data: CoreSetRepsCreateManyInput | CoreSetRepsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CoreSetReps update
   */
  export type CoreSetRepsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
    /**
     * The data needed to update a CoreSetReps.
     */
    data: XOR<CoreSetRepsUpdateInput, CoreSetRepsUncheckedUpdateInput>
    /**
     * Choose, which CoreSetReps to update.
     */
    where: CoreSetRepsWhereUniqueInput
  }

  /**
   * CoreSetReps updateMany
   */
  export type CoreSetRepsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CoreSetReps.
     */
    data: XOR<CoreSetRepsUpdateManyMutationInput, CoreSetRepsUncheckedUpdateManyInput>
    /**
     * Filter which CoreSetReps to update
     */
    where?: CoreSetRepsWhereInput
    /**
     * Limit how many CoreSetReps to update.
     */
    limit?: number
  }

  /**
   * CoreSetReps updateManyAndReturn
   */
  export type CoreSetRepsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * The data used to update CoreSetReps.
     */
    data: XOR<CoreSetRepsUpdateManyMutationInput, CoreSetRepsUncheckedUpdateManyInput>
    /**
     * Filter which CoreSetReps to update
     */
    where?: CoreSetRepsWhereInput
    /**
     * Limit how many CoreSetReps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CoreSetReps upsert
   */
  export type CoreSetRepsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
    /**
     * The filter to search for the CoreSetReps to update in case it exists.
     */
    where: CoreSetRepsWhereUniqueInput
    /**
     * In case the CoreSetReps found by the `where` argument doesn't exist, create a new CoreSetReps with this data.
     */
    create: XOR<CoreSetRepsCreateInput, CoreSetRepsUncheckedCreateInput>
    /**
     * In case the CoreSetReps was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CoreSetRepsUpdateInput, CoreSetRepsUncheckedUpdateInput>
  }

  /**
   * CoreSetReps delete
   */
  export type CoreSetRepsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
    /**
     * Filter which CoreSetReps to delete.
     */
    where: CoreSetRepsWhereUniqueInput
  }

  /**
   * CoreSetReps deleteMany
   */
  export type CoreSetRepsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoreSetReps to delete
     */
    where?: CoreSetRepsWhereInput
    /**
     * Limit how many CoreSetReps to delete.
     */
    limit?: number
  }

  /**
   * CoreSetReps without action
   */
  export type CoreSetRepsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetReps
     */
    select?: CoreSetRepsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetReps
     */
    omit?: CoreSetRepsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetRepsInclude<ExtArgs> | null
  }


  /**
   * Model CoreSetWeight
   */

  export type AggregateCoreSetWeight = {
    _count: CoreSetWeightCountAggregateOutputType | null
    _avg: CoreSetWeightAvgAggregateOutputType | null
    _sum: CoreSetWeightSumAggregateOutputType | null
    _min: CoreSetWeightMinAggregateOutputType | null
    _max: CoreSetWeightMaxAggregateOutputType | null
  }

  export type CoreSetWeightAvgAggregateOutputType = {
    weight: number | null
  }

  export type CoreSetWeightSumAggregateOutputType = {
    weight: number | null
  }

  export type CoreSetWeightMinAggregateOutputType = {
    id: string | null
    coreSetId: string | null
    isBodyWeight: boolean | null
    weight: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoreSetWeightMaxAggregateOutputType = {
    id: string | null
    coreSetId: string | null
    isBodyWeight: boolean | null
    weight: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoreSetWeightCountAggregateOutputType = {
    id: number
    coreSetId: number
    isBodyWeight: number
    weight: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CoreSetWeightAvgAggregateInputType = {
    weight?: true
  }

  export type CoreSetWeightSumAggregateInputType = {
    weight?: true
  }

  export type CoreSetWeightMinAggregateInputType = {
    id?: true
    coreSetId?: true
    isBodyWeight?: true
    weight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoreSetWeightMaxAggregateInputType = {
    id?: true
    coreSetId?: true
    isBodyWeight?: true
    weight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoreSetWeightCountAggregateInputType = {
    id?: true
    coreSetId?: true
    isBodyWeight?: true
    weight?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CoreSetWeightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoreSetWeight to aggregate.
     */
    where?: CoreSetWeightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSetWeights to fetch.
     */
    orderBy?: CoreSetWeightOrderByWithRelationInput | CoreSetWeightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CoreSetWeightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSetWeights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSetWeights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CoreSetWeights
    **/
    _count?: true | CoreSetWeightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CoreSetWeightAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CoreSetWeightSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoreSetWeightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoreSetWeightMaxAggregateInputType
  }

  export type GetCoreSetWeightAggregateType<T extends CoreSetWeightAggregateArgs> = {
        [P in keyof T & keyof AggregateCoreSetWeight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoreSetWeight[P]>
      : GetScalarType<T[P], AggregateCoreSetWeight[P]>
  }




  export type CoreSetWeightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoreSetWeightWhereInput
    orderBy?: CoreSetWeightOrderByWithAggregationInput | CoreSetWeightOrderByWithAggregationInput[]
    by: CoreSetWeightScalarFieldEnum[] | CoreSetWeightScalarFieldEnum
    having?: CoreSetWeightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoreSetWeightCountAggregateInputType | true
    _avg?: CoreSetWeightAvgAggregateInputType
    _sum?: CoreSetWeightSumAggregateInputType
    _min?: CoreSetWeightMinAggregateInputType
    _max?: CoreSetWeightMaxAggregateInputType
  }

  export type CoreSetWeightGroupByOutputType = {
    id: string
    coreSetId: string
    isBodyWeight: boolean
    weight: number | null
    createdAt: Date
    updatedAt: Date
    _count: CoreSetWeightCountAggregateOutputType | null
    _avg: CoreSetWeightAvgAggregateOutputType | null
    _sum: CoreSetWeightSumAggregateOutputType | null
    _min: CoreSetWeightMinAggregateOutputType | null
    _max: CoreSetWeightMaxAggregateOutputType | null
  }

  type GetCoreSetWeightGroupByPayload<T extends CoreSetWeightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CoreSetWeightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoreSetWeightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoreSetWeightGroupByOutputType[P]>
            : GetScalarType<T[P], CoreSetWeightGroupByOutputType[P]>
        }
      >
    >


  export type CoreSetWeightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coreSetId?: boolean
    isBodyWeight?: boolean
    weight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coreSetWeight"]>

  export type CoreSetWeightSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coreSetId?: boolean
    isBodyWeight?: boolean
    weight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coreSetWeight"]>

  export type CoreSetWeightSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coreSetId?: boolean
    isBodyWeight?: boolean
    weight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coreSetWeight"]>

  export type CoreSetWeightSelectScalar = {
    id?: boolean
    coreSetId?: boolean
    isBodyWeight?: boolean
    weight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CoreSetWeightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "coreSetId" | "isBodyWeight" | "weight" | "createdAt" | "updatedAt", ExtArgs["result"]["coreSetWeight"]>
  export type CoreSetWeightInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }
  export type CoreSetWeightIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }
  export type CoreSetWeightIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coreSet?: boolean | CoreSetDefaultArgs<ExtArgs>
  }

  export type $CoreSetWeightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CoreSetWeight"
    objects: {
      coreSet: Prisma.$CoreSetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      coreSetId: string
      isBodyWeight: boolean
      weight: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["coreSetWeight"]>
    composites: {}
  }

  type CoreSetWeightGetPayload<S extends boolean | null | undefined | CoreSetWeightDefaultArgs> = $Result.GetResult<Prisma.$CoreSetWeightPayload, S>

  type CoreSetWeightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CoreSetWeightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CoreSetWeightCountAggregateInputType | true
    }

  export interface CoreSetWeightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CoreSetWeight'], meta: { name: 'CoreSetWeight' } }
    /**
     * Find zero or one CoreSetWeight that matches the filter.
     * @param {CoreSetWeightFindUniqueArgs} args - Arguments to find a CoreSetWeight
     * @example
     * // Get one CoreSetWeight
     * const coreSetWeight = await prisma.coreSetWeight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CoreSetWeightFindUniqueArgs>(args: SelectSubset<T, CoreSetWeightFindUniqueArgs<ExtArgs>>): Prisma__CoreSetWeightClient<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CoreSetWeight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CoreSetWeightFindUniqueOrThrowArgs} args - Arguments to find a CoreSetWeight
     * @example
     * // Get one CoreSetWeight
     * const coreSetWeight = await prisma.coreSetWeight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CoreSetWeightFindUniqueOrThrowArgs>(args: SelectSubset<T, CoreSetWeightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CoreSetWeightClient<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CoreSetWeight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetWeightFindFirstArgs} args - Arguments to find a CoreSetWeight
     * @example
     * // Get one CoreSetWeight
     * const coreSetWeight = await prisma.coreSetWeight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CoreSetWeightFindFirstArgs>(args?: SelectSubset<T, CoreSetWeightFindFirstArgs<ExtArgs>>): Prisma__CoreSetWeightClient<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CoreSetWeight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetWeightFindFirstOrThrowArgs} args - Arguments to find a CoreSetWeight
     * @example
     * // Get one CoreSetWeight
     * const coreSetWeight = await prisma.coreSetWeight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CoreSetWeightFindFirstOrThrowArgs>(args?: SelectSubset<T, CoreSetWeightFindFirstOrThrowArgs<ExtArgs>>): Prisma__CoreSetWeightClient<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CoreSetWeights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetWeightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CoreSetWeights
     * const coreSetWeights = await prisma.coreSetWeight.findMany()
     * 
     * // Get first 10 CoreSetWeights
     * const coreSetWeights = await prisma.coreSetWeight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coreSetWeightWithIdOnly = await prisma.coreSetWeight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CoreSetWeightFindManyArgs>(args?: SelectSubset<T, CoreSetWeightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CoreSetWeight.
     * @param {CoreSetWeightCreateArgs} args - Arguments to create a CoreSetWeight.
     * @example
     * // Create one CoreSetWeight
     * const CoreSetWeight = await prisma.coreSetWeight.create({
     *   data: {
     *     // ... data to create a CoreSetWeight
     *   }
     * })
     * 
     */
    create<T extends CoreSetWeightCreateArgs>(args: SelectSubset<T, CoreSetWeightCreateArgs<ExtArgs>>): Prisma__CoreSetWeightClient<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CoreSetWeights.
     * @param {CoreSetWeightCreateManyArgs} args - Arguments to create many CoreSetWeights.
     * @example
     * // Create many CoreSetWeights
     * const coreSetWeight = await prisma.coreSetWeight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CoreSetWeightCreateManyArgs>(args?: SelectSubset<T, CoreSetWeightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CoreSetWeights and returns the data saved in the database.
     * @param {CoreSetWeightCreateManyAndReturnArgs} args - Arguments to create many CoreSetWeights.
     * @example
     * // Create many CoreSetWeights
     * const coreSetWeight = await prisma.coreSetWeight.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CoreSetWeights and only return the `id`
     * const coreSetWeightWithIdOnly = await prisma.coreSetWeight.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CoreSetWeightCreateManyAndReturnArgs>(args?: SelectSubset<T, CoreSetWeightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CoreSetWeight.
     * @param {CoreSetWeightDeleteArgs} args - Arguments to delete one CoreSetWeight.
     * @example
     * // Delete one CoreSetWeight
     * const CoreSetWeight = await prisma.coreSetWeight.delete({
     *   where: {
     *     // ... filter to delete one CoreSetWeight
     *   }
     * })
     * 
     */
    delete<T extends CoreSetWeightDeleteArgs>(args: SelectSubset<T, CoreSetWeightDeleteArgs<ExtArgs>>): Prisma__CoreSetWeightClient<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CoreSetWeight.
     * @param {CoreSetWeightUpdateArgs} args - Arguments to update one CoreSetWeight.
     * @example
     * // Update one CoreSetWeight
     * const coreSetWeight = await prisma.coreSetWeight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CoreSetWeightUpdateArgs>(args: SelectSubset<T, CoreSetWeightUpdateArgs<ExtArgs>>): Prisma__CoreSetWeightClient<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CoreSetWeights.
     * @param {CoreSetWeightDeleteManyArgs} args - Arguments to filter CoreSetWeights to delete.
     * @example
     * // Delete a few CoreSetWeights
     * const { count } = await prisma.coreSetWeight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CoreSetWeightDeleteManyArgs>(args?: SelectSubset<T, CoreSetWeightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreSetWeights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetWeightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CoreSetWeights
     * const coreSetWeight = await prisma.coreSetWeight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CoreSetWeightUpdateManyArgs>(args: SelectSubset<T, CoreSetWeightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreSetWeights and returns the data updated in the database.
     * @param {CoreSetWeightUpdateManyAndReturnArgs} args - Arguments to update many CoreSetWeights.
     * @example
     * // Update many CoreSetWeights
     * const coreSetWeight = await prisma.coreSetWeight.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CoreSetWeights and only return the `id`
     * const coreSetWeightWithIdOnly = await prisma.coreSetWeight.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CoreSetWeightUpdateManyAndReturnArgs>(args: SelectSubset<T, CoreSetWeightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CoreSetWeight.
     * @param {CoreSetWeightUpsertArgs} args - Arguments to update or create a CoreSetWeight.
     * @example
     * // Update or create a CoreSetWeight
     * const coreSetWeight = await prisma.coreSetWeight.upsert({
     *   create: {
     *     // ... data to create a CoreSetWeight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CoreSetWeight we want to update
     *   }
     * })
     */
    upsert<T extends CoreSetWeightUpsertArgs>(args: SelectSubset<T, CoreSetWeightUpsertArgs<ExtArgs>>): Prisma__CoreSetWeightClient<$Result.GetResult<Prisma.$CoreSetWeightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CoreSetWeights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetWeightCountArgs} args - Arguments to filter CoreSetWeights to count.
     * @example
     * // Count the number of CoreSetWeights
     * const count = await prisma.coreSetWeight.count({
     *   where: {
     *     // ... the filter for the CoreSetWeights we want to count
     *   }
     * })
    **/
    count<T extends CoreSetWeightCountArgs>(
      args?: Subset<T, CoreSetWeightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoreSetWeightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CoreSetWeight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetWeightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CoreSetWeightAggregateArgs>(args: Subset<T, CoreSetWeightAggregateArgs>): Prisma.PrismaPromise<GetCoreSetWeightAggregateType<T>>

    /**
     * Group by CoreSetWeight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreSetWeightGroupByArgs} args - Group by arguments.
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
      T extends CoreSetWeightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoreSetWeightGroupByArgs['orderBy'] }
        : { orderBy?: CoreSetWeightGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoreSetWeightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoreSetWeightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CoreSetWeight model
   */
  readonly fields: CoreSetWeightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CoreSetWeight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CoreSetWeightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coreSet<T extends CoreSetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CoreSetDefaultArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CoreSetWeight model
   */
  interface CoreSetWeightFieldRefs {
    readonly id: FieldRef<"CoreSetWeight", 'String'>
    readonly coreSetId: FieldRef<"CoreSetWeight", 'String'>
    readonly isBodyWeight: FieldRef<"CoreSetWeight", 'Boolean'>
    readonly weight: FieldRef<"CoreSetWeight", 'Float'>
    readonly createdAt: FieldRef<"CoreSetWeight", 'DateTime'>
    readonly updatedAt: FieldRef<"CoreSetWeight", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CoreSetWeight findUnique
   */
  export type CoreSetWeightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
    /**
     * Filter, which CoreSetWeight to fetch.
     */
    where: CoreSetWeightWhereUniqueInput
  }

  /**
   * CoreSetWeight findUniqueOrThrow
   */
  export type CoreSetWeightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
    /**
     * Filter, which CoreSetWeight to fetch.
     */
    where: CoreSetWeightWhereUniqueInput
  }

  /**
   * CoreSetWeight findFirst
   */
  export type CoreSetWeightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
    /**
     * Filter, which CoreSetWeight to fetch.
     */
    where?: CoreSetWeightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSetWeights to fetch.
     */
    orderBy?: CoreSetWeightOrderByWithRelationInput | CoreSetWeightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreSetWeights.
     */
    cursor?: CoreSetWeightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSetWeights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSetWeights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreSetWeights.
     */
    distinct?: CoreSetWeightScalarFieldEnum | CoreSetWeightScalarFieldEnum[]
  }

  /**
   * CoreSetWeight findFirstOrThrow
   */
  export type CoreSetWeightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
    /**
     * Filter, which CoreSetWeight to fetch.
     */
    where?: CoreSetWeightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSetWeights to fetch.
     */
    orderBy?: CoreSetWeightOrderByWithRelationInput | CoreSetWeightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreSetWeights.
     */
    cursor?: CoreSetWeightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSetWeights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSetWeights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreSetWeights.
     */
    distinct?: CoreSetWeightScalarFieldEnum | CoreSetWeightScalarFieldEnum[]
  }

  /**
   * CoreSetWeight findMany
   */
  export type CoreSetWeightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
    /**
     * Filter, which CoreSetWeights to fetch.
     */
    where?: CoreSetWeightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreSetWeights to fetch.
     */
    orderBy?: CoreSetWeightOrderByWithRelationInput | CoreSetWeightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CoreSetWeights.
     */
    cursor?: CoreSetWeightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreSetWeights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreSetWeights.
     */
    skip?: number
    distinct?: CoreSetWeightScalarFieldEnum | CoreSetWeightScalarFieldEnum[]
  }

  /**
   * CoreSetWeight create
   */
  export type CoreSetWeightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
    /**
     * The data needed to create a CoreSetWeight.
     */
    data: XOR<CoreSetWeightCreateInput, CoreSetWeightUncheckedCreateInput>
  }

  /**
   * CoreSetWeight createMany
   */
  export type CoreSetWeightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CoreSetWeights.
     */
    data: CoreSetWeightCreateManyInput | CoreSetWeightCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CoreSetWeight createManyAndReturn
   */
  export type CoreSetWeightCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * The data used to create many CoreSetWeights.
     */
    data: CoreSetWeightCreateManyInput | CoreSetWeightCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CoreSetWeight update
   */
  export type CoreSetWeightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
    /**
     * The data needed to update a CoreSetWeight.
     */
    data: XOR<CoreSetWeightUpdateInput, CoreSetWeightUncheckedUpdateInput>
    /**
     * Choose, which CoreSetWeight to update.
     */
    where: CoreSetWeightWhereUniqueInput
  }

  /**
   * CoreSetWeight updateMany
   */
  export type CoreSetWeightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CoreSetWeights.
     */
    data: XOR<CoreSetWeightUpdateManyMutationInput, CoreSetWeightUncheckedUpdateManyInput>
    /**
     * Filter which CoreSetWeights to update
     */
    where?: CoreSetWeightWhereInput
    /**
     * Limit how many CoreSetWeights to update.
     */
    limit?: number
  }

  /**
   * CoreSetWeight updateManyAndReturn
   */
  export type CoreSetWeightUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * The data used to update CoreSetWeights.
     */
    data: XOR<CoreSetWeightUpdateManyMutationInput, CoreSetWeightUncheckedUpdateManyInput>
    /**
     * Filter which CoreSetWeights to update
     */
    where?: CoreSetWeightWhereInput
    /**
     * Limit how many CoreSetWeights to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CoreSetWeight upsert
   */
  export type CoreSetWeightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
    /**
     * The filter to search for the CoreSetWeight to update in case it exists.
     */
    where: CoreSetWeightWhereUniqueInput
    /**
     * In case the CoreSetWeight found by the `where` argument doesn't exist, create a new CoreSetWeight with this data.
     */
    create: XOR<CoreSetWeightCreateInput, CoreSetWeightUncheckedCreateInput>
    /**
     * In case the CoreSetWeight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CoreSetWeightUpdateInput, CoreSetWeightUncheckedUpdateInput>
  }

  /**
   * CoreSetWeight delete
   */
  export type CoreSetWeightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
    /**
     * Filter which CoreSetWeight to delete.
     */
    where: CoreSetWeightWhereUniqueInput
  }

  /**
   * CoreSetWeight deleteMany
   */
  export type CoreSetWeightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CoreSetWeights to delete
     */
    where?: CoreSetWeightWhereInput
    /**
     * Limit how many CoreSetWeights to delete.
     */
    limit?: number
  }

  /**
   * CoreSetWeight without action
   */
  export type CoreSetWeightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSetWeight
     */
    select?: CoreSetWeightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSetWeight
     */
    omit?: CoreSetWeightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetWeightInclude<ExtArgs> | null
  }


  /**
   * Model UserSet
   */

  export type AggregateUserSet = {
    _count: UserSetCountAggregateOutputType | null
    _avg: UserSetAvgAggregateOutputType | null
    _sum: UserSetSumAggregateOutputType | null
    _min: UserSetMinAggregateOutputType | null
    _max: UserSetMaxAggregateOutputType | null
  }

  export type UserSetAvgAggregateOutputType = {
    reps: number | null
    weight: number | null
    restTime: number | null
    order: number | null
  }

  export type UserSetSumAggregateOutputType = {
    reps: number | null
    weight: number | null
    restTime: number | null
    order: number | null
  }

  export type UserSetMinAggregateOutputType = {
    id: string | null
    reps: number | null
    weight: number | null
    isBodyWeight: boolean | null
    restTime: number | null
    order: number | null
    isCompleted: boolean | null
    isWarmup: boolean | null
    isMuscleFailure: boolean | null
    isJointPain: boolean | null
    userId: string | null
    userWorkoutExerciseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSetMaxAggregateOutputType = {
    id: string | null
    reps: number | null
    weight: number | null
    isBodyWeight: boolean | null
    restTime: number | null
    order: number | null
    isCompleted: boolean | null
    isWarmup: boolean | null
    isMuscleFailure: boolean | null
    isJointPain: boolean | null
    userId: string | null
    userWorkoutExerciseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSetCountAggregateOutputType = {
    id: number
    reps: number
    weight: number
    isBodyWeight: number
    restTime: number
    order: number
    isCompleted: number
    isWarmup: number
    isMuscleFailure: number
    isJointPain: number
    userId: number
    userWorkoutExerciseId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserSetAvgAggregateInputType = {
    reps?: true
    weight?: true
    restTime?: true
    order?: true
  }

  export type UserSetSumAggregateInputType = {
    reps?: true
    weight?: true
    restTime?: true
    order?: true
  }

  export type UserSetMinAggregateInputType = {
    id?: true
    reps?: true
    weight?: true
    isBodyWeight?: true
    restTime?: true
    order?: true
    isCompleted?: true
    isWarmup?: true
    isMuscleFailure?: true
    isJointPain?: true
    userId?: true
    userWorkoutExerciseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSetMaxAggregateInputType = {
    id?: true
    reps?: true
    weight?: true
    isBodyWeight?: true
    restTime?: true
    order?: true
    isCompleted?: true
    isWarmup?: true
    isMuscleFailure?: true
    isJointPain?: true
    userId?: true
    userWorkoutExerciseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSetCountAggregateInputType = {
    id?: true
    reps?: true
    weight?: true
    isBodyWeight?: true
    restTime?: true
    order?: true
    isCompleted?: true
    isWarmup?: true
    isMuscleFailure?: true
    isJointPain?: true
    userId?: true
    userWorkoutExerciseId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserSetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSet to aggregate.
     */
    where?: UserSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSets to fetch.
     */
    orderBy?: UserSetOrderByWithRelationInput | UserSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSets
    **/
    _count?: true | UserSetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserSetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSetMaxAggregateInputType
  }

  export type GetUserSetAggregateType<T extends UserSetAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSet[P]>
      : GetScalarType<T[P], AggregateUserSet[P]>
  }




  export type UserSetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSetWhereInput
    orderBy?: UserSetOrderByWithAggregationInput | UserSetOrderByWithAggregationInput[]
    by: UserSetScalarFieldEnum[] | UserSetScalarFieldEnum
    having?: UserSetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSetCountAggregateInputType | true
    _avg?: UserSetAvgAggregateInputType
    _sum?: UserSetSumAggregateInputType
    _min?: UserSetMinAggregateInputType
    _max?: UserSetMaxAggregateInputType
  }

  export type UserSetGroupByOutputType = {
    id: string
    reps: number
    weight: number | null
    isBodyWeight: boolean
    restTime: number
    order: number
    isCompleted: boolean
    isWarmup: boolean
    isMuscleFailure: boolean
    isJointPain: boolean
    userId: string
    userWorkoutExerciseId: string
    createdAt: Date
    updatedAt: Date
    _count: UserSetCountAggregateOutputType | null
    _avg: UserSetAvgAggregateOutputType | null
    _sum: UserSetSumAggregateOutputType | null
    _min: UserSetMinAggregateOutputType | null
    _max: UserSetMaxAggregateOutputType | null
  }

  type GetUserSetGroupByPayload<T extends UserSetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSetGroupByOutputType[P]>
            : GetScalarType<T[P], UserSetGroupByOutputType[P]>
        }
      >
    >


  export type UserSetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reps?: boolean
    weight?: boolean
    isBodyWeight?: boolean
    restTime?: boolean
    order?: boolean
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    userId?: boolean
    userWorkoutExerciseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    userWorkoutExercise?: boolean | UserWorkoutExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSet"]>

  export type UserSetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reps?: boolean
    weight?: boolean
    isBodyWeight?: boolean
    restTime?: boolean
    order?: boolean
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    userId?: boolean
    userWorkoutExerciseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    userWorkoutExercise?: boolean | UserWorkoutExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSet"]>

  export type UserSetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reps?: boolean
    weight?: boolean
    isBodyWeight?: boolean
    restTime?: boolean
    order?: boolean
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    userId?: boolean
    userWorkoutExerciseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    userWorkoutExercise?: boolean | UserWorkoutExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSet"]>

  export type UserSetSelectScalar = {
    id?: boolean
    reps?: boolean
    weight?: boolean
    isBodyWeight?: boolean
    restTime?: boolean
    order?: boolean
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    userId?: boolean
    userWorkoutExerciseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserSetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reps" | "weight" | "isBodyWeight" | "restTime" | "order" | "isCompleted" | "isWarmup" | "isMuscleFailure" | "isJointPain" | "userId" | "userWorkoutExerciseId" | "createdAt" | "updatedAt", ExtArgs["result"]["userSet"]>
  export type UserSetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    userWorkoutExercise?: boolean | UserWorkoutExerciseDefaultArgs<ExtArgs>
  }
  export type UserSetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    userWorkoutExercise?: boolean | UserWorkoutExerciseDefaultArgs<ExtArgs>
  }
  export type UserSetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    userWorkoutExercise?: boolean | UserWorkoutExerciseDefaultArgs<ExtArgs>
  }

  export type $UserSetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      userWorkoutExercise: Prisma.$UserWorkoutExercisePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reps: number
      weight: number | null
      isBodyWeight: boolean
      restTime: number
      order: number
      isCompleted: boolean
      isWarmup: boolean
      isMuscleFailure: boolean
      isJointPain: boolean
      userId: string
      userWorkoutExerciseId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userSet"]>
    composites: {}
  }

  type UserSetGetPayload<S extends boolean | null | undefined | UserSetDefaultArgs> = $Result.GetResult<Prisma.$UserSetPayload, S>

  type UserSetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSetCountAggregateInputType | true
    }

  export interface UserSetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSet'], meta: { name: 'UserSet' } }
    /**
     * Find zero or one UserSet that matches the filter.
     * @param {UserSetFindUniqueArgs} args - Arguments to find a UserSet
     * @example
     * // Get one UserSet
     * const userSet = await prisma.userSet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSetFindUniqueArgs>(args: SelectSubset<T, UserSetFindUniqueArgs<ExtArgs>>): Prisma__UserSetClient<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSetFindUniqueOrThrowArgs} args - Arguments to find a UserSet
     * @example
     * // Get one UserSet
     * const userSet = await prisma.userSet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSetFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSetClient<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSetFindFirstArgs} args - Arguments to find a UserSet
     * @example
     * // Get one UserSet
     * const userSet = await prisma.userSet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSetFindFirstArgs>(args?: SelectSubset<T, UserSetFindFirstArgs<ExtArgs>>): Prisma__UserSetClient<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSetFindFirstOrThrowArgs} args - Arguments to find a UserSet
     * @example
     * // Get one UserSet
     * const userSet = await prisma.userSet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSetFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSetFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSetClient<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSets
     * const userSets = await prisma.userSet.findMany()
     * 
     * // Get first 10 UserSets
     * const userSets = await prisma.userSet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSetWithIdOnly = await prisma.userSet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSetFindManyArgs>(args?: SelectSubset<T, UserSetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSet.
     * @param {UserSetCreateArgs} args - Arguments to create a UserSet.
     * @example
     * // Create one UserSet
     * const UserSet = await prisma.userSet.create({
     *   data: {
     *     // ... data to create a UserSet
     *   }
     * })
     * 
     */
    create<T extends UserSetCreateArgs>(args: SelectSubset<T, UserSetCreateArgs<ExtArgs>>): Prisma__UserSetClient<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSets.
     * @param {UserSetCreateManyArgs} args - Arguments to create many UserSets.
     * @example
     * // Create many UserSets
     * const userSet = await prisma.userSet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSetCreateManyArgs>(args?: SelectSubset<T, UserSetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSets and returns the data saved in the database.
     * @param {UserSetCreateManyAndReturnArgs} args - Arguments to create many UserSets.
     * @example
     * // Create many UserSets
     * const userSet = await prisma.userSet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSets and only return the `id`
     * const userSetWithIdOnly = await prisma.userSet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSetCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSet.
     * @param {UserSetDeleteArgs} args - Arguments to delete one UserSet.
     * @example
     * // Delete one UserSet
     * const UserSet = await prisma.userSet.delete({
     *   where: {
     *     // ... filter to delete one UserSet
     *   }
     * })
     * 
     */
    delete<T extends UserSetDeleteArgs>(args: SelectSubset<T, UserSetDeleteArgs<ExtArgs>>): Prisma__UserSetClient<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSet.
     * @param {UserSetUpdateArgs} args - Arguments to update one UserSet.
     * @example
     * // Update one UserSet
     * const userSet = await prisma.userSet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSetUpdateArgs>(args: SelectSubset<T, UserSetUpdateArgs<ExtArgs>>): Prisma__UserSetClient<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSets.
     * @param {UserSetDeleteManyArgs} args - Arguments to filter UserSets to delete.
     * @example
     * // Delete a few UserSets
     * const { count } = await prisma.userSet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSetDeleteManyArgs>(args?: SelectSubset<T, UserSetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSets
     * const userSet = await prisma.userSet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSetUpdateManyArgs>(args: SelectSubset<T, UserSetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSets and returns the data updated in the database.
     * @param {UserSetUpdateManyAndReturnArgs} args - Arguments to update many UserSets.
     * @example
     * // Update many UserSets
     * const userSet = await prisma.userSet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSets and only return the `id`
     * const userSetWithIdOnly = await prisma.userSet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSetUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSet.
     * @param {UserSetUpsertArgs} args - Arguments to update or create a UserSet.
     * @example
     * // Update or create a UserSet
     * const userSet = await prisma.userSet.upsert({
     *   create: {
     *     // ... data to create a UserSet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSet we want to update
     *   }
     * })
     */
    upsert<T extends UserSetUpsertArgs>(args: SelectSubset<T, UserSetUpsertArgs<ExtArgs>>): Prisma__UserSetClient<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSetCountArgs} args - Arguments to filter UserSets to count.
     * @example
     * // Count the number of UserSets
     * const count = await prisma.userSet.count({
     *   where: {
     *     // ... the filter for the UserSets we want to count
     *   }
     * })
    **/
    count<T extends UserSetCountArgs>(
      args?: Subset<T, UserSetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserSetAggregateArgs>(args: Subset<T, UserSetAggregateArgs>): Prisma.PrismaPromise<GetUserSetAggregateType<T>>

    /**
     * Group by UserSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSetGroupByArgs} args - Group by arguments.
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
      T extends UserSetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSetGroupByArgs['orderBy'] }
        : { orderBy?: UserSetGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSet model
   */
  readonly fields: UserSetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userWorkoutExercise<T extends UserWorkoutExerciseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserWorkoutExerciseDefaultArgs<ExtArgs>>): Prisma__UserWorkoutExerciseClient<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSet model
   */
  interface UserSetFieldRefs {
    readonly id: FieldRef<"UserSet", 'String'>
    readonly reps: FieldRef<"UserSet", 'Int'>
    readonly weight: FieldRef<"UserSet", 'Float'>
    readonly isBodyWeight: FieldRef<"UserSet", 'Boolean'>
    readonly restTime: FieldRef<"UserSet", 'Int'>
    readonly order: FieldRef<"UserSet", 'Int'>
    readonly isCompleted: FieldRef<"UserSet", 'Boolean'>
    readonly isWarmup: FieldRef<"UserSet", 'Boolean'>
    readonly isMuscleFailure: FieldRef<"UserSet", 'Boolean'>
    readonly isJointPain: FieldRef<"UserSet", 'Boolean'>
    readonly userId: FieldRef<"UserSet", 'String'>
    readonly userWorkoutExerciseId: FieldRef<"UserSet", 'String'>
    readonly createdAt: FieldRef<"UserSet", 'DateTime'>
    readonly updatedAt: FieldRef<"UserSet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSet findUnique
   */
  export type UserSetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    /**
     * Filter, which UserSet to fetch.
     */
    where: UserSetWhereUniqueInput
  }

  /**
   * UserSet findUniqueOrThrow
   */
  export type UserSetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    /**
     * Filter, which UserSet to fetch.
     */
    where: UserSetWhereUniqueInput
  }

  /**
   * UserSet findFirst
   */
  export type UserSetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    /**
     * Filter, which UserSet to fetch.
     */
    where?: UserSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSets to fetch.
     */
    orderBy?: UserSetOrderByWithRelationInput | UserSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSets.
     */
    cursor?: UserSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSets.
     */
    distinct?: UserSetScalarFieldEnum | UserSetScalarFieldEnum[]
  }

  /**
   * UserSet findFirstOrThrow
   */
  export type UserSetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    /**
     * Filter, which UserSet to fetch.
     */
    where?: UserSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSets to fetch.
     */
    orderBy?: UserSetOrderByWithRelationInput | UserSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSets.
     */
    cursor?: UserSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSets.
     */
    distinct?: UserSetScalarFieldEnum | UserSetScalarFieldEnum[]
  }

  /**
   * UserSet findMany
   */
  export type UserSetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    /**
     * Filter, which UserSets to fetch.
     */
    where?: UserSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSets to fetch.
     */
    orderBy?: UserSetOrderByWithRelationInput | UserSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSets.
     */
    cursor?: UserSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSets.
     */
    skip?: number
    distinct?: UserSetScalarFieldEnum | UserSetScalarFieldEnum[]
  }

  /**
   * UserSet create
   */
  export type UserSetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSet.
     */
    data: XOR<UserSetCreateInput, UserSetUncheckedCreateInput>
  }

  /**
   * UserSet createMany
   */
  export type UserSetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSets.
     */
    data: UserSetCreateManyInput | UserSetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSet createManyAndReturn
   */
  export type UserSetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * The data used to create many UserSets.
     */
    data: UserSetCreateManyInput | UserSetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSet update
   */
  export type UserSetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSet.
     */
    data: XOR<UserSetUpdateInput, UserSetUncheckedUpdateInput>
    /**
     * Choose, which UserSet to update.
     */
    where: UserSetWhereUniqueInput
  }

  /**
   * UserSet updateMany
   */
  export type UserSetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSets.
     */
    data: XOR<UserSetUpdateManyMutationInput, UserSetUncheckedUpdateManyInput>
    /**
     * Filter which UserSets to update
     */
    where?: UserSetWhereInput
    /**
     * Limit how many UserSets to update.
     */
    limit?: number
  }

  /**
   * UserSet updateManyAndReturn
   */
  export type UserSetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * The data used to update UserSets.
     */
    data: XOR<UserSetUpdateManyMutationInput, UserSetUncheckedUpdateManyInput>
    /**
     * Filter which UserSets to update
     */
    where?: UserSetWhereInput
    /**
     * Limit how many UserSets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSet upsert
   */
  export type UserSetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSet to update in case it exists.
     */
    where: UserSetWhereUniqueInput
    /**
     * In case the UserSet found by the `where` argument doesn't exist, create a new UserSet with this data.
     */
    create: XOR<UserSetCreateInput, UserSetUncheckedCreateInput>
    /**
     * In case the UserSet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSetUpdateInput, UserSetUncheckedUpdateInput>
  }

  /**
   * UserSet delete
   */
  export type UserSetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    /**
     * Filter which UserSet to delete.
     */
    where: UserSetWhereUniqueInput
  }

  /**
   * UserSet deleteMany
   */
  export type UserSetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSets to delete
     */
    where?: UserSetWhereInput
    /**
     * Limit how many UserSets to delete.
     */
    limit?: number
  }

  /**
   * UserSet without action
   */
  export type UserSetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
  }


  /**
   * Model Program
   */

  export type AggregateProgram = {
    _count: ProgramCountAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  export type ProgramMinAggregateOutputType = {
    id: string | null
    name: string | null
    notes: string | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgramMaxAggregateOutputType = {
    id: string | null
    name: string | null
    notes: string | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgramCountAggregateOutputType = {
    id: number
    name: number
    notes: number
    startDate: number
    endDate: number
    isActive: number
    ownerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProgramMinAggregateInputType = {
    id?: true
    name?: true
    notes?: true
    startDate?: true
    endDate?: true
    isActive?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgramMaxAggregateInputType = {
    id?: true
    name?: true
    notes?: true
    startDate?: true
    endDate?: true
    isActive?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgramCountAggregateInputType = {
    id?: true
    name?: true
    notes?: true
    startDate?: true
    endDate?: true
    isActive?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProgramAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Program to aggregate.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Programs
    **/
    _count?: true | ProgramCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramMaxAggregateInputType
  }

  export type GetProgramAggregateType<T extends ProgramAggregateArgs> = {
        [P in keyof T & keyof AggregateProgram]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgram[P]>
      : GetScalarType<T[P], AggregateProgram[P]>
  }




  export type ProgramGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWhereInput
    orderBy?: ProgramOrderByWithAggregationInput | ProgramOrderByWithAggregationInput[]
    by: ProgramScalarFieldEnum[] | ProgramScalarFieldEnum
    having?: ProgramScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramCountAggregateInputType | true
    _min?: ProgramMinAggregateInputType
    _max?: ProgramMaxAggregateInputType
  }

  export type ProgramGroupByOutputType = {
    id: string
    name: string
    notes: string | null
    startDate: Date
    endDate: Date
    isActive: boolean
    ownerId: string
    createdAt: Date
    updatedAt: Date
    _count: ProgramCountAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  type GetProgramGroupByPayload<T extends ProgramGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramGroupByOutputType[P]>
        }
      >
    >


  export type ProgramSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    notes?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    programWorkouts?: boolean | Program$programWorkoutsArgs<ExtArgs>
    userWorkout?: boolean | Program$userWorkoutArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    notes?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    notes?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectScalar = {
    id?: boolean
    name?: boolean
    notes?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProgramOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "notes" | "startDate" | "endDate" | "isActive" | "ownerId" | "createdAt" | "updatedAt", ExtArgs["result"]["program"]>
  export type ProgramInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    programWorkouts?: boolean | Program$programWorkoutsArgs<ExtArgs>
    userWorkout?: boolean | Program$userWorkoutArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProgramIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProgramIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProgramPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Program"
    objects: {
      programWorkouts: Prisma.$ProgramWorkoutPayload<ExtArgs>[]
      userWorkout: Prisma.$UserWorkoutPayload<ExtArgs>[]
      owner: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      notes: string | null
      startDate: Date
      endDate: Date
      isActive: boolean
      ownerId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["program"]>
    composites: {}
  }

  type ProgramGetPayload<S extends boolean | null | undefined | ProgramDefaultArgs> = $Result.GetResult<Prisma.$ProgramPayload, S>

  type ProgramCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgramFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgramCountAggregateInputType | true
    }

  export interface ProgramDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Program'], meta: { name: 'Program' } }
    /**
     * Find zero or one Program that matches the filter.
     * @param {ProgramFindUniqueArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgramFindUniqueArgs>(args: SelectSubset<T, ProgramFindUniqueArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Program that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgramFindUniqueOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgramFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgramFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Program that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgramFindFirstArgs>(args?: SelectSubset<T, ProgramFindFirstArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Program that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgramFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgramFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Programs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Programs
     * const programs = await prisma.program.findMany()
     * 
     * // Get first 10 Programs
     * const programs = await prisma.program.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const programWithIdOnly = await prisma.program.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgramFindManyArgs>(args?: SelectSubset<T, ProgramFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Program.
     * @param {ProgramCreateArgs} args - Arguments to create a Program.
     * @example
     * // Create one Program
     * const Program = await prisma.program.create({
     *   data: {
     *     // ... data to create a Program
     *   }
     * })
     * 
     */
    create<T extends ProgramCreateArgs>(args: SelectSubset<T, ProgramCreateArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Programs.
     * @param {ProgramCreateManyArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgramCreateManyArgs>(args?: SelectSubset<T, ProgramCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Programs and returns the data saved in the database.
     * @param {ProgramCreateManyAndReturnArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Programs and only return the `id`
     * const programWithIdOnly = await prisma.program.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgramCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgramCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Program.
     * @param {ProgramDeleteArgs} args - Arguments to delete one Program.
     * @example
     * // Delete one Program
     * const Program = await prisma.program.delete({
     *   where: {
     *     // ... filter to delete one Program
     *   }
     * })
     * 
     */
    delete<T extends ProgramDeleteArgs>(args: SelectSubset<T, ProgramDeleteArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Program.
     * @param {ProgramUpdateArgs} args - Arguments to update one Program.
     * @example
     * // Update one Program
     * const program = await prisma.program.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgramUpdateArgs>(args: SelectSubset<T, ProgramUpdateArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Programs.
     * @param {ProgramDeleteManyArgs} args - Arguments to filter Programs to delete.
     * @example
     * // Delete a few Programs
     * const { count } = await prisma.program.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgramDeleteManyArgs>(args?: SelectSubset<T, ProgramDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgramUpdateManyArgs>(args: SelectSubset<T, ProgramUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs and returns the data updated in the database.
     * @param {ProgramUpdateManyAndReturnArgs} args - Arguments to update many Programs.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Programs and only return the `id`
     * const programWithIdOnly = await prisma.program.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgramUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgramUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Program.
     * @param {ProgramUpsertArgs} args - Arguments to update or create a Program.
     * @example
     * // Update or create a Program
     * const program = await prisma.program.upsert({
     *   create: {
     *     // ... data to create a Program
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Program we want to update
     *   }
     * })
     */
    upsert<T extends ProgramUpsertArgs>(args: SelectSubset<T, ProgramUpsertArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramCountArgs} args - Arguments to filter Programs to count.
     * @example
     * // Count the number of Programs
     * const count = await prisma.program.count({
     *   where: {
     *     // ... the filter for the Programs we want to count
     *   }
     * })
    **/
    count<T extends ProgramCountArgs>(
      args?: Subset<T, ProgramCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProgramAggregateArgs>(args: Subset<T, ProgramAggregateArgs>): Prisma.PrismaPromise<GetProgramAggregateType<T>>

    /**
     * Group by Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramGroupByArgs} args - Group by arguments.
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
      T extends ProgramGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgramGroupByArgs['orderBy'] }
        : { orderBy?: ProgramGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgramGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Program model
   */
  readonly fields: ProgramFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Program.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgramClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    programWorkouts<T extends Program$programWorkoutsArgs<ExtArgs> = {}>(args?: Subset<T, Program$programWorkoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userWorkout<T extends Program$userWorkoutArgs<ExtArgs> = {}>(args?: Subset<T, Program$userWorkoutArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Program model
   */
  interface ProgramFieldRefs {
    readonly id: FieldRef<"Program", 'String'>
    readonly name: FieldRef<"Program", 'String'>
    readonly notes: FieldRef<"Program", 'String'>
    readonly startDate: FieldRef<"Program", 'DateTime'>
    readonly endDate: FieldRef<"Program", 'DateTime'>
    readonly isActive: FieldRef<"Program", 'Boolean'>
    readonly ownerId: FieldRef<"Program", 'String'>
    readonly createdAt: FieldRef<"Program", 'DateTime'>
    readonly updatedAt: FieldRef<"Program", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Program findUnique
   */
  export type ProgramFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findUniqueOrThrow
   */
  export type ProgramFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findFirst
   */
  export type ProgramFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findFirstOrThrow
   */
  export type ProgramFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findMany
   */
  export type ProgramFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Programs to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program create
   */
  export type ProgramCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to create a Program.
     */
    data: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
  }

  /**
   * Program createMany
   */
  export type ProgramCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Program createManyAndReturn
   */
  export type ProgramCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Program update
   */
  export type ProgramUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to update a Program.
     */
    data: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
    /**
     * Choose, which Program to update.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program updateMany
   */
  export type ProgramUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Programs.
     */
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyInput>
    /**
     * Filter which Programs to update
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to update.
     */
    limit?: number
  }

  /**
   * Program updateManyAndReturn
   */
  export type ProgramUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * The data used to update Programs.
     */
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyInput>
    /**
     * Filter which Programs to update
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Program upsert
   */
  export type ProgramUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The filter to search for the Program to update in case it exists.
     */
    where: ProgramWhereUniqueInput
    /**
     * In case the Program found by the `where` argument doesn't exist, create a new Program with this data.
     */
    create: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
    /**
     * In case the Program was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
  }

  /**
   * Program delete
   */
  export type ProgramDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter which Program to delete.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program deleteMany
   */
  export type ProgramDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Programs to delete
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to delete.
     */
    limit?: number
  }

  /**
   * Program.programWorkouts
   */
  export type Program$programWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    where?: ProgramWorkoutWhereInput
    orderBy?: ProgramWorkoutOrderByWithRelationInput | ProgramWorkoutOrderByWithRelationInput[]
    cursor?: ProgramWorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgramWorkoutScalarFieldEnum | ProgramWorkoutScalarFieldEnum[]
  }

  /**
   * Program.userWorkout
   */
  export type Program$userWorkoutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    where?: UserWorkoutWhereInput
    orderBy?: UserWorkoutOrderByWithRelationInput | UserWorkoutOrderByWithRelationInput[]
    cursor?: UserWorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWorkoutScalarFieldEnum | UserWorkoutScalarFieldEnum[]
  }

  /**
   * Program without action
   */
  export type ProgramDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
  }


  /**
   * Model ProgramWorkout
   */

  export type AggregateProgramWorkout = {
    _count: ProgramWorkoutCountAggregateOutputType | null
    _min: ProgramWorkoutMinAggregateOutputType | null
    _max: ProgramWorkoutMaxAggregateOutputType | null
  }

  export type ProgramWorkoutMinAggregateOutputType = {
    id: string | null
    programId: string | null
    workoutId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgramWorkoutMaxAggregateOutputType = {
    id: string | null
    programId: string | null
    workoutId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgramWorkoutCountAggregateOutputType = {
    id: number
    programId: number
    workoutId: number
    daysOfWeek: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProgramWorkoutMinAggregateInputType = {
    id?: true
    programId?: true
    workoutId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgramWorkoutMaxAggregateInputType = {
    id?: true
    programId?: true
    workoutId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgramWorkoutCountAggregateInputType = {
    id?: true
    programId?: true
    workoutId?: true
    daysOfWeek?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProgramWorkoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgramWorkout to aggregate.
     */
    where?: ProgramWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramWorkouts to fetch.
     */
    orderBy?: ProgramWorkoutOrderByWithRelationInput | ProgramWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgramWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProgramWorkouts
    **/
    _count?: true | ProgramWorkoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramWorkoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramWorkoutMaxAggregateInputType
  }

  export type GetProgramWorkoutAggregateType<T extends ProgramWorkoutAggregateArgs> = {
        [P in keyof T & keyof AggregateProgramWorkout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgramWorkout[P]>
      : GetScalarType<T[P], AggregateProgramWorkout[P]>
  }




  export type ProgramWorkoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWorkoutWhereInput
    orderBy?: ProgramWorkoutOrderByWithAggregationInput | ProgramWorkoutOrderByWithAggregationInput[]
    by: ProgramWorkoutScalarFieldEnum[] | ProgramWorkoutScalarFieldEnum
    having?: ProgramWorkoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramWorkoutCountAggregateInputType | true
    _min?: ProgramWorkoutMinAggregateInputType
    _max?: ProgramWorkoutMaxAggregateInputType
  }

  export type ProgramWorkoutGroupByOutputType = {
    id: string
    programId: string
    workoutId: string
    daysOfWeek: $Enums.DaysOfWeek[]
    createdAt: Date
    updatedAt: Date
    _count: ProgramWorkoutCountAggregateOutputType | null
    _min: ProgramWorkoutMinAggregateOutputType | null
    _max: ProgramWorkoutMaxAggregateOutputType | null
  }

  type GetProgramWorkoutGroupByPayload<T extends ProgramWorkoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramWorkoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramWorkoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramWorkoutGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramWorkoutGroupByOutputType[P]>
        }
      >
    >


  export type ProgramWorkoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    workoutId?: boolean
    daysOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["programWorkout"]>

  export type ProgramWorkoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    workoutId?: boolean
    daysOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["programWorkout"]>

  export type ProgramWorkoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    workoutId?: boolean
    daysOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["programWorkout"]>

  export type ProgramWorkoutSelectScalar = {
    id?: boolean
    programId?: boolean
    workoutId?: boolean
    daysOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProgramWorkoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "programId" | "workoutId" | "daysOfWeek" | "createdAt" | "updatedAt", ExtArgs["result"]["programWorkout"]>
  export type ProgramWorkoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }
  export type ProgramWorkoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }
  export type ProgramWorkoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }

  export type $ProgramWorkoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProgramWorkout"
    objects: {
      program: Prisma.$ProgramPayload<ExtArgs>
      workout: Prisma.$WorkoutPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      programId: string
      workoutId: string
      daysOfWeek: $Enums.DaysOfWeek[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["programWorkout"]>
    composites: {}
  }

  type ProgramWorkoutGetPayload<S extends boolean | null | undefined | ProgramWorkoutDefaultArgs> = $Result.GetResult<Prisma.$ProgramWorkoutPayload, S>

  type ProgramWorkoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgramWorkoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgramWorkoutCountAggregateInputType | true
    }

  export interface ProgramWorkoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProgramWorkout'], meta: { name: 'ProgramWorkout' } }
    /**
     * Find zero or one ProgramWorkout that matches the filter.
     * @param {ProgramWorkoutFindUniqueArgs} args - Arguments to find a ProgramWorkout
     * @example
     * // Get one ProgramWorkout
     * const programWorkout = await prisma.programWorkout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgramWorkoutFindUniqueArgs>(args: SelectSubset<T, ProgramWorkoutFindUniqueArgs<ExtArgs>>): Prisma__ProgramWorkoutClient<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProgramWorkout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgramWorkoutFindUniqueOrThrowArgs} args - Arguments to find a ProgramWorkout
     * @example
     * // Get one ProgramWorkout
     * const programWorkout = await prisma.programWorkout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgramWorkoutFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgramWorkoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgramWorkoutClient<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgramWorkout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramWorkoutFindFirstArgs} args - Arguments to find a ProgramWorkout
     * @example
     * // Get one ProgramWorkout
     * const programWorkout = await prisma.programWorkout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgramWorkoutFindFirstArgs>(args?: SelectSubset<T, ProgramWorkoutFindFirstArgs<ExtArgs>>): Prisma__ProgramWorkoutClient<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgramWorkout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramWorkoutFindFirstOrThrowArgs} args - Arguments to find a ProgramWorkout
     * @example
     * // Get one ProgramWorkout
     * const programWorkout = await prisma.programWorkout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgramWorkoutFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgramWorkoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgramWorkoutClient<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProgramWorkouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramWorkoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProgramWorkouts
     * const programWorkouts = await prisma.programWorkout.findMany()
     * 
     * // Get first 10 ProgramWorkouts
     * const programWorkouts = await prisma.programWorkout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const programWorkoutWithIdOnly = await prisma.programWorkout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgramWorkoutFindManyArgs>(args?: SelectSubset<T, ProgramWorkoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProgramWorkout.
     * @param {ProgramWorkoutCreateArgs} args - Arguments to create a ProgramWorkout.
     * @example
     * // Create one ProgramWorkout
     * const ProgramWorkout = await prisma.programWorkout.create({
     *   data: {
     *     // ... data to create a ProgramWorkout
     *   }
     * })
     * 
     */
    create<T extends ProgramWorkoutCreateArgs>(args: SelectSubset<T, ProgramWorkoutCreateArgs<ExtArgs>>): Prisma__ProgramWorkoutClient<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProgramWorkouts.
     * @param {ProgramWorkoutCreateManyArgs} args - Arguments to create many ProgramWorkouts.
     * @example
     * // Create many ProgramWorkouts
     * const programWorkout = await prisma.programWorkout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgramWorkoutCreateManyArgs>(args?: SelectSubset<T, ProgramWorkoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProgramWorkouts and returns the data saved in the database.
     * @param {ProgramWorkoutCreateManyAndReturnArgs} args - Arguments to create many ProgramWorkouts.
     * @example
     * // Create many ProgramWorkouts
     * const programWorkout = await prisma.programWorkout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProgramWorkouts and only return the `id`
     * const programWorkoutWithIdOnly = await prisma.programWorkout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgramWorkoutCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgramWorkoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProgramWorkout.
     * @param {ProgramWorkoutDeleteArgs} args - Arguments to delete one ProgramWorkout.
     * @example
     * // Delete one ProgramWorkout
     * const ProgramWorkout = await prisma.programWorkout.delete({
     *   where: {
     *     // ... filter to delete one ProgramWorkout
     *   }
     * })
     * 
     */
    delete<T extends ProgramWorkoutDeleteArgs>(args: SelectSubset<T, ProgramWorkoutDeleteArgs<ExtArgs>>): Prisma__ProgramWorkoutClient<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProgramWorkout.
     * @param {ProgramWorkoutUpdateArgs} args - Arguments to update one ProgramWorkout.
     * @example
     * // Update one ProgramWorkout
     * const programWorkout = await prisma.programWorkout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgramWorkoutUpdateArgs>(args: SelectSubset<T, ProgramWorkoutUpdateArgs<ExtArgs>>): Prisma__ProgramWorkoutClient<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProgramWorkouts.
     * @param {ProgramWorkoutDeleteManyArgs} args - Arguments to filter ProgramWorkouts to delete.
     * @example
     * // Delete a few ProgramWorkouts
     * const { count } = await prisma.programWorkout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgramWorkoutDeleteManyArgs>(args?: SelectSubset<T, ProgramWorkoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgramWorkouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramWorkoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProgramWorkouts
     * const programWorkout = await prisma.programWorkout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgramWorkoutUpdateManyArgs>(args: SelectSubset<T, ProgramWorkoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgramWorkouts and returns the data updated in the database.
     * @param {ProgramWorkoutUpdateManyAndReturnArgs} args - Arguments to update many ProgramWorkouts.
     * @example
     * // Update many ProgramWorkouts
     * const programWorkout = await prisma.programWorkout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProgramWorkouts and only return the `id`
     * const programWorkoutWithIdOnly = await prisma.programWorkout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgramWorkoutUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgramWorkoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProgramWorkout.
     * @param {ProgramWorkoutUpsertArgs} args - Arguments to update or create a ProgramWorkout.
     * @example
     * // Update or create a ProgramWorkout
     * const programWorkout = await prisma.programWorkout.upsert({
     *   create: {
     *     // ... data to create a ProgramWorkout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProgramWorkout we want to update
     *   }
     * })
     */
    upsert<T extends ProgramWorkoutUpsertArgs>(args: SelectSubset<T, ProgramWorkoutUpsertArgs<ExtArgs>>): Prisma__ProgramWorkoutClient<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProgramWorkouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramWorkoutCountArgs} args - Arguments to filter ProgramWorkouts to count.
     * @example
     * // Count the number of ProgramWorkouts
     * const count = await prisma.programWorkout.count({
     *   where: {
     *     // ... the filter for the ProgramWorkouts we want to count
     *   }
     * })
    **/
    count<T extends ProgramWorkoutCountArgs>(
      args?: Subset<T, ProgramWorkoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramWorkoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProgramWorkout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramWorkoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProgramWorkoutAggregateArgs>(args: Subset<T, ProgramWorkoutAggregateArgs>): Prisma.PrismaPromise<GetProgramWorkoutAggregateType<T>>

    /**
     * Group by ProgramWorkout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramWorkoutGroupByArgs} args - Group by arguments.
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
      T extends ProgramWorkoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgramWorkoutGroupByArgs['orderBy'] }
        : { orderBy?: ProgramWorkoutGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgramWorkoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramWorkoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProgramWorkout model
   */
  readonly fields: ProgramWorkoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProgramWorkout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgramWorkoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    program<T extends ProgramDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProgramDefaultArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workout<T extends WorkoutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutDefaultArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProgramWorkout model
   */
  interface ProgramWorkoutFieldRefs {
    readonly id: FieldRef<"ProgramWorkout", 'String'>
    readonly programId: FieldRef<"ProgramWorkout", 'String'>
    readonly workoutId: FieldRef<"ProgramWorkout", 'String'>
    readonly daysOfWeek: FieldRef<"ProgramWorkout", 'DaysOfWeek[]'>
    readonly createdAt: FieldRef<"ProgramWorkout", 'DateTime'>
    readonly updatedAt: FieldRef<"ProgramWorkout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProgramWorkout findUnique
   */
  export type ProgramWorkoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which ProgramWorkout to fetch.
     */
    where: ProgramWorkoutWhereUniqueInput
  }

  /**
   * ProgramWorkout findUniqueOrThrow
   */
  export type ProgramWorkoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which ProgramWorkout to fetch.
     */
    where: ProgramWorkoutWhereUniqueInput
  }

  /**
   * ProgramWorkout findFirst
   */
  export type ProgramWorkoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which ProgramWorkout to fetch.
     */
    where?: ProgramWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramWorkouts to fetch.
     */
    orderBy?: ProgramWorkoutOrderByWithRelationInput | ProgramWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgramWorkouts.
     */
    cursor?: ProgramWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgramWorkouts.
     */
    distinct?: ProgramWorkoutScalarFieldEnum | ProgramWorkoutScalarFieldEnum[]
  }

  /**
   * ProgramWorkout findFirstOrThrow
   */
  export type ProgramWorkoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which ProgramWorkout to fetch.
     */
    where?: ProgramWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramWorkouts to fetch.
     */
    orderBy?: ProgramWorkoutOrderByWithRelationInput | ProgramWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgramWorkouts.
     */
    cursor?: ProgramWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgramWorkouts.
     */
    distinct?: ProgramWorkoutScalarFieldEnum | ProgramWorkoutScalarFieldEnum[]
  }

  /**
   * ProgramWorkout findMany
   */
  export type ProgramWorkoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which ProgramWorkouts to fetch.
     */
    where?: ProgramWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramWorkouts to fetch.
     */
    orderBy?: ProgramWorkoutOrderByWithRelationInput | ProgramWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProgramWorkouts.
     */
    cursor?: ProgramWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramWorkouts.
     */
    skip?: number
    distinct?: ProgramWorkoutScalarFieldEnum | ProgramWorkoutScalarFieldEnum[]
  }

  /**
   * ProgramWorkout create
   */
  export type ProgramWorkoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    /**
     * The data needed to create a ProgramWorkout.
     */
    data: XOR<ProgramWorkoutCreateInput, ProgramWorkoutUncheckedCreateInput>
  }

  /**
   * ProgramWorkout createMany
   */
  export type ProgramWorkoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProgramWorkouts.
     */
    data: ProgramWorkoutCreateManyInput | ProgramWorkoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProgramWorkout createManyAndReturn
   */
  export type ProgramWorkoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * The data used to create many ProgramWorkouts.
     */
    data: ProgramWorkoutCreateManyInput | ProgramWorkoutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgramWorkout update
   */
  export type ProgramWorkoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    /**
     * The data needed to update a ProgramWorkout.
     */
    data: XOR<ProgramWorkoutUpdateInput, ProgramWorkoutUncheckedUpdateInput>
    /**
     * Choose, which ProgramWorkout to update.
     */
    where: ProgramWorkoutWhereUniqueInput
  }

  /**
   * ProgramWorkout updateMany
   */
  export type ProgramWorkoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProgramWorkouts.
     */
    data: XOR<ProgramWorkoutUpdateManyMutationInput, ProgramWorkoutUncheckedUpdateManyInput>
    /**
     * Filter which ProgramWorkouts to update
     */
    where?: ProgramWorkoutWhereInput
    /**
     * Limit how many ProgramWorkouts to update.
     */
    limit?: number
  }

  /**
   * ProgramWorkout updateManyAndReturn
   */
  export type ProgramWorkoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * The data used to update ProgramWorkouts.
     */
    data: XOR<ProgramWorkoutUpdateManyMutationInput, ProgramWorkoutUncheckedUpdateManyInput>
    /**
     * Filter which ProgramWorkouts to update
     */
    where?: ProgramWorkoutWhereInput
    /**
     * Limit how many ProgramWorkouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgramWorkout upsert
   */
  export type ProgramWorkoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    /**
     * The filter to search for the ProgramWorkout to update in case it exists.
     */
    where: ProgramWorkoutWhereUniqueInput
    /**
     * In case the ProgramWorkout found by the `where` argument doesn't exist, create a new ProgramWorkout with this data.
     */
    create: XOR<ProgramWorkoutCreateInput, ProgramWorkoutUncheckedCreateInput>
    /**
     * In case the ProgramWorkout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgramWorkoutUpdateInput, ProgramWorkoutUncheckedUpdateInput>
  }

  /**
   * ProgramWorkout delete
   */
  export type ProgramWorkoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    /**
     * Filter which ProgramWorkout to delete.
     */
    where: ProgramWorkoutWhereUniqueInput
  }

  /**
   * ProgramWorkout deleteMany
   */
  export type ProgramWorkoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgramWorkouts to delete
     */
    where?: ProgramWorkoutWhereInput
    /**
     * Limit how many ProgramWorkouts to delete.
     */
    limit?: number
  }

  /**
   * ProgramWorkout without action
   */
  export type ProgramWorkoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
  }


  /**
   * Model Workout
   */

  export type AggregateWorkout = {
    _count: WorkoutCountAggregateOutputType | null
    _min: WorkoutMinAggregateOutputType | null
    _max: WorkoutMaxAggregateOutputType | null
  }

  export type WorkoutMinAggregateOutputType = {
    id: string | null
    name: string | null
    notes: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutMaxAggregateOutputType = {
    id: string | null
    name: string | null
    notes: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutCountAggregateOutputType = {
    id: number
    name: number
    notes: number
    ownerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkoutMinAggregateInputType = {
    id?: true
    name?: true
    notes?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutMaxAggregateInputType = {
    id?: true
    name?: true
    notes?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutCountAggregateInputType = {
    id?: true
    name?: true
    notes?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workout to aggregate.
     */
    where?: WorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workouts
    **/
    _count?: true | WorkoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkoutMaxAggregateInputType
  }

  export type GetWorkoutAggregateType<T extends WorkoutAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkout[P]>
      : GetScalarType<T[P], AggregateWorkout[P]>
  }




  export type WorkoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutWhereInput
    orderBy?: WorkoutOrderByWithAggregationInput | WorkoutOrderByWithAggregationInput[]
    by: WorkoutScalarFieldEnum[] | WorkoutScalarFieldEnum
    having?: WorkoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkoutCountAggregateInputType | true
    _min?: WorkoutMinAggregateInputType
    _max?: WorkoutMaxAggregateInputType
  }

  export type WorkoutGroupByOutputType = {
    id: string
    name: string | null
    notes: string | null
    ownerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: WorkoutCountAggregateOutputType | null
    _min: WorkoutMinAggregateOutputType | null
    _max: WorkoutMaxAggregateOutputType | null
  }

  type GetWorkoutGroupByPayload<T extends WorkoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkoutGroupByOutputType[P]>
            : GetScalarType<T[P], WorkoutGroupByOutputType[P]>
        }
      >
    >


  export type WorkoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    notes?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | Workout$ownerArgs<ExtArgs>
    workoutExercises?: boolean | Workout$workoutExercisesArgs<ExtArgs>
    programWorkouts?: boolean | Workout$programWorkoutsArgs<ExtArgs>
    userWorkouts?: boolean | Workout$userWorkoutsArgs<ExtArgs>
    _count?: boolean | WorkoutCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workout"]>

  export type WorkoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    notes?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | Workout$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["workout"]>

  export type WorkoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    notes?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | Workout$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["workout"]>

  export type WorkoutSelectScalar = {
    id?: boolean
    name?: boolean
    notes?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "notes" | "ownerId" | "createdAt" | "updatedAt", ExtArgs["result"]["workout"]>
  export type WorkoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Workout$ownerArgs<ExtArgs>
    workoutExercises?: boolean | Workout$workoutExercisesArgs<ExtArgs>
    programWorkouts?: boolean | Workout$programWorkoutsArgs<ExtArgs>
    userWorkouts?: boolean | Workout$userWorkoutsArgs<ExtArgs>
    _count?: boolean | WorkoutCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Workout$ownerArgs<ExtArgs>
  }
  export type WorkoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Workout$ownerArgs<ExtArgs>
  }

  export type $WorkoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workout"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs> | null
      workoutExercises: Prisma.$WorkoutExercisePayload<ExtArgs>[]
      programWorkouts: Prisma.$ProgramWorkoutPayload<ExtArgs>[]
      userWorkouts: Prisma.$UserWorkoutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      notes: string | null
      ownerId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workout"]>
    composites: {}
  }

  type WorkoutGetPayload<S extends boolean | null | undefined | WorkoutDefaultArgs> = $Result.GetResult<Prisma.$WorkoutPayload, S>

  type WorkoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkoutCountAggregateInputType | true
    }

  export interface WorkoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workout'], meta: { name: 'Workout' } }
    /**
     * Find zero or one Workout that matches the filter.
     * @param {WorkoutFindUniqueArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkoutFindUniqueArgs>(args: SelectSubset<T, WorkoutFindUniqueArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Workout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkoutFindUniqueOrThrowArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkoutFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutFindFirstArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkoutFindFirstArgs>(args?: SelectSubset<T, WorkoutFindFirstArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutFindFirstOrThrowArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkoutFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Workouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workouts
     * const workouts = await prisma.workout.findMany()
     * 
     * // Get first 10 Workouts
     * const workouts = await prisma.workout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workoutWithIdOnly = await prisma.workout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkoutFindManyArgs>(args?: SelectSubset<T, WorkoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Workout.
     * @param {WorkoutCreateArgs} args - Arguments to create a Workout.
     * @example
     * // Create one Workout
     * const Workout = await prisma.workout.create({
     *   data: {
     *     // ... data to create a Workout
     *   }
     * })
     * 
     */
    create<T extends WorkoutCreateArgs>(args: SelectSubset<T, WorkoutCreateArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Workouts.
     * @param {WorkoutCreateManyArgs} args - Arguments to create many Workouts.
     * @example
     * // Create many Workouts
     * const workout = await prisma.workout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkoutCreateManyArgs>(args?: SelectSubset<T, WorkoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workouts and returns the data saved in the database.
     * @param {WorkoutCreateManyAndReturnArgs} args - Arguments to create many Workouts.
     * @example
     * // Create many Workouts
     * const workout = await prisma.workout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workouts and only return the `id`
     * const workoutWithIdOnly = await prisma.workout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkoutCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Workout.
     * @param {WorkoutDeleteArgs} args - Arguments to delete one Workout.
     * @example
     * // Delete one Workout
     * const Workout = await prisma.workout.delete({
     *   where: {
     *     // ... filter to delete one Workout
     *   }
     * })
     * 
     */
    delete<T extends WorkoutDeleteArgs>(args: SelectSubset<T, WorkoutDeleteArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Workout.
     * @param {WorkoutUpdateArgs} args - Arguments to update one Workout.
     * @example
     * // Update one Workout
     * const workout = await prisma.workout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkoutUpdateArgs>(args: SelectSubset<T, WorkoutUpdateArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Workouts.
     * @param {WorkoutDeleteManyArgs} args - Arguments to filter Workouts to delete.
     * @example
     * // Delete a few Workouts
     * const { count } = await prisma.workout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkoutDeleteManyArgs>(args?: SelectSubset<T, WorkoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workouts
     * const workout = await prisma.workout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkoutUpdateManyArgs>(args: SelectSubset<T, WorkoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workouts and returns the data updated in the database.
     * @param {WorkoutUpdateManyAndReturnArgs} args - Arguments to update many Workouts.
     * @example
     * // Update many Workouts
     * const workout = await prisma.workout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Workouts and only return the `id`
     * const workoutWithIdOnly = await prisma.workout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkoutUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Workout.
     * @param {WorkoutUpsertArgs} args - Arguments to update or create a Workout.
     * @example
     * // Update or create a Workout
     * const workout = await prisma.workout.upsert({
     *   create: {
     *     // ... data to create a Workout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workout we want to update
     *   }
     * })
     */
    upsert<T extends WorkoutUpsertArgs>(args: SelectSubset<T, WorkoutUpsertArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Workouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutCountArgs} args - Arguments to filter Workouts to count.
     * @example
     * // Count the number of Workouts
     * const count = await prisma.workout.count({
     *   where: {
     *     // ... the filter for the Workouts we want to count
     *   }
     * })
    **/
    count<T extends WorkoutCountArgs>(
      args?: Subset<T, WorkoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkoutAggregateArgs>(args: Subset<T, WorkoutAggregateArgs>): Prisma.PrismaPromise<GetWorkoutAggregateType<T>>

    /**
     * Group by Workout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutGroupByArgs} args - Group by arguments.
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
      T extends WorkoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workout model
   */
  readonly fields: WorkoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends Workout$ownerArgs<ExtArgs> = {}>(args?: Subset<T, Workout$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    workoutExercises<T extends Workout$workoutExercisesArgs<ExtArgs> = {}>(args?: Subset<T, Workout$workoutExercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    programWorkouts<T extends Workout$programWorkoutsArgs<ExtArgs> = {}>(args?: Subset<T, Workout$programWorkoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userWorkouts<T extends Workout$userWorkoutsArgs<ExtArgs> = {}>(args?: Subset<T, Workout$userWorkoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Workout model
   */
  interface WorkoutFieldRefs {
    readonly id: FieldRef<"Workout", 'String'>
    readonly name: FieldRef<"Workout", 'String'>
    readonly notes: FieldRef<"Workout", 'String'>
    readonly ownerId: FieldRef<"Workout", 'String'>
    readonly createdAt: FieldRef<"Workout", 'DateTime'>
    readonly updatedAt: FieldRef<"Workout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Workout findUnique
   */
  export type WorkoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter, which Workout to fetch.
     */
    where: WorkoutWhereUniqueInput
  }

  /**
   * Workout findUniqueOrThrow
   */
  export type WorkoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter, which Workout to fetch.
     */
    where: WorkoutWhereUniqueInput
  }

  /**
   * Workout findFirst
   */
  export type WorkoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter, which Workout to fetch.
     */
    where?: WorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workouts.
     */
    cursor?: WorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workouts.
     */
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[]
  }

  /**
   * Workout findFirstOrThrow
   */
  export type WorkoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter, which Workout to fetch.
     */
    where?: WorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workouts.
     */
    cursor?: WorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workouts.
     */
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[]
  }

  /**
   * Workout findMany
   */
  export type WorkoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter, which Workouts to fetch.
     */
    where?: WorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workouts.
     */
    cursor?: WorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workouts.
     */
    skip?: number
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[]
  }

  /**
   * Workout create
   */
  export type WorkoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * The data needed to create a Workout.
     */
    data: XOR<WorkoutCreateInput, WorkoutUncheckedCreateInput>
  }

  /**
   * Workout createMany
   */
  export type WorkoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workouts.
     */
    data: WorkoutCreateManyInput | WorkoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workout createManyAndReturn
   */
  export type WorkoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * The data used to create many Workouts.
     */
    data: WorkoutCreateManyInput | WorkoutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workout update
   */
  export type WorkoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * The data needed to update a Workout.
     */
    data: XOR<WorkoutUpdateInput, WorkoutUncheckedUpdateInput>
    /**
     * Choose, which Workout to update.
     */
    where: WorkoutWhereUniqueInput
  }

  /**
   * Workout updateMany
   */
  export type WorkoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workouts.
     */
    data: XOR<WorkoutUpdateManyMutationInput, WorkoutUncheckedUpdateManyInput>
    /**
     * Filter which Workouts to update
     */
    where?: WorkoutWhereInput
    /**
     * Limit how many Workouts to update.
     */
    limit?: number
  }

  /**
   * Workout updateManyAndReturn
   */
  export type WorkoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * The data used to update Workouts.
     */
    data: XOR<WorkoutUpdateManyMutationInput, WorkoutUncheckedUpdateManyInput>
    /**
     * Filter which Workouts to update
     */
    where?: WorkoutWhereInput
    /**
     * Limit how many Workouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workout upsert
   */
  export type WorkoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * The filter to search for the Workout to update in case it exists.
     */
    where: WorkoutWhereUniqueInput
    /**
     * In case the Workout found by the `where` argument doesn't exist, create a new Workout with this data.
     */
    create: XOR<WorkoutCreateInput, WorkoutUncheckedCreateInput>
    /**
     * In case the Workout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkoutUpdateInput, WorkoutUncheckedUpdateInput>
  }

  /**
   * Workout delete
   */
  export type WorkoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    /**
     * Filter which Workout to delete.
     */
    where: WorkoutWhereUniqueInput
  }

  /**
   * Workout deleteMany
   */
  export type WorkoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workouts to delete
     */
    where?: WorkoutWhereInput
    /**
     * Limit how many Workouts to delete.
     */
    limit?: number
  }

  /**
   * Workout.owner
   */
  export type Workout$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Workout.workoutExercises
   */
  export type Workout$workoutExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    where?: WorkoutExerciseWhereInput
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[]
    cursor?: WorkoutExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[]
  }

  /**
   * Workout.programWorkouts
   */
  export type Workout$programWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramWorkout
     */
    select?: ProgramWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramWorkout
     */
    omit?: ProgramWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramWorkoutInclude<ExtArgs> | null
    where?: ProgramWorkoutWhereInput
    orderBy?: ProgramWorkoutOrderByWithRelationInput | ProgramWorkoutOrderByWithRelationInput[]
    cursor?: ProgramWorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgramWorkoutScalarFieldEnum | ProgramWorkoutScalarFieldEnum[]
  }

  /**
   * Workout.userWorkouts
   */
  export type Workout$userWorkoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    where?: UserWorkoutWhereInput
    orderBy?: UserWorkoutOrderByWithRelationInput | UserWorkoutOrderByWithRelationInput[]
    cursor?: UserWorkoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWorkoutScalarFieldEnum | UserWorkoutScalarFieldEnum[]
  }

  /**
   * Workout without action
   */
  export type WorkoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
  }


  /**
   * Model WorkoutExercise
   */

  export type AggregateWorkoutExercise = {
    _count: WorkoutExerciseCountAggregateOutputType | null
    _avg: WorkoutExerciseAvgAggregateOutputType | null
    _sum: WorkoutExerciseSumAggregateOutputType | null
    _min: WorkoutExerciseMinAggregateOutputType | null
    _max: WorkoutExerciseMaxAggregateOutputType | null
  }

  export type WorkoutExerciseAvgAggregateOutputType = {
    order: number | null
  }

  export type WorkoutExerciseSumAggregateOutputType = {
    order: number | null
  }

  export type WorkoutExerciseMinAggregateOutputType = {
    id: string | null
    order: number | null
    notes: string | null
    coreSetId: string | null
    coreCardioSetId: string | null
    exerciseId: string | null
    workoutId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutExerciseMaxAggregateOutputType = {
    id: string | null
    order: number | null
    notes: string | null
    coreSetId: string | null
    coreCardioSetId: string | null
    exerciseId: string | null
    workoutId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkoutExerciseCountAggregateOutputType = {
    id: number
    order: number
    notes: number
    coreSetId: number
    coreCardioSetId: number
    exerciseId: number
    workoutId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkoutExerciseAvgAggregateInputType = {
    order?: true
  }

  export type WorkoutExerciseSumAggregateInputType = {
    order?: true
  }

  export type WorkoutExerciseMinAggregateInputType = {
    id?: true
    order?: true
    notes?: true
    coreSetId?: true
    coreCardioSetId?: true
    exerciseId?: true
    workoutId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutExerciseMaxAggregateInputType = {
    id?: true
    order?: true
    notes?: true
    coreSetId?: true
    coreCardioSetId?: true
    exerciseId?: true
    workoutId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkoutExerciseCountAggregateInputType = {
    id?: true
    order?: true
    notes?: true
    coreSetId?: true
    coreCardioSetId?: true
    exerciseId?: true
    workoutId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkoutExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkoutExercise to aggregate.
     */
    where?: WorkoutExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutExercises to fetch.
     */
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkoutExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkoutExercises
    **/
    _count?: true | WorkoutExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkoutExerciseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkoutExerciseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkoutExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkoutExerciseMaxAggregateInputType
  }

  export type GetWorkoutExerciseAggregateType<T extends WorkoutExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkoutExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkoutExercise[P]>
      : GetScalarType<T[P], AggregateWorkoutExercise[P]>
  }




  export type WorkoutExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkoutExerciseWhereInput
    orderBy?: WorkoutExerciseOrderByWithAggregationInput | WorkoutExerciseOrderByWithAggregationInput[]
    by: WorkoutExerciseScalarFieldEnum[] | WorkoutExerciseScalarFieldEnum
    having?: WorkoutExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkoutExerciseCountAggregateInputType | true
    _avg?: WorkoutExerciseAvgAggregateInputType
    _sum?: WorkoutExerciseSumAggregateInputType
    _min?: WorkoutExerciseMinAggregateInputType
    _max?: WorkoutExerciseMaxAggregateInputType
  }

  export type WorkoutExerciseGroupByOutputType = {
    id: string
    order: number
    notes: string | null
    coreSetId: string | null
    coreCardioSetId: string | null
    exerciseId: string
    workoutId: string
    createdAt: Date
    updatedAt: Date
    _count: WorkoutExerciseCountAggregateOutputType | null
    _avg: WorkoutExerciseAvgAggregateOutputType | null
    _sum: WorkoutExerciseSumAggregateOutputType | null
    _min: WorkoutExerciseMinAggregateOutputType | null
    _max: WorkoutExerciseMaxAggregateOutputType | null
  }

  type GetWorkoutExerciseGroupByPayload<T extends WorkoutExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkoutExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkoutExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkoutExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], WorkoutExerciseGroupByOutputType[P]>
        }
      >
    >


  export type WorkoutExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    notes?: boolean
    coreSetId?: boolean
    coreCardioSetId?: boolean
    exerciseId?: boolean
    workoutId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coreSet?: boolean | WorkoutExercise$coreSetArgs<ExtArgs>
    coreCardioSet?: boolean | WorkoutExercise$coreCardioSetArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
    userWorkoutExercises?: boolean | WorkoutExercise$userWorkoutExercisesArgs<ExtArgs>
    _count?: boolean | WorkoutExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutExercise"]>

  export type WorkoutExerciseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    notes?: boolean
    coreSetId?: boolean
    coreCardioSetId?: boolean
    exerciseId?: boolean
    workoutId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coreSet?: boolean | WorkoutExercise$coreSetArgs<ExtArgs>
    coreCardioSet?: boolean | WorkoutExercise$coreCardioSetArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutExercise"]>

  export type WorkoutExerciseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    notes?: boolean
    coreSetId?: boolean
    coreCardioSetId?: boolean
    exerciseId?: boolean
    workoutId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    coreSet?: boolean | WorkoutExercise$coreSetArgs<ExtArgs>
    coreCardioSet?: boolean | WorkoutExercise$coreCardioSetArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workoutExercise"]>

  export type WorkoutExerciseSelectScalar = {
    id?: boolean
    order?: boolean
    notes?: boolean
    coreSetId?: boolean
    coreCardioSetId?: boolean
    exerciseId?: boolean
    workoutId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkoutExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "order" | "notes" | "coreSetId" | "coreCardioSetId" | "exerciseId" | "workoutId" | "createdAt" | "updatedAt", ExtArgs["result"]["workoutExercise"]>
  export type WorkoutExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coreSet?: boolean | WorkoutExercise$coreSetArgs<ExtArgs>
    coreCardioSet?: boolean | WorkoutExercise$coreCardioSetArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
    userWorkoutExercises?: boolean | WorkoutExercise$userWorkoutExercisesArgs<ExtArgs>
    _count?: boolean | WorkoutExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkoutExerciseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coreSet?: boolean | WorkoutExercise$coreSetArgs<ExtArgs>
    coreCardioSet?: boolean | WorkoutExercise$coreCardioSetArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }
  export type WorkoutExerciseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coreSet?: boolean | WorkoutExercise$coreSetArgs<ExtArgs>
    coreCardioSet?: boolean | WorkoutExercise$coreCardioSetArgs<ExtArgs>
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>
  }

  export type $WorkoutExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkoutExercise"
    objects: {
      coreSet: Prisma.$CoreSetPayload<ExtArgs> | null
      coreCardioSet: Prisma.$CoreCardioSetPayload<ExtArgs> | null
      exercise: Prisma.$ExercisePayload<ExtArgs>
      workout: Prisma.$WorkoutPayload<ExtArgs>
      userWorkoutExercises: Prisma.$UserWorkoutExercisePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      order: number
      notes: string | null
      coreSetId: string | null
      coreCardioSetId: string | null
      exerciseId: string
      workoutId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workoutExercise"]>
    composites: {}
  }

  type WorkoutExerciseGetPayload<S extends boolean | null | undefined | WorkoutExerciseDefaultArgs> = $Result.GetResult<Prisma.$WorkoutExercisePayload, S>

  type WorkoutExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkoutExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkoutExerciseCountAggregateInputType | true
    }

  export interface WorkoutExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkoutExercise'], meta: { name: 'WorkoutExercise' } }
    /**
     * Find zero or one WorkoutExercise that matches the filter.
     * @param {WorkoutExerciseFindUniqueArgs} args - Arguments to find a WorkoutExercise
     * @example
     * // Get one WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkoutExerciseFindUniqueArgs>(args: SelectSubset<T, WorkoutExerciseFindUniqueArgs<ExtArgs>>): Prisma__WorkoutExerciseClient<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkoutExercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkoutExerciseFindUniqueOrThrowArgs} args - Arguments to find a WorkoutExercise
     * @example
     * // Get one WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkoutExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkoutExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkoutExerciseClient<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkoutExercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseFindFirstArgs} args - Arguments to find a WorkoutExercise
     * @example
     * // Get one WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkoutExerciseFindFirstArgs>(args?: SelectSubset<T, WorkoutExerciseFindFirstArgs<ExtArgs>>): Prisma__WorkoutExerciseClient<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkoutExercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseFindFirstOrThrowArgs} args - Arguments to find a WorkoutExercise
     * @example
     * // Get one WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkoutExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkoutExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkoutExerciseClient<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkoutExercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkoutExercises
     * const workoutExercises = await prisma.workoutExercise.findMany()
     * 
     * // Get first 10 WorkoutExercises
     * const workoutExercises = await prisma.workoutExercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workoutExerciseWithIdOnly = await prisma.workoutExercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkoutExerciseFindManyArgs>(args?: SelectSubset<T, WorkoutExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkoutExercise.
     * @param {WorkoutExerciseCreateArgs} args - Arguments to create a WorkoutExercise.
     * @example
     * // Create one WorkoutExercise
     * const WorkoutExercise = await prisma.workoutExercise.create({
     *   data: {
     *     // ... data to create a WorkoutExercise
     *   }
     * })
     * 
     */
    create<T extends WorkoutExerciseCreateArgs>(args: SelectSubset<T, WorkoutExerciseCreateArgs<ExtArgs>>): Prisma__WorkoutExerciseClient<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkoutExercises.
     * @param {WorkoutExerciseCreateManyArgs} args - Arguments to create many WorkoutExercises.
     * @example
     * // Create many WorkoutExercises
     * const workoutExercise = await prisma.workoutExercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkoutExerciseCreateManyArgs>(args?: SelectSubset<T, WorkoutExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkoutExercises and returns the data saved in the database.
     * @param {WorkoutExerciseCreateManyAndReturnArgs} args - Arguments to create many WorkoutExercises.
     * @example
     * // Create many WorkoutExercises
     * const workoutExercise = await prisma.workoutExercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkoutExercises and only return the `id`
     * const workoutExerciseWithIdOnly = await prisma.workoutExercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkoutExerciseCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkoutExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkoutExercise.
     * @param {WorkoutExerciseDeleteArgs} args - Arguments to delete one WorkoutExercise.
     * @example
     * // Delete one WorkoutExercise
     * const WorkoutExercise = await prisma.workoutExercise.delete({
     *   where: {
     *     // ... filter to delete one WorkoutExercise
     *   }
     * })
     * 
     */
    delete<T extends WorkoutExerciseDeleteArgs>(args: SelectSubset<T, WorkoutExerciseDeleteArgs<ExtArgs>>): Prisma__WorkoutExerciseClient<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkoutExercise.
     * @param {WorkoutExerciseUpdateArgs} args - Arguments to update one WorkoutExercise.
     * @example
     * // Update one WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkoutExerciseUpdateArgs>(args: SelectSubset<T, WorkoutExerciseUpdateArgs<ExtArgs>>): Prisma__WorkoutExerciseClient<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkoutExercises.
     * @param {WorkoutExerciseDeleteManyArgs} args - Arguments to filter WorkoutExercises to delete.
     * @example
     * // Delete a few WorkoutExercises
     * const { count } = await prisma.workoutExercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkoutExerciseDeleteManyArgs>(args?: SelectSubset<T, WorkoutExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkoutExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkoutExercises
     * const workoutExercise = await prisma.workoutExercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkoutExerciseUpdateManyArgs>(args: SelectSubset<T, WorkoutExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkoutExercises and returns the data updated in the database.
     * @param {WorkoutExerciseUpdateManyAndReturnArgs} args - Arguments to update many WorkoutExercises.
     * @example
     * // Update many WorkoutExercises
     * const workoutExercise = await prisma.workoutExercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkoutExercises and only return the `id`
     * const workoutExerciseWithIdOnly = await prisma.workoutExercise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkoutExerciseUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkoutExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkoutExercise.
     * @param {WorkoutExerciseUpsertArgs} args - Arguments to update or create a WorkoutExercise.
     * @example
     * // Update or create a WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.upsert({
     *   create: {
     *     // ... data to create a WorkoutExercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkoutExercise we want to update
     *   }
     * })
     */
    upsert<T extends WorkoutExerciseUpsertArgs>(args: SelectSubset<T, WorkoutExerciseUpsertArgs<ExtArgs>>): Prisma__WorkoutExerciseClient<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkoutExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseCountArgs} args - Arguments to filter WorkoutExercises to count.
     * @example
     * // Count the number of WorkoutExercises
     * const count = await prisma.workoutExercise.count({
     *   where: {
     *     // ... the filter for the WorkoutExercises we want to count
     *   }
     * })
    **/
    count<T extends WorkoutExerciseCountArgs>(
      args?: Subset<T, WorkoutExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkoutExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkoutExerciseAggregateArgs>(args: Subset<T, WorkoutExerciseAggregateArgs>): Prisma.PrismaPromise<GetWorkoutExerciseAggregateType<T>>

    /**
     * Group by WorkoutExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseGroupByArgs} args - Group by arguments.
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
      T extends WorkoutExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutExerciseGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutExerciseGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkoutExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkoutExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkoutExercise model
   */
  readonly fields: WorkoutExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkoutExercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkoutExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coreSet<T extends WorkoutExercise$coreSetArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutExercise$coreSetArgs<ExtArgs>>): Prisma__CoreSetClient<$Result.GetResult<Prisma.$CoreSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    coreCardioSet<T extends WorkoutExercise$coreCardioSetArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutExercise$coreCardioSetArgs<ExtArgs>>): Prisma__CoreCardioSetClient<$Result.GetResult<Prisma.$CoreCardioSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    exercise<T extends ExerciseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExerciseDefaultArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workout<T extends WorkoutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutDefaultArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userWorkoutExercises<T extends WorkoutExercise$userWorkoutExercisesArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutExercise$userWorkoutExercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkoutExercise model
   */
  interface WorkoutExerciseFieldRefs {
    readonly id: FieldRef<"WorkoutExercise", 'String'>
    readonly order: FieldRef<"WorkoutExercise", 'Int'>
    readonly notes: FieldRef<"WorkoutExercise", 'String'>
    readonly coreSetId: FieldRef<"WorkoutExercise", 'String'>
    readonly coreCardioSetId: FieldRef<"WorkoutExercise", 'String'>
    readonly exerciseId: FieldRef<"WorkoutExercise", 'String'>
    readonly workoutId: FieldRef<"WorkoutExercise", 'String'>
    readonly createdAt: FieldRef<"WorkoutExercise", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkoutExercise", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkoutExercise findUnique
   */
  export type WorkoutExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutExercise to fetch.
     */
    where: WorkoutExerciseWhereUniqueInput
  }

  /**
   * WorkoutExercise findUniqueOrThrow
   */
  export type WorkoutExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutExercise to fetch.
     */
    where: WorkoutExerciseWhereUniqueInput
  }

  /**
   * WorkoutExercise findFirst
   */
  export type WorkoutExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutExercise to fetch.
     */
    where?: WorkoutExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutExercises to fetch.
     */
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkoutExercises.
     */
    cursor?: WorkoutExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkoutExercises.
     */
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[]
  }

  /**
   * WorkoutExercise findFirstOrThrow
   */
  export type WorkoutExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutExercise to fetch.
     */
    where?: WorkoutExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutExercises to fetch.
     */
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkoutExercises.
     */
    cursor?: WorkoutExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkoutExercises.
     */
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[]
  }

  /**
   * WorkoutExercise findMany
   */
  export type WorkoutExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter, which WorkoutExercises to fetch.
     */
    where?: WorkoutExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkoutExercises to fetch.
     */
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkoutExercises.
     */
    cursor?: WorkoutExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkoutExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkoutExercises.
     */
    skip?: number
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[]
  }

  /**
   * WorkoutExercise create
   */
  export type WorkoutExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkoutExercise.
     */
    data: XOR<WorkoutExerciseCreateInput, WorkoutExerciseUncheckedCreateInput>
  }

  /**
   * WorkoutExercise createMany
   */
  export type WorkoutExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkoutExercises.
     */
    data: WorkoutExerciseCreateManyInput | WorkoutExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkoutExercise createManyAndReturn
   */
  export type WorkoutExerciseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * The data used to create many WorkoutExercises.
     */
    data: WorkoutExerciseCreateManyInput | WorkoutExerciseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkoutExercise update
   */
  export type WorkoutExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkoutExercise.
     */
    data: XOR<WorkoutExerciseUpdateInput, WorkoutExerciseUncheckedUpdateInput>
    /**
     * Choose, which WorkoutExercise to update.
     */
    where: WorkoutExerciseWhereUniqueInput
  }

  /**
   * WorkoutExercise updateMany
   */
  export type WorkoutExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkoutExercises.
     */
    data: XOR<WorkoutExerciseUpdateManyMutationInput, WorkoutExerciseUncheckedUpdateManyInput>
    /**
     * Filter which WorkoutExercises to update
     */
    where?: WorkoutExerciseWhereInput
    /**
     * Limit how many WorkoutExercises to update.
     */
    limit?: number
  }

  /**
   * WorkoutExercise updateManyAndReturn
   */
  export type WorkoutExerciseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * The data used to update WorkoutExercises.
     */
    data: XOR<WorkoutExerciseUpdateManyMutationInput, WorkoutExerciseUncheckedUpdateManyInput>
    /**
     * Filter which WorkoutExercises to update
     */
    where?: WorkoutExerciseWhereInput
    /**
     * Limit how many WorkoutExercises to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkoutExercise upsert
   */
  export type WorkoutExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkoutExercise to update in case it exists.
     */
    where: WorkoutExerciseWhereUniqueInput
    /**
     * In case the WorkoutExercise found by the `where` argument doesn't exist, create a new WorkoutExercise with this data.
     */
    create: XOR<WorkoutExerciseCreateInput, WorkoutExerciseUncheckedCreateInput>
    /**
     * In case the WorkoutExercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkoutExerciseUpdateInput, WorkoutExerciseUncheckedUpdateInput>
  }

  /**
   * WorkoutExercise delete
   */
  export type WorkoutExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter which WorkoutExercise to delete.
     */
    where: WorkoutExerciseWhereUniqueInput
  }

  /**
   * WorkoutExercise deleteMany
   */
  export type WorkoutExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkoutExercises to delete
     */
    where?: WorkoutExerciseWhereInput
    /**
     * Limit how many WorkoutExercises to delete.
     */
    limit?: number
  }

  /**
   * WorkoutExercise.coreSet
   */
  export type WorkoutExercise$coreSetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreSet
     */
    select?: CoreSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreSet
     */
    omit?: CoreSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreSetInclude<ExtArgs> | null
    where?: CoreSetWhereInput
  }

  /**
   * WorkoutExercise.coreCardioSet
   */
  export type WorkoutExercise$coreCardioSetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoreCardioSet
     */
    select?: CoreCardioSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CoreCardioSet
     */
    omit?: CoreCardioSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoreCardioSetInclude<ExtArgs> | null
    where?: CoreCardioSetWhereInput
  }

  /**
   * WorkoutExercise.userWorkoutExercises
   */
  export type WorkoutExercise$userWorkoutExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    where?: UserWorkoutExerciseWhereInput
    orderBy?: UserWorkoutExerciseOrderByWithRelationInput | UserWorkoutExerciseOrderByWithRelationInput[]
    cursor?: UserWorkoutExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWorkoutExerciseScalarFieldEnum | UserWorkoutExerciseScalarFieldEnum[]
  }

  /**
   * WorkoutExercise without action
   */
  export type WorkoutExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null
  }


  /**
   * Model UserWorkoutExercise
   */

  export type AggregateUserWorkoutExercise = {
    _count: UserWorkoutExerciseCountAggregateOutputType | null
    _min: UserWorkoutExerciseMinAggregateOutputType | null
    _max: UserWorkoutExerciseMaxAggregateOutputType | null
  }

  export type UserWorkoutExerciseMinAggregateOutputType = {
    id: string | null
    workoutExerciseId: string | null
    userWorkoutId: string | null
  }

  export type UserWorkoutExerciseMaxAggregateOutputType = {
    id: string | null
    workoutExerciseId: string | null
    userWorkoutId: string | null
  }

  export type UserWorkoutExerciseCountAggregateOutputType = {
    id: number
    workoutExerciseId: number
    userWorkoutId: number
    _all: number
  }


  export type UserWorkoutExerciseMinAggregateInputType = {
    id?: true
    workoutExerciseId?: true
    userWorkoutId?: true
  }

  export type UserWorkoutExerciseMaxAggregateInputType = {
    id?: true
    workoutExerciseId?: true
    userWorkoutId?: true
  }

  export type UserWorkoutExerciseCountAggregateInputType = {
    id?: true
    workoutExerciseId?: true
    userWorkoutId?: true
    _all?: true
  }

  export type UserWorkoutExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWorkoutExercise to aggregate.
     */
    where?: UserWorkoutExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWorkoutExercises to fetch.
     */
    orderBy?: UserWorkoutExerciseOrderByWithRelationInput | UserWorkoutExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWorkoutExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWorkoutExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWorkoutExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserWorkoutExercises
    **/
    _count?: true | UserWorkoutExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserWorkoutExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserWorkoutExerciseMaxAggregateInputType
  }

  export type GetUserWorkoutExerciseAggregateType<T extends UserWorkoutExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateUserWorkoutExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserWorkoutExercise[P]>
      : GetScalarType<T[P], AggregateUserWorkoutExercise[P]>
  }




  export type UserWorkoutExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWorkoutExerciseWhereInput
    orderBy?: UserWorkoutExerciseOrderByWithAggregationInput | UserWorkoutExerciseOrderByWithAggregationInput[]
    by: UserWorkoutExerciseScalarFieldEnum[] | UserWorkoutExerciseScalarFieldEnum
    having?: UserWorkoutExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserWorkoutExerciseCountAggregateInputType | true
    _min?: UserWorkoutExerciseMinAggregateInputType
    _max?: UserWorkoutExerciseMaxAggregateInputType
  }

  export type UserWorkoutExerciseGroupByOutputType = {
    id: string
    workoutExerciseId: string
    userWorkoutId: string
    _count: UserWorkoutExerciseCountAggregateOutputType | null
    _min: UserWorkoutExerciseMinAggregateOutputType | null
    _max: UserWorkoutExerciseMaxAggregateOutputType | null
  }

  type GetUserWorkoutExerciseGroupByPayload<T extends UserWorkoutExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserWorkoutExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserWorkoutExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserWorkoutExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], UserWorkoutExerciseGroupByOutputType[P]>
        }
      >
    >


  export type UserWorkoutExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workoutExerciseId?: boolean
    userWorkoutId?: boolean
    workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>
    userWorkout?: boolean | UserWorkoutDefaultArgs<ExtArgs>
    userSets?: boolean | UserWorkoutExercise$userSetsArgs<ExtArgs>
    _count?: boolean | UserWorkoutExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWorkoutExercise"]>

  export type UserWorkoutExerciseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workoutExerciseId?: boolean
    userWorkoutId?: boolean
    workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>
    userWorkout?: boolean | UserWorkoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWorkoutExercise"]>

  export type UserWorkoutExerciseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workoutExerciseId?: boolean
    userWorkoutId?: boolean
    workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>
    userWorkout?: boolean | UserWorkoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWorkoutExercise"]>

  export type UserWorkoutExerciseSelectScalar = {
    id?: boolean
    workoutExerciseId?: boolean
    userWorkoutId?: boolean
  }

  export type UserWorkoutExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workoutExerciseId" | "userWorkoutId", ExtArgs["result"]["userWorkoutExercise"]>
  export type UserWorkoutExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>
    userWorkout?: boolean | UserWorkoutDefaultArgs<ExtArgs>
    userSets?: boolean | UserWorkoutExercise$userSetsArgs<ExtArgs>
    _count?: boolean | UserWorkoutExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserWorkoutExerciseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>
    userWorkout?: boolean | UserWorkoutDefaultArgs<ExtArgs>
  }
  export type UserWorkoutExerciseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>
    userWorkout?: boolean | UserWorkoutDefaultArgs<ExtArgs>
  }

  export type $UserWorkoutExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserWorkoutExercise"
    objects: {
      workoutExercise: Prisma.$WorkoutExercisePayload<ExtArgs>
      userWorkout: Prisma.$UserWorkoutPayload<ExtArgs>
      userSets: Prisma.$UserSetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workoutExerciseId: string
      userWorkoutId: string
    }, ExtArgs["result"]["userWorkoutExercise"]>
    composites: {}
  }

  type UserWorkoutExerciseGetPayload<S extends boolean | null | undefined | UserWorkoutExerciseDefaultArgs> = $Result.GetResult<Prisma.$UserWorkoutExercisePayload, S>

  type UserWorkoutExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserWorkoutExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserWorkoutExerciseCountAggregateInputType | true
    }

  export interface UserWorkoutExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserWorkoutExercise'], meta: { name: 'UserWorkoutExercise' } }
    /**
     * Find zero or one UserWorkoutExercise that matches the filter.
     * @param {UserWorkoutExerciseFindUniqueArgs} args - Arguments to find a UserWorkoutExercise
     * @example
     * // Get one UserWorkoutExercise
     * const userWorkoutExercise = await prisma.userWorkoutExercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserWorkoutExerciseFindUniqueArgs>(args: SelectSubset<T, UserWorkoutExerciseFindUniqueArgs<ExtArgs>>): Prisma__UserWorkoutExerciseClient<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserWorkoutExercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserWorkoutExerciseFindUniqueOrThrowArgs} args - Arguments to find a UserWorkoutExercise
     * @example
     * // Get one UserWorkoutExercise
     * const userWorkoutExercise = await prisma.userWorkoutExercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserWorkoutExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, UserWorkoutExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserWorkoutExerciseClient<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserWorkoutExercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutExerciseFindFirstArgs} args - Arguments to find a UserWorkoutExercise
     * @example
     * // Get one UserWorkoutExercise
     * const userWorkoutExercise = await prisma.userWorkoutExercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserWorkoutExerciseFindFirstArgs>(args?: SelectSubset<T, UserWorkoutExerciseFindFirstArgs<ExtArgs>>): Prisma__UserWorkoutExerciseClient<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserWorkoutExercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutExerciseFindFirstOrThrowArgs} args - Arguments to find a UserWorkoutExercise
     * @example
     * // Get one UserWorkoutExercise
     * const userWorkoutExercise = await prisma.userWorkoutExercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserWorkoutExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, UserWorkoutExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserWorkoutExerciseClient<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserWorkoutExercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserWorkoutExercises
     * const userWorkoutExercises = await prisma.userWorkoutExercise.findMany()
     * 
     * // Get first 10 UserWorkoutExercises
     * const userWorkoutExercises = await prisma.userWorkoutExercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWorkoutExerciseWithIdOnly = await prisma.userWorkoutExercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserWorkoutExerciseFindManyArgs>(args?: SelectSubset<T, UserWorkoutExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserWorkoutExercise.
     * @param {UserWorkoutExerciseCreateArgs} args - Arguments to create a UserWorkoutExercise.
     * @example
     * // Create one UserWorkoutExercise
     * const UserWorkoutExercise = await prisma.userWorkoutExercise.create({
     *   data: {
     *     // ... data to create a UserWorkoutExercise
     *   }
     * })
     * 
     */
    create<T extends UserWorkoutExerciseCreateArgs>(args: SelectSubset<T, UserWorkoutExerciseCreateArgs<ExtArgs>>): Prisma__UserWorkoutExerciseClient<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserWorkoutExercises.
     * @param {UserWorkoutExerciseCreateManyArgs} args - Arguments to create many UserWorkoutExercises.
     * @example
     * // Create many UserWorkoutExercises
     * const userWorkoutExercise = await prisma.userWorkoutExercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserWorkoutExerciseCreateManyArgs>(args?: SelectSubset<T, UserWorkoutExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserWorkoutExercises and returns the data saved in the database.
     * @param {UserWorkoutExerciseCreateManyAndReturnArgs} args - Arguments to create many UserWorkoutExercises.
     * @example
     * // Create many UserWorkoutExercises
     * const userWorkoutExercise = await prisma.userWorkoutExercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserWorkoutExercises and only return the `id`
     * const userWorkoutExerciseWithIdOnly = await prisma.userWorkoutExercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserWorkoutExerciseCreateManyAndReturnArgs>(args?: SelectSubset<T, UserWorkoutExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserWorkoutExercise.
     * @param {UserWorkoutExerciseDeleteArgs} args - Arguments to delete one UserWorkoutExercise.
     * @example
     * // Delete one UserWorkoutExercise
     * const UserWorkoutExercise = await prisma.userWorkoutExercise.delete({
     *   where: {
     *     // ... filter to delete one UserWorkoutExercise
     *   }
     * })
     * 
     */
    delete<T extends UserWorkoutExerciseDeleteArgs>(args: SelectSubset<T, UserWorkoutExerciseDeleteArgs<ExtArgs>>): Prisma__UserWorkoutExerciseClient<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserWorkoutExercise.
     * @param {UserWorkoutExerciseUpdateArgs} args - Arguments to update one UserWorkoutExercise.
     * @example
     * // Update one UserWorkoutExercise
     * const userWorkoutExercise = await prisma.userWorkoutExercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserWorkoutExerciseUpdateArgs>(args: SelectSubset<T, UserWorkoutExerciseUpdateArgs<ExtArgs>>): Prisma__UserWorkoutExerciseClient<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserWorkoutExercises.
     * @param {UserWorkoutExerciseDeleteManyArgs} args - Arguments to filter UserWorkoutExercises to delete.
     * @example
     * // Delete a few UserWorkoutExercises
     * const { count } = await prisma.userWorkoutExercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserWorkoutExerciseDeleteManyArgs>(args?: SelectSubset<T, UserWorkoutExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWorkoutExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserWorkoutExercises
     * const userWorkoutExercise = await prisma.userWorkoutExercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserWorkoutExerciseUpdateManyArgs>(args: SelectSubset<T, UserWorkoutExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWorkoutExercises and returns the data updated in the database.
     * @param {UserWorkoutExerciseUpdateManyAndReturnArgs} args - Arguments to update many UserWorkoutExercises.
     * @example
     * // Update many UserWorkoutExercises
     * const userWorkoutExercise = await prisma.userWorkoutExercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserWorkoutExercises and only return the `id`
     * const userWorkoutExerciseWithIdOnly = await prisma.userWorkoutExercise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserWorkoutExerciseUpdateManyAndReturnArgs>(args: SelectSubset<T, UserWorkoutExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserWorkoutExercise.
     * @param {UserWorkoutExerciseUpsertArgs} args - Arguments to update or create a UserWorkoutExercise.
     * @example
     * // Update or create a UserWorkoutExercise
     * const userWorkoutExercise = await prisma.userWorkoutExercise.upsert({
     *   create: {
     *     // ... data to create a UserWorkoutExercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserWorkoutExercise we want to update
     *   }
     * })
     */
    upsert<T extends UserWorkoutExerciseUpsertArgs>(args: SelectSubset<T, UserWorkoutExerciseUpsertArgs<ExtArgs>>): Prisma__UserWorkoutExerciseClient<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserWorkoutExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutExerciseCountArgs} args - Arguments to filter UserWorkoutExercises to count.
     * @example
     * // Count the number of UserWorkoutExercises
     * const count = await prisma.userWorkoutExercise.count({
     *   where: {
     *     // ... the filter for the UserWorkoutExercises we want to count
     *   }
     * })
    **/
    count<T extends UserWorkoutExerciseCountArgs>(
      args?: Subset<T, UserWorkoutExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserWorkoutExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserWorkoutExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserWorkoutExerciseAggregateArgs>(args: Subset<T, UserWorkoutExerciseAggregateArgs>): Prisma.PrismaPromise<GetUserWorkoutExerciseAggregateType<T>>

    /**
     * Group by UserWorkoutExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutExerciseGroupByArgs} args - Group by arguments.
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
      T extends UserWorkoutExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserWorkoutExerciseGroupByArgs['orderBy'] }
        : { orderBy?: UserWorkoutExerciseGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserWorkoutExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserWorkoutExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserWorkoutExercise model
   */
  readonly fields: UserWorkoutExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserWorkoutExercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserWorkoutExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workoutExercise<T extends WorkoutExerciseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkoutExerciseDefaultArgs<ExtArgs>>): Prisma__WorkoutExerciseClient<$Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userWorkout<T extends UserWorkoutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserWorkoutDefaultArgs<ExtArgs>>): Prisma__UserWorkoutClient<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userSets<T extends UserWorkoutExercise$userSetsArgs<ExtArgs> = {}>(args?: Subset<T, UserWorkoutExercise$userSetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserWorkoutExercise model
   */
  interface UserWorkoutExerciseFieldRefs {
    readonly id: FieldRef<"UserWorkoutExercise", 'String'>
    readonly workoutExerciseId: FieldRef<"UserWorkoutExercise", 'String'>
    readonly userWorkoutId: FieldRef<"UserWorkoutExercise", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserWorkoutExercise findUnique
   */
  export type UserWorkoutExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter, which UserWorkoutExercise to fetch.
     */
    where: UserWorkoutExerciseWhereUniqueInput
  }

  /**
   * UserWorkoutExercise findUniqueOrThrow
   */
  export type UserWorkoutExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter, which UserWorkoutExercise to fetch.
     */
    where: UserWorkoutExerciseWhereUniqueInput
  }

  /**
   * UserWorkoutExercise findFirst
   */
  export type UserWorkoutExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter, which UserWorkoutExercise to fetch.
     */
    where?: UserWorkoutExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWorkoutExercises to fetch.
     */
    orderBy?: UserWorkoutExerciseOrderByWithRelationInput | UserWorkoutExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWorkoutExercises.
     */
    cursor?: UserWorkoutExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWorkoutExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWorkoutExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWorkoutExercises.
     */
    distinct?: UserWorkoutExerciseScalarFieldEnum | UserWorkoutExerciseScalarFieldEnum[]
  }

  /**
   * UserWorkoutExercise findFirstOrThrow
   */
  export type UserWorkoutExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter, which UserWorkoutExercise to fetch.
     */
    where?: UserWorkoutExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWorkoutExercises to fetch.
     */
    orderBy?: UserWorkoutExerciseOrderByWithRelationInput | UserWorkoutExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWorkoutExercises.
     */
    cursor?: UserWorkoutExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWorkoutExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWorkoutExercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWorkoutExercises.
     */
    distinct?: UserWorkoutExerciseScalarFieldEnum | UserWorkoutExerciseScalarFieldEnum[]
  }

  /**
   * UserWorkoutExercise findMany
   */
  export type UserWorkoutExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter, which UserWorkoutExercises to fetch.
     */
    where?: UserWorkoutExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWorkoutExercises to fetch.
     */
    orderBy?: UserWorkoutExerciseOrderByWithRelationInput | UserWorkoutExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserWorkoutExercises.
     */
    cursor?: UserWorkoutExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWorkoutExercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWorkoutExercises.
     */
    skip?: number
    distinct?: UserWorkoutExerciseScalarFieldEnum | UserWorkoutExerciseScalarFieldEnum[]
  }

  /**
   * UserWorkoutExercise create
   */
  export type UserWorkoutExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    /**
     * The data needed to create a UserWorkoutExercise.
     */
    data: XOR<UserWorkoutExerciseCreateInput, UserWorkoutExerciseUncheckedCreateInput>
  }

  /**
   * UserWorkoutExercise createMany
   */
  export type UserWorkoutExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserWorkoutExercises.
     */
    data: UserWorkoutExerciseCreateManyInput | UserWorkoutExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserWorkoutExercise createManyAndReturn
   */
  export type UserWorkoutExerciseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * The data used to create many UserWorkoutExercises.
     */
    data: UserWorkoutExerciseCreateManyInput | UserWorkoutExerciseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserWorkoutExercise update
   */
  export type UserWorkoutExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    /**
     * The data needed to update a UserWorkoutExercise.
     */
    data: XOR<UserWorkoutExerciseUpdateInput, UserWorkoutExerciseUncheckedUpdateInput>
    /**
     * Choose, which UserWorkoutExercise to update.
     */
    where: UserWorkoutExerciseWhereUniqueInput
  }

  /**
   * UserWorkoutExercise updateMany
   */
  export type UserWorkoutExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserWorkoutExercises.
     */
    data: XOR<UserWorkoutExerciseUpdateManyMutationInput, UserWorkoutExerciseUncheckedUpdateManyInput>
    /**
     * Filter which UserWorkoutExercises to update
     */
    where?: UserWorkoutExerciseWhereInput
    /**
     * Limit how many UserWorkoutExercises to update.
     */
    limit?: number
  }

  /**
   * UserWorkoutExercise updateManyAndReturn
   */
  export type UserWorkoutExerciseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * The data used to update UserWorkoutExercises.
     */
    data: XOR<UserWorkoutExerciseUpdateManyMutationInput, UserWorkoutExerciseUncheckedUpdateManyInput>
    /**
     * Filter which UserWorkoutExercises to update
     */
    where?: UserWorkoutExerciseWhereInput
    /**
     * Limit how many UserWorkoutExercises to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserWorkoutExercise upsert
   */
  export type UserWorkoutExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    /**
     * The filter to search for the UserWorkoutExercise to update in case it exists.
     */
    where: UserWorkoutExerciseWhereUniqueInput
    /**
     * In case the UserWorkoutExercise found by the `where` argument doesn't exist, create a new UserWorkoutExercise with this data.
     */
    create: XOR<UserWorkoutExerciseCreateInput, UserWorkoutExerciseUncheckedCreateInput>
    /**
     * In case the UserWorkoutExercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserWorkoutExerciseUpdateInput, UserWorkoutExerciseUncheckedUpdateInput>
  }

  /**
   * UserWorkoutExercise delete
   */
  export type UserWorkoutExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    /**
     * Filter which UserWorkoutExercise to delete.
     */
    where: UserWorkoutExerciseWhereUniqueInput
  }

  /**
   * UserWorkoutExercise deleteMany
   */
  export type UserWorkoutExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWorkoutExercises to delete
     */
    where?: UserWorkoutExerciseWhereInput
    /**
     * Limit how many UserWorkoutExercises to delete.
     */
    limit?: number
  }

  /**
   * UserWorkoutExercise.userSets
   */
  export type UserWorkoutExercise$userSetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSet
     */
    select?: UserSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSet
     */
    omit?: UserSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSetInclude<ExtArgs> | null
    where?: UserSetWhereInput
    orderBy?: UserSetOrderByWithRelationInput | UserSetOrderByWithRelationInput[]
    cursor?: UserSetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSetScalarFieldEnum | UserSetScalarFieldEnum[]
  }

  /**
   * UserWorkoutExercise without action
   */
  export type UserWorkoutExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
  }


  /**
   * Model UserWorkout
   */

  export type AggregateUserWorkout = {
    _count: UserWorkoutCountAggregateOutputType | null
    _min: UserWorkoutMinAggregateOutputType | null
    _max: UserWorkoutMaxAggregateOutputType | null
  }

  export type UserWorkoutMinAggregateOutputType = {
    id: string | null
    dateCompleted: Date | null
    ownerId: string | null
    programId: string | null
    workoutId: string | null
    createdAt: Date | null
  }

  export type UserWorkoutMaxAggregateOutputType = {
    id: string | null
    dateCompleted: Date | null
    ownerId: string | null
    programId: string | null
    workoutId: string | null
    createdAt: Date | null
  }

  export type UserWorkoutCountAggregateOutputType = {
    id: number
    dateCompleted: number
    ownerId: number
    programId: number
    workoutId: number
    createdAt: number
    _all: number
  }


  export type UserWorkoutMinAggregateInputType = {
    id?: true
    dateCompleted?: true
    ownerId?: true
    programId?: true
    workoutId?: true
    createdAt?: true
  }

  export type UserWorkoutMaxAggregateInputType = {
    id?: true
    dateCompleted?: true
    ownerId?: true
    programId?: true
    workoutId?: true
    createdAt?: true
  }

  export type UserWorkoutCountAggregateInputType = {
    id?: true
    dateCompleted?: true
    ownerId?: true
    programId?: true
    workoutId?: true
    createdAt?: true
    _all?: true
  }

  export type UserWorkoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWorkout to aggregate.
     */
    where?: UserWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWorkouts to fetch.
     */
    orderBy?: UserWorkoutOrderByWithRelationInput | UserWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserWorkouts
    **/
    _count?: true | UserWorkoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserWorkoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserWorkoutMaxAggregateInputType
  }

  export type GetUserWorkoutAggregateType<T extends UserWorkoutAggregateArgs> = {
        [P in keyof T & keyof AggregateUserWorkout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserWorkout[P]>
      : GetScalarType<T[P], AggregateUserWorkout[P]>
  }




  export type UserWorkoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWorkoutWhereInput
    orderBy?: UserWorkoutOrderByWithAggregationInput | UserWorkoutOrderByWithAggregationInput[]
    by: UserWorkoutScalarFieldEnum[] | UserWorkoutScalarFieldEnum
    having?: UserWorkoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserWorkoutCountAggregateInputType | true
    _min?: UserWorkoutMinAggregateInputType
    _max?: UserWorkoutMaxAggregateInputType
  }

  export type UserWorkoutGroupByOutputType = {
    id: string
    dateCompleted: Date | null
    ownerId: string
    programId: string | null
    workoutId: string | null
    createdAt: Date
    _count: UserWorkoutCountAggregateOutputType | null
    _min: UserWorkoutMinAggregateOutputType | null
    _max: UserWorkoutMaxAggregateOutputType | null
  }

  type GetUserWorkoutGroupByPayload<T extends UserWorkoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserWorkoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserWorkoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserWorkoutGroupByOutputType[P]>
            : GetScalarType<T[P], UserWorkoutGroupByOutputType[P]>
        }
      >
    >


  export type UserWorkoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateCompleted?: boolean
    ownerId?: boolean
    programId?: boolean
    workoutId?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    userWorkoutExercises?: boolean | UserWorkout$userWorkoutExercisesArgs<ExtArgs>
    program?: boolean | UserWorkout$programArgs<ExtArgs>
    workout?: boolean | UserWorkout$workoutArgs<ExtArgs>
    _count?: boolean | UserWorkoutCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWorkout"]>

  export type UserWorkoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateCompleted?: boolean
    ownerId?: boolean
    programId?: boolean
    workoutId?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    program?: boolean | UserWorkout$programArgs<ExtArgs>
    workout?: boolean | UserWorkout$workoutArgs<ExtArgs>
  }, ExtArgs["result"]["userWorkout"]>

  export type UserWorkoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateCompleted?: boolean
    ownerId?: boolean
    programId?: boolean
    workoutId?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    program?: boolean | UserWorkout$programArgs<ExtArgs>
    workout?: boolean | UserWorkout$workoutArgs<ExtArgs>
  }, ExtArgs["result"]["userWorkout"]>

  export type UserWorkoutSelectScalar = {
    id?: boolean
    dateCompleted?: boolean
    ownerId?: boolean
    programId?: boolean
    workoutId?: boolean
    createdAt?: boolean
  }

  export type UserWorkoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dateCompleted" | "ownerId" | "programId" | "workoutId" | "createdAt", ExtArgs["result"]["userWorkout"]>
  export type UserWorkoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    userWorkoutExercises?: boolean | UserWorkout$userWorkoutExercisesArgs<ExtArgs>
    program?: boolean | UserWorkout$programArgs<ExtArgs>
    workout?: boolean | UserWorkout$workoutArgs<ExtArgs>
    _count?: boolean | UserWorkoutCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserWorkoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    program?: boolean | UserWorkout$programArgs<ExtArgs>
    workout?: boolean | UserWorkout$workoutArgs<ExtArgs>
  }
  export type UserWorkoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    program?: boolean | UserWorkout$programArgs<ExtArgs>
    workout?: boolean | UserWorkout$workoutArgs<ExtArgs>
  }

  export type $UserWorkoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserWorkout"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      userWorkoutExercises: Prisma.$UserWorkoutExercisePayload<ExtArgs>[]
      program: Prisma.$ProgramPayload<ExtArgs> | null
      workout: Prisma.$WorkoutPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dateCompleted: Date | null
      ownerId: string
      programId: string | null
      workoutId: string | null
      createdAt: Date
    }, ExtArgs["result"]["userWorkout"]>
    composites: {}
  }

  type UserWorkoutGetPayload<S extends boolean | null | undefined | UserWorkoutDefaultArgs> = $Result.GetResult<Prisma.$UserWorkoutPayload, S>

  type UserWorkoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserWorkoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserWorkoutCountAggregateInputType | true
    }

  export interface UserWorkoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserWorkout'], meta: { name: 'UserWorkout' } }
    /**
     * Find zero or one UserWorkout that matches the filter.
     * @param {UserWorkoutFindUniqueArgs} args - Arguments to find a UserWorkout
     * @example
     * // Get one UserWorkout
     * const userWorkout = await prisma.userWorkout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserWorkoutFindUniqueArgs>(args: SelectSubset<T, UserWorkoutFindUniqueArgs<ExtArgs>>): Prisma__UserWorkoutClient<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserWorkout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserWorkoutFindUniqueOrThrowArgs} args - Arguments to find a UserWorkout
     * @example
     * // Get one UserWorkout
     * const userWorkout = await prisma.userWorkout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserWorkoutFindUniqueOrThrowArgs>(args: SelectSubset<T, UserWorkoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserWorkoutClient<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserWorkout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutFindFirstArgs} args - Arguments to find a UserWorkout
     * @example
     * // Get one UserWorkout
     * const userWorkout = await prisma.userWorkout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserWorkoutFindFirstArgs>(args?: SelectSubset<T, UserWorkoutFindFirstArgs<ExtArgs>>): Prisma__UserWorkoutClient<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserWorkout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutFindFirstOrThrowArgs} args - Arguments to find a UserWorkout
     * @example
     * // Get one UserWorkout
     * const userWorkout = await prisma.userWorkout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserWorkoutFindFirstOrThrowArgs>(args?: SelectSubset<T, UserWorkoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserWorkoutClient<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserWorkouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserWorkouts
     * const userWorkouts = await prisma.userWorkout.findMany()
     * 
     * // Get first 10 UserWorkouts
     * const userWorkouts = await prisma.userWorkout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWorkoutWithIdOnly = await prisma.userWorkout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserWorkoutFindManyArgs>(args?: SelectSubset<T, UserWorkoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserWorkout.
     * @param {UserWorkoutCreateArgs} args - Arguments to create a UserWorkout.
     * @example
     * // Create one UserWorkout
     * const UserWorkout = await prisma.userWorkout.create({
     *   data: {
     *     // ... data to create a UserWorkout
     *   }
     * })
     * 
     */
    create<T extends UserWorkoutCreateArgs>(args: SelectSubset<T, UserWorkoutCreateArgs<ExtArgs>>): Prisma__UserWorkoutClient<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserWorkouts.
     * @param {UserWorkoutCreateManyArgs} args - Arguments to create many UserWorkouts.
     * @example
     * // Create many UserWorkouts
     * const userWorkout = await prisma.userWorkout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserWorkoutCreateManyArgs>(args?: SelectSubset<T, UserWorkoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserWorkouts and returns the data saved in the database.
     * @param {UserWorkoutCreateManyAndReturnArgs} args - Arguments to create many UserWorkouts.
     * @example
     * // Create many UserWorkouts
     * const userWorkout = await prisma.userWorkout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserWorkouts and only return the `id`
     * const userWorkoutWithIdOnly = await prisma.userWorkout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserWorkoutCreateManyAndReturnArgs>(args?: SelectSubset<T, UserWorkoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserWorkout.
     * @param {UserWorkoutDeleteArgs} args - Arguments to delete one UserWorkout.
     * @example
     * // Delete one UserWorkout
     * const UserWorkout = await prisma.userWorkout.delete({
     *   where: {
     *     // ... filter to delete one UserWorkout
     *   }
     * })
     * 
     */
    delete<T extends UserWorkoutDeleteArgs>(args: SelectSubset<T, UserWorkoutDeleteArgs<ExtArgs>>): Prisma__UserWorkoutClient<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserWorkout.
     * @param {UserWorkoutUpdateArgs} args - Arguments to update one UserWorkout.
     * @example
     * // Update one UserWorkout
     * const userWorkout = await prisma.userWorkout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserWorkoutUpdateArgs>(args: SelectSubset<T, UserWorkoutUpdateArgs<ExtArgs>>): Prisma__UserWorkoutClient<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserWorkouts.
     * @param {UserWorkoutDeleteManyArgs} args - Arguments to filter UserWorkouts to delete.
     * @example
     * // Delete a few UserWorkouts
     * const { count } = await prisma.userWorkout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserWorkoutDeleteManyArgs>(args?: SelectSubset<T, UserWorkoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWorkouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserWorkouts
     * const userWorkout = await prisma.userWorkout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserWorkoutUpdateManyArgs>(args: SelectSubset<T, UserWorkoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWorkouts and returns the data updated in the database.
     * @param {UserWorkoutUpdateManyAndReturnArgs} args - Arguments to update many UserWorkouts.
     * @example
     * // Update many UserWorkouts
     * const userWorkout = await prisma.userWorkout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserWorkouts and only return the `id`
     * const userWorkoutWithIdOnly = await prisma.userWorkout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserWorkoutUpdateManyAndReturnArgs>(args: SelectSubset<T, UserWorkoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserWorkout.
     * @param {UserWorkoutUpsertArgs} args - Arguments to update or create a UserWorkout.
     * @example
     * // Update or create a UserWorkout
     * const userWorkout = await prisma.userWorkout.upsert({
     *   create: {
     *     // ... data to create a UserWorkout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserWorkout we want to update
     *   }
     * })
     */
    upsert<T extends UserWorkoutUpsertArgs>(args: SelectSubset<T, UserWorkoutUpsertArgs<ExtArgs>>): Prisma__UserWorkoutClient<$Result.GetResult<Prisma.$UserWorkoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserWorkouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutCountArgs} args - Arguments to filter UserWorkouts to count.
     * @example
     * // Count the number of UserWorkouts
     * const count = await prisma.userWorkout.count({
     *   where: {
     *     // ... the filter for the UserWorkouts we want to count
     *   }
     * })
    **/
    count<T extends UserWorkoutCountArgs>(
      args?: Subset<T, UserWorkoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserWorkoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserWorkout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserWorkoutAggregateArgs>(args: Subset<T, UserWorkoutAggregateArgs>): Prisma.PrismaPromise<GetUserWorkoutAggregateType<T>>

    /**
     * Group by UserWorkout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWorkoutGroupByArgs} args - Group by arguments.
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
      T extends UserWorkoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserWorkoutGroupByArgs['orderBy'] }
        : { orderBy?: UserWorkoutGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserWorkoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserWorkoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserWorkout model
   */
  readonly fields: UserWorkoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserWorkout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserWorkoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userWorkoutExercises<T extends UserWorkout$userWorkoutExercisesArgs<ExtArgs> = {}>(args?: Subset<T, UserWorkout$userWorkoutExercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWorkoutExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    program<T extends UserWorkout$programArgs<ExtArgs> = {}>(args?: Subset<T, UserWorkout$programArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    workout<T extends UserWorkout$workoutArgs<ExtArgs> = {}>(args?: Subset<T, UserWorkout$workoutArgs<ExtArgs>>): Prisma__WorkoutClient<$Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserWorkout model
   */
  interface UserWorkoutFieldRefs {
    readonly id: FieldRef<"UserWorkout", 'String'>
    readonly dateCompleted: FieldRef<"UserWorkout", 'DateTime'>
    readonly ownerId: FieldRef<"UserWorkout", 'String'>
    readonly programId: FieldRef<"UserWorkout", 'String'>
    readonly workoutId: FieldRef<"UserWorkout", 'String'>
    readonly createdAt: FieldRef<"UserWorkout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserWorkout findUnique
   */
  export type UserWorkoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which UserWorkout to fetch.
     */
    where: UserWorkoutWhereUniqueInput
  }

  /**
   * UserWorkout findUniqueOrThrow
   */
  export type UserWorkoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which UserWorkout to fetch.
     */
    where: UserWorkoutWhereUniqueInput
  }

  /**
   * UserWorkout findFirst
   */
  export type UserWorkoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which UserWorkout to fetch.
     */
    where?: UserWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWorkouts to fetch.
     */
    orderBy?: UserWorkoutOrderByWithRelationInput | UserWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWorkouts.
     */
    cursor?: UserWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWorkouts.
     */
    distinct?: UserWorkoutScalarFieldEnum | UserWorkoutScalarFieldEnum[]
  }

  /**
   * UserWorkout findFirstOrThrow
   */
  export type UserWorkoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which UserWorkout to fetch.
     */
    where?: UserWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWorkouts to fetch.
     */
    orderBy?: UserWorkoutOrderByWithRelationInput | UserWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWorkouts.
     */
    cursor?: UserWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWorkouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWorkouts.
     */
    distinct?: UserWorkoutScalarFieldEnum | UserWorkoutScalarFieldEnum[]
  }

  /**
   * UserWorkout findMany
   */
  export type UserWorkoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    /**
     * Filter, which UserWorkouts to fetch.
     */
    where?: UserWorkoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWorkouts to fetch.
     */
    orderBy?: UserWorkoutOrderByWithRelationInput | UserWorkoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserWorkouts.
     */
    cursor?: UserWorkoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWorkouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWorkouts.
     */
    skip?: number
    distinct?: UserWorkoutScalarFieldEnum | UserWorkoutScalarFieldEnum[]
  }

  /**
   * UserWorkout create
   */
  export type UserWorkoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    /**
     * The data needed to create a UserWorkout.
     */
    data: XOR<UserWorkoutCreateInput, UserWorkoutUncheckedCreateInput>
  }

  /**
   * UserWorkout createMany
   */
  export type UserWorkoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserWorkouts.
     */
    data: UserWorkoutCreateManyInput | UserWorkoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserWorkout createManyAndReturn
   */
  export type UserWorkoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * The data used to create many UserWorkouts.
     */
    data: UserWorkoutCreateManyInput | UserWorkoutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserWorkout update
   */
  export type UserWorkoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    /**
     * The data needed to update a UserWorkout.
     */
    data: XOR<UserWorkoutUpdateInput, UserWorkoutUncheckedUpdateInput>
    /**
     * Choose, which UserWorkout to update.
     */
    where: UserWorkoutWhereUniqueInput
  }

  /**
   * UserWorkout updateMany
   */
  export type UserWorkoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserWorkouts.
     */
    data: XOR<UserWorkoutUpdateManyMutationInput, UserWorkoutUncheckedUpdateManyInput>
    /**
     * Filter which UserWorkouts to update
     */
    where?: UserWorkoutWhereInput
    /**
     * Limit how many UserWorkouts to update.
     */
    limit?: number
  }

  /**
   * UserWorkout updateManyAndReturn
   */
  export type UserWorkoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * The data used to update UserWorkouts.
     */
    data: XOR<UserWorkoutUpdateManyMutationInput, UserWorkoutUncheckedUpdateManyInput>
    /**
     * Filter which UserWorkouts to update
     */
    where?: UserWorkoutWhereInput
    /**
     * Limit how many UserWorkouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserWorkout upsert
   */
  export type UserWorkoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    /**
     * The filter to search for the UserWorkout to update in case it exists.
     */
    where: UserWorkoutWhereUniqueInput
    /**
     * In case the UserWorkout found by the `where` argument doesn't exist, create a new UserWorkout with this data.
     */
    create: XOR<UserWorkoutCreateInput, UserWorkoutUncheckedCreateInput>
    /**
     * In case the UserWorkout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserWorkoutUpdateInput, UserWorkoutUncheckedUpdateInput>
  }

  /**
   * UserWorkout delete
   */
  export type UserWorkoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
    /**
     * Filter which UserWorkout to delete.
     */
    where: UserWorkoutWhereUniqueInput
  }

  /**
   * UserWorkout deleteMany
   */
  export type UserWorkoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWorkouts to delete
     */
    where?: UserWorkoutWhereInput
    /**
     * Limit how many UserWorkouts to delete.
     */
    limit?: number
  }

  /**
   * UserWorkout.userWorkoutExercises
   */
  export type UserWorkout$userWorkoutExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkoutExercise
     */
    select?: UserWorkoutExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkoutExercise
     */
    omit?: UserWorkoutExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutExerciseInclude<ExtArgs> | null
    where?: UserWorkoutExerciseWhereInput
    orderBy?: UserWorkoutExerciseOrderByWithRelationInput | UserWorkoutExerciseOrderByWithRelationInput[]
    cursor?: UserWorkoutExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWorkoutExerciseScalarFieldEnum | UserWorkoutExerciseScalarFieldEnum[]
  }

  /**
   * UserWorkout.program
   */
  export type UserWorkout$programArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    where?: ProgramWhereInput
  }

  /**
   * UserWorkout.workout
   */
  export type UserWorkout$workoutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null
    where?: WorkoutWhereInput
  }

  /**
   * UserWorkout without action
   */
  export type UserWorkoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWorkout
     */
    select?: UserWorkoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWorkout
     */
    omit?: UserWorkoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWorkoutInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    googleId: 'googleId',
    firstName: 'firstName',
    lastName: 'lastName',
    imgUrl: 'imgUrl',
    isAdmin: 'isAdmin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ExerciseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    youtubeUrl: 'youtubeUrl',
    type: 'type',
    notes: 'notes',
    equipment: 'equipment',
    muscles: 'muscles',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExerciseScalarFieldEnum = (typeof ExerciseScalarFieldEnum)[keyof typeof ExerciseScalarFieldEnum]


  export const CoreSetScalarFieldEnum: {
    id: 'id',
    restTime: 'restTime',
    numberOfSets: 'numberOfSets',
    hasWarmup: 'hasWarmup',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CoreSetScalarFieldEnum = (typeof CoreSetScalarFieldEnum)[keyof typeof CoreSetScalarFieldEnum]


  export const CoreCardioSetScalarFieldEnum: {
    id: 'id',
    warmupTime: 'warmupTime',
    avgHeartRate: 'avgHeartRate',
    avgSpeed: 'avgSpeed',
    distance: 'distance',
    calorieTarget: 'calorieTarget',
    duration: 'duration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CoreCardioSetScalarFieldEnum = (typeof CoreCardioSetScalarFieldEnum)[keyof typeof CoreCardioSetScalarFieldEnum]


  export const CoreSetRepsScalarFieldEnum: {
    id: 'id',
    coreSetId: 'coreSetId',
    reps: 'reps',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CoreSetRepsScalarFieldEnum = (typeof CoreSetRepsScalarFieldEnum)[keyof typeof CoreSetRepsScalarFieldEnum]


  export const CoreSetWeightScalarFieldEnum: {
    id: 'id',
    coreSetId: 'coreSetId',
    isBodyWeight: 'isBodyWeight',
    weight: 'weight',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CoreSetWeightScalarFieldEnum = (typeof CoreSetWeightScalarFieldEnum)[keyof typeof CoreSetWeightScalarFieldEnum]


  export const UserSetScalarFieldEnum: {
    id: 'id',
    reps: 'reps',
    weight: 'weight',
    isBodyWeight: 'isBodyWeight',
    restTime: 'restTime',
    order: 'order',
    isCompleted: 'isCompleted',
    isWarmup: 'isWarmup',
    isMuscleFailure: 'isMuscleFailure',
    isJointPain: 'isJointPain',
    userId: 'userId',
    userWorkoutExerciseId: 'userWorkoutExerciseId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserSetScalarFieldEnum = (typeof UserSetScalarFieldEnum)[keyof typeof UserSetScalarFieldEnum]


  export const ProgramScalarFieldEnum: {
    id: 'id',
    name: 'name',
    notes: 'notes',
    startDate: 'startDate',
    endDate: 'endDate',
    isActive: 'isActive',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProgramScalarFieldEnum = (typeof ProgramScalarFieldEnum)[keyof typeof ProgramScalarFieldEnum]


  export const ProgramWorkoutScalarFieldEnum: {
    id: 'id',
    programId: 'programId',
    workoutId: 'workoutId',
    daysOfWeek: 'daysOfWeek',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProgramWorkoutScalarFieldEnum = (typeof ProgramWorkoutScalarFieldEnum)[keyof typeof ProgramWorkoutScalarFieldEnum]


  export const WorkoutScalarFieldEnum: {
    id: 'id',
    name: 'name',
    notes: 'notes',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkoutScalarFieldEnum = (typeof WorkoutScalarFieldEnum)[keyof typeof WorkoutScalarFieldEnum]


  export const WorkoutExerciseScalarFieldEnum: {
    id: 'id',
    order: 'order',
    notes: 'notes',
    coreSetId: 'coreSetId',
    coreCardioSetId: 'coreCardioSetId',
    exerciseId: 'exerciseId',
    workoutId: 'workoutId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkoutExerciseScalarFieldEnum = (typeof WorkoutExerciseScalarFieldEnum)[keyof typeof WorkoutExerciseScalarFieldEnum]


  export const UserWorkoutExerciseScalarFieldEnum: {
    id: 'id',
    workoutExerciseId: 'workoutExerciseId',
    userWorkoutId: 'userWorkoutId'
  };

  export type UserWorkoutExerciseScalarFieldEnum = (typeof UserWorkoutExerciseScalarFieldEnum)[keyof typeof UserWorkoutExerciseScalarFieldEnum]


  export const UserWorkoutScalarFieldEnum: {
    id: 'id',
    dateCompleted: 'dateCompleted',
    ownerId: 'ownerId',
    programId: 'programId',
    workoutId: 'workoutId',
    createdAt: 'createdAt'
  };

  export type UserWorkoutScalarFieldEnum = (typeof UserWorkoutScalarFieldEnum)[keyof typeof UserWorkoutScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ExerciseType'
   */
  export type EnumExerciseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExerciseType'>
    


  /**
   * Reference to a field of type 'ExerciseType[]'
   */
  export type ListEnumExerciseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExerciseType[]'>
    


  /**
   * Reference to a field of type 'ExerciseEquipment[]'
   */
  export type ListEnumExerciseEquipmentFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExerciseEquipment[]'>
    


  /**
   * Reference to a field of type 'ExerciseEquipment'
   */
  export type EnumExerciseEquipmentFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExerciseEquipment'>
    


  /**
   * Reference to a field of type 'ExerciseMuscle[]'
   */
  export type ListEnumExerciseMuscleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExerciseMuscle[]'>
    


  /**
   * Reference to a field of type 'ExerciseMuscle'
   */
  export type EnumExerciseMuscleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExerciseMuscle'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DaysOfWeek[]'
   */
  export type ListEnumDaysOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DaysOfWeek[]'>
    


  /**
   * Reference to a field of type 'DaysOfWeek'
   */
  export type EnumDaysOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DaysOfWeek'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringNullableFilter<"User"> | string | null
    googleId?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    imgUrl?: StringNullableFilter<"User"> | string | null
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    programs?: ProgramListRelationFilter
    userSets?: UserSetListRelationFilter
    workouts?: WorkoutListRelationFilter
    userWorkout?: UserWorkoutListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    imgUrl?: SortOrderInput | SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    programs?: ProgramOrderByRelationAggregateInput
    userSets?: UserSetOrderByRelationAggregateInput
    workouts?: WorkoutOrderByRelationAggregateInput
    userWorkout?: UserWorkoutOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    googleId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    imgUrl?: StringNullableFilter<"User"> | string | null
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    programs?: ProgramListRelationFilter
    userSets?: UserSetListRelationFilter
    workouts?: WorkoutListRelationFilter
    userWorkout?: UserWorkoutListRelationFilter
  }, "id" | "email" | "googleId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    imgUrl?: SortOrderInput | SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    imgUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ExerciseWhereInput = {
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    id?: StringFilter<"Exercise"> | string
    name?: StringFilter<"Exercise"> | string
    youtubeUrl?: StringFilter<"Exercise"> | string
    type?: EnumExerciseTypeFilter<"Exercise"> | $Enums.ExerciseType
    notes?: StringNullableFilter<"Exercise"> | string | null
    equipment?: EnumExerciseEquipmentNullableListFilter<"Exercise">
    muscles?: EnumExerciseMuscleNullableListFilter<"Exercise">
    createdAt?: DateTimeFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeFilter<"Exercise"> | Date | string
    workoutExercises?: WorkoutExerciseListRelationFilter
  }

  export type ExerciseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    youtubeUrl?: SortOrder
    type?: SortOrder
    notes?: SortOrderInput | SortOrder
    equipment?: SortOrder
    muscles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workoutExercises?: WorkoutExerciseOrderByRelationAggregateInput
  }

  export type ExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    youtubeUrl?: StringFilter<"Exercise"> | string
    type?: EnumExerciseTypeFilter<"Exercise"> | $Enums.ExerciseType
    notes?: StringNullableFilter<"Exercise"> | string | null
    equipment?: EnumExerciseEquipmentNullableListFilter<"Exercise">
    muscles?: EnumExerciseMuscleNullableListFilter<"Exercise">
    createdAt?: DateTimeFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeFilter<"Exercise"> | Date | string
    workoutExercises?: WorkoutExerciseListRelationFilter
  }, "id" | "name">

  export type ExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    youtubeUrl?: SortOrder
    type?: SortOrder
    notes?: SortOrderInput | SortOrder
    equipment?: SortOrder
    muscles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExerciseCountOrderByAggregateInput
    _max?: ExerciseMaxOrderByAggregateInput
    _min?: ExerciseMinOrderByAggregateInput
  }

  export type ExerciseScalarWhereWithAggregatesInput = {
    AND?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    OR?: ExerciseScalarWhereWithAggregatesInput[]
    NOT?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exercise"> | string
    name?: StringWithAggregatesFilter<"Exercise"> | string
    youtubeUrl?: StringWithAggregatesFilter<"Exercise"> | string
    type?: EnumExerciseTypeWithAggregatesFilter<"Exercise"> | $Enums.ExerciseType
    notes?: StringNullableWithAggregatesFilter<"Exercise"> | string | null
    equipment?: EnumExerciseEquipmentNullableListFilter<"Exercise">
    muscles?: EnumExerciseMuscleNullableListFilter<"Exercise">
    createdAt?: DateTimeWithAggregatesFilter<"Exercise"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Exercise"> | Date | string
  }

  export type CoreSetWhereInput = {
    AND?: CoreSetWhereInput | CoreSetWhereInput[]
    OR?: CoreSetWhereInput[]
    NOT?: CoreSetWhereInput | CoreSetWhereInput[]
    id?: StringFilter<"CoreSet"> | string
    restTime?: IntFilter<"CoreSet"> | number
    numberOfSets?: IntFilter<"CoreSet"> | number
    hasWarmup?: BoolFilter<"CoreSet"> | boolean
    createdAt?: DateTimeFilter<"CoreSet"> | Date | string
    updatedAt?: DateTimeFilter<"CoreSet"> | Date | string
    workoutExercise?: WorkoutExerciseListRelationFilter
    reps?: CoreSetRepsListRelationFilter
    weight?: CoreSetWeightListRelationFilter
  }

  export type CoreSetOrderByWithRelationInput = {
    id?: SortOrder
    restTime?: SortOrder
    numberOfSets?: SortOrder
    hasWarmup?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workoutExercise?: WorkoutExerciseOrderByRelationAggregateInput
    reps?: CoreSetRepsOrderByRelationAggregateInput
    weight?: CoreSetWeightOrderByRelationAggregateInput
  }

  export type CoreSetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CoreSetWhereInput | CoreSetWhereInput[]
    OR?: CoreSetWhereInput[]
    NOT?: CoreSetWhereInput | CoreSetWhereInput[]
    restTime?: IntFilter<"CoreSet"> | number
    numberOfSets?: IntFilter<"CoreSet"> | number
    hasWarmup?: BoolFilter<"CoreSet"> | boolean
    createdAt?: DateTimeFilter<"CoreSet"> | Date | string
    updatedAt?: DateTimeFilter<"CoreSet"> | Date | string
    workoutExercise?: WorkoutExerciseListRelationFilter
    reps?: CoreSetRepsListRelationFilter
    weight?: CoreSetWeightListRelationFilter
  }, "id">

  export type CoreSetOrderByWithAggregationInput = {
    id?: SortOrder
    restTime?: SortOrder
    numberOfSets?: SortOrder
    hasWarmup?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CoreSetCountOrderByAggregateInput
    _avg?: CoreSetAvgOrderByAggregateInput
    _max?: CoreSetMaxOrderByAggregateInput
    _min?: CoreSetMinOrderByAggregateInput
    _sum?: CoreSetSumOrderByAggregateInput
  }

  export type CoreSetScalarWhereWithAggregatesInput = {
    AND?: CoreSetScalarWhereWithAggregatesInput | CoreSetScalarWhereWithAggregatesInput[]
    OR?: CoreSetScalarWhereWithAggregatesInput[]
    NOT?: CoreSetScalarWhereWithAggregatesInput | CoreSetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CoreSet"> | string
    restTime?: IntWithAggregatesFilter<"CoreSet"> | number
    numberOfSets?: IntWithAggregatesFilter<"CoreSet"> | number
    hasWarmup?: BoolWithAggregatesFilter<"CoreSet"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CoreSet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CoreSet"> | Date | string
  }

  export type CoreCardioSetWhereInput = {
    AND?: CoreCardioSetWhereInput | CoreCardioSetWhereInput[]
    OR?: CoreCardioSetWhereInput[]
    NOT?: CoreCardioSetWhereInput | CoreCardioSetWhereInput[]
    id?: StringFilter<"CoreCardioSet"> | string
    warmupTime?: IntNullableFilter<"CoreCardioSet"> | number | null
    avgHeartRate?: IntNullableFilter<"CoreCardioSet"> | number | null
    avgSpeed?: FloatNullableFilter<"CoreCardioSet"> | number | null
    distance?: FloatNullableFilter<"CoreCardioSet"> | number | null
    calorieTarget?: IntNullableFilter<"CoreCardioSet"> | number | null
    duration?: IntNullableFilter<"CoreCardioSet"> | number | null
    createdAt?: DateTimeFilter<"CoreCardioSet"> | Date | string
    updatedAt?: DateTimeFilter<"CoreCardioSet"> | Date | string
    workoutExercise?: WorkoutExerciseListRelationFilter
  }

  export type CoreCardioSetOrderByWithRelationInput = {
    id?: SortOrder
    warmupTime?: SortOrderInput | SortOrder
    avgHeartRate?: SortOrderInput | SortOrder
    avgSpeed?: SortOrderInput | SortOrder
    distance?: SortOrderInput | SortOrder
    calorieTarget?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workoutExercise?: WorkoutExerciseOrderByRelationAggregateInput
  }

  export type CoreCardioSetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CoreCardioSetWhereInput | CoreCardioSetWhereInput[]
    OR?: CoreCardioSetWhereInput[]
    NOT?: CoreCardioSetWhereInput | CoreCardioSetWhereInput[]
    warmupTime?: IntNullableFilter<"CoreCardioSet"> | number | null
    avgHeartRate?: IntNullableFilter<"CoreCardioSet"> | number | null
    avgSpeed?: FloatNullableFilter<"CoreCardioSet"> | number | null
    distance?: FloatNullableFilter<"CoreCardioSet"> | number | null
    calorieTarget?: IntNullableFilter<"CoreCardioSet"> | number | null
    duration?: IntNullableFilter<"CoreCardioSet"> | number | null
    createdAt?: DateTimeFilter<"CoreCardioSet"> | Date | string
    updatedAt?: DateTimeFilter<"CoreCardioSet"> | Date | string
    workoutExercise?: WorkoutExerciseListRelationFilter
  }, "id">

  export type CoreCardioSetOrderByWithAggregationInput = {
    id?: SortOrder
    warmupTime?: SortOrderInput | SortOrder
    avgHeartRate?: SortOrderInput | SortOrder
    avgSpeed?: SortOrderInput | SortOrder
    distance?: SortOrderInput | SortOrder
    calorieTarget?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CoreCardioSetCountOrderByAggregateInput
    _avg?: CoreCardioSetAvgOrderByAggregateInput
    _max?: CoreCardioSetMaxOrderByAggregateInput
    _min?: CoreCardioSetMinOrderByAggregateInput
    _sum?: CoreCardioSetSumOrderByAggregateInput
  }

  export type CoreCardioSetScalarWhereWithAggregatesInput = {
    AND?: CoreCardioSetScalarWhereWithAggregatesInput | CoreCardioSetScalarWhereWithAggregatesInput[]
    OR?: CoreCardioSetScalarWhereWithAggregatesInput[]
    NOT?: CoreCardioSetScalarWhereWithAggregatesInput | CoreCardioSetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CoreCardioSet"> | string
    warmupTime?: IntNullableWithAggregatesFilter<"CoreCardioSet"> | number | null
    avgHeartRate?: IntNullableWithAggregatesFilter<"CoreCardioSet"> | number | null
    avgSpeed?: FloatNullableWithAggregatesFilter<"CoreCardioSet"> | number | null
    distance?: FloatNullableWithAggregatesFilter<"CoreCardioSet"> | number | null
    calorieTarget?: IntNullableWithAggregatesFilter<"CoreCardioSet"> | number | null
    duration?: IntNullableWithAggregatesFilter<"CoreCardioSet"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CoreCardioSet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CoreCardioSet"> | Date | string
  }

  export type CoreSetRepsWhereInput = {
    AND?: CoreSetRepsWhereInput | CoreSetRepsWhereInput[]
    OR?: CoreSetRepsWhereInput[]
    NOT?: CoreSetRepsWhereInput | CoreSetRepsWhereInput[]
    id?: StringFilter<"CoreSetReps"> | string
    coreSetId?: StringFilter<"CoreSetReps"> | string
    reps?: IntFilter<"CoreSetReps"> | number
    createdAt?: DateTimeFilter<"CoreSetReps"> | Date | string
    updatedAt?: DateTimeFilter<"CoreSetReps"> | Date | string
    coreSet?: XOR<CoreSetScalarRelationFilter, CoreSetWhereInput>
  }

  export type CoreSetRepsOrderByWithRelationInput = {
    id?: SortOrder
    coreSetId?: SortOrder
    reps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coreSet?: CoreSetOrderByWithRelationInput
  }

  export type CoreSetRepsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CoreSetRepsWhereInput | CoreSetRepsWhereInput[]
    OR?: CoreSetRepsWhereInput[]
    NOT?: CoreSetRepsWhereInput | CoreSetRepsWhereInput[]
    coreSetId?: StringFilter<"CoreSetReps"> | string
    reps?: IntFilter<"CoreSetReps"> | number
    createdAt?: DateTimeFilter<"CoreSetReps"> | Date | string
    updatedAt?: DateTimeFilter<"CoreSetReps"> | Date | string
    coreSet?: XOR<CoreSetScalarRelationFilter, CoreSetWhereInput>
  }, "id">

  export type CoreSetRepsOrderByWithAggregationInput = {
    id?: SortOrder
    coreSetId?: SortOrder
    reps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CoreSetRepsCountOrderByAggregateInput
    _avg?: CoreSetRepsAvgOrderByAggregateInput
    _max?: CoreSetRepsMaxOrderByAggregateInput
    _min?: CoreSetRepsMinOrderByAggregateInput
    _sum?: CoreSetRepsSumOrderByAggregateInput
  }

  export type CoreSetRepsScalarWhereWithAggregatesInput = {
    AND?: CoreSetRepsScalarWhereWithAggregatesInput | CoreSetRepsScalarWhereWithAggregatesInput[]
    OR?: CoreSetRepsScalarWhereWithAggregatesInput[]
    NOT?: CoreSetRepsScalarWhereWithAggregatesInput | CoreSetRepsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CoreSetReps"> | string
    coreSetId?: StringWithAggregatesFilter<"CoreSetReps"> | string
    reps?: IntWithAggregatesFilter<"CoreSetReps"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CoreSetReps"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CoreSetReps"> | Date | string
  }

  export type CoreSetWeightWhereInput = {
    AND?: CoreSetWeightWhereInput | CoreSetWeightWhereInput[]
    OR?: CoreSetWeightWhereInput[]
    NOT?: CoreSetWeightWhereInput | CoreSetWeightWhereInput[]
    id?: StringFilter<"CoreSetWeight"> | string
    coreSetId?: StringFilter<"CoreSetWeight"> | string
    isBodyWeight?: BoolFilter<"CoreSetWeight"> | boolean
    weight?: FloatNullableFilter<"CoreSetWeight"> | number | null
    createdAt?: DateTimeFilter<"CoreSetWeight"> | Date | string
    updatedAt?: DateTimeFilter<"CoreSetWeight"> | Date | string
    coreSet?: XOR<CoreSetScalarRelationFilter, CoreSetWhereInput>
  }

  export type CoreSetWeightOrderByWithRelationInput = {
    id?: SortOrder
    coreSetId?: SortOrder
    isBodyWeight?: SortOrder
    weight?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coreSet?: CoreSetOrderByWithRelationInput
  }

  export type CoreSetWeightWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CoreSetWeightWhereInput | CoreSetWeightWhereInput[]
    OR?: CoreSetWeightWhereInput[]
    NOT?: CoreSetWeightWhereInput | CoreSetWeightWhereInput[]
    coreSetId?: StringFilter<"CoreSetWeight"> | string
    isBodyWeight?: BoolFilter<"CoreSetWeight"> | boolean
    weight?: FloatNullableFilter<"CoreSetWeight"> | number | null
    createdAt?: DateTimeFilter<"CoreSetWeight"> | Date | string
    updatedAt?: DateTimeFilter<"CoreSetWeight"> | Date | string
    coreSet?: XOR<CoreSetScalarRelationFilter, CoreSetWhereInput>
  }, "id">

  export type CoreSetWeightOrderByWithAggregationInput = {
    id?: SortOrder
    coreSetId?: SortOrder
    isBodyWeight?: SortOrder
    weight?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CoreSetWeightCountOrderByAggregateInput
    _avg?: CoreSetWeightAvgOrderByAggregateInput
    _max?: CoreSetWeightMaxOrderByAggregateInput
    _min?: CoreSetWeightMinOrderByAggregateInput
    _sum?: CoreSetWeightSumOrderByAggregateInput
  }

  export type CoreSetWeightScalarWhereWithAggregatesInput = {
    AND?: CoreSetWeightScalarWhereWithAggregatesInput | CoreSetWeightScalarWhereWithAggregatesInput[]
    OR?: CoreSetWeightScalarWhereWithAggregatesInput[]
    NOT?: CoreSetWeightScalarWhereWithAggregatesInput | CoreSetWeightScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CoreSetWeight"> | string
    coreSetId?: StringWithAggregatesFilter<"CoreSetWeight"> | string
    isBodyWeight?: BoolWithAggregatesFilter<"CoreSetWeight"> | boolean
    weight?: FloatNullableWithAggregatesFilter<"CoreSetWeight"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CoreSetWeight"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CoreSetWeight"> | Date | string
  }

  export type UserSetWhereInput = {
    AND?: UserSetWhereInput | UserSetWhereInput[]
    OR?: UserSetWhereInput[]
    NOT?: UserSetWhereInput | UserSetWhereInput[]
    id?: StringFilter<"UserSet"> | string
    reps?: IntFilter<"UserSet"> | number
    weight?: FloatNullableFilter<"UserSet"> | number | null
    isBodyWeight?: BoolFilter<"UserSet"> | boolean
    restTime?: IntFilter<"UserSet"> | number
    order?: IntFilter<"UserSet"> | number
    isCompleted?: BoolFilter<"UserSet"> | boolean
    isWarmup?: BoolFilter<"UserSet"> | boolean
    isMuscleFailure?: BoolFilter<"UserSet"> | boolean
    isJointPain?: BoolFilter<"UserSet"> | boolean
    userId?: StringFilter<"UserSet"> | string
    userWorkoutExerciseId?: StringFilter<"UserSet"> | string
    createdAt?: DateTimeFilter<"UserSet"> | Date | string
    updatedAt?: DateTimeFilter<"UserSet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    userWorkoutExercise?: XOR<UserWorkoutExerciseScalarRelationFilter, UserWorkoutExerciseWhereInput>
  }

  export type UserSetOrderByWithRelationInput = {
    id?: SortOrder
    reps?: SortOrder
    weight?: SortOrderInput | SortOrder
    isBodyWeight?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    isWarmup?: SortOrder
    isMuscleFailure?: SortOrder
    isJointPain?: SortOrder
    userId?: SortOrder
    userWorkoutExerciseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    userWorkoutExercise?: UserWorkoutExerciseOrderByWithRelationInput
  }

  export type UserSetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserSetWhereInput | UserSetWhereInput[]
    OR?: UserSetWhereInput[]
    NOT?: UserSetWhereInput | UserSetWhereInput[]
    reps?: IntFilter<"UserSet"> | number
    weight?: FloatNullableFilter<"UserSet"> | number | null
    isBodyWeight?: BoolFilter<"UserSet"> | boolean
    restTime?: IntFilter<"UserSet"> | number
    order?: IntFilter<"UserSet"> | number
    isCompleted?: BoolFilter<"UserSet"> | boolean
    isWarmup?: BoolFilter<"UserSet"> | boolean
    isMuscleFailure?: BoolFilter<"UserSet"> | boolean
    isJointPain?: BoolFilter<"UserSet"> | boolean
    userId?: StringFilter<"UserSet"> | string
    userWorkoutExerciseId?: StringFilter<"UserSet"> | string
    createdAt?: DateTimeFilter<"UserSet"> | Date | string
    updatedAt?: DateTimeFilter<"UserSet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    userWorkoutExercise?: XOR<UserWorkoutExerciseScalarRelationFilter, UserWorkoutExerciseWhereInput>
  }, "id">

  export type UserSetOrderByWithAggregationInput = {
    id?: SortOrder
    reps?: SortOrder
    weight?: SortOrderInput | SortOrder
    isBodyWeight?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    isWarmup?: SortOrder
    isMuscleFailure?: SortOrder
    isJointPain?: SortOrder
    userId?: SortOrder
    userWorkoutExerciseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserSetCountOrderByAggregateInput
    _avg?: UserSetAvgOrderByAggregateInput
    _max?: UserSetMaxOrderByAggregateInput
    _min?: UserSetMinOrderByAggregateInput
    _sum?: UserSetSumOrderByAggregateInput
  }

  export type UserSetScalarWhereWithAggregatesInput = {
    AND?: UserSetScalarWhereWithAggregatesInput | UserSetScalarWhereWithAggregatesInput[]
    OR?: UserSetScalarWhereWithAggregatesInput[]
    NOT?: UserSetScalarWhereWithAggregatesInput | UserSetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSet"> | string
    reps?: IntWithAggregatesFilter<"UserSet"> | number
    weight?: FloatNullableWithAggregatesFilter<"UserSet"> | number | null
    isBodyWeight?: BoolWithAggregatesFilter<"UserSet"> | boolean
    restTime?: IntWithAggregatesFilter<"UserSet"> | number
    order?: IntWithAggregatesFilter<"UserSet"> | number
    isCompleted?: BoolWithAggregatesFilter<"UserSet"> | boolean
    isWarmup?: BoolWithAggregatesFilter<"UserSet"> | boolean
    isMuscleFailure?: BoolWithAggregatesFilter<"UserSet"> | boolean
    isJointPain?: BoolWithAggregatesFilter<"UserSet"> | boolean
    userId?: StringWithAggregatesFilter<"UserSet"> | string
    userWorkoutExerciseId?: StringWithAggregatesFilter<"UserSet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserSet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserSet"> | Date | string
  }

  export type ProgramWhereInput = {
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    id?: StringFilter<"Program"> | string
    name?: StringFilter<"Program"> | string
    notes?: StringNullableFilter<"Program"> | string | null
    startDate?: DateTimeFilter<"Program"> | Date | string
    endDate?: DateTimeFilter<"Program"> | Date | string
    isActive?: BoolFilter<"Program"> | boolean
    ownerId?: StringFilter<"Program"> | string
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
    programWorkouts?: ProgramWorkoutListRelationFilter
    userWorkout?: UserWorkoutListRelationFilter
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProgramOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    notes?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    programWorkouts?: ProgramWorkoutOrderByRelationAggregateInput
    userWorkout?: UserWorkoutOrderByRelationAggregateInput
    owner?: UserOrderByWithRelationInput
  }

  export type ProgramWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    name?: StringFilter<"Program"> | string
    notes?: StringNullableFilter<"Program"> | string | null
    startDate?: DateTimeFilter<"Program"> | Date | string
    endDate?: DateTimeFilter<"Program"> | Date | string
    isActive?: BoolFilter<"Program"> | boolean
    ownerId?: StringFilter<"Program"> | string
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
    programWorkouts?: ProgramWorkoutListRelationFilter
    userWorkout?: UserWorkoutListRelationFilter
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProgramOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    notes?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProgramCountOrderByAggregateInput
    _max?: ProgramMaxOrderByAggregateInput
    _min?: ProgramMinOrderByAggregateInput
  }

  export type ProgramScalarWhereWithAggregatesInput = {
    AND?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    OR?: ProgramScalarWhereWithAggregatesInput[]
    NOT?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Program"> | string
    name?: StringWithAggregatesFilter<"Program"> | string
    notes?: StringNullableWithAggregatesFilter<"Program"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"Program"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Program"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Program"> | boolean
    ownerId?: StringWithAggregatesFilter<"Program"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Program"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Program"> | Date | string
  }

  export type ProgramWorkoutWhereInput = {
    AND?: ProgramWorkoutWhereInput | ProgramWorkoutWhereInput[]
    OR?: ProgramWorkoutWhereInput[]
    NOT?: ProgramWorkoutWhereInput | ProgramWorkoutWhereInput[]
    id?: StringFilter<"ProgramWorkout"> | string
    programId?: StringFilter<"ProgramWorkout"> | string
    workoutId?: StringFilter<"ProgramWorkout"> | string
    daysOfWeek?: EnumDaysOfWeekNullableListFilter<"ProgramWorkout">
    createdAt?: DateTimeFilter<"ProgramWorkout"> | Date | string
    updatedAt?: DateTimeFilter<"ProgramWorkout"> | Date | string
    program?: XOR<ProgramScalarRelationFilter, ProgramWhereInput>
    workout?: XOR<WorkoutScalarRelationFilter, WorkoutWhereInput>
  }

  export type ProgramWorkoutOrderByWithRelationInput = {
    id?: SortOrder
    programId?: SortOrder
    workoutId?: SortOrder
    daysOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    program?: ProgramOrderByWithRelationInput
    workout?: WorkoutOrderByWithRelationInput
  }

  export type ProgramWorkoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    programId_workoutId?: ProgramWorkoutProgramIdWorkoutIdCompoundUniqueInput
    AND?: ProgramWorkoutWhereInput | ProgramWorkoutWhereInput[]
    OR?: ProgramWorkoutWhereInput[]
    NOT?: ProgramWorkoutWhereInput | ProgramWorkoutWhereInput[]
    programId?: StringFilter<"ProgramWorkout"> | string
    workoutId?: StringFilter<"ProgramWorkout"> | string
    daysOfWeek?: EnumDaysOfWeekNullableListFilter<"ProgramWorkout">
    createdAt?: DateTimeFilter<"ProgramWorkout"> | Date | string
    updatedAt?: DateTimeFilter<"ProgramWorkout"> | Date | string
    program?: XOR<ProgramScalarRelationFilter, ProgramWhereInput>
    workout?: XOR<WorkoutScalarRelationFilter, WorkoutWhereInput>
  }, "id" | "programId_workoutId">

  export type ProgramWorkoutOrderByWithAggregationInput = {
    id?: SortOrder
    programId?: SortOrder
    workoutId?: SortOrder
    daysOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProgramWorkoutCountOrderByAggregateInput
    _max?: ProgramWorkoutMaxOrderByAggregateInput
    _min?: ProgramWorkoutMinOrderByAggregateInput
  }

  export type ProgramWorkoutScalarWhereWithAggregatesInput = {
    AND?: ProgramWorkoutScalarWhereWithAggregatesInput | ProgramWorkoutScalarWhereWithAggregatesInput[]
    OR?: ProgramWorkoutScalarWhereWithAggregatesInput[]
    NOT?: ProgramWorkoutScalarWhereWithAggregatesInput | ProgramWorkoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProgramWorkout"> | string
    programId?: StringWithAggregatesFilter<"ProgramWorkout"> | string
    workoutId?: StringWithAggregatesFilter<"ProgramWorkout"> | string
    daysOfWeek?: EnumDaysOfWeekNullableListFilter<"ProgramWorkout">
    createdAt?: DateTimeWithAggregatesFilter<"ProgramWorkout"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProgramWorkout"> | Date | string
  }

  export type WorkoutWhereInput = {
    AND?: WorkoutWhereInput | WorkoutWhereInput[]
    OR?: WorkoutWhereInput[]
    NOT?: WorkoutWhereInput | WorkoutWhereInput[]
    id?: StringFilter<"Workout"> | string
    name?: StringNullableFilter<"Workout"> | string | null
    notes?: StringNullableFilter<"Workout"> | string | null
    ownerId?: StringNullableFilter<"Workout"> | string | null
    createdAt?: DateTimeFilter<"Workout"> | Date | string
    updatedAt?: DateTimeFilter<"Workout"> | Date | string
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    workoutExercises?: WorkoutExerciseListRelationFilter
    programWorkouts?: ProgramWorkoutListRelationFilter
    userWorkouts?: UserWorkoutListRelationFilter
  }

  export type WorkoutOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    workoutExercises?: WorkoutExerciseOrderByRelationAggregateInput
    programWorkouts?: ProgramWorkoutOrderByRelationAggregateInput
    userWorkouts?: UserWorkoutOrderByRelationAggregateInput
  }

  export type WorkoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkoutWhereInput | WorkoutWhereInput[]
    OR?: WorkoutWhereInput[]
    NOT?: WorkoutWhereInput | WorkoutWhereInput[]
    name?: StringNullableFilter<"Workout"> | string | null
    notes?: StringNullableFilter<"Workout"> | string | null
    ownerId?: StringNullableFilter<"Workout"> | string | null
    createdAt?: DateTimeFilter<"Workout"> | Date | string
    updatedAt?: DateTimeFilter<"Workout"> | Date | string
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    workoutExercises?: WorkoutExerciseListRelationFilter
    programWorkouts?: ProgramWorkoutListRelationFilter
    userWorkouts?: UserWorkoutListRelationFilter
  }, "id">

  export type WorkoutOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkoutCountOrderByAggregateInput
    _max?: WorkoutMaxOrderByAggregateInput
    _min?: WorkoutMinOrderByAggregateInput
  }

  export type WorkoutScalarWhereWithAggregatesInput = {
    AND?: WorkoutScalarWhereWithAggregatesInput | WorkoutScalarWhereWithAggregatesInput[]
    OR?: WorkoutScalarWhereWithAggregatesInput[]
    NOT?: WorkoutScalarWhereWithAggregatesInput | WorkoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workout"> | string
    name?: StringNullableWithAggregatesFilter<"Workout"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Workout"> | string | null
    ownerId?: StringNullableWithAggregatesFilter<"Workout"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Workout"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Workout"> | Date | string
  }

  export type WorkoutExerciseWhereInput = {
    AND?: WorkoutExerciseWhereInput | WorkoutExerciseWhereInput[]
    OR?: WorkoutExerciseWhereInput[]
    NOT?: WorkoutExerciseWhereInput | WorkoutExerciseWhereInput[]
    id?: StringFilter<"WorkoutExercise"> | string
    order?: IntFilter<"WorkoutExercise"> | number
    notes?: StringNullableFilter<"WorkoutExercise"> | string | null
    coreSetId?: StringNullableFilter<"WorkoutExercise"> | string | null
    coreCardioSetId?: StringNullableFilter<"WorkoutExercise"> | string | null
    exerciseId?: StringFilter<"WorkoutExercise"> | string
    workoutId?: StringFilter<"WorkoutExercise"> | string
    createdAt?: DateTimeFilter<"WorkoutExercise"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutExercise"> | Date | string
    coreSet?: XOR<CoreSetNullableScalarRelationFilter, CoreSetWhereInput> | null
    coreCardioSet?: XOR<CoreCardioSetNullableScalarRelationFilter, CoreCardioSetWhereInput> | null
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>
    workout?: XOR<WorkoutScalarRelationFilter, WorkoutWhereInput>
    userWorkoutExercises?: UserWorkoutExerciseListRelationFilter
  }

  export type WorkoutExerciseOrderByWithRelationInput = {
    id?: SortOrder
    order?: SortOrder
    notes?: SortOrderInput | SortOrder
    coreSetId?: SortOrderInput | SortOrder
    coreCardioSetId?: SortOrderInput | SortOrder
    exerciseId?: SortOrder
    workoutId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    coreSet?: CoreSetOrderByWithRelationInput
    coreCardioSet?: CoreCardioSetOrderByWithRelationInput
    exercise?: ExerciseOrderByWithRelationInput
    workout?: WorkoutOrderByWithRelationInput
    userWorkoutExercises?: UserWorkoutExerciseOrderByRelationAggregateInput
  }

  export type WorkoutExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkoutExerciseWhereInput | WorkoutExerciseWhereInput[]
    OR?: WorkoutExerciseWhereInput[]
    NOT?: WorkoutExerciseWhereInput | WorkoutExerciseWhereInput[]
    order?: IntFilter<"WorkoutExercise"> | number
    notes?: StringNullableFilter<"WorkoutExercise"> | string | null
    coreSetId?: StringNullableFilter<"WorkoutExercise"> | string | null
    coreCardioSetId?: StringNullableFilter<"WorkoutExercise"> | string | null
    exerciseId?: StringFilter<"WorkoutExercise"> | string
    workoutId?: StringFilter<"WorkoutExercise"> | string
    createdAt?: DateTimeFilter<"WorkoutExercise"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutExercise"> | Date | string
    coreSet?: XOR<CoreSetNullableScalarRelationFilter, CoreSetWhereInput> | null
    coreCardioSet?: XOR<CoreCardioSetNullableScalarRelationFilter, CoreCardioSetWhereInput> | null
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>
    workout?: XOR<WorkoutScalarRelationFilter, WorkoutWhereInput>
    userWorkoutExercises?: UserWorkoutExerciseListRelationFilter
  }, "id">

  export type WorkoutExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    order?: SortOrder
    notes?: SortOrderInput | SortOrder
    coreSetId?: SortOrderInput | SortOrder
    coreCardioSetId?: SortOrderInput | SortOrder
    exerciseId?: SortOrder
    workoutId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkoutExerciseCountOrderByAggregateInput
    _avg?: WorkoutExerciseAvgOrderByAggregateInput
    _max?: WorkoutExerciseMaxOrderByAggregateInput
    _min?: WorkoutExerciseMinOrderByAggregateInput
    _sum?: WorkoutExerciseSumOrderByAggregateInput
  }

  export type WorkoutExerciseScalarWhereWithAggregatesInput = {
    AND?: WorkoutExerciseScalarWhereWithAggregatesInput | WorkoutExerciseScalarWhereWithAggregatesInput[]
    OR?: WorkoutExerciseScalarWhereWithAggregatesInput[]
    NOT?: WorkoutExerciseScalarWhereWithAggregatesInput | WorkoutExerciseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkoutExercise"> | string
    order?: IntWithAggregatesFilter<"WorkoutExercise"> | number
    notes?: StringNullableWithAggregatesFilter<"WorkoutExercise"> | string | null
    coreSetId?: StringNullableWithAggregatesFilter<"WorkoutExercise"> | string | null
    coreCardioSetId?: StringNullableWithAggregatesFilter<"WorkoutExercise"> | string | null
    exerciseId?: StringWithAggregatesFilter<"WorkoutExercise"> | string
    workoutId?: StringWithAggregatesFilter<"WorkoutExercise"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WorkoutExercise"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkoutExercise"> | Date | string
  }

  export type UserWorkoutExerciseWhereInput = {
    AND?: UserWorkoutExerciseWhereInput | UserWorkoutExerciseWhereInput[]
    OR?: UserWorkoutExerciseWhereInput[]
    NOT?: UserWorkoutExerciseWhereInput | UserWorkoutExerciseWhereInput[]
    id?: StringFilter<"UserWorkoutExercise"> | string
    workoutExerciseId?: StringFilter<"UserWorkoutExercise"> | string
    userWorkoutId?: StringFilter<"UserWorkoutExercise"> | string
    workoutExercise?: XOR<WorkoutExerciseScalarRelationFilter, WorkoutExerciseWhereInput>
    userWorkout?: XOR<UserWorkoutScalarRelationFilter, UserWorkoutWhereInput>
    userSets?: UserSetListRelationFilter
  }

  export type UserWorkoutExerciseOrderByWithRelationInput = {
    id?: SortOrder
    workoutExerciseId?: SortOrder
    userWorkoutId?: SortOrder
    workoutExercise?: WorkoutExerciseOrderByWithRelationInput
    userWorkout?: UserWorkoutOrderByWithRelationInput
    userSets?: UserSetOrderByRelationAggregateInput
  }

  export type UserWorkoutExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWorkoutExerciseWhereInput | UserWorkoutExerciseWhereInput[]
    OR?: UserWorkoutExerciseWhereInput[]
    NOT?: UserWorkoutExerciseWhereInput | UserWorkoutExerciseWhereInput[]
    workoutExerciseId?: StringFilter<"UserWorkoutExercise"> | string
    userWorkoutId?: StringFilter<"UserWorkoutExercise"> | string
    workoutExercise?: XOR<WorkoutExerciseScalarRelationFilter, WorkoutExerciseWhereInput>
    userWorkout?: XOR<UserWorkoutScalarRelationFilter, UserWorkoutWhereInput>
    userSets?: UserSetListRelationFilter
  }, "id">

  export type UserWorkoutExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    workoutExerciseId?: SortOrder
    userWorkoutId?: SortOrder
    _count?: UserWorkoutExerciseCountOrderByAggregateInput
    _max?: UserWorkoutExerciseMaxOrderByAggregateInput
    _min?: UserWorkoutExerciseMinOrderByAggregateInput
  }

  export type UserWorkoutExerciseScalarWhereWithAggregatesInput = {
    AND?: UserWorkoutExerciseScalarWhereWithAggregatesInput | UserWorkoutExerciseScalarWhereWithAggregatesInput[]
    OR?: UserWorkoutExerciseScalarWhereWithAggregatesInput[]
    NOT?: UserWorkoutExerciseScalarWhereWithAggregatesInput | UserWorkoutExerciseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserWorkoutExercise"> | string
    workoutExerciseId?: StringWithAggregatesFilter<"UserWorkoutExercise"> | string
    userWorkoutId?: StringWithAggregatesFilter<"UserWorkoutExercise"> | string
  }

  export type UserWorkoutWhereInput = {
    AND?: UserWorkoutWhereInput | UserWorkoutWhereInput[]
    OR?: UserWorkoutWhereInput[]
    NOT?: UserWorkoutWhereInput | UserWorkoutWhereInput[]
    id?: StringFilter<"UserWorkout"> | string
    dateCompleted?: DateTimeNullableFilter<"UserWorkout"> | Date | string | null
    ownerId?: StringFilter<"UserWorkout"> | string
    programId?: StringNullableFilter<"UserWorkout"> | string | null
    workoutId?: StringNullableFilter<"UserWorkout"> | string | null
    createdAt?: DateTimeFilter<"UserWorkout"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    userWorkoutExercises?: UserWorkoutExerciseListRelationFilter
    program?: XOR<ProgramNullableScalarRelationFilter, ProgramWhereInput> | null
    workout?: XOR<WorkoutNullableScalarRelationFilter, WorkoutWhereInput> | null
  }

  export type UserWorkoutOrderByWithRelationInput = {
    id?: SortOrder
    dateCompleted?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    programId?: SortOrderInput | SortOrder
    workoutId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    userWorkoutExercises?: UserWorkoutExerciseOrderByRelationAggregateInput
    program?: ProgramOrderByWithRelationInput
    workout?: WorkoutOrderByWithRelationInput
  }

  export type UserWorkoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWorkoutWhereInput | UserWorkoutWhereInput[]
    OR?: UserWorkoutWhereInput[]
    NOT?: UserWorkoutWhereInput | UserWorkoutWhereInput[]
    dateCompleted?: DateTimeNullableFilter<"UserWorkout"> | Date | string | null
    ownerId?: StringFilter<"UserWorkout"> | string
    programId?: StringNullableFilter<"UserWorkout"> | string | null
    workoutId?: StringNullableFilter<"UserWorkout"> | string | null
    createdAt?: DateTimeFilter<"UserWorkout"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    userWorkoutExercises?: UserWorkoutExerciseListRelationFilter
    program?: XOR<ProgramNullableScalarRelationFilter, ProgramWhereInput> | null
    workout?: XOR<WorkoutNullableScalarRelationFilter, WorkoutWhereInput> | null
  }, "id">

  export type UserWorkoutOrderByWithAggregationInput = {
    id?: SortOrder
    dateCompleted?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    programId?: SortOrderInput | SortOrder
    workoutId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserWorkoutCountOrderByAggregateInput
    _max?: UserWorkoutMaxOrderByAggregateInput
    _min?: UserWorkoutMinOrderByAggregateInput
  }

  export type UserWorkoutScalarWhereWithAggregatesInput = {
    AND?: UserWorkoutScalarWhereWithAggregatesInput | UserWorkoutScalarWhereWithAggregatesInput[]
    OR?: UserWorkoutScalarWhereWithAggregatesInput[]
    NOT?: UserWorkoutScalarWhereWithAggregatesInput | UserWorkoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserWorkout"> | string
    dateCompleted?: DateTimeNullableWithAggregatesFilter<"UserWorkout"> | Date | string | null
    ownerId?: StringWithAggregatesFilter<"UserWorkout"> | string
    programId?: StringNullableWithAggregatesFilter<"UserWorkout"> | string | null
    workoutId?: StringNullableWithAggregatesFilter<"UserWorkout"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserWorkout"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramCreateNestedManyWithoutOwnerInput
    userSets?: UserSetCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutOwnerInput
    userWorkout?: UserWorkoutCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramUncheckedCreateNestedManyWithoutOwnerInput
    userSets?: UserSetUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutOwnerInput
    userWorkout?: UserWorkoutUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUpdateManyWithoutOwnerNestedInput
    userSets?: UserSetUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutOwnerNestedInput
    userWorkout?: UserWorkoutUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUncheckedUpdateManyWithoutOwnerNestedInput
    userSets?: UserSetUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutOwnerNestedInput
    userWorkout?: UserWorkoutUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseCreateInput = {
    id?: string
    name: string
    youtubeUrl: string
    type?: $Enums.ExerciseType
    notes?: string | null
    equipment?: ExerciseCreateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseCreatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUncheckedCreateInput = {
    id?: string
    name: string
    youtubeUrl: string
    type?: $Enums.ExerciseType
    notes?: string | null
    equipment?: ExerciseCreateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseCreatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    youtubeUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: ExerciseUpdateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseUpdatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercises?: WorkoutExerciseUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    youtubeUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: ExerciseUpdateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseUpdatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseCreateManyInput = {
    id?: string
    name: string
    youtubeUrl: string
    type?: $Enums.ExerciseType
    notes?: string | null
    equipment?: ExerciseCreateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseCreatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    youtubeUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: ExerciseUpdateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseUpdatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    youtubeUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: ExerciseUpdateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseUpdatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetCreateInput = {
    id?: string
    restTime?: number
    numberOfSets?: number
    hasWarmup?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercise?: WorkoutExerciseCreateNestedManyWithoutCoreSetInput
    reps?: CoreSetRepsCreateNestedManyWithoutCoreSetInput
    weight?: CoreSetWeightCreateNestedManyWithoutCoreSetInput
  }

  export type CoreSetUncheckedCreateInput = {
    id?: string
    restTime?: number
    numberOfSets?: number
    hasWarmup?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercise?: WorkoutExerciseUncheckedCreateNestedManyWithoutCoreSetInput
    reps?: CoreSetRepsUncheckedCreateNestedManyWithoutCoreSetInput
    weight?: CoreSetWeightUncheckedCreateNestedManyWithoutCoreSetInput
  }

  export type CoreSetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    restTime?: IntFieldUpdateOperationsInput | number
    numberOfSets?: IntFieldUpdateOperationsInput | number
    hasWarmup?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercise?: WorkoutExerciseUpdateManyWithoutCoreSetNestedInput
    reps?: CoreSetRepsUpdateManyWithoutCoreSetNestedInput
    weight?: CoreSetWeightUpdateManyWithoutCoreSetNestedInput
  }

  export type CoreSetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    restTime?: IntFieldUpdateOperationsInput | number
    numberOfSets?: IntFieldUpdateOperationsInput | number
    hasWarmup?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercise?: WorkoutExerciseUncheckedUpdateManyWithoutCoreSetNestedInput
    reps?: CoreSetRepsUncheckedUpdateManyWithoutCoreSetNestedInput
    weight?: CoreSetWeightUncheckedUpdateManyWithoutCoreSetNestedInput
  }

  export type CoreSetCreateManyInput = {
    id?: string
    restTime?: number
    numberOfSets?: number
    hasWarmup?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    restTime?: IntFieldUpdateOperationsInput | number
    numberOfSets?: IntFieldUpdateOperationsInput | number
    hasWarmup?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    restTime?: IntFieldUpdateOperationsInput | number
    numberOfSets?: IntFieldUpdateOperationsInput | number
    hasWarmup?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreCardioSetCreateInput = {
    id?: string
    warmupTime?: number | null
    avgHeartRate?: number | null
    avgSpeed?: number | null
    distance?: number | null
    calorieTarget?: number | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercise?: WorkoutExerciseCreateNestedManyWithoutCoreCardioSetInput
  }

  export type CoreCardioSetUncheckedCreateInput = {
    id?: string
    warmupTime?: number | null
    avgHeartRate?: number | null
    avgSpeed?: number | null
    distance?: number | null
    calorieTarget?: number | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercise?: WorkoutExerciseUncheckedCreateNestedManyWithoutCoreCardioSetInput
  }

  export type CoreCardioSetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    warmupTime?: NullableIntFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableIntFieldUpdateOperationsInput | number | null
    avgSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    calorieTarget?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercise?: WorkoutExerciseUpdateManyWithoutCoreCardioSetNestedInput
  }

  export type CoreCardioSetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    warmupTime?: NullableIntFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableIntFieldUpdateOperationsInput | number | null
    avgSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    calorieTarget?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercise?: WorkoutExerciseUncheckedUpdateManyWithoutCoreCardioSetNestedInput
  }

  export type CoreCardioSetCreateManyInput = {
    id?: string
    warmupTime?: number | null
    avgHeartRate?: number | null
    avgSpeed?: number | null
    distance?: number | null
    calorieTarget?: number | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreCardioSetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    warmupTime?: NullableIntFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableIntFieldUpdateOperationsInput | number | null
    avgSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    calorieTarget?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreCardioSetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    warmupTime?: NullableIntFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableIntFieldUpdateOperationsInput | number | null
    avgSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    calorieTarget?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetRepsCreateInput = {
    id?: string
    reps?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    coreSet: CoreSetCreateNestedOneWithoutRepsInput
  }

  export type CoreSetRepsUncheckedCreateInput = {
    id?: string
    coreSetId: string
    reps?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetRepsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coreSet?: CoreSetUpdateOneRequiredWithoutRepsNestedInput
  }

  export type CoreSetRepsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    coreSetId?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetRepsCreateManyInput = {
    id?: string
    coreSetId: string
    reps?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetRepsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetRepsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    coreSetId?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetWeightCreateInput = {
    id?: string
    isBodyWeight?: boolean
    weight?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    coreSet: CoreSetCreateNestedOneWithoutWeightInput
  }

  export type CoreSetWeightUncheckedCreateInput = {
    id?: string
    coreSetId: string
    isBodyWeight?: boolean
    weight?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetWeightUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coreSet?: CoreSetUpdateOneRequiredWithoutWeightNestedInput
  }

  export type CoreSetWeightUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    coreSetId?: StringFieldUpdateOperationsInput | string
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetWeightCreateManyInput = {
    id?: string
    coreSetId: string
    isBodyWeight?: boolean
    weight?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetWeightUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetWeightUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    coreSetId?: StringFieldUpdateOperationsInput | string
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSetCreateInput = {
    id?: string
    reps?: number
    weight?: number | null
    isBodyWeight?: boolean
    restTime?: number
    order?: number
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserSetsInput
    userWorkoutExercise: UserWorkoutExerciseCreateNestedOneWithoutUserSetsInput
  }

  export type UserSetUncheckedCreateInput = {
    id?: string
    reps?: number
    weight?: number | null
    isBodyWeight?: boolean
    restTime?: number
    order?: number
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    userId: string
    userWorkoutExerciseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    restTime?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isWarmup?: BoolFieldUpdateOperationsInput | boolean
    isMuscleFailure?: BoolFieldUpdateOperationsInput | boolean
    isJointPain?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserSetsNestedInput
    userWorkoutExercise?: UserWorkoutExerciseUpdateOneRequiredWithoutUserSetsNestedInput
  }

  export type UserSetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    restTime?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isWarmup?: BoolFieldUpdateOperationsInput | boolean
    isMuscleFailure?: BoolFieldUpdateOperationsInput | boolean
    isJointPain?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    userWorkoutExerciseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSetCreateManyInput = {
    id?: string
    reps?: number
    weight?: number | null
    isBodyWeight?: boolean
    restTime?: number
    order?: number
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    userId: string
    userWorkoutExerciseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    restTime?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isWarmup?: BoolFieldUpdateOperationsInput | boolean
    isMuscleFailure?: BoolFieldUpdateOperationsInput | boolean
    isJointPain?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    restTime?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isWarmup?: BoolFieldUpdateOperationsInput | boolean
    isMuscleFailure?: BoolFieldUpdateOperationsInput | boolean
    isJointPain?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    userWorkoutExerciseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramCreateInput = {
    id?: string
    name: string
    notes?: string | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programWorkouts?: ProgramWorkoutCreateNestedManyWithoutProgramInput
    userWorkout?: UserWorkoutCreateNestedManyWithoutProgramInput
    owner: UserCreateNestedOneWithoutProgramsInput
  }

  export type ProgramUncheckedCreateInput = {
    id?: string
    name: string
    notes?: string | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    programWorkouts?: ProgramWorkoutUncheckedCreateNestedManyWithoutProgramInput
    userWorkout?: UserWorkoutUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programWorkouts?: ProgramWorkoutUpdateManyWithoutProgramNestedInput
    userWorkout?: UserWorkoutUpdateManyWithoutProgramNestedInput
    owner?: UserUpdateOneRequiredWithoutProgramsNestedInput
  }

  export type ProgramUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programWorkouts?: ProgramWorkoutUncheckedUpdateManyWithoutProgramNestedInput
    userWorkout?: UserWorkoutUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type ProgramCreateManyInput = {
    id?: string
    name: string
    notes?: string | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramWorkoutCreateInput = {
    id?: string
    daysOfWeek?: ProgramWorkoutCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: Date | string
    updatedAt?: Date | string
    program: ProgramCreateNestedOneWithoutProgramWorkoutsInput
    workout: WorkoutCreateNestedOneWithoutProgramWorkoutsInput
  }

  export type ProgramWorkoutUncheckedCreateInput = {
    id?: string
    programId: string
    workoutId: string
    daysOfWeek?: ProgramWorkoutCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramWorkoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ProgramWorkoutUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneRequiredWithoutProgramWorkoutsNestedInput
    workout?: WorkoutUpdateOneRequiredWithoutProgramWorkoutsNestedInput
  }

  export type ProgramWorkoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ProgramWorkoutUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramWorkoutCreateManyInput = {
    id?: string
    programId: string
    workoutId: string
    daysOfWeek?: ProgramWorkoutCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramWorkoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ProgramWorkoutUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramWorkoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ProgramWorkoutUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutCreateInput = {
    id?: string
    name?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutWorkoutsInput
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutWorkoutInput
    programWorkouts?: ProgramWorkoutCreateNestedManyWithoutWorkoutInput
    userWorkouts?: UserWorkoutCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutUncheckedCreateInput = {
    id?: string
    name?: string | null
    notes?: string | null
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutInput
    programWorkouts?: ProgramWorkoutUncheckedCreateNestedManyWithoutWorkoutInput
    userWorkouts?: UserWorkoutUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutWorkoutsNestedInput
    workoutExercises?: WorkoutExerciseUpdateManyWithoutWorkoutNestedInput
    programWorkouts?: ProgramWorkoutUpdateManyWithoutWorkoutNestedInput
    userWorkouts?: UserWorkoutUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutWorkoutNestedInput
    programWorkouts?: ProgramWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput
    userWorkouts?: UserWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutCreateManyInput = {
    id?: string
    name?: string | null
    notes?: string | null
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutExerciseCreateInput = {
    id?: string
    order?: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    coreSet?: CoreSetCreateNestedOneWithoutWorkoutExerciseInput
    coreCardioSet?: CoreCardioSetCreateNestedOneWithoutWorkoutExerciseInput
    exercise: ExerciseCreateNestedOneWithoutWorkoutExercisesInput
    workout: WorkoutCreateNestedOneWithoutWorkoutExercisesInput
    userWorkoutExercises?: UserWorkoutExerciseCreateNestedManyWithoutWorkoutExerciseInput
  }

  export type WorkoutExerciseUncheckedCreateInput = {
    id?: string
    order?: number
    notes?: string | null
    coreSetId?: string | null
    coreCardioSetId?: string | null
    exerciseId: string
    workoutId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutExerciseInput
  }

  export type WorkoutExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coreSet?: CoreSetUpdateOneWithoutWorkoutExerciseNestedInput
    coreCardioSet?: CoreCardioSetUpdateOneWithoutWorkoutExerciseNestedInput
    exercise?: ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput
    workout?: WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput
    userWorkoutExercises?: UserWorkoutExerciseUpdateManyWithoutWorkoutExerciseNestedInput
  }

  export type WorkoutExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreSetId?: NullableStringFieldUpdateOperationsInput | string | null
    coreCardioSetId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseId?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedUpdateManyWithoutWorkoutExerciseNestedInput
  }

  export type WorkoutExerciseCreateManyInput = {
    id?: string
    order?: number
    notes?: string | null
    coreSetId?: string | null
    coreCardioSetId?: string | null
    exerciseId: string
    workoutId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreSetId?: NullableStringFieldUpdateOperationsInput | string | null
    coreCardioSetId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseId?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWorkoutExerciseCreateInput = {
    id?: string
    workoutExercise: WorkoutExerciseCreateNestedOneWithoutUserWorkoutExercisesInput
    userWorkout: UserWorkoutCreateNestedOneWithoutUserWorkoutExercisesInput
    userSets?: UserSetCreateNestedManyWithoutUserWorkoutExerciseInput
  }

  export type UserWorkoutExerciseUncheckedCreateInput = {
    id?: string
    workoutExerciseId: string
    userWorkoutId: string
    userSets?: UserSetUncheckedCreateNestedManyWithoutUserWorkoutExerciseInput
  }

  export type UserWorkoutExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutExercise?: WorkoutExerciseUpdateOneRequiredWithoutUserWorkoutExercisesNestedInput
    userWorkout?: UserWorkoutUpdateOneRequiredWithoutUserWorkoutExercisesNestedInput
    userSets?: UserSetUpdateManyWithoutUserWorkoutExerciseNestedInput
  }

  export type UserWorkoutExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutExerciseId?: StringFieldUpdateOperationsInput | string
    userWorkoutId?: StringFieldUpdateOperationsInput | string
    userSets?: UserSetUncheckedUpdateManyWithoutUserWorkoutExerciseNestedInput
  }

  export type UserWorkoutExerciseCreateManyInput = {
    id?: string
    workoutExerciseId: string
    userWorkoutId: string
  }

  export type UserWorkoutExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type UserWorkoutExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutExerciseId?: StringFieldUpdateOperationsInput | string
    userWorkoutId?: StringFieldUpdateOperationsInput | string
  }

  export type UserWorkoutCreateInput = {
    id?: string
    dateCompleted?: Date | string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutUserWorkoutInput
    userWorkoutExercises?: UserWorkoutExerciseCreateNestedManyWithoutUserWorkoutInput
    program?: ProgramCreateNestedOneWithoutUserWorkoutInput
    workout?: WorkoutCreateNestedOneWithoutUserWorkoutsInput
  }

  export type UserWorkoutUncheckedCreateInput = {
    id?: string
    dateCompleted?: Date | string | null
    ownerId: string
    programId?: string | null
    workoutId?: string | null
    createdAt?: Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedCreateNestedManyWithoutUserWorkoutInput
  }

  export type UserWorkoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutUserWorkoutNestedInput
    userWorkoutExercises?: UserWorkoutExerciseUpdateManyWithoutUserWorkoutNestedInput
    program?: ProgramUpdateOneWithoutUserWorkoutNestedInput
    workout?: WorkoutUpdateOneWithoutUserWorkoutsNestedInput
  }

  export type UserWorkoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    workoutId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedUpdateManyWithoutUserWorkoutNestedInput
  }

  export type UserWorkoutCreateManyInput = {
    id?: string
    dateCompleted?: Date | string | null
    ownerId: string
    programId?: string | null
    workoutId?: string | null
    createdAt?: Date | string
  }

  export type UserWorkoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWorkoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    workoutId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProgramListRelationFilter = {
    every?: ProgramWhereInput
    some?: ProgramWhereInput
    none?: ProgramWhereInput
  }

  export type UserSetListRelationFilter = {
    every?: UserSetWhereInput
    some?: UserSetWhereInput
    none?: UserSetWhereInput
  }

  export type WorkoutListRelationFilter = {
    every?: WorkoutWhereInput
    some?: WorkoutWhereInput
    none?: WorkoutWhereInput
  }

  export type UserWorkoutListRelationFilter = {
    every?: UserWorkoutWhereInput
    some?: UserWorkoutWhereInput
    none?: UserWorkoutWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProgramOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserSetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserWorkoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    googleId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imgUrl?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    googleId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imgUrl?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    googleId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imgUrl?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumExerciseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExerciseType | EnumExerciseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExerciseType[] | ListEnumExerciseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExerciseType[] | ListEnumExerciseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExerciseTypeFilter<$PrismaModel> | $Enums.ExerciseType
  }

  export type EnumExerciseEquipmentNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.ExerciseEquipment[] | ListEnumExerciseEquipmentFieldRefInput<$PrismaModel> | null
    has?: $Enums.ExerciseEquipment | EnumExerciseEquipmentFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.ExerciseEquipment[] | ListEnumExerciseEquipmentFieldRefInput<$PrismaModel>
    hasSome?: $Enums.ExerciseEquipment[] | ListEnumExerciseEquipmentFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumExerciseMuscleNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.ExerciseMuscle[] | ListEnumExerciseMuscleFieldRefInput<$PrismaModel> | null
    has?: $Enums.ExerciseMuscle | EnumExerciseMuscleFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.ExerciseMuscle[] | ListEnumExerciseMuscleFieldRefInput<$PrismaModel>
    hasSome?: $Enums.ExerciseMuscle[] | ListEnumExerciseMuscleFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type WorkoutExerciseListRelationFilter = {
    every?: WorkoutExerciseWhereInput
    some?: WorkoutExerciseWhereInput
    none?: WorkoutExerciseWhereInput
  }

  export type WorkoutExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    youtubeUrl?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    equipment?: SortOrder
    muscles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    youtubeUrl?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    youtubeUrl?: SortOrder
    type?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumExerciseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExerciseType | EnumExerciseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExerciseType[] | ListEnumExerciseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExerciseType[] | ListEnumExerciseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExerciseTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExerciseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExerciseTypeFilter<$PrismaModel>
    _max?: NestedEnumExerciseTypeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CoreSetRepsListRelationFilter = {
    every?: CoreSetRepsWhereInput
    some?: CoreSetRepsWhereInput
    none?: CoreSetRepsWhereInput
  }

  export type CoreSetWeightListRelationFilter = {
    every?: CoreSetWeightWhereInput
    some?: CoreSetWeightWhereInput
    none?: CoreSetWeightWhereInput
  }

  export type CoreSetRepsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CoreSetWeightOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CoreSetCountOrderByAggregateInput = {
    id?: SortOrder
    restTime?: SortOrder
    numberOfSets?: SortOrder
    hasWarmup?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreSetAvgOrderByAggregateInput = {
    restTime?: SortOrder
    numberOfSets?: SortOrder
  }

  export type CoreSetMaxOrderByAggregateInput = {
    id?: SortOrder
    restTime?: SortOrder
    numberOfSets?: SortOrder
    hasWarmup?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreSetMinOrderByAggregateInput = {
    id?: SortOrder
    restTime?: SortOrder
    numberOfSets?: SortOrder
    hasWarmup?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreSetSumOrderByAggregateInput = {
    restTime?: SortOrder
    numberOfSets?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CoreCardioSetCountOrderByAggregateInput = {
    id?: SortOrder
    warmupTime?: SortOrder
    avgHeartRate?: SortOrder
    avgSpeed?: SortOrder
    distance?: SortOrder
    calorieTarget?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreCardioSetAvgOrderByAggregateInput = {
    warmupTime?: SortOrder
    avgHeartRate?: SortOrder
    avgSpeed?: SortOrder
    distance?: SortOrder
    calorieTarget?: SortOrder
    duration?: SortOrder
  }

  export type CoreCardioSetMaxOrderByAggregateInput = {
    id?: SortOrder
    warmupTime?: SortOrder
    avgHeartRate?: SortOrder
    avgSpeed?: SortOrder
    distance?: SortOrder
    calorieTarget?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreCardioSetMinOrderByAggregateInput = {
    id?: SortOrder
    warmupTime?: SortOrder
    avgHeartRate?: SortOrder
    avgSpeed?: SortOrder
    distance?: SortOrder
    calorieTarget?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreCardioSetSumOrderByAggregateInput = {
    warmupTime?: SortOrder
    avgHeartRate?: SortOrder
    avgSpeed?: SortOrder
    distance?: SortOrder
    calorieTarget?: SortOrder
    duration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type CoreSetScalarRelationFilter = {
    is?: CoreSetWhereInput
    isNot?: CoreSetWhereInput
  }

  export type CoreSetRepsCountOrderByAggregateInput = {
    id?: SortOrder
    coreSetId?: SortOrder
    reps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreSetRepsAvgOrderByAggregateInput = {
    reps?: SortOrder
  }

  export type CoreSetRepsMaxOrderByAggregateInput = {
    id?: SortOrder
    coreSetId?: SortOrder
    reps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreSetRepsMinOrderByAggregateInput = {
    id?: SortOrder
    coreSetId?: SortOrder
    reps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreSetRepsSumOrderByAggregateInput = {
    reps?: SortOrder
  }

  export type CoreSetWeightCountOrderByAggregateInput = {
    id?: SortOrder
    coreSetId?: SortOrder
    isBodyWeight?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreSetWeightAvgOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type CoreSetWeightMaxOrderByAggregateInput = {
    id?: SortOrder
    coreSetId?: SortOrder
    isBodyWeight?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreSetWeightMinOrderByAggregateInput = {
    id?: SortOrder
    coreSetId?: SortOrder
    isBodyWeight?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreSetWeightSumOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserWorkoutExerciseScalarRelationFilter = {
    is?: UserWorkoutExerciseWhereInput
    isNot?: UserWorkoutExerciseWhereInput
  }

  export type UserSetCountOrderByAggregateInput = {
    id?: SortOrder
    reps?: SortOrder
    weight?: SortOrder
    isBodyWeight?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    isWarmup?: SortOrder
    isMuscleFailure?: SortOrder
    isJointPain?: SortOrder
    userId?: SortOrder
    userWorkoutExerciseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSetAvgOrderByAggregateInput = {
    reps?: SortOrder
    weight?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
  }

  export type UserSetMaxOrderByAggregateInput = {
    id?: SortOrder
    reps?: SortOrder
    weight?: SortOrder
    isBodyWeight?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    isWarmup?: SortOrder
    isMuscleFailure?: SortOrder
    isJointPain?: SortOrder
    userId?: SortOrder
    userWorkoutExerciseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSetMinOrderByAggregateInput = {
    id?: SortOrder
    reps?: SortOrder
    weight?: SortOrder
    isBodyWeight?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
    isCompleted?: SortOrder
    isWarmup?: SortOrder
    isMuscleFailure?: SortOrder
    isJointPain?: SortOrder
    userId?: SortOrder
    userWorkoutExerciseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSetSumOrderByAggregateInput = {
    reps?: SortOrder
    weight?: SortOrder
    restTime?: SortOrder
    order?: SortOrder
  }

  export type ProgramWorkoutListRelationFilter = {
    every?: ProgramWorkoutWhereInput
    some?: ProgramWorkoutWhereInput
    none?: ProgramWorkoutWhereInput
  }

  export type ProgramWorkoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgramCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDaysOfWeekNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.DaysOfWeek[] | ListEnumDaysOfWeekFieldRefInput<$PrismaModel> | null
    has?: $Enums.DaysOfWeek | EnumDaysOfWeekFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.DaysOfWeek[] | ListEnumDaysOfWeekFieldRefInput<$PrismaModel>
    hasSome?: $Enums.DaysOfWeek[] | ListEnumDaysOfWeekFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ProgramScalarRelationFilter = {
    is?: ProgramWhereInput
    isNot?: ProgramWhereInput
  }

  export type WorkoutScalarRelationFilter = {
    is?: WorkoutWhereInput
    isNot?: WorkoutWhereInput
  }

  export type ProgramWorkoutProgramIdWorkoutIdCompoundUniqueInput = {
    programId: string
    workoutId: string
  }

  export type ProgramWorkoutCountOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    workoutId?: SortOrder
    daysOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramWorkoutMaxOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    workoutId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramWorkoutMinOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    workoutId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type WorkoutCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    notes?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    notes?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    notes?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoreSetNullableScalarRelationFilter = {
    is?: CoreSetWhereInput | null
    isNot?: CoreSetWhereInput | null
  }

  export type CoreCardioSetNullableScalarRelationFilter = {
    is?: CoreCardioSetWhereInput | null
    isNot?: CoreCardioSetWhereInput | null
  }

  export type ExerciseScalarRelationFilter = {
    is?: ExerciseWhereInput
    isNot?: ExerciseWhereInput
  }

  export type UserWorkoutExerciseListRelationFilter = {
    every?: UserWorkoutExerciseWhereInput
    some?: UserWorkoutExerciseWhereInput
    none?: UserWorkoutExerciseWhereInput
  }

  export type UserWorkoutExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkoutExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    notes?: SortOrder
    coreSetId?: SortOrder
    coreCardioSetId?: SortOrder
    exerciseId?: SortOrder
    workoutId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutExerciseAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type WorkoutExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    notes?: SortOrder
    coreSetId?: SortOrder
    coreCardioSetId?: SortOrder
    exerciseId?: SortOrder
    workoutId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    notes?: SortOrder
    coreSetId?: SortOrder
    coreCardioSetId?: SortOrder
    exerciseId?: SortOrder
    workoutId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkoutExerciseSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type WorkoutExerciseScalarRelationFilter = {
    is?: WorkoutExerciseWhereInput
    isNot?: WorkoutExerciseWhereInput
  }

  export type UserWorkoutScalarRelationFilter = {
    is?: UserWorkoutWhereInput
    isNot?: UserWorkoutWhereInput
  }

  export type UserWorkoutExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    workoutExerciseId?: SortOrder
    userWorkoutId?: SortOrder
  }

  export type UserWorkoutExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    workoutExerciseId?: SortOrder
    userWorkoutId?: SortOrder
  }

  export type UserWorkoutExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    workoutExerciseId?: SortOrder
    userWorkoutId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProgramNullableScalarRelationFilter = {
    is?: ProgramWhereInput | null
    isNot?: ProgramWhereInput | null
  }

  export type WorkoutNullableScalarRelationFilter = {
    is?: WorkoutWhereInput | null
    isNot?: WorkoutWhereInput | null
  }

  export type UserWorkoutCountOrderByAggregateInput = {
    id?: SortOrder
    dateCompleted?: SortOrder
    ownerId?: SortOrder
    programId?: SortOrder
    workoutId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserWorkoutMaxOrderByAggregateInput = {
    id?: SortOrder
    dateCompleted?: SortOrder
    ownerId?: SortOrder
    programId?: SortOrder
    workoutId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserWorkoutMinOrderByAggregateInput = {
    id?: SortOrder
    dateCompleted?: SortOrder
    ownerId?: SortOrder
    programId?: SortOrder
    workoutId?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProgramCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ProgramCreateWithoutOwnerInput, ProgramUncheckedCreateWithoutOwnerInput> | ProgramCreateWithoutOwnerInput[] | ProgramUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutOwnerInput | ProgramCreateOrConnectWithoutOwnerInput[]
    createMany?: ProgramCreateManyOwnerInputEnvelope
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
  }

  export type UserSetCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSetCreateWithoutUserInput, UserSetUncheckedCreateWithoutUserInput> | UserSetCreateWithoutUserInput[] | UserSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSetCreateOrConnectWithoutUserInput | UserSetCreateOrConnectWithoutUserInput[]
    createMany?: UserSetCreateManyUserInputEnvelope
    connect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
  }

  export type WorkoutCreateNestedManyWithoutOwnerInput = {
    create?: XOR<WorkoutCreateWithoutOwnerInput, WorkoutUncheckedCreateWithoutOwnerInput> | WorkoutCreateWithoutOwnerInput[] | WorkoutUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkoutCreateOrConnectWithoutOwnerInput | WorkoutCreateOrConnectWithoutOwnerInput[]
    createMany?: WorkoutCreateManyOwnerInputEnvelope
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
  }

  export type UserWorkoutCreateNestedManyWithoutOwnerInput = {
    create?: XOR<UserWorkoutCreateWithoutOwnerInput, UserWorkoutUncheckedCreateWithoutOwnerInput> | UserWorkoutCreateWithoutOwnerInput[] | UserWorkoutUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutOwnerInput | UserWorkoutCreateOrConnectWithoutOwnerInput[]
    createMany?: UserWorkoutCreateManyOwnerInputEnvelope
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
  }

  export type ProgramUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ProgramCreateWithoutOwnerInput, ProgramUncheckedCreateWithoutOwnerInput> | ProgramCreateWithoutOwnerInput[] | ProgramUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutOwnerInput | ProgramCreateOrConnectWithoutOwnerInput[]
    createMany?: ProgramCreateManyOwnerInputEnvelope
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
  }

  export type UserSetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSetCreateWithoutUserInput, UserSetUncheckedCreateWithoutUserInput> | UserSetCreateWithoutUserInput[] | UserSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSetCreateOrConnectWithoutUserInput | UserSetCreateOrConnectWithoutUserInput[]
    createMany?: UserSetCreateManyUserInputEnvelope
    connect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
  }

  export type WorkoutUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<WorkoutCreateWithoutOwnerInput, WorkoutUncheckedCreateWithoutOwnerInput> | WorkoutCreateWithoutOwnerInput[] | WorkoutUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkoutCreateOrConnectWithoutOwnerInput | WorkoutCreateOrConnectWithoutOwnerInput[]
    createMany?: WorkoutCreateManyOwnerInputEnvelope
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
  }

  export type UserWorkoutUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<UserWorkoutCreateWithoutOwnerInput, UserWorkoutUncheckedCreateWithoutOwnerInput> | UserWorkoutCreateWithoutOwnerInput[] | UserWorkoutUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutOwnerInput | UserWorkoutCreateOrConnectWithoutOwnerInput[]
    createMany?: UserWorkoutCreateManyOwnerInputEnvelope
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProgramUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ProgramCreateWithoutOwnerInput, ProgramUncheckedCreateWithoutOwnerInput> | ProgramCreateWithoutOwnerInput[] | ProgramUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutOwnerInput | ProgramCreateOrConnectWithoutOwnerInput[]
    upsert?: ProgramUpsertWithWhereUniqueWithoutOwnerInput | ProgramUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ProgramCreateManyOwnerInputEnvelope
    set?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    disconnect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    delete?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    update?: ProgramUpdateWithWhereUniqueWithoutOwnerInput | ProgramUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ProgramUpdateManyWithWhereWithoutOwnerInput | ProgramUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
  }

  export type UserSetUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSetCreateWithoutUserInput, UserSetUncheckedCreateWithoutUserInput> | UserSetCreateWithoutUserInput[] | UserSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSetCreateOrConnectWithoutUserInput | UserSetCreateOrConnectWithoutUserInput[]
    upsert?: UserSetUpsertWithWhereUniqueWithoutUserInput | UserSetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSetCreateManyUserInputEnvelope
    set?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    disconnect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    delete?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    connect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    update?: UserSetUpdateWithWhereUniqueWithoutUserInput | UserSetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSetUpdateManyWithWhereWithoutUserInput | UserSetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSetScalarWhereInput | UserSetScalarWhereInput[]
  }

  export type WorkoutUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<WorkoutCreateWithoutOwnerInput, WorkoutUncheckedCreateWithoutOwnerInput> | WorkoutCreateWithoutOwnerInput[] | WorkoutUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkoutCreateOrConnectWithoutOwnerInput | WorkoutCreateOrConnectWithoutOwnerInput[]
    upsert?: WorkoutUpsertWithWhereUniqueWithoutOwnerInput | WorkoutUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: WorkoutCreateManyOwnerInputEnvelope
    set?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    disconnect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    delete?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    update?: WorkoutUpdateWithWhereUniqueWithoutOwnerInput | WorkoutUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: WorkoutUpdateManyWithWhereWithoutOwnerInput | WorkoutUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[]
  }

  export type UserWorkoutUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<UserWorkoutCreateWithoutOwnerInput, UserWorkoutUncheckedCreateWithoutOwnerInput> | UserWorkoutCreateWithoutOwnerInput[] | UserWorkoutUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutOwnerInput | UserWorkoutCreateOrConnectWithoutOwnerInput[]
    upsert?: UserWorkoutUpsertWithWhereUniqueWithoutOwnerInput | UserWorkoutUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: UserWorkoutCreateManyOwnerInputEnvelope
    set?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    disconnect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    delete?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    update?: UserWorkoutUpdateWithWhereUniqueWithoutOwnerInput | UserWorkoutUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: UserWorkoutUpdateManyWithWhereWithoutOwnerInput | UserWorkoutUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: UserWorkoutScalarWhereInput | UserWorkoutScalarWhereInput[]
  }

  export type ProgramUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ProgramCreateWithoutOwnerInput, ProgramUncheckedCreateWithoutOwnerInput> | ProgramCreateWithoutOwnerInput[] | ProgramUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutOwnerInput | ProgramCreateOrConnectWithoutOwnerInput[]
    upsert?: ProgramUpsertWithWhereUniqueWithoutOwnerInput | ProgramUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ProgramCreateManyOwnerInputEnvelope
    set?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    disconnect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    delete?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    update?: ProgramUpdateWithWhereUniqueWithoutOwnerInput | ProgramUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ProgramUpdateManyWithWhereWithoutOwnerInput | ProgramUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
  }

  export type UserSetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSetCreateWithoutUserInput, UserSetUncheckedCreateWithoutUserInput> | UserSetCreateWithoutUserInput[] | UserSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSetCreateOrConnectWithoutUserInput | UserSetCreateOrConnectWithoutUserInput[]
    upsert?: UserSetUpsertWithWhereUniqueWithoutUserInput | UserSetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSetCreateManyUserInputEnvelope
    set?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    disconnect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    delete?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    connect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    update?: UserSetUpdateWithWhereUniqueWithoutUserInput | UserSetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSetUpdateManyWithWhereWithoutUserInput | UserSetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSetScalarWhereInput | UserSetScalarWhereInput[]
  }

  export type WorkoutUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<WorkoutCreateWithoutOwnerInput, WorkoutUncheckedCreateWithoutOwnerInput> | WorkoutCreateWithoutOwnerInput[] | WorkoutUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkoutCreateOrConnectWithoutOwnerInput | WorkoutCreateOrConnectWithoutOwnerInput[]
    upsert?: WorkoutUpsertWithWhereUniqueWithoutOwnerInput | WorkoutUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: WorkoutCreateManyOwnerInputEnvelope
    set?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    disconnect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    delete?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[]
    update?: WorkoutUpdateWithWhereUniqueWithoutOwnerInput | WorkoutUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: WorkoutUpdateManyWithWhereWithoutOwnerInput | WorkoutUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[]
  }

  export type UserWorkoutUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<UserWorkoutCreateWithoutOwnerInput, UserWorkoutUncheckedCreateWithoutOwnerInput> | UserWorkoutCreateWithoutOwnerInput[] | UserWorkoutUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutOwnerInput | UserWorkoutCreateOrConnectWithoutOwnerInput[]
    upsert?: UserWorkoutUpsertWithWhereUniqueWithoutOwnerInput | UserWorkoutUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: UserWorkoutCreateManyOwnerInputEnvelope
    set?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    disconnect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    delete?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    update?: UserWorkoutUpdateWithWhereUniqueWithoutOwnerInput | UserWorkoutUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: UserWorkoutUpdateManyWithWhereWithoutOwnerInput | UserWorkoutUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: UserWorkoutScalarWhereInput | UserWorkoutScalarWhereInput[]
  }

  export type ExerciseCreateequipmentInput = {
    set: $Enums.ExerciseEquipment[]
  }

  export type ExerciseCreatemusclesInput = {
    set: $Enums.ExerciseMuscle[]
  }

  export type WorkoutExerciseCreateNestedManyWithoutExerciseInput = {
    create?: XOR<WorkoutExerciseCreateWithoutExerciseInput, WorkoutExerciseUncheckedCreateWithoutExerciseInput> | WorkoutExerciseCreateWithoutExerciseInput[] | WorkoutExerciseUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutExerciseInput | WorkoutExerciseCreateOrConnectWithoutExerciseInput[]
    createMany?: WorkoutExerciseCreateManyExerciseInputEnvelope
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
  }

  export type WorkoutExerciseUncheckedCreateNestedManyWithoutExerciseInput = {
    create?: XOR<WorkoutExerciseCreateWithoutExerciseInput, WorkoutExerciseUncheckedCreateWithoutExerciseInput> | WorkoutExerciseCreateWithoutExerciseInput[] | WorkoutExerciseUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutExerciseInput | WorkoutExerciseCreateOrConnectWithoutExerciseInput[]
    createMany?: WorkoutExerciseCreateManyExerciseInputEnvelope
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
  }

  export type EnumExerciseTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExerciseType
  }

  export type ExerciseUpdateequipmentInput = {
    set?: $Enums.ExerciseEquipment[]
    push?: $Enums.ExerciseEquipment | $Enums.ExerciseEquipment[]
  }

  export type ExerciseUpdatemusclesInput = {
    set?: $Enums.ExerciseMuscle[]
    push?: $Enums.ExerciseMuscle | $Enums.ExerciseMuscle[]
  }

  export type WorkoutExerciseUpdateManyWithoutExerciseNestedInput = {
    create?: XOR<WorkoutExerciseCreateWithoutExerciseInput, WorkoutExerciseUncheckedCreateWithoutExerciseInput> | WorkoutExerciseCreateWithoutExerciseInput[] | WorkoutExerciseUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutExerciseInput | WorkoutExerciseCreateOrConnectWithoutExerciseInput[]
    upsert?: WorkoutExerciseUpsertWithWhereUniqueWithoutExerciseInput | WorkoutExerciseUpsertWithWhereUniqueWithoutExerciseInput[]
    createMany?: WorkoutExerciseCreateManyExerciseInputEnvelope
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    update?: WorkoutExerciseUpdateWithWhereUniqueWithoutExerciseInput | WorkoutExerciseUpdateWithWhereUniqueWithoutExerciseInput[]
    updateMany?: WorkoutExerciseUpdateManyWithWhereWithoutExerciseInput | WorkoutExerciseUpdateManyWithWhereWithoutExerciseInput[]
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[]
  }

  export type WorkoutExerciseUncheckedUpdateManyWithoutExerciseNestedInput = {
    create?: XOR<WorkoutExerciseCreateWithoutExerciseInput, WorkoutExerciseUncheckedCreateWithoutExerciseInput> | WorkoutExerciseCreateWithoutExerciseInput[] | WorkoutExerciseUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutExerciseInput | WorkoutExerciseCreateOrConnectWithoutExerciseInput[]
    upsert?: WorkoutExerciseUpsertWithWhereUniqueWithoutExerciseInput | WorkoutExerciseUpsertWithWhereUniqueWithoutExerciseInput[]
    createMany?: WorkoutExerciseCreateManyExerciseInputEnvelope
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    update?: WorkoutExerciseUpdateWithWhereUniqueWithoutExerciseInput | WorkoutExerciseUpdateWithWhereUniqueWithoutExerciseInput[]
    updateMany?: WorkoutExerciseUpdateManyWithWhereWithoutExerciseInput | WorkoutExerciseUpdateManyWithWhereWithoutExerciseInput[]
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[]
  }

  export type WorkoutExerciseCreateNestedManyWithoutCoreSetInput = {
    create?: XOR<WorkoutExerciseCreateWithoutCoreSetInput, WorkoutExerciseUncheckedCreateWithoutCoreSetInput> | WorkoutExerciseCreateWithoutCoreSetInput[] | WorkoutExerciseUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutCoreSetInput | WorkoutExerciseCreateOrConnectWithoutCoreSetInput[]
    createMany?: WorkoutExerciseCreateManyCoreSetInputEnvelope
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
  }

  export type CoreSetRepsCreateNestedManyWithoutCoreSetInput = {
    create?: XOR<CoreSetRepsCreateWithoutCoreSetInput, CoreSetRepsUncheckedCreateWithoutCoreSetInput> | CoreSetRepsCreateWithoutCoreSetInput[] | CoreSetRepsUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: CoreSetRepsCreateOrConnectWithoutCoreSetInput | CoreSetRepsCreateOrConnectWithoutCoreSetInput[]
    createMany?: CoreSetRepsCreateManyCoreSetInputEnvelope
    connect?: CoreSetRepsWhereUniqueInput | CoreSetRepsWhereUniqueInput[]
  }

  export type CoreSetWeightCreateNestedManyWithoutCoreSetInput = {
    create?: XOR<CoreSetWeightCreateWithoutCoreSetInput, CoreSetWeightUncheckedCreateWithoutCoreSetInput> | CoreSetWeightCreateWithoutCoreSetInput[] | CoreSetWeightUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: CoreSetWeightCreateOrConnectWithoutCoreSetInput | CoreSetWeightCreateOrConnectWithoutCoreSetInput[]
    createMany?: CoreSetWeightCreateManyCoreSetInputEnvelope
    connect?: CoreSetWeightWhereUniqueInput | CoreSetWeightWhereUniqueInput[]
  }

  export type WorkoutExerciseUncheckedCreateNestedManyWithoutCoreSetInput = {
    create?: XOR<WorkoutExerciseCreateWithoutCoreSetInput, WorkoutExerciseUncheckedCreateWithoutCoreSetInput> | WorkoutExerciseCreateWithoutCoreSetInput[] | WorkoutExerciseUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutCoreSetInput | WorkoutExerciseCreateOrConnectWithoutCoreSetInput[]
    createMany?: WorkoutExerciseCreateManyCoreSetInputEnvelope
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
  }

  export type CoreSetRepsUncheckedCreateNestedManyWithoutCoreSetInput = {
    create?: XOR<CoreSetRepsCreateWithoutCoreSetInput, CoreSetRepsUncheckedCreateWithoutCoreSetInput> | CoreSetRepsCreateWithoutCoreSetInput[] | CoreSetRepsUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: CoreSetRepsCreateOrConnectWithoutCoreSetInput | CoreSetRepsCreateOrConnectWithoutCoreSetInput[]
    createMany?: CoreSetRepsCreateManyCoreSetInputEnvelope
    connect?: CoreSetRepsWhereUniqueInput | CoreSetRepsWhereUniqueInput[]
  }

  export type CoreSetWeightUncheckedCreateNestedManyWithoutCoreSetInput = {
    create?: XOR<CoreSetWeightCreateWithoutCoreSetInput, CoreSetWeightUncheckedCreateWithoutCoreSetInput> | CoreSetWeightCreateWithoutCoreSetInput[] | CoreSetWeightUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: CoreSetWeightCreateOrConnectWithoutCoreSetInput | CoreSetWeightCreateOrConnectWithoutCoreSetInput[]
    createMany?: CoreSetWeightCreateManyCoreSetInputEnvelope
    connect?: CoreSetWeightWhereUniqueInput | CoreSetWeightWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WorkoutExerciseUpdateManyWithoutCoreSetNestedInput = {
    create?: XOR<WorkoutExerciseCreateWithoutCoreSetInput, WorkoutExerciseUncheckedCreateWithoutCoreSetInput> | WorkoutExerciseCreateWithoutCoreSetInput[] | WorkoutExerciseUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutCoreSetInput | WorkoutExerciseCreateOrConnectWithoutCoreSetInput[]
    upsert?: WorkoutExerciseUpsertWithWhereUniqueWithoutCoreSetInput | WorkoutExerciseUpsertWithWhereUniqueWithoutCoreSetInput[]
    createMany?: WorkoutExerciseCreateManyCoreSetInputEnvelope
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    update?: WorkoutExerciseUpdateWithWhereUniqueWithoutCoreSetInput | WorkoutExerciseUpdateWithWhereUniqueWithoutCoreSetInput[]
    updateMany?: WorkoutExerciseUpdateManyWithWhereWithoutCoreSetInput | WorkoutExerciseUpdateManyWithWhereWithoutCoreSetInput[]
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[]
  }

  export type CoreSetRepsUpdateManyWithoutCoreSetNestedInput = {
    create?: XOR<CoreSetRepsCreateWithoutCoreSetInput, CoreSetRepsUncheckedCreateWithoutCoreSetInput> | CoreSetRepsCreateWithoutCoreSetInput[] | CoreSetRepsUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: CoreSetRepsCreateOrConnectWithoutCoreSetInput | CoreSetRepsCreateOrConnectWithoutCoreSetInput[]
    upsert?: CoreSetRepsUpsertWithWhereUniqueWithoutCoreSetInput | CoreSetRepsUpsertWithWhereUniqueWithoutCoreSetInput[]
    createMany?: CoreSetRepsCreateManyCoreSetInputEnvelope
    set?: CoreSetRepsWhereUniqueInput | CoreSetRepsWhereUniqueInput[]
    disconnect?: CoreSetRepsWhereUniqueInput | CoreSetRepsWhereUniqueInput[]
    delete?: CoreSetRepsWhereUniqueInput | CoreSetRepsWhereUniqueInput[]
    connect?: CoreSetRepsWhereUniqueInput | CoreSetRepsWhereUniqueInput[]
    update?: CoreSetRepsUpdateWithWhereUniqueWithoutCoreSetInput | CoreSetRepsUpdateWithWhereUniqueWithoutCoreSetInput[]
    updateMany?: CoreSetRepsUpdateManyWithWhereWithoutCoreSetInput | CoreSetRepsUpdateManyWithWhereWithoutCoreSetInput[]
    deleteMany?: CoreSetRepsScalarWhereInput | CoreSetRepsScalarWhereInput[]
  }

  export type CoreSetWeightUpdateManyWithoutCoreSetNestedInput = {
    create?: XOR<CoreSetWeightCreateWithoutCoreSetInput, CoreSetWeightUncheckedCreateWithoutCoreSetInput> | CoreSetWeightCreateWithoutCoreSetInput[] | CoreSetWeightUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: CoreSetWeightCreateOrConnectWithoutCoreSetInput | CoreSetWeightCreateOrConnectWithoutCoreSetInput[]
    upsert?: CoreSetWeightUpsertWithWhereUniqueWithoutCoreSetInput | CoreSetWeightUpsertWithWhereUniqueWithoutCoreSetInput[]
    createMany?: CoreSetWeightCreateManyCoreSetInputEnvelope
    set?: CoreSetWeightWhereUniqueInput | CoreSetWeightWhereUniqueInput[]
    disconnect?: CoreSetWeightWhereUniqueInput | CoreSetWeightWhereUniqueInput[]
    delete?: CoreSetWeightWhereUniqueInput | CoreSetWeightWhereUniqueInput[]
    connect?: CoreSetWeightWhereUniqueInput | CoreSetWeightWhereUniqueInput[]
    update?: CoreSetWeightUpdateWithWhereUniqueWithoutCoreSetInput | CoreSetWeightUpdateWithWhereUniqueWithoutCoreSetInput[]
    updateMany?: CoreSetWeightUpdateManyWithWhereWithoutCoreSetInput | CoreSetWeightUpdateManyWithWhereWithoutCoreSetInput[]
    deleteMany?: CoreSetWeightScalarWhereInput | CoreSetWeightScalarWhereInput[]
  }

  export type WorkoutExerciseUncheckedUpdateManyWithoutCoreSetNestedInput = {
    create?: XOR<WorkoutExerciseCreateWithoutCoreSetInput, WorkoutExerciseUncheckedCreateWithoutCoreSetInput> | WorkoutExerciseCreateWithoutCoreSetInput[] | WorkoutExerciseUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutCoreSetInput | WorkoutExerciseCreateOrConnectWithoutCoreSetInput[]
    upsert?: WorkoutExerciseUpsertWithWhereUniqueWithoutCoreSetInput | WorkoutExerciseUpsertWithWhereUniqueWithoutCoreSetInput[]
    createMany?: WorkoutExerciseCreateManyCoreSetInputEnvelope
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    update?: WorkoutExerciseUpdateWithWhereUniqueWithoutCoreSetInput | WorkoutExerciseUpdateWithWhereUniqueWithoutCoreSetInput[]
    updateMany?: WorkoutExerciseUpdateManyWithWhereWithoutCoreSetInput | WorkoutExerciseUpdateManyWithWhereWithoutCoreSetInput[]
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[]
  }

  export type CoreSetRepsUncheckedUpdateManyWithoutCoreSetNestedInput = {
    create?: XOR<CoreSetRepsCreateWithoutCoreSetInput, CoreSetRepsUncheckedCreateWithoutCoreSetInput> | CoreSetRepsCreateWithoutCoreSetInput[] | CoreSetRepsUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: CoreSetRepsCreateOrConnectWithoutCoreSetInput | CoreSetRepsCreateOrConnectWithoutCoreSetInput[]
    upsert?: CoreSetRepsUpsertWithWhereUniqueWithoutCoreSetInput | CoreSetRepsUpsertWithWhereUniqueWithoutCoreSetInput[]
    createMany?: CoreSetRepsCreateManyCoreSetInputEnvelope
    set?: CoreSetRepsWhereUniqueInput | CoreSetRepsWhereUniqueInput[]
    disconnect?: CoreSetRepsWhereUniqueInput | CoreSetRepsWhereUniqueInput[]
    delete?: CoreSetRepsWhereUniqueInput | CoreSetRepsWhereUniqueInput[]
    connect?: CoreSetRepsWhereUniqueInput | CoreSetRepsWhereUniqueInput[]
    update?: CoreSetRepsUpdateWithWhereUniqueWithoutCoreSetInput | CoreSetRepsUpdateWithWhereUniqueWithoutCoreSetInput[]
    updateMany?: CoreSetRepsUpdateManyWithWhereWithoutCoreSetInput | CoreSetRepsUpdateManyWithWhereWithoutCoreSetInput[]
    deleteMany?: CoreSetRepsScalarWhereInput | CoreSetRepsScalarWhereInput[]
  }

  export type CoreSetWeightUncheckedUpdateManyWithoutCoreSetNestedInput = {
    create?: XOR<CoreSetWeightCreateWithoutCoreSetInput, CoreSetWeightUncheckedCreateWithoutCoreSetInput> | CoreSetWeightCreateWithoutCoreSetInput[] | CoreSetWeightUncheckedCreateWithoutCoreSetInput[]
    connectOrCreate?: CoreSetWeightCreateOrConnectWithoutCoreSetInput | CoreSetWeightCreateOrConnectWithoutCoreSetInput[]
    upsert?: CoreSetWeightUpsertWithWhereUniqueWithoutCoreSetInput | CoreSetWeightUpsertWithWhereUniqueWithoutCoreSetInput[]
    createMany?: CoreSetWeightCreateManyCoreSetInputEnvelope
    set?: CoreSetWeightWhereUniqueInput | CoreSetWeightWhereUniqueInput[]
    disconnect?: CoreSetWeightWhereUniqueInput | CoreSetWeightWhereUniqueInput[]
    delete?: CoreSetWeightWhereUniqueInput | CoreSetWeightWhereUniqueInput[]
    connect?: CoreSetWeightWhereUniqueInput | CoreSetWeightWhereUniqueInput[]
    update?: CoreSetWeightUpdateWithWhereUniqueWithoutCoreSetInput | CoreSetWeightUpdateWithWhereUniqueWithoutCoreSetInput[]
    updateMany?: CoreSetWeightUpdateManyWithWhereWithoutCoreSetInput | CoreSetWeightUpdateManyWithWhereWithoutCoreSetInput[]
    deleteMany?: CoreSetWeightScalarWhereInput | CoreSetWeightScalarWhereInput[]
  }

  export type WorkoutExerciseCreateNestedManyWithoutCoreCardioSetInput = {
    create?: XOR<WorkoutExerciseCreateWithoutCoreCardioSetInput, WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput> | WorkoutExerciseCreateWithoutCoreCardioSetInput[] | WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutCoreCardioSetInput | WorkoutExerciseCreateOrConnectWithoutCoreCardioSetInput[]
    createMany?: WorkoutExerciseCreateManyCoreCardioSetInputEnvelope
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
  }

  export type WorkoutExerciseUncheckedCreateNestedManyWithoutCoreCardioSetInput = {
    create?: XOR<WorkoutExerciseCreateWithoutCoreCardioSetInput, WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput> | WorkoutExerciseCreateWithoutCoreCardioSetInput[] | WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutCoreCardioSetInput | WorkoutExerciseCreateOrConnectWithoutCoreCardioSetInput[]
    createMany?: WorkoutExerciseCreateManyCoreCardioSetInputEnvelope
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WorkoutExerciseUpdateManyWithoutCoreCardioSetNestedInput = {
    create?: XOR<WorkoutExerciseCreateWithoutCoreCardioSetInput, WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput> | WorkoutExerciseCreateWithoutCoreCardioSetInput[] | WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutCoreCardioSetInput | WorkoutExerciseCreateOrConnectWithoutCoreCardioSetInput[]
    upsert?: WorkoutExerciseUpsertWithWhereUniqueWithoutCoreCardioSetInput | WorkoutExerciseUpsertWithWhereUniqueWithoutCoreCardioSetInput[]
    createMany?: WorkoutExerciseCreateManyCoreCardioSetInputEnvelope
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    update?: WorkoutExerciseUpdateWithWhereUniqueWithoutCoreCardioSetInput | WorkoutExerciseUpdateWithWhereUniqueWithoutCoreCardioSetInput[]
    updateMany?: WorkoutExerciseUpdateManyWithWhereWithoutCoreCardioSetInput | WorkoutExerciseUpdateManyWithWhereWithoutCoreCardioSetInput[]
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[]
  }

  export type WorkoutExerciseUncheckedUpdateManyWithoutCoreCardioSetNestedInput = {
    create?: XOR<WorkoutExerciseCreateWithoutCoreCardioSetInput, WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput> | WorkoutExerciseCreateWithoutCoreCardioSetInput[] | WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutCoreCardioSetInput | WorkoutExerciseCreateOrConnectWithoutCoreCardioSetInput[]
    upsert?: WorkoutExerciseUpsertWithWhereUniqueWithoutCoreCardioSetInput | WorkoutExerciseUpsertWithWhereUniqueWithoutCoreCardioSetInput[]
    createMany?: WorkoutExerciseCreateManyCoreCardioSetInputEnvelope
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    update?: WorkoutExerciseUpdateWithWhereUniqueWithoutCoreCardioSetInput | WorkoutExerciseUpdateWithWhereUniqueWithoutCoreCardioSetInput[]
    updateMany?: WorkoutExerciseUpdateManyWithWhereWithoutCoreCardioSetInput | WorkoutExerciseUpdateManyWithWhereWithoutCoreCardioSetInput[]
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[]
  }

  export type CoreSetCreateNestedOneWithoutRepsInput = {
    create?: XOR<CoreSetCreateWithoutRepsInput, CoreSetUncheckedCreateWithoutRepsInput>
    connectOrCreate?: CoreSetCreateOrConnectWithoutRepsInput
    connect?: CoreSetWhereUniqueInput
  }

  export type CoreSetUpdateOneRequiredWithoutRepsNestedInput = {
    create?: XOR<CoreSetCreateWithoutRepsInput, CoreSetUncheckedCreateWithoutRepsInput>
    connectOrCreate?: CoreSetCreateOrConnectWithoutRepsInput
    upsert?: CoreSetUpsertWithoutRepsInput
    connect?: CoreSetWhereUniqueInput
    update?: XOR<XOR<CoreSetUpdateToOneWithWhereWithoutRepsInput, CoreSetUpdateWithoutRepsInput>, CoreSetUncheckedUpdateWithoutRepsInput>
  }

  export type CoreSetCreateNestedOneWithoutWeightInput = {
    create?: XOR<CoreSetCreateWithoutWeightInput, CoreSetUncheckedCreateWithoutWeightInput>
    connectOrCreate?: CoreSetCreateOrConnectWithoutWeightInput
    connect?: CoreSetWhereUniqueInput
  }

  export type CoreSetUpdateOneRequiredWithoutWeightNestedInput = {
    create?: XOR<CoreSetCreateWithoutWeightInput, CoreSetUncheckedCreateWithoutWeightInput>
    connectOrCreate?: CoreSetCreateOrConnectWithoutWeightInput
    upsert?: CoreSetUpsertWithoutWeightInput
    connect?: CoreSetWhereUniqueInput
    update?: XOR<XOR<CoreSetUpdateToOneWithWhereWithoutWeightInput, CoreSetUpdateWithoutWeightInput>, CoreSetUncheckedUpdateWithoutWeightInput>
  }

  export type UserCreateNestedOneWithoutUserSetsInput = {
    create?: XOR<UserCreateWithoutUserSetsInput, UserUncheckedCreateWithoutUserSetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserSetsInput
    connect?: UserWhereUniqueInput
  }

  export type UserWorkoutExerciseCreateNestedOneWithoutUserSetsInput = {
    create?: XOR<UserWorkoutExerciseCreateWithoutUserSetsInput, UserWorkoutExerciseUncheckedCreateWithoutUserSetsInput>
    connectOrCreate?: UserWorkoutExerciseCreateOrConnectWithoutUserSetsInput
    connect?: UserWorkoutExerciseWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserSetsNestedInput = {
    create?: XOR<UserCreateWithoutUserSetsInput, UserUncheckedCreateWithoutUserSetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserSetsInput
    upsert?: UserUpsertWithoutUserSetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserSetsInput, UserUpdateWithoutUserSetsInput>, UserUncheckedUpdateWithoutUserSetsInput>
  }

  export type UserWorkoutExerciseUpdateOneRequiredWithoutUserSetsNestedInput = {
    create?: XOR<UserWorkoutExerciseCreateWithoutUserSetsInput, UserWorkoutExerciseUncheckedCreateWithoutUserSetsInput>
    connectOrCreate?: UserWorkoutExerciseCreateOrConnectWithoutUserSetsInput
    upsert?: UserWorkoutExerciseUpsertWithoutUserSetsInput
    connect?: UserWorkoutExerciseWhereUniqueInput
    update?: XOR<XOR<UserWorkoutExerciseUpdateToOneWithWhereWithoutUserSetsInput, UserWorkoutExerciseUpdateWithoutUserSetsInput>, UserWorkoutExerciseUncheckedUpdateWithoutUserSetsInput>
  }

  export type ProgramWorkoutCreateNestedManyWithoutProgramInput = {
    create?: XOR<ProgramWorkoutCreateWithoutProgramInput, ProgramWorkoutUncheckedCreateWithoutProgramInput> | ProgramWorkoutCreateWithoutProgramInput[] | ProgramWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ProgramWorkoutCreateOrConnectWithoutProgramInput | ProgramWorkoutCreateOrConnectWithoutProgramInput[]
    createMany?: ProgramWorkoutCreateManyProgramInputEnvelope
    connect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
  }

  export type UserWorkoutCreateNestedManyWithoutProgramInput = {
    create?: XOR<UserWorkoutCreateWithoutProgramInput, UserWorkoutUncheckedCreateWithoutProgramInput> | UserWorkoutCreateWithoutProgramInput[] | UserWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutProgramInput | UserWorkoutCreateOrConnectWithoutProgramInput[]
    createMany?: UserWorkoutCreateManyProgramInputEnvelope
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutProgramsInput = {
    create?: XOR<UserCreateWithoutProgramsInput, UserUncheckedCreateWithoutProgramsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgramsInput
    connect?: UserWhereUniqueInput
  }

  export type ProgramWorkoutUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<ProgramWorkoutCreateWithoutProgramInput, ProgramWorkoutUncheckedCreateWithoutProgramInput> | ProgramWorkoutCreateWithoutProgramInput[] | ProgramWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ProgramWorkoutCreateOrConnectWithoutProgramInput | ProgramWorkoutCreateOrConnectWithoutProgramInput[]
    createMany?: ProgramWorkoutCreateManyProgramInputEnvelope
    connect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
  }

  export type UserWorkoutUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<UserWorkoutCreateWithoutProgramInput, UserWorkoutUncheckedCreateWithoutProgramInput> | UserWorkoutCreateWithoutProgramInput[] | UserWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutProgramInput | UserWorkoutCreateOrConnectWithoutProgramInput[]
    createMany?: UserWorkoutCreateManyProgramInputEnvelope
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
  }

  export type ProgramWorkoutUpdateManyWithoutProgramNestedInput = {
    create?: XOR<ProgramWorkoutCreateWithoutProgramInput, ProgramWorkoutUncheckedCreateWithoutProgramInput> | ProgramWorkoutCreateWithoutProgramInput[] | ProgramWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ProgramWorkoutCreateOrConnectWithoutProgramInput | ProgramWorkoutCreateOrConnectWithoutProgramInput[]
    upsert?: ProgramWorkoutUpsertWithWhereUniqueWithoutProgramInput | ProgramWorkoutUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: ProgramWorkoutCreateManyProgramInputEnvelope
    set?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    disconnect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    delete?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    connect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    update?: ProgramWorkoutUpdateWithWhereUniqueWithoutProgramInput | ProgramWorkoutUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: ProgramWorkoutUpdateManyWithWhereWithoutProgramInput | ProgramWorkoutUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: ProgramWorkoutScalarWhereInput | ProgramWorkoutScalarWhereInput[]
  }

  export type UserWorkoutUpdateManyWithoutProgramNestedInput = {
    create?: XOR<UserWorkoutCreateWithoutProgramInput, UserWorkoutUncheckedCreateWithoutProgramInput> | UserWorkoutCreateWithoutProgramInput[] | UserWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutProgramInput | UserWorkoutCreateOrConnectWithoutProgramInput[]
    upsert?: UserWorkoutUpsertWithWhereUniqueWithoutProgramInput | UserWorkoutUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: UserWorkoutCreateManyProgramInputEnvelope
    set?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    disconnect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    delete?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    update?: UserWorkoutUpdateWithWhereUniqueWithoutProgramInput | UserWorkoutUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: UserWorkoutUpdateManyWithWhereWithoutProgramInput | UserWorkoutUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: UserWorkoutScalarWhereInput | UserWorkoutScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutProgramsNestedInput = {
    create?: XOR<UserCreateWithoutProgramsInput, UserUncheckedCreateWithoutProgramsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgramsInput
    upsert?: UserUpsertWithoutProgramsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProgramsInput, UserUpdateWithoutProgramsInput>, UserUncheckedUpdateWithoutProgramsInput>
  }

  export type ProgramWorkoutUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<ProgramWorkoutCreateWithoutProgramInput, ProgramWorkoutUncheckedCreateWithoutProgramInput> | ProgramWorkoutCreateWithoutProgramInput[] | ProgramWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ProgramWorkoutCreateOrConnectWithoutProgramInput | ProgramWorkoutCreateOrConnectWithoutProgramInput[]
    upsert?: ProgramWorkoutUpsertWithWhereUniqueWithoutProgramInput | ProgramWorkoutUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: ProgramWorkoutCreateManyProgramInputEnvelope
    set?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    disconnect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    delete?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    connect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    update?: ProgramWorkoutUpdateWithWhereUniqueWithoutProgramInput | ProgramWorkoutUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: ProgramWorkoutUpdateManyWithWhereWithoutProgramInput | ProgramWorkoutUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: ProgramWorkoutScalarWhereInput | ProgramWorkoutScalarWhereInput[]
  }

  export type UserWorkoutUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<UserWorkoutCreateWithoutProgramInput, UserWorkoutUncheckedCreateWithoutProgramInput> | UserWorkoutCreateWithoutProgramInput[] | UserWorkoutUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutProgramInput | UserWorkoutCreateOrConnectWithoutProgramInput[]
    upsert?: UserWorkoutUpsertWithWhereUniqueWithoutProgramInput | UserWorkoutUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: UserWorkoutCreateManyProgramInputEnvelope
    set?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    disconnect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    delete?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    update?: UserWorkoutUpdateWithWhereUniqueWithoutProgramInput | UserWorkoutUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: UserWorkoutUpdateManyWithWhereWithoutProgramInput | UserWorkoutUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: UserWorkoutScalarWhereInput | UserWorkoutScalarWhereInput[]
  }

  export type ProgramWorkoutCreatedaysOfWeekInput = {
    set: $Enums.DaysOfWeek[]
  }

  export type ProgramCreateNestedOneWithoutProgramWorkoutsInput = {
    create?: XOR<ProgramCreateWithoutProgramWorkoutsInput, ProgramUncheckedCreateWithoutProgramWorkoutsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutProgramWorkoutsInput
    connect?: ProgramWhereUniqueInput
  }

  export type WorkoutCreateNestedOneWithoutProgramWorkoutsInput = {
    create?: XOR<WorkoutCreateWithoutProgramWorkoutsInput, WorkoutUncheckedCreateWithoutProgramWorkoutsInput>
    connectOrCreate?: WorkoutCreateOrConnectWithoutProgramWorkoutsInput
    connect?: WorkoutWhereUniqueInput
  }

  export type ProgramWorkoutUpdatedaysOfWeekInput = {
    set?: $Enums.DaysOfWeek[]
    push?: $Enums.DaysOfWeek | $Enums.DaysOfWeek[]
  }

  export type ProgramUpdateOneRequiredWithoutProgramWorkoutsNestedInput = {
    create?: XOR<ProgramCreateWithoutProgramWorkoutsInput, ProgramUncheckedCreateWithoutProgramWorkoutsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutProgramWorkoutsInput
    upsert?: ProgramUpsertWithoutProgramWorkoutsInput
    connect?: ProgramWhereUniqueInput
    update?: XOR<XOR<ProgramUpdateToOneWithWhereWithoutProgramWorkoutsInput, ProgramUpdateWithoutProgramWorkoutsInput>, ProgramUncheckedUpdateWithoutProgramWorkoutsInput>
  }

  export type WorkoutUpdateOneRequiredWithoutProgramWorkoutsNestedInput = {
    create?: XOR<WorkoutCreateWithoutProgramWorkoutsInput, WorkoutUncheckedCreateWithoutProgramWorkoutsInput>
    connectOrCreate?: WorkoutCreateOrConnectWithoutProgramWorkoutsInput
    upsert?: WorkoutUpsertWithoutProgramWorkoutsInput
    connect?: WorkoutWhereUniqueInput
    update?: XOR<XOR<WorkoutUpdateToOneWithWhereWithoutProgramWorkoutsInput, WorkoutUpdateWithoutProgramWorkoutsInput>, WorkoutUncheckedUpdateWithoutProgramWorkoutsInput>
  }

  export type UserCreateNestedOneWithoutWorkoutsInput = {
    create?: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkoutsInput
    connect?: UserWhereUniqueInput
  }

  export type WorkoutExerciseCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<WorkoutExerciseCreateWithoutWorkoutInput, WorkoutExerciseUncheckedCreateWithoutWorkoutInput> | WorkoutExerciseCreateWithoutWorkoutInput[] | WorkoutExerciseUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutWorkoutInput | WorkoutExerciseCreateOrConnectWithoutWorkoutInput[]
    createMany?: WorkoutExerciseCreateManyWorkoutInputEnvelope
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
  }

  export type ProgramWorkoutCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<ProgramWorkoutCreateWithoutWorkoutInput, ProgramWorkoutUncheckedCreateWithoutWorkoutInput> | ProgramWorkoutCreateWithoutWorkoutInput[] | ProgramWorkoutUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: ProgramWorkoutCreateOrConnectWithoutWorkoutInput | ProgramWorkoutCreateOrConnectWithoutWorkoutInput[]
    createMany?: ProgramWorkoutCreateManyWorkoutInputEnvelope
    connect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
  }

  export type UserWorkoutCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<UserWorkoutCreateWithoutWorkoutInput, UserWorkoutUncheckedCreateWithoutWorkoutInput> | UserWorkoutCreateWithoutWorkoutInput[] | UserWorkoutUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutWorkoutInput | UserWorkoutCreateOrConnectWithoutWorkoutInput[]
    createMany?: UserWorkoutCreateManyWorkoutInputEnvelope
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
  }

  export type WorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<WorkoutExerciseCreateWithoutWorkoutInput, WorkoutExerciseUncheckedCreateWithoutWorkoutInput> | WorkoutExerciseCreateWithoutWorkoutInput[] | WorkoutExerciseUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutWorkoutInput | WorkoutExerciseCreateOrConnectWithoutWorkoutInput[]
    createMany?: WorkoutExerciseCreateManyWorkoutInputEnvelope
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
  }

  export type ProgramWorkoutUncheckedCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<ProgramWorkoutCreateWithoutWorkoutInput, ProgramWorkoutUncheckedCreateWithoutWorkoutInput> | ProgramWorkoutCreateWithoutWorkoutInput[] | ProgramWorkoutUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: ProgramWorkoutCreateOrConnectWithoutWorkoutInput | ProgramWorkoutCreateOrConnectWithoutWorkoutInput[]
    createMany?: ProgramWorkoutCreateManyWorkoutInputEnvelope
    connect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
  }

  export type UserWorkoutUncheckedCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<UserWorkoutCreateWithoutWorkoutInput, UserWorkoutUncheckedCreateWithoutWorkoutInput> | UserWorkoutCreateWithoutWorkoutInput[] | UserWorkoutUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutWorkoutInput | UserWorkoutCreateOrConnectWithoutWorkoutInput[]
    createMany?: UserWorkoutCreateManyWorkoutInputEnvelope
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutWorkoutsNestedInput = {
    create?: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkoutsInput
    upsert?: UserUpsertWithoutWorkoutsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkoutsInput, UserUpdateWithoutWorkoutsInput>, UserUncheckedUpdateWithoutWorkoutsInput>
  }

  export type WorkoutExerciseUpdateManyWithoutWorkoutNestedInput = {
    create?: XOR<WorkoutExerciseCreateWithoutWorkoutInput, WorkoutExerciseUncheckedCreateWithoutWorkoutInput> | WorkoutExerciseCreateWithoutWorkoutInput[] | WorkoutExerciseUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutWorkoutInput | WorkoutExerciseCreateOrConnectWithoutWorkoutInput[]
    upsert?: WorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutInput | WorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutInput[]
    createMany?: WorkoutExerciseCreateManyWorkoutInputEnvelope
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    update?: WorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutInput | WorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutInput[]
    updateMany?: WorkoutExerciseUpdateManyWithWhereWithoutWorkoutInput | WorkoutExerciseUpdateManyWithWhereWithoutWorkoutInput[]
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[]
  }

  export type ProgramWorkoutUpdateManyWithoutWorkoutNestedInput = {
    create?: XOR<ProgramWorkoutCreateWithoutWorkoutInput, ProgramWorkoutUncheckedCreateWithoutWorkoutInput> | ProgramWorkoutCreateWithoutWorkoutInput[] | ProgramWorkoutUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: ProgramWorkoutCreateOrConnectWithoutWorkoutInput | ProgramWorkoutCreateOrConnectWithoutWorkoutInput[]
    upsert?: ProgramWorkoutUpsertWithWhereUniqueWithoutWorkoutInput | ProgramWorkoutUpsertWithWhereUniqueWithoutWorkoutInput[]
    createMany?: ProgramWorkoutCreateManyWorkoutInputEnvelope
    set?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    disconnect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    delete?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    connect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    update?: ProgramWorkoutUpdateWithWhereUniqueWithoutWorkoutInput | ProgramWorkoutUpdateWithWhereUniqueWithoutWorkoutInput[]
    updateMany?: ProgramWorkoutUpdateManyWithWhereWithoutWorkoutInput | ProgramWorkoutUpdateManyWithWhereWithoutWorkoutInput[]
    deleteMany?: ProgramWorkoutScalarWhereInput | ProgramWorkoutScalarWhereInput[]
  }

  export type UserWorkoutUpdateManyWithoutWorkoutNestedInput = {
    create?: XOR<UserWorkoutCreateWithoutWorkoutInput, UserWorkoutUncheckedCreateWithoutWorkoutInput> | UserWorkoutCreateWithoutWorkoutInput[] | UserWorkoutUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutWorkoutInput | UserWorkoutCreateOrConnectWithoutWorkoutInput[]
    upsert?: UserWorkoutUpsertWithWhereUniqueWithoutWorkoutInput | UserWorkoutUpsertWithWhereUniqueWithoutWorkoutInput[]
    createMany?: UserWorkoutCreateManyWorkoutInputEnvelope
    set?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    disconnect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    delete?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    update?: UserWorkoutUpdateWithWhereUniqueWithoutWorkoutInput | UserWorkoutUpdateWithWhereUniqueWithoutWorkoutInput[]
    updateMany?: UserWorkoutUpdateManyWithWhereWithoutWorkoutInput | UserWorkoutUpdateManyWithWhereWithoutWorkoutInput[]
    deleteMany?: UserWorkoutScalarWhereInput | UserWorkoutScalarWhereInput[]
  }

  export type WorkoutExerciseUncheckedUpdateManyWithoutWorkoutNestedInput = {
    create?: XOR<WorkoutExerciseCreateWithoutWorkoutInput, WorkoutExerciseUncheckedCreateWithoutWorkoutInput> | WorkoutExerciseCreateWithoutWorkoutInput[] | WorkoutExerciseUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutWorkoutInput | WorkoutExerciseCreateOrConnectWithoutWorkoutInput[]
    upsert?: WorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutInput | WorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutInput[]
    createMany?: WorkoutExerciseCreateManyWorkoutInputEnvelope
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[]
    update?: WorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutInput | WorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutInput[]
    updateMany?: WorkoutExerciseUpdateManyWithWhereWithoutWorkoutInput | WorkoutExerciseUpdateManyWithWhereWithoutWorkoutInput[]
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[]
  }

  export type ProgramWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput = {
    create?: XOR<ProgramWorkoutCreateWithoutWorkoutInput, ProgramWorkoutUncheckedCreateWithoutWorkoutInput> | ProgramWorkoutCreateWithoutWorkoutInput[] | ProgramWorkoutUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: ProgramWorkoutCreateOrConnectWithoutWorkoutInput | ProgramWorkoutCreateOrConnectWithoutWorkoutInput[]
    upsert?: ProgramWorkoutUpsertWithWhereUniqueWithoutWorkoutInput | ProgramWorkoutUpsertWithWhereUniqueWithoutWorkoutInput[]
    createMany?: ProgramWorkoutCreateManyWorkoutInputEnvelope
    set?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    disconnect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    delete?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    connect?: ProgramWorkoutWhereUniqueInput | ProgramWorkoutWhereUniqueInput[]
    update?: ProgramWorkoutUpdateWithWhereUniqueWithoutWorkoutInput | ProgramWorkoutUpdateWithWhereUniqueWithoutWorkoutInput[]
    updateMany?: ProgramWorkoutUpdateManyWithWhereWithoutWorkoutInput | ProgramWorkoutUpdateManyWithWhereWithoutWorkoutInput[]
    deleteMany?: ProgramWorkoutScalarWhereInput | ProgramWorkoutScalarWhereInput[]
  }

  export type UserWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput = {
    create?: XOR<UserWorkoutCreateWithoutWorkoutInput, UserWorkoutUncheckedCreateWithoutWorkoutInput> | UserWorkoutCreateWithoutWorkoutInput[] | UserWorkoutUncheckedCreateWithoutWorkoutInput[]
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutWorkoutInput | UserWorkoutCreateOrConnectWithoutWorkoutInput[]
    upsert?: UserWorkoutUpsertWithWhereUniqueWithoutWorkoutInput | UserWorkoutUpsertWithWhereUniqueWithoutWorkoutInput[]
    createMany?: UserWorkoutCreateManyWorkoutInputEnvelope
    set?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    disconnect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    delete?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    connect?: UserWorkoutWhereUniqueInput | UserWorkoutWhereUniqueInput[]
    update?: UserWorkoutUpdateWithWhereUniqueWithoutWorkoutInput | UserWorkoutUpdateWithWhereUniqueWithoutWorkoutInput[]
    updateMany?: UserWorkoutUpdateManyWithWhereWithoutWorkoutInput | UserWorkoutUpdateManyWithWhereWithoutWorkoutInput[]
    deleteMany?: UserWorkoutScalarWhereInput | UserWorkoutScalarWhereInput[]
  }

  export type CoreSetCreateNestedOneWithoutWorkoutExerciseInput = {
    create?: XOR<CoreSetCreateWithoutWorkoutExerciseInput, CoreSetUncheckedCreateWithoutWorkoutExerciseInput>
    connectOrCreate?: CoreSetCreateOrConnectWithoutWorkoutExerciseInput
    connect?: CoreSetWhereUniqueInput
  }

  export type CoreCardioSetCreateNestedOneWithoutWorkoutExerciseInput = {
    create?: XOR<CoreCardioSetCreateWithoutWorkoutExerciseInput, CoreCardioSetUncheckedCreateWithoutWorkoutExerciseInput>
    connectOrCreate?: CoreCardioSetCreateOrConnectWithoutWorkoutExerciseInput
    connect?: CoreCardioSetWhereUniqueInput
  }

  export type ExerciseCreateNestedOneWithoutWorkoutExercisesInput = {
    create?: XOR<ExerciseCreateWithoutWorkoutExercisesInput, ExerciseUncheckedCreateWithoutWorkoutExercisesInput>
    connectOrCreate?: ExerciseCreateOrConnectWithoutWorkoutExercisesInput
    connect?: ExerciseWhereUniqueInput
  }

  export type WorkoutCreateNestedOneWithoutWorkoutExercisesInput = {
    create?: XOR<WorkoutCreateWithoutWorkoutExercisesInput, WorkoutUncheckedCreateWithoutWorkoutExercisesInput>
    connectOrCreate?: WorkoutCreateOrConnectWithoutWorkoutExercisesInput
    connect?: WorkoutWhereUniqueInput
  }

  export type UserWorkoutExerciseCreateNestedManyWithoutWorkoutExerciseInput = {
    create?: XOR<UserWorkoutExerciseCreateWithoutWorkoutExerciseInput, UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput> | UserWorkoutExerciseCreateWithoutWorkoutExerciseInput[] | UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput[]
    connectOrCreate?: UserWorkoutExerciseCreateOrConnectWithoutWorkoutExerciseInput | UserWorkoutExerciseCreateOrConnectWithoutWorkoutExerciseInput[]
    createMany?: UserWorkoutExerciseCreateManyWorkoutExerciseInputEnvelope
    connect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
  }

  export type UserWorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutExerciseInput = {
    create?: XOR<UserWorkoutExerciseCreateWithoutWorkoutExerciseInput, UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput> | UserWorkoutExerciseCreateWithoutWorkoutExerciseInput[] | UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput[]
    connectOrCreate?: UserWorkoutExerciseCreateOrConnectWithoutWorkoutExerciseInput | UserWorkoutExerciseCreateOrConnectWithoutWorkoutExerciseInput[]
    createMany?: UserWorkoutExerciseCreateManyWorkoutExerciseInputEnvelope
    connect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
  }

  export type CoreSetUpdateOneWithoutWorkoutExerciseNestedInput = {
    create?: XOR<CoreSetCreateWithoutWorkoutExerciseInput, CoreSetUncheckedCreateWithoutWorkoutExerciseInput>
    connectOrCreate?: CoreSetCreateOrConnectWithoutWorkoutExerciseInput
    upsert?: CoreSetUpsertWithoutWorkoutExerciseInput
    disconnect?: CoreSetWhereInput | boolean
    delete?: CoreSetWhereInput | boolean
    connect?: CoreSetWhereUniqueInput
    update?: XOR<XOR<CoreSetUpdateToOneWithWhereWithoutWorkoutExerciseInput, CoreSetUpdateWithoutWorkoutExerciseInput>, CoreSetUncheckedUpdateWithoutWorkoutExerciseInput>
  }

  export type CoreCardioSetUpdateOneWithoutWorkoutExerciseNestedInput = {
    create?: XOR<CoreCardioSetCreateWithoutWorkoutExerciseInput, CoreCardioSetUncheckedCreateWithoutWorkoutExerciseInput>
    connectOrCreate?: CoreCardioSetCreateOrConnectWithoutWorkoutExerciseInput
    upsert?: CoreCardioSetUpsertWithoutWorkoutExerciseInput
    disconnect?: CoreCardioSetWhereInput | boolean
    delete?: CoreCardioSetWhereInput | boolean
    connect?: CoreCardioSetWhereUniqueInput
    update?: XOR<XOR<CoreCardioSetUpdateToOneWithWhereWithoutWorkoutExerciseInput, CoreCardioSetUpdateWithoutWorkoutExerciseInput>, CoreCardioSetUncheckedUpdateWithoutWorkoutExerciseInput>
  }

  export type ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput = {
    create?: XOR<ExerciseCreateWithoutWorkoutExercisesInput, ExerciseUncheckedCreateWithoutWorkoutExercisesInput>
    connectOrCreate?: ExerciseCreateOrConnectWithoutWorkoutExercisesInput
    upsert?: ExerciseUpsertWithoutWorkoutExercisesInput
    connect?: ExerciseWhereUniqueInput
    update?: XOR<XOR<ExerciseUpdateToOneWithWhereWithoutWorkoutExercisesInput, ExerciseUpdateWithoutWorkoutExercisesInput>, ExerciseUncheckedUpdateWithoutWorkoutExercisesInput>
  }

  export type WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput = {
    create?: XOR<WorkoutCreateWithoutWorkoutExercisesInput, WorkoutUncheckedCreateWithoutWorkoutExercisesInput>
    connectOrCreate?: WorkoutCreateOrConnectWithoutWorkoutExercisesInput
    upsert?: WorkoutUpsertWithoutWorkoutExercisesInput
    connect?: WorkoutWhereUniqueInput
    update?: XOR<XOR<WorkoutUpdateToOneWithWhereWithoutWorkoutExercisesInput, WorkoutUpdateWithoutWorkoutExercisesInput>, WorkoutUncheckedUpdateWithoutWorkoutExercisesInput>
  }

  export type UserWorkoutExerciseUpdateManyWithoutWorkoutExerciseNestedInput = {
    create?: XOR<UserWorkoutExerciseCreateWithoutWorkoutExerciseInput, UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput> | UserWorkoutExerciseCreateWithoutWorkoutExerciseInput[] | UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput[]
    connectOrCreate?: UserWorkoutExerciseCreateOrConnectWithoutWorkoutExerciseInput | UserWorkoutExerciseCreateOrConnectWithoutWorkoutExerciseInput[]
    upsert?: UserWorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutExerciseInput | UserWorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutExerciseInput[]
    createMany?: UserWorkoutExerciseCreateManyWorkoutExerciseInputEnvelope
    set?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    disconnect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    delete?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    connect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    update?: UserWorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutExerciseInput | UserWorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutExerciseInput[]
    updateMany?: UserWorkoutExerciseUpdateManyWithWhereWithoutWorkoutExerciseInput | UserWorkoutExerciseUpdateManyWithWhereWithoutWorkoutExerciseInput[]
    deleteMany?: UserWorkoutExerciseScalarWhereInput | UserWorkoutExerciseScalarWhereInput[]
  }

  export type UserWorkoutExerciseUncheckedUpdateManyWithoutWorkoutExerciseNestedInput = {
    create?: XOR<UserWorkoutExerciseCreateWithoutWorkoutExerciseInput, UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput> | UserWorkoutExerciseCreateWithoutWorkoutExerciseInput[] | UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput[]
    connectOrCreate?: UserWorkoutExerciseCreateOrConnectWithoutWorkoutExerciseInput | UserWorkoutExerciseCreateOrConnectWithoutWorkoutExerciseInput[]
    upsert?: UserWorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutExerciseInput | UserWorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutExerciseInput[]
    createMany?: UserWorkoutExerciseCreateManyWorkoutExerciseInputEnvelope
    set?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    disconnect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    delete?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    connect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    update?: UserWorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutExerciseInput | UserWorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutExerciseInput[]
    updateMany?: UserWorkoutExerciseUpdateManyWithWhereWithoutWorkoutExerciseInput | UserWorkoutExerciseUpdateManyWithWhereWithoutWorkoutExerciseInput[]
    deleteMany?: UserWorkoutExerciseScalarWhereInput | UserWorkoutExerciseScalarWhereInput[]
  }

  export type WorkoutExerciseCreateNestedOneWithoutUserWorkoutExercisesInput = {
    create?: XOR<WorkoutExerciseCreateWithoutUserWorkoutExercisesInput, WorkoutExerciseUncheckedCreateWithoutUserWorkoutExercisesInput>
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutUserWorkoutExercisesInput
    connect?: WorkoutExerciseWhereUniqueInput
  }

  export type UserWorkoutCreateNestedOneWithoutUserWorkoutExercisesInput = {
    create?: XOR<UserWorkoutCreateWithoutUserWorkoutExercisesInput, UserWorkoutUncheckedCreateWithoutUserWorkoutExercisesInput>
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutUserWorkoutExercisesInput
    connect?: UserWorkoutWhereUniqueInput
  }

  export type UserSetCreateNestedManyWithoutUserWorkoutExerciseInput = {
    create?: XOR<UserSetCreateWithoutUserWorkoutExerciseInput, UserSetUncheckedCreateWithoutUserWorkoutExerciseInput> | UserSetCreateWithoutUserWorkoutExerciseInput[] | UserSetUncheckedCreateWithoutUserWorkoutExerciseInput[]
    connectOrCreate?: UserSetCreateOrConnectWithoutUserWorkoutExerciseInput | UserSetCreateOrConnectWithoutUserWorkoutExerciseInput[]
    createMany?: UserSetCreateManyUserWorkoutExerciseInputEnvelope
    connect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
  }

  export type UserSetUncheckedCreateNestedManyWithoutUserWorkoutExerciseInput = {
    create?: XOR<UserSetCreateWithoutUserWorkoutExerciseInput, UserSetUncheckedCreateWithoutUserWorkoutExerciseInput> | UserSetCreateWithoutUserWorkoutExerciseInput[] | UserSetUncheckedCreateWithoutUserWorkoutExerciseInput[]
    connectOrCreate?: UserSetCreateOrConnectWithoutUserWorkoutExerciseInput | UserSetCreateOrConnectWithoutUserWorkoutExerciseInput[]
    createMany?: UserSetCreateManyUserWorkoutExerciseInputEnvelope
    connect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
  }

  export type WorkoutExerciseUpdateOneRequiredWithoutUserWorkoutExercisesNestedInput = {
    create?: XOR<WorkoutExerciseCreateWithoutUserWorkoutExercisesInput, WorkoutExerciseUncheckedCreateWithoutUserWorkoutExercisesInput>
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutUserWorkoutExercisesInput
    upsert?: WorkoutExerciseUpsertWithoutUserWorkoutExercisesInput
    connect?: WorkoutExerciseWhereUniqueInput
    update?: XOR<XOR<WorkoutExerciseUpdateToOneWithWhereWithoutUserWorkoutExercisesInput, WorkoutExerciseUpdateWithoutUserWorkoutExercisesInput>, WorkoutExerciseUncheckedUpdateWithoutUserWorkoutExercisesInput>
  }

  export type UserWorkoutUpdateOneRequiredWithoutUserWorkoutExercisesNestedInput = {
    create?: XOR<UserWorkoutCreateWithoutUserWorkoutExercisesInput, UserWorkoutUncheckedCreateWithoutUserWorkoutExercisesInput>
    connectOrCreate?: UserWorkoutCreateOrConnectWithoutUserWorkoutExercisesInput
    upsert?: UserWorkoutUpsertWithoutUserWorkoutExercisesInput
    connect?: UserWorkoutWhereUniqueInput
    update?: XOR<XOR<UserWorkoutUpdateToOneWithWhereWithoutUserWorkoutExercisesInput, UserWorkoutUpdateWithoutUserWorkoutExercisesInput>, UserWorkoutUncheckedUpdateWithoutUserWorkoutExercisesInput>
  }

  export type UserSetUpdateManyWithoutUserWorkoutExerciseNestedInput = {
    create?: XOR<UserSetCreateWithoutUserWorkoutExerciseInput, UserSetUncheckedCreateWithoutUserWorkoutExerciseInput> | UserSetCreateWithoutUserWorkoutExerciseInput[] | UserSetUncheckedCreateWithoutUserWorkoutExerciseInput[]
    connectOrCreate?: UserSetCreateOrConnectWithoutUserWorkoutExerciseInput | UserSetCreateOrConnectWithoutUserWorkoutExerciseInput[]
    upsert?: UserSetUpsertWithWhereUniqueWithoutUserWorkoutExerciseInput | UserSetUpsertWithWhereUniqueWithoutUserWorkoutExerciseInput[]
    createMany?: UserSetCreateManyUserWorkoutExerciseInputEnvelope
    set?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    disconnect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    delete?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    connect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    update?: UserSetUpdateWithWhereUniqueWithoutUserWorkoutExerciseInput | UserSetUpdateWithWhereUniqueWithoutUserWorkoutExerciseInput[]
    updateMany?: UserSetUpdateManyWithWhereWithoutUserWorkoutExerciseInput | UserSetUpdateManyWithWhereWithoutUserWorkoutExerciseInput[]
    deleteMany?: UserSetScalarWhereInput | UserSetScalarWhereInput[]
  }

  export type UserSetUncheckedUpdateManyWithoutUserWorkoutExerciseNestedInput = {
    create?: XOR<UserSetCreateWithoutUserWorkoutExerciseInput, UserSetUncheckedCreateWithoutUserWorkoutExerciseInput> | UserSetCreateWithoutUserWorkoutExerciseInput[] | UserSetUncheckedCreateWithoutUserWorkoutExerciseInput[]
    connectOrCreate?: UserSetCreateOrConnectWithoutUserWorkoutExerciseInput | UserSetCreateOrConnectWithoutUserWorkoutExerciseInput[]
    upsert?: UserSetUpsertWithWhereUniqueWithoutUserWorkoutExerciseInput | UserSetUpsertWithWhereUniqueWithoutUserWorkoutExerciseInput[]
    createMany?: UserSetCreateManyUserWorkoutExerciseInputEnvelope
    set?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    disconnect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    delete?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    connect?: UserSetWhereUniqueInput | UserSetWhereUniqueInput[]
    update?: UserSetUpdateWithWhereUniqueWithoutUserWorkoutExerciseInput | UserSetUpdateWithWhereUniqueWithoutUserWorkoutExerciseInput[]
    updateMany?: UserSetUpdateManyWithWhereWithoutUserWorkoutExerciseInput | UserSetUpdateManyWithWhereWithoutUserWorkoutExerciseInput[]
    deleteMany?: UserSetScalarWhereInput | UserSetScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserWorkoutInput = {
    create?: XOR<UserCreateWithoutUserWorkoutInput, UserUncheckedCreateWithoutUserWorkoutInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserWorkoutInput
    connect?: UserWhereUniqueInput
  }

  export type UserWorkoutExerciseCreateNestedManyWithoutUserWorkoutInput = {
    create?: XOR<UserWorkoutExerciseCreateWithoutUserWorkoutInput, UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput> | UserWorkoutExerciseCreateWithoutUserWorkoutInput[] | UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput[]
    connectOrCreate?: UserWorkoutExerciseCreateOrConnectWithoutUserWorkoutInput | UserWorkoutExerciseCreateOrConnectWithoutUserWorkoutInput[]
    createMany?: UserWorkoutExerciseCreateManyUserWorkoutInputEnvelope
    connect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
  }

  export type ProgramCreateNestedOneWithoutUserWorkoutInput = {
    create?: XOR<ProgramCreateWithoutUserWorkoutInput, ProgramUncheckedCreateWithoutUserWorkoutInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutUserWorkoutInput
    connect?: ProgramWhereUniqueInput
  }

  export type WorkoutCreateNestedOneWithoutUserWorkoutsInput = {
    create?: XOR<WorkoutCreateWithoutUserWorkoutsInput, WorkoutUncheckedCreateWithoutUserWorkoutsInput>
    connectOrCreate?: WorkoutCreateOrConnectWithoutUserWorkoutsInput
    connect?: WorkoutWhereUniqueInput
  }

  export type UserWorkoutExerciseUncheckedCreateNestedManyWithoutUserWorkoutInput = {
    create?: XOR<UserWorkoutExerciseCreateWithoutUserWorkoutInput, UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput> | UserWorkoutExerciseCreateWithoutUserWorkoutInput[] | UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput[]
    connectOrCreate?: UserWorkoutExerciseCreateOrConnectWithoutUserWorkoutInput | UserWorkoutExerciseCreateOrConnectWithoutUserWorkoutInput[]
    createMany?: UserWorkoutExerciseCreateManyUserWorkoutInputEnvelope
    connect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutUserWorkoutNestedInput = {
    create?: XOR<UserCreateWithoutUserWorkoutInput, UserUncheckedCreateWithoutUserWorkoutInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserWorkoutInput
    upsert?: UserUpsertWithoutUserWorkoutInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserWorkoutInput, UserUpdateWithoutUserWorkoutInput>, UserUncheckedUpdateWithoutUserWorkoutInput>
  }

  export type UserWorkoutExerciseUpdateManyWithoutUserWorkoutNestedInput = {
    create?: XOR<UserWorkoutExerciseCreateWithoutUserWorkoutInput, UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput> | UserWorkoutExerciseCreateWithoutUserWorkoutInput[] | UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput[]
    connectOrCreate?: UserWorkoutExerciseCreateOrConnectWithoutUserWorkoutInput | UserWorkoutExerciseCreateOrConnectWithoutUserWorkoutInput[]
    upsert?: UserWorkoutExerciseUpsertWithWhereUniqueWithoutUserWorkoutInput | UserWorkoutExerciseUpsertWithWhereUniqueWithoutUserWorkoutInput[]
    createMany?: UserWorkoutExerciseCreateManyUserWorkoutInputEnvelope
    set?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    disconnect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    delete?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    connect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    update?: UserWorkoutExerciseUpdateWithWhereUniqueWithoutUserWorkoutInput | UserWorkoutExerciseUpdateWithWhereUniqueWithoutUserWorkoutInput[]
    updateMany?: UserWorkoutExerciseUpdateManyWithWhereWithoutUserWorkoutInput | UserWorkoutExerciseUpdateManyWithWhereWithoutUserWorkoutInput[]
    deleteMany?: UserWorkoutExerciseScalarWhereInput | UserWorkoutExerciseScalarWhereInput[]
  }

  export type ProgramUpdateOneWithoutUserWorkoutNestedInput = {
    create?: XOR<ProgramCreateWithoutUserWorkoutInput, ProgramUncheckedCreateWithoutUserWorkoutInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutUserWorkoutInput
    upsert?: ProgramUpsertWithoutUserWorkoutInput
    disconnect?: ProgramWhereInput | boolean
    delete?: ProgramWhereInput | boolean
    connect?: ProgramWhereUniqueInput
    update?: XOR<XOR<ProgramUpdateToOneWithWhereWithoutUserWorkoutInput, ProgramUpdateWithoutUserWorkoutInput>, ProgramUncheckedUpdateWithoutUserWorkoutInput>
  }

  export type WorkoutUpdateOneWithoutUserWorkoutsNestedInput = {
    create?: XOR<WorkoutCreateWithoutUserWorkoutsInput, WorkoutUncheckedCreateWithoutUserWorkoutsInput>
    connectOrCreate?: WorkoutCreateOrConnectWithoutUserWorkoutsInput
    upsert?: WorkoutUpsertWithoutUserWorkoutsInput
    disconnect?: WorkoutWhereInput | boolean
    delete?: WorkoutWhereInput | boolean
    connect?: WorkoutWhereUniqueInput
    update?: XOR<XOR<WorkoutUpdateToOneWithWhereWithoutUserWorkoutsInput, WorkoutUpdateWithoutUserWorkoutsInput>, WorkoutUncheckedUpdateWithoutUserWorkoutsInput>
  }

  export type UserWorkoutExerciseUncheckedUpdateManyWithoutUserWorkoutNestedInput = {
    create?: XOR<UserWorkoutExerciseCreateWithoutUserWorkoutInput, UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput> | UserWorkoutExerciseCreateWithoutUserWorkoutInput[] | UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput[]
    connectOrCreate?: UserWorkoutExerciseCreateOrConnectWithoutUserWorkoutInput | UserWorkoutExerciseCreateOrConnectWithoutUserWorkoutInput[]
    upsert?: UserWorkoutExerciseUpsertWithWhereUniqueWithoutUserWorkoutInput | UserWorkoutExerciseUpsertWithWhereUniqueWithoutUserWorkoutInput[]
    createMany?: UserWorkoutExerciseCreateManyUserWorkoutInputEnvelope
    set?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    disconnect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    delete?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    connect?: UserWorkoutExerciseWhereUniqueInput | UserWorkoutExerciseWhereUniqueInput[]
    update?: UserWorkoutExerciseUpdateWithWhereUniqueWithoutUserWorkoutInput | UserWorkoutExerciseUpdateWithWhereUniqueWithoutUserWorkoutInput[]
    updateMany?: UserWorkoutExerciseUpdateManyWithWhereWithoutUserWorkoutInput | UserWorkoutExerciseUpdateManyWithWhereWithoutUserWorkoutInput[]
    deleteMany?: UserWorkoutExerciseScalarWhereInput | UserWorkoutExerciseScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumExerciseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExerciseType | EnumExerciseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExerciseType[] | ListEnumExerciseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExerciseType[] | ListEnumExerciseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExerciseTypeFilter<$PrismaModel> | $Enums.ExerciseType
  }

  export type NestedEnumExerciseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExerciseType | EnumExerciseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExerciseType[] | ListEnumExerciseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExerciseType[] | ListEnumExerciseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExerciseTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExerciseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExerciseTypeFilter<$PrismaModel>
    _max?: NestedEnumExerciseTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProgramCreateWithoutOwnerInput = {
    id?: string
    name: string
    notes?: string | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programWorkouts?: ProgramWorkoutCreateNestedManyWithoutProgramInput
    userWorkout?: UserWorkoutCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    notes?: string | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programWorkouts?: ProgramWorkoutUncheckedCreateNestedManyWithoutProgramInput
    userWorkout?: UserWorkoutUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutOwnerInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutOwnerInput, ProgramUncheckedCreateWithoutOwnerInput>
  }

  export type ProgramCreateManyOwnerInputEnvelope = {
    data: ProgramCreateManyOwnerInput | ProgramCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type UserSetCreateWithoutUserInput = {
    id?: string
    reps?: number
    weight?: number | null
    isBodyWeight?: boolean
    restTime?: number
    order?: number
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userWorkoutExercise: UserWorkoutExerciseCreateNestedOneWithoutUserSetsInput
  }

  export type UserSetUncheckedCreateWithoutUserInput = {
    id?: string
    reps?: number
    weight?: number | null
    isBodyWeight?: boolean
    restTime?: number
    order?: number
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    userWorkoutExerciseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSetCreateOrConnectWithoutUserInput = {
    where: UserSetWhereUniqueInput
    create: XOR<UserSetCreateWithoutUserInput, UserSetUncheckedCreateWithoutUserInput>
  }

  export type UserSetCreateManyUserInputEnvelope = {
    data: UserSetCreateManyUserInput | UserSetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WorkoutCreateWithoutOwnerInput = {
    id?: string
    name?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutWorkoutInput
    programWorkouts?: ProgramWorkoutCreateNestedManyWithoutWorkoutInput
    userWorkouts?: UserWorkoutCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutUncheckedCreateWithoutOwnerInput = {
    id?: string
    name?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutInput
    programWorkouts?: ProgramWorkoutUncheckedCreateNestedManyWithoutWorkoutInput
    userWorkouts?: UserWorkoutUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutCreateOrConnectWithoutOwnerInput = {
    where: WorkoutWhereUniqueInput
    create: XOR<WorkoutCreateWithoutOwnerInput, WorkoutUncheckedCreateWithoutOwnerInput>
  }

  export type WorkoutCreateManyOwnerInputEnvelope = {
    data: WorkoutCreateManyOwnerInput | WorkoutCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type UserWorkoutCreateWithoutOwnerInput = {
    id?: string
    dateCompleted?: Date | string | null
    createdAt?: Date | string
    userWorkoutExercises?: UserWorkoutExerciseCreateNestedManyWithoutUserWorkoutInput
    program?: ProgramCreateNestedOneWithoutUserWorkoutInput
    workout?: WorkoutCreateNestedOneWithoutUserWorkoutsInput
  }

  export type UserWorkoutUncheckedCreateWithoutOwnerInput = {
    id?: string
    dateCompleted?: Date | string | null
    programId?: string | null
    workoutId?: string | null
    createdAt?: Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedCreateNestedManyWithoutUserWorkoutInput
  }

  export type UserWorkoutCreateOrConnectWithoutOwnerInput = {
    where: UserWorkoutWhereUniqueInput
    create: XOR<UserWorkoutCreateWithoutOwnerInput, UserWorkoutUncheckedCreateWithoutOwnerInput>
  }

  export type UserWorkoutCreateManyOwnerInputEnvelope = {
    data: UserWorkoutCreateManyOwnerInput | UserWorkoutCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type ProgramUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ProgramWhereUniqueInput
    update: XOR<ProgramUpdateWithoutOwnerInput, ProgramUncheckedUpdateWithoutOwnerInput>
    create: XOR<ProgramCreateWithoutOwnerInput, ProgramUncheckedCreateWithoutOwnerInput>
  }

  export type ProgramUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ProgramWhereUniqueInput
    data: XOR<ProgramUpdateWithoutOwnerInput, ProgramUncheckedUpdateWithoutOwnerInput>
  }

  export type ProgramUpdateManyWithWhereWithoutOwnerInput = {
    where: ProgramScalarWhereInput
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyWithoutOwnerInput>
  }

  export type ProgramScalarWhereInput = {
    AND?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
    OR?: ProgramScalarWhereInput[]
    NOT?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
    id?: StringFilter<"Program"> | string
    name?: StringFilter<"Program"> | string
    notes?: StringNullableFilter<"Program"> | string | null
    startDate?: DateTimeFilter<"Program"> | Date | string
    endDate?: DateTimeFilter<"Program"> | Date | string
    isActive?: BoolFilter<"Program"> | boolean
    ownerId?: StringFilter<"Program"> | string
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
  }

  export type UserSetUpsertWithWhereUniqueWithoutUserInput = {
    where: UserSetWhereUniqueInput
    update: XOR<UserSetUpdateWithoutUserInput, UserSetUncheckedUpdateWithoutUserInput>
    create: XOR<UserSetCreateWithoutUserInput, UserSetUncheckedCreateWithoutUserInput>
  }

  export type UserSetUpdateWithWhereUniqueWithoutUserInput = {
    where: UserSetWhereUniqueInput
    data: XOR<UserSetUpdateWithoutUserInput, UserSetUncheckedUpdateWithoutUserInput>
  }

  export type UserSetUpdateManyWithWhereWithoutUserInput = {
    where: UserSetScalarWhereInput
    data: XOR<UserSetUpdateManyMutationInput, UserSetUncheckedUpdateManyWithoutUserInput>
  }

  export type UserSetScalarWhereInput = {
    AND?: UserSetScalarWhereInput | UserSetScalarWhereInput[]
    OR?: UserSetScalarWhereInput[]
    NOT?: UserSetScalarWhereInput | UserSetScalarWhereInput[]
    id?: StringFilter<"UserSet"> | string
    reps?: IntFilter<"UserSet"> | number
    weight?: FloatNullableFilter<"UserSet"> | number | null
    isBodyWeight?: BoolFilter<"UserSet"> | boolean
    restTime?: IntFilter<"UserSet"> | number
    order?: IntFilter<"UserSet"> | number
    isCompleted?: BoolFilter<"UserSet"> | boolean
    isWarmup?: BoolFilter<"UserSet"> | boolean
    isMuscleFailure?: BoolFilter<"UserSet"> | boolean
    isJointPain?: BoolFilter<"UserSet"> | boolean
    userId?: StringFilter<"UserSet"> | string
    userWorkoutExerciseId?: StringFilter<"UserSet"> | string
    createdAt?: DateTimeFilter<"UserSet"> | Date | string
    updatedAt?: DateTimeFilter<"UserSet"> | Date | string
  }

  export type WorkoutUpsertWithWhereUniqueWithoutOwnerInput = {
    where: WorkoutWhereUniqueInput
    update: XOR<WorkoutUpdateWithoutOwnerInput, WorkoutUncheckedUpdateWithoutOwnerInput>
    create: XOR<WorkoutCreateWithoutOwnerInput, WorkoutUncheckedCreateWithoutOwnerInput>
  }

  export type WorkoutUpdateWithWhereUniqueWithoutOwnerInput = {
    where: WorkoutWhereUniqueInput
    data: XOR<WorkoutUpdateWithoutOwnerInput, WorkoutUncheckedUpdateWithoutOwnerInput>
  }

  export type WorkoutUpdateManyWithWhereWithoutOwnerInput = {
    where: WorkoutScalarWhereInput
    data: XOR<WorkoutUpdateManyMutationInput, WorkoutUncheckedUpdateManyWithoutOwnerInput>
  }

  export type WorkoutScalarWhereInput = {
    AND?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[]
    OR?: WorkoutScalarWhereInput[]
    NOT?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[]
    id?: StringFilter<"Workout"> | string
    name?: StringNullableFilter<"Workout"> | string | null
    notes?: StringNullableFilter<"Workout"> | string | null
    ownerId?: StringNullableFilter<"Workout"> | string | null
    createdAt?: DateTimeFilter<"Workout"> | Date | string
    updatedAt?: DateTimeFilter<"Workout"> | Date | string
  }

  export type UserWorkoutUpsertWithWhereUniqueWithoutOwnerInput = {
    where: UserWorkoutWhereUniqueInput
    update: XOR<UserWorkoutUpdateWithoutOwnerInput, UserWorkoutUncheckedUpdateWithoutOwnerInput>
    create: XOR<UserWorkoutCreateWithoutOwnerInput, UserWorkoutUncheckedCreateWithoutOwnerInput>
  }

  export type UserWorkoutUpdateWithWhereUniqueWithoutOwnerInput = {
    where: UserWorkoutWhereUniqueInput
    data: XOR<UserWorkoutUpdateWithoutOwnerInput, UserWorkoutUncheckedUpdateWithoutOwnerInput>
  }

  export type UserWorkoutUpdateManyWithWhereWithoutOwnerInput = {
    where: UserWorkoutScalarWhereInput
    data: XOR<UserWorkoutUpdateManyMutationInput, UserWorkoutUncheckedUpdateManyWithoutOwnerInput>
  }

  export type UserWorkoutScalarWhereInput = {
    AND?: UserWorkoutScalarWhereInput | UserWorkoutScalarWhereInput[]
    OR?: UserWorkoutScalarWhereInput[]
    NOT?: UserWorkoutScalarWhereInput | UserWorkoutScalarWhereInput[]
    id?: StringFilter<"UserWorkout"> | string
    dateCompleted?: DateTimeNullableFilter<"UserWorkout"> | Date | string | null
    ownerId?: StringFilter<"UserWorkout"> | string
    programId?: StringNullableFilter<"UserWorkout"> | string | null
    workoutId?: StringNullableFilter<"UserWorkout"> | string | null
    createdAt?: DateTimeFilter<"UserWorkout"> | Date | string
  }

  export type WorkoutExerciseCreateWithoutExerciseInput = {
    id?: string
    order?: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    coreSet?: CoreSetCreateNestedOneWithoutWorkoutExerciseInput
    coreCardioSet?: CoreCardioSetCreateNestedOneWithoutWorkoutExerciseInput
    workout: WorkoutCreateNestedOneWithoutWorkoutExercisesInput
    userWorkoutExercises?: UserWorkoutExerciseCreateNestedManyWithoutWorkoutExerciseInput
  }

  export type WorkoutExerciseUncheckedCreateWithoutExerciseInput = {
    id?: string
    order?: number
    notes?: string | null
    coreSetId?: string | null
    coreCardioSetId?: string | null
    workoutId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutExerciseInput
  }

  export type WorkoutExerciseCreateOrConnectWithoutExerciseInput = {
    where: WorkoutExerciseWhereUniqueInput
    create: XOR<WorkoutExerciseCreateWithoutExerciseInput, WorkoutExerciseUncheckedCreateWithoutExerciseInput>
  }

  export type WorkoutExerciseCreateManyExerciseInputEnvelope = {
    data: WorkoutExerciseCreateManyExerciseInput | WorkoutExerciseCreateManyExerciseInput[]
    skipDuplicates?: boolean
  }

  export type WorkoutExerciseUpsertWithWhereUniqueWithoutExerciseInput = {
    where: WorkoutExerciseWhereUniqueInput
    update: XOR<WorkoutExerciseUpdateWithoutExerciseInput, WorkoutExerciseUncheckedUpdateWithoutExerciseInput>
    create: XOR<WorkoutExerciseCreateWithoutExerciseInput, WorkoutExerciseUncheckedCreateWithoutExerciseInput>
  }

  export type WorkoutExerciseUpdateWithWhereUniqueWithoutExerciseInput = {
    where: WorkoutExerciseWhereUniqueInput
    data: XOR<WorkoutExerciseUpdateWithoutExerciseInput, WorkoutExerciseUncheckedUpdateWithoutExerciseInput>
  }

  export type WorkoutExerciseUpdateManyWithWhereWithoutExerciseInput = {
    where: WorkoutExerciseScalarWhereInput
    data: XOR<WorkoutExerciseUpdateManyMutationInput, WorkoutExerciseUncheckedUpdateManyWithoutExerciseInput>
  }

  export type WorkoutExerciseScalarWhereInput = {
    AND?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[]
    OR?: WorkoutExerciseScalarWhereInput[]
    NOT?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[]
    id?: StringFilter<"WorkoutExercise"> | string
    order?: IntFilter<"WorkoutExercise"> | number
    notes?: StringNullableFilter<"WorkoutExercise"> | string | null
    coreSetId?: StringNullableFilter<"WorkoutExercise"> | string | null
    coreCardioSetId?: StringNullableFilter<"WorkoutExercise"> | string | null
    exerciseId?: StringFilter<"WorkoutExercise"> | string
    workoutId?: StringFilter<"WorkoutExercise"> | string
    createdAt?: DateTimeFilter<"WorkoutExercise"> | Date | string
    updatedAt?: DateTimeFilter<"WorkoutExercise"> | Date | string
  }

  export type WorkoutExerciseCreateWithoutCoreSetInput = {
    id?: string
    order?: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    coreCardioSet?: CoreCardioSetCreateNestedOneWithoutWorkoutExerciseInput
    exercise: ExerciseCreateNestedOneWithoutWorkoutExercisesInput
    workout: WorkoutCreateNestedOneWithoutWorkoutExercisesInput
    userWorkoutExercises?: UserWorkoutExerciseCreateNestedManyWithoutWorkoutExerciseInput
  }

  export type WorkoutExerciseUncheckedCreateWithoutCoreSetInput = {
    id?: string
    order?: number
    notes?: string | null
    coreCardioSetId?: string | null
    exerciseId: string
    workoutId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutExerciseInput
  }

  export type WorkoutExerciseCreateOrConnectWithoutCoreSetInput = {
    where: WorkoutExerciseWhereUniqueInput
    create: XOR<WorkoutExerciseCreateWithoutCoreSetInput, WorkoutExerciseUncheckedCreateWithoutCoreSetInput>
  }

  export type WorkoutExerciseCreateManyCoreSetInputEnvelope = {
    data: WorkoutExerciseCreateManyCoreSetInput | WorkoutExerciseCreateManyCoreSetInput[]
    skipDuplicates?: boolean
  }

  export type CoreSetRepsCreateWithoutCoreSetInput = {
    id?: string
    reps?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetRepsUncheckedCreateWithoutCoreSetInput = {
    id?: string
    reps?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetRepsCreateOrConnectWithoutCoreSetInput = {
    where: CoreSetRepsWhereUniqueInput
    create: XOR<CoreSetRepsCreateWithoutCoreSetInput, CoreSetRepsUncheckedCreateWithoutCoreSetInput>
  }

  export type CoreSetRepsCreateManyCoreSetInputEnvelope = {
    data: CoreSetRepsCreateManyCoreSetInput | CoreSetRepsCreateManyCoreSetInput[]
    skipDuplicates?: boolean
  }

  export type CoreSetWeightCreateWithoutCoreSetInput = {
    id?: string
    isBodyWeight?: boolean
    weight?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetWeightUncheckedCreateWithoutCoreSetInput = {
    id?: string
    isBodyWeight?: boolean
    weight?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetWeightCreateOrConnectWithoutCoreSetInput = {
    where: CoreSetWeightWhereUniqueInput
    create: XOR<CoreSetWeightCreateWithoutCoreSetInput, CoreSetWeightUncheckedCreateWithoutCoreSetInput>
  }

  export type CoreSetWeightCreateManyCoreSetInputEnvelope = {
    data: CoreSetWeightCreateManyCoreSetInput | CoreSetWeightCreateManyCoreSetInput[]
    skipDuplicates?: boolean
  }

  export type WorkoutExerciseUpsertWithWhereUniqueWithoutCoreSetInput = {
    where: WorkoutExerciseWhereUniqueInput
    update: XOR<WorkoutExerciseUpdateWithoutCoreSetInput, WorkoutExerciseUncheckedUpdateWithoutCoreSetInput>
    create: XOR<WorkoutExerciseCreateWithoutCoreSetInput, WorkoutExerciseUncheckedCreateWithoutCoreSetInput>
  }

  export type WorkoutExerciseUpdateWithWhereUniqueWithoutCoreSetInput = {
    where: WorkoutExerciseWhereUniqueInput
    data: XOR<WorkoutExerciseUpdateWithoutCoreSetInput, WorkoutExerciseUncheckedUpdateWithoutCoreSetInput>
  }

  export type WorkoutExerciseUpdateManyWithWhereWithoutCoreSetInput = {
    where: WorkoutExerciseScalarWhereInput
    data: XOR<WorkoutExerciseUpdateManyMutationInput, WorkoutExerciseUncheckedUpdateManyWithoutCoreSetInput>
  }

  export type CoreSetRepsUpsertWithWhereUniqueWithoutCoreSetInput = {
    where: CoreSetRepsWhereUniqueInput
    update: XOR<CoreSetRepsUpdateWithoutCoreSetInput, CoreSetRepsUncheckedUpdateWithoutCoreSetInput>
    create: XOR<CoreSetRepsCreateWithoutCoreSetInput, CoreSetRepsUncheckedCreateWithoutCoreSetInput>
  }

  export type CoreSetRepsUpdateWithWhereUniqueWithoutCoreSetInput = {
    where: CoreSetRepsWhereUniqueInput
    data: XOR<CoreSetRepsUpdateWithoutCoreSetInput, CoreSetRepsUncheckedUpdateWithoutCoreSetInput>
  }

  export type CoreSetRepsUpdateManyWithWhereWithoutCoreSetInput = {
    where: CoreSetRepsScalarWhereInput
    data: XOR<CoreSetRepsUpdateManyMutationInput, CoreSetRepsUncheckedUpdateManyWithoutCoreSetInput>
  }

  export type CoreSetRepsScalarWhereInput = {
    AND?: CoreSetRepsScalarWhereInput | CoreSetRepsScalarWhereInput[]
    OR?: CoreSetRepsScalarWhereInput[]
    NOT?: CoreSetRepsScalarWhereInput | CoreSetRepsScalarWhereInput[]
    id?: StringFilter<"CoreSetReps"> | string
    coreSetId?: StringFilter<"CoreSetReps"> | string
    reps?: IntFilter<"CoreSetReps"> | number
    createdAt?: DateTimeFilter<"CoreSetReps"> | Date | string
    updatedAt?: DateTimeFilter<"CoreSetReps"> | Date | string
  }

  export type CoreSetWeightUpsertWithWhereUniqueWithoutCoreSetInput = {
    where: CoreSetWeightWhereUniqueInput
    update: XOR<CoreSetWeightUpdateWithoutCoreSetInput, CoreSetWeightUncheckedUpdateWithoutCoreSetInput>
    create: XOR<CoreSetWeightCreateWithoutCoreSetInput, CoreSetWeightUncheckedCreateWithoutCoreSetInput>
  }

  export type CoreSetWeightUpdateWithWhereUniqueWithoutCoreSetInput = {
    where: CoreSetWeightWhereUniqueInput
    data: XOR<CoreSetWeightUpdateWithoutCoreSetInput, CoreSetWeightUncheckedUpdateWithoutCoreSetInput>
  }

  export type CoreSetWeightUpdateManyWithWhereWithoutCoreSetInput = {
    where: CoreSetWeightScalarWhereInput
    data: XOR<CoreSetWeightUpdateManyMutationInput, CoreSetWeightUncheckedUpdateManyWithoutCoreSetInput>
  }

  export type CoreSetWeightScalarWhereInput = {
    AND?: CoreSetWeightScalarWhereInput | CoreSetWeightScalarWhereInput[]
    OR?: CoreSetWeightScalarWhereInput[]
    NOT?: CoreSetWeightScalarWhereInput | CoreSetWeightScalarWhereInput[]
    id?: StringFilter<"CoreSetWeight"> | string
    coreSetId?: StringFilter<"CoreSetWeight"> | string
    isBodyWeight?: BoolFilter<"CoreSetWeight"> | boolean
    weight?: FloatNullableFilter<"CoreSetWeight"> | number | null
    createdAt?: DateTimeFilter<"CoreSetWeight"> | Date | string
    updatedAt?: DateTimeFilter<"CoreSetWeight"> | Date | string
  }

  export type WorkoutExerciseCreateWithoutCoreCardioSetInput = {
    id?: string
    order?: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    coreSet?: CoreSetCreateNestedOneWithoutWorkoutExerciseInput
    exercise: ExerciseCreateNestedOneWithoutWorkoutExercisesInput
    workout: WorkoutCreateNestedOneWithoutWorkoutExercisesInput
    userWorkoutExercises?: UserWorkoutExerciseCreateNestedManyWithoutWorkoutExerciseInput
  }

  export type WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput = {
    id?: string
    order?: number
    notes?: string | null
    coreSetId?: string | null
    exerciseId: string
    workoutId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutExerciseInput
  }

  export type WorkoutExerciseCreateOrConnectWithoutCoreCardioSetInput = {
    where: WorkoutExerciseWhereUniqueInput
    create: XOR<WorkoutExerciseCreateWithoutCoreCardioSetInput, WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput>
  }

  export type WorkoutExerciseCreateManyCoreCardioSetInputEnvelope = {
    data: WorkoutExerciseCreateManyCoreCardioSetInput | WorkoutExerciseCreateManyCoreCardioSetInput[]
    skipDuplicates?: boolean
  }

  export type WorkoutExerciseUpsertWithWhereUniqueWithoutCoreCardioSetInput = {
    where: WorkoutExerciseWhereUniqueInput
    update: XOR<WorkoutExerciseUpdateWithoutCoreCardioSetInput, WorkoutExerciseUncheckedUpdateWithoutCoreCardioSetInput>
    create: XOR<WorkoutExerciseCreateWithoutCoreCardioSetInput, WorkoutExerciseUncheckedCreateWithoutCoreCardioSetInput>
  }

  export type WorkoutExerciseUpdateWithWhereUniqueWithoutCoreCardioSetInput = {
    where: WorkoutExerciseWhereUniqueInput
    data: XOR<WorkoutExerciseUpdateWithoutCoreCardioSetInput, WorkoutExerciseUncheckedUpdateWithoutCoreCardioSetInput>
  }

  export type WorkoutExerciseUpdateManyWithWhereWithoutCoreCardioSetInput = {
    where: WorkoutExerciseScalarWhereInput
    data: XOR<WorkoutExerciseUpdateManyMutationInput, WorkoutExerciseUncheckedUpdateManyWithoutCoreCardioSetInput>
  }

  export type CoreSetCreateWithoutRepsInput = {
    id?: string
    restTime?: number
    numberOfSets?: number
    hasWarmup?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercise?: WorkoutExerciseCreateNestedManyWithoutCoreSetInput
    weight?: CoreSetWeightCreateNestedManyWithoutCoreSetInput
  }

  export type CoreSetUncheckedCreateWithoutRepsInput = {
    id?: string
    restTime?: number
    numberOfSets?: number
    hasWarmup?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercise?: WorkoutExerciseUncheckedCreateNestedManyWithoutCoreSetInput
    weight?: CoreSetWeightUncheckedCreateNestedManyWithoutCoreSetInput
  }

  export type CoreSetCreateOrConnectWithoutRepsInput = {
    where: CoreSetWhereUniqueInput
    create: XOR<CoreSetCreateWithoutRepsInput, CoreSetUncheckedCreateWithoutRepsInput>
  }

  export type CoreSetUpsertWithoutRepsInput = {
    update: XOR<CoreSetUpdateWithoutRepsInput, CoreSetUncheckedUpdateWithoutRepsInput>
    create: XOR<CoreSetCreateWithoutRepsInput, CoreSetUncheckedCreateWithoutRepsInput>
    where?: CoreSetWhereInput
  }

  export type CoreSetUpdateToOneWithWhereWithoutRepsInput = {
    where?: CoreSetWhereInput
    data: XOR<CoreSetUpdateWithoutRepsInput, CoreSetUncheckedUpdateWithoutRepsInput>
  }

  export type CoreSetUpdateWithoutRepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    restTime?: IntFieldUpdateOperationsInput | number
    numberOfSets?: IntFieldUpdateOperationsInput | number
    hasWarmup?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercise?: WorkoutExerciseUpdateManyWithoutCoreSetNestedInput
    weight?: CoreSetWeightUpdateManyWithoutCoreSetNestedInput
  }

  export type CoreSetUncheckedUpdateWithoutRepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    restTime?: IntFieldUpdateOperationsInput | number
    numberOfSets?: IntFieldUpdateOperationsInput | number
    hasWarmup?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercise?: WorkoutExerciseUncheckedUpdateManyWithoutCoreSetNestedInput
    weight?: CoreSetWeightUncheckedUpdateManyWithoutCoreSetNestedInput
  }

  export type CoreSetCreateWithoutWeightInput = {
    id?: string
    restTime?: number
    numberOfSets?: number
    hasWarmup?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercise?: WorkoutExerciseCreateNestedManyWithoutCoreSetInput
    reps?: CoreSetRepsCreateNestedManyWithoutCoreSetInput
  }

  export type CoreSetUncheckedCreateWithoutWeightInput = {
    id?: string
    restTime?: number
    numberOfSets?: number
    hasWarmup?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercise?: WorkoutExerciseUncheckedCreateNestedManyWithoutCoreSetInput
    reps?: CoreSetRepsUncheckedCreateNestedManyWithoutCoreSetInput
  }

  export type CoreSetCreateOrConnectWithoutWeightInput = {
    where: CoreSetWhereUniqueInput
    create: XOR<CoreSetCreateWithoutWeightInput, CoreSetUncheckedCreateWithoutWeightInput>
  }

  export type CoreSetUpsertWithoutWeightInput = {
    update: XOR<CoreSetUpdateWithoutWeightInput, CoreSetUncheckedUpdateWithoutWeightInput>
    create: XOR<CoreSetCreateWithoutWeightInput, CoreSetUncheckedCreateWithoutWeightInput>
    where?: CoreSetWhereInput
  }

  export type CoreSetUpdateToOneWithWhereWithoutWeightInput = {
    where?: CoreSetWhereInput
    data: XOR<CoreSetUpdateWithoutWeightInput, CoreSetUncheckedUpdateWithoutWeightInput>
  }

  export type CoreSetUpdateWithoutWeightInput = {
    id?: StringFieldUpdateOperationsInput | string
    restTime?: IntFieldUpdateOperationsInput | number
    numberOfSets?: IntFieldUpdateOperationsInput | number
    hasWarmup?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercise?: WorkoutExerciseUpdateManyWithoutCoreSetNestedInput
    reps?: CoreSetRepsUpdateManyWithoutCoreSetNestedInput
  }

  export type CoreSetUncheckedUpdateWithoutWeightInput = {
    id?: StringFieldUpdateOperationsInput | string
    restTime?: IntFieldUpdateOperationsInput | number
    numberOfSets?: IntFieldUpdateOperationsInput | number
    hasWarmup?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercise?: WorkoutExerciseUncheckedUpdateManyWithoutCoreSetNestedInput
    reps?: CoreSetRepsUncheckedUpdateManyWithoutCoreSetNestedInput
  }

  export type UserCreateWithoutUserSetsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramCreateNestedManyWithoutOwnerInput
    workouts?: WorkoutCreateNestedManyWithoutOwnerInput
    userWorkout?: UserWorkoutCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutUserSetsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramUncheckedCreateNestedManyWithoutOwnerInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutOwnerInput
    userWorkout?: UserWorkoutUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutUserSetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserSetsInput, UserUncheckedCreateWithoutUserSetsInput>
  }

  export type UserWorkoutExerciseCreateWithoutUserSetsInput = {
    id?: string
    workoutExercise: WorkoutExerciseCreateNestedOneWithoutUserWorkoutExercisesInput
    userWorkout: UserWorkoutCreateNestedOneWithoutUserWorkoutExercisesInput
  }

  export type UserWorkoutExerciseUncheckedCreateWithoutUserSetsInput = {
    id?: string
    workoutExerciseId: string
    userWorkoutId: string
  }

  export type UserWorkoutExerciseCreateOrConnectWithoutUserSetsInput = {
    where: UserWorkoutExerciseWhereUniqueInput
    create: XOR<UserWorkoutExerciseCreateWithoutUserSetsInput, UserWorkoutExerciseUncheckedCreateWithoutUserSetsInput>
  }

  export type UserUpsertWithoutUserSetsInput = {
    update: XOR<UserUpdateWithoutUserSetsInput, UserUncheckedUpdateWithoutUserSetsInput>
    create: XOR<UserCreateWithoutUserSetsInput, UserUncheckedCreateWithoutUserSetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserSetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserSetsInput, UserUncheckedUpdateWithoutUserSetsInput>
  }

  export type UserUpdateWithoutUserSetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUpdateManyWithoutOwnerNestedInput
    workouts?: WorkoutUpdateManyWithoutOwnerNestedInput
    userWorkout?: UserWorkoutUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutUserSetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUncheckedUpdateManyWithoutOwnerNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutOwnerNestedInput
    userWorkout?: UserWorkoutUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserWorkoutExerciseUpsertWithoutUserSetsInput = {
    update: XOR<UserWorkoutExerciseUpdateWithoutUserSetsInput, UserWorkoutExerciseUncheckedUpdateWithoutUserSetsInput>
    create: XOR<UserWorkoutExerciseCreateWithoutUserSetsInput, UserWorkoutExerciseUncheckedCreateWithoutUserSetsInput>
    where?: UserWorkoutExerciseWhereInput
  }

  export type UserWorkoutExerciseUpdateToOneWithWhereWithoutUserSetsInput = {
    where?: UserWorkoutExerciseWhereInput
    data: XOR<UserWorkoutExerciseUpdateWithoutUserSetsInput, UserWorkoutExerciseUncheckedUpdateWithoutUserSetsInput>
  }

  export type UserWorkoutExerciseUpdateWithoutUserSetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutExercise?: WorkoutExerciseUpdateOneRequiredWithoutUserWorkoutExercisesNestedInput
    userWorkout?: UserWorkoutUpdateOneRequiredWithoutUserWorkoutExercisesNestedInput
  }

  export type UserWorkoutExerciseUncheckedUpdateWithoutUserSetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutExerciseId?: StringFieldUpdateOperationsInput | string
    userWorkoutId?: StringFieldUpdateOperationsInput | string
  }

  export type ProgramWorkoutCreateWithoutProgramInput = {
    id?: string
    daysOfWeek?: ProgramWorkoutCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: Date | string
    updatedAt?: Date | string
    workout: WorkoutCreateNestedOneWithoutProgramWorkoutsInput
  }

  export type ProgramWorkoutUncheckedCreateWithoutProgramInput = {
    id?: string
    workoutId: string
    daysOfWeek?: ProgramWorkoutCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramWorkoutCreateOrConnectWithoutProgramInput = {
    where: ProgramWorkoutWhereUniqueInput
    create: XOR<ProgramWorkoutCreateWithoutProgramInput, ProgramWorkoutUncheckedCreateWithoutProgramInput>
  }

  export type ProgramWorkoutCreateManyProgramInputEnvelope = {
    data: ProgramWorkoutCreateManyProgramInput | ProgramWorkoutCreateManyProgramInput[]
    skipDuplicates?: boolean
  }

  export type UserWorkoutCreateWithoutProgramInput = {
    id?: string
    dateCompleted?: Date | string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutUserWorkoutInput
    userWorkoutExercises?: UserWorkoutExerciseCreateNestedManyWithoutUserWorkoutInput
    workout?: WorkoutCreateNestedOneWithoutUserWorkoutsInput
  }

  export type UserWorkoutUncheckedCreateWithoutProgramInput = {
    id?: string
    dateCompleted?: Date | string | null
    ownerId: string
    workoutId?: string | null
    createdAt?: Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedCreateNestedManyWithoutUserWorkoutInput
  }

  export type UserWorkoutCreateOrConnectWithoutProgramInput = {
    where: UserWorkoutWhereUniqueInput
    create: XOR<UserWorkoutCreateWithoutProgramInput, UserWorkoutUncheckedCreateWithoutProgramInput>
  }

  export type UserWorkoutCreateManyProgramInputEnvelope = {
    data: UserWorkoutCreateManyProgramInput | UserWorkoutCreateManyProgramInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutProgramsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userSets?: UserSetCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutOwnerInput
    userWorkout?: UserWorkoutCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutProgramsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userSets?: UserSetUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutOwnerInput
    userWorkout?: UserWorkoutUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutProgramsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProgramsInput, UserUncheckedCreateWithoutProgramsInput>
  }

  export type ProgramWorkoutUpsertWithWhereUniqueWithoutProgramInput = {
    where: ProgramWorkoutWhereUniqueInput
    update: XOR<ProgramWorkoutUpdateWithoutProgramInput, ProgramWorkoutUncheckedUpdateWithoutProgramInput>
    create: XOR<ProgramWorkoutCreateWithoutProgramInput, ProgramWorkoutUncheckedCreateWithoutProgramInput>
  }

  export type ProgramWorkoutUpdateWithWhereUniqueWithoutProgramInput = {
    where: ProgramWorkoutWhereUniqueInput
    data: XOR<ProgramWorkoutUpdateWithoutProgramInput, ProgramWorkoutUncheckedUpdateWithoutProgramInput>
  }

  export type ProgramWorkoutUpdateManyWithWhereWithoutProgramInput = {
    where: ProgramWorkoutScalarWhereInput
    data: XOR<ProgramWorkoutUpdateManyMutationInput, ProgramWorkoutUncheckedUpdateManyWithoutProgramInput>
  }

  export type ProgramWorkoutScalarWhereInput = {
    AND?: ProgramWorkoutScalarWhereInput | ProgramWorkoutScalarWhereInput[]
    OR?: ProgramWorkoutScalarWhereInput[]
    NOT?: ProgramWorkoutScalarWhereInput | ProgramWorkoutScalarWhereInput[]
    id?: StringFilter<"ProgramWorkout"> | string
    programId?: StringFilter<"ProgramWorkout"> | string
    workoutId?: StringFilter<"ProgramWorkout"> | string
    daysOfWeek?: EnumDaysOfWeekNullableListFilter<"ProgramWorkout">
    createdAt?: DateTimeFilter<"ProgramWorkout"> | Date | string
    updatedAt?: DateTimeFilter<"ProgramWorkout"> | Date | string
  }

  export type UserWorkoutUpsertWithWhereUniqueWithoutProgramInput = {
    where: UserWorkoutWhereUniqueInput
    update: XOR<UserWorkoutUpdateWithoutProgramInput, UserWorkoutUncheckedUpdateWithoutProgramInput>
    create: XOR<UserWorkoutCreateWithoutProgramInput, UserWorkoutUncheckedCreateWithoutProgramInput>
  }

  export type UserWorkoutUpdateWithWhereUniqueWithoutProgramInput = {
    where: UserWorkoutWhereUniqueInput
    data: XOR<UserWorkoutUpdateWithoutProgramInput, UserWorkoutUncheckedUpdateWithoutProgramInput>
  }

  export type UserWorkoutUpdateManyWithWhereWithoutProgramInput = {
    where: UserWorkoutScalarWhereInput
    data: XOR<UserWorkoutUpdateManyMutationInput, UserWorkoutUncheckedUpdateManyWithoutProgramInput>
  }

  export type UserUpsertWithoutProgramsInput = {
    update: XOR<UserUpdateWithoutProgramsInput, UserUncheckedUpdateWithoutProgramsInput>
    create: XOR<UserCreateWithoutProgramsInput, UserUncheckedCreateWithoutProgramsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProgramsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProgramsInput, UserUncheckedUpdateWithoutProgramsInput>
  }

  export type UserUpdateWithoutProgramsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSets?: UserSetUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutOwnerNestedInput
    userWorkout?: UserWorkoutUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutProgramsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSets?: UserSetUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutOwnerNestedInput
    userWorkout?: UserWorkoutUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type ProgramCreateWithoutProgramWorkoutsInput = {
    id?: string
    name: string
    notes?: string | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userWorkout?: UserWorkoutCreateNestedManyWithoutProgramInput
    owner: UserCreateNestedOneWithoutProgramsInput
  }

  export type ProgramUncheckedCreateWithoutProgramWorkoutsInput = {
    id?: string
    name: string
    notes?: string | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userWorkout?: UserWorkoutUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutProgramWorkoutsInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutProgramWorkoutsInput, ProgramUncheckedCreateWithoutProgramWorkoutsInput>
  }

  export type WorkoutCreateWithoutProgramWorkoutsInput = {
    id?: string
    name?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutWorkoutsInput
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutWorkoutInput
    userWorkouts?: UserWorkoutCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutUncheckedCreateWithoutProgramWorkoutsInput = {
    id?: string
    name?: string | null
    notes?: string | null
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutInput
    userWorkouts?: UserWorkoutUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutCreateOrConnectWithoutProgramWorkoutsInput = {
    where: WorkoutWhereUniqueInput
    create: XOR<WorkoutCreateWithoutProgramWorkoutsInput, WorkoutUncheckedCreateWithoutProgramWorkoutsInput>
  }

  export type ProgramUpsertWithoutProgramWorkoutsInput = {
    update: XOR<ProgramUpdateWithoutProgramWorkoutsInput, ProgramUncheckedUpdateWithoutProgramWorkoutsInput>
    create: XOR<ProgramCreateWithoutProgramWorkoutsInput, ProgramUncheckedCreateWithoutProgramWorkoutsInput>
    where?: ProgramWhereInput
  }

  export type ProgramUpdateToOneWithWhereWithoutProgramWorkoutsInput = {
    where?: ProgramWhereInput
    data: XOR<ProgramUpdateWithoutProgramWorkoutsInput, ProgramUncheckedUpdateWithoutProgramWorkoutsInput>
  }

  export type ProgramUpdateWithoutProgramWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkout?: UserWorkoutUpdateManyWithoutProgramNestedInput
    owner?: UserUpdateOneRequiredWithoutProgramsNestedInput
  }

  export type ProgramUncheckedUpdateWithoutProgramWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkout?: UserWorkoutUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type WorkoutUpsertWithoutProgramWorkoutsInput = {
    update: XOR<WorkoutUpdateWithoutProgramWorkoutsInput, WorkoutUncheckedUpdateWithoutProgramWorkoutsInput>
    create: XOR<WorkoutCreateWithoutProgramWorkoutsInput, WorkoutUncheckedCreateWithoutProgramWorkoutsInput>
    where?: WorkoutWhereInput
  }

  export type WorkoutUpdateToOneWithWhereWithoutProgramWorkoutsInput = {
    where?: WorkoutWhereInput
    data: XOR<WorkoutUpdateWithoutProgramWorkoutsInput, WorkoutUncheckedUpdateWithoutProgramWorkoutsInput>
  }

  export type WorkoutUpdateWithoutProgramWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutWorkoutsNestedInput
    workoutExercises?: WorkoutExerciseUpdateManyWithoutWorkoutNestedInput
    userWorkouts?: UserWorkoutUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutUncheckedUpdateWithoutProgramWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutWorkoutNestedInput
    userWorkouts?: UserWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput
  }

  export type UserCreateWithoutWorkoutsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramCreateNestedManyWithoutOwnerInput
    userSets?: UserSetCreateNestedManyWithoutUserInput
    userWorkout?: UserWorkoutCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutWorkoutsInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramUncheckedCreateNestedManyWithoutOwnerInput
    userSets?: UserSetUncheckedCreateNestedManyWithoutUserInput
    userWorkout?: UserWorkoutUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutWorkoutsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>
  }

  export type WorkoutExerciseCreateWithoutWorkoutInput = {
    id?: string
    order?: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    coreSet?: CoreSetCreateNestedOneWithoutWorkoutExerciseInput
    coreCardioSet?: CoreCardioSetCreateNestedOneWithoutWorkoutExerciseInput
    exercise: ExerciseCreateNestedOneWithoutWorkoutExercisesInput
    userWorkoutExercises?: UserWorkoutExerciseCreateNestedManyWithoutWorkoutExerciseInput
  }

  export type WorkoutExerciseUncheckedCreateWithoutWorkoutInput = {
    id?: string
    order?: number
    notes?: string | null
    coreSetId?: string | null
    coreCardioSetId?: string | null
    exerciseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutExerciseInput
  }

  export type WorkoutExerciseCreateOrConnectWithoutWorkoutInput = {
    where: WorkoutExerciseWhereUniqueInput
    create: XOR<WorkoutExerciseCreateWithoutWorkoutInput, WorkoutExerciseUncheckedCreateWithoutWorkoutInput>
  }

  export type WorkoutExerciseCreateManyWorkoutInputEnvelope = {
    data: WorkoutExerciseCreateManyWorkoutInput | WorkoutExerciseCreateManyWorkoutInput[]
    skipDuplicates?: boolean
  }

  export type ProgramWorkoutCreateWithoutWorkoutInput = {
    id?: string
    daysOfWeek?: ProgramWorkoutCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: Date | string
    updatedAt?: Date | string
    program: ProgramCreateNestedOneWithoutProgramWorkoutsInput
  }

  export type ProgramWorkoutUncheckedCreateWithoutWorkoutInput = {
    id?: string
    programId: string
    daysOfWeek?: ProgramWorkoutCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramWorkoutCreateOrConnectWithoutWorkoutInput = {
    where: ProgramWorkoutWhereUniqueInput
    create: XOR<ProgramWorkoutCreateWithoutWorkoutInput, ProgramWorkoutUncheckedCreateWithoutWorkoutInput>
  }

  export type ProgramWorkoutCreateManyWorkoutInputEnvelope = {
    data: ProgramWorkoutCreateManyWorkoutInput | ProgramWorkoutCreateManyWorkoutInput[]
    skipDuplicates?: boolean
  }

  export type UserWorkoutCreateWithoutWorkoutInput = {
    id?: string
    dateCompleted?: Date | string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutUserWorkoutInput
    userWorkoutExercises?: UserWorkoutExerciseCreateNestedManyWithoutUserWorkoutInput
    program?: ProgramCreateNestedOneWithoutUserWorkoutInput
  }

  export type UserWorkoutUncheckedCreateWithoutWorkoutInput = {
    id?: string
    dateCompleted?: Date | string | null
    ownerId: string
    programId?: string | null
    createdAt?: Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedCreateNestedManyWithoutUserWorkoutInput
  }

  export type UserWorkoutCreateOrConnectWithoutWorkoutInput = {
    where: UserWorkoutWhereUniqueInput
    create: XOR<UserWorkoutCreateWithoutWorkoutInput, UserWorkoutUncheckedCreateWithoutWorkoutInput>
  }

  export type UserWorkoutCreateManyWorkoutInputEnvelope = {
    data: UserWorkoutCreateManyWorkoutInput | UserWorkoutCreateManyWorkoutInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWorkoutsInput = {
    update: XOR<UserUpdateWithoutWorkoutsInput, UserUncheckedUpdateWithoutWorkoutsInput>
    create: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkoutsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkoutsInput, UserUncheckedUpdateWithoutWorkoutsInput>
  }

  export type UserUpdateWithoutWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUpdateManyWithoutOwnerNestedInput
    userSets?: UserSetUpdateManyWithoutUserNestedInput
    userWorkout?: UserWorkoutUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUncheckedUpdateManyWithoutOwnerNestedInput
    userSets?: UserSetUncheckedUpdateManyWithoutUserNestedInput
    userWorkout?: UserWorkoutUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type WorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutInput = {
    where: WorkoutExerciseWhereUniqueInput
    update: XOR<WorkoutExerciseUpdateWithoutWorkoutInput, WorkoutExerciseUncheckedUpdateWithoutWorkoutInput>
    create: XOR<WorkoutExerciseCreateWithoutWorkoutInput, WorkoutExerciseUncheckedCreateWithoutWorkoutInput>
  }

  export type WorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutInput = {
    where: WorkoutExerciseWhereUniqueInput
    data: XOR<WorkoutExerciseUpdateWithoutWorkoutInput, WorkoutExerciseUncheckedUpdateWithoutWorkoutInput>
  }

  export type WorkoutExerciseUpdateManyWithWhereWithoutWorkoutInput = {
    where: WorkoutExerciseScalarWhereInput
    data: XOR<WorkoutExerciseUpdateManyMutationInput, WorkoutExerciseUncheckedUpdateManyWithoutWorkoutInput>
  }

  export type ProgramWorkoutUpsertWithWhereUniqueWithoutWorkoutInput = {
    where: ProgramWorkoutWhereUniqueInput
    update: XOR<ProgramWorkoutUpdateWithoutWorkoutInput, ProgramWorkoutUncheckedUpdateWithoutWorkoutInput>
    create: XOR<ProgramWorkoutCreateWithoutWorkoutInput, ProgramWorkoutUncheckedCreateWithoutWorkoutInput>
  }

  export type ProgramWorkoutUpdateWithWhereUniqueWithoutWorkoutInput = {
    where: ProgramWorkoutWhereUniqueInput
    data: XOR<ProgramWorkoutUpdateWithoutWorkoutInput, ProgramWorkoutUncheckedUpdateWithoutWorkoutInput>
  }

  export type ProgramWorkoutUpdateManyWithWhereWithoutWorkoutInput = {
    where: ProgramWorkoutScalarWhereInput
    data: XOR<ProgramWorkoutUpdateManyMutationInput, ProgramWorkoutUncheckedUpdateManyWithoutWorkoutInput>
  }

  export type UserWorkoutUpsertWithWhereUniqueWithoutWorkoutInput = {
    where: UserWorkoutWhereUniqueInput
    update: XOR<UserWorkoutUpdateWithoutWorkoutInput, UserWorkoutUncheckedUpdateWithoutWorkoutInput>
    create: XOR<UserWorkoutCreateWithoutWorkoutInput, UserWorkoutUncheckedCreateWithoutWorkoutInput>
  }

  export type UserWorkoutUpdateWithWhereUniqueWithoutWorkoutInput = {
    where: UserWorkoutWhereUniqueInput
    data: XOR<UserWorkoutUpdateWithoutWorkoutInput, UserWorkoutUncheckedUpdateWithoutWorkoutInput>
  }

  export type UserWorkoutUpdateManyWithWhereWithoutWorkoutInput = {
    where: UserWorkoutScalarWhereInput
    data: XOR<UserWorkoutUpdateManyMutationInput, UserWorkoutUncheckedUpdateManyWithoutWorkoutInput>
  }

  export type CoreSetCreateWithoutWorkoutExerciseInput = {
    id?: string
    restTime?: number
    numberOfSets?: number
    hasWarmup?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reps?: CoreSetRepsCreateNestedManyWithoutCoreSetInput
    weight?: CoreSetWeightCreateNestedManyWithoutCoreSetInput
  }

  export type CoreSetUncheckedCreateWithoutWorkoutExerciseInput = {
    id?: string
    restTime?: number
    numberOfSets?: number
    hasWarmup?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reps?: CoreSetRepsUncheckedCreateNestedManyWithoutCoreSetInput
    weight?: CoreSetWeightUncheckedCreateNestedManyWithoutCoreSetInput
  }

  export type CoreSetCreateOrConnectWithoutWorkoutExerciseInput = {
    where: CoreSetWhereUniqueInput
    create: XOR<CoreSetCreateWithoutWorkoutExerciseInput, CoreSetUncheckedCreateWithoutWorkoutExerciseInput>
  }

  export type CoreCardioSetCreateWithoutWorkoutExerciseInput = {
    id?: string
    warmupTime?: number | null
    avgHeartRate?: number | null
    avgSpeed?: number | null
    distance?: number | null
    calorieTarget?: number | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreCardioSetUncheckedCreateWithoutWorkoutExerciseInput = {
    id?: string
    warmupTime?: number | null
    avgHeartRate?: number | null
    avgSpeed?: number | null
    distance?: number | null
    calorieTarget?: number | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreCardioSetCreateOrConnectWithoutWorkoutExerciseInput = {
    where: CoreCardioSetWhereUniqueInput
    create: XOR<CoreCardioSetCreateWithoutWorkoutExerciseInput, CoreCardioSetUncheckedCreateWithoutWorkoutExerciseInput>
  }

  export type ExerciseCreateWithoutWorkoutExercisesInput = {
    id?: string
    name: string
    youtubeUrl: string
    type?: $Enums.ExerciseType
    notes?: string | null
    equipment?: ExerciseCreateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseCreatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseUncheckedCreateWithoutWorkoutExercisesInput = {
    id?: string
    name: string
    youtubeUrl: string
    type?: $Enums.ExerciseType
    notes?: string | null
    equipment?: ExerciseCreateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseCreatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseCreateOrConnectWithoutWorkoutExercisesInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutWorkoutExercisesInput, ExerciseUncheckedCreateWithoutWorkoutExercisesInput>
  }

  export type WorkoutCreateWithoutWorkoutExercisesInput = {
    id?: string
    name?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutWorkoutsInput
    programWorkouts?: ProgramWorkoutCreateNestedManyWithoutWorkoutInput
    userWorkouts?: UserWorkoutCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutUncheckedCreateWithoutWorkoutExercisesInput = {
    id?: string
    name?: string | null
    notes?: string | null
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    programWorkouts?: ProgramWorkoutUncheckedCreateNestedManyWithoutWorkoutInput
    userWorkouts?: UserWorkoutUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutCreateOrConnectWithoutWorkoutExercisesInput = {
    where: WorkoutWhereUniqueInput
    create: XOR<WorkoutCreateWithoutWorkoutExercisesInput, WorkoutUncheckedCreateWithoutWorkoutExercisesInput>
  }

  export type UserWorkoutExerciseCreateWithoutWorkoutExerciseInput = {
    id?: string
    userWorkout: UserWorkoutCreateNestedOneWithoutUserWorkoutExercisesInput
    userSets?: UserSetCreateNestedManyWithoutUserWorkoutExerciseInput
  }

  export type UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput = {
    id?: string
    userWorkoutId: string
    userSets?: UserSetUncheckedCreateNestedManyWithoutUserWorkoutExerciseInput
  }

  export type UserWorkoutExerciseCreateOrConnectWithoutWorkoutExerciseInput = {
    where: UserWorkoutExerciseWhereUniqueInput
    create: XOR<UserWorkoutExerciseCreateWithoutWorkoutExerciseInput, UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput>
  }

  export type UserWorkoutExerciseCreateManyWorkoutExerciseInputEnvelope = {
    data: UserWorkoutExerciseCreateManyWorkoutExerciseInput | UserWorkoutExerciseCreateManyWorkoutExerciseInput[]
    skipDuplicates?: boolean
  }

  export type CoreSetUpsertWithoutWorkoutExerciseInput = {
    update: XOR<CoreSetUpdateWithoutWorkoutExerciseInput, CoreSetUncheckedUpdateWithoutWorkoutExerciseInput>
    create: XOR<CoreSetCreateWithoutWorkoutExerciseInput, CoreSetUncheckedCreateWithoutWorkoutExerciseInput>
    where?: CoreSetWhereInput
  }

  export type CoreSetUpdateToOneWithWhereWithoutWorkoutExerciseInput = {
    where?: CoreSetWhereInput
    data: XOR<CoreSetUpdateWithoutWorkoutExerciseInput, CoreSetUncheckedUpdateWithoutWorkoutExerciseInput>
  }

  export type CoreSetUpdateWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    restTime?: IntFieldUpdateOperationsInput | number
    numberOfSets?: IntFieldUpdateOperationsInput | number
    hasWarmup?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reps?: CoreSetRepsUpdateManyWithoutCoreSetNestedInput
    weight?: CoreSetWeightUpdateManyWithoutCoreSetNestedInput
  }

  export type CoreSetUncheckedUpdateWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    restTime?: IntFieldUpdateOperationsInput | number
    numberOfSets?: IntFieldUpdateOperationsInput | number
    hasWarmup?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reps?: CoreSetRepsUncheckedUpdateManyWithoutCoreSetNestedInput
    weight?: CoreSetWeightUncheckedUpdateManyWithoutCoreSetNestedInput
  }

  export type CoreCardioSetUpsertWithoutWorkoutExerciseInput = {
    update: XOR<CoreCardioSetUpdateWithoutWorkoutExerciseInput, CoreCardioSetUncheckedUpdateWithoutWorkoutExerciseInput>
    create: XOR<CoreCardioSetCreateWithoutWorkoutExerciseInput, CoreCardioSetUncheckedCreateWithoutWorkoutExerciseInput>
    where?: CoreCardioSetWhereInput
  }

  export type CoreCardioSetUpdateToOneWithWhereWithoutWorkoutExerciseInput = {
    where?: CoreCardioSetWhereInput
    data: XOR<CoreCardioSetUpdateWithoutWorkoutExerciseInput, CoreCardioSetUncheckedUpdateWithoutWorkoutExerciseInput>
  }

  export type CoreCardioSetUpdateWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    warmupTime?: NullableIntFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableIntFieldUpdateOperationsInput | number | null
    avgSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    calorieTarget?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreCardioSetUncheckedUpdateWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    warmupTime?: NullableIntFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableIntFieldUpdateOperationsInput | number | null
    avgSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    calorieTarget?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseUpsertWithoutWorkoutExercisesInput = {
    update: XOR<ExerciseUpdateWithoutWorkoutExercisesInput, ExerciseUncheckedUpdateWithoutWorkoutExercisesInput>
    create: XOR<ExerciseCreateWithoutWorkoutExercisesInput, ExerciseUncheckedCreateWithoutWorkoutExercisesInput>
    where?: ExerciseWhereInput
  }

  export type ExerciseUpdateToOneWithWhereWithoutWorkoutExercisesInput = {
    where?: ExerciseWhereInput
    data: XOR<ExerciseUpdateWithoutWorkoutExercisesInput, ExerciseUncheckedUpdateWithoutWorkoutExercisesInput>
  }

  export type ExerciseUpdateWithoutWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    youtubeUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: ExerciseUpdateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseUpdatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseUncheckedUpdateWithoutWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    youtubeUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: ExerciseUpdateequipmentInput | $Enums.ExerciseEquipment[]
    muscles?: ExerciseUpdatemusclesInput | $Enums.ExerciseMuscle[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutUpsertWithoutWorkoutExercisesInput = {
    update: XOR<WorkoutUpdateWithoutWorkoutExercisesInput, WorkoutUncheckedUpdateWithoutWorkoutExercisesInput>
    create: XOR<WorkoutCreateWithoutWorkoutExercisesInput, WorkoutUncheckedCreateWithoutWorkoutExercisesInput>
    where?: WorkoutWhereInput
  }

  export type WorkoutUpdateToOneWithWhereWithoutWorkoutExercisesInput = {
    where?: WorkoutWhereInput
    data: XOR<WorkoutUpdateWithoutWorkoutExercisesInput, WorkoutUncheckedUpdateWithoutWorkoutExercisesInput>
  }

  export type WorkoutUpdateWithoutWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutWorkoutsNestedInput
    programWorkouts?: ProgramWorkoutUpdateManyWithoutWorkoutNestedInput
    userWorkouts?: UserWorkoutUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutUncheckedUpdateWithoutWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programWorkouts?: ProgramWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput
    userWorkouts?: UserWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput
  }

  export type UserWorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutExerciseInput = {
    where: UserWorkoutExerciseWhereUniqueInput
    update: XOR<UserWorkoutExerciseUpdateWithoutWorkoutExerciseInput, UserWorkoutExerciseUncheckedUpdateWithoutWorkoutExerciseInput>
    create: XOR<UserWorkoutExerciseCreateWithoutWorkoutExerciseInput, UserWorkoutExerciseUncheckedCreateWithoutWorkoutExerciseInput>
  }

  export type UserWorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutExerciseInput = {
    where: UserWorkoutExerciseWhereUniqueInput
    data: XOR<UserWorkoutExerciseUpdateWithoutWorkoutExerciseInput, UserWorkoutExerciseUncheckedUpdateWithoutWorkoutExerciseInput>
  }

  export type UserWorkoutExerciseUpdateManyWithWhereWithoutWorkoutExerciseInput = {
    where: UserWorkoutExerciseScalarWhereInput
    data: XOR<UserWorkoutExerciseUpdateManyMutationInput, UserWorkoutExerciseUncheckedUpdateManyWithoutWorkoutExerciseInput>
  }

  export type UserWorkoutExerciseScalarWhereInput = {
    AND?: UserWorkoutExerciseScalarWhereInput | UserWorkoutExerciseScalarWhereInput[]
    OR?: UserWorkoutExerciseScalarWhereInput[]
    NOT?: UserWorkoutExerciseScalarWhereInput | UserWorkoutExerciseScalarWhereInput[]
    id?: StringFilter<"UserWorkoutExercise"> | string
    workoutExerciseId?: StringFilter<"UserWorkoutExercise"> | string
    userWorkoutId?: StringFilter<"UserWorkoutExercise"> | string
  }

  export type WorkoutExerciseCreateWithoutUserWorkoutExercisesInput = {
    id?: string
    order?: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    coreSet?: CoreSetCreateNestedOneWithoutWorkoutExerciseInput
    coreCardioSet?: CoreCardioSetCreateNestedOneWithoutWorkoutExerciseInput
    exercise: ExerciseCreateNestedOneWithoutWorkoutExercisesInput
    workout: WorkoutCreateNestedOneWithoutWorkoutExercisesInput
  }

  export type WorkoutExerciseUncheckedCreateWithoutUserWorkoutExercisesInput = {
    id?: string
    order?: number
    notes?: string | null
    coreSetId?: string | null
    coreCardioSetId?: string | null
    exerciseId: string
    workoutId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutExerciseCreateOrConnectWithoutUserWorkoutExercisesInput = {
    where: WorkoutExerciseWhereUniqueInput
    create: XOR<WorkoutExerciseCreateWithoutUserWorkoutExercisesInput, WorkoutExerciseUncheckedCreateWithoutUserWorkoutExercisesInput>
  }

  export type UserWorkoutCreateWithoutUserWorkoutExercisesInput = {
    id?: string
    dateCompleted?: Date | string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutUserWorkoutInput
    program?: ProgramCreateNestedOneWithoutUserWorkoutInput
    workout?: WorkoutCreateNestedOneWithoutUserWorkoutsInput
  }

  export type UserWorkoutUncheckedCreateWithoutUserWorkoutExercisesInput = {
    id?: string
    dateCompleted?: Date | string | null
    ownerId: string
    programId?: string | null
    workoutId?: string | null
    createdAt?: Date | string
  }

  export type UserWorkoutCreateOrConnectWithoutUserWorkoutExercisesInput = {
    where: UserWorkoutWhereUniqueInput
    create: XOR<UserWorkoutCreateWithoutUserWorkoutExercisesInput, UserWorkoutUncheckedCreateWithoutUserWorkoutExercisesInput>
  }

  export type UserSetCreateWithoutUserWorkoutExerciseInput = {
    id?: string
    reps?: number
    weight?: number | null
    isBodyWeight?: boolean
    restTime?: number
    order?: number
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserSetsInput
  }

  export type UserSetUncheckedCreateWithoutUserWorkoutExerciseInput = {
    id?: string
    reps?: number
    weight?: number | null
    isBodyWeight?: boolean
    restTime?: number
    order?: number
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSetCreateOrConnectWithoutUserWorkoutExerciseInput = {
    where: UserSetWhereUniqueInput
    create: XOR<UserSetCreateWithoutUserWorkoutExerciseInput, UserSetUncheckedCreateWithoutUserWorkoutExerciseInput>
  }

  export type UserSetCreateManyUserWorkoutExerciseInputEnvelope = {
    data: UserSetCreateManyUserWorkoutExerciseInput | UserSetCreateManyUserWorkoutExerciseInput[]
    skipDuplicates?: boolean
  }

  export type WorkoutExerciseUpsertWithoutUserWorkoutExercisesInput = {
    update: XOR<WorkoutExerciseUpdateWithoutUserWorkoutExercisesInput, WorkoutExerciseUncheckedUpdateWithoutUserWorkoutExercisesInput>
    create: XOR<WorkoutExerciseCreateWithoutUserWorkoutExercisesInput, WorkoutExerciseUncheckedCreateWithoutUserWorkoutExercisesInput>
    where?: WorkoutExerciseWhereInput
  }

  export type WorkoutExerciseUpdateToOneWithWhereWithoutUserWorkoutExercisesInput = {
    where?: WorkoutExerciseWhereInput
    data: XOR<WorkoutExerciseUpdateWithoutUserWorkoutExercisesInput, WorkoutExerciseUncheckedUpdateWithoutUserWorkoutExercisesInput>
  }

  export type WorkoutExerciseUpdateWithoutUserWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coreSet?: CoreSetUpdateOneWithoutWorkoutExerciseNestedInput
    coreCardioSet?: CoreCardioSetUpdateOneWithoutWorkoutExerciseNestedInput
    exercise?: ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput
    workout?: WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput
  }

  export type WorkoutExerciseUncheckedUpdateWithoutUserWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreSetId?: NullableStringFieldUpdateOperationsInput | string | null
    coreCardioSetId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseId?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWorkoutUpsertWithoutUserWorkoutExercisesInput = {
    update: XOR<UserWorkoutUpdateWithoutUserWorkoutExercisesInput, UserWorkoutUncheckedUpdateWithoutUserWorkoutExercisesInput>
    create: XOR<UserWorkoutCreateWithoutUserWorkoutExercisesInput, UserWorkoutUncheckedCreateWithoutUserWorkoutExercisesInput>
    where?: UserWorkoutWhereInput
  }

  export type UserWorkoutUpdateToOneWithWhereWithoutUserWorkoutExercisesInput = {
    where?: UserWorkoutWhereInput
    data: XOR<UserWorkoutUpdateWithoutUserWorkoutExercisesInput, UserWorkoutUncheckedUpdateWithoutUserWorkoutExercisesInput>
  }

  export type UserWorkoutUpdateWithoutUserWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutUserWorkoutNestedInput
    program?: ProgramUpdateOneWithoutUserWorkoutNestedInput
    workout?: WorkoutUpdateOneWithoutUserWorkoutsNestedInput
  }

  export type UserWorkoutUncheckedUpdateWithoutUserWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    workoutId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSetUpsertWithWhereUniqueWithoutUserWorkoutExerciseInput = {
    where: UserSetWhereUniqueInput
    update: XOR<UserSetUpdateWithoutUserWorkoutExerciseInput, UserSetUncheckedUpdateWithoutUserWorkoutExerciseInput>
    create: XOR<UserSetCreateWithoutUserWorkoutExerciseInput, UserSetUncheckedCreateWithoutUserWorkoutExerciseInput>
  }

  export type UserSetUpdateWithWhereUniqueWithoutUserWorkoutExerciseInput = {
    where: UserSetWhereUniqueInput
    data: XOR<UserSetUpdateWithoutUserWorkoutExerciseInput, UserSetUncheckedUpdateWithoutUserWorkoutExerciseInput>
  }

  export type UserSetUpdateManyWithWhereWithoutUserWorkoutExerciseInput = {
    where: UserSetScalarWhereInput
    data: XOR<UserSetUpdateManyMutationInput, UserSetUncheckedUpdateManyWithoutUserWorkoutExerciseInput>
  }

  export type UserCreateWithoutUserWorkoutInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramCreateNestedManyWithoutOwnerInput
    userSets?: UserSetCreateNestedManyWithoutUserInput
    workouts?: WorkoutCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutUserWorkoutInput = {
    id?: string
    email: string
    passwordHash?: string | null
    googleId?: string | null
    firstName?: string | null
    lastName?: string | null
    imgUrl?: string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramUncheckedCreateNestedManyWithoutOwnerInput
    userSets?: UserSetUncheckedCreateNestedManyWithoutUserInput
    workouts?: WorkoutUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutUserWorkoutInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserWorkoutInput, UserUncheckedCreateWithoutUserWorkoutInput>
  }

  export type UserWorkoutExerciseCreateWithoutUserWorkoutInput = {
    id?: string
    workoutExercise: WorkoutExerciseCreateNestedOneWithoutUserWorkoutExercisesInput
    userSets?: UserSetCreateNestedManyWithoutUserWorkoutExerciseInput
  }

  export type UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput = {
    id?: string
    workoutExerciseId: string
    userSets?: UserSetUncheckedCreateNestedManyWithoutUserWorkoutExerciseInput
  }

  export type UserWorkoutExerciseCreateOrConnectWithoutUserWorkoutInput = {
    where: UserWorkoutExerciseWhereUniqueInput
    create: XOR<UserWorkoutExerciseCreateWithoutUserWorkoutInput, UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput>
  }

  export type UserWorkoutExerciseCreateManyUserWorkoutInputEnvelope = {
    data: UserWorkoutExerciseCreateManyUserWorkoutInput | UserWorkoutExerciseCreateManyUserWorkoutInput[]
    skipDuplicates?: boolean
  }

  export type ProgramCreateWithoutUserWorkoutInput = {
    id?: string
    name: string
    notes?: string | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    programWorkouts?: ProgramWorkoutCreateNestedManyWithoutProgramInput
    owner: UserCreateNestedOneWithoutProgramsInput
  }

  export type ProgramUncheckedCreateWithoutUserWorkoutInput = {
    id?: string
    name: string
    notes?: string | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    programWorkouts?: ProgramWorkoutUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutUserWorkoutInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutUserWorkoutInput, ProgramUncheckedCreateWithoutUserWorkoutInput>
  }

  export type WorkoutCreateWithoutUserWorkoutsInput = {
    id?: string
    name?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutWorkoutsInput
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutWorkoutInput
    programWorkouts?: ProgramWorkoutCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutUncheckedCreateWithoutUserWorkoutsInput = {
    id?: string
    name?: string | null
    notes?: string | null
    ownerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutInput
    programWorkouts?: ProgramWorkoutUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type WorkoutCreateOrConnectWithoutUserWorkoutsInput = {
    where: WorkoutWhereUniqueInput
    create: XOR<WorkoutCreateWithoutUserWorkoutsInput, WorkoutUncheckedCreateWithoutUserWorkoutsInput>
  }

  export type UserUpsertWithoutUserWorkoutInput = {
    update: XOR<UserUpdateWithoutUserWorkoutInput, UserUncheckedUpdateWithoutUserWorkoutInput>
    create: XOR<UserCreateWithoutUserWorkoutInput, UserUncheckedCreateWithoutUserWorkoutInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserWorkoutInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserWorkoutInput, UserUncheckedUpdateWithoutUserWorkoutInput>
  }

  export type UserUpdateWithoutUserWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUpdateManyWithoutOwnerNestedInput
    userSets?: UserSetUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutUserWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUncheckedUpdateManyWithoutOwnerNestedInput
    userSets?: UserSetUncheckedUpdateManyWithoutUserNestedInput
    workouts?: WorkoutUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserWorkoutExerciseUpsertWithWhereUniqueWithoutUserWorkoutInput = {
    where: UserWorkoutExerciseWhereUniqueInput
    update: XOR<UserWorkoutExerciseUpdateWithoutUserWorkoutInput, UserWorkoutExerciseUncheckedUpdateWithoutUserWorkoutInput>
    create: XOR<UserWorkoutExerciseCreateWithoutUserWorkoutInput, UserWorkoutExerciseUncheckedCreateWithoutUserWorkoutInput>
  }

  export type UserWorkoutExerciseUpdateWithWhereUniqueWithoutUserWorkoutInput = {
    where: UserWorkoutExerciseWhereUniqueInput
    data: XOR<UserWorkoutExerciseUpdateWithoutUserWorkoutInput, UserWorkoutExerciseUncheckedUpdateWithoutUserWorkoutInput>
  }

  export type UserWorkoutExerciseUpdateManyWithWhereWithoutUserWorkoutInput = {
    where: UserWorkoutExerciseScalarWhereInput
    data: XOR<UserWorkoutExerciseUpdateManyMutationInput, UserWorkoutExerciseUncheckedUpdateManyWithoutUserWorkoutInput>
  }

  export type ProgramUpsertWithoutUserWorkoutInput = {
    update: XOR<ProgramUpdateWithoutUserWorkoutInput, ProgramUncheckedUpdateWithoutUserWorkoutInput>
    create: XOR<ProgramCreateWithoutUserWorkoutInput, ProgramUncheckedCreateWithoutUserWorkoutInput>
    where?: ProgramWhereInput
  }

  export type ProgramUpdateToOneWithWhereWithoutUserWorkoutInput = {
    where?: ProgramWhereInput
    data: XOR<ProgramUpdateWithoutUserWorkoutInput, ProgramUncheckedUpdateWithoutUserWorkoutInput>
  }

  export type ProgramUpdateWithoutUserWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programWorkouts?: ProgramWorkoutUpdateManyWithoutProgramNestedInput
    owner?: UserUpdateOneRequiredWithoutProgramsNestedInput
  }

  export type ProgramUncheckedUpdateWithoutUserWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programWorkouts?: ProgramWorkoutUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type WorkoutUpsertWithoutUserWorkoutsInput = {
    update: XOR<WorkoutUpdateWithoutUserWorkoutsInput, WorkoutUncheckedUpdateWithoutUserWorkoutsInput>
    create: XOR<WorkoutCreateWithoutUserWorkoutsInput, WorkoutUncheckedCreateWithoutUserWorkoutsInput>
    where?: WorkoutWhereInput
  }

  export type WorkoutUpdateToOneWithWhereWithoutUserWorkoutsInput = {
    where?: WorkoutWhereInput
    data: XOR<WorkoutUpdateWithoutUserWorkoutsInput, WorkoutUncheckedUpdateWithoutUserWorkoutsInput>
  }

  export type WorkoutUpdateWithoutUserWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutWorkoutsNestedInput
    workoutExercises?: WorkoutExerciseUpdateManyWithoutWorkoutNestedInput
    programWorkouts?: ProgramWorkoutUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutUncheckedUpdateWithoutUserWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutWorkoutNestedInput
    programWorkouts?: ProgramWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput
  }

  export type ProgramCreateManyOwnerInput = {
    id?: string
    name: string
    notes?: string | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSetCreateManyUserInput = {
    id?: string
    reps?: number
    weight?: number | null
    isBodyWeight?: boolean
    restTime?: number
    order?: number
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    userWorkoutExerciseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutCreateManyOwnerInput = {
    id?: string
    name?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserWorkoutCreateManyOwnerInput = {
    id?: string
    dateCompleted?: Date | string | null
    programId?: string | null
    workoutId?: string | null
    createdAt?: Date | string
  }

  export type ProgramUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programWorkouts?: ProgramWorkoutUpdateManyWithoutProgramNestedInput
    userWorkout?: UserWorkoutUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programWorkouts?: ProgramWorkoutUncheckedUpdateManyWithoutProgramNestedInput
    userWorkout?: UserWorkoutUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    restTime?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isWarmup?: BoolFieldUpdateOperationsInput | boolean
    isMuscleFailure?: BoolFieldUpdateOperationsInput | boolean
    isJointPain?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercise?: UserWorkoutExerciseUpdateOneRequiredWithoutUserSetsNestedInput
  }

  export type UserSetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    restTime?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isWarmup?: BoolFieldUpdateOperationsInput | boolean
    isMuscleFailure?: BoolFieldUpdateOperationsInput | boolean
    isJointPain?: BoolFieldUpdateOperationsInput | boolean
    userWorkoutExerciseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    restTime?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isWarmup?: BoolFieldUpdateOperationsInput | boolean
    isMuscleFailure?: BoolFieldUpdateOperationsInput | boolean
    isJointPain?: BoolFieldUpdateOperationsInput | boolean
    userWorkoutExerciseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercises?: WorkoutExerciseUpdateManyWithoutWorkoutNestedInput
    programWorkouts?: ProgramWorkoutUpdateManyWithoutWorkoutNestedInput
    userWorkouts?: UserWorkoutUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutWorkoutNestedInput
    programWorkouts?: ProgramWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput
    userWorkouts?: UserWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput
  }

  export type WorkoutUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWorkoutUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercises?: UserWorkoutExerciseUpdateManyWithoutUserWorkoutNestedInput
    program?: ProgramUpdateOneWithoutUserWorkoutNestedInput
    workout?: WorkoutUpdateOneWithoutUserWorkoutsNestedInput
  }

  export type UserWorkoutUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    workoutId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedUpdateManyWithoutUserWorkoutNestedInput
  }

  export type UserWorkoutUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    workoutId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutExerciseCreateManyExerciseInput = {
    id?: string
    order?: number
    notes?: string | null
    coreSetId?: string | null
    coreCardioSetId?: string | null
    workoutId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutExerciseUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coreSet?: CoreSetUpdateOneWithoutWorkoutExerciseNestedInput
    coreCardioSet?: CoreCardioSetUpdateOneWithoutWorkoutExerciseNestedInput
    workout?: WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput
    userWorkoutExercises?: UserWorkoutExerciseUpdateManyWithoutWorkoutExerciseNestedInput
  }

  export type WorkoutExerciseUncheckedUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreSetId?: NullableStringFieldUpdateOperationsInput | string | null
    coreCardioSetId?: NullableStringFieldUpdateOperationsInput | string | null
    workoutId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedUpdateManyWithoutWorkoutExerciseNestedInput
  }

  export type WorkoutExerciseUncheckedUpdateManyWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreSetId?: NullableStringFieldUpdateOperationsInput | string | null
    coreCardioSetId?: NullableStringFieldUpdateOperationsInput | string | null
    workoutId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutExerciseCreateManyCoreSetInput = {
    id?: string
    order?: number
    notes?: string | null
    coreCardioSetId?: string | null
    exerciseId: string
    workoutId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetRepsCreateManyCoreSetInput = {
    id?: string
    reps?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoreSetWeightCreateManyCoreSetInput = {
    id?: string
    isBodyWeight?: boolean
    weight?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutExerciseUpdateWithoutCoreSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coreCardioSet?: CoreCardioSetUpdateOneWithoutWorkoutExerciseNestedInput
    exercise?: ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput
    workout?: WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput
    userWorkoutExercises?: UserWorkoutExerciseUpdateManyWithoutWorkoutExerciseNestedInput
  }

  export type WorkoutExerciseUncheckedUpdateWithoutCoreSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreCardioSetId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseId?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedUpdateManyWithoutWorkoutExerciseNestedInput
  }

  export type WorkoutExerciseUncheckedUpdateManyWithoutCoreSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreCardioSetId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseId?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetRepsUpdateWithoutCoreSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetRepsUncheckedUpdateWithoutCoreSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetRepsUncheckedUpdateManyWithoutCoreSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetWeightUpdateWithoutCoreSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetWeightUncheckedUpdateWithoutCoreSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoreSetWeightUncheckedUpdateManyWithoutCoreSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutExerciseCreateManyCoreCardioSetInput = {
    id?: string
    order?: number
    notes?: string | null
    coreSetId?: string | null
    exerciseId: string
    workoutId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkoutExerciseUpdateWithoutCoreCardioSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coreSet?: CoreSetUpdateOneWithoutWorkoutExerciseNestedInput
    exercise?: ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput
    workout?: WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput
    userWorkoutExercises?: UserWorkoutExerciseUpdateManyWithoutWorkoutExerciseNestedInput
  }

  export type WorkoutExerciseUncheckedUpdateWithoutCoreCardioSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreSetId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseId?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedUpdateManyWithoutWorkoutExerciseNestedInput
  }

  export type WorkoutExerciseUncheckedUpdateManyWithoutCoreCardioSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreSetId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseId?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramWorkoutCreateManyProgramInput = {
    id?: string
    workoutId: string
    daysOfWeek?: ProgramWorkoutCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserWorkoutCreateManyProgramInput = {
    id?: string
    dateCompleted?: Date | string | null
    ownerId: string
    workoutId?: string | null
    createdAt?: Date | string
  }

  export type ProgramWorkoutUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ProgramWorkoutUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workout?: WorkoutUpdateOneRequiredWithoutProgramWorkoutsNestedInput
  }

  export type ProgramWorkoutUncheckedUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ProgramWorkoutUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramWorkoutUncheckedUpdateManyWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutId?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ProgramWorkoutUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWorkoutUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutUserWorkoutNestedInput
    userWorkoutExercises?: UserWorkoutExerciseUpdateManyWithoutUserWorkoutNestedInput
    workout?: WorkoutUpdateOneWithoutUserWorkoutsNestedInput
  }

  export type UserWorkoutUncheckedUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    workoutId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedUpdateManyWithoutUserWorkoutNestedInput
  }

  export type UserWorkoutUncheckedUpdateManyWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    workoutId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkoutExerciseCreateManyWorkoutInput = {
    id?: string
    order?: number
    notes?: string | null
    coreSetId?: string | null
    coreCardioSetId?: string | null
    exerciseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramWorkoutCreateManyWorkoutInput = {
    id?: string
    programId: string
    daysOfWeek?: ProgramWorkoutCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserWorkoutCreateManyWorkoutInput = {
    id?: string
    dateCompleted?: Date | string | null
    ownerId: string
    programId?: string | null
    createdAt?: Date | string
  }

  export type WorkoutExerciseUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coreSet?: CoreSetUpdateOneWithoutWorkoutExerciseNestedInput
    coreCardioSet?: CoreCardioSetUpdateOneWithoutWorkoutExerciseNestedInput
    exercise?: ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput
    userWorkoutExercises?: UserWorkoutExerciseUpdateManyWithoutWorkoutExerciseNestedInput
  }

  export type WorkoutExerciseUncheckedUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreSetId?: NullableStringFieldUpdateOperationsInput | string | null
    coreCardioSetId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedUpdateManyWithoutWorkoutExerciseNestedInput
  }

  export type WorkoutExerciseUncheckedUpdateManyWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    coreSetId?: NullableStringFieldUpdateOperationsInput | string | null
    coreCardioSetId?: NullableStringFieldUpdateOperationsInput | string | null
    exerciseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramWorkoutUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ProgramWorkoutUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneRequiredWithoutProgramWorkoutsNestedInput
  }

  export type ProgramWorkoutUncheckedUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ProgramWorkoutUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramWorkoutUncheckedUpdateManyWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ProgramWorkoutUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWorkoutUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutUserWorkoutNestedInput
    userWorkoutExercises?: UserWorkoutExerciseUpdateManyWithoutUserWorkoutNestedInput
    program?: ProgramUpdateOneWithoutUserWorkoutNestedInput
  }

  export type UserWorkoutUncheckedUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userWorkoutExercises?: UserWorkoutExerciseUncheckedUpdateManyWithoutUserWorkoutNestedInput
  }

  export type UserWorkoutUncheckedUpdateManyWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateCompleted?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWorkoutExerciseCreateManyWorkoutExerciseInput = {
    id?: string
    userWorkoutId: string
  }

  export type UserWorkoutExerciseUpdateWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userWorkout?: UserWorkoutUpdateOneRequiredWithoutUserWorkoutExercisesNestedInput
    userSets?: UserSetUpdateManyWithoutUserWorkoutExerciseNestedInput
  }

  export type UserWorkoutExerciseUncheckedUpdateWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userWorkoutId?: StringFieldUpdateOperationsInput | string
    userSets?: UserSetUncheckedUpdateManyWithoutUserWorkoutExerciseNestedInput
  }

  export type UserWorkoutExerciseUncheckedUpdateManyWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userWorkoutId?: StringFieldUpdateOperationsInput | string
  }

  export type UserSetCreateManyUserWorkoutExerciseInput = {
    id?: string
    reps?: number
    weight?: number | null
    isBodyWeight?: boolean
    restTime?: number
    order?: number
    isCompleted?: boolean
    isWarmup?: boolean
    isMuscleFailure?: boolean
    isJointPain?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSetUpdateWithoutUserWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    restTime?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isWarmup?: BoolFieldUpdateOperationsInput | boolean
    isMuscleFailure?: BoolFieldUpdateOperationsInput | boolean
    isJointPain?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserSetsNestedInput
  }

  export type UserSetUncheckedUpdateWithoutUserWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    restTime?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isWarmup?: BoolFieldUpdateOperationsInput | boolean
    isMuscleFailure?: BoolFieldUpdateOperationsInput | boolean
    isJointPain?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSetUncheckedUpdateManyWithoutUserWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string
    reps?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    isBodyWeight?: BoolFieldUpdateOperationsInput | boolean
    restTime?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isWarmup?: BoolFieldUpdateOperationsInput | boolean
    isMuscleFailure?: BoolFieldUpdateOperationsInput | boolean
    isJointPain?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWorkoutExerciseCreateManyUserWorkoutInput = {
    id?: string
    workoutExerciseId: string
  }

  export type UserWorkoutExerciseUpdateWithoutUserWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutExercise?: WorkoutExerciseUpdateOneRequiredWithoutUserWorkoutExercisesNestedInput
    userSets?: UserSetUpdateManyWithoutUserWorkoutExerciseNestedInput
  }

  export type UserWorkoutExerciseUncheckedUpdateWithoutUserWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutExerciseId?: StringFieldUpdateOperationsInput | string
    userSets?: UserSetUncheckedUpdateManyWithoutUserWorkoutExerciseNestedInput
  }

  export type UserWorkoutExerciseUncheckedUpdateManyWithoutUserWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    workoutExerciseId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}