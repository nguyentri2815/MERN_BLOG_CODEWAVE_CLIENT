import React, { useEffect, useState } from "react";
import { writer, popular } from "../utils/dummyData";
import { Pagination, PopularPosts, PopularWriters, Post } from "../components";
import { useStore } from "../store";
import { useParams } from "react-router-dom";
const WriterPage = () => {
  const [page, setPage] = useState(1);
  const {user} = useStore();

  const {id} = useParams();
  useEffect(() => {
    if(id){
      window.scrollTo({top:0,left:0,behavior:'smooth'})
    }
  }, [id]);

  const handleFolower = () =>{
    alert('chưa có api')
  }
  return (
    <div className="text-white space-y-4">
      <div className=" text-center flex flex-col md:flex-row items-center space-y-4">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={writer?.image}
              alt={writer?.image}
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="space-y-3 w-full md:w-1/2">
          <h3 className="font-bold">{writer?.name}</h3>
          <div className="grid grid-cols-2 ">
            <div>
              <p className="font-bold">{writer?.follower?.length}</p>
              <p>Follower</p>
            </div>
            <div>
              <p className="font-bold">{writer?.posts?.length}</p>
              <p>Posts</p>
            </div>
          </div>
          {!writer?.follower?.includes(user?._id) && <button className="p-1 bg-slate-400 rounded-md" onClick={handleFolower}>Follow</button>}
          {writer?.follower?.includes(user?._id) && <button className="p-1 rounded-md" disabled>Following</button>}
          
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* left */}
        <div className="w-full md:w-3/4 space-y-4">
          {writer?.posts?.map((post) => (
            <Post key={post?._id} post={post} />
          ))}
          <Pagination
            totalPages={writer?.posts?.length}
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

export default WriterPage;
