var resolution = new unResolution.Resolution();
var readDomainData = function(domain, type, data) {
    return new Promise(function(resolve, reject) {

        // UD
        if (domains.unstoppabledomains.find(domainName => domain.endsWith(domainName))) {

            if (type === 'ipfsHash') {
                resolution.ipfsHash(domain).then((cid) => {
                    return resolve({ data: cid, dns: 'unstoppabledomains' });
                }).catch(reject);
            } else if (type === 'addr') {
                resolution.addr(domain, data).then((addr) => {
                    return resolve({ data: addr, dns: 'unstoppabledomains' });
                }).catch(reject);
            } else {
                reject(new Error('Invalid Read Domain Request!'));
            }

        }

        // Nothing
        else {
            reject(new Error('Invalid DNS App!'));
        }

    });
};