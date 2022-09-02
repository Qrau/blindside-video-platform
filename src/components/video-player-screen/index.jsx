export const VideoPlayerScreen = ({
  poster,
  video,
  videoElement,
  handleOnTimeUpdate,
  children,
}) => {
  return (
    <div className="video-wrapper">
      <video
        poster={poster}
        src={video}
        ref={videoElement}
        onTimeUpdate={handleOnTimeUpdate}
      />
      {children}
    </div>
  );
};
