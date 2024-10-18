import React, { useEffect } from "react";
import { post, popular} from "../utils/dummyData";
import { PopularPosts, PopularWriters, PostComments } from "../components";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../store";
const BlogDetailsPage = () => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [id]);
  // chưa xử lý loading nếu đang chờ 
  //post comments
  const {user} = useStore();
  return (
    <div className="text-white space-y-4">
      <div className="flex items-center gap-2 flex-col md:flex-row flex-col-reverse space-y-3">
        <div className="w-full md:w-1/2 space-y-2">
          <h2 className="font-bold text-lg">{post?.title}</h2>
          <div className="grid grid-cols-2">
            <p className="text-red-500 font-medium">{post?.Category}</p>
            <p>
              {post?.view?.length} <span className="text-red-500">VIEWS</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <img
                className="w-full h-full"
                src={post?.postBy?.image}
                alt={post?.postBy?.image}
              />
            </div>
            <div className="text-sm">
              <h3>{post?.postBy?.name}</h3>
              <p>{new Date(post?.createdAt)?.toDateString()}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 overflow-hidden">
          <img src={post?.image} alt={post?.slug} className="w-full" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* left */}
        <div className="w-full md:w-3/4 space-y-4">
          {post?.summary}
          {/* comment */}
          <div className="space-y-2">
            <h3>Post comments</h3>
            {user?.name && <form action="" className="w-full">
              <textarea placeholder="Add comment" required className="w-full">

              </textarea>
              <button type="submit" className="bg-sky-500 p-1 ">submit</button>
            </form>}
            {!user?.name && <Link to={"/sign-in"} className="w-full rounded-xl"><button className="w-full bg-slate-400"> sign in</button></Link>}
              <PostComments postId={post?._id}/>
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-1/4 space-y-4">
          {/* popular posts */}
          <PopularPosts popularPosts={popular?.posts || []} />
          {/* popular writer */}
          <PopularWriters popularWriters={popular?.writers || []} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
