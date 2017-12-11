import React from "react";
import {storiesOf} from "@storybook/react";
import EditorComments from "./EditorComments";


const data = {
    oneComponent: {
        comments: [
            {
                comment: "Thanks there",
                display_name: "Chuck",
                user_id: 1,
                created_at: "2017-12-09 17:21:14.984056-08",
                profile_picture: "http://www.petsworld.in/blog/wp-content/uploads/2014/09/adorable-cat.jpg"
            }
        ],
        loading: false

    }
};


storiesOf("EditorComments", module).add("Logged in User", () => <EditorComments
    authenticatedId={1}
    data={data}
/>);

storiesOf("EditorComments", module).add("Not Logged in User", () => <EditorComments
    authenticatedId={undefined}
    data={data}
/>);
