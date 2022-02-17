# AdaKerja Node.JS Assignment

A test to become a node.js developer

![Chatbot Result](https://media.giphy.com/media/bTr4DM2HECdXbivZjO/giphy.gif)

# Setting up the Messenger App

## Requirements

- **Facebook Page:** Will be used as the identity of your messaging experience. When people chat with your page. To create a new Page, visit https://www.facebook.com/pages/create.
- **Facebook Developer Account:** Required to create new apps, which are the core of any Facebook integration. You can create a new developer account by going to the [Facebook Developers website](https://developers.facebook.com/) and clicking the "Get Started" button.
- **Facebook App:** Contains the settings for your Messenger automation, including access tokens. To create a new app, visit your [app dashboard](https://developers.facebook.com/apps).

## Setup Steps

Before you begin, make sure you have completed all of the requirements listed above. At this point you should have a Page and a registered Facebook App.

#### Get the App id and App Secret

1. Go to your app Basic Settings, [Find your app here](https://developers.facebook.com/apps)
2. Save the **App ID** number and the **App Secret**

#### Grant  Messenger access to your Facebook App

1. Go to your app Dashboard
2. Under _Add Product_ find _Messenger_ and click _Set Up_
3. Now you should be in the App Messenger Settings
4. Under Access Tokens, click on _Add or Remove Pages_
5. Select the desired page and allow "Manage and access Page conversations" in Messenger
6. Select the desired page and an access token should appear
7. Get the Page ID from the page access token by using the [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
8. In the section Built-In NLP, select your page and enable the toggle

# Installation

Clone this repository on your local machine:

```bash
$ git clone https://github.com/arulajeh/adakerja-nodejs.git
$ cd adakerja-nodejs
```

You will need:

- [Node](https://nodejs.org/en/) 10.x or higher
- A local tunneling service such as [ngrok](https://ngrok.com/), or your own webserver.
- PostgreSQL

# Usage

#### 1. Install tunneling service

If not already installed, install ngrok via [download](https://ngrok.com/download) or via command line:

```bash
npm install -g ngrok
```

In the directory of this repo, request a tunnel to your local server with your preferred port
```bash
ngrok http 8080
```

The screen should show the ngrok status:

```
Session Status                online
Account                       Username (Plan: Free)
Version                       2.3.40
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://1c3b838deacb.ngrok.io -> http://localhost:8080
Forwarding                    https://1c3b838deacb.ngrok.io -> http://localhost:8080

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```
Note the https URL of the external server that is fowarded to your local machine. In the above example, it is `https://1c3b838deacb.ngrok.io`.

#### 2. Prepare Database

- Open file located on `adakerja-nodejs/db/database.sql`
- Open your database
- Run the SQL script on your SQL client software like DBeaver or anything else

#### 3. Install the dependencies

Open a new terminal tab, also in the repo directiory.

```bash
$ npm install
```

#### 4. Set up .env file

Copy the file `.sample.env` to `.env`

```bash
cp .sample.env .env
```

Edit the `.env` file to add all the values for the app

#### 5. Run your app locally

```bash
node index.js
```

#### 6. Check your app env

Use the `VERIFY_TOKEN` that you created in `.env` file
```
http://localhost:8080/webhook?hub.verify_token={VERIFY_TOKEN}&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe
```

You have fully set up your app, you can start send message on your facebook page.

# Testing

### Install mocha from npm

Run this on your terminal / CMD
``` 
npm install -g mocha 
```

### Test the application
Run this on your terminal / cmd
```
npm test
```