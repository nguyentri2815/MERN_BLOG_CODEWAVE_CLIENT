import React, { useState } from "react";
import PopularPosts from "./PopularPosts";
import PopularWriters from "./PopularWriters";
import Post from "./Post";
import Pagination from "./Pagination";

const Posts = (props) => {
  const {posts, popularPosts, popularWriters,pagination,page ,setPage} = props;
  // const [page, setPage] = useState(1);
  // const {posts, pagination,page, setPage} = useGetPost(); đang xử lý gọi wor home gửi xuống
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* left */}
      <div className="w-full md:w-3/4 space-y-4">
        { posts?.map( post => <Post key={post?._id} post ={post}/>) }
        <Pagination totalPages ={pagination?.totalItems} onPageChange ={setPage} page ={page}/>
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
