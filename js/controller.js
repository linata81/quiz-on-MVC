;(function(){
  'use strict'

  let montedElement = null

  const api = {}

  model.dispatch = function dispatch(){
    api.update()
  }

  view.clickhandler = function clickhandler(element, event) {
    const plateNumber = model.getCurrentPlateNumber()
    const plateData = model.getPlateData(plateNumber)
    
    event.preventDefault()

    if(plateNumber === 1){
      if(element.textContent === 'Пройти тест'){
        model.toNextPlate()
      }
    }

    else if(plateNumber === 2){
      if(element.tagName === 'INPUT') {
        plateData.item = element.value
        plateData.percent = '33%'
        plateData.progress = '33%'
        model.setPlateData(plateNumber, plateData)
      }
      else if(element.tagName === 'A' && element.textContent === 'Назад'){
        model.toPrevPlate()
      }
      else if(element.tagName === 'A' && element.textContent === 'Далее'){

        if(plateData.item) {
          model.toNextPlate()
        }
        else {
          alert('выберите вариант ответа')
        }
      }
    }

    else if(plateNumber === 3){
      if(element.tagName === 'INPUT') {
        const value = element.value

        if(plateData.items.includes(value)){
          const index = plateData.items.indexOf(value)
          plateData.items.splice(index, 1)
          plateData.percent = '33%'
          plateData.progress = '33%'
        }
        else {
          plateData.items.push(value)
          plateData.percent = '66%'
          plateData.progress = '66%'
        }

        model.setPlateData(plateNumber, plateData)
      }
      else if(element.tagName === 'A' && element.textContent === 'Назад'){
        model.toPrevPlate()
      }
      else if(element.tagName === 'A' && element.textContent === 'Далее'){

        if(plateData.items.length) {
          model.toNextPlate()
        }
        else {
          alert('выберите вариант ответа')
        }
      }
    }

    else if(plateNumber === 4){

      if(element.tagName === 'INPUT') {
        plateData.item = element.value
        plateData.percent = '99%'
        plateData.progress = '99%'
        model.setPlateData(plateNumber, plateData)
      }
      else if(element.tagName === 'A' && element.textContent === 'Назад'){
        model.toPrevPlate()
      }
      else if(element.tagName === 'A' && element.textContent === 'Далее'){

        if(plateData.item) {
          model.toNextPlate()
        }
        else {
          alert('выберите вариант ответа')
        }
      }
    }

    else if(plateNumber === 5){

      if(element.type === "email") {
        plateData.email = element.value
        model.setPlateData(plateNumber, plateData)
      }

      else if(element.type === 'checkbox') {
        if(plateData.agreement){
          plateData.agreement = false
          model.setPlateData(plateNumber, plateData)
        }
        else {
          plateData.agreement = true
          model.setPlateData(plateNumber, plateData)
        }
      }

      else if(element.type === 'submit'){
        if(plateData.email){
          if(plateData.agreement) {
            model.toNextPlate()
          }
          else {
            alert('Подтвердите согласие с политикой конфиденциальности')
          }
        }
        else {
          alert('Напишите ваш email')
        }
      }
    }
  }

  api.start = function start(initMontedElement){
    montedElement = initMontedElement
    api.update()
  }

  api.update = function update(){
    const plateNumber = model.getCurrentPlateNumber()
    const plateData = model.getPlateData(plateNumber)
    const plateElement = view.getPlate(plateNumber, plateData)

    montedElement.innerHTML = ''
    montedElement.append(plateElement)
  }

  window.controller = api

})();