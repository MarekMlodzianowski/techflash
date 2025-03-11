// Configuration
const delayMs = process.env.DELAY_MS ? Number(process.env.DELAY_MS) : 250;

// Helper function to simulate API delay
export const simulateDelay = (extraDelay = 0) =>
	new Promise((resolve) => setTimeout(resolve, delayMs + extraDelay));
