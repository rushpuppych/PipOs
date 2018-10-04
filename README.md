# PipOs
PipOs is a Electron Application written in pure JavaScript. The PipOs is used for pentests and for security tests. It is posible to create and execute attacks vie the PipOs Grafical Interface. It has the Look of a 90' Hacker Movie and is inspired by the PipBoy3000 (Falllout series). From the view of a developer it is now posible to write little Config Components wich the user then can use and combine with other components to build his very own Attack. PipOs is designt to run on the RaspberryPi. It is optimized to be used wich touchscreens.

# Install
## Rasbian 
### Installation
The PipOs is based on the Rasbian Stretch Lite Image. Please Download the Rasbian Image from the Raspberry Pi Foundation and flash the Image to the micro SD Card (minimal 16GB in size).
https://www.raspberrypi.org/downloads/raspbian/

### Raspi Basic Configuration
Now Power the Raspberry Pi. After the Login execute:
```bash
sudo raspi-config
```
Then do your Localisation settings (Timezone, Keyboard etc.) and enable the SSH Service.

### Configure the Internet
Then you have to establish the connection to the Internet (Wifi or LAN doesnt matter). Try to get a IP and Ping the Google DNS service:
```bash
ping 8.8.8.8
```

### Update and Upgrade Rasbian
After you have established a Internet connection execute:
```bash
sudo apt-get update
sudo apt-get upgrade
```

## Install Dependency Packages for PipOs
Install the folowing Dependency Packages:
```bash
sudo apt-get install git
sudo apt-get install matchbox
sudo apt-get install unclutter
sudo apt-get install node nodejs npm
sudo apt-get install xserver-xorg
sudo apt-get install xinit
sudo apt-get install xserver-xorg-video-fbdev
```

### Install Kali Linux Tools
TODO

## Build PipOs Kiosk Mode
git clone https://github.com/electron/electron-quick-start
cd electron-quick-start
npm install
npm start

## Autostart 
Build autostart script and auto login script for PipOS


