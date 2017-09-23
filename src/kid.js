// Copyright (c) 2017 Marshall Roch <marshall@mroch.com>
// All rights reserved.

"use strict";

class Kid {
  constructor(request, parentID, name, id, gender) {
    this._request = request;
    this._parentID = parentID;
    this._name = name;
    this._id = id;
    this._gender = gender;
  }

  get name() { return this._name; }
  get id() { return this._id; }
  get gender() { return this._gender; }

  startSleeping(time) {
    return this.saveStatus(
      Kid.Category.SLEEP_START,
      `${this.name} started sleeping`,
      time,
      ''
    );
  }

  stopSleeping(time) {
    return this.saveStatus(
      Kid.Category.SLEEP_STOP,
      `${this.name} stopped sleeping`,
      time,
      ''
    );
  }

  dirtyDiaper(time, size) {
    let sizeStr = size ? ` (${size})` : '';
    return this.saveStatus(
      Kid.Category.DIAPER_BM,
      `${this.name} had a BM diaper${sizeStr}`,
      time,
      '0,0, ,'
    );
  }

  wetDiaper(time, size) {
    let sizeStr = size ? ` (${size})` : '';
    return this.saveStatus(
      Kid.Category.DIAPER_WET,
      `${this.name} had a wet diaper${sizeStr}`,
      time,
      '0,0, ,'
    );
  }

  dirtyAndWetDiaper(time, size) {
    let sizeStr = size ? ` (${size})` : '';
    return this.saveStatus(
      Kid.Category.DIAPER_BM_WET,
      `${this.name} had a BM and wet diaper${sizeStr}`,
      time,
      '0,0, ,'
    );
  }

  dryDiaper(time) {
    return this.saveStatus(
      Kid.Category.DIAPER_DRY,
      `${this.name} had a dry diaper`,
      time,
      '0,0, ,'
    );
  }
  
  milkBottle(time, amount, unit) {
    return this.bottle(time, amount, unit, 'Milk');
  }
  
  formulaBottle(time, amount, unit) {
    return this.bottle(time, amount, unit, 'Formula');
  }
  
  waterBottle(time, amount, unit) {
    return this.bottle(time, amount, unit, 'Water');
  }
  
  juiceBottle(time, amount, unit) {
    return this.bottle(time, amount, unit, 'Juice');
  }
  
  // Unit is 'ml' or 'oz'
  // Fluid is 'Milk', 'Formula', 'Water', or 'Juice'
  bottle(time, amount, unit, fluid) {
    return this.saveStatus(
      Kid.Category.BIB,
      `${this.name} drank ${amount} ${unit} of ${fluid.toLowerCase()}`,
      time,
      `${amount};${unit};${fluid}`
    );
  }
  
  // Unit is 'ml' or 'oz'
  pump(time, amount, unit) {
    return this.saveStatus(
      Kid.Category.PUMPING,
      `${amount} ${unit} Expressed`,
      time,
      `${amount};${unit};1;`
    );
  }

  saveStatus(category, text, time, params) {
    return this._request.saveStatus(
      this._parentID,
      this._id,
      category,
      text,
      time,
      params
    ).then(() => true);
  }
}

Kid.Category = {
  STARTSTOP: 100,
  DROPOFF: 101,
  PICKUP: 102,
  CHANGEROOM: 106,
  EATING: 200,
  BIB: 300,
  NURSING: 350,
  NURSING_L: 352,
  NURSING_R: 354,
  NURSING_COUNT: 5,
  DIAPER_BM: 401,
  DIAPER_BM_WET: 402,
  DIAPER_WET: 403,
  DIAPER_DRY: 404,
  SLEEP: 500,
  SLEEP_START: 501,
  SLEEP_STOP: 502,
  MOOD: 600,
  ACTIVITIES: 700,
  TEMPERATURE: 800,
  LOCATION: 900,
  PHOTO: 1000,
  MESSAGE: 1100,
  CALL: 1200,
  MILESTONE: 1300,
  SICKNESS: 1400,
  MEDICINE: 1500,
  VACCINE: 1600,
  WEIGHT: 1700,
  HEIGHT: 1800,
  HEADSIZE: 1900,
  DOCTORVISIT: 2000,
  DOCTORQUESTION: 2100,
  PUMPING: 2200,
  POTTY: 2500,
  DIARY: 2600,
  CUP: 2700,
  DOCUMENT: 2800,
  MEDICAL: 2300,
  FEED: 2400,
  INCIDENT: 2900,
  NEED: 3000,
  BEHAVIOR: 3100,
  ASSESSMENT: 3200
}

Kid.BOY = 'boy';
Kid.GIRL = 'girl';

module.exports = Kid;
