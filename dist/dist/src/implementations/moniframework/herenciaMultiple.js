
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
 
/*
Ejemplo Simple herencia multiple
* /


class A
{
    constructor(name) {
        this.name = name
    }
    sayA() {
        return this.name
    }
}

class B
{
    constructor(name) {
        this.name = name
    }
    sayB() {
        return this.name
    }
}

class AB extends allOf(A, B)
{
    sayAB() {
        return this.name
    }
}
exports.CalculadoraUsandoClass = CalculadoraUsandoClass;
*/