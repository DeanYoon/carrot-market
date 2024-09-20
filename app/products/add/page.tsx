"use client";

import Button from "@/components/form-btn";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { uploadProduct } from "./actions";

export default function AddProduct() {
  const [preview, setPreview] = useState("");

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    if (file.type.startsWith("image/")) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
      if (fileSizeInMB < 2) {
        const imageUrl = URL.createObjectURL(file); // Create a URL for the selected image
        setPreview(imageUrl); // Set the image URL as the preview
      } else {
        alert("Image file should be under 2MB"); // Show alert if image is too large
        setPreview("");
      }
    } else {
      alert("File should be an image"); // Show alert if the file is not an image
      setPreview("");
    }
  };
  return (
    <div>
      <form action={uploadProduct} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className=" cursor-pointer border-dashed border-2 border-neutral-400 aspect-square flex items-center justify-center flex-col rounded-md"
          style={{
            backgroundImage: preview ? `url(${preview})` : "none", // Set background image if preview exists
            backgroundSize: "cover", // Ensure the image covers the entire area
            backgroundPosition: "center", // Center the image
            backgroundRepeat: "no-repeat", // No repeating of the image
          }}
        >
          <PhotoIcon className="w-20" />
          <div className=" text-neutral-200 text-sm "> Add Picture</div>
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          className="hidden"
        />
        <Input name="title" required placeholder="제목" type="text" />
        <Input name="price" required placeholder="가격" type="number" />
        <Input
          name="description"
          required
          placeholder="description"
          type="text"
        />
        <Button text="Done" />
      </form>
    </div>
  );
}
