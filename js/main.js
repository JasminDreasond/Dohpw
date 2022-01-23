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

        // Domain
        const domain = params.d.split('/');

        // Start Load Page
        $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)", text: `Loading ${domain[0]}` });

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
                if (domain[0].endsWith(domains[where][item])) {
                    dns = where;
                    break;
                }
            }
        }

        // Exist DNS
        if (dns) {
            if (typeof params.currency !== 'string' || params.currency.length < 1) {
                readDomainData(domain[0], 'ipfsHash').then(cid => {
                    domain.shift();
                    document.location.href = tinyProxy.url.replace('{cid}', cid.data).replace('{cid32}', CIDTool.base32(cid.data)) + domain.join('/');
                }).catch(err => {
                    console.error(err);
                    alert(err.message);
                    $.LoadingOverlay("hide");
                    document.location.href = '/';
                });
            } else {
                let typeAction = 'addr';
                if (typeof params.chain === 'string' && params.chain.length > 0) {
                    typeAction = 'multiChainAddr';
                }
                readDomainData(domain[0], typeAction, params.currency, params.chain).then(address => {
                    $('body').append(
                        $('<center>', { class: 'container my-5' }).append(
                            $('<h3>', { class: 'mb-4' }).append(
                                $('<span>').text(domain[0]),
                                $('<span>', { class: 'badge badge-secondary ml-2' }).text(params.currency.toLocaleUpperCase())
                            ),
                            $('<input>', { class: 'form-control text-center' }).attr('readonly', true).val(address.data).click(function() {
                                $(this).select();
                            })
                        )
                    )
                    $.LoadingOverlay("hide");
                }).catch(err => {
                    console.error(err);
                    alert(err.message);
                    $.LoadingOverlay("hide");
                    document.location.href = '/';
                });
            }
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
    /* $('body').append(



    ); */

    // Temp Redirect
    document.location.href = 'https://github.com/JasminDreasond/Dohpw';

};