"use client";
import { Image } from "lucide-react";
import React, { FormEvent, memo, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import ImageBlur from "@/components/common/ImageBlur";

const page = memo(() => {
  const [fileContent, setFileContent] = useState<string>("");
  const [category, setSelectCategory] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [sku, setSku] = useState<string>("");
  const [des, setDesc] = useState<string>("");
  const [nameProduct, setNameProduct] = useState<string>("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const extensions = file.name.split(".").pop()?.toUpperCase() as string;
        const allExt = ["JPG", "PNG", "JPEG"];
        if (!allExt.includes(extensions)) {
          alert("Invalid file format. Please upload a JPG or PNG file");
          return;
        }
        const sizeInMb = getFileSizeInMb(file);
        if (sizeInMb > 4) {
          alert("File size exceeds 4MB. Please upload a file less than 4MB");
          return;
        }
        const base64 = await readFileAsBase64(file);
        setFileContent(base64);
        setImageName(file.name);
      }
    },
  });

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const tagCol = tags.trim().toLowerCase().split(", ");
      const variant = {
        attributes: {
          color: color,
          size: size,
        },
        price: price,
        stock,
        image: fileContent,
        sku,
      };
      const body = {
        name: nameProduct,
        description: des,
        category,
        brand,
        type,
        tags: tagCol,
        variants: [variant],
      };
      const res = await axios.post(
        "http://localhost:5913/api/product/create-product",
        body
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white min-h-screen py-10">
      <form method="POST" onSubmit={handleSubmission}>
        <div
          style={{
            border: "1px dashed lightgray",
            padding: "20px",
            borderRadius: "5px",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "560px",
            width: "100%",
            marginInline: "auto",
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input className="bg-red-500" {...getInputProps()} />

          {fileContent ? (
            <div className="flex items-center   gap-3">
              <span className="text-gray-500">
                <Image size={18} className="text-gray-600" />
              </span>
              <p className="text-sm text-gray-400">{imageName}</p>
            </div>
          ) : (
            <p>
              Drag and drop a JPG, PNG, or JPEG file here, or click to select a
              file.
            </p>
          )}
        </div>
        <div className="max-w-lg mx-auto my-10">
          <div className="flex flex-col gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="desc"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="p-2 focus-within:border-blue-300 focus-within:border-2 border-2 rounded-lg outline-none "
              value={des}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-3 gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              className="p-2 focus-within:border-blue-300 focus-within:border-2 border-2 rounded-lg outline-none "
              value={nameProduct}
              onChange={(e) => setNameProduct(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-3 gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="category"
            >
              Category
            </label>
            <Select onValueChange={(e) => setSelectCategory(e)}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white p-2 ">
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
                <SelectItem value="men">Men</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col mt-3 gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="brand"
            >
              Brand
            </label>
            <Select onValueChange={(e) => setBrand(e)}>
              <SelectTrigger id="brand" className="w-full">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent className="bg-white p-2 ">
                <SelectItem value="nike">Nike</SelectItem>
                <SelectItem value="fila">Fila</SelectItem>
                <SelectItem value="puma">Puma</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* tags */}
          <div className="flex flex-col mt-3 gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="type"
            >
              Type
            </label>
            <Select onValueChange={(e) => setType(e)}>
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-white p-2 ">
                <SelectItem value="pants">Pants</SelectItem>
                <SelectItem value="t-shirts">T-Shirts</SelectItem>
                <SelectItem value="jackets">jackets</SelectItem>
                <SelectItem value="swimwear">Swimwear</SelectItem>
                <SelectItem value="shirts">Shirts</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="shorts">Shorts</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="skirts">Skirts</SelectItem>
                <SelectItem value="dresses">Dresses</SelectItem>
                <SelectItem value="socks">Socks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* tags */}

          {/* variants */}
          <div className="flex flex-col mt-3 gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="color"
            >
              Color
            </label>
            <input
              type="text"
              id="color"
              className="p-2 focus-within:border-blue-300 focus-within:border-2 border-2 rounded-lg outline-none "
              value={color}
              placeholder="color"
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-3 gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="size"
            >
              Size
            </label>
            <input
              type="text"
              id="size"
              className="p-2 focus-within:border-blue-300 focus-within:border-2 border-2 rounded-lg outline-none "
              value={size}
              placeholder="size"
              onChange={(e) => setSize(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-3 gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="tags"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              className="p-2 focus-within:border-blue-300 focus-within:border-2 border-2 rounded-lg outline-none "
              value={tags}
              placeholder="tags"
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-3 gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="p-2 focus-within:border-blue-300 focus-within:border-2 border-2 rounded-lg outline-none "
              value={price}
              placeholder="price"
              onChange={(e) => setPrice(e.target.valueAsNumber)}
            />
          </div>

          <div className="flex flex-col mt-3 gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="Stock"
            >
              Stock
            </label>
            <input
              type="number"
              id="Stock"
              className="p-2 focus-within:border-blue-300 focus-within:border-2 border-2 rounded-lg outline-none "
              value={stock}
              placeholder="stock"
              onChange={(e) => setStock(e.target.valueAsNumber)}
            />
          </div>

          <div className="flex flex-col mt-3 gap-3">
            <label
              className="text-sm font-medium text-neutral-600"
              htmlFor="SKU"
            >
              SKU
            </label>
            <input
              type="text"
              id="SKU"
              className="p-2 focus-within:border-blue-300 focus-within:border-2 border-2 rounded-lg outline-none "
              value={sku}
              placeholder="sku"
              onChange={(e) => setSku(e.target.value)}
            />
          </div>
          {/* variants */}

          <button onClick={handleSubmission}>Submit</button>
        </div>
      </form>


    </section>
  );
});

export default page;
page.displayName = "upload page";

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsDataURL(file);
  });
};

const getFileSizeInMb = (file: File) => {
  const fileSize = file.size;
  const fileInMb = fileSize / 1024 / 1024;
  return Math.round(fileInMb * 100) / 100;
};
