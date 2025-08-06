interface YoutubePlayerProps {
  youtubeUrl?: string | null;
}
//TODO?? Add error handling for invalid YouTube URLs
//TODO?? Add loading state for YouTube video
//TODO?? Check for shorts and clipped videos
//TODO?? Add sanitation for YouTube URL

export default function YoutubePlayer({ youtubeUrl }: YoutubePlayerProps) {
  const getYoutubeEmbedUrl = (url?: string | null): string | undefined => {
    if (!url) return undefined;
    // Handle watch?v= and shorts/
    const videoIdMatch = url.match(/(?:watch\?v=|shorts\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : undefined;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
  };
  return (
    <iframe
      src={getYoutubeEmbedUrl(youtubeUrl)}
      title="YouTube video player"
      allowFullScreen
      className="aspect-video z-0 max-w-[40rem] rounded "
    ></iframe>
  );
}
