import SideBar from "./components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <SideBar />
      {children}
    </main>
  );
}
