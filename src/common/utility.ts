export const toReadableVarname = (varname: String)=>{
    return varname
        .replace("_", " ")
        .trim()
        .split(/\s+|([A-Z])/g)
        .map(x=>`${x.at(0)?.toUpperCase}${x.slice(1)}`)
        .join(" ");
}

