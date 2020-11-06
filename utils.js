/* Mailnag - GNOME-Shell extension frontend
*
* Copyright 2014 Patrick Ulbrich <zulu99@gmx.net>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
* MA 02110-1301, USA.
*/

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Shell = imports.gi.Shell;

function launchApp(desktop_file) {
	let app = Shell.AppSystem.get_default()
		.lookup_app(desktop_file);
	if (app != null)
		app.activate();
}

function openDefaultMailReader(account) {
	// Get default application for emails.
	let appInfo = Gio.AppInfo
		.get_default_for_type("x-scheme-handler/mailto", false);
	
	if (appInfo != null) {
		// Run default email application.
		launchApp(appInfo.get_id());
	} else {
		// Run default browser.
		// Must name your acount with valid web mail URL;
		// ... e.g. https://mail.google.com/
		GLib.spawn_async(
			// params: workingDirectory, argv, envp, flags, childSetup
			null, ["/usr/bin/env", "xdg-open", account], null, 0, null
		);
	}
}
