// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022-2025 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

Fabricare.include("vendor");

messageAction("make");

if (Shell.fileExists("temp/build.done.flag")) {
	return;
};

if (!Shell.directoryExists("source")) {
	exitIf(Shell.system("7z x -aoa archive/" + Project.vendor + ".7z"));
	Shell.rename(Project.vendor, "source");
};

Shell.mkdirRecursivelyIfNotExists("output");
Shell.mkdirRecursivelyIfNotExists("output/bin");
Shell.mkdirRecursivelyIfNotExists("output/include");
Shell.mkdirRecursivelyIfNotExists("output/lib");
Shell.mkdirRecursivelyIfNotExists("temp");

Shell.mkdirRecursivelyIfNotExists("temp/cmake");

if (!Shell.fileExists("temp/build.config.flag")) {

	Shell.setenv("CC", "cl.exe");
	Shell.setenv("CXX", "cl.exe");

	cmdConfig = "cmake";
	cmdConfig += " ../../source";
	cmdConfig += " -G \"Ninja\"";

	if (Fabricare.isDynamic()) {

		cmdConfig += " -DCMAKE_BUILD_TYPE=Release";
		cmdConfig += " -DCMAKE_INSTALL_PREFIX=" + Shell.realPath(Shell.getcwd()) + "\\output";
		cmdConfig += " -DCURL_USE_OPENSSL=1";
		cmdConfig += " -DBUILD_SHARED_LIBS=ON";

	};

	if (Fabricare.isStatic()) {
		cmdConfig += " -DCMAKE_BUILD_TYPE=Release";
		cmdConfig += " -DCMAKE_INSTALL_PREFIX=" + Shell.realPath(Shell.getcwd()) + "\\output";
		cmdConfig += " -DCURL_USE_OPENSSL=1";
		cmdConfig += " -DBUILD_SHARED_LIBS=OFF";
		cmdConfig += " -DWIN32_MT_BUILD=ON";
	};

	runInPath("temp/cmake", function () {
		exitIf(Shell.system(cmdConfig));
	});

	Shell.filePutContents("temp/build.config.flag", "done");
};

runInPath("temp/cmake", function () {
	exitIf(Shell.system("ninja"));
	exitIf(Shell.system("ninja install"));
	exitIf(Shell.system("ninja clean"));
});

Shell.remove("output/bin/curl-config");

Shell.filePutContents("temp/build.done.flag", "done");
