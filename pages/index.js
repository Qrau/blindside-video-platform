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
  const [comment, setComment] = useState({});
  const [comments, setComments] = useState([]);
  const [commentVisible, setCommentVisible] = useState(false);
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
          <h4>
            {!playerState.isPlaying && "now playing :" + activeVideo.title}
          </h4>

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
          <div className="toggle-container">
            <label class="switch">
              <input
                class="switch-input"
                type="checkbox"
                onChange={() => setCommentVisible((prevState) => !prevState)}
              />
              <span class="switch-label" data-on="On" data-off="Off"></span>
              <span class="switch-handle"></span>
            </label>
            <p>toggle comments</p>
          </div>
          {commentVisible && (
            <div className="comments">
              {comments.map(({ id, value, date, username }) => (
                <div className="comments-wrapper" key={id}>
                  <p>{value}</p>
                  <div className="commenter-wrapper">
                    <ul>{username}</ul>
                    <ul>
                      commented on : <time>{date}</time>
                    </ul>
                  </div>
                </div>
              ))}
              <div className="comments-submit">
                <textarea
                  placeholder="place your comment here"
                  onChange={(e) =>
                    setComment((prevState) => ({
                      ...prevState,
                      id: +new Date(),
                      value: e.target.value,
                      date: new Date().toLocaleString(),
                      username: "testuser123",
                      video_id: activeVideo.id,
                    }))
                  }
                />
                <button
                  onClick={() =>
                    setComments((prevState) => [...prevState, comment])
                  }
                >
                  comment
                </button>
              </div>
            </div>
          )}
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
