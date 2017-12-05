const AV = require('../../utils/av-live-query-weapp-min');
const Todo = require('../../model/todo');
const bind = require('../../utils/live-query-binding');

Page({
  data: {
    todos: []
  },
  login: function() {
    return AV.Promise.resolve(AV.User.current())
      .then(
        user =>
          user
            ? user.isAuthenticated().then(authed => (authed ? user : null))
            : null
      )
      .then(user => (user ? user : AV.User.loginWithWeapp()));
  },
  fetchTodos: function(user) {
    const query = new AV.Query(Todo)
      .equalTo('user', AV.Object.createWithoutData('User', user.id))
      .descending('createdAt');
    const setTodos = this.setTodos.bind(this);
    return AV.Promise.all([
      query.limit(1).find().then(setTodos),
      query.subscribe()
    ]).then(([todos, subscription]) => {
      this.subscription = subscription;
      if (this.unbind) this.unbind();
      this.unbind = bind(subscription, todos, setTodos);
    });
  },
  onReady: function() {
  },
  onShow: function () {
    this.login()
    .then(this.fetchTodos.bind(this))
    .catch(error => consolo.error(error.message));    
  },
  onUnload: function() {
    this.subscription.unsubscribe();
    this.unbind();
  },
  setTodos: function(todos) {
    console.log(todos);
    const activeTodos = todos.filter(todo => !todo.done);
    this.setData({
      todos,
      activeTodos
    });
    return todos;
  },
  showTodo: function({ target: { dataset: { id } } }) {
    // TODO:
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 100)
  }
});
