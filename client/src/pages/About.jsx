const About = () => {
  return (
    <div>
      <section className="py-10 dark:text-gray-200 text-sm flex flex-col justify-center items-center">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-6">About Us</h3>
          <p className="text-lg  mb-6 text-center">
            Welcome to <span className="font-semibold">Hnin&apos;s Blog</span>,
            your go-to destination for insightful and engaging content across a
            variety of categories!
          </p>
          <p className="text-lg  mb-6">
            At <span className="font-semibold">Hnin&apos;s Blog</span>, we
            believe in the power of words and the connection they create. Our
            mission is to provide a platform where readers can explore diverse
            topics, share their thoughts, and connect with others who share
            similar interests. Whether you’re passionate about lifestyle,
            technology, travel, fashion, or any other subject, you’ll find a
            wealth of articles that inspire, inform, and entertain.
          </p>

          <h3 className="text-3xl font-semibold mb-4">Our Vision</h3>
          <p className="text-lg  mb-6">
            We aim to create a vibrant community where everyone feels welcomed
            to express their opinions. Each blog post is crafted with care,
            drawing on extensive research and personal experiences to ensure our
            readers receive high-quality content. We encourage interaction, so
            don’t hesitate to leave comments, share your thoughts, and engage
            with fellow readers!
          </p>

          <h3 className="text-3xl font-semibold mb-4">What We Offer</h3>
          <ul className="list-disc list-inside text-lg  mb-6">
            <li>
              <strong>Diverse Categories:</strong> Explore a wide range of
              topics tailored to your interests. From lifestyle and wellness to
              tech trends and travel tips, there’s something for everyone.
            </li>
            <li>
              <strong>Engaging Content:</strong> Our blogs are designed to not
              only inform but also spark conversations. We strive to create a
              connection between our writers and readers.
            </li>
            <li>
              <strong>Community Interaction:</strong> Join the conversation! You
              can like, comment, and share your views on our articles, making
              your voice heard and connecting with others.
            </li>
          </ul>

          <p className="text-lg  text-center">
            Thank you for visiting{" "}
            <span className="font-semibold">Hnin&apos;s Blog</span>. We hope you
            enjoy reading our blogs as much as we enjoy writing them! Stay tuned
            for fresh content, and feel free to reach out with any suggestions
            or topics you’d like us to cover.
          </p>

          <p className="text-lg  text-center font-semibold mt-4">
            Happy reading!
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
