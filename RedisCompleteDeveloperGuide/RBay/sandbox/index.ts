import 'dotenv/config';
import { client } from '../src/services/redis';

const setObjectInHSet = async () => {
	const carObj = {
		color: 'red',
		year: 1950
	};
	return client.hSet('car', carObj);
};

const getObjectFromHGetAll = async (key) => {
	return client.hGetAll(key);
};

const run = async () => {
	await setObjectInHSet();
	let cachedData = await getObjectFromHGetAll('car');
	console.log('Cached data: ', cachedData);

	cachedData = await getObjectFromHGetAll('car1');

	if (!cachedData) {
		// This will never work cachedData is always an object
		console.log('Cached data: ', cachedData);
		console.log('No data found in cache');
	}

	if (Object.keys(cachedData).length === 0) {
		console.log('Cached data: ', cachedData);
		console.log('No data found in cache');
	}
};
run();
