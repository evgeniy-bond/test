export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div></div>use pages:
      <ul>
        <li>/address/:address</li>
        <li>/address/:address/:blockchain/:txId</li>
      </ul>
    </main>
  );
}
