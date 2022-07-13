import axios from "axios";
async function analysisSentiment(path = "", text = { text: "" }) {
  try {
    const meaningcloudRes = await axios({
      method: "post",
      url: path,
      headers: {
        "Content-Type": "application/json",
      },
      data: text,
    });
    return meaningcloudRes.data;
  } catch (error) {
    throw Error(error);
  }
}

export { analysisSentiment };
