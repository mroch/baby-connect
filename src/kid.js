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

  startSleeping() {
    return this.saveStatus(
      Kid.Category.SLEEP_START,
      `${this.name} started sleeping`
    );
  }

  stopSleeping() {
    return this.saveStatus(
      Kid.Category.SLEEP_STOP,
      `${this.name} stopped sleeping`
    );
  }

  saveStatus(category, text) {
    return this._request.saveStatus(
      this._parentID,
      this._id,
      category,
      text
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
	DIAPERS: 400,
	NURSING: 350,
	NURSING_L: 352,
	NURSING_R: 354,
	NURSING_COUNT: 5,
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
