import Skeleton from "../ui/Skeleton";

const SingleProductSkeleton = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDE IMAGES SKELETON */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-4 mb-4">
              <Skeleton className="w-full h-96" />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-full h-24" />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE PRODUCT INFO */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />

              {/* COLORS */}
              <div className="flex gap-3 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-10 h-10 rounded-full" />
                ))}
              </div>

              {/* QUANTITY */}
              <Skeleton className="h-10 w-40" />

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 w-12" />
              </div>

              {/* FEATURES */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-5 w-40" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-12 bg-white rounded-xl shadow-md">
          <div className="border-b border-gray-200 flex">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-32 m-2" />
            ))}
          </div>

          <div className="p-6 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductSkeleton;
