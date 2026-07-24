import { NextResponse } from "next/server";
import portfolioData from "../chat/portfolioData.json";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format");

    if (format === "csv") {
        // convert portfolio json entries to csv
        const csvRows = [
            ["Category", "Title", "Description"],
            ...portfolioData.projects.map((p) => [
                `"Project"`,
                `"${p.title.replace(/"/g, '""')}"`,
                `"${p.description.replace(/"/g, '""')}"`
            ])
        ];
        const csvContent = csvRows.map((e) => e.join(",")).join("\n");

        return new NextResponse(csvContent, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": 'attachment; filename="KJ_Portfolio.csv"',
            },
        });
    }

    return new NextResponse("Invalid format", { status: 400 });
}