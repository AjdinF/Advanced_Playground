export function showOrHideComments() {

  const showHideBtn = document.querySelector<HTMLButtonElement>('.show-hide');
  const commentWrapper = document.querySelector<HTMLElement>('.comment-wrapper');

  if (!showHideBtn || !commentWrapper) {
    console.error('Required elements not found');
    return;
  }
  commentWrapper.style.display = 'none';

  showHideBtn.onclick = () => {
    const showHideText = showHideBtn.textContent;

    if (showHideText == 'Show comments') {
      showHideBtn.textContent = 'Hide comments';
      commentWrapper.style.display = 'block';
    } else {
      showHideBtn.textContent = 'Show comments';
      commentWrapper.style.display = 'none';
    }
  };
}

export function addingComments() {

  const form = document.querySelector<HTMLFormElement>('.comment-form');
  const nameField = document.querySelector<HTMLInputElement>('#name');
  const commentField = document.querySelector<HTMLTextAreaElement>('#comment');
  const list = document.querySelector<HTMLUListElement>('.comment-container');

  if (!form || !nameField || !commentField || !list) {
    console.error('Required elements not found');
    return;
  }

  form.onsubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const listItem = document.createElement('li');
    const namePara = document.createElement('p');
    const commentPara = document.createElement('p');
    const nameValue = nameField.value;
    const commentValue = commentField.value;

    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    list.appendChild(listItem);
    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);

    nameField.value = '';
    commentField.value = '';
  };
}
