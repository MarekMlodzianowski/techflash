import { NextFunction, Request, Response } from 'express';
import companies from '../companies';
import { countries } from '../countries';
import { getUserCompany } from '../users';
import { simulateDelay } from '../utils/helpers';
import { type Company, CompanyListResponse } from '@shared/types';

export const getAllCompanies = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<CompanyListResponse[]>> => {
	try {
		await simulateDelay();
		const companyList = companies
			.map((company) => ({
				id: company.id,
				name: company.name,
			}))
			.sort((a, b) => a.id - b.id);

		return res.json(companyList);
	} catch (error) {
		next(error);
	}
};

export const getCompanyById = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<Company>> => {
	try {
		await simulateDelay(2000);
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return res.status(400).json({ message: 'Invalid company ID format' });
		}

		const company = getUserCompany(id);

		if (!company) {
			return res.status(404).json({ message: 'Company not found' });
		}

		return res.json(company);
	} catch (error) {
		next(error);
	}
};

export const getCompaniesByCountry = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<Company[]>> => {
	try {
		await simulateDelay(100);
		const countryCode = req.params.countryCode as string;

		if (!countryCode || countryCode.length !== 2) {
			return res.status(400).json({ message: 'Invalid country code format' });
		}

		const targetCountry = countries.find(
			(country) => country.code.toLowerCase() === countryCode.toLowerCase(),
		);

		if (!targetCountry) {
			return res.status(404).json({ message: 'Country not found' });
		}

		const companiesByCountry = companies.filter((item) => item.countryCode === countryCode);

		return res.json(companiesByCountry);
	} catch (error) {
		next(error);
	}
};
