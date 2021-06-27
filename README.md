# RGUKT-Twitter-Result-Bot

## Instructions
* Clone the repository into your machine.
* Change your directory to `RGUKT-Twitter-Result-Bot` in terminal.
* Run `yarn install` command to install all package.json dependencies.
* Rename `configExample.js` to `config.js` and put your details.

## Getting Twitter keys and secrets for `config.js`
1. Sign in to Twitter (preferable to create a separate account) and apply for a developer account. [Primary reason: Making a bot]
2. Describe your use case and after verification, create an App inside a Project.
3. Enable `Read, Write, and Direct Messages` App permissions and `3-legged OAuth` to generate your secrets + tokens and save immediately in `config.js`.

## How to Run?
`node tweetListener.js`

## Usage
1. Post a tweet by mentioning #rguktresult, #rguktresultbot or @botrgukt along with your ID number and Date of Birth.
2. You then receive a screenshot of your results as a reply.
