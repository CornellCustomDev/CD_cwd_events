const Paginator = require('pagination');

// https://www.npmjs.com/package/pagination
export default page => {
    const paginator = new Paginator.TemplatePaginator({
        current: page.current,
        rowsPerPage: page.size,
        totalResult: page.total,
        template: result => {
            let i;
            let len;
            let html = /* html */ `<nav class="pager"><ul class="pager__items js-pager__items">`;
            if (result.pageCount < 2) {
                html += /* html */ `</ul></div>`;
                return html;
            }
            const prelink = paginator.preparePreLink(result.prelink);
            if (result.previous) {
                html += /* html */ `
                <li class="pager__item pager__item--previos">
                    <a href="${prelink}${result.previous}"
                    >${paginator.options.translator('PREVIOUS')}
                    </a>
                </li>`;
            }
            if (result.range.length) {
                for (i = 0, len = result.range.length; i < len; i++) {
                    if (result.range[i] === result.current) {
                        html += /* html */ `
                        <li class="is-active pager__item">
                            <a href="${prelink}${result.range[i]}">
                            ${result.range[i]}
                            </a>
                        </li>`;
                    } else {
                        html += /* html */ `
                        <li class="pager__item">
                            <a
                                href="${prelink}${result.range[i]}"
                            >${result.range[i]}
                            </a>
                        </li>`;
                    }
                }
            }
            if (result.next) {
                html += /* html */ `
                <li class="pager__item pager__item--next">
                    <a href="${prelink}${result.next}">
                    ${paginator.options.translator('NEXT')}
                    </a>
                </li>`;
            }
            html += /* html */ `</ul></nav>`;
            return html;
        }
    });
    return paginator;
};
