export const logger = {
    info: (...args: any[]) => console.info('[info]', ...args),
    warn: (...args: any[]) => console.warn('[warn]', ...args),
    error: (...args: any[]) => console.error('[error]', ...args),
};

export default logger;
