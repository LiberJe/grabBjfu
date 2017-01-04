const fs = require('fs');
const http = require('http');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const { login } = require('./lib/controller/login.js');

login();