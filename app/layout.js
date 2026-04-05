export const metadata = {
  title: "Hey Syria",
  description: "Interactive cinematic tourism experience for Syria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
