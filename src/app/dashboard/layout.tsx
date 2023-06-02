import SideBar from "./components/sidebar/SideBar";

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
