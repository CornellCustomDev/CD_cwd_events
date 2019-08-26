const content = document.querySelectorAll('link[rel="import"]');

const nav = document.getElementById('nav');
if (content && nav) {
    const el = content[0].import.querySelector('.nav');
    if (el) {
        nav.appendChild(el.cloneNode(true));
    }
}

const dBlock = document.getElementById('drupal-modal');
if (content.length > 1) {
    if (content && dBlock) {
        const el = content[1].import.querySelector('#block-form');
        if (el) {
            dBlock.appendChild(el.cloneNode(true));
        }
    }
}
