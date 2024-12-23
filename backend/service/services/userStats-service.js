import Ledger from "./../models/ledgers.js"

export const userStats = async (ownerHashId) => {
    let serviceData = {}
    const now = new Date();
    const current_year = now.getFullYear();
    const current_month = now.getMonth();
    const ledgerData = await Ledger.find({ 'event.owner.user.userHashId': ownerHashId });
    ledgerData.map((e) => {
        const date = new Date(e?.eventBookedDate);
        const event_type = e.event.eventType;

        if (date.getFullYear() === current_year && date.getMonth() === current_month) {
            const day = date.getDate()
            if (!serviceData[event_type]) {
                serviceData[event_type] = new Array(31).fill(0);
            }
            serviceData[event_type][day - 1] += 1
        }
    })
    // let serviceData = [...dailyusers]
    const formattedResult = Object.entries(serviceData).map(([eventType, usageData]) => ({
        serviceName: eventType,
        usageData,
    }));
    // console.log(formattedResult);
    return formattedResult;
};