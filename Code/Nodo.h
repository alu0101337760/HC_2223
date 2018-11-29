/* 
 * Fichero:   Nodo.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Representar los nodos de los diferentes grafos.
 * 
 * Creado el 8 de diciembre de 2017, 11:09
 */

#ifndef NODO_H
#define NODO_H
#include <string>

using namespace std;
class Nodo {
public:
    Nodo();
    Nodo(const Nodo& orig);
    virtual ~Nodo();
   
    /* Funciones de acceso */
    string getId() const;
    void setId(string valor);
private:
    string id;
};

#endif /* NODO_H */

