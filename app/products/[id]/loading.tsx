import { PhotoIcon } from "@heroicons/react/20/solid";

export default function Loading() {
  return (
    <div className="animate-pulse p-5 flex flex-col gap-5  w-full h-full">
      <div className="w-full border-4 border-dashed border-neutral-700  flex justify-center items-center p-32">
        <PhotoIcon className="h-28" />
      </div>
      <div className="flex gap-2">
        <div className="size-12 bg-neutral-700 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="w-40 h-5 bg-neutral-700 rounded-md" />
          <div className="w-20 h-5 bg-neutral-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}
