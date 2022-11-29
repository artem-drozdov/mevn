export const formateRoles = (user) => {
    const authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }

    return authorities;
};
