import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactEmail } from "@/emails/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, subject, message } = body;

		if (!name || !email || !subject || !message) {
			return NextResponse.json({ error: "All fields are required" }, { status: 400 });
		}

		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: ["aleexgvieira@gmail.com"],
			subject: `TudoHardware.com - ${subject}`,
			react: ContactEmail({ name, email, subject, message }),
		});

		if (error) {
			return NextResponse.json({ error: "Error to send email" }, { status: 500 });
		}

		return NextResponse.json({ success: true, data });
	} catch {
		return NextResponse.json({ error: "Server Error" }, { status: 500 });
	}
}
