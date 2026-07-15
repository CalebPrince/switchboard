export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 items-center justify-center bg-cream px-4 py-16">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
