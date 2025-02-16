
import { NextResponse } from "next/server";

export async function POST() {
    const response = new NextResponse();
    response.cookies.delete("token");
    return response
}