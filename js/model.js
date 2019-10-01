;(function(){
  'use strict'

  const database = {
    currentPlateNumber: 1,
    plate1: {},
    plate2: {
      item: null,
      percent: '0%',
      progress: '0%'
    },
    plate3: {
      items: [],
      percent: '33%',
      progress: '33%'
    },
    plate4: {
      item: null,
      percent: '66%',
      progress: '66%'
    },
    plate5: {
      email: null,
      agreement: false
    },
    plate6: {}
  }

  const api = {
    dispatch() {},

    //получаем номер текущей карточки
    getCurrentPlateNumber(){
      return database.currentPlateNumber
    },

    toNextPlate(){
      if(database.currentPlateNumber < 6) {
        database.currentPlateNumber++
        api.dispatch()
      }
      return database.currentPlateNumber
    },

    toPrevPlate(){
      if(database.currentPlateNumber > 1) {
        database.currentPlateNumber--
        api.dispatch()
      }
      return database.currentPlateNumber
    },

    //Выдаем копию данных карточки
    getPlateData(n) {
      return JSON.parse(JSON.stringify(database['plate' + n]))
    },

    //записываем копию данных карточки, которая к нам пришла
    setPlateData(n, data) {
      database['plate' + n] = JSON.parse(JSON.stringify(data))
      api.dispatch()
    }
  }

  window.model = api

})();