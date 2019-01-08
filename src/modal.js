import React from 'react';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let obj = this.props.pokemons.filter(pok => pok.id == this.props.id)[0];
        this.setState({
            currPok: obj
        }, ()=> {console.log(this.state.currPok);});
    }

    render() {
        return(
            <div className="modal-container">
                {this.state.currPok && <div className="currPok-container">
                    <h1> Hello! {this.state.currPok.name}</h1>
                </div>}
            </div>
        );
    }

}
