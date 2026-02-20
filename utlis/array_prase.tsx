export const parseToArray = <Text extends object>(value: unknown): Text[] => {
    try {
        if (!value) return [];

        const parseData = typeof value === "string" ? JSON.parse(value) : value;
        return (Array.isArray(parseData) ? parseData : [parseData]) as Text[];

    } catch (parseErr: unknown) {
        console.log('Data Perse is: ', (parseErr as Error).message);
        return [];
    }
}

// export const safeParse = <T = unknown>(value: unknown): T | null => {
//     try {
//         if (!value) return null;
//         return typeof value === "string" 
//             ? JSON.parse(value) 
//             : value as T;
//     } catch {
//         return null;
//     }
// };