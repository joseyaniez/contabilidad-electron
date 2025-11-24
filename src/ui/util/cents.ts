
function toCents(cant: number): number {
    return Math.round(cant * 100);
}

function sumPrices(...prices: number[]): number {
    return (prices.reduce((total, price) => total + toCents(price), 0))/100;
}

function multiplyPrice(price: number, factor: number): number {
    return (toCents(price) * factor)/100;
}

export { toCents, sumPrices, multiplyPrice };

