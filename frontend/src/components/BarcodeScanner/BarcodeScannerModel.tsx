import BarcodeScanner from "./BarcodeScanner";
import { IconBarcode } from "../UI/Icons/IconBarcode";
import GenericModel from "../UI/GenericModel";

interface IBarcodeScannerProps {
  getBarcode: (barcode?: string | null) => void;
  getBarcodeError: (error: string) => void;
}

export default function BarcodeScannerModel({
  getBarcode,
  getBarcodeError,
}: IBarcodeScannerProps) {
  return (
    <GenericModel
      Model={BarcodeScanner}
      modelProps={{ getBarcode, getBarcodeError }}
      buttonProps={{
        className: "bg-main-orange",
        children: <IconBarcode className="w-8 h-full fill-black-300 " />,
      }}
    />
  );
}
