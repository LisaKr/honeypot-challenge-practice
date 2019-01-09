import React from 'react';

import axios from './axios';

import Modal from "./modal";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
        this.setPokemonIdIntoState = this.setPokemonIdIntoState.bind(this);
        this.getClass = this.getClass.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    async componentDidMount() {
        let resp = await axios.get("/pokemons/16");
        this.setState({
            pokemons: resp.data
        }, () => {console.log(this.state.pokemons);});
    }

    setPokemonIdIntoState(id) {
        this.setState({
            currId: id
        });
    }

    showModal() {
        this.setState({showModal: true});
    }

    hideModal() {
        console.log("clicked!");
        this.setState({showModal: false});
    }

    getClass(type) {
        if(type === "fire") {
            return "type orange";
        } else if (type =="grass" || type=="bug") {
            return "type green";
        } else if (type =="poison") {
            return "type pink";
        } else if (type =="water") {
            return "type blue";
        } else if (type =="flying") {
            return "type grey";
        } else {
            return "type";
        }
    }



    render() {
        return (
            <div className="page-container">
                <h1>Pokedex</h1>
                <div className="grid">
                    {this.state.pokemons && this.state.pokemons.map(
                        p => {
                            return (
                                <div className="pokemon-container" key={p.id}
                                    onClick={ () => {
                                        this.setPokemonIdIntoState(p.id);
                                        this.showModal();
                                    }
                                    }>
                                    <div className="id-name"> #{p.id} <strong>{p.name}</strong></div>
                                    <img src={p.imgurlSmall}/>
                                    <div className="types">
                                        {p.types.map(
                                            t => {
                                                return(
                                                    <div className={this.getClass(t)} key={t}>
                                                        {t}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {this.state.showModal && this.state.currId && <Modal id={this.state.currId} pokemons={this.state.pokemons} hideModal={this.hideModal}/>}
            </div>
        );
    }
}
