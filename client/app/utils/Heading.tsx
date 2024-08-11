import React, {FC} from "react";

interface HeadProps{
    title : string,
    description : string,
    keybords : string
}

const Heading :FC<HeadProps> = ({title,description,keybords}) =>{
    return (
        <>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description}/>
        <meta name="keybords" content={keybords}/>
        </>
    )
}

export default Heading