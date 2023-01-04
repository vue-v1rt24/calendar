import {Tooltip} from 'bootstrap';

export default {
    mounted(el: HTMLElement, binding: any) {
        new Tooltip(el, {
            title: binding.value,
            delay: {'show': 500, 'hide': 100},
        });
    },
    updated(el: HTMLElement, binding: any) {
        const tooltip = Tooltip.getInstance(el);
        tooltip?.setContent({'.tooltip-inner': binding.value});
    },
};