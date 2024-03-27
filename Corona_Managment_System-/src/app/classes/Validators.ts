export class Validators {
    constructor() { }

    validiD(id: string) {
        if (id == null)
            return false
        if (id.length > 9 || isNaN(Number(id))) return false;
        id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
        return Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
    }
    validName(control: string): boolean {
        var pattern = new RegExp('^[a-zA-Z0-9\]*$');
        return !pattern.test(control);
    }
    required(control: string): boolean {
        return control == ""
    }
    validaddress(control: string): boolean {
        var pattern = new RegExp('^[a-zA-Z\]*$');
        return !pattern.test(control);
    }
    validPhoneNumber(control: string): boolean {
        var pattern = new RegExp('^[0-9]*$');
        return pattern.test(control);
    }

}