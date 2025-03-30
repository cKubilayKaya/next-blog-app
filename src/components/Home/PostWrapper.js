"use client";
import Link from "next/link";
import PostLikeComment from "../PostDetail/PostLikeComment";

export default function PostWrapper({ posts, activeCategory, setUpdatePosts }) {
  return (
    <div className="h-full min-h-full min-w-[280px] border-l-gray-300 w-full pl-2">
      <div className="grid grid-cols-3 gap-8">
        {posts?.length >= 1 ? (
          posts?.map(({ id, title, slug, excerpt, liked, author, _count }) => (
            <div className="border border-gray-300 rounded-2xl" key={id}>
              <img src="https://www.hisglobal.com.tr/assets/images/1641278654.jpg" className="object-cover rounded-t-2xl" alt="" />
              <div className="flex flex-col justify-between gap-8 p-4">
                <div>
                  <Link href={`/category/${activeCategory}/${slug}`} key={id} className="text-2xl hover:underline">
                    {title}
                  </Link>
                  <p className="text-gray-500 mt-2">{excerpt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src="https://www.hisglobal.com.tr/assets/images/1641278654.jpg" className="w-10 h-10 rounded-full" alt="" />
                  <div>
                    <p className="text-sm">{author?.fullname}</p>
                    <span className="text-sm text-gray-500">{author?.username}</span>
                  </div>
                </div>
                <PostLikeComment slug={slug} liked={liked} _count={_count} setUpdatePosts={setUpdatePosts} />
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
