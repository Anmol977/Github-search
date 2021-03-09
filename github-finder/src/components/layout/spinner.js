import React, { Fragment } from 'react'
import spinner from './spinner.gif'

export const Spinner = () => <Fragment>
    <img src={spinner} alt="loading..." style={{ width: '64px', margin: 'auto', display: 'block' }} />
</Fragment>

export default Spinner
