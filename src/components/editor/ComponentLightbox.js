import React, {PureComponent} from "react";
import NavBar from "../../graphql/NavbarContainer";


export default class EditorPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            title: '',
            description: '',
            originalTitle: '',
            originalDescription: '',
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let response = await this.props.updateComponent({
            variables: {
                id: this.state.id,
                title: this.state.title,
                description: this.state.description,
            }
        });
        this.props.toggleEdit()
    };

    componentDidMount(){
        this.setState({
            title: this.props.title,
            originalTitle: this.props.title,
            description: this.props.description,
            originalDescription: this.props.description,
            id: this.props.component_id,
        })
    }

	render() {
	    return(
            <div>
                <NavBar
                    authenticatedId={this.props.authenticatedId}
                    user={[this.props.loggedUser]}
                    onSubmit={this.props.handleLogin}
                    onLogout={this.props.handleLogOut}
                />
                {this.props.authenticatedId ?
                    <form style={{
                        backgroundColor: '#181718',
                        width: "500px",
                        padding: "20px",
                        margin: "100px auto",
                        color: "white",
                        fontWeight: "100",
                        border: "1px solid black",
                        borderRadius: "8px",
                        boxShadow: "0 0 0 5px #282728",
                    }}
                          onSubmit={this.handleSubmit}
                    >
                        <h1 style={{
                            textAlign: 'center',
                            textTransform: "uppercase",
                            letterSpacing: "5px",
                            marginBottom: "35px"
                        }}>Update Component</h1>
                        <label style={{
                            fontWeight: "bold",
                            fontSize: '22px',
                            textTransform: "uppercase",
                            letterSpacing: "4px"
                        }}>
                            Name:
                            <input
                                type="text"
                                value={this.state.title}
                                name="title"
                                onChange={this.handleChange}
                                maxLength={25}
                                style={{
                                    width: "430px",
                                    fontSize: '22px',
                                    margin: "15px",
                                    color: "black",
                                }}
                            />
                        </label>
                        <br/>
                        <br/>
                        <label style={{
                            fontWeight: "bold",
                            fontSize: '22px',
                            textTransform: "uppercase",
                            letterSpacing: "4px"
                        }}>
                            Description:
                            <textarea
                                type="text"
                                value={this.state.description}
                                name="description"
                                onChange={this.handleChange}
                                style={{
                                    width: "430px",
                                    fontSize: '22px',
                                    height: "200px",
                                    margin: "15px",
                                    color: "black",
                                }}
                            />
                        </label>
                        <div style={{textAlign: "center"}}>
                            <input
                                type="submit"
                                value="U P D A T E"
                                disabled={this.state.description === this.state.originalDescription && this.state.title === this.state.originalTitle || this.state.title.length === 0}
                                style={{
                                    padding: "10px 30px 10px 30px"
                                }}
                            />
                        </div>
                        <button onClick={this.props.toggleEdit} style={{padding: '10px 20px'}}>
                            Cancel
                        </button>
                    </form>
                    :
                    <p style={{
                        color: 'white',
                        margin: "300px auto",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "30px"
                    }}>Please Login to Update Components</p>
                }
            </div>
        )
    }
}
