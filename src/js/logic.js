/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
export default class Logic {
  constructor(widget) {
    this.widget = widget;
    this.text = null;
    this.latitude = null;
    this.longitude = null;
    this.notes = [];
    this.sendGPS = this.sendGPS.bind(this);
  }

  init() {
    this.widget.chatForm.addEventListener('submit', (e) => this.sendTextNote(e));
    this.widget.modal.addEventListener('submit', (evt) => this.sendGPS(evt));
    this.widget.modal.addEventListener('input', (e) => this.checkGPS(e));
  }

  checkGPS(e) {
    if (e) e.preventDefault();
    const errors = {
      gps: [/^\[{0,}-{0,1}\d{1,3}\.\d{5},\s{0,}-{0,1}\d{1,3}\.\d{5}\]{0,}$/, 'Неверно'],
    };
    const constraint = errors.gps[0];
    if (constraint.test(this.widget.modalInput.value)) {
      this.widget.modalInput.setCustomValidity('');
      this.widget.modalTooltip.innerText = '';
      return true;
    }
    this.widget.modalInput.setCustomValidity(errors.gps[1]);
    this.widget.modalTooltip.innerText = errors.gps[1];
    return false;
  }

  sendGPS(e) {
    if (e) e.preventDefault();
    if (!this.checkGPS(e)) return;

    const reg = /-{0,1}\d{1,3}\.\d{5}/g;
    const latitude = this.widget.modalInput.value.match(reg)[0];
    const longitude = this.widget.modalInput.value.match(reg)[1];
    const { text } = this;

    this.notes.push({ text, latitude, longitude });
    this.showPosts();
    this.widget.modal.classList.add('hidden');
    this.widget.modalInput.value = '';
    this.text = null;
  }

  sendTextNote(e) {
    e.preventDefault();
    if (this.widget.postInput.value === '') return;
    const text = this.widget.postInput.value;

    this.text = this.widget.postInput.value;
    this.showPosts();

    this.getlocation()
      .then((position) => {
        const latitude = position.coords.latitude.toFixed(5);
        const longitude = position.coords.longitude.toFixed(5);
        this.notes.push({ text, latitude, longitude });
        this.showPosts();
        this.widget.postList.scrollTo(0, 0);
      }).catch(() => {
        this.widget.modal.classList.remove('hidden');
        this.widget.modalInput.focus();
      });
    this.widget.postInput.value = '';
  }

  getlocation(options) {
    return new Promise((resolve, posError) => {
      navigator.geolocation.getCurrentPosition(resolve, posError, options);
    });
  }

  showPosts() {
    this.widget.postList.innerHTML = '';
    // eslint-disable-next-line no-plusplus
    for (let i = this.notes.length - 1; i >= 0; i--) {
      this.widget.postList.innerHTML += this.widget.textNoteTeplate(this.notes[i]);
    }
  }
}
