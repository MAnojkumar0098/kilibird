export default function Btn(props)
{
    let stybtn={borderColor:props.effect,borderWidth:'1px',boxShadow:`5px 5px 8px ${props.effect}`};
    if(props.alpha==='P'){
        stybtn={borderColor:props.effect,borderWidth:'1px',boxShadow:`5px 5px 8px ${props.effect}`,margin:'0px 2px'}
    }
    if(props.alpha==='K')
    {
        stybtn={borderColor:props.effect,borderWidth:'1px',boxShadow:`5px 5px 8px ${props.effect}`,margin:'0px 20px'} 
    }
    return(<button style={stybtn}>{props.alpha}</button>)
}