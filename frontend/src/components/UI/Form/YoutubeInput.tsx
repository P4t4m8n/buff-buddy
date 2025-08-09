import { useEffect, useState } from "react";

import YoutubePlayer from "../YoutubePlayer";
import InputWithError from "./InputWithError";

interface YoutubeInputProps {
  youtubeUrlProps?: string | null;
  error?: string;
  parentId?: string | null;
}

//TODO?? improve url input and handle validation and until link is not valid dont display anything.
//TODO??  iframe probably when url is broken try to navigate to the home page of the app
export default function YoutubeInput({
  youtubeUrlProps,
  error,
  parentId,
}: YoutubeInputProps) {
  const [youtubeUrl, setYoutubeUrl] = useState<string | null | undefined>(
    youtubeUrlProps
  );
  useEffect(() => {
    setYoutubeUrl(youtubeUrlProps);
  }, [youtubeUrlProps]);

  return (
    <div className="max-w-full flex flex-col gap-2 z-10">
      <InputWithError
        inputProps={{
          name: "youtubeUrl" + parentId,
          id: "youtubeUrl" + parentId,
          type: "text",
          value: youtubeUrl || "",
          onChange: (e) => setYoutubeUrl(e.target.value),
        }}
        labelProps={{
          htmlFor: "youtubeUrl" + parentId,
          children: "YouTube URL",
        }}
        error={error}
      />

      {youtubeUrl && <YoutubePlayer youtubeUrl={youtubeUrl} />}
    </div>
  );
}
