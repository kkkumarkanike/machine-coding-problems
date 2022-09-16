const mailTypes = document.querySelector(".mail-types");
const mails = document.querySelector(".mails");
const emailDetails = document.querySelector(".mail-details");

const emails = [
  {
    emailId: 12345,
    subject: "Requesting for approval",
    body: "I'm requesting for your approval. So please approve this",
    read: false,
    emailIn: "inbox",
  },
  {
    emailId: 23451,
    subject: "Email 1",
    body: "I'm requesting for your approval. So please approve this",
    read: false,
    emailIn: "inbox",
  },
  {
    emailId: 34521,
    subject: "Email 2",
    body: "I'm requesting for your approval. So please approve this",
    read: false,
    emailIn: "inbox",
  },
  {
    emailId: 52341,
    subject: "Email 3",
    body: "I'm requesting for your approval. So please approve this",
    read: false,
    emailIn: "inbox",
  },
  {
    emailId: 23415,
    subject: "Email 4",
    body: "I'm requesting for your approval. So please approve this",
    read: false,
    emailIn: "inbox",
  },
];

const setEmails = (mails) => {
  localStorage.setItem("emails", JSON.stringify(mails));
};
const getEmails = () => {
  return localStorage.getItem("emails")
    ? JSON.parse(localStorage.getItem("emails"))
    : [];
};

const emailTypeTemplate = (emailType, count) =>
  `<div id="${emailType}"">${emailType}</div><span>${count}</span>`;

const emailTemplate = (email, type) => `<div class="${
  email.read ? "read-mail" : "unread-mail"
}" id="${email.emailId}" data-type="${type}"">
     <p style="padding: 0;margin: 0;font-weight:bold; font-size: 18px;color: ${
       email.read ? "#aaa" : ""
     }">${email.subject}<br>
     <p style="padding: 0;margin: 0;color: ${
       email.read ? "#aaa" : ""
     }">${email.body.substr(0, 30)}...</p>
</div>`;

const renderEmailTypes = function () {
  let allEmails = getEmails();
  const types = ["inbox", "deleted", "pinned"];
  let emailTypes = "";
  for (let type of types) {
    emailTypes += emailTypeTemplate(
      type,
      allEmails.filter((mail) => mail.emailIn == type).length
    );
  }
  mailTypes.innerHTML = emailTypes;
};

const renderEmails = (emails, emailType) => {
  let allEmails = "";
  for (let email of emails) {
    allEmails += emailTemplate(email, emailType);
  }
  mails.innerHTML = allEmails;
};

const renderMailDetails = (email) => {
  let mailDetails = `<div class="mail-description" id="${email.emailId}" data-type="${email.emailIn}">
     <div class="subject">${email.subject}</div>
     <div class="body">${email.body}</div>
     <a href="#" style="${email.emailIn == "deleted"? "display: none": ""}">Delete</a>
</div>`;
  emailDetails.innerHTML = mailDetails;
};

const init = () => {
  renderEmailTypes();
    // setEmails(emails);
};

mailTypes.addEventListener("click", (e) => {
  emailDetails.innerHTML = "";
  if (e.target.innerText === "inbox") {
    let allEmails = getEmails();
    let inboxEmails = allEmails.filter((each) => each.emailIn === "inbox");
    renderEmails(inboxEmails, e.target.innerText);
  } else if (e.target.innerText === "deleted") {
    let allEmails = getEmails();
    let deletedEmails = allEmails.filter((each) => each.emailIn === "deleted");
    renderEmails(deletedEmails, e.target.innerText);
  } else if (e.target.innerText === "pinned") {
    let allEmails = getEmails();
    let pinnedEmails = allEmails.filter((each) => each.emailIn === "pinned");
    renderEmails(pinnedEmails, e.target.innerText);
  }
});

mails.addEventListener("click", (e) => {
  let parentNode = e.target.parentNode;
  let emailType = parentNode.getAttribute("data-type");
  let emailId = parentNode.getAttribute("id");
  console.log("emailId",emailId);
  let allEmails = getEmails();
  let readMails = allEmails.map((email) =>
    email.emailId == emailId ? { ...email, read: true } : email
  );
  let getMailDetails = readMails.filter((email) => email.emailId == emailId)[0];
  let filteredEmails = readMails.filter((each) => each.emailIn == emailType);
  setEmails(readMails);
  renderEmails(filteredEmails, emailType);
  renderMailDetails(getMailDetails);
});

emailDetails.addEventListener("click", (e) => {
  if (e.target.innerText === "Delete") {
    let id = e.target.parentNode.getAttribute("id");
    let type = e.target.parentNode.getAttribute("data-type")
    // console.log(id,type);
    let allEmails = getEmails();
    let filteredEmails = allEmails.map((email) =>
      email.emailId == id ? {...email, emailIn: "deleted" } : email
    );
    console.log("filtered",filteredEmails);
    setEmails(filteredEmails);
    renderEmailTypes();
    renderEmails(filteredEmails.filter(mail => mail.emailIn === type), type);
    emailDetails.innerHTML="";
  }
});

init();