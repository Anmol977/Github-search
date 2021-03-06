import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.text === '') {
            this.props.setAlert('Please search something', 'light')
        }
        else {
            this.props.searchUsers(this.state.text)
            this.setState({ text: '' })
        }
    }

    render() {

        const { showClear, clearUsers } = this.props

        return (
            <div>
                <form onSubmit={this.onSubmit} >

                    <input type="text"
                        className="form"
                        name="text"
                        placeholder="Search Users..."
                        value={this.state.text}
                        onChange={this.onChange} />
                    <input type="submit"
                        value="Search"
                        className='btn btn-dark btn-block btn-src' />

                    {showClear && (
                        <div>
                            <p> </p>
                            <button
                                className="btn btn-light btn-block"
                                onClick={clearUsers}>
                                Clear
                        </button>
                        </div>
                    )}
                </form>

            </div >
        )
    }
}

export default search
