(function () {
    getStorage().then((store) => {
        core.store = store

        setConsole()

        core.events = getEvents()
        core.validation = validation().setMessage

        init()
    })
}())