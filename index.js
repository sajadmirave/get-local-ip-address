/**
 * Get local IP address, while ignoring vEthernet IP addresses (like from Docker, etc.)
 */
let localIP;
var os = require("os");
var ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ("IPv4" !== iface.family || iface.internal !== false) {
      // Skip over internal (i.e. 127.0.0.1) and non-IPv4 addresses
      return;
    }

    if (ifname === "Ethernet") {
      if (alias >= 1) {
        // This single interface has multiple IPv4 addresses
        // console.log(ifname + ':' + alias, iface.address);
      } else {
        // This interface has only one IPv4 address
        // console.log(ifname, iface.address);
      }
      ++alias;
      localIP = iface.address;
    }
  });
});
console.log(localIP);
exports.localIP = localIP;
