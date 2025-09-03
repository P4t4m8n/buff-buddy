import { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import Button from "../UI/Button";
import { IconBarcode } from "../UI/Icons/IconBarcode";

interface IBarcodeScannerProps {
  getBarcode: (barcode?: string | null) => void;
  getBarcodeError: (error: string) => void;
}

export default function BarcodeScannerButton({
  getBarcode,
  getBarcodeError,
}: IBarcodeScannerProps) {
  const [showScanner, setShowScanner] = useState(false);

  const onGetBarcode = (barcode?: string | null) => {
    getBarcode(barcode);
    setShowScanner(false);
  };

  return (
    <div className="">
      {showScanner ? (
        <div>
          <BarcodeScanner
            onGetBarcode={onGetBarcode}
            getBarcodeError={getBarcodeError}
          />
          <Button onClick={() => setShowScanner((prev) => !prev)}>
            <IconBarcode />
          </Button>
        </div>
      ) : (
        <Button
          className="bg-main-orange"
          onClick={() => setShowScanner((prev) => !prev)}
        >
          <IconBarcode className="w-8 h-8 fill-black-300 " />
        </Button>
      )}
    </div>
  );
}
