async function handleSubmit(event) {
  event.preventDefault();
  let formText = document.getElementById("input").value;

  if (formText.trim() === "") {
    document.getElementById("warning").classList.add("visible");
    return;
  } else {
    document.getElementById("warning").classList.remove("visible");
  }

  const sentimentRes = await Client.analysisSentiment("/analysis", {
    text: formText,
  });

  let content = "";

  if (sentimentRes.status.msg !== "OK") {
    content = `<h4>Error: ${sentimentRes.status.msg}</h4>`;
  } else {
    content =
      `<h3>subjectivity: ${sentimentRes.subjectivity}</h3>` +
      sentimentRes.sentence_list
        .map((s) => {
          return `<div class="sentence">
      <p>Sentence: ${s.text}</p>
      <p>Agreement: ${s.agreement}</p>
      <p>Confidence: ${s.confidence}</p>
    </div>`;
        })
        .join("");
  }

  document.getElementById("results").innerHTML = content;
}

const testJest = {
  play() {
    return true;
  },
};

export { handleSubmit, testJest };
