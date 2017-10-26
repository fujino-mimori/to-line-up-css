'use babel';

import ToLineUpCssView from './to-line-up-css-view';
import { CompositeDisposable } from 'atom';

export default {

  toLineUpCssView: null,
  modalPanel: null,
  subscriptions: null,

  // パッケージ有効化の処理
  activate(state) {
    this.toLineUpCssView = new ToLineUpCssView(state.toLineUpCssViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.toLineUpCssView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'to-line-up-css:toggle': () => this.toggle()
    }));
  },

  // パッケージ無効化の処理
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.toLineUpCssView.destroy();
  },

  serialize() {
    return {
      toLineUpCssViewState: this.toLineUpCssView.serialize()
    };
  },

  toggle() {
    console.log('ToLineUpCss was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

  test() {
      getText: -> @buffer.getText()
      console.log(getText)
  }

};
