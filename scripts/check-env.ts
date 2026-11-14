// First step of every build: refuses a malformed environment.
import { envProblems } from "../lib/env";

const problems = envProblems(process.env);

if (problems.length) {
	console.error(`Variáveis de ambiente com problema (${problems.length}):\n- ${problems.join("\n- ")}`);
	console.error("Veja .env.example.");
	process.exit(1);
}
console.log("Variáveis de ambiente conferidas.");
