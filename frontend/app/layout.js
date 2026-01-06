import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "Guideloom",
  description: "Mentor-intern AI assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50">
          <header className="border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
              <div className="font-semibold text-slate-900">Guideloom</div>
              <NavBar />
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
