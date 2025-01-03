import './globals.css';

export const metadata = {
  title: "Restaurant Booking",
  description: "Book your table easily and quickly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
