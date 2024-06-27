const init = () => (function () {
    const { add, setAttribute } = dom

    const setValue = (data: CheckedKeyT, elem: HTMLElement) => {
        elem.style.backgroundColor = data === checked.yes ? 'var(--on_second_color)' : 'var(--background_color)'
        setAttribute(elem, 'data-num', data)
    }

    // normal
    const azSmallData = core.store.get(core.store.names.azSmall) as CheckedKeyT
    setValue(azSmallData, core.dom.azSmall)
    setAttribute(core.dom.azSmall, 'data-num', azSmallData)
    add(core.dom.azSmall, 'click', core.events.azSmallClick)

    const azBigData = core.store.get(core.store.names.azBig) as CheckedKeyT
    setValue(azBigData, core.dom.azBig)
    setAttribute(core.dom.azBig, 'data-num', azBigData)
    add(core.dom.azBig, 'click', core.events.azBigClick)

    const numbersData = core.store.get(core.store.names.numbers) as CheckedKeyT
    setValue(numbersData, core.dom.numbers)
    setAttribute(core.dom.numbers, 'data-num', numbersData)
    add(core.dom.numbers, 'click', core.events.numberClick)

    // specials
    const specialsData = core.store.get(core.store.names.specials) as CheckedKeyT[]
    core.dom.specials.forEach((btn, i) => {
        setValue(specialsData[i], btn)
        add(btn, 'click', core.events.specialClick(i))
    })

    add(core.dom.allSpecials, 'click', core.events.specialAllClick)
    add(core.dom.commonSpecials, 'click', core.events.specialCommonClick)
    add(core.dom.noneSpecials, 'click', core.events.specialNoneClick)

    // length
    const lengthData = core.store.get(core.store.names.length)
    core.dom.lengthInput.value = lengthData
    add(core.dom.lengthInput, 'input', core.events.lengthInput(core.dom.lengthValue))
    core.dom.lengthValue.innerHTML = lengthData

    // generatePassword
    add(core.dom.generatePassword, 'click', core.events.generatePasswordBtnClick)

    // copy
    add(core.dom.copy, 'click', core.events.CopyToClipboard)

    core.validation()
}())