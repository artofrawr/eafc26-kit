Object.defineProperty(exports, '__esModule', { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
} = require('./runtime/edge.js');

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: '5.22.0',
  engine: '605197351a3c8bdd595af2d2a9bc3025bca48ea2',
};

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.NotFoundError = NotFoundError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
});

exports.Prisma.QualityScalarFieldEnum = {
  id: 'id',
  name: 'name',
};

exports.Prisma.RarityScalarFieldEnum = {
  id: 'id',
  name: 'name',
};

exports.Prisma.CountryScalarFieldEnum = {
  id: 'id',
  name: 'name',
};

exports.Prisma.PositionScalarFieldEnum = {
  id: 'id',
  name: 'name',
};

exports.Prisma.PlayerPositionScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  positionId: 'positionId',
};

exports.Prisma.LeagueScalarFieldEnum = {
  id: 'id',
  name: 'name',
  countryId: 'countryId',
};

exports.Prisma.ClubScalarFieldEnum = {
  id: 'id',
  name: 'name',
  countryId: 'countryId',
  leagueId: 'leagueId',
};

exports.Prisma.PlayerScalarFieldEnum = {
  id: 'id',
  displayName: 'displayName',
  fullName: 'fullName',
  qualityId: 'qualityId',
  rarityId: 'rarityId',
  ovr: 'ovr',
  rating1: 'rating1',
  rating2: 'rating2',
  rating3: 'rating3',
  rating4: 'rating4',
  rating5: 'rating5',
  rating6: 'rating6',
  countryId: 'countryId',
  clubId: 'clubId',
  leagueId: 'leagueId',
};

exports.Prisma.ClubPlayerScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  sbc: 'sbc',
  squad: 'squad',
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc',
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive',
};

exports.Prisma.ModelName = {
  Quality: 'Quality',
  Rarity: 'Rarity',
  Country: 'Country',
  Position: 'Position',
  PlayerPosition: 'PlayerPosition',
  League: 'League',
  Club: 'Club',
  Player: 'Player',
  ClubPlayer: 'ClubPlayer',
};
/**
 * Create the Client
 */
const config = {
  generator: {
    name: 'client',
    provider: {
      fromEnvVar: null,
      value: 'prisma-client-js',
    },
    output: {
      value: '/Users/jens/projects/eafc26-kit/libs/database/src/generated/client',
      fromEnvVar: null,
    },
    config: {
      engineType: 'library',
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: 'darwin-arm64',
        native: true,
      },
    ],
    previewFeatures: [],
    sourceFilePath: '/Users/jens/projects/eafc26-kit/libs/database/prisma/schema.prisma',
    isCustomOutput: true,
  },
  relativeEnvPaths: {
    rootEnvPath: null,
  },
  relativePath: '../../../prisma',
  clientVersion: '5.22.0',
  engineVersion: '605197351a3c8bdd595af2d2a9bc3025bca48ea2',
  datasourceNames: ['db'],
  activeProvider: 'postgresql',
  postinstall: false,
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: 'DATABASE_URL',
        value: null,
      },
    },
  },
  inlineSchema:
    '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider = "prisma-client-js"\n  output   = "../src/generated/client"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel Quality {\n  id      Int      @id @default(autoincrement())\n  name    String   @unique\n  players Player[]\n}\n\nmodel Rarity {\n  id      Int      @id @default(autoincrement())\n  name    String   @unique\n  players Player[]\n}\n\nmodel Country {\n  id      Int      @id @default(autoincrement())\n  name    String   @unique\n  clubs   Club[]\n  leagues League[]\n  players Player[]\n}\n\nmodel Position {\n  id      Int              @id @default(autoincrement())\n  name    String           @unique\n  players PlayerPosition[]\n}\n\nmodel PlayerPosition {\n  id         Int      @id @default(autoincrement())\n  playerId   Int\n  positionId Int\n  player     Player   @relation(fields: [playerId], references: [id], onDelete: Cascade)\n  position   Position @relation(fields: [positionId], references: [id], onDelete: Cascade)\n\n  @@unique([playerId, positionId])\n  @@index([playerId])\n  @@index([positionId])\n}\n\nmodel League {\n  id        Int      @id @default(autoincrement())\n  name      String\n  countryId Int\n  country   Country  @relation(fields: [countryId], references: [id], onDelete: Cascade)\n  clubs     Club[]\n  players   Player[]\n\n  @@unique([name, countryId])\n  @@index([countryId])\n}\n\nmodel Club {\n  id        Int      @id @default(autoincrement())\n  name      String\n  countryId Int\n  leagueId  Int\n  country   Country  @relation(fields: [countryId], references: [id], onDelete: Cascade)\n  league    League   @relation(fields: [leagueId], references: [id], onDelete: Cascade)\n  players   Player[]\n\n  @@unique([name, leagueId])\n  @@index([countryId])\n  @@index([leagueId])\n}\n\nmodel Player {\n  id          Int              @id @default(autoincrement())\n  displayName String\n  fullName    String\n  qualityId   Int\n  rarityId    Int\n  ovr         Int\n  rating1     Int\n  rating2     Int\n  rating3     Int\n  rating4     Int\n  rating5     Int\n  rating6     Int\n  countryId   Int\n  clubId      Int\n  leagueId    Int\n  positions   PlayerPosition[]\n  clubPlayers ClubPlayer[]\n  quality     Quality          @relation(fields: [qualityId], references: [id], onDelete: Cascade)\n  rarity      Rarity           @relation(fields: [rarityId], references: [id], onDelete: Cascade)\n  country     Country          @relation(fields: [countryId], references: [id], onDelete: Cascade)\n  league      League           @relation(fields: [leagueId], references: [id], onDelete: Cascade)\n  club        Club             @relation(fields: [clubId], references: [id], onDelete: Cascade)\n\n  @@unique([displayName, ovr, qualityId, rarityId])\n  @@index([qualityId])\n  @@index([rarityId])\n  @@index([countryId])\n  @@index([clubId])\n  @@index([leagueId])\n  @@index([ovr])\n}\n\nmodel ClubPlayer {\n  id       Int     @id @default(autoincrement())\n  playerId Int\n  sbc      Boolean @default(false)\n  squad    Boolean @default(false)\n  player   Player  @relation(fields: [playerId], references: [id], onDelete: Cascade)\n\n  @@unique([playerId])\n  @@index([playerId])\n  @@index([sbc])\n  @@index([squad])\n}\n',
  inlineSchemaHash: 'bbaa773928462b863cb62bb114f9887ecd22b26e44170cfac34a3526654fcc38',
  copyEngine: true,
};
config.dirname = '/';

