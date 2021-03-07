import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { Cache, CacheType } from "./types/cache";

const resolveCachePath = (type: CacheType) => {
	const base = `${__dirname}/../../cache/`;

	switch (type) {
		case "ANI_ANIME":
			return base + "ani-animelist.json";
		case "ANI_MANGA":
			return base + "ani-mangalist.json";
		case "MAL_ANIME":
			return base + "mal-animelist.json";
		case "MAL_MANGA":
			return base + "mal-mangalist.json";
	}
};

export const writeCache = (cache: Cache): void => {
	const path = resolveCachePath(cache.type);

	writeFileSync(path, JSON.stringify(cache), {
		encoding: "utf-8",
	});
};

export const readCache = (type: CacheType): Cache | false => {
	const path = resolveCachePath(type);

	if (!existsSync(path)) return false;

	return JSON.parse(readFileSync(path, "utf-8"));
};