import Link from "next/link"
import { useState, useReducer } from "react"


export default function NotificationSignUp(
) {
    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")
    // const [age, setAgeName] = useState("")
    const [text, setText] = useState("")
    // const [valid, setValidName] = useState(false)

    function reducer(state: any, action: any) {
        let values = { ...state }
        console.log({ state })
        const { type, value } = action
        if (type === "firstName") {
            values.firstName = value
        }
        if (type === "lastName") {
            values.lastName = value 
        }
        if (type === "age") {
            values.age = value
            // const valid = checkValid(values)
            // values.valid = valid
        }


        return values
    }

    const [state, dispatch] = useReducer(reducer, {
        firstName: "",
        lastName: "",
        age: "",
        valid: false
    })


    function checkValid(values: any) {
        console.log({ values })
        const { firstName, lastName, age } = values
        console.log({ firstName, lastName, age })

        if (firstName.length > 0 && lastName.length > 0 && age.length > 0) {
            return true
        } else {
            return false
        }
    }
    function onSubmit() {
        // if(valid){
        //     setText([firstName, lastName, age].join(", "))
        // }
    }

    return <div className="w-full text-center bg-white px-4 py-2 relative text-gray-900 text-sm flex flex-col gap-4 max-w-lg mx-auto">
        <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="font-bold text-base text-start">First Name</label>
            <input
                type="text"
                name="firstName"
                value={state?.firstName}
                onChange={(e) => {
                    dispatch({ type: "firstName", value: e.target.value })
                    checkValid({ fieldName: "firstName", value: e.target.value })
                }}
                className="h-11 w-full border border-gray-500 rounded px-2"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="font-bold text-base text-start">Last Name</label>
            <input
                type="text"
                name="lastName"
                value={state.lastName}
                onChange={(e) => {
                    dispatch({ type: "lastName", value: e.target.value })
                    checkValid({ fieldName: "lastName", value: e.target.value })
                }
                }
                className="h-11 w-full border border-gray-500 rounded px-2" />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="age" className="font-bold text-base text-start">Age</label>
            <input
                type="text"
                name="age"
                value={state.age}
                onChange={(e) => {
                    dispatch({ type: "age", value: e.target.value })
                    checkValid({ fieldName: "age", value: e.target.value })
                }}
                className="h-11 w-full border border-gray-500 rounded px-2 hover:cursor-pointer cursor-pointer" />
        </div>
        <button className={`
            px-2 py-6 rounded  text-white
            ${state.valid ? "bg-sky-700" : "bg-gray-500"}
            `}
            onClick={() => onSubmit()}
        >
            Submit
        </button>
        {state.valid && text}
    </div>
}