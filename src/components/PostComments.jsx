import React from "react";
import { postcommments } from "../utils/dummyData";

function PostComments({ postId }) {
  return (
    <div className="space-y-2">
      {postcommments?.map((comment) => (
        <div className="flex items-center gap-3" key={comment?._id}>
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover "
              src={comment?.commentBy?.image || "no avatar"}
              alt={comment?.commentBy?.image}
            />
          </div>
          <div>
            <p className="text-sm">
              <b>{comment?.commentBy?.name} </b>
              <span>{new Date(comment?.createdAt)?.toDateString()}</span>
            </p>
            <p>{comment?.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostComments;
