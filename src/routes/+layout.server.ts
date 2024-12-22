export const load = async ({ locals }) => {
	return { isLogged: Boolean(locals.user) };
};
