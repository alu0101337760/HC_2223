/* 
 * Fichero:   Arista.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Clase para la representacion de las aristas.
 * 
 * Creado el 8 de diciembre de 2017, 12:25
 */

#ifndef ARISTA_H
#define ARISTA_H
#include "Nodo.h"

using namespace std; 
class Arista {
public:
    Arista();
    Arista(const Arista& orig);
    virtual ~Arista();
    
    bool contNodo(string valor); 
    /* Funciones de acceso */
    Nodo getNodoA() const;
    Nodo getNodoB() const;
    void setNodoA(Nodo valor);
    void setNodoB(Nodo valor);
    string imprimir() const;
    
private:
    Nodo a;
    Nodo b;
};

#endif /* ARISTA_H */

