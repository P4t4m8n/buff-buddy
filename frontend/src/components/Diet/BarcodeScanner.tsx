import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import type { Html5QrcodeResult } from "html5-qrcode";
import type { Html5QrcodeError } from "html5-qrcode/esm/core";

interface IBarcodeScannerProps {
  getBarcode: (barcode?: string | null) => void;
  getBarcodeError: (error: string) => void;
}

export default function BarcodeScanner({
  getBarcode,
  getBarcodeError,
}: IBarcodeScannerProps) {
  const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const onScanSuccess = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    try {
      getBarcode(decodedText);
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
    console.warn(`Code scan error = ${error}`);
    getBarcodeError(errorMessage);
  };

  console.log(scannerRef.current?.id!);
  useEffect(() => {
    html5QrcodeScannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
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
