const userInput = document.getElementById("input-value");

const commentList = document.getElementById("comments-list");

const getAllComments = () => {
  return localStorage.getItem("comments")
    ? JSON.parse(localStorage.getItem("comments"))
    : [];
};

const setComments = (comments) => {
  localStorage.setItem("comments", JSON.stringify(comments));
};

const addComment = function () {
  if (!localStorage.getItem("comments")) {
    let comments = [];
    setComments(comments);
  }
  comments = getAllComments();
  comments.push({
    parentId: null,
    commentId: Math.random().toString().substr(2, 7),
    commentText: userInput.value,
    childComments: [],
    likes: 0,
  });
  setComments(comments);
  finalCommentsView();
  userInput.value = "";
};

const eachComment = (comment, pad) =>
  `<div style="padding-left: ${pad}px; margin: 20px 0px"  data-parentId="${comment.parentId}" id="${comment.commentId}">
       ${comment.commentText}
       <a href="#" style="padding-left: 5px">Edit</a>
       <a href="#" style="padding-left: 5px">Delete</a>
       <a href="#" style="padding-left: 5px">Like</a><span style="padding-left: 3px;">${comment.likes}</span>
       <a href="#" style="padding-left: 5px">Reply</a><span style="padding-left: 3px;">${comment.childComments.length}</span>
  </div>`;

const addEditBox = (parentId, operationType, currentComment) => {
  let div = document.createElement("div");
  div.classList.add("margin-top");
  div.setAttribute("data-parentId", parentId);
  div.innerHTML = `<input type="text" value="${
    operationType === "Update Comment" ? currentComment : ""
  }"><a href="#">${operationType}</a>`;
  return div;
};

const addCommentsToUI = function (comments, padding = 0) {
  let elements = "";
  for (let i = 0; i < comments.length; i++) {
    elements += eachComment(comments[i], padding);
    // * Action of Nesting
    if (comments[i].childComments.length > 0) {
      elements += addCommentsToUI(comments[i].childComments, (padding += 20));
      padding -= 20;
    }
  }
  return elements;
};

const updateComment = (comments, updateCommentId, updatedCommentText) => {
  for (let i in comments) {
    if (comments[i].commentId === updateCommentId) {
      comments[i].commentText = updatedCommentText;
    }
    // * Nesting come here
    else if (comments[i].childComments.length > 0) {
      updateComment(
        comments[i].childComments,
        updateCommentId,
        updatedCommentText
      );
    }
  }
};

const deleteComment = function (comments, commentId) {
  for (let i in comments) {
    if (comments[i].commentId === commentId) {
      comments.splice(i, 1);
    } else if (comments[i].childComments.length > 0) {
      deleteComment(comments[i].childComments, commentId);
    }
  }
};

const incrementLikesByOne = (comments, commentId) => {
  for (let i in comments) {
    if (comments[i].commentId === commentId) {
      comments[i].likes = comments[i].likes ? comments[i].likes + 1 : 1;
    } else if (comments[i].childComments.length > 0) {
      // * Nesting Logic here
      incrementLikesByOne(comments[i].childComments, commentId);
    }
  }
};

const addNewComment = (comments, newComment) => {
  for(let each of comments){
    if(each.commentId === newComment.parentId){
      each.childComments.push(newComment);
    }else if(each.childComments.length > 0){
      addNewComment(each.childComments, newComment);
    }
  }
};

const finalCommentsView = () => {
  const comments = getAllComments();
  if (comments) {
    let allComments = addCommentsToUI(comments);
    commentList.innerHTML = allComments;
  }
};
finalCommentsView();

const editCommentView = () => {};

commentList.addEventListener("click", (e) => {
  if (e.target.innerText === "Edit") {
    let parentId = !e.target.parentNode.getAttribute("data-parentId")
      ? e.target.parentNode.getAttribute("data-parentId")
      : e.target.parentNode.getAttribute("id");
    let parentNode = e.target.parentNode;
    let nodeData = parentNode.innerText.split(" ");
    let indexOfUpdate = nodeData.indexOf("Edit");
    let commentText = nodeData.slice(0, indexOfUpdate).join(" ");

    parentNode.appendChild(addEditBox(parentId, "Update Comment", commentText));
    e.target.style.display = "none";
  } else if (e.target.innerText === "Delete") {
    let comments = getAllComments();
    deleteComment(comments, e.target.parentNode.getAttribute("id"));
    setComments(comments);
    finalCommentsView();
  } else if (e.target.innerText === "Like") {
    let comments = getAllComments();
    incrementLikesByOne(comments, e.target.parentNode.getAttribute("id"));
    setComments(comments);
    finalCommentsView();
  } else if (e.target.innerText === "Update Comment") {
    let parentId = e.target.parentNode.getAttribute("data-parentId");
    let updatedText = e.target.parentNode.firstChild.value;
    let allComments = getAllComments();
    updateComment(allComments, parentId, updatedText);
    setComments(allComments);
    finalCommentsView();
  } else if (e.target.innerText === "Reply") {
    let parentId = !e.target.parentNode.getAttribute("data-parentId")
      ? e.target.parentNode.getAttribute("data-parentId")
      : e.target.parentNode.getAttribute("id");
    let parentNode = e.target.parentNode;

    parentNode.appendChild(addEditBox(parentId, "Add Reply"));
    e.target.style.display = "none";
  } else if (e.target.innerText === "Add Reply") {
    let id = e.target.parentNode.getAttribute("data-parentId");
    let replyText = e.target.parentNode.firstChild.value;
    let allComments = getAllComments();
    const newComment = {
      parentId: id,
      commentId: Math.random().toString().substr(2, 7),
      commentText: replyText,
      childComments: [],
      likes: 0,
    };
    addNewComment(allComments, newComment);
    setComments(allComments);
    finalCommentsView();
  }
});
