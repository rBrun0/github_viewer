import { colorDictionary } from "@/lib/color-dictionary";

export type PastelColors = {
	backgroundColor: string;
	color: string;
	borderColor: string;
};

function pastelFromHex(hex: string): PastelColors {
	return {
		backgroundColor: `light-dark(color-mix(in oklab, ${hex} 18%, white), color-mix(in oklab, ${hex} 32%, black))`,
		color: `light-dark(color-mix(in oklab, ${hex} 72%, black), color-mix(in oklab, ${hex} 45%, white))`,
		borderColor: `light-dark(color-mix(in oklab, ${hex} 32%, white), color-mix(in oklab, ${hex} 42%, black))`,
	};
}

function pastelFromHash(text: string): PastelColors {
	let hash = 0;
	for (let i = 0; i < text.length; i++) {
		hash = text.charCodeAt(i) + ((hash << 5) - hash);
		hash |= 0;
	}

	const hue = Math.abs(hash) % 360;

	return {
		backgroundColor: `light-dark(oklch(0.93 0.05 ${hue}), oklch(0.3 0.06 ${hue}))`,
		color: `light-dark(oklch(0.4 0.1 ${hue}), oklch(0.88 0.06 ${hue}))`,
		borderColor: `light-dark(oklch(0.85 0.06 ${hue}), oklch(0.4 0.06 ${hue}))`,
	};
}

/**
 * Converte um texto em cores pastel estáveis.
 * Se o texto (lowercase) existir em `colorDictionary`, usa a cor conhecida;
 * caso contrário, gera um pastel a partir do hash.
 */
export function pastelFromText(text: string): PastelColors {
	const key = text.toLowerCase();
	const known = colorDictionary[key];

	if (known) {
		return pastelFromHex(known);
	}

	return pastelFromHash(key);
}
