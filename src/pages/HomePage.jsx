import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Post from "../components/Posts";
import { posts, popular } from "../utils/dummyData";
import { useGetPost, usePopular } from "../hooks/postHook";

const HomePage = () => {
  //mock POSTS -> until dummyData.js
  // const randomIndexOfPosts = Math.floor(Math.random() * posts?.length);
  //Banner : random post theo length , xu ly show code -> jsx (...)
  //Mock popular categories + map custom mau + icon
  //Map posts - card post

  //....

  //Note
  //+ Home cần list post để randome và gửi  list xuống component
  const { posts, pagination, page, setPage } = useGetPost();
  const randomIndexOfPosts = Math.floor(Math.random() * posts?.length);
  const { popularPosts, popularWriters } = usePopular();
  return (
    <main className="text-white space-y-6">
      {/* banner */}
      <section>
        <Banner post={posts.length > 0 && posts[randomIndexOfPosts]} />
      </section>
      {/* Popular categories */}
      <section>
        <Category />
      </section>
      {/* posts */}
      <section>
        <Post
          posts={posts}
          page={page}
          setPage={setPage}
          pagination={pagination}
          popularPosts={popularPosts}
          popularWriters={popularWriters}
        />
      </section>
    </main>
  );
};

export default HomePage;
