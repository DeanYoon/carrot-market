export default function Loading() {
  return (
    <div className="p-5  animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div className="*:rounded-md flex gap-5">
          <div className=" bg-neutral-700 size-28 rounded-md" />
          <div className=" *:rounded-md flex flex-col gap-2 ">
            <div className=" bg-neutral-700 w-40 h-5" />
            <div className=" bg-neutral-700 w-20 h-5" />
            <div className=" bg-neutral-700 w-10 h-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
