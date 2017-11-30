import React from "react";
import { storiesOf } from "@storybook/react";
import HoneyCombUserGrid from "./HoneyCombUserGrid";

storiesOf("HoneyCombUserGrid", module).add("Happy Path", () =>
	<HoneyCombUserGrid
		users={[
			{
				image:
					"https://news.nationalgeographic.com/content/dam/news/photos/000/755/75552.ngsversion.1422285553360.adapt.1900.1.jpg",
				display_name: "chuck",
				rank: "Egg"
			},
			{
				image:
					"https://i.pinimg.com/736x/4f/c6/6b/4fc66b43d9269a15be419c54d1d3a57c--sphynx-cat-tops.jpg",
				display_name: "chuck",
				rank: "Larvae"
			},
			{
				image: "https://i.imgur.com/96LfgMs.jpg",
				display_name: "chuck",
				rank: "Queen"
			},
			{
				image:
					"https://static.boredpanda.com/blog/wp-content/uploads/2017/01/angry-cat-photography-15-586f6e56f1eb8__700.jpg",
				display_name: "chuck",
				rank: "Pupa"
			},
			{
				image: "http://i.telegraph.co.uk/multimedia/archive/03269/Angry_Cat_1_3269958k.jpg",
				display_name: "chuck",
				rank: "Egg"
			},
			{
				image: "https://i.ytimg.com/vi/DxNqThnF8NY/hqdefault.jpg",
				display_name: "chuck",
				rank: "Bee"
			}
		]}
	/>
);
