import config from '../config'
import Guid from 'guid'

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', `https://www.google-analytics.com/analytics${config.debug?"_debug":""}.js`, 'ga');

if (config.debug) {
    window.ga_debug = {
        trace: true
    }
}

ga('create', 'UA-70937937-1', 'auto');
ga('send', 'pageview', '/');

export function analytics(metric1, metric2) {
    if (metric1 > 5 && metric2) {
        let myDate = new Date()
        let dimension1 = Guid.raw()
        let dimension2 = (myDate.getHours() > 9 ? myDate.getHours() : '0' + myDate.getHours()) + ":" + (myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes()) + ":" + (myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds())
        ga('send', 'event', '答题活动', '六一', {
            'dimension1': dimension1,
            'dimension2': dimension2,
            'metric1': metric1,
            'metric2': metric2,
            'metric3': metric1 / metric2
        });
    }
}
