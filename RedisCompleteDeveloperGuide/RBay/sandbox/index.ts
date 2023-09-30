import 'dotenv/config';
import { client } from '../src/services/redis';

const setObjectInHSet = async () => {
	// const carObj = {
	// 	color: 'red',
	// 	year: 1950
	// };
	const carObj = {
		color: 'red',
		year: 1950,
		engine: { cylinder: 2 }, // nested object will not be array it will get stringified and stored as string and will be returned as string engine: '[object Object]',
		owner: null || '', // we cannot do JSON.stringify on null so this will throw error so to save this we have to use ''
		number: undefined || '' // we cannot do JSON.stringify on undefined so this will throw error so to save this we have to use ''
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
