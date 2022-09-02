import { signIn, useSession } from "next-auth/react";
import { useState, useRef } from "react";
import useMediaPlayer from "./../src/hooks/useMediaPlayer";
import { VideoPlayerScreen } from "./../src/components/video-player-screen";
import { SuggestionCard } from "./../src/components/suggestion-card";
import { ToggleIcon } from "./../src/components/toggle-icon";
import { DropdownOptions } from "./../src/components/dropdown-options";
import { allVideosData } from "./../src/assets";

export default function Account() {
  const videoElement = useRef(null);
  const [activeVideo, setActiveVideo] = useState(allVideosData[0]);
  const speedOptions = ["0.50", "1", "1.25", "2"];
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  } = useMediaPlayer(videoElement);

  const { data: session, loading } = useSession();
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {session ? (
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
      ) : (
        <p>
          <p>You are not permitted to see this page.</p>
          <button onClick={signIn}>Sign in</button>
        </p>
      )}
    </div>
  );
}
