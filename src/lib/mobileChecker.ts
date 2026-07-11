export const normalizePhoneNumber = (phone: string):string => {
    const value = phone.trim().replace(/\s/g, '');

    if (value.startsWith('+989'))  {
        return value;
    }
    if (value.startsWith('989'))  {
        return `${value}`;
    }
    if (value.startsWith('09')){
        return `+98${value.slice(1)}`;
    }
    throw new Error('شماره موبایل معتبر نیست!');
}