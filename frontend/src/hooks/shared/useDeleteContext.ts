import { useContext } from "react";
import { IsDeletingContext } from "../context/IsDeletingContext";

export const useDeleteContext = () => {
  return useContext(IsDeletingContext);
};
