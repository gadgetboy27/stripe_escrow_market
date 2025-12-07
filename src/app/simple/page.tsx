export default function SimplePage() {
  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>✅ Build Works!</h1>
      <p>If you can see this, the Vercel build is working.</p>
      <p>Build time: {new Date().toISOString()}</p>
    </div>
  );
}
