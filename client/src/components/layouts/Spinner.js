import spinner from './spinner.gif'
import { Fragment } from 'react'

export default () => { 
    return (<Fragment>
        <img src={spinner} style={{width: "200px", height: "200px", display: "block"}}/>
    </Fragment>)
}