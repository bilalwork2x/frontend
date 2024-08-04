export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="justify-center flex">
      <div className=" w-[350px] shadow mt-20 p-5 rounded">
        {children}
      </div>
    </div>
  );
}