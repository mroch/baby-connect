// Copyright (c) 2017 Marshall Roch <marshall@mroch.com>
// All rights reserved.

"use strict";

const https = require('https');
const moment = require('moment');
const querystring = require('querystring');

const HOSTNAME = 'www.baby-connect.com';
const LANGUAGE = 'en';

class Request {
  constructor(username, password) {
    this.auth = new Buffer(`${username}:${password}`, 'utf8')
      .toString('base64');
  }

  // POST /CmdI?cmd=UserInfo&lg=en&v=2&withDisable=true&pdt=170311 HTTP/1.1
  getUserInfo() {
    const data = '';
    const qs = querystring.stringify({
      cmd: 'UserInfo',
      lg: LANGUAGE,
      v: '2',
      withDisable: 'true', // what does this mean?
      // pdt: TODO: YYMMDD, but is this necessary?
    });
    return this.rawPost(`/CmdI?${qs}`, data);
  }

  // POST /CmdPostI?cmd=StatusMPost&lg=en HTTP/1.1
  // ptm=1622 // time, HHMM
  // &pdt=170311 // date, YYMMDD
  // &Kid=0000000000000000 // kid ID
  // &tsn=0000000000000000 // some form of cursor from the previous response
  // &l=[{
  //   "Pdt":170311,"Utm":1615,"Id":0,"Cat":501,"By":0000000000000000,
  //   "Txt":"X starts sleeping","lId":220580527267,"Kid":0000000000000000,
  //   "e":"3/11/2017 16:15","Ptm":0
  // }]
  // &waccount2=1
  saveStatus(user, kid, category, text, time, params) {
    const dateStr = moment(time).format('YYMMDD');
    const timeStr = moment(time).format('HHmm');
    const data = querystring.stringify({
      pdt: dateStr,
      ptm: timeStr,
      Kid: kid,
      // tsn: 0000000000000000 TODO: last tsn received from previous response
      l: JSON.stringify([{
        Pdt: dateStr,
        Ptm: timeStr,
        Utm: timeStr,
        Cat: category,
        By: user,
        Txt: text,
        p: params,
        // lId: 0, TODO: local id? example: 220580527267
        Kid: kid,
        e: moment(time).format('M/D/YYYY H:m'),
        isst:true
      }]),
      lg: LANGUAGE
    });
    
    const qs = querystring.stringify({
      cmd: 'StatusMPost',
    });
    return this.rawPost(`/CmdPostI?${qs}`, data);
  }

  rawPost(path, data) {
    return new Promise((resolve, reject) => {
      const dataLength = Buffer.byteLength(data);
      const options = {
        hostname: HOSTNAME,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': dataLength,
          'BabyConnect': this.auth,
          'Authorization': `Basic ${this.auth}`,
          'User-Agent':
            // must impersonate the iOS app to get through (maybe iOS and
            // Android responses are different and it uses the UA?). trying to
            // be a good citizen by including our own identifier, though.
            'Baby Connect 5.3.2i mroch-baby-connect/0.0.1'
        }
      };

      const req = https.request(options, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(res));
          return;
        }

        const body = [];
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body.push(chunk);
        });
        res.on('end', () => {
          resolve(JSON.parse(body.join('')));
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      if (dataLength > 0) req.write(data, 'utf8');
      req.end();
    });
  }
}

module.exports = Request;
