import React, {PureComponent} from "react";

export default class EditorPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    handleSomething = something => {
        console.log(something)
    };

    render() {
        return (
            <div>
                working
            </div>
        )
    }

}

