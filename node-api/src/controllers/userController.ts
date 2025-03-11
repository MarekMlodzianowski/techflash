import type { ReladedUsersResponse, User, UserListResponse } from '@shared/types';
import { NextFunction, Request, Response } from 'express';
import { countries } from '../countries';
import { getUserCompany, users } from '../users';
import { simulateDelay } from '../utils/helpers';

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<UserListResponse[]>> => {
	try {
		await simulateDelay(200);
		const ids = users
			.map((user) => ({
				id: user.id,
				name: user.name,
			}))
			.sort((a, b) => a.id - b.id);

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
		await simulateDelay(300);
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return res.status(400).json({ message: 'Invalid user ID format' });
		}

		const targetUser = users.find((user) => user.id === id);

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
		await simulateDelay(150);
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return res.status(400).json({ message: 'Invalid user ID format' });
		}

		const targetUser = users.find((user) => user.id === id);

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
		await simulateDelay(100);
		const companyId = Number(req.params.companyId);

		if (isNaN(companyId)) {
			return res.status(400).json({ message: 'Invalid company ID format' });
		}

		const usersByCompany = users.filter((user) => getUserCompany(user.id)?.id === companyId);

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

		const usersByCountry = users
			.filter((user) => user.country === targetCountry.name)
			.map((user) => {
				return {
					...user,
					company: getUserCompany(user.id)?.name ?? '-',
				};
			});

		res.json(usersByCountry);
	} catch (error) {
		console.log(error);
		next(error);
	}
};
