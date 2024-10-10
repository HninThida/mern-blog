import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRequest } from "../utils/api";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostComponent";

const Post = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [recentPost, setRecentPost] = useState([null]);
  const [error, setError] = useState(false);
  const [post, setPost] = useState<any>(null);

  const handleGetRecentPost = async () => {
    const data = await getRequest("post?limit=3");
    if (data?.success) {
      setRecentPost(data?.data);
    }
  };

  const handleGetPost = async () => {
    const data = await getRequest(`post?slug=${slug}`);
    if (data?.success) {
      setPost(data?.data[0]);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPost();
    handleGetRecentPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="xl"></Spinner>
        </div>
      ) : (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
          <h1 className="text-3xl p-3 text-center font-serif mx-w-2xl mx-auto lg:text-4xl">
            {post?.title}
          </h1>
          <Link
            to={`/search/category=${post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="sm">
              {post?.category}
            </Button>
          </Link>
          <img
            src={post?.image}
            alt="image"
            className="w-full max-w-3xl mx-auto mt-5 max-h-[500px] object-cover"
          />
          <div className="flex justify-between mt-5 mx-auto w-full  max-w-2xl content">
            <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
            <span>{(post?.content.length / 1000).toFixed(0)} mins</span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post?.content }}
            className="mb-5 p-3 max-w-2xl mx-auto"
          ></div>
          <div className="mx-auto max-w-4xl">
            <CallToAction />
          </div>
          <div>
            <CommentSection postId={post?._id.toString()} />
          </div>
          <div className="flex flex-col items-center justify-center mb-5">
            <h1 className="text-lg ">Recent Blogs</h1>
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
              {recentPost &&
                recentPost?.map((item) => (
                  <>
                    <PostCard post={item} />
                  </>
                ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Post;
