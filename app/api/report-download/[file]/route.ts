import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ file: string }> }
) {
    const { file } = await params;
    const fileName = decodeURIComponent(file);
    const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL;

    if (!mediaUrl || !fileName) {
        return new NextResponse("Report file not found", { status: 404 });
    }

    const reportUrl = `${mediaUrl}/uploads/report/${encodeURIComponent(fileName)}`;
    const response = await fetch(reportUrl, { cache: "no-store" });

    if (!response.ok || !response.body) {
        return new NextResponse("Report file not found", { status: 404 });
    }

    return new NextResponse(response.body, {
        status: 200,
        headers: {
            "Content-Type": response.headers.get("content-type") || "application/pdf",
            "Content-Disposition": `attachment; filename="${fileName.replace(/"/g, "")}"`,
        },
    });
}
