export const safeParse = <Text extends object>(value: unknown): Text | null => {
    try {
        if (!value) return null;

        return (typeof value === "string" ? JSON.parse(value) : value) as Text;
    } catch (parseErr: unknown) {
        console.log('Data Perse is: ', (parseErr as Error).message);
        return null;
    }
}