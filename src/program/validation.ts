type ValidationT = {
    setMessage: () => void
}

const validation = () => (function () {

    const ratingTabs = [
        [64, 64, 64, 64], // 0
        [7, 15, 20, 24], // 1
        [5, 10, 14, 17], // 2
        [4, 9, 12, 14], // 3
        [3, 8, 11, 14], // 4
        [3, 8, 11, 13], // 5
    ] as const

    const ratingNames = [
        'bad', // 0
        'still bad', // 1
        'ok', // 2
        'good', // 3
        'very good' // 4
    ] as const


    const raringColors = [
        '#a60000', // 0
        '#c17200', // 1
        '#ccd200', // 2
        '#93c400', // 3
        '#12c000', // 4
    ] as const

    const ratingClassification = () => {
        const azSmall = core.store.get(core.store.names.azSmall) as CheckedKeyT
        const azBig = core.store.get(core.store.names.azBig) as CheckedKeyT
        const numbers = core.store.get(core.store.names.numbers) as CheckedKeyT
        const numberNormal = (azSmall === checked.yes ? 1 : 0) + (azBig === checked.yes ? 1 : 0) + (numbers === checked.yes ? 1 : 0)

        const specials = core.store.get(core.store.names.specials) as CheckedKeyT[]
        let numberSpecial = 0
        specials.forEach((s: string) => {
            if (s === checked.yes) numberSpecial++
        })

        if (numberNormal === 0 && numberSpecial === 0) return -1

        if (numberNormal === 0 && numberSpecial < 10) return 0

        if (numberNormal === 1 && numbers === checked.yes && numberSpecial < 10) return 1
        if (numberNormal === 0 && numberSpecial >= 10 && numberSpecial < 24) return 1

        if (numberNormal === 1 && (azSmall === checked.yes || azBig === checked.yes) && numberSpecial < 10) return 2
        if (numberNormal === 0 && numberSpecial >= 24) return 2

        if (numberNormal === 2 && numberSpecial < 10) return 3
        if (numberNormal === 1 && numberSpecial >= 10) return 3

        if (numberNormal === 3 && numberSpecial < 10) return 4
        if (numberNormal === 2 && numberSpecial >= 10) return 4

        if (numberNormal === 3 && numberSpecial >= 10) return 5

        return 0
    }

    const getMessage = () => {
        const numberRatingTab = ratingClassification()

        let result: { message: string, color: string }

        if (numberRatingTab === -1) {
            result = {
                message: 'I don\'t have anything to create a password with',
                color: '#a60097',
            }

            return result
        }

        const ratingTab = ratingTabs[numberRatingTab as 0 | 1 | 2 | 3 | 4 | 5]
        const length = core.store.get(core.store.names.length)

        let rating = 0
        ratingTab.forEach((r: number) => {
            if (length > r) rating++
        })

        result = {
            message: `this password is ${ratingNames[rating]}`,
            color: raringColors[rating],
        }

        return result
    }

    const setMessage = () => {
        const data = getMessage()

        core.dom.message.innerHTML = data.message
        core.dom.message.style.color = data.color
    }


    const result: ValidationT = {
        setMessage
    }

    return result
}())