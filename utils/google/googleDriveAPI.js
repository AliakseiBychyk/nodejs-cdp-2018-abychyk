const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { google } = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.file',
];
const TOKEN_PATH = '../../secret/google_drive_API_credentials.json';

const googleDriveRequest = (request, options) => {
  fs.readFile('../../secret/google_client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), request, options);
  });
};

const authorize = (credentials, callback, options) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, options);
  });
};

const getAccessToken = (oAuth2Client, callback) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code form that page here: ', code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) console.log(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
};

/**
 *
 * @param {google.auth.OAuth2} auth - an authorized OAuth2 client
 * @param {Object[]} options - array of additional parameters
 * @param {string} options[].fileId - file identifier in google drive
 * @callback options[].callback - callback methods invoked after getting the file from drive
 *
 */
const getFile = (auth, [fileId, callback]) => {
  const drive = google.drive({ version: 'v3', auth });
  const dest = fs.createWriteStream(path.join(__dirname, '../styles/nodejs18-hw3.css'));

  drive.files.get({
    fileId,
    alt: 'media',
    encoding: null,
  }, {
    responseType: 'stream',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ', err);
    res.data
      .on('error', err => {
        console.log('Error during download', err);
      })
      .on('end', () => {
        console.log('Done');
      })
      .pipe(dest);
  });
  dest.on('finish', () => {
    callback();
  });
};

const listFiles = auth => {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  }, (err, { data }) => {
    if (err) return console.log('The API returned an error: ', err);
    const files = data.files;
    if (files.length) {
      console.log('Files: ');
      files.map(file => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
};

module.exports = { googleDriveRequest, getFile };
