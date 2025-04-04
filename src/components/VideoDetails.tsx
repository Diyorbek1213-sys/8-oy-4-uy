import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { YTService } from "../service/api.service";
import { CommentType, VideoType } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { setComments, setError, setIsLoading } from "../redux/slices/productSlice";
import { RootState } from "../redux/store";
import Comments from "./Comments";

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<VideoType | null>(null);
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const { comments } = useSelector(
    (state: RootState) => state.videos
  );
  const { isLoading } = useSelector(
    (state: RootState) => state.videos
  );
  console.log(comments)
  useEffect(() => {
    const getVideoDetails = async () => {
      if (id) {
        dispatch(setIsLoading(true));
        try {
          const data = await YTService.getVideoDetails(id);
          setVideo(data);
          const getComments = await YTService.getVideoComments(id)

          if (getComments) {
            dispatch(setComments(getComments))
            console.log('comments', getComments)
          }
          console.log(data);
        } catch (error) {
          console.log(error);
          dispatch(setError("Wrong ID"));
        } finally {
          dispatch(setIsLoading(false));
        }
      }
    };

    getVideoDetails();
  }, [id]);
  const ConvertViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000 && views < 1000000) {
      return `${(views / 1000).toFixed(1)}K`;
    } else {
      return views;
    }
  };

  const textToLink = (text: string) => {
    const res = [];
    const tt = text.split(" ");
    for (let i = 0; i < tt.length; i++) {
      if (tt[i].startsWith("http")) {
        res.push(`<a style={{color: "blue"}} href="${tt[i]}">${tt[i]}</a>`);
      } else {
        res.push(tt[i]);
      }
    }
    return res.join(" ");
  };

  return (
    <div className="container py-10">
      <div className="flex gap-5">
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full rounded-xl"
            src={`https://www.youtube.com/embed/${video?.video_id}?si=-FLIE_Y0U4fxL5So`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-[300px] border border-slate-700 rounded flex-shrink-0"></div>
      </div>
      <div className="mt-3">
        <h2 className="text-xl font-bold">{video?.title}</h2>
        <div className="flex gap-3 mt-3 items-center">
          <img
            src={video?.thumbnails[0].url}
            className="w-12 aspect-square object-cover rounded-full"
            alt="channel img"
          />
          <div>
            <p className="text-lg font-bold">{video?.author}</p>
            <span className="text-sm opacity-70">1.92M followers</span>
          </div>
        </div>
      </div>
      <div
        className={`p-3 mt-5 rounded-xl bg-white/10 ${expand ? "h-auto" : "h-[200px]"
          } relative overflow-hidden`}
      >
        <div className="mb-1 font-semibold">
          <span>{ConvertViews(video?.number_of_views || 0)} viewed</span>
          <span className="text-2xl leading-0">&#183;</span>
          <span>{video?.published_time}</span>
        </div>
        <p
          className="*:text-blue-500 *:block"
          dangerouslySetInnerHTML={{
            __html: textToLink(video?.description || ""),
          }}
        ></p>
        {!expand && (
          <div onClick={() => setExpand(true)} className="absolute py-1 left-0 bottom-0 right-0 w-full bg-gradient-to-t from-[#1D202A] from-30% to-transparent text-center">
            <i className="fa fa-chevron-down"></i>
          </div>
        )}
      </div>
      <div>
        <h2 className="mt-5 font-bold text-2xl">{comments?.total_number_of_comments} Comments</h2>
        <div>
          {
            isLoading ? <h2>Loading...</h2> : comments?.comments.length > 0 && comments?.comments.map((comment: CommentType) => {
              return <Comments comment={comment} key={comment.id} />
            })
          }
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
