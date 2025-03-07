import { NextFunction, Request, Response } from 'express';
import { getUserCompany, users } from '../users';
import { simulateDelay } from '../utils/helpers';

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const ids = users
			.map((user) => ({
				id: user.id,
				name: user.name,
			}))
			.sort((a, b) => a.id - b.id);

		await simulateDelay();
		res.json(ids);
	} catch (error) {
		next(error);
	}
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return res.status(400).json({ message: 'Invalid user ID format' });
		}

		const user = users.find((user) => user.id === id);
		await simulateDelay();

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json({
			...user,
			company: getUserCompany(user.id)?.name ?? '-',
		});
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return res.status(400).json({ message: 'Invalid user ID format' });
		}

		const user = users.find((user) => user.id === id);
		await simulateDelay();

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		Object.entries(req.body).forEach(([key, value]) => {
			if (key in user) {
				user[key] = value;
			}
		});

		res.json({ message: 'User name updated successfully', user });
	} catch (error) {
		next(error);
	}
};

export const getUsersByCompany = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const companyId = Number(req.params.companyId);

		if (isNaN(companyId)) {
			return res.status(400).json({ message: 'Invalid company ID format' });
		}

		const usersByCompany = users.filter((user) => getUserCompany(user.id)?.id === companyId);
		await simulateDelay(100);

		if (usersByCompany.length === 0) {
			return res.status(404).json({ message: 'No users found for this company' });
		}

		res.json({
			company: getUserCompany(companyId)?.name ?? '-',
			userCount: usersByCompany.length,
			users: usersByCompany,
		});
	} catch (error) {
		next(error);
	}
};

export const getUsersByCountry = async (req: Request, res: Response, next: NextFunction) => {
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

		const usersByCountry = users
			.filter((user) => user.country === country.name)
			.map((user) => {
				return {
					...user,
					company: getUserCompany(user.id)?.name ?? '-',
				};
			});
		await simulateDelay(100);

		res.json(usersByCountry);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

// Missing import - need to add it
import { countries } from '../countries';
