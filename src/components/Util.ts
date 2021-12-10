export default class Util {
    uuid() {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
            return v.toString(16);
        });
        return uuid;
    }
    isValidDate(dateString: string) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }
    attachClick() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                const toggler = document.querySelector("button.navbar-toggler") as HTMLElement
                toggler.click()
                toggler.className = 'navbar-toggler collapsed'
                toggler.setAttribute('aria-expanded',"false");
            })
        })
    }
}