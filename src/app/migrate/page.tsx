import React from 'react';

export default function MigratePage() {
    async function handleMigrate(e: any) {
        e.preventDefault();
        const resp = await fetch('/api/migrate', { method: 'POST' });
        const body = await resp.json();
        alert(JSON.stringify(body));
    }

    return (
        <main style={{ padding: 24 }}>
            <h1>Start Migration</h1>
            <form onSubmit={(e) => void handleMigrate(e)}>
                <button type="submit">Begin</button>
            </form>
        </main>
    );
}
