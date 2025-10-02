export const BooleanEnum = {
    true: 'true',
    false: 'false'
};

export function getBooleanEnum() {
    return Object.values(BooleanEnum);
}

export function getBooleanEnumDisplayName(type) {
    const displayNames = {
        [BooleanEnum.true]: 'Benar',
        [BooleanEnum.false]: 'Salah'
    };
    return displayNames[type] || type;
}