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
            <div className="modal-container" tabIndex="0" onBlur={ this.props.hideModal }>
                {this.state.currPok && <div className="currPok-container">
                    <h1 className="modal-name">#{this.state.currPok.id} {this.state.currPok.name}</h1>
                    <img className="largeImage" src={this.state.currPok.imgurlLarge}/>
                    <div className="descr blue">
                        <p> <strong>Height</strong>  <br/> {this.state.currPok.height}</p>
                        <p> <strong>Weight </strong><br/> {this.state.currPok.weight}</p>
                        <p>
                            <strong>Abilities</strong> <br/>
                            {this.state.currPok.abilities.map(
                                ab => {
                                    return(
                                        <div key={ab}>
                                            {ab}
                                        </div>
                                    );
                                }
                            )}
                        </p>
                    </div>

                    <div className="stats-con grey">
                        <p className="stats">
                            <strong>Base Stats</strong> <br/>
                            {this.state.currPok.stats.map(
                                st => {
                                    return(
                                        <div className="stat" key={st.statName}>
                                            {st.statName} {st.stat}
                                        </div>
                                    );
                                }
                            )}
                        </p>

                    </div>

                    <div className="moves-con">
                        <p><strong>Moves</strong></p>
                        <div className="moves">
                            {this.state.currPok.moves.map(
                                m => {
                                    return(
                                        <div className="move" key={m}>
                                            <span>{m}</span>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }

}
