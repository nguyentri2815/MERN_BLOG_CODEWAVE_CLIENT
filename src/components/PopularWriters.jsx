import React from "react";
import { Link } from "react-router-dom";
import { numberFormat } from "../utils/number";

const PopularWriters = ({ popularWriters }) => {
  return (
    <div>
      <h2 className="mb-3 font-bold">Popular writer</h2>
      <div className="space-y-4">
        {popularWriters?.map((writer) => (
          <Link key={writer?._id} to={`/writer/${writer?._id}`} className="block">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={writer?.image}
                  alt={writer?.slug}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3>{writer?.name}</h3>
                <p>
                  <span>{numberFormat(100000)}</span> <span className="text-rose-600">Follower</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularWriters;
