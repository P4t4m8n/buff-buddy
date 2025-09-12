import { mutationKeyStoreFactory } from "./mutationKeyStoreFactory";
import type { IMealFilter } from "../../../shared/models/meal.model";

export const mealMutationKeyStore = mutationKeyStoreFactory<IMealFilter>();
