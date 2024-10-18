import React, { useState } from "react";
import { posts, popular } from "../utils/dummyData";
import { Pagination, PopularPosts, PopularWriters, Post } from "../components";
const CategoriesPage = () => {
  const [page, setPage] = useState(1);

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("cat");
  return (
    <div className="text-white font-bold">
      <h2 className="mb-3">{category}</h2>
      <div className="flex flex-col md:flex-row gap-4">
        {/* left */}
        <div className="w-full md:w-3/4 space-y-4">
          {posts?.map((post) => (
            <Post key={post?._id} post={post} />
          ))}
          <Pagination
            totalPages={posts?.length}
            onPageChange={setPage}
            page={page}
          />
        </div>
        {/* right */}
        <div className="w-full md:w-1/4 space-y-4">
          {/* popular posts */}
          <PopularPosts popularPosts={popular.posts} />
          {/* popular writer */}
          <PopularWriters popularWriters={popular.writers} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
