'use strict';

var setting = localStorage.getItem("setting");
if (setting != null && setting != "") {
	try {
		var settingJs = JSON.parse(setting);
		if (settingJs != null && settingJs != "") {
			if (settingJs["Theme"] === "dark") {
				document.getElementsByTagName("body")[0].style.backgroundColor = "#151a30";
			} else if (settingJs["Theme"] === "cosmic") {
				document.getElementsByTagName("body")[0].style.backgroundColor = "#1b1c38";
			}
		}
	} catch (e) { }
}
