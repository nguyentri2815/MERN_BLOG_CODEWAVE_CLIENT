import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <Link to={`/${post?.slug}/${post?._id}`} className="w-full md:w-1/2">
        <div className="w-full h-60 overflow-hidden ">
          <img
            src={post?.image}
            alt={post?.slug}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="w-full md:w-1/2 p-4 space-y-2">
        <div>
          <span>{new Date(post?.createdAt).toDateString()}</span>
          <span>{post?.Category}</span>
        </div>
        <h3>{post?.title}</h3>
        <p>{post?.summary}</p>
        <Link to={`/${post?.slug}/${post?._id}`}>
          <button className="flex items-center gap-2 bg-rose-400 p-1">
            Read more <FaArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Post;
