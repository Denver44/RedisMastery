import { client } from '$services/redis';

const cacheRoutes = ['/about', '/contact', '/auth/signin', 'auth/signup'];

export const getCachedPage = (route: string) => {
	if (cacheRoutes.includes(route)) {
		return client.get('pagecache#' + route);
	}
	return null;
};

export const setCachedPage = (route: string, page: string) => {
	if (cacheRoutes.includes(route)) {
		return client.set('pagecache#' + route, page, {
			EX: 2
		});
	}
};
