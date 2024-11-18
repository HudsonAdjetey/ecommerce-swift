import Link from "next/link";
import React from "react";

const InfoCustomer = () => {
  return (
    <section className="px-10 container">
      <div className="flex flex-col gap-1">
        <p className="text-3xl max-sm:text-2xl">Our Pickup info</p>
        <Link
          href={""}
          className="text-sm font-medium lg:hover:underline max-lg:underline"
        >
          Read More
        </Link>
      </div>
      <div className="my-5">
        <h2 className="text-2xl font-medium mb-4 underline">
          How to choose a store pickup
        </h2>
        <p className="text-justify w-1/2 text-lg max-lg:w-full text-neutral-600 mb-5">
          Ordering your sneaker has never been easier! Follow these simple steps
          to shop online and enjoy a hassle-free pickup experience at a nearby
          store.
        </p>
        <ul className="list-decimal text-lg font-medium grid grid-cols-2 gap-8 max-lg:grid-cols-1">
          <li>
            <span>Select a pickup station from the cart</span>
          </li>
          <li>
            <span>
              Choose a store by selecting the store&apos;s name from the
              drop-down menu.
            </span>
          </li>
          <li>
            <span>
              Check out and pay for your order online.{" "}
              <Link href={""} className="text-blue-500 hover:text-blue-600">
                Learn more
              </Link>
            </span>
          </li>
          <li>
            <span>
              Once your order is complete, your pickup will arrive at the store
              in approximately 30-45 minutes.{" "}
              <Link href={""} className="text-blue-500 hover:text-blue-600">
                Learn more
              </Link>
            </span>
          </li>
          <li>
            <span>
              If you have any questions or need further assistance, please
              contact our customer service team at{" "}
              <Link href={""} className="text-blue-500 hover:text-blue-600">
                (123) 456-7890
              </Link>{" "}
              or visit our website at{" "}
              <Link href={""} className="text-blue-500 hover:text-blue-600">
                www.swiftMart.com
              </Link>
              . <br />
              <Link href={""} className="text-blue-500 hover:text-blue-600">
                Learn more
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default InfoCustomer;
