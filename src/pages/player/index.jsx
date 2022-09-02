import { useRef, useState } from "react";
import { allVideosData } from "../../assets";
import { DropdownOptions } from "../../components/dropdown-options";
import { SuggestionCard } from "../../components/suggestion-card";
import { ToggleIcon } from "../../components/toggle-icon";
import { VideoPlayerScreen } from "../../components/video-player-screen";
import useMediaPlayer from "../../hooks/useMediaPlayer";

export const Player = () => {
  const videoElement = useRef(null);
  const [activeVideo, setActiveVideo] = useState(allVideosData[0]);
  const speedOptions = ["0.50", "1", "1.25", "2"];
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute
  } = useMediaPlayer(videoElement);
  return (
    <div className="container">
      <VideoPlayerScreen
        poster={activeVideo.poster}
        video={activeVideo.file}
        videoElement={videoElement}
        handleOnTimeUpdate={handleOnTimeUpdate}
      >
        {!playerState.isPlaying && (
          <SuggestionCard
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            togglePlay={togglePlay}
          />
        )}
        <div className="controls">
          <ToggleIcon
            toggle={togglePlay}
            state={playerState.isPlaying}
            onTrue="pause"
            onFalse="play"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <DropdownOptions
            value={playerState.speed}
            onChange={handleVideoSpeed}
            options={speedOptions}
          />
          <ToggleIcon
            toggle={toggleMute}
            state={playerState.isMuted}
            onTrue="sound"
            onFalse="mute"
          />
        </div>
      </VideoPlayerScreen>
    </div>
  );
};
