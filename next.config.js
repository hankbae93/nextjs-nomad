/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;

const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/contact",
				destination: "/form",
				permanent: false,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: "/api/movies",
				destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
			},
			{
				source: "/api/movies/:id",
				destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}&language=en-US&page=1`,
			},
		];
	},
};

module.exports = nextConfig;
