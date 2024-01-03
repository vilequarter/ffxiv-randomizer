import { useEffect, useRef } from "react";

export function IndeterminateCheckbox(props) {
    const checkRef = useRef();

    useEffect(() => {
        if(props.value === 1){
            checkRef.current.checked = true;
            checkRef.current.indeterminate = false;
        } else if(props.value === 0){
            checkRef.current.checked = false;
            checkRef.current.indeterminate = false;
        } else {
            checkRef.current.checked = false;
            checkRef.current.indeterminate = true;
        }
    }, [props.value])

    return (
        <>
            <input
                type="checkbox"
                id={`role-checkbox-${props.index}`}
                name={props.name}
                value={props.name}
                ref={checkRef}
                onChange={() => props.handler(props.index)}
            />
            <label htmlFor={`role-checkbox-${props.index}`}>{props.name}</label>
        </>
    )
}