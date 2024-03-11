const { Client } = require("pg");

// const client = new Client({
//   user: "postgres",
//   password: "sayel111",
//   host: "localhost",
//   port: "5432",
//   database: "postgres",
// });

const config = {
  user: "avnadmin",
  password: "AVNS_zWUPqe-exBOwE_CaEh9",
  host: "test-mdsayel111-4ff0.a.aivencloud.com",
  port: 22070,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUKYnsMBqsIi3CJz7sYxAdHnfOyZswDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMGY5ZDNiNWQtZWQxOC00NmNjLTgxZmYtNDViMDRlMWM0
N2ZkIFByb2plY3QgQ0EwHhcNMjQwMzEwMjAyNzI2WhcNMzQwMzA4MjAyNzI2WjA6
MTgwNgYDVQQDDC8wZjlkM2I1ZC1lZDE4LTQ2Y2MtODFmZi00NWIwNGUxYzQ3ZmQg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAPbBZ2ti
IZvrS2fRQ5vcDBRuKO7gtaCVCuDOZ8lxaVyreLHl7cGKQfiAoEY7/d9nSdPGv7eV
DxG+zLGy0kbwxVfKBjgxu79fLz5Zg+39VGJq45pHd7agLQ39GQptu97DRB85nMNF
djfLTai6re4X0p0+ZszRHxlYUBHUcvVHhHT0rOE+YO8bU3nhwSmENLn/Gnej+PSA
B9S4rP/xPcKddwRT0arVe1vSyOZe65iRb21gSGlPOiZ111RxD+dBIglSJ9+XUZ/5
xm/YjCj/8UYv3OTkaNbCXl4pXR+h4BtE/+UphIofMdjRmApv336644hqTmDluwSt
2yIdmx60DlFrOpgnb6+9TNDdaSQuFQSR8yBE46flt4ZeuVWsdW1FOrwEq/BNPj9c
BDJUk28rSs8AhL5hylycU0hnVM7QbVZ5ltG9jeMruhWKXBznNiChrGlJbP++NZst
pRnDtw9hQzTIHz38GUIz6+H8zR4gDBDKerh0wIadRgtCQQbv0MVkSvumSwIDAQAB
oz8wPTAdBgNVHQ4EFgQUDYtlyJksbSaR2EnygBjypCMrFhUwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAJ+aWT0ODCi9kr2l
5cN7icpbqJ8tgrzC/I7xFWZC2UwBUcPOa28aZSYoBzNycKYLl6NKWAhdfFl6iJ6e
n/S0E84cmcWksdwwWp1BMfgh6UQWBzBszLSYjFczs9Dvm/Rb/rvfTewk/FmIgq9m
BsaaoN3L4zmP6g0vdfXAPyvtCvdrEhPSp59yZSH1TNHco5ClT762vXjtQJzbK6oB
Z5OMJDvHN6GYhS3DaKT2vEdTIdWpCaYROnzSJDVK7JhbiPA5yUDQHiAivLmqyGBY
VBlLOhbp8yydsW+Bl9jXLnzOMlVb8ggakr/9UKvOI+enhiL7Wla61Ki2nnkEsBy7
xRGVWvXtHNSGRIp6ZDoF2dfjlcQdSpEe5zeHjctgacKgExtA+g3d3GPqiXSEMkSv
aWG1K3XCegyT3MwS53r4OiDlIMFEBqnxsFB0R6VOhot9M1rJNrdBlbrknuJXSpFC
/rYo0mAFfLdZd9elWEN5TD6yyFVSeSX7F9SM3l+qcHi11ICeew==
-----END CERTIFICATE-----`,
  },
};

const client = new Client(config);

module.exports = { client };
