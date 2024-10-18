import React, { useState } from "react";
import PopularPosts from "./PopularPosts";
import PopularWriters from "./PopularWriters";
import Post from "./Post";
import Pagination from "./Pagination";

const Posts = (props) => {
  const {posts, popularPosts, popularWriters } = props;
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* left */}
      <div className="w-full md:w-3/4 space-y-4">
        { posts?.map( post => <Post key={post?._id} post ={post}/>) }
        <Pagination totalPages ={10} onPageChange ={setPage} page ={page}/>
      </div>
      {/* right */}
      <div className="w-full md:w-1/4 space-y-4">
        {/* popular posts */}
        <PopularPosts popularPosts= {popularPosts}/>
        {/* popular writer */}
        <PopularWriters popularWriters = {popularWriters}/>
      </div>
    </div>
  );
};

export default Posts;
