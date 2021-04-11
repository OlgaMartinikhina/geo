/* eslint-disable class-methods-use-this */
export default class Widget {
  constructor() {
    this.container = document.querySelector('.container');

    this.chat = document.querySelector('.chat');
    this.chatForm = document.querySelector('.chat form');
    this.postList = document.querySelector('.messagesArea');
    this.postInput = this.chatForm.querySelector('input');

    this.modal = this.container.querySelector('.modal');
    this.modalInput = this.modal.querySelector('input');
    this.modalTooltip = this.modal.querySelector('.tooltip');
  }

  textNoteTeplate({ text, latitude, longitude }) {
    return `
    <div>
      <p>${text}</p>
      <span>[${latitude}, ${longitude}]</span>
    </div>
    `;
  }
}
