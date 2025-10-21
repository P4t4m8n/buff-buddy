import { useContext } from "react";
import { PageIdContext } from "../context/PageIdContext";

const usePageId = () => useContext(PageIdContext);

export default usePageId;
