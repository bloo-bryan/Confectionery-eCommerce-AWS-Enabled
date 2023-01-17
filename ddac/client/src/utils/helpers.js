export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number / 100)
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])
    if (type === 'colors') {
        unique = unique.flat()
    }
    return ['all', ...new Set(unique)]
}

export function generateSKU() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let sku = '';

    for (let i = 0; i < 8; i++) {
        sku += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return sku;
}


