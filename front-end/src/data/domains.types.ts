import { TDomains } from "../api/types";
export type TThemes = {
	[domain: string]: {
		"--domain-header": string;
		"--domain-primary-button": string;
		"--domain-primary-button-hover": string;
		"--domain-nav-links": string;
		"--domain-nav-links-active": string;
		"--previous-header": string;
		"--previous-nav-links": string;
		"--previous-primary-button": string;
	};
};

export type TDomainsJson = {
	domains: TDomains;
	themes: TThemes;
};
