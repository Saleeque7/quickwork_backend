export function maskEmail(email) {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 5) {
        return `${localPart}...@${domain}`;
    }
    return `${localPart.slice(0, 3)}...${localPart.slice(-2)}@${domain}`;
}
