import './global.css'
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export const metadata = {
  title: "Freebbble",
  description: "Showcase and discover remarable developer projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
