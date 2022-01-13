// Params
const urlSearchParams = new URLSearchParams(window.location.search);
var params = Object.fromEntries(urlSearchParams.entries());

// Prepare Data
var domains = {};

// UD
domains.unstoppabledomains = [
    '.crypto',
    '.zil',
    '.coin',
    '.wallet',
    '.bitcoin',
    '.x',
    '.888',
    '.nft',
    '.dao',
    '.blockchain'
];

// Start App
$(() => {

    // Exist Domain
    if (typeof params.d === 'string' && params.d.length > 0) {

        // Start Load Page
        $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)", text: `Loading ${params.d}` });

        // Get Custom Proxy
        if (localStorage && localStorage.getItem) {

            // Get Custom Proxy
            const customCIDProxy = localStorage.getItem('customCIDProxy');
            if (typeof customCIDProxy === 'string' && customCIDProxy.length > 0) {
                tinyProxy.url = customCIDProxy;
            }

        }

        // Domain DNS Selected
        let dns = null;
        for (const where in domains) {
            for (const item in domains[where]) {
                if (params.d.endsWith(domains[where][item])) {
                    dns = where;
                    break;
                }
            }
        }

        // Exist DNS
        if (dns) {
            readDomainData(params.d, 'ipfsHash').then(cid => {
                document.location.href = tinyProxy.url.replace('{cid}', cid.data).replace('{cid32}', CIDTool.base32(cid.data));
            }).catch(err => {
                console.error(err);
                alert(err.message);
                $.LoadingOverlay("hide");
                document.location.href = '/';
            });
        } else {
            alert('Invalid DNS Server!');
            $.LoadingOverlay("hide");
            document.location.href = '/';
        }

    } else { startHomepage(); }

});

// Start Homepage
const startHomepage = function() {

    // Start Homepage
    $('body').append(



    );

};