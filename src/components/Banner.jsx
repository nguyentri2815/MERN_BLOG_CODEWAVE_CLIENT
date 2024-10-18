import React from "react";
import { Link } from "react-router-dom";

const Banner = (props) => {
  const { post } = props;
  //Phân tích layout cho màn lớn,nhỏ - chia layout
  // Link router : detail blog, writer
  // + img , btn tách 2 link - text không link
  return (
    <div>
      <Link to={`/${post?.slug}/${post?._id}`}>
        <div className="overflow-hidden h-80 md:h-96 w-full md:w-3/4">
          <img
            src={post?.image}
            alt={post?.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="bg-slate-700 p-3 w-100 md:w-1/2 ml-auto mt-0 md:-mt-28 relative">
        <div className="space-y-2 px-2 mb-3">
          <h2>{post?.title}</h2>
          <p>{post?.summary}</p>
          <Link to={`/${post?.slug}/${post?._id}`} className="block">
            <button className="p-1 bg-rose-500 rounded text-sm">
              Read more...
            </button>
          </Link>
        </div>

        <Link to={`/writer/${post?.postBy?._id}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={post?.postBy?.image}
                alt={post?.postBy?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3>{post?.postBy?.name} </h3>
            <span>{new Date(post?.createdAt).toDateString()}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
