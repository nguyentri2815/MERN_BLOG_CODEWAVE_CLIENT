import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Post from "../components/Posts";
import { posts, popular } from "../utils/dummyData";

const HomePage = () => {
  //mock POSTS -> until dummyData.js
  const randomIndexOfPosts = Math.floor(Math.random() * posts?.length);
  //Banner : random post theo length , xu ly show code -> jsx (...)
  //Mock popular categories + map custom mau + icon
  //Map posts - card post

  //....
  console.log("posts", posts);

  return (
    <main className="text-white space-y-6">
      {/* banner */}
      <section>
        <Banner post={posts[randomIndexOfPosts]} />
      </section>
      {/* Popular categories */}
      <section>
        <Category />
      </section>
      {/* posts */}
      <section>
        <Post
          posts={posts}
          popularPosts={popular?.posts}
          popularWriters={popular?.writers}
        />
      </section>
    </main>
  );
};

export default HomePage;
