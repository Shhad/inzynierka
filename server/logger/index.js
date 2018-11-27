/* eslint-disable no-console */

'use strict';

export const prefix = p => ({
    log: (...str) => { console.log(p, 'LOG:', ...str); },
    warn: (...str) => { console.warn(p, 'WARN:', ...str); },
    error: (...str) => { console.error(p, 'ERROR:', ...str); }
});