config.runtimeDataModel = JSON.parse(
  '{"models":{"Quality":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"players","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Player","relationName":"PlayerToQuality","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Rarity":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"players","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Player","relationName":"PlayerToRarity","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Country":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"clubs","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Club","relationName":"ClubToCountry","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"leagues","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"League","relationName":"CountryToLeague","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"players","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Player","relationName":"CountryToPlayer","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Position":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"players","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"PlayerPosition","relationName":"PlayerPositionToPosition","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"PlayerPosition":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"playerId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"positionId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"player","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Player","relationName":"PlayerToPlayerPosition","relationFromFields":["playerId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"position","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Position","relationName":"PlayerPositionToPosition","relationFromFields":["positionId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["playerId","positionId"]],"uniqueIndexes":[{"name":null,"fields":["playerId","positionId"]}],"isGenerated":false},"League":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"countryId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Country","relationName":"CountryToLeague","relationFromFields":["countryId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"clubs","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Club","relationName":"ClubToLeague","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"players","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Player","relationName":"LeagueToPlayer","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["name","countryId"]],"uniqueIndexes":[{"name":null,"fields":["name","countryId"]}],"isGenerated":false},"Club":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"countryId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"leagueId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Country","relationName":"ClubToCountry","relationFromFields":["countryId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"league","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"League","relationName":"ClubToLeague","relationFromFields":["leagueId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"players","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Player","relationName":"ClubToPlayer","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["name","leagueId"]],"uniqueIndexes":[{"name":null,"fields":["name","leagueId"]}],"isGenerated":false},"Player":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"displayName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"fullName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"qualityId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"rarityId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"ovr","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"rating1","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"rating2","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"rating3","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"rating4","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"rating5","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"rating6","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"countryId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"clubId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"leagueId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"positions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"PlayerPosition","relationName":"PlayerToPlayerPosition","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"clubPlayers","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ClubPlayer","relationName":"ClubPlayerToPlayer","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"quality","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Quality","relationName":"PlayerToQuality","relationFromFields":["qualityId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"rarity","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Rarity","relationName":"PlayerToRarity","relationFromFields":["rarityId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Country","relationName":"CountryToPlayer","relationFromFields":["countryId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"league","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"League","relationName":"LeagueToPlayer","relationFromFields":["leagueId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"club","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Club","relationName":"ClubToPlayer","relationFromFields":["clubId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["displayName","ovr","qualityId","rarityId"]],"uniqueIndexes":[{"name":null,"fields":["displayName","ovr","qualityId","rarityId"]}],"isGenerated":false},"ClubPlayer":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"playerId","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"sbc","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"squad","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"player","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Player","relationName":"ClubPlayerToPlayer","relationFromFields":["playerId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["playerId"]],"uniqueIndexes":[{"name":null,"fields":["playerId"]}],"isGenerated":false}},"enums":{},"types":{}}'
);
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.engineWasm = undefined;

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL:
      (typeof globalThis !== 'undefined' && globalThis['DATABASE_URL']) ||
      (typeof process !== 'undefined' && process.env && process.env.DATABASE_URL) ||
      undefined,
  },
});

if (
  (typeof globalThis !== 'undefined' && globalThis['DEBUG']) ||
  (typeof process !== 'undefined' && process.env && process.env.DEBUG) ||
  undefined
) {
  Debug.enable(
    (typeof globalThis !== 'undefined' && globalThis['DEBUG']) ||
      (typeof process !== 'undefined' && process.env && process.env.DEBUG) ||
      undefined
  );
}

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
