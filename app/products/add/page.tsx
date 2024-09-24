"use client";

import Button from "@/components/form-btn";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { getUploadUrl, uploadProduct } from "./actions";
import { useFormState } from "react-dom";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [photoId, setPhotoId] = useState("");
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const imageUrl = URL.createObjectURL(file); // Create a URL for the selected image
    setPreview(imageUrl); // Set the image URL as the preview
    const { result, success } = await getUploadUrl();
    if (success) {
      const { id, uploadUrl } = result;
      setUploadUrl(uploadUrl);
      setPhotoId(id);
    }
  };

  const interceptAction = async (_: any, formData: FormData) => {
    //upload image to cloudflare
    const file = formData.get("photo");
    if (!file) {
      return;
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }
    const photoUrl = `https://imagedelivery.net/NNvtxoeNSTgqpQu5EeHI6w/${photoId}`;

    //replace 'photo' in formData
    formData.set("photo", photoUrl);
    // call upload product
    console.log(formData);
    return uploadProduct(_, formData);
  };
  const [state, action] = useFormState(interceptAction, null);
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
