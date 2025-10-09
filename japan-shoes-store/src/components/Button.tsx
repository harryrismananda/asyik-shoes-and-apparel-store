"use client"

import { IButtonProps } from "@/types/type"

const Button = (props: IButtonProps) => {

  return (
    <>
    <button className={props.style} onClick={props.onClick}>
      {props.type}
    </button>
    </>
  )
}

export default Button