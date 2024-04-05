"use client"

export default function IndexPage() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex md:grid grid-cols-4 grid-rows-1 gap-2 divide-x dark:divide-white divide-black">
        <div className="md:text-4xl text-2xl font-bold">404</div>
        <div className="col-span-3 pl-6 flex justify-center align-middle items-center text-xs md:text-lg">
          This page could not be found.
        </div>
      </div>
    </div>
  )
}
