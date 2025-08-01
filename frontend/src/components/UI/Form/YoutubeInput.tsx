import { useEffect, useState } from "react";
import Input from "./Input";
import YoutubePlayer from "../YoutubePlayer";
import LabelWithError from "./LabelWithError";

interface YoutubeInputProps {
  youtubeUrlProps?: string | null;
  error?: string;
}

//TODO?? improve url input and handle validation and until link is not valid dont display anything.
//  iframe probably when url is broken try to navigate to the home page of the app
export default function YoutubeInput({
  youtubeUrlProps,
  error,
}: YoutubeInputProps) {
  const [youtubeUrl, setYoutubeUrl] = useState<string | null | undefined>(
    youtubeUrlProps
  );
  useEffect(() => {
    setYoutubeUrl(youtubeUrlProps);
  }, [youtubeUrlProps]);

  return (
    <div className="max-w-full flex flex-col gap-2 z-10">
      <Input
        type="text"
        placeholder=""
        value={youtubeUrl || ""}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded`}
        divStyle="bg-main-orange rounded  border-black outline-black"
        name="youtubeUrl"
      >
        {" "}
        <LabelWithError htmlFor="youtubeUrl" error={error} labelText="YouTube URL" />
      </Input>
      {youtubeUrl && <YoutubePlayer youtubeUrl={youtubeUrl} />}
    </div>
  );
}
