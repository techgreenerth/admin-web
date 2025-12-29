export default function Unauthorized() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">403</h1>
        <p>You do not have access to this page.</p>
      </div>
    </div>
  );
}
