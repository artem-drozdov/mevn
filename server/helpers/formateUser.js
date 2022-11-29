import { formateRoles } from "./formateRoles.js";

export const formateUser = (user) => {
    const authorities = formateRoles(user);

    return {
        id: user.id,
        avatar: user.avatar,
        username: user.username,
        email: user.email,
        roles: authorities,
        createdAt: user.createdAt,
    };
};
