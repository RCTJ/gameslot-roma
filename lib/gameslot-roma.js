'use babel';

import GameslotRomaView from './gameslot-roma-view';
import { CompositeDisposable } from 'atom';

export default {

  gameslotRomaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.gameslotRomaView = new GameslotRomaView(state.gameslotRomaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gameslotRomaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'gameslot-roma:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gameslotRomaView.destroy();
  },

  serialize() {
    return {
      gameslotRomaViewState: this.gameslotRomaView.serialize()
    };
  },

  toggle() {
    console.log('GameslotRoma was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
