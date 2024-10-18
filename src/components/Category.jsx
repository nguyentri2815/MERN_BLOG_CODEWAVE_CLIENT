import React from "react";
import { CATEGORIES } from "../utils/dummyData";
import { Link } from "react-router-dom";

function Category(props) {

  return (
    <div className="flex items-center justify-start gap-3">
      {CATEGORIES?.map((Category) => (
        <Link to={`/category?cat=${Category?.label}`} key={Category?.label}>
          <button
            
            className={`flex items-center gap-1 p-1 pr-2 ${Category?.bgColor} ${Category?.textColor}`}
          >
            <span>{Category?.icon}</span>
            <p>{Category?.label}</p>
          </button>
        </Link>
      ))}
    </div>
  );
}

export default Category;
