# PipOs
PipOs is a Electron Application written in pure JavaScript. The PipOs is used for pentests and for security tests. It is posible to create and execute attacks vie the PipOs Grafical Interface. It has the Look of a 90' Hacker Movie and is inspired by the PipBoy3000 (Falllout series). From the view of a developer it is now posible to write little Config Components wich the user then can use and combine with other components to build his very own Attack. PipOs is designt to run on the RaspberryPi. It is optimized to be used wich touchscreens.

# Install
## Rasbian 
### Installation
The PipOs is based on the Rasbian Stretch Lite Image. Please Download the Rasbian Image from the Raspberry Pi Foundation and flash the Image to the micro SD Card (minimal 16GB in size).
https://www.raspberrypi.org/downloads/raspbian/

### Raspi Basic Configuration
Now Power the Raspberry Pi. After the Login execute:
```sh
sudo raspi-config
```
Then do your Localisation settings (Timezone, Keyboard etc.) and enable the SSH Service.

### Configure the Internet
Then you have to establish the connection to the Internet (Wifi or LAN doesnt matter). Try to get a IP and Ping the Google DNS service:
```sh
ping 8.8.8.8
```

### Update and Upgrade Rasbian
After you have established a Internet connection execute:
```sh
sudo apt-get update
sudo apt-get upgrade
```

## Install Dependency Packages for PipOs
```sh
sudo apt-get install git
sudo apt-get install matchbox
sudo apt-get install xwindow
sudo apt-get install unclutter
sudo apt-get install node
```

### Install Kali Linux Tools
Make sure you add the kali-linux repositories to your apt list configuration
(e.g. create a file called kali.list in the directory /etc/apt/sources.list.d)
```sh
sudo nano /etc/apt/sources.list.d/kali.list
```

and Add the folowing repos to the list:
```sh
deb http://http.kali.org/kali kali main non-free contrib
deb http://security.kali.org/kali-security kali/updates main contrib non-free
deb http://repo.kali.org/kali kali-bleeding-edge main
```

Update all your apt dependency again
```sh
sudo apt-get update
```

Install Kali Install Tools
```sh
sudo apt-get install kali-linux-wireless
sudo apt-get install kali-linux-pwtools
sudo apt-get install kali-linux-web
```

## Build PipOs Kiosk Mode
get Electron framework
get PipOs framework
test

## Autostart 
Build autostart script and auto login script for PipOS


