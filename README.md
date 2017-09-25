# PipOs
PipOs is a Electron Application written in pure JavaScript. The PipOs is used for pentests and for security tests. It is posible to create and execute attacks vie the PipOs Grafical Interface. It has the Look of a 90' Hacker Movie and is inspired by the PipBoy3000 (Falllout series). From the view of a developer it is now posible to write little Config Components wich the user then can use and combine with other components to build his very own Attack. PipOs is designt to run on the RaspberryPi. It is optimized to be used wich touchscreens.

# Install
## Rasbian 
### Installation
The PipOs is based on the Rasbian Stretch Lite Image. Please Download the Rasbian Image from the Raspberry Pi Foundation and flash the Image to the micro SD Card (minimal 16GB in size).
https://www.raspberrypi.org/downloads/raspbian/

### Raspi Basic Configuration
Now Power the Raspberry Pi. After the Login execute:
```
sudo raspi-config
```
Then do your Localisation settings (Timezone, Keyboard etc.) and enable the SSH Service.

### Configure the Internet
Then you have to establish the connection to the Internet (Wifi or LAN doesnt matter). Try to get a IP and Ping the Google DNS service ("ping 8.8.8.8").

### Update and Upgrade Rasbian
After you have established a Internet connection execute:
```
sudo apt-get update
sudo apt-get upgrade
```

## Install Dependecy Packages for PipOs
All packages: git, matchbox, xwindow, unclutter, node, kali install tool etc. etc.

## Build PipOs Kiosk Mode
get Electron framework
get PipOs framework
test

## Autostart 
Build autostart script and auto login script for PipOS


