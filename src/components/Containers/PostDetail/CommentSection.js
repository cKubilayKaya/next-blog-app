import React from "react";
import AddCommentForm from "../../Forms/AddCommentForm";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import LinkElement from "../../UI/LinkElement";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentSettingsMenu from "./CommentSettingsMenu";

dayjs.extend(relativeTime);

export default function CommentSection({ postDetail, setUpdatePosts }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="mt-8">
      <AddCommentForm postId={postDetail?.id} setUpdatePosts={setUpdatePosts} />
      <h3 className="text-2xl mt-8">Comments</h3>
      <div className="flex flex-col gap-4 mt-8">
        {postDetail?.comments?.length >= 1 ? (
          postDetail?.comments?.map((comment) => (
            <div className="border-b border-b-gray-300 pb-4" key={comment?.id}>
              <div className="flex w-full justify-between">
                <p>{comment?.content}</p>
                {user?.email === comment?.author?.email && <CommentSettingsMenu commentId={comment?.id} setUpdatePosts={setUpdatePosts} />}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <img src="https://www.hisglobal.com.tr/assets/images/1641278654.jpg" className="w-6 h-6 rounded-full" alt="" />
                <LinkElement href={`/profile/${comment?.author?.username}`} link>
                  {comment?.author?.username}
                </LinkElement>
                <p>•</p>
                <p className="text-xs text-gray-600">{dayjs(comment?.createdAt).fromNow()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>There are no comments on this post.</p>
        )}
      </div>
    </div>
  );
}
