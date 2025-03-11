import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error(`Error: ${err.message}`);
	res.status(500).json({
		message: 'Internal Server Error',
		error: process.env.NODE_ENV === 'production' ? undefined : err.message,
	});
};

export const notFound = (_req: Request, res: Response) => {
	res.status(404).json({ message: 'Resource not found' });
};
