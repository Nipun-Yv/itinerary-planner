import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locationId = searchParams.get("locationId");

  try {
    const hotels = await prisma.hotels.findMany({
      where: {
        ...(locationId ? { locationId } : {}),
      },
      orderBy: { price: 'asc' },
    });

    return NextResponse.json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
