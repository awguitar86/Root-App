function generateUidCounter () {
    let id = 1;
    return () => id++;
}

const getUid = generateUidCounter ();

export {
    getUid,
    generateUidCounter,
}