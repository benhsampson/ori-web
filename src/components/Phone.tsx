type Props = {
  children: React.ReactNode;
};

export const Phone = ({ children }: Props) => {
  return (
    <div className="h-[45.5rem] w-[21rem] rounded-xl bg-neutral-800 p-5">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        {children}
      </div>
    </div>
  );
};
