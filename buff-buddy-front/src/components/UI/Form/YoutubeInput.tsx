import { useEffect, useState } from "react";
import Input from "./Input";
import YoutubePlayer from "../YoutubePlayer";

interface YoutubeInputProps {
  youtubeUrlProps?: string | null;
}

export default function YoutubeInput({ youtubeUrlProps }: YoutubeInputProps) {
  const [youtubeUrl, setYoutubeUrl] = useState<string | null | undefined>(
    youtubeUrlProps
  );
  useEffect(() => {
    setYoutubeUrl(youtubeUrlProps);
  }, [youtubeUrlProps]);

  return (
    <div className="max-w-full">
      <Input
        type="text"
        placeholder="Enter YouTube URL"
        value={youtubeUrl || ""}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className="border p-2 rounded w-full h-10 mb-4"
        divStyle="w-full"
        name="youtubeUrl"
      />
      {youtubeUrl && <YoutubePlayer youtubeUrl={youtubeUrl} />}
    </div>
  );
}
