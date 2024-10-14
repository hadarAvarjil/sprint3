import { eventBusService } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function UserMsg(){
    const [ msg, setMsg ] = useState()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(() => {
                setMsg(null)
            },3000)
        })

        return() => {
            unsubscribe()
        }
    }, [])

    function onClose(){
        setMsg(null)
    }

    if(!msg) return null
    return (
        <section className={"user-msg " + msg.type}>
            <p>{msg.txt}</p>
            <button onClick={onClose}>X</button>
        </section>
    )
}