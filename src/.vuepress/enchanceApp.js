import headerMixin from './script/headerMixin';

export default ({ Vue, options, router, siteData }) => {
    Vue.mixin(headerMixin)
};