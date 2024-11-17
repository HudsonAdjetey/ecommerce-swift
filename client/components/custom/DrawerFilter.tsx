"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

const FormSchema = z.object({
  brand: z.object({
    nike: z.boolean(),
    adidas: z.boolean(),
    puma: z.boolean(),
    newBalance: z.boolean(),
    reebok: z.boolean(),
    vans: z.boolean(),
  }),
  activityType: z.object({
    running: z.boolean(),
    cycling: z.boolean(),
    swimming: z.boolean(),
    weightlifting: z.boolean(),
    yoga: z.boolean(),
    strengthTraining: z.boolean(),
    dancing: z.boolean(),
    other: z.boolean(),
  }),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(Infinity),
  }),
  genderCategory: z.enum(["men", "women", "unisex"]),
});

const DrawerFilter = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brand: {
        nike: false,
        adidas: false,
        puma: false,
        newBalance: false,
        reebok: false,
        vans: false,
      },
      activityType: {
        running: false,
        cycling: false,
        swimming: false,
        weightlifting: false,
        yoga: false,
        strengthTraining: false,
        dancing: false,
        other: false,
      },
      priceRange: {
        min: 0,
        max: 1000,
      },
      genderCategory: "men",
    },
  });

  const { setValue } = form;
  const [colorCode, setColorCode] = useState<string>("");

  const handleColorSelect = (label: string): void => {
    const foundColor = Color.find((color) => color.label === label);
    if (foundColor) {
      setColorCode(label);
    } else {
      console.error(`Color ${label} not found in the Color array.`);
    }
  };

  return (
    <form action="">
      <Drawer>
        <DrawerTrigger asChild>
          <button className="flex space-x-2 items-center">
            <span className="text-lg">Show Filter</span>
            <span>
              <IconAdjustmentsHorizontal size={24} />
            </span>
          </button>
        </DrawerTrigger>
        <DrawerTitle></DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <DrawerContent>
          <Form {...form}>
            <form action="" className="space-y-4 overflow-y-scroll">
              <div className="px-10 w-full  grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1  relative ">
                <div className="fixed top-5 right-10">
                  <DrawerClose className="bg-black text-white w-[40px] h-[40px] flex items-center justify-center hover:bg-neutral-200 hover:text-black mb-8 ml-auto rounded-full">
                    <X />
                  </DrawerClose>
                </div>

                {/* categories */}

                <div className=" pb-10 border-b  ">
                  <h3 className="text-lg mb-5">Select Category</h3>
                  {/* Category Selection */}
                  <FormField
                    control={form.control}
                    name="genderCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            className="space-y-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="men" id="men" />
                              <label htmlFor="men">Men</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="women" id="women" />
                              <label htmlFor="women">Women</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="boy" id="boy" />
                              <label htmlFor="boy">Boy</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="girl" id="girl" />
                              <label htmlFor="girl">Girl</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Brand */}

                <div className=" pb-10 border-b  mt-10">
                  <h3 className="text-lg mb-5">Brand</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="brand.nike"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <div className="space-x-3 flex items-center">
                                <Checkbox
                                  id="nike"
                                  className="w-[25px] h-[25px] border border-black/50 shadow-none "
                                  name="nike"
                                  checked={field.value}
                                  onCheckedChange={(checked: boolean) => {
                                    setValue("brand.nike", checked);
                                  }}
                                />
                                <label
                                  htmlFor="nike"
                                  className="cursor-pointer"
                                >
                                  Nike
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="brand.vans"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <div className="space-x-3 flex items-center">
                                <Checkbox
                                  id="vans"
                                  className="w-[25px] h-[25px] border border-black/50 shadow-none "
                                  name="vans"
                                  checked={field.value}
                                  onCheckedChange={(checked: boolean) => {
                                    setValue("brand.vans", checked);
                                  }}
                                />
                                <label
                                  htmlFor="vans"
                                  className="cursor-pointer"
                                >
                                  Vans
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="brand.adidas"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <div className="space-x-3 flex items-center">
                                <Checkbox
                                  id="adidas"
                                  className="w-[25px] h-[25px] border border-black/50 shadow-none "
                                  name="adidas"
                                  checked={field.value}
                                  onCheckedChange={(checked: boolean) => {
                                    setValue("brand.adidas", checked);
                                  }}
                                />
                                <label
                                  htmlFor="adidas"
                                  className="cursor-pointer"
                                >
                                  Adidas
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="brand.puma"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <div className="space-x-3 flex items-center">
                                <Checkbox
                                  id="puma"
                                  className="w-[25px] h-[25px] border border-black/50 shadow-none "
                                  name="puma"
                                  checked={field.value}
                                  onCheckedChange={(checked: boolean) => {
                                    setValue("brand.puma", checked);
                                  }}
                                />
                                <label
                                  htmlFor="Puma"
                                  className="cursor-pointer"
                                >
                                  Puma
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>

                {/* Activity */}

                <div className=" pb-10 border-b  mt-10">
                  <h3 className="text-lg mb-5">Sports & Activities</h3>
                  <div className="flex flex-col space-y-4">
                    <FormField
                      control={form.control}
                      name="activityType.running"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <div className="space-x-3 flex items-center">
                                <Checkbox
                                  id="running"
                                  className="w-[25px] h-[25px] border border-black/50 shadow-none "
                                  name="running"
                                  checked={field.value}
                                  onCheckedChange={(checked: boolean) => {
                                    setValue("activityType.running", checked);
                                  }}
                                />
                                <label
                                  htmlFor="running"
                                  className="cursor-pointer"
                                >
                                  Running
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="activityType.yoga"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <div className="space-x-3 flex items-center">
                                <Checkbox
                                  id="yoga"
                                  className="w-[25px] h-[25px] border border-black/50 shadow-none "
                                  name="yoga"
                                  checked={field.value}
                                  onCheckedChange={(checked: boolean) => {
                                    setValue("activityType.yoga", checked);
                                  }}
                                />
                                <label
                                  htmlFor="yoga"
                                  className="cursor-pointer"
                                >
                                  Yoga
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="activityType.cycling"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <div className="space-x-3 flex items-center">
                                <Checkbox
                                  id="cycling"
                                  className="w-[25px] h-[25px] border border-black/50 shadow-none "
                                  name="ac"
                                  checked={field.value}
                                  onCheckedChange={(checked: boolean) => {
                                    setValue("activityType.cycling", checked);
                                  }}
                                />
                                <label
                                  htmlFor="adidas"
                                  className="cursor-pointer"
                                >
                                  Cycling
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="activityType.other"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <div className="space-x-3 flex items-center">
                                <Checkbox
                                  id="activityType"
                                  className="w-[25px] h-[25px] border border-black/50 shadow-none "
                                  name="other"
                                  checked={field.value}
                                  onCheckedChange={(checked: boolean) => {
                                    setValue("activityType.other", checked);
                                  }}
                                />
                                <label
                                  htmlFor="other"
                                  className="cursor-pointer"
                                >
                                  Other
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>

                {/* colors */}
                <div className=" pb-10  mt-10">
                  <h3 className="text-lg mb-5">Color {Color.length}</h3>

                  <div className="grid grid-cols-3 gap-4">
                    {Color?.map((col, idx) => {
                      return (
                        <button
                          key={idx}
                          type="button"
                          className="flex flex-col items-center space-y-1"
                          onClick={() => handleColorSelect(col.label)}
                        >
                          <span
                            className={`w-[20px] h-[20px] flex rounded-full `}
                            style={{
                              backgroundColor: col.colorCode,
                            }}
                          ></span>
                          <span
                            className={`${
                              colorCode === col.label && "font-bold"
                            }`}
                          >
                            {col.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </form>
          </Form>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </form>
  );
};
export default DrawerFilter;

export const Color: {
  label: string;
  colorCode: string;
}[] = [
  {
    label: "Black",
    colorCode: "#000",
  },
  {
    label: "Blue",
    colorCode: "#7E5AFF",
  },
  {
    label: "Brown",
    colorCode: "#8B4513",
  },
  {
    label: "Green",
    colorCode: "#46F94D",
  },
  {
    label: "Grey",
    colorCode: "#CCCCCC",
  },
  {
    label: "Red",
    colorCode: "#FF0000",
  },
  {
    label: "White",
    colorCode: "#F8F8F8",
  },
  {
    label: "Yellow",
    colorCode: "#FFB74D",
  },
  {
    label: "Purple",
    colorCode: "#800080",
  },
  {
    label: "Orange",
    colorCode: "#FFA500",
  },
  {
    //   pink
    label: "Pink",
    colorCode: "#FFC0CB",
  },
  {
    //   light blue
    label: "Light Blue",
    colorCode: "#ADD8E6",
  },
];
