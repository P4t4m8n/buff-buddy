import { useContext } from "react";
import { PageIdContext } from "../context/PageIdContext";

export const usePageId = () => useContext(PageIdContext);
