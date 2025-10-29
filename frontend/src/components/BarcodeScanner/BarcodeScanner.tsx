//Lib
import { useCallback, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { twMerge } from "tailwind-merge";
//Services
import { ClientError } from "../../services/ClientError.service";
//Hooks
import { useErrors } from "../../hooks/shared/useErrors";
//UI
import Button from "../UI/Button";
import IconPlus from "../UI/Icons/IconPlus";
import Loader from "../UI/loader/Loader";
//Types
import type { IModelProps } from "../../models/model.model";
import type {
  Html5QrcodeCameraScanConfig,
  Html5QrcodeResult,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import type { Html5QrcodeError } from "html5-qrcode/esm/core";

const mediaTrackConstraints: MediaTrackConstraints = {
  facingMode: "environment",
};
const html5QrcodeCameraScanConfig: Html5QrcodeCameraScanConfig = {
  fps: 10,
  qrbox: { width: 320, height: 160 },
  aspectRatio: 2 / 1,
};

interface IBarcodeScannerProps extends IModelProps<HTMLDivElement> {
  getBarcode: (barcode?: string | null) => void;
  getBarcodeError: (error: string) => void;
}

export default function BarcodeScanner({
  getBarcodeError,
  getBarcode,
  ...props
}: IBarcodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleError, errors } = useErrors<{
    scannerError: string;
  }>();

  const { handleModel, setIsOpen, modelRef } = props;

  const qrCodeSuccessCallback: QrcodeSuccessCallback = useCallback(
    (decodedText: string, _: Html5QrcodeResult) => {
      getBarcode(decodedText);
      if (!!setIsOpen) setIsOpen(false);
    },
    [getBarcode, setIsOpen]
  );

  const qrCodeErrorCallback: QrcodeErrorCallback = useCallback(
    (errorMessage: string, _: Html5QrcodeError) => {
      //INFO: Ignore common "not found" errors, but threw others.
      if (errorMessage.includes("NotFoundException")) {
        return;
      }

      if (errorMessage.includes("NotAllowedError")) {
        const permissionDeniedError = ClientError.create(
          "Camera permission denied",
          400,
          true,
          {
            scannerError: "Camera permission denied",
          }
        );
        handleError({ error: permissionDeniedError, emitToToast: true });
        return;
      }

      const unknownError = ClientError.create(
        "Barcode scanner error",
        500,
        false
      );
      handleError({ error: unknownError, emitToToast: true });
      return;
    },
    []
  );

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader", { verbose: false });
    let isMounted = true;

    const startScanner = async () => {
      if (!scannerRef.current || !isMounted) return;

      try {
        await scannerRef.current.start(
          mediaTrackConstraints,
          html5QrcodeCameraScanConfig,
          qrCodeSuccessCallback,
          qrCodeErrorCallback
        );
      } catch (error) {
        qrCodeErrorCallback(error as string, error as Html5QrcodeError);
      } finally {
        setIsLoading(false);
      }
    };

    startScanner();

    return () => {
      isMounted = false;
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch((err) => {
          console.error("Failed to stop scanner on cleanup:", err);
        });
      }
    };
  }, [qrCodeSuccessCallback, qrCodeErrorCallback, getBarcodeError]);

  const barcodeStyle = twMerge(
    "rounded bg-main-orange  border-main-orange col-span-2 transition-opacity duration-500 ease-in-out row-start-2 col-start-1 -row-end-1 -col-end-1",
    isLoading ? "opacity-0 " : "opacity-100"
  );

  const loadersStyle = twMerge(
    "col-span-2 transition-opacity duration-200 ease-in-out row-start-2 col-start-1 -row-end-1 -col-end-1 w-full flex-center",
    isLoading ? "opacity-100 " : "opacity-0"
  );

  return (
    <div
      ref={modelRef}
      className="w-full mx-4 h-60 elative grid grid-rows-[2rem_1fr] grid-cols-[1fr_2rem] gap-y-2 border p-2 rounded    "
    >
      {errors ? (
        <span className="text-error-red text-xl">
          {errors.scannerError ?? errors.unknown}
        </span>
      ) : null}
      <Button
        className="w-8 h-8 rotate-45  rounded-full place-self-end  "
        buttonStyle="warning"
        onClick={handleModel}
      >
        <IconPlus className="w-full h-full  fill-main-orange stroke-main-orange " />
      </Button>
      <div className={loadersStyle}>
        <Loader loaderType="spinner" spinnerSize={6} />
      </div>
      <div id="reader" className={barcodeStyle} />
    </div>
  );
}
