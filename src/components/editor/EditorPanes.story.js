import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import EditorPanes from "./EditorPanes";
import StoryRouter from "storybook-router";


const data = {
    oneComponent: {
        title: "my little component",
        framework: "react",
        user_owner_id: 1,
        votes: [],
        fans: [],
        tags: [],
        loading: false,
        owner: {
            id: 1,
            display_name: "chuck hagy",
            experience: 4,
        }

    }
};

storiesOf("EditorPanes", module).addDecorator(StoryRouter()).add("Happy Path", () =>
    <EditorPanes
        data={data}
        authenticatedId={1}
    />);
