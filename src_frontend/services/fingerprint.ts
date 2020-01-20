import * as Fingerprint2 from 'fingerprintjs2'

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
    timeout: number;
};
type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean;
    timeRemaining: (() => number);
};

declare global {
    interface Window { requestIdleCallback: ((
            callback: ((deadline: RequestIdleCallbackDeadline) => void),
            opts?: RequestIdleCallbackOptions,
        ) => RequestIdleCallbackHandle);
    }
}

export default function _getFingerprint () {
    return new Promise((resolve, reject) => {
        async function getHash () {
            const options = {
                excludes: {
                    plugins: true,
                    localStorage: true,
                    adBlock: true,
                    screenResolution: true,
                    availableScreenResolution: true,
                    enumerateDevices: true,
                    pixelRatio: true,
                    doNotTrack: true
                }
            };

            try {
                const components = await Fingerprint2.getPromise(options);
                const values = components.map(component => component.value);
                console.log('Fingerprint hash components', components);
                return String(Fingerprint2.x64hash128(values.join(''), 31))
            } catch (e) {
                reject(e)
            }
        }

        if (window.requestIdleCallback!) {
            console.log('Get hash...');
            window.requestIdleCallback(async () => resolve(await getHash()))
        } else {
            console.log('Wait...');
            setTimeout(async () => resolve(await getHash()), 500)
        }
    })
}