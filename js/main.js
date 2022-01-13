// Module
var resolution = new unResolution.Resolution();

// Params
const urlSearchParams = new URLSearchParams(window.location.search);
var params = Object.fromEntries(urlSearchParams.entries());

// Start App
$(() => {

    // Exist Domain
    if (typeof params.d === 'string' && params.d.length > 0) {
        $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)", text: `Loading ${params.d}` });
    }

});