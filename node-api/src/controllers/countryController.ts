import type { Country } from '@shared/types';
import { NextFunction, Request, Response } from 'express';
import { countries } from '../countries';
import { simulateDelay } from '../utils/helpers';

export const getAllCountries = async (
	req: Request,
	res: Response,
): Promise<Response<Country[]>> => {
	await simulateDelay();
	return res.json(countries);
};

export const getCountryByCode = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<Country[]>> => {
	try {
		await simulateDelay(200);
		const code = req.params.code.toUpperCase();

		if (!code || code.length !== 2) {
			return res.status(400).json({ message: 'Invalid country code format' });
		}

		const targetCountry = countries.find((country) => country.code.toUpperCase() === code);

		if (!targetCountry) {
			return res.status(404).json({ message: 'Country not found' });
		}

		return res.json(targetCountry);
	} catch (error) {
		next(error);
	}
};

export const getCountryByName = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<Country[]>> => {
	try {
		await simulateDelay(200);
		const name = req.params.name;

		if (!name || name.length < 2) {
			return res.status(400).json({ message: 'Invalid country name' });
		}

		const targetCountry = countries.find(
			(country) => country.name.toLowerCase() === name.toLowerCase(),
		);

		if (!targetCountry) {
			return res.status(404).json({ message: 'Country not found' });
		}

		return res.json(targetCountry);
	} catch (error) {
		next(error);
	}
};
