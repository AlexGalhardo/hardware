"use server";

import { type ContactResult, sendContact } from "@/lib/contact";

export async function submitContact(_previous: ContactResult | null, form: FormData): Promise<ContactResult> {
	return sendContact(Object.fromEntries(form));
}
