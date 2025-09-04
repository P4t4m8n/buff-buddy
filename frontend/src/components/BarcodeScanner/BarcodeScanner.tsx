import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import type { IModelProps } from "../../models/UI.model";
import type { Html5QrcodeResult } from "html5-qrcode";
import Button from "../UI/Button";
import { IconBarcode } from "../UI/Icons/IconBarcode";

interface IBarcodeScannerProps extends IModelProps<HTMLDivElement> {
  getBarcode: (barcode?: string | null) => void;
  getBarcodeError: (error: string) => void;
}

//TODO: Need clean up and reorganize
export default function BarcodeScanner({
  getBarcodeError,
  getBarcode,
  ...props
}: IBarcodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const { handleModel, setIsOpen } = props;

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader");
    scannerRef.current.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 320, height: 320 },
      },
      (decodedText: string, decodedResult: Html5QrcodeResult) => {
        console.log("🚀 ~ BarcodeScanner ~ decodedText:", decodedText);
        getBarcode(decodedText);
        if (!!setIsOpen) setIsOpen(false);
      },
      (errorMessage: string) => {
        getBarcodeError(errorMessage);
      }
    );

    return () => {
      scannerRef.current?.stop().catch(() => {});
      scannerRef.current = null;
    };
  }, []);
  return (
    <div className="bg-black-300">
      <div
        id="reader"
        className="barcode-scanner grid items-center justify-center justify-items-center w-screen aspect-video"
      />
      <Button className="bg-main-orange" onClick={handleModel}>
        <IconBarcode className="w-8 h-full fill-black-300 " />
      </Button>
    </div>
  );
}
