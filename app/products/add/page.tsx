"use client";

import Button from "@/components/form-btn";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-dom";

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
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the selected image
      setPreview(imageUrl); // Set the image URL as the preview
    }
  };

  const [state, action] = useFormState(uploadProduct, null);
  return (
    <div>
      <form action={action} className="flex flex-col gap-5 p-5">
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
          <div className=" text-neutral-200 text-sm ">
            {state?.fieldErrors.photo ? (
              <span className=" text-red-600">{state?.fieldErrors.photo}</span>
            ) : (
              "Add Picture"
            )}
          </div>
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          className="hidden"
        />
        <Input
          name="title"
          required
          placeholder="제목"
          type="text"
          errors={state?.fieldErrors.title}
        />
        <Input
          name="price"
          required
          placeholder="가격"
          type="number"
          errors={state?.fieldErrors.price}
        />
        <Input
          name="description"
          required
          placeholder="description"
          type="text"
          errors={state?.fieldErrors.description}
        />
        <Button text="Done" />
      </form>
    </div>
  );
}
