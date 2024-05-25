import ProtectedRoute from '@/app/protected-route';

export default function Home() {
  return (
    <ProtectedRoute>
      <main>
        <h1>MyToolTracker</h1>
      </main>
    </ProtectedRoute>
  );
}