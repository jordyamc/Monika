
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
 
/*
Ejemplo Simple 1
*/
class CalculadoraUsandoClass
{
    /**
     * Metodo principal para incializar nuestra clase.
     *
     * @return void.
     */
    constructor()
    {
        //Variables que estaran disponibles en el scope global
        //de la clase
        this.valor_a = 0;
        this.valor_b = 0;
        console.log("Se genero la instancia de CalculadoraUsandoClass");      
    }//constructor

    //=================================================//

    /**
     * Permite asignar el valor para this.valor_a.
     * 
     * @param Integer valor Valor a asignar.
     *
     * return void.
     */
    set valorA(valor)
    {
        console.log(`Asignando el primer valor = ${valor}`);
        this.valor_a = valor;
    }//valorA
    
    //=================================================//
    
    /**
     * Permite asignar el valor para this.valor_b.
     * 
     * @param Integer valor Valor a asignar.
     *
     * return void.
     */
    set valorB(valor)
    {
        console.log(`Asignando el primer valor = ${valor}`);
        this.valor_b = valor;
    }//valorB

    //=================================================//

    /**
     * Permite conseguir la suma de unos valores datos.
     *
     * return integer.
     */
    get suma()
    {
        let resultado = this.valor_a + this.valor_b;
        return `La suma de ${this.valor_a} + ${this.valor_b} = ${resultado}`;
    }//suma

    //=================================================//
    
    /**
     * Realiza la multiplicacion de unos valores dados,
     * Pra acceder ah este metodo no es necesario contar con una
     * instancia de la clase.
     */
    static multiplicacion(valor_a, valor_b)
    {
        let resultado = valor_a * valor_b;
        return `La multiplicación de ${valor_a} * ${valor_b} = ${resultado}`;
    }//multiplicacion

}

exports.CalculadoraUsandoClass = CalculadoraUsandoClass;