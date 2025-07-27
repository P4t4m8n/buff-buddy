interface YoutubePlayerProps {
  youtubeUrl?: string | null;
}
//TODO?? Add error handling for invalid YouTube URLs
//TODO?? Add loading state for YouTube video
//TODO?? Check for shorts and clipped videos
//TODO?? Add sanitation for YouTube URL

export default function YoutubePlayer({ youtubeUrl }: YoutubePlayerProps) {
  return (
    <iframe
      src={youtubeUrl?.replace("watch?v=", "embed/")}
      title="YouTube video player"
      allowFullScreen
      className="aspect-video  max-w-[40rem] rounded "
    ></iframe>
  );
}
