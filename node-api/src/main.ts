import express from 'express';

// Import routes
import companyRoutes from './routes/companyRoutes';
import countryRoutes from './routes/countryRoutes';
import userRoutes from './routes/userRoutes';

// Import middleware
import { errorHandler, notFound } from './middleware/errorHandler';

// Configuration
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Root endpoint
app.get('/', (req, res) => {
	res.json({
		message: 'Hello API',
		version: '1.0.0',
		endpoints: [
			'/api/users',
			'/api/countries',
			'/api/companies',
		],
	});
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/countries', countryRoutes);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFound);

// Start server
app.listen(port, host, () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
