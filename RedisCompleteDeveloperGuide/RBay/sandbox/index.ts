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
};
run();
