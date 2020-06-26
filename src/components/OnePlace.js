import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class OnePlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            placeId: this.props.match.params.id,
            cars: []
        }
    }

    getCarsById = place => {
        fetch('https://placowki.herokuapp.com/places/cars/all/' + this.state.placeId)
            .then(res => res.json())
            .then(cars => {
                this.setState({ cars: cars })
            })
            .catch(err => console.log(err))
    }


    deleteCar = id => {
        fetch('https://placowki.herokuapp.com/places/cars/delete/' + id, {
            method: 'DELETE'
        }
        )
            .then(res => {
                if (res.status % 200 < 100 && res.status < 400) alert("Object has been deleted")
                else alert("Object has not been deleted try again or contact with our IT department")
            })
            .catch(err => {
                alert("Object has not been deleted try again or contact with our IT department")
                console.log(err)
            })
    }

    async componentDidMount() {
        this.getCarsById()
    }

    render() {
        console.log(this.state.cars)
        const cars = this.state.cars.map((car) => {
            return (
                <Row>
                    <Col>{car.id}</Col>
                    <Col>{car.mark}</Col>
                    <Col>{car.model}</Col>
                    <Col>{car.colour}</Col>
                    <Col>{car.prodYear}</Col>
                    <Col>{car.vin}</Col>
                    <Col>true</Col>
                    <Button onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCar(car.id)}}>Delete Car from place</Button>
                </Row>
            )
        })

        return (
                <Container>
                <h1>PlaceId: {this.props.match.params.id}</h1>
                
                    <Row>
                        <Col>
                            CarId
                        </Col>
                        <Col>
                            Mark
                        </Col>
                        <Col>
                            Model
                        </Col>
                        <Col>
                            Color
                        </Col>
                        <Col>
                            Production Year
                        </Col>
                        <Col>
                            VIN
                        </Col>
                        <Col>
                            Avalible
                        </Col>
                    </Row>
                    {cars}
                </Container>
        )
    }
}
export default OnePlace