export type Company = {
	id: number;
	name: string;
	countryCode: string;
	address: string;
	website: string;
	stockCode: string;
};

export const companies: Company[] = [
	{
		id: 1,
		name: 'TechVision Global',
		countryCode: 'US',
		address: '123 Innovation Drive, San Francisco, CA 94105',
		website: 'techvision.com',
		stockCode: 'NASDAQ:TCVG',
	},
	{
		id: 2,
		name: 'NexGen Solutions',
		countryCode: 'UK',
		address: '45 Oxford Street, London, W1D 1BW',
		website: 'nexgensolutions.co.uk',
		stockCode: 'LSE:NGS',
	},
	{
		id: 3,
		name: 'Quantum Industries',
		countryCode: 'DE',
		address: 'Hauptstrasse 56, Berlin, 10115',
		website: 'quantum-industries.de',
		stockCode: 'FWB:QIN',
	},
	{
		id: 4,
		name: 'Sunrise Technologies',
		countryCode: 'JP',
		address: '2-1-1 Marunouchi, Chiyoda-ku, Tokyo, 100-0005',
		website: 'sunrisetech.jp',
		stockCode: 'TSE:SNRT',
	},
	{
		id: 5,
		name: 'Alpine Software Group',
		countryCode: 'CH',
		address: 'Bahnhofstrasse 21, Zürich, 8001',
		website: 'alpinesoftware.ch',
		stockCode: 'SIX:ASG',
	},
	{
		id: 6,
		name: 'Oceanic Dynamics',
		countryCode: 'AU',
		address: '101 Harbour Street, Sydney, NSW 2000',
		website: 'oceanicdynamics.com.au',
		stockCode: 'ASX:ODY',
	},
	{
		id: 7,
		name: 'Nordic Innovations',
		countryCode: 'SE',
		address: 'Sveavägen 10, Stockholm, 111 57',
		website: 'nordicinnovations.se',
		stockCode: 'OMX:NINN',
	},
	{
		id: 8,
		name: 'Maple Systems',
		countryCode: 'CA',
		address: '250 University Avenue, Toronto, ON M5H 3E5',
		website: 'maplesystems.ca',
		stockCode: 'TSX:MSYS',
	},
	{
		id: 9,
		name: 'Emerald Enterprises',
		countryCode: 'IE',
		address: '25 Grafton Street, Dublin, D02 HF62',
		website: 'emeraldenterprises.ie',
		stockCode: 'EURONEXT:EME',
	},
	{
		id: 10,
		name: 'Solar Dynamics',
		countryCode: 'ES',
		address: 'Gran Vía 42, Madrid, 28013',
		website: 'solardynamics.es',
		stockCode: 'BME:SLDN',
	},
];

export default companies;
