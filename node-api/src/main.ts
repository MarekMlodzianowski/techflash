import express, { Request, Response, NextFunction } from 'express';

import { getUserCompany, User, users } from './users';
import { countries } from './countries';
import companies from './companies';

// Configuration
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const delayMs = process.env.DELAY_MS ? Number(process.env.DELAY_MS) : 250;

// Initialize Express app
const app = express();

// Middleware

app.use(express.json()); // Parse JSON requests

// Helper function to simulate API delay
const simulateDelay = (extraDelay = 0) =>
	new Promise((resolve) => setTimeout(resolve, delayMs + extraDelay));

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
	res.json({
		message: 'Hello API',
		version: '1.0.0',
		endpoints: ['/api/users', '/api/countries'],
	});
});

// User routes
app.get('/api/users/all', async (_req: Request, res: Response, next: NextFunction) => {
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
});

app.put('/api/users/:id', async (req: Request, res: Response, next: NextFunction) => {
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
});

app.get('/api/users/:id', async (req: Request, res: Response, next: NextFunction) => {
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
});

app.get(
	'/api/users/byCompany/:companyId',
	async (req: Request, res: Response, next: NextFunction) => {
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
	},
);

app.get('/api/companies/all', async (_req: Request, res: Response, next: NextFunction) => {
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
});

app.get('/api/companies/:id', async (req: Request, res: Response, next: NextFunction) => {
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
});

app.get(
	'/api/users/byCountry/:countryCode',
	async (req: Request, res: Response, next: NextFunction) => {
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
	},
);

app.get('/api/countries', (_req: Request, res: Response) => {
	res.json(countries);
});

app.get('/api/countries/code/:code', async (req: Request, res: Response, next: NextFunction) => {
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
});

app.get(
	'/api/companies/byCountry/:countryCode',
	async (req: Request, res: Response, next: NextFunction) => {
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
	},
);

app.get('/api/countries/:name', async (req: Request, res: Response, next: NextFunction) => {
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
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error(`Error: ${err.message}`);
	res.status(500).json({
		message: 'Internal Server Error',
		error: process.env.NODE_ENV === 'production' ? undefined : err.message,
	});
});

// Not found middleware
app.use((_req: Request, res: Response) => {
	res.status(404).json({ message: 'Resource not found' });
});

// Start server
app.listen(port, host, () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
