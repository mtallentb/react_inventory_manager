import React, { Component } from 'react'
import { connect } from 'react-redux'
// import * as actionTypes from '../../store/actions'
import { Col } from "react-bootstrap/lib/"
import axios from 'axios'
import { Line } from 'react-chartjs-2'

class SalesChart extends Component {

    state = {
        order_line_items: [],
        orderDates: [],
        dailySales: []
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://ancient-reef-75174.herokuapp.com/order_line_items/',
            headers: { 'Authorization': this.props.token }
        })
            .then((response) => {
                let dailySales = []
                let order_line_items = [...response.data]
                let dates = order_line_items.map(item => item.created_at.slice(0, 10))
                let uniq = (a) => {
                    return a.sort().filter((item, pos, ary) => {
                        return !pos || item !== ary[pos - 1];
                    })
                }
                console.log(uniq(dates))
                let uniqueDates = uniq(dates)
                this.setState({ orderDates: uniqueDates })
                let saleDates = order_line_items.map(item => item.created_at.slice(0, 10))
                console.log(saleDates)
                order_line_items.forEach((item, index) => {
                    let dailySaleTotal = saleDates.filter(sale => sale === item.created_at.slice(0, 10)).length
                    dailySales.push(dailySaleTotal)
                })
                console.log(dailySales)
                this.setState({ dailySales: uniq(dailySales) })

            })
    }
    
    render() {

        const data = (canvas) => {
            return {
                labels: this.state.orderDates,
                datasets: [{
                    label: '# of Items Sold',
                    data: this.state.dailySales,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        }

        return (
            <div className='container'>
                <br /><br /><br />
                <Col md={1} />
                <Col md={10}>
                    <Line data = { data } />
                </Col>
                <Col md={1} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }    
}

export default connect(mapStateToProps)(SalesChart)