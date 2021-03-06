import "@kadira/storybook-addon-knobs/register";
import "storybook-readme/register";
import "@kadira/storybook-addon-options/register";
import "./styles.css";

const $ = require("jquery");
import SumoSelect from "sumoselect";

const map = {
	ReactiveSearch: [
		"s/NestedList",
		"s/ToggleList",
		"s/DynamicRangeSlider",
		"s/TagCloud",
		"s/RatingsFilter",
		"s/CategorySearch",
		"s/MultiLevelMenu",
		"s/ResultList",
		"s/ResultCard",
		"s/ViewSwitcher",
		"s/DataSearch",
		"s/TextField",
		"s/NumberBox",
		"s/SingleList",
		"s/MultiList",
		"s/SingleDropdownList",
		"s/MultiDropdownList",
		"s/SingleRange",
		"s/MultiRange",
		"s/SingleDropdownRange",
		"s/MultiDropdownRange",
		"s/ToggleButton",
		"s/DatePicker",
		"s/DateRange",
		"s/RangeSlider",
		"s/DataController"
	],
	ReactiveMaps: [
		"m/GeoDistanceSlider",
		"m/GeoDistanceDropdown",
		"m/PlacesSearch",
		"m/ReactiveMap",
		"m/SingleList",
		"m/MultiList",
		"m/SingleDropdownList",
		"m/MultiDropdownList",
		"m/SingleRange",
		"m/MultiRange",
		"m/SingleDropdownRange",
		"m/MultiDropdownRange",
		"m/DataSearch",
		"m/TextField",
		"m/ToggleButton",
		"m/RangeSlider",
		"m/NumberBox",
		"m/DatePicker",
		"m/DateRange",
		"m/DataController"
	]
}

const options = [
	{value: "ReactiveMaps", text: "ReactiveMaps"},
	{value: "ReactiveSearch", text: "ReactiveSearch"}
];

let filterBy = [];

$(document).ready(() => {
	let select = $("<select></select>")
		.attr("multiple", "multiple")
		.attr("name", "filter")
		.attr("class", "filter")
		.attr("placeholder", "Filter Stories");

	options.forEach(option => {
		$("<option />", option).appendTo(select);
	});

	let interval = setInterval(() => {
		if ($(".Pane.vertical.Pane1 > div > div > div > div > ul > li").length) {
			main();
		}
	}, 500);

	function main() {
		clearInterval(interval);
		let search = new URLSearchParams(window.location.search);
		filterBy = search.has("filterBy") ? search.get("filterBy").split(",") : [];

		$(".Pane.vertical.Pane1 > div > div > div:eq(1)").prepend(select);
		$(".filter").SumoSelect({captionFormatAllSelected: "All Selected"});

		const stories = Array.from($(".Pane.vertical.Pane1 > div > div > div > div > ul > li > a"));

		$(".filter").on("change", function() {
			filterBy = $(this).val();
			search.set("filterBy", filterBy.join());
			history.pushState({}, "", window.location.pathname + "?" + search.toString());

			$(".hide-me").removeClass("hide-me");
			$(".show-me").removeClass("show-me");

			filterStories(stories);
		});

		if (filterBy.length) {
			filterBy.forEach(category => {
				options.forEach(({value}, index) => {
					if (value === category) {
						$(".filter")[0].sumo.selectItem(index);
					}
				})
			})
		}

		$(".Pane.vertical.Pane1 > div > div > div > div > ul > li").on("click", () => {
			setTimeout(() => {
				search = new URLSearchParams(window.location.search);
				if (filterBy && filterBy.length) {
					search.set("filterBy", filterBy.join());
					history.pushState({}, "", window.location.pathname + "?" + search.toString());
				}
			}, 1500);
		});
	}
});

function filterStories(stories) {
	stories.forEach((story) => {
		const name = $(story)[0].innerText;

		filterBy.forEach(category => {
			if (map[category].indexOf(name) < 0) {
				$(story).parent().addClass("hide-me");
			} else {
				$(story).parent().addClass("show-me");
			}
		});
	});
}
