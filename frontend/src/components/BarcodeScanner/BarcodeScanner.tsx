import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import type { Html5QrcodeResult } from "html5-qrcode";
import type { Html5QrcodeError } from "html5-qrcode/esm/core";

interface IBarcodeScannerProps {
  onGetBarcode: (barcode?: string | null) => void;
  getBarcodeError: (error: string) => void;
}

export default function BarcodeScanner({
  onGetBarcode,
  getBarcodeError,
}: IBarcodeScannerProps) {
  const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
  
  const onScanSuccess = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    console.log("🚀 ~ onScanSuccess ~ decodedResult:", decodedResult)
    console.log("🚀 ~ onScanSuccess ~ decodedText:", decodedText)
    try {
      onGetBarcode(decodedText);
    } catch (err) {
      console.error(err);
    }
    html5QrcodeScannerRef.current
      ?.clear()
      .catch((e) => {
        console.warn("Failed to clear scanner:", e);
      })
      .finally(() => {
        html5QrcodeScannerRef.current = null;
      });
  };

  const onScanFailure = (errorMessage: string, error: Html5QrcodeError) => {

    getBarcodeError(errorMessage);
  };

  useEffect(() => {
    html5QrcodeScannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 60, qrbox: { width: 320, height: 320 } },
      true
    );
    html5QrcodeScannerRef.current.render(onScanSuccess, onScanFailure);

    return () => {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear().catch(() => {});
        html5QrcodeScannerRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div id="reader"></div>
    </>
  );
}
