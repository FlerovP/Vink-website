import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "logs");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const entry = {
      ...body,
      ip:
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "unknown",
      receivedAt: new Date().toISOString(),
    };

    await fs.mkdir(LOG_DIR, { recursive: true });

    const date = new Date().toISOString().slice(0, 10);
    const logFile = path.join(LOG_DIR, `${date}.jsonl`);

    await fs.appendFile(logFile, JSON.stringify(entry) + "\n");

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
