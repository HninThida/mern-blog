import { useEffect, useState } from "react";
import CallToAction from "../components/CallToAction";
import { getRequest } from "../utils/api";
import PostCard from "../components/PostComponent";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [recentPost, setRecentPost] = useState([null]);
  const handleGetRecentPost = async () => {
    const data = await getRequest("post?limit=12");
    if (data?.success) {
      setRecentPost(data?.data);
    }
  };
  useEffect(() => {
    handleGetRecentPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <section
        className="relative bg-cover bg-center h-96 bg-ttuPattern mb-5"
        // style="background-image: url('https://example.com/luxury-banner.jpg');"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-white text-4xl font-bold mb-4">
            Welcome to Our Blogs
          </h1>
          <p className="text-white text-lg mb-6">
            Explore insights and trends from reading trending blogs.
          </p>
          <Link to={"/search"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="mx-auto mt-4"
            >
              See All Blogs
            </Button>
          </Link>
        </div>
      </section>
      <CallToAction />
      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="text-lg ">Recent Blogs</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPost &&
            recentPost?.map((item, idx) => <PostCard post={item} key={idx} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
