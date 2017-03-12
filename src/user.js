// Copyright (c) 2017 Marshall Roch <marshall@mroch.com>
// All rights reserved.

"use strict";

class User {
  constructor(name, id, kids) {
    this._name = name;
    this._id = id;
    this._kids = kids;
    this._kidsByName = kids.reduce((map, kid) => {
      map[kid.name] = kid;
      return map;
    }, {});
  }

  get id() { return this._id; }
  get name() { return this._name; }
  get kids() { return Promise.resolve(this._kids); }
  kidByName(name) { return Promise.resolve(this._kidsByName[name]); }
}

module.exports = User;
