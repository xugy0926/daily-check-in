const AV = require('../../utils/av-live-query-weapp-min');
const Todo = require('../../model/todo');
const bind = require('../../utils/live-query-binding');

Page({
  data: {
    title: '',
    content: ''
  },
  login: function () {
    return AV.Promise.resolve(AV.User.current())
      .then(
      user =>
        user
          ? user.isAuthenticated().then(authed => (authed ? user : null))
          : null
      )
      .then(user => (user ? user : AV.User.loginWithWeapp()));
  },
  fetchTags: function () {
    const user = AV.User.current();
  },
  onReady: function () {
    this.fetchTags.bind(this);
  },
  onUnload: function() {
  },
  setTodos: function(todos) {
    const activeTodos = todos.filter(todo => !todo.done);
    this.setData({
      todos,
      activeTodos
    });
    return todos;
  },
  updateTitle: function({ detail: { value } }) {
    // Android 真机上会诡异地触发多次时 value 为空的事件
    if (!value) return;
    this.setData({
      title: value
    });
  },
  updateContent: function({ detail: { value } }) {
    // Android 真机上会诡异地触发多次时 value 为空的事件
    if (!value) return;
    this.setData({
      content: value
    });
  },
  addTodo: function() {
    var title = this.data.title && this.data.title.trim();
    var content = this.data.title && this.data.content;
    if (!title || !content) {
      return;
    }
    var acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(AV.User.current(), true);
    acl.setWriteAccess(AV.User.current(), true);
    new Todo({
      title: title,
      content: content,
      done: false,
      user: AV.User.current()
    })
      .setACL(acl)
      .save()
      .then(todo => {
        wx.switchTab({
          url: '../home/home'
        })
      })
      .catch(console.error);
    this.setData({
      draft: ''
    });
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 100)
  }
});
