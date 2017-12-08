import React from "react";
import { storiesOf } from "@storybook/react";
import SignupForm from "./SignupForm";

storiesOf("SignupForm", module).add("Happy Path", () => <SignupForm />);
