import Twitter from "twitter-lite";
import config from "./config.js";
import replyToTweet from "./reply.js";
import {parseRoll, parseDate} from "./utils.js";
const timeout = 31000;
let backoffExponential = 0;
let timeLastResponseReceived;

const client = new Twitter({
  consumer_key: config.apiKey, // from Twitter.
  consumer_secret: config.apiSecret, // from Twitter.
  access_token_key: config.accessToken, // from your User (oauth_token)
  access_token_secret: config.accessTokenSecret, // from your User (oauth_token_secret)
});

const parameters = {
  track: "#rguktresult, #rguktresultbot, @botrgukt",
};

const handleTweet = async ({ text, id_str, user, retweeted }) => {
  if (retweeted) return;
  const rollno = parseRoll(text);
  const dateofbirth = parseDate(text);
  const res = await replyToTweet(rollno, dateofbirth, id_str, user.screen_name);
  //console.log("Tweet sent", res.text);
};

async function reconnect(stream) {
  backoffExponential++;
  if (stream.destroy) stream.destroy();
  await sleep(2 ** backoffExponential * 1000);
  startStream();
  // If you use this code, remember to also:
  // 1. Reset backoffExponential at some point
  // 2. Check if connected to network before starting stream
  // 3. Make sure you do not start a stream if one is already running
}

async function sleep(delay) {
  return new Promise((resolve) => setTimeout(() => resolve(true), delay));
}

const stream = client
  .stream("statuses/filter", parameters)
  .on("start", (response) => {
    console.log("start");
    // Stall handling
    const intervalId = setInterval(function () {
      if (Date.now() - timeLastResponseReceived > timeout) {
        console.log("timeout");
        clearInterval(intervalId);
        reconnect(stream);
      }
    }, timeout);
  })
  .on("data", handleTweet)
  .on("ping", () => console.log("ping"))
  .on("error", (error) => console.log("error", error))
  .on("end", (response) => console.log("end"));
