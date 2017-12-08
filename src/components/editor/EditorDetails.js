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
            <div className="detailsBox">
                component_picture: String<br />

                description: String<br />

                owner: User!<br />

                score: Int!<br />
                votes: [Vote]!<br />

                myParent: Component<br />
                myChildren: [Component]!<br />
                myCloneSource: Component<br />
                myClones: [Component]!<br />

                comments: [Comment]!<br />

                privacy: String<br />
                status: String!

            </div>
        )
    }

}

