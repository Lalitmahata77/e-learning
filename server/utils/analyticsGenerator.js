// import { model,Document } from "mongoose";

// export async function generateAnalytics12Month() {
//     const last12Month = [];
//     const currentDate = new Date();
//     currentDate.setDate(currentDate.getDate() + 1);
//     for(let i = 11; i>=0; i--){
//         const endDate = new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             currentDate.getDate() - i * 28
//         );
//         const startDate = new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             currentDate.getDate() * 28
//         );
//         const monthYear = endDate.toLocaleString("default",{
//             day:"numeric",
//             month:"short",
//             year:"numeric"
//         });
//         const count = await model.countDocuments({
//             createdAt : {
//                 $gte : startDate,
//                 $lt : endDate
//             }
//         });
//         last12Month.push({month : monthYear,count})
//     }
//     return {last12Month}
// }

export async function generateAnalytics12Month(Model) {
    const last12Month = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    const promises = [];

    for (let i = 11; i >= 0; i--) {
        const endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );
        endDate.setMonth(endDate.getMonth() - i);

        const startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - 1);

        const monthYear = endDate.toLocaleString("default", {
            month: "short",
            year: "numeric"
        });

        promises.push(
            Model.countDocuments({
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            }).then(count => ({ month: monthYear, count }))
        );
    }

    const results = await Promise.all(promises);
    return { last12Month: results };
}
