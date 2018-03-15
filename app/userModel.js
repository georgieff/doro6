const userModel = (obj) => {
    obj = (obj !== undefined) ? obj : {};
    const id = obj.id || '';
    const fullName = obj.displayName || '';
    const photo = (obj.photos !== undefined) ? obj.photos[0].value || '' : '';
    return {
        id: id,
        fullName: fullName,
        photo: photo,
        hasPermission: () => true,
        hasSession: () => id !== '',
    };
};

module.exports = userModel;
