import { NextResponse } from 'next/server';

export async function POST() {
    // Placeholder: enqueue migration job or start migration flow.
    const payload = { status: 'started', jobId: 'local-1' };
    return NextResponse.json(payload, { status: 202 });
}
