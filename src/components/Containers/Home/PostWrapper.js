"use client";
import Link from "next/link";
import PostLikeComment from "../PostDetail/PostLikeComment";
import imagePath from "@/utils/imagePath";
import LinkElement from "../../UI/LinkElement";

export default function PostWrapper({ posts, setUpdatePosts }) {
  return (
    <div className="h-full min-h-full min-w-[280px] border-l-gray-300 w-full">
      <div className="grid grid-cols-3 gap-8">
        {posts?.length >= 1 ? (
          posts?.map(({ id, featuredImageUrl, title, slug, excerpt, liked, isLiked, author, _count }) => (
            <div className="flex flex-col border border-gray-300 rounded-2xl" key={id}>
              <img src={imagePath(featuredImageUrl)} className="rounded-t-2xl min-h-[250px] max-h-[250px] object-cover" alt="" />
              <div className="flex flex-1 justify-between flex-col gap-8 p-4">
                <div>
                  <Link href={`/${slug}`} key={id} className="text-2xl hover:underline">
                    {title}
                  </Link>
                  <p className="text-gray-500 mt-2 line-clamp-3">{excerpt}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <img src={author?.profileImageUrl ? imagePath(author?.profileImageUrl) : "/avatar-default.png"} className="w-10 h-10 rounded-full" alt="" />
                    <div>
                      <LinkElement href={`/profile/${author?.username}`} link>
                        {author?.fullname}
                      </LinkElement>
                      <span className="text-sm text-gray-500 -mt-1 block">{author?.username}</span>
                    </div>
                  </div>
                  <PostLikeComment slug={slug} liked={liked} isLiked={isLiked} _count={_count} setUpdatePosts={setUpdatePosts} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>There is no post on this category</p>
        )}
      </div>
    </div>
  );
}
