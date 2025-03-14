/* eslint-disable max-lines */

import type { Company } from '@shared/types';
import companies from './companies';

export type User = {
	id: number;
	name: string;
	email: string;
	country: string;
	city: string;
	phone: string;
	website: string;
	companyId: number; // Changed from string to number reference
	address: string;
};

export const users: User[] = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john.doe@example.com',
		country: 'United States',
		city: 'New York',
		phone: '555-1234',
		website: 'johndoe.com',
		companyId: 1, // TechVision Global
		address: '123 Main St, New York, NY 10001',
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane.smith@example.com',
		country: 'Canada',
		city: 'Toronto',
		phone: '555-5678',
		website: 'janesmith.com',
		companyId: 8, // Maple Systems
		address: '456 Queen St, Toronto, ON M5H 2N2',
	},
	{
		id: 20,
		name: 'Alice Johnson',
		email: 'alice.johnson@example.com',
		country: 'Australia',
		city: 'Sydney',
		phone: '555-9876',
		website: 'alicejohnson.com',
		companyId: 6, // Oceanic Dynamics
		address: '789 King St, Sydney, NSW 2000',
	},
	{
		id: 3,
		name: 'Michael Brown',
		email: 'michael.brown@example.com',
		country: 'UK',
		city: 'London',
		phone: '555-8765',
		website: 'michaelbrown.com',
		companyId: 2, // NexGen Solutions
		address: '789 Baker St, London, NW1 6XE',
	},
	{
		id: 4,
		name: 'Emily Davis',
		email: 'emily.davis@example.com',
		country: 'Germany',
		city: 'Berlin',
		phone: '555-4321',
		website: 'emilydavis.com',
		companyId: 3, // Quantum Industries
		address: '123 Alexanderplatz, Berlin, 10178',
	},
	{
		id: 5,
		name: 'David Wilson',
		email: 'david.wilson@example.com',
		country: 'France',
		city: 'Paris',
		phone: '555-6789',
		website: 'davidwilson.com',
		companyId: 1, // TechVision Global
		address: '456 Champs-Élysées, Paris, 75008',
	},
	{
		id: 6,
		name: 'Sophia Martinez',
		email: 'sophia.martinez@example.com',
		country: 'Spain',
		city: 'Madrid',
		phone: '555-9876',
		website: 'sophiamartinez.com',
		companyId: 10, // Solar Dynamics
		address: '789 Gran Via, Madrid, 28013',
	},
	{
		id: 7,
		name: 'James Anderson',
		email: 'james.anderson@example.com',
		country: 'Italy',
		city: 'Rome',
		phone: '555-5432',
		website: 'jamesanderson.com',
		companyId: 2, // NexGen Solutions
		address: '123 Via Veneto, Rome, 00187',
	},
	{
		id: 8,
		name: 'Olivia Thomas',
		email: 'olivia.thomas@example.com',
		country: 'Netherlands',
		city: 'Amsterdam',
		phone: '555-6789',
		website: 'oliviathomas.com',
		companyId: 5, // Alpine Software Group
		address: '456 Dam Square, Amsterdam, 1012',
	},
	{
		id: 9,
		name: 'William Jackson',
		email: 'william.jackson@example.com',
		country: 'Sweden',
		city: 'Stockholm',
		phone: '555-8765',
		website: 'williamjackson.com',
		companyId: 7, // Nordic Innovations
		address: '789 Drottninggatan, Stockholm, 111 60',
	},
	{
		id: 10,
		name: 'Isabella White',
		email: 'isabella.white@example.com',
		country: 'Norway',
		city: 'Oslo',
		phone: '555-4321',
		website: 'isabellawhite.com',
		companyId: 7, // Nordic Innovations
		address: '123 Karl Johans gate, Oslo, 0154',
	},
	{
		id: 11,
		name: 'Alexander Harris',
		email: 'alexander.harris@example.com',
		country: 'Denmark',
		city: 'Copenhagen',
		phone: '555-6789',
		website: 'alexanderharris.com',
		companyId: 4, // BlueWave Technologies
		address: '456 Strøget, Copenhagen, 1116',
	},
	{
		id: 12,
		name: 'Mia Clark',
		email: 'mia.clark@example.com',
		country: 'Finland',
		city: 'Helsinki',
		phone: '555-9876',
		website: 'miaclark.com',
		companyId: 9, // Arctic Solutions
		address: '789 Mannerheimintie, Helsinki, 00100',
	},
	{
		id: 13,
		name: 'Liam Johnson',
		email: 'liam.johnson@example.com',
		country: 'United States',
		city: 'Los Angeles',
		phone: '555-1235',
		website: 'liamjohnson.com',
		companyId: 5, // TechVision Global
		address: '456 Sunset Blvd, Los Angeles, CA 90028',
	},
	{
		id: 14,
		name: 'Emma Brown',
		email: 'emma.brown@example.com',
		country: 'Canada',
		city: 'Vancouver',
		phone: '555-5679',
		website: 'emmabrown.com',
		companyId: 8, // Maple Systems
		address: '789 Granville St, Vancouver, BC V6Z 1K7',
	},
	{
		id: 15,
		name: 'Noah Davis',
		email: 'noah.davis@example.com',
		country: 'UK',
		city: 'Manchester',
		phone: '555-8766',
		website: 'noahdavis.com',
		companyId: 2, // NexGen Solutions
		address: '123 Deansgate, Manchester, M3 4FN',
	},
	{
		id: 16,
		name: 'Ava Wilson',
		email: 'ava.wilson@example.com',
		country: 'Germany',
		city: 'Munich',
		phone: '555-4322',
		website: 'avawilson.com',
		companyId: 3, // Quantum Industries
		address: '456 Marienplatz, Munich, 80331',
	},
	{
		id: 17,
		name: 'Oliver Martinez',
		email: 'oliver.martinez@example.com',
		country: 'France',
		city: 'Lyon',
		phone: '555-6790',
		website: 'olivermartinez.com',
		companyId: 1, // TechVision Global
		address: '789 Rue de la République, Lyon, 69002',
	},
	{
		id: 18,
		name: 'Sophia Anderson',
		email: 'sophia.anderson@example.com',
		country: 'Spain',
		city: 'Barcelona',
		phone: '555-9877',
		website: 'sophiaanderson.com',
		companyId: 10, // Solar Dynamics
		address: '123 La Rambla, Barcelona, 08002',
	},
	{
		id: 19,
		name: 'James Thomas',
		email: 'james.thomas@example.com',
		country: 'Italy',
		city: 'Milan',
		phone: '555-5433',
		website: 'jamesthomas.com',
		companyId: 2, // NexGen Solutions
		address: '456 Via Montenapoleone, Milan, 20121',
	},
	{
		id: 20,
		name: 'Isabella Jackson',
		email: 'isabella.jackson@example.com',
		country: 'Netherlands',
		city: 'Rotterdam',
		phone: '555-6791',
		website: 'isabellajackson.com',
		companyId: 5, // Alpine Software Group
		address: '789 Coolsingel, Rotterdam, 3012',
	},
	{
		id: 21,
		name: 'William White',
		email: 'william.white@example.com',
		country: 'Sweden',
		city: 'Gothenburg',
		phone: '555-8767',
		website: 'williamwhite.com',
		companyId: 7, // Nordic Innovations
		address: '123 Avenyn, Gothenburg, 411 36',
	},
	{
		id: 22,
		name: 'Mia Harris',
		email: 'mia.harris@example.com',
		country: 'Norway',
		city: 'Bergen',
		phone: '555-4323',
		website: 'miaharris.com',
		companyId: 7, // Nordic Innovations
		address: '456 Bryggen, Bergen, 5003',
	},
	{
		id: 23,
		name: 'Alexander Clark',
		email: 'alexander.clark@example.com',
		country: 'Denmark',
		city: 'Aarhus',
		phone: '555-6792',
		website: 'alexanderclark.com',
		companyId: 4, // BlueWave Technologies
		address: '789 Store Torv, Aarhus, 8000',
	},
	{
		id: 24,
		name: 'Emily Lewis',
		email: 'emily.lewis@example.com',
		country: 'Finland',
		city: 'Tampere',
		phone: '555-9878',
		website: 'emilylewis.com',
		companyId: 9, // Arctic Solutions
		address: '123 Hämeenkatu, Tampere, 33100',
	},
	{
		id: 25,
		name: 'Benjamin Walker',
		email: 'benjamin.walker@example.com',
		country: 'United States',
		city: 'Chicago',
		phone: '555-1236',
		website: 'benjaminwalker.com',
		companyId: 1, // TechVision Global
		address: '456 Michigan Ave, Chicago, IL 60611',
	},
	{
		id: 26,
		name: 'Charlotte Hall',
		email: 'charlotte.hall@example.com',
		country: 'Canada',
		city: 'Montreal',
		phone: '555-5680',
		website: 'charlottehall.com',
		companyId: 8, // Maple Systems
		address: '789 Saint-Catherine St, Montreal, QC H3B 1B5',
	},
	{
		id: 27,
		name: 'Henry Young',
		email: 'henry.young@example.com',
		country: 'UK',
		city: 'Birmingham',
		phone: '555-8768',
		website: 'henryyoung.com',
		companyId: 2, // NexGen Solutions
		address: '123 New St, Birmingham, B2 4QA',
	},
	{
		id: 28,
		name: 'Amelia King',
		email: 'amelia.king@example.com',
		country: 'Germany',
		city: 'Hamburg',
		phone: '555-4324',
		website: 'ameliaking.com',
		companyId: 3, // Quantum Industries
		address: '456 Jungfernstieg, Hamburg, 20354',
	},
	{
		id: 29,
		name: 'Lucas Wright',
		email: 'lucas.wright@example.com',
		country: 'France',
		city: 'Marseille',
		phone: '555-6793',
		website: 'lucaswright.com',
		companyId: 1, // TechVision Global
		address: '789 La Canebière, Marseille, 13001',
	},
	{
		id: 30,
		name: 'Harper Scott',
		email: 'harper.scott@example.com',
		country: 'Spain',
		city: 'Valencia',
		phone: '555-9879',
		website: 'harperscott.com',
		companyId: 10, // Solar Dynamics
		address: '123 Plaza del Ayuntamiento, Valencia, 46002',
	},
	{
		id: 31,
		name: 'Ethan Green',
		email: 'ethan.green@example.com',
		country: 'Italy',
		city: 'Naples',
		phone: '555-5434',
		website: 'ethangreen.com',
		companyId: 2, // NexGen Solutions
		address: '456 Via Toledo, Naples, 80134',
	},
	{
		id: 32,
		name: 'Abigail Adams',
		email: 'abigail.adams@example.com',
		country: 'Netherlands',
		city: 'Utrecht',
		phone: '555-6794',
		website: 'abigailadams.com',
		companyId: 5, // Alpine Software Group
		address: '789 Oudegracht, Utrecht, 3511',
	},
	{
		id: 33,
		name: 'Daniel Baker',
		email: 'daniel.baker@example.com',
		country: 'Sweden',
		city: 'Malmo',
		phone: '555-8769',
		website: 'danielbaker.com',
		companyId: 7, // Nordic Innovations
		address: '123 Lilla Torg, Malmo, 211 34',
	},
	{
		id: 34,
		name: 'Ella Nelson',
		email: 'ella.nelson@example.com',
		country: 'Norway',
		city: 'Stavanger',
		phone: '555-4325',
		website: 'ellanelson.com',
		companyId: 7, // Nordic Innovations
		address: '456 Øvre Holmegate, Stavanger, 4006',
	},
	{
		id: 35,
		name: 'Matthew Carter',
		email: 'matthew.carter@example.com',
		country: 'Denmark',
		city: 'Odense',
		phone: '555-6795',
		website: 'matthewcarter.com',
		companyId: 4, // BlueWave Technologies
		address: '789 Vestergade, Odense, 5000',
	},
	{
		id: 36,
		name: 'Avery Mitchell',
		email: 'avery.mitchell@example.com',
		country: 'Finland',
		city: 'Espoo',
		phone: '555-9880',
		website: 'averymitchell.com',
		companyId: 7, // Nordic Innovations
		address: '123 Leppävaarankatu, Espoo, 02600',
	},
];

// Helper function to get company details for a user
export const getUserCompany = (userId: number): Company | undefined => {
	const user = users.find((u) => u.id === userId);
	if (!user) return undefined;
	return companies.find((c) => c.id === user.companyId);
};

export default users;
