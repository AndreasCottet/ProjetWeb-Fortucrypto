export function kFormatter(num) {
    if (num / 1000000000 > 1) {
        return (num / 1000000000).toFixed(2) + 'B';
    } else if (num / 1000000 > 1) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num / 1000 > 1) {
        return (num / 1000).toFixed(2) + 'K';
    } else {
        return num;
    }
}