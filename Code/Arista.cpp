/* 
 * Fichero:   Arista.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Clase para la representacion de las aristas.
 * 
 * Creado el 8 de diciembre de 2017, 12:25
 */

#include "Arista.h"

Arista::Arista() {
}

Arista::Arista(const Arista& orig) {
    a = orig.getNodoA();
    b = orig.getNodoB();
}

Arista::~Arista() {
}

/* Comprobamos si la arista tiene al nodo con un determinado id */
bool Arista::contNodo(string valor){
    if((getNodoA().getId() == valor) || (getNodoB().getId() == valor)){
        return true; 
    }
    else{
        return false;
    }
}

string Arista::imprimir() const{
    string cadena =  getNodoA().getId() + " <--> " + getNodoB().getId();
    return cadena;
}
/* Funciones de acceso */
void Arista::setNodoA(Nodo valor){
    a = valor;
}

void Arista::setNodoB(Nodo valor){
    b = valor;
}

Nodo Arista::getNodoA() const{
    return a;
}

Nodo Arista::getNodoB() const{
    return b; 
}

