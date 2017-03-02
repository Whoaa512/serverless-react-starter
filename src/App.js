import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-flexbox-grid'

import './App.css'

class App extends Component {
    static get propTypes() {
        return {
            children: PropTypes.node,
        }
    }
    render() {
        return (
            <Row>
                <Col xs>
                    <Row>
                        <Col xs>
                            <nav className='pt-navbar header'>
                                <div className='pt-navbar-group pt-align-right'>
                                    <button className='pt-button pt-minimal'>ABOUT</button>
                                </div>
                            </nav>
                        </Col>
                    </Row>
                    {this.props.children}
                </Col>
            </Row>
        )
    }
}

export default App
