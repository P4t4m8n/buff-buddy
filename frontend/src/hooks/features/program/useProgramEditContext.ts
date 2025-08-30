import { useContext } from "react";
import { programEditContext } from "../../../contexts/ProgramEditContext";

export function useProgramEditContext() {
  const context = useContext(programEditContext);
  if (!context) {
    throw new Error("useProgramEdit must be used within a ProgramEditProvider");
  }
  return context;
}
