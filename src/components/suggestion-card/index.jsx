import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { useState } from "react";
import { allVideosData } from "../../assets";

export const SuggestionCard = ({ activeVideo, setActiveVideo, togglePlay }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(null);

  return (
    <div className="suggestion-card">
      <Swiper
        observer={true}
        loop={true}
        slidesPerView={3}
        grid={{
          rows: 1,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
      >
        {allVideosData.map(
          (video) =>
            video.id !== activeVideo.id && (
              <SwiperSlide
                className="slide"
                key={video.id}
                onClick={() => setActiveSuggestion(video.id)}
              >
                <div
                  className={
                    "card-wrapper " +
                    (video.id === activeSuggestion && "active")
                  }
                >
                  <div className="layer"> </div>
                  <img src={video.poster} alt={video.title} />
                  <h2> {video.title} </h2>
                  <p>{video.description}</p>
                  <button
                    onClick={() => {
                      setActiveVideo(video);
                      togglePlay();
                    }}
                  >
                    watch now
                  </button>
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
};
