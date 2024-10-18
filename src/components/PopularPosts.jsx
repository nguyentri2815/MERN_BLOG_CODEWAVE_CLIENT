import React from "react";
import { Link } from "react-router-dom";

const PopularPosts = ({ popularPosts }) => {
  return (
    <div>
      <h2 className="mb-3 font-bold">Popular Posts</h2>
      <div className="space-y-4">
        {popularPosts?.map((post) => (
          <Link to={`/${post?.slug}/${post?._id}`} key={post?._id}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink">
                <img
                  src={post?.image}
                  alt={post?.name}
                  className=" w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <span>{post?.category}</span>
                <h3>{post?.title}</h3>
                <p>{new Date(post?.createdAt).toDateString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
