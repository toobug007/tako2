const proxies = [{
    ip: '111.201.122.169',
    port: '9000'
},{
    ip: '111.13.7.120',
    port: '80'
},
{
    ip: '111.13.7.121',
    port: '80'
},
{
    ip: '59.66.135.35',
    port: '1080'
},

{
    ip: '111.13.7.122',
    port: '80'
},{
    ip: '111.13.7.123',
    port: '80'
}, {
    ip: '111.13.7.118',
    port: '80'
}, {
    ip: '111.13.7.116',
    port: '80'
}, {
    ip: '202.108.14.87',
    port: '8080'
},

{
    ip: '111.13.2.138',
    port: '80'
}, {
    ip: '111.13.7.117',
    port: '80'
}, {
    ip: '111.13.141.99',
    port: '80'
}, {
    ip: '111.13.7.119',
    port: '80'
}, {
    ip: '120.132.71.212',
    port: '80'
}, {
    ip: '166.111.77.32',
    port: '80'
},

{
    ip: '111.13.109.27',
    port: '80'
}, {
    ip: '118.190.15.13',
    port: '3128'
}, {
    ip: '118.190.14.107',
    port: '3128'
}, {
    ip: '116.225.10.56',
    port: '9797'
}, {
    ip: '183.245.147.10',
    port: '135'
}, {
    ip: '218.106.205.145',
    port: '8080'
}, {
    ip: '119.84.15.210',
    port: '9001'
}];

const REUSE_INTERVAL = 30 * 60 * 1000;
let currentIndex = 0;

exports.next = next;
function next() {
    currentIndex++;
    if (currentIndex >= proxies.length) currentIndex = 0;
    console.log("next proxy", currentIndex);
    const cur = getCurrent();

    if (!cur || cur.time && new Date() - cur.time < REUSE_INTERVAL) return null;
    return cur;
}

function getCurrent() {
    const n = proxies[currentIndex];
    return n;
}

exports.getCurrentUrl = getCurrentUrl;
function getCurrentUrl(type) {
    type = type || 'http';
    const n = getCurrent();
    if (!n) return null;
    n.time = new Date();
    return type + '://' + n.ip + ':' + n.port;
}