
import YoutubePlayer from "../YoutubePlayer";
import InputWithError from "./InputWithError";

interface YoutubeInputProps {
  youtubeUrl?: string | null;
  error?: string;
  parentId?: string | null;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function YoutubeInput({
  onInputChange,
  error,
  parentId,
  youtubeUrl
}: YoutubeInputProps) {
  return (
    <div className="max-w-full flex flex-col gap-2 z-10">
      <InputWithError
        inputProps={{
          name: "youtubeUrl",
          id: "youtubeUrl" + parentId,
          type: "text",
          value: youtubeUrl || "",
          onChange: onInputChange,
          className: "h-10 pl-2",
        }}
        labelProps={{
          htmlFor: "youtubeUrl" + parentId,
          children: "YouTube URL",
          isMoveUpEffect: true,
        }}
        error={error}
      />

      {youtubeUrl && <YoutubePlayer youtubeUrl={youtubeUrl} />}
    </div>
  );
}
