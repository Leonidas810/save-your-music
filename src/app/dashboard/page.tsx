import React from 'react';

export default function DashboardPage() {
  return (
    <main style={{padding: 24}}>
      <h1>Dashboard</h1>
      <p>Connect your accounts and start migrating playlists.</p>
      <ul>
        <li><a href="/api/auth/spotify">Connect Spotify</a></li>
        <li><a href="/api/auth/youtube">Connect YouTube</a></li>
      </ul>
      <p>
        <a href="/migrate">Start migration</a>
      </p>
    </main>
  );
}
