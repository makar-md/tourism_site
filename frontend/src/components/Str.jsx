import { useEffect, useState } from "react"
import '../index.css'
export default function Str({str}){
    return(
        <p className="text-teal-500 font-bold font-xl">
            {str}
        </p>
    )
}