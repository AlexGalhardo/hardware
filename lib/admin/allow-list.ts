/** True for a Google-verified e-mail that is on the comma-separated allow list (ADMIN_EMAILS). */
export function isAllowedAdmin(email: string, verified: boolean, allowList: string): boolean {
	const allowed = allowList
		.split(",")
		.map((entry) => entry.trim().toLowerCase())
		.filter(Boolean);
	return verified && allowed.includes(email.trim().toLowerCase());
}
