import React from "react";
import { storiesOf } from "@storybook/react";
import HivePage from "./HivePage";

storiesOf("HivePage", module).add("Happy Path", () => <HivePage users={[]} components={[]} />);
