import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsDescription = ({ info }: { info: ProductsProps | undefined }) => {
  return (
    info && (
      <section className="bg-white container p-10 ">
        <Tabs defaultValue="description">
          <TabsList className="w-full">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <div className="my-10">
              <h3 className="text-lg font-medium pb-1 underline">
                About Nike {info.name}
              </h3>
              <article>
                <p className="my-4 text-base">{info.description}</p>
                <h3 className="text-lg font-medium pb-1 underline">
                  Key Features
                </h3>
                <ul className="list-disc ml-8 mt-4 mb-5 grid grid-cols-2 gap-10 max-sm:grid-cols-1">
                  <li>
                    <span className="font-medium block">LightWeight:</span>
                    <span>
                      The low-cut design offers enhanced mobility and
                      breathability, allowing for quick cuts and agile
                      movements. You&apos;ll feel light on your feet without
                      sacrificing support.
                    </span>
                  </li>
                  {info.contentInfo &&
                    info.contentInfo.features.map((feature, idx) => {
                      return (
                        <li key={idx}>
                          <span className="font-medium block">
                            {feature.header}
                          </span>
                          <span>{feature.description}</span>
                        </li>
                      );
                    })}
                </ul>

                <h3 className="text-lg font-medium pb-1 underline">
                  {info?.subContent && info?.subContent.title}
                </h3>
                <p>{info?.subContent && info?.subContent.desc}</p>
              </article>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="my-10">
              <h3 className="text-2xl font-medium pb-1 underline">
                Reviews and Ratings (4.6)
              </h3>
              <div className="mt-10">
                <div className="flex items-center ">
                  <p className="font-mono text-lg font-semibold mr-3 ">4/5</p>
                  <p className="text-lg font-medium text-neutral-600 mr-2">
                    Emmanuel Hudson
                  </p>
                  <p className="text-neutral-600">16th October 2024</p>
                </div>
                <p className="font-medium mt-4">
                  I absolutely love my shoes. They are as described and are very
                  comfy. I love the different shades of purple around the shoe
                  as well.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    )
  );
};

export default TabsDescription;
