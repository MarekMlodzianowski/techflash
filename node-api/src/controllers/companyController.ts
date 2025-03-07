import { NextFunction, Request, Response } from 'express';
import companies from '../companies';
import { countries } from '../countries';
import { getUserCompany } from '../users';
import { simulateDelay } from '../utils/helpers';

export const getAllCompanies = async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const companyList = companies
			.map((company) => ({
				id: company.id,
				name: company.name,
			}))
			.sort((a, b) => a.id - b.id);

		await simulateDelay();
		res.json(companyList);
	} catch (error) {
		next(error);
	}
};

export const getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return res.status(400).json({ message: 'Invalid company ID format' });
		}

		const company = getUserCompany(id);
		await simulateDelay();

		if (!company) {
			return res.status(404).json({ message: 'Company not found' });
		}

		res.json(company);
	} catch (error) {
		next(error);
	}
};

export const getCompaniesByCountry = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const countryCode = req.params.countryCode as string;

		if (!countryCode || countryCode.length !== 2) {
			return res.status(400).json({ message: 'Invalid country code format' });
		}

		const country = countries.find(
			(country) => country.code.toLowerCase() === countryCode.toLowerCase(),
		);

		if (!country) {
			return res.status(404).json({ message: 'Country not found' });
		}

		const companiesByCountry = companies.filter((item) => item.countryCode === countryCode);

		await simulateDelay(100);

		res.json(companiesByCountry);
	} catch (error) {
		next(error);
	}
};
