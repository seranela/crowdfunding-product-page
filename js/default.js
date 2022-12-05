(() => {
// Navigation
const menuButton = document.getElementById('menu-toggle');
const menuNav = document.getElementById('nav-header');

// Bookmark icon
const buttonBookmark = document.getElementById('button-bookmark');
const bookmarkCircle = document.getElementById('bookmark-circle');
const bookmarkDesign = document.getElementById('bookmark-design');
const bookmarkLabel = document.getElementById('bookmark-label');

// Progress Bar
const progressAmount = document.getElementById('progress-amount');

// Back/Reward Buttons
const backProjectButton = document.getElementById('button-back-project');
const selectRewardButtons = document.querySelectorAll(
  '#button-select-reward1, #button-select-reward2, #button-select-reward3'
);

// Modal Close Button
const modalCloseButton = document.getElementById('modal-close-button');

// Pledge Radio Buttons
const pledgeChoices = document.querySelectorAll('.radio-button-pledge');

const pledgeContinueButtons = document.querySelectorAll(
  '#pledge-button-continue0, #pledge-button-continue1, #pledge-button-continue2, #pledge-button-continue3'
);

const modalConfirmButton = document.getElementById('button-confirm');

function resizeUpdate() {
  if (document.body.offsetWidth >= 576) {
    menuNav.setAttribute('aria-expanded', false);
    menuNav.classList.remove('nav-header-show');
    menuButton.classList.remove('nav-button-close');
  }
}

function toggleMenu() {
  if (menuNav.getAttribute('aria-expanded') === 'false') {
    menuNav.setAttribute('aria-expanded', true);
    menuNav.classList.add('nav-header-show');
    menuButton.classList.add('nav-button-close');
  } else {
    menuNav.setAttribute('aria-expanded', false);
    menuNav.classList.remove('nav-header-show');
    menuButton.classList.remove('nav-button-close');
  }
}

function toggleBookmark() {
  buttonBookmark.classList.toggle('button-icon-marked');
  bookmarkCircle.classList.toggle('bookmark-circle-marked');
  bookmarkDesign.classList.toggle('bookmark-design-marked');
}

function openModal(e) {
  if (e.target.id === 'button-back-project') {
    document.body.classList.add('no-scroll-overflow');
    document.getElementById('modal-pledges').classList.remove('hidden');
  } else {
    let choiceNumber = parseInt(e.target.id.charAt(e.target.id.length - 1));
    document.body.classList.add('no-scroll-overflow');
    document.getElementById('modal-pledges').classList.remove('hidden');
    document.getElementById('pledge-choice' + choiceNumber).checked = true;
    selectContainer(choiceNumber);
  }
}

function closeModal() {
  document.body.classList.remove('no-scroll-overflow');
  document.getElementById('modal-pledges').classList.add('hidden');
}

function selectContainer(choiceNumber) {
  for (let i = 0; i < pledgeChoices.length; i++) {
    let pledgeContainer = document.getElementById(pledgeChoices[i].id + '-container');
    let pledgeFooter = document.getElementById(pledgeChoices[i].id + '-footer');
    let pledgeNumber = parseInt(pledgeChoices[i].id.charAt(pledgeChoices[i].id.length - 1));

    if (pledgeNumber === choiceNumber) {
      pledgeContainer.classList.add('modal-pledge-selected');
      pledgeFooter.classList.remove('hidden');
    } else {
      pledgeContainer.classList.remove('modal-pledge-selected');
      pledgeFooter.classList.add('hidden');
    }
  }
}

function updateProgress(amount) {
  progressAmount.value = amount;
  progressAmount.innerText = '$' + amount.toLocaleString('en-US');
}

function pledgeContinue(e) {
  e.preventDefault();

  closeModal();

  document.body.classList.add('no-scroll-overflow');
  document.getElementById('modal-complete').classList.remove('hidden');

  let choiceNumber = parseInt(e.target.id.charAt(e.target.id.length - 1));

  // Update remaining count for selected reward

  let remainingCountID1 = '#reward' + choiceNumber + '-remaining';
  let remainingCountID2 = '#pledge-reward' + choiceNumber + '-remaining';

  let countTexts = document.querySelectorAll(remainingCountID1 + ', ' + remainingCountID2);
  for (let i = 0; i < countTexts.length; i++) {
    countTexts[i].innerHTML = parseInt(countTexts[i].innerHTML) - 1;
  }

  // Update dollar amount backed in stats
  const backedTotalObj = document.getElementById('backed-total');
  const pledgeAmount = parseInt(document.getElementById('pledge-amount' + choiceNumber).value);
  let backedTotal = parseInt(backedTotalObj.innerHTML.replace(',', '').substring(1)) + pledgeAmount;
  backedTotalObj.innerHTML = '$' + backedTotal.toLocaleString('en-US');

  // Update progress bar
  updateProgress(backedTotal);

  // Total people backing
  const backersTotalObj = document.getElementById('backers-total');
  let backersTotal = parseInt(backersTotalObj.innerHTML.replace(',', '')) + 1;
  backersTotalObj.innerHTML = backersTotal.toLocaleString('en-US');
}

function closeModalConfirm() {
  closeModal();
  document.body.classList.remove('no-scroll-overflow');
  document.getElementById('modal-complete').classList.add('hidden');
}

window.onload = () => {
  const backedTotalObj = document.getElementById('backed-total');
  let backedTotal = parseInt(backedTotalObj.innerHTML.replace(',', '').substring(1));
  updateProgress(backedTotal);
};

window.addEventListener('resize', resizeUpdate, false);
menuButton.addEventListener('click', toggleMenu, false);

backProjectButton.addEventListener('click', openModal, false);
buttonBookmark.addEventListener('click', toggleBookmark, false);
modalCloseButton.addEventListener('click', closeModal, false);
for (let i = 0; i < selectRewardButtons.length; i++) {
  selectRewardButtons[i].addEventListener('click', openModal, false);
}
for (let i = 0; i < pledgeChoices.length; i++) {
  pledgeChoices[i].addEventListener('click', (e) => {
    let choiceNumber = parseInt(e.target.id.charAt(e.target.id.length - 1));
    selectContainer(choiceNumber);
  }, false);
}
for (let i = 0; i < pledgeContinueButtons.length; i++) {
  pledgeContinueButtons[i].addEventListener('click', pledgeContinue, false);
}
modalConfirmButton.addEventListener('click', closeModalConfirm, false);
})();