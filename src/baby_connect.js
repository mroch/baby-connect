// Copyright (c) 2017 Marshall Roch <marshall@mroch.com>
// All rights reserved.

"use strict";

const Request = require('./request');
const User = require('./user');
const Kid = require('./kid');

class BabyConnect {
  constructor(username, password) {
    this.request = new Request(username, password);
  }

  getUser() {
    if (this._user === undefined) {
      this._user = this.request.getUserInfo().then(info => {
        const kids = info.myKids.map(kid => new Kid(
          this.request,
          info.Id, // actor ID
          kid.Name,
          kid.Id,
          kid.Boy ? Kid.BOY : Kid.GIRL
        ));
        return new User(info.Name, info.Id, kids);
      });
    }
    return this._user;
  }
}

module.exports = BabyConnect;
