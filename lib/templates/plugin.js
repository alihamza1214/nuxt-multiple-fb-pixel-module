/**
 * @class FbMulti
 */
class FbMulti {
  constructor (fbq, options) {
    this.fbq = fbq
    this.options = options
  }

  /**
   * @method enable
   */
  enable () {
    this.init()
    this.track()
  }

  /**
   * @method init
   */
  init () {
    this.options.pixelId.forEach(id=>{
      this.query('init', id)

    })
  }

  /**
   * @method track
   */
  track (event = null, parameters = null,events=null) {
    if (!event) {
      event = this.options.track
    }
    console.log("sds",events);
    this.query('track', event, parameters,events)
  }

  /**
   * @method query
   * @param {string} cmd
   * @param {object} option
   * @param {object} parameters
   */
  query (cmd, option, parameters = null,events=null) {
    if (!parameters) {
      this.fbq(cmd, option)
    } else {
      this.fbq(cmd, option, parameters,events)
    }
  }
}

export default (ctx, inject) => {
  let _fbq

  /* eslint-disable */
  if (typeof window !== 'undefined') {
    ((f, b, e, v, n, t, s) => {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '<%= options.version %>';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.defer = true;
      t.src = v;
      s = b.getElementsByTagName('body')[0];
      s.parentNode.appendChild(t, s);

      _fbq = fbq;

    <% if (!options.disabled) { %>
        let fbIds=('<%= (options.pixelId) %>');
        let fbIdsArray=fbIds.split(',');
        fbIdsArray.forEach(id=>{
          fbq('init', id);
          fbq('track', '<%= options.track %>');
        })
        <% } %>
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  }

  const instance = new FbMulti(_fbq, <%= JSON.stringify(options) %>);
  /* eslint-enable */
  ctx.$fb = instance
  inject('fb', instance)
}
