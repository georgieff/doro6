const userModel = (obj, data) => {
    obj = (obj !== undefined) ? obj : {};
    const id = obj.id || '';
    const fullName = obj.displayName || '';
    const photo = (obj.photos !== undefined) ? obj.photos[0].value || '' : '';

    return {
        id: id,
        fullName: fullName,
        photo: photo,
        hasPermission: () => data.users.includes(parseInt(id, 10)),
        hasSession: () => id !== '',
    };
};

module.exports = userModel;
