import fs from "fs";

type Bool = boolean | null;

function pickNumber(text: string, regex: RegExp): number | null {
	const m = text.match(regex);
	if (!m) return null;
	return Number(m[1].replace(",", "."));
}

function pickBool(text: string, label: string): Bool {
	const r = new RegExp(`${label}[\\s\\S]{0,40}(Sim|Não)`, "i");
	const m = text.match(r);
	if (!m) return null;
	return m[1].toLowerCase() === "sim";
}

function pickText(text: string, label: string): string | null {
	const r = new RegExp(`${label}[\\s\\S]{0,40}\\n?(.+)`, "i");
	const m = text.match(r);
	return m?.[1]?.trim() ?? null;
}

function slugify(v: string) {
	return v.toLowerCase().replace(/\s+/g, "-");
}

const raw = fs.readFileSync(process.argv[2], "utf8");

const brand = pickText(raw, "Marca") ?? "";
const model = pickText(raw, "Modelo\\n") ?? "";
const detailedModel = pickText(raw, "Modelo detalhado") ?? model;
const color = pickText(raw, "Cor") ?? null;

const width = pickNumber(raw, /Largura x Profundidade x Altura\s*([\d.,]+)/);
const depth = pickNumber(raw, /x\s*([\d.,]+)\s*cm\s*x/);
const height = pickNumber(raw, /x\s*([\d.,]+)\s*m/)
	? pickNumber(raw, /x\s*([\d.,]+)\s*m/)! * 100
	: pickNumber(raw, /x\s*([\d.,]+)\s*cm/);

const totalCapacity = pickNumber(raw, /Capacidade total\s*([\d.,]+)/);
const fridgeCapacity = pickNumber(raw, /Capacidade da geladeira.*?([\d.,]+)/);
const freezerCapacity = pickNumber(raw, /Capacidade do freezer.*?([\d.,]+)/);

const freezerShelves = pickNumber(raw, /Quantidade de prateleiras do freezer\s*([\d]+)/);
const fridgeShelves = pickNumber(raw, /Quantidade de prateleiras da geladeira\s*([\d]+)/);
const freezerDrawers = pickNumber(raw, /Quantidade de gavetas do freezer\s*([\d]+)/);

const defrost = raw.toLowerCase().includes("frost free")
	? "frost-free"
	: raw.toLowerCase().includes("cycle")
		? "cycle-defrost"
		: "manual";

const json = {
	id: slugify(detailedModel || model),
	name: model,
	brand,
	model,
	detailedModel,
	color,
	category: "geladeiras",
	image: "<cole_a_imagem_aqui>",
	mercadolivreUrl: "<cole_o_link_aqui>",
	specs: {
		specs: {
			totalCapacityL: totalCapacity,
			fridgeCapacityL: fridgeCapacity,
			freezerCapacityL: freezerCapacity,
			widthCm: width,
			depthCm: depth,
			heightCm: height,
			weightKg: pickNumber(raw, /Peso\s*([\d.,]+)/),
			doors: pickNumber(raw, /Quantidade de portas\s*([\d]+)/),
			defrostType: defrost,
			energyRating: pickText(raw, "Eficiência energética Brasil"),
			inverter: pickBool(raw, "Com tecnologia inverter"),
			controlPanel: raw.toLowerCase().includes("digital")
				? "digital"
				: raw.toLowerCase().includes("táctil")
					? "táctil"
					: "mecânico",
			temperatureLevels: pickNumber(raw, /níveis de temperatura\s*([\d]+)/),
			freezerLocation: raw.toLowerCase().includes("superior") ? "superior" : "inferior",
			freezerShelves,
			fridgeShelves,
			freezerDrawers,
			iceMaker: pickBool(raw, "fabricador de gelo"),
			wifi: pickBool(raw, "Wi-?Fi"),
			doorAlarm: pickBool(raw, "alarme de porta aberta"),
			waterDispenser: pickBool(raw, "dispensador de água"),
			iceDispenser: pickBool(raw, "dispensador de gelo"),
			fastFreeze: pickBool(raw, "congelação rápida"),
			deodorizerFilter: pickBool(raw, "filtro desodorizador"),
			reversibleDoors: pickBool(raw, "portas reversíveis"),
			internalLight: pickBool(raw, "luz interior"),
			multiAirFlow: pickBool(raw, "multi air flow"),
			bottleRack: pickBool(raw, "porta garrafas"),
			canRack: pickBool(raw, "porta latas"),
			eggTray: pickBool(raw, "porta ovos"),
			multiPurposeDrawer: pickBool(raw, "gaveta multiúso"),
			vegetableDrawer: pickBool(raw, "gaveta de vegetais"),
		},
		ratings: {
			costBenefit: null,
			efficiency: 8,
			internalSpace: 8,
			buildQuality: 8,
			features: 7,
		},
	},
};

console.log(JSON.stringify(json, null, 2));
