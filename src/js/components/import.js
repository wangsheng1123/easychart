(function () {
    var h = require('virtual-dom/h');
    var createElement = require('virtual-dom/create-element');
    var paste = require('./import/paste');
    var upload = require('./import/upload');
    var dad = require('./import/dragAndDrop');
    var url = require('./import/url');
    var that = {};
    that.load = function (element, services) {
        var container = createElement(h('div.accordion-tabs-minimal'));
        element.appendChild(container);
        var tabs = h('div');
        var tabsOptions = {
            paste:{
                label: 'Paste CSV',
                content: function(element){
                    paste.load(element, services);
                }
            },
            upload:{
                label: 'upload CSV',
                content: function(element){
                    upload.load(element, services);
                    dad.load(element, services);
                }
            },
            url:{
                label: 'url CSV',
                content: function(element){
                    url.load(element, services);
                }
            }
        };

        function goToTab(tab) {
            container.innerHTML = '';
            container.appendChild(createElement(template(tab)));
            var content = createElement(h('div.tab-content'));
            tabsOptions[tab].content(content);
            container.appendChild(content);
        }

        function template(activeTab) {
            var links = ['paste', 'upload', 'url'];
            return h('ul.tab-list', links.map(function (id) {
                    var className = activeTab === id ? 'is-active' : '';
                    return h('li.tab-link', {
                        'className': className,
                        'ev-click': function () {
                            goToTab(id);
                        }
                    }, tabsOptions[id].label)
                }))
        }
        goToTab('paste')
    };

    module.exports = that;
})();



