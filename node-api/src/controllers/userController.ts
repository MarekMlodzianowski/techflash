import type { ReladedUsersResponse, User } from '@shared/types';
import { NextFunction, Request, Response } from 'express';
import { countries } from '../countries';
import { getUserCompany, users } from '../users';
import { simulateDelay } from '../utils/helpers';

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<User[]>> => {
	try {
		const ids = users
			.map((user) => ({
				id: user.id,
				name: user.name,
			}))
			.sort((a, b) => a.id - b.id);

		await simulateDelay(200);
		return res.json(ids);
	} catch (error) {
		next(error);
	}
};

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<User>> => {
	try {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return res.status(400).json({ message: 'Invalid user ID format' });
		}

		const targetUser = users.find((user) => user.id === id);
		await simulateDelay(300);

		if (!targetUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json({
			...targetUser,
			company: getUserCompany(targetUser.id)?.name ?? '-',
		});
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<User>> => {
	try {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return res.status(400).json({ message: 'Invalid user ID format' });
		}

		const targetUser = users.find((user) => user.id === id);
		await simulateDelay(150);

		if (!targetUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		Object.entries(req.body).forEach(([key, value]) => {
			if (key in targetUser) {
				targetUser[key] = value;
			}
		});

		res.json({
			...targetUser,
			company: getUserCompany(targetUser.id)?.name ?? '-',
		});
	} catch (error) {
		next(error);
	}
};

export const getUsersByCompany = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<ReladedUsersResponse>> => {
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

export const getUsersByCountry = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<User[]>> => {
	try {
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

		const usersByCountry = users
			.filter((user) => user.country === targetCountry.name)
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
