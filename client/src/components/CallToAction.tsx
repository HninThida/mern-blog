import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div>
      <section className="mb-4">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border p-6 border-teal-500 text-center rounded-bl-3xl rounded-tr-3xl">
            <h3 className=" font-semibold sm:text-2xl">
              Want to Stay Updated?
            </h3>
            <p className="mt-4 text-lg leading-6">
              Subscribe to our blog to get the latest insights, updates, and
              articles directly to your inbox.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                className="mx-auto mt-4"
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
