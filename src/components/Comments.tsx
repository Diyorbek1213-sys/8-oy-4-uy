import { CommentType } from "../types"

const Comments = ({ comment }: { comment: CommentType }) => {
    return (
        <div className="flex gap-2 mt-5">
            <div>
                {
                    comment.thumbnails.map((item, index) => {
                        return <img key={index} className="w-[40px] h-[40px] rounded-full" src={item.url} alt="image" />
                    })
                }
            </div>
            <div>
                <h3>{comment.author_name}</h3>
                <p>{comment.text}</p>
                <div>
                    <h3>Likes: {comment.like_count}</h3>
                </div>
                <h3>Replies: {comment.number_of_replies}</h3>
            </div>
        </div>
    )
}

export default Comments