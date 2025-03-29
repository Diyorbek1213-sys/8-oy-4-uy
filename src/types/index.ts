export interface VideoType {
  video_id: string;
  title: string;
  author: string;
  number_of_views: number;
  video_length: string;
  description: null | string;
  is_live_content: null | boolean;
  published_time: string;
  channel_id: string;
  category: null | string[];
  type: string;
  keywords: string[];
  thumbnails: VideoThumbnailI[];
}


export interface CommentType {
  author_channel_id: string;
  author_name: string;
  id: string;
  like_count: string | number;
  number_of_replies: string | number;
  published_time: string | number;
  text: string;
  thumbnails: VideoThumbnailI[]
}

interface VideoThumbnailI {
  url: string;
  width: number;
  height: number;
}


// author_channel_id
// : 
// "UCeQwQ3dcPS594tegHAPJ5Jg"
// author_name
// : 
// "@drofresco"
// id
// : 
// "Ugxn6dBnymQFuRc10zR4AaABAg"
// like_count
// : 
// "1.9K"
// number_of_replies
// : 
// "27"
// published_time
// : 
// "4 years ago"
// text
// : 
// "Monday's aren't so bad when you have Bad Friends."
// thumbnails
// : 
// [{…}]