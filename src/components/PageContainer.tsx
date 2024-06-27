export const PageContainer: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return (
      <section className="max-w-[1200px] w-screen flex flex-col mx-auto min-h-screen  ">
        {children}
      </section>
    );
  };
  