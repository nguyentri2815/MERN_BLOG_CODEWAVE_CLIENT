import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'sonner'

export const useGetPost = () => {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(1);
  const [posts, setPosts] = useState([]);
  const limit = 5;
  const fetchPost = async () => {
    {
      try {
        const resPosts = await axios.get(
          `http://localhost:8800/posts?page=${page}&limit=${limit}`
        );
        console.log("resPosts", resPosts);

        setPosts(resPosts.data.data);
        setPagination(resPosts.data.pagination)
      } catch (error) {
        toast.error(error.message || "err  logic");
      }
    }
  };
  useEffect(() => {
    fetchPost();
  }, [page]);
  return {
    posts,
    pagination,
    page,
    setPage,
  };
};

export const usePopular = () => {
    const [popularPosts,setPopularPosts] = useState([]);
    const [popularWriters,setPopularWriters] = useState([]);
    try {
        const fetchPostTrending = async () => {
            {
              try {
                const resTrending = await axios.get(
                  `http://localhost:8800/posts/trending`
                );
                console.log("resPostsTrending", resTrending);
                setPopularPosts(resTrending.data.data.popularPosts);
                setPopularWriters(resTrending.data.data.popularWriter);
              } catch (error) {
                toast.error(error.message || "err  logic");
              }
            }
          };
          useEffect(() => {
            fetchPostTrending();
          }, []);
    } catch (error) {
        toast.error(error.message || "err")
    }
    return {
        popularPosts,
        popularWriters
    }
}
