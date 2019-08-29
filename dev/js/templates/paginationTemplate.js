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
            let html = /* html */ `<div><ul class="pagination">`;
            if (result.pageCount < 2) {
                html += /* html */ `</ul></div>`;
                return html;
            }
            const prelink = paginator.preparePreLink(result.prelink);
            if (result.previous) {
                html += /* html */ `
                <li class="page-item">
                    <a class="page-link" href="${prelink}${result.previous}"
                    >${paginator.options.translator('PREVIOUS')}
                    </a>
                </li>`;
            }
            if (result.range.length) {
                for (i = 0, len = result.range.length; i < len; i++) {
                    if (result.range[i] === result.current) {
                        html += /* html */ `
                        <li class="active page-item">
                            <a class="page-link"
                                href="${prelink}${result.range[i]}"
                            >${result.range[i]}
                            </a>
                        </li>`;
                    } else {
                        html += /* html */ `
                        <li class="page-item">
                            <a
                                class="page-link"
                                href="${prelink}${result.range[i]}"
                            >${result.range[i]}
                            </a>
                        </li>`;
                    }
                }
            }
            if (result.next) {
                html += /* html */ `
                <li class="page-item">
                    <a class="page-link" href="${prelink}${result.next}"
                        class="paginator-next"
                    >${paginator.options.translator('NEXT')}
                    </a>
                </li>`;
            }
            html += /* html */ `</ul></div>`;
            return html;
        }
    });
    return paginator;
};
