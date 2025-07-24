import type { CreateCoreSetInput } from "./coreSets.validations";
export const getCreateCoreSets = (coreSet: CreateCoreSetInput) => {
  return {
    ...coreSet,
    order: coreSet.order || 1,
  };
};
