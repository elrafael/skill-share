# Android Development Setup

This project uses Ionic and Capacitor to build and run the Android application.

The instructions below focus on running the app using an Android Virtual Device (AVD) emulator via Android Studio (recommended).

**What this file contains:**

- **Prerequisites:** software you need installed
- **Create and start an AVD:** quick steps to make an emulator
- **Build & Run:** commands to build the web app, sync with Capacitor, and install to the emulator

## Prerequisites

- Node.js and npm (LTS recommended)
- Java JDK (11 or newer)
- Android SDK (installed with Android Studio)
- Android Studio (recommended)

If you don't have Android Studio, install it from: https://developer.android.com/studio

## Create and start an Android Virtual Device (AVD)

1. Open Android Studio.
2. Open Device Manager: **More Actions → Virtual Device Manager** or **Tools → Device Manager**.
3. Click **Create Device** and pick a device (for example, Pixel 8).
4. Choose a system image (Google Play image, e.g. Android 15 / API 35, x86_64). Download if needed.
5. Finish and return to Device Manager.
6. Start the emulator by clicking the green Play icon next to the AVD.

You can also start an AVD from the command line if the SDK `emulator` tool is on your PATH:

```powershell
emulator -list-avds
emulator -avd <AVD_NAME>
```

## Build & Run the app on the emulator

Follow these steps from the project root.

1. Install dependencies and build the web assets:

```bash
npm install
npm run build
```

2. Sync the native Android project with Capacitor:

```bash
npx cap sync android
```

3. Open the Android project in Android Studio (recommended):

```bash
npx cap open android
```

In Android Studio: select the running emulator (AVD) and click **Run** (green ▶) to build and install the app.

4. (Optional) Install directly from the command line to a running emulator using Gradle:

```powershell
cd android
.\gradlew.bat installDebug
```

5. Verify device connection and installed app:

```bash
adb devices
```

## Troubleshooting tips

- If the emulator doesn't appear in Android Studio, ensure the AVD is started and `adb devices` lists it.
- If Gradle fails, open the `android` project in Android Studio and let it sync the Gradle files; SDK components may prompt for install.
- If you change web code, repeat `npm run build` and `npx cap sync android` before installing again.
