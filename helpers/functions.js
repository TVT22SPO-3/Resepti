export const convertFireBaseTimeStampToJS = (time) => {
    if (time!== null && time !== undefined) {
        const fireBaseTime = new Date (
            time.seconds * 1000 + time.nanoseconds / 100000,
        );
        return fireBaseTime.getDate() + '.' +
        (fireBaseTime.getMonth() + 1) + '.' +
        fireBaseTime.getFullYear() + ' ' +
        fireBaseTime.getHours() + '.' +
        String(fireBaseTime.getMinutes()).padStart(2,'0') + '.' +
        String(fireBaseTime.getSeconds()).padStart(2,'0');
    }
}