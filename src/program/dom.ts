(function () {
    const { byId, newElem, append, addClass } = dom

    const getLine = () => {
        const line = newElem('div')
        addClass(line, 'line')
        addClass(line, 'flex')
        return line
    }

    const specials = byId('specials')

    let line = getLine()
    let index = 0
    core.data.specials.allTab.forEach((s) => {
        if (index % 8 === 0) {
            append(specials, line)
            line = getLine()
        }

        const button = newElem('button')
        button.innerHTML = s
        addClass(button, 'simple-btn')
        append(line, button)

        core.dom.specials.push(button)
        index++
    })

    if (index > 0) {
        append(specials, line)
    }
}())