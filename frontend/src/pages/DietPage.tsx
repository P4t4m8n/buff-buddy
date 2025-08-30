import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function DietPage() {
  const [code, setcode] = useState("");
  const [error, setError] = useState<string | null>("");
  const [data, setData] = useState<any>(null);

  function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    setcode(decodedText);
    fetchProduct(decodedText);
  }

  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
    setError(error);
  }
  async function fetchProduct(code: string) {
    if (data) return;
    setError(null);
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${code}.json`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    }
  }

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  }, []);

  return (
    <>
      <div id="reader" width="600px"></div>
      <div>
        <h2>Scanned Code:</h2>
        <p>{code}</p>
        <h2>Error:</h2>
        <p>{error}</p>
        <h2>Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}
