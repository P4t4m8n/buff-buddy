//Services
import { equipmentService } from "../../../services/equipment.service";
//Hooks
import { useQueryHook } from "../../queryHooks/useQueryHook";
//Consts
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
//Types
import type {
  IEquipmentFilter,
  IEquipmentDTO,
} from "../../../../../shared/models/equipment.model";

export const useEquipmentsQuery = (filter: IEquipmentFilter | null) => {
  return useQueryHook<IEquipmentDTO, IEquipmentFilter>({
    queryKey: [QUERY_KEYS.EQUIPMENTS_QUERY_KEY, filter],
    queryFn: () => equipmentService.get(filter),
    enabled: !!filter,
  });
};
