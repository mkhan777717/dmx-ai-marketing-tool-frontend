export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-bold">DMX AI Marketing Tool</h2>
      <div className="flex items-center gap-4">
        <span>Notifications</span>
        <span>Profile</span>
      </div>
    </header>
  );
}