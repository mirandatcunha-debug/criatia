export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-section dark:bg-[#1a1a2e] flex items-center justify-center p-4">
      {children}
    </div>
  );
}
