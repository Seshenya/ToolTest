export const useAuthUser = () => {
    const { user, isAuthenticated } = {
        user: {
            role: 'user',
        },
        isAuthenticated: false
    };
    return {
        isAuthenticated,
        user: user,
    };
};