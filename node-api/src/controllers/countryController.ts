import type { Country } from '@shared/types';
import { NextFunction, Request, Response } from 'express';
import { countries } from '../countries';
import { simulateDelay } from '../utils/helpers';

export const getAllCountries = (_req: Request, res: Response) => {
	res.json(countries);
};

export const getCountryByCode = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const code = req.params.code.toUpperCase();

		if (!code || code.length !== 2) {
			return res.status(400).json({ message: 'Invalid country code format' });
		}

		const country = countries.find((country) => country.code.toUpperCase() === code);

		await simulateDelay(200);

		if (!country) {
			return res.status(404).json({ message: 'Country not found' });
		}

		res.json(country);
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
		const name = req.params.name;

		if (!name || name.length < 2) {
			return res.status(400).json({ message: 'Invalid country name' });
		}

		const country = countries.find((country) => country.name.toLowerCase() === name.toLowerCase());

		await simulateDelay(200);

		if (!country) {
			return res.status(404).json({ message: 'Country not found' });
		}

		res.json(country);
	} catch (error) {
		next(error);
	}
};
