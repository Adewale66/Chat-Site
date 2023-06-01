const ProvidersSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {" "}
      <div className="flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute uppercase px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          or
        </span>
      </div>
      <div className="flex items-center gap-4 p-3">{children}</div>
    </>
  );
};

export default ProvidersSection;
